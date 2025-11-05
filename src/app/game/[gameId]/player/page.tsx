"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayerTicket } from "@/components/game/player-ticket";
import { useToast } from "@/hooks/use-toast";
import { generateTicket } from "@/lib/ticket-generator";
import { useAuth, useFirestore, useUser } from "@/firebase";
import { doc, setDoc, getDoc, increment } from "firebase/firestore";

type Prize = 'earlyFive' | 'topLine' | 'middleLine' | 'bottomLine' | 'fullHouse';

const PRIZE_NAMES: Record<Prize, string> = {
    earlyFive: "Early Five",
    topLine: "Top Line",
    middleLine: "Middle Line",
    bottomLine: "Bottom Line",
    fullHouse: "Full House"
};

const PRIZE_POINTS: Record<Prize, number> = {
    earlyFive: 25,
    topLine: 50,
    middleLine: 50,
    bottomLine: 50,
    fullHouse: 100
};

export default function PlayerScreen() {
  const params = useParams();
  const router = useRouter();
  const gameId = typeof params.gameId === 'string' ? params.gameId : '';
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();

  const [ticket, setTicket] = useState<(number | 0)[][]>([]);
  const [calledNumbers, setCalledNumbers] = useState<Set<number>>(new Set());
  const [lastCalled, setLastCalled] = useState<number | null>(null);
  const [availableClaims, setAvailableClaims] = useState<Set<Prize>>(new Set());
  const [claimedPrizes, setClaimedPrizes] = useState<Set<Prize>>(new Set());
  const [gameEnded, setGameEnded] = useState(false);

  const announceNumber = (number: number) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(number.toString());
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    setTicket(generateTicket());

    const interval = setInterval(() => {
      setCalledNumbers(prev => {
        if (prev.size >= 90) {
          clearInterval(interval);
          setGameEnded(true);
          return prev;
        }
        let newNum;
        do {
          newNum = Math.floor(Math.random() * 90) + 1;
        } while (prev.has(newNum));
        setLastCalled(newNum);
        announceNumber(newNum);
        return new Set(prev).add(newNum);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (gameEnded) {
      toast({
        title: "Game Has Ended",
        description: "Thank you for playing! Redirecting home...",
      });
      const timer = setTimeout(() => {
        router.push('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameEnded, router, toast]);

    const ticketNumbers = useMemo(() => {
        if (!ticket.length) return { top: [], middle: [], bottom: [], all: [] };
        const top = ticket[0].filter(n => n !== 0);
        const middle = ticket[1].filter(n => n !== 0);
        const bottom = ticket[2].filter(n => n !== 0);
        const all = [...top, ...middle, ...bottom];
        return { top, middle, bottom, all };
    }, [ticket]);

  useEffect(() => {
    if (ticket.length === 0 || gameEnded) return;

    const markedNumbers = ticketNumbers.all.filter(num => calledNumbers.has(num));

    const checkWin = (prize: Prize, condition: boolean) => {
        if (condition && !availableClaims.has(prize) && !claimedPrizes.has(prize)) {
            setAvailableClaims(prev => new Set(prev).add(prize));
            toast({
                title: `You might have a win!`,
                description: `Claim for ${PRIZE_NAMES[prize]} is available.`,
            });
        }
    }
    
    checkWin('earlyFive', markedNumbers.length === 5);
    checkWin('topLine', ticketNumbers.top.every(num => calledNumbers.has(num)));
    checkWin('middleLine', ticketNumbers.middle.every(num => calledNumbers.has(num)));
    checkWin('bottomLine', ticketNumbers.bottom.every(num => calledNumbers.has(num)));
    checkWin('fullHouse', ticketNumbers.all.every(num => calledNumbers.has(num)));

  }, [calledNumbers, ticket, ticketNumbers, availableClaims, claimedPrizes, toast, gameEnded]);

  const claimPrize = async (prize: Prize) => {
    const points = PRIZE_POINTS[prize];
    toast({
        title: "Winner Verified!",
        description: `You earned ${points} HP for ${PRIZE_NAMES[prize]}!`,
        className: "bg-primary text-primary-foreground",
    });

    if (user && firestore) {
        const leaderboardRef = doc(firestore, "leaderboard", user.uid);
        try {
            const docSnap = await getDoc(leaderboardRef);
            if(docSnap.exists()) {
                 await setDoc(leaderboardRef, { 
                    housiePoints: increment(points)
                }, { merge: true });
            } else {
                await setDoc(leaderboardRef, {
                    userId: user.uid,
                    name: user.email?.split('@')[0] || "Player", // Use part of email as name
                    housiePoints: points
                });
            }
        } catch (error) {
            console.error("Error updating leaderboard:", error);
            toast({ variant: "destructive", title: "Could not update leaderboard." });
        }
    }

    setAvailableClaims(prev => {
        const newClaims = new Set(prev);
        newClaims.delete(prize);
        return newClaims;
    });
    setClaimedPrizes(prev => new Set(prev).add(prize));
  }

  return (
    <main className="flex items-center justify-center min-h-screen py-8 bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">My Housie Party</CardTitle>
          <CardDescription>Game Code: {gameId.toUpperCase()}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {gameEnded ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-primary mb-2">Game Has Ended</h2>
              <p className="text-muted-foreground">Thank you for playing! Redirecting home...</p>
            </div>
          ) : (
            <>
              <div className="text-center font-bold text-primary" style={{ fontSize: ' clamp(4rem, 20vw, 7rem)', lineHeight: 1 }}>
                {lastCalled ?? '--'}
              </div>
              
              {ticket.length > 0 ? (
                <PlayerTicket ticket={ticket} calledNumbers={calledNumbers} />
              ) : (
                <div className="h-40 flex items-center justify-center">Loading ticket...</div>
              )}

              <p className="text-center text-xs text-muted-foreground pt-2">Prizes: Early 5, Top/Mid/Bottom Line, Full House</p>
              
              {availableClaims.size > 0 && (
                 <div className="flex flex-col gap-2">
                    {Array.from(availableClaims).map(prize => (
                        <Button 
                            key={prize}
                            onClick={() => claimPrize(prize)} 
                            size="lg" 
                            className="w-full font-bold h-14 text-lg bg-accent hover:bg-accent/90 animate-pulse"
                        >
                            CLAIM {PRIZE_NAMES[prize].toUpperCase()}!
                        </Button>
                    ))}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

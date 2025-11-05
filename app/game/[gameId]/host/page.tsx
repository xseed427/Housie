"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NumberBoard } from "@/components/game/number-board";
import Link from "next/link";
import { ArrowLeft, Clock, Users } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";


export default function HostRoom() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const gameId = typeof params.gameId === 'string' ? params.gameId : '';
  const { toast } = useToast();
  
  const [game, setGame] = useState({ 
    title: searchParams.get('title') || "My Housie Party", 
    code: gameId.toUpperCase(),
    ticketPrice: parseInt(searchParams.get('ticketPrice') || '10', 10),
    maxPlayers: parseInt(searchParams.get('maxPlayers') || '20', 10),
    hostCut: parseInt(searchParams.get('hostCut') || '10', 10) / 100,
    players: 0, 
    pool: 0, 
    hostEarn: 0, 
    ownerEarn: 0, 
    status: 'waiting' as 'waiting' | 'live' | 'ended'
  });

  const [calledNumbers, setCalledNumbers] = useState<Set<number>>(new Set());
  const [lastCalled, setLastCalled] = useState<number | null>(null);
  const [isAuto, setIsAuto] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const availableNumbers = useMemo(() => {
    return Array.from({ length: 90 }, (_, i) => i + 1).filter(n => !calledNumbers.has(n));
  }, [calledNumbers]);
  
  const callNumber = useCallback(() => {
    if (availableNumbers.length === 0) {
      toast({ title: "All numbers have been called!", variant: "destructive" });
      setIsAuto(false);
      return;
    }
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const newNumber = availableNumbers[randomIndex];
    setLastCalled(newNumber);
    setCalledNumbers(prev => new Set(prev).add(newNumber));
    
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(newNumber.toString());
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }
  }, [availableNumbers, toast]);

  const startGame = useCallback(() => {
    setGame(g => {
        // Prevent starting if not in 'waiting' state
        if (g.status !== 'waiting') return g;

        toast({ title: "Game Started!", description: "The first number is called." });
        
        // This needs to be inside the updater to avoid race condition with callNumber
        setTimeout(() => {
            if (Array.from({ length: 90 }, (_, i) => i + 1).filter(n => !calledNumbers.has(n)).length > 0) {
                 const randomIndex = Math.floor(Math.random() * Array.from({ length: 90 }, (_, i) => i + 1).filter(n => !calledNumbers.has(n)).length);
                const newNumber = Array.from({ length: 90 }, (_, i) => i + 1).filter(n => !calledNumbers.has(n))[randomIndex];
                setLastCalled(newNumber);
                setCalledNumbers(prev => new Set(prev).add(newNumber));
                
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(newNumber.toString());
                    utterance.rate = 0.9;
                    window.speechSynthesis.speak(utterance);
                }
            }
        }, 100);
        
        setIsAuto(true); // Automatically start calling numbers
        setCountdown(null);
        return { ...g, status: 'live' };
    });
  }, [calledNumbers, toast]);

  useEffect(() => {
    // Start countdown if at least one player joins
    if (game.status === 'waiting' && game.players > 0 && countdown === null) {
      setCountdown(60); // 60-second timer
    }
  }, [game.players, game.status, countdown]);

  useEffect(() => {
    if (countdown === null || game.status !== 'waiting') return;
    if (countdown === 0) {
      startGame();
      return;
    }
    const timer = setInterval(() => setCountdown(c => (c ? c - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [countdown, startGame, game.status]);

  useEffect(() => {
    // Start game immediately if room is full
    if (game.status === 'waiting' && game.players === game.maxPlayers) {
      startGame();
    }
  }, [game.players, game.maxPlayers, game.status, startGame]);
  
  useEffect(() => {
    if (game.status !== 'live' || !isAuto || availableNumbers.length === 0) {
      return;
    }

    const timer = setInterval(() => {
      callNumber();
    }, 5000);

    return () => clearInterval(timer);
  }, [isAuto, callNumber, availableNumbers.length, game.status]);
  
  const endGame = () => {
    setIsAuto(false);
    setGame(g => ({...g, status: 'ended'}));
    toast({ title: "Game Ended", description: "Winnings will be automatically distributed."});
    router.push('/organizer/dashboard');
  }

  // Mock player joining
  useEffect(() => {
    if (game.status !== 'waiting') return;
    const interval = setInterval(() => {
        setGame(g => {
            if (g.players >= g.maxPlayers) {
                clearInterval(interval);
                return g;
            }
            const newPlayers = g.players + 1;
            const newPool = newPlayers * g.ticketPrice;
            return {
                ...g,
                players: newPlayers,
                pool: newPool,
                hostEarn: newPool * g.hostCut,
                ownerEarn: newPool * 0.05
            }
        })
    }, 3000) // New player joins every 3 seconds
    return () => clearInterval(interval);
  }, [game.status, game.maxPlayers, game.ticketPrice, game.hostCut])

  const WaitingRoom = () => (
    <div className="text-center py-8 space-y-4">
        <h2 className="text-2xl font-bold">Waiting for Players...</h2>
        <div className="flex items-center justify-center text-4xl font-bold">
            <Users className="mr-3 h-10 w-10"/>
            <span>{game.players} / {game.maxPlayers}</span>
        </div>
        {countdown !== null && (
            <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground animate-pulse">
                <Clock className="h-5 w-5" />
                <span>Game starts in {countdown}s</span>
            </div>
        )}
        <p className="text-muted-foreground pt-4">Game will start automatically when the room is full or the timer ends.</p>
    </div>
  )

  const LiveGame = () => (
    <>
        <div className="text-center font-bold text-primary" style={{ fontSize: ' clamp(4rem, 20vw, 7rem)', lineHeight: 1 }}>
            {lastCalled ?? '--'}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={callNumber} disabled={availableNumbers.length === 0 || isAuto} size="lg" className="font-bold text-xl h-16">
              {calledNumbers.size === 0 ? "START" : "NEXT"}
            </Button>
            <Button 
                onClick={() => setIsAuto(prev => !prev)} 
                disabled={availableNumbers.length === 0} 
                size="lg" 
                variant={isAuto ? "destructive" : "outline"} 
                className="font-bold text-xl h-16"
            >
                {isAuto ? "STOP AUTO" : "AUTOMATIC"}
            </Button>
          </div>
          <div className="py-2">
            <NumberBoard calledNumbers={calledNumbers} />
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="secondary" className="w-full">END GAME</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to end the game?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. All winnings will be calculated and distributed based on the current state.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={endGame}>Yes, End Game</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
    </>
  )

  return (
    <main className="flex items-center justify-center min-h-screen py-8 bg-background">
      <Card className="w-full max-w-md mx-4 relative">
        <CardHeader className="pt-12">
            <Button asChild variant="ghost" size="sm" className="absolute top-4 left-4 h-8 px-2">
                <Link href="/organizer/dashboard"><ArrowLeft className="mr-1 h-4 w-4"/> Back</Link>
            </Button>
          <CardTitle className="text-center text-3xl font-bold">{game.title} ({game.code})</CardTitle>
          <div className="text-center text-muted-foreground flex justify-center gap-x-4">
            <span>Players: <span className="text-foreground font-bold">{game.players}</span></span>
            <span>Pool: <span className="text-foreground font-bold">₹{game.pool.toFixed(0)}</span></span>
          </div>
           <CardDescription className="text-center text-xs">
            Your {game.hostCut*100}%: ₹{game.hostEarn.toFixed(0)} | Owner 5%: ₹{game.ownerEarn.toFixed(0)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {game.status === 'waiting' ? <WaitingRoom /> : <LiveGame />}
        </CardContent>
      </Card>
    </main>
  );
}

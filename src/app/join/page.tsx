"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Users } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const denominations = [
  { amount: 10, players: 123 },
  { amount: 20, players: 88 },
  { amount: 50, players: 45 },
  { amount: 100, players: 23 },
  { amount: 200, players: 11 },
  { amount: 500, players: 5 },
  { amount: 1000, players: 2 },
];

export default function PlayerJoin() {
  const router = useRouter();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handlePayment = () => {
    if (!selectedAmount) return;

    const gameId = code.length > 0 ? code : "RANDOM" + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    toast({
        title: `Payment of ₹${selectedAmount} Successful!`,
        description: "Joining game... Good luck!",
    })
    // In a real app, this would be a call to a Razorpay-like service.
    router.push(`/game/${gameId.toLowerCase()}/player`);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-background py-8">
      <AlertDialog>
        <Card className="w-full max-w-sm mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Join Game</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="roomCode" className="sr-only">Room Code</Label>
              <Input 
                id="roomCode" 
                name="roomCode" 
                placeholder="Game Code (Optional)" 
                maxLength={6} 
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="text-center text-3xl h-16 tracking-[0.2em] font-bold" />
            </div>

            <div className="space-y-2 pt-2">
              <Label className="px-1 text-muted-foreground">Select your entry amount:</Label>
              <div className="grid grid-cols-2 gap-2">
                {denominations.map(({amount, players}) => (
                  <AlertDialogTrigger asChild key={amount}>
                    <Button 
                      variant="outline" 
                      className="h-14 flex-col items-start p-3" 
                      onClick={() => setSelectedAmount(amount)}
                    >
                      <span className="text-lg font-bold">₹{amount}</span>
                      <div className="flex items-center text-xs text-muted-foreground">
                          <Users className="mr-1.5 h-3 w-3" />
                          <span>{players} players</span>
                      </div>
                    </Button>
                  </AlertDialogTrigger>
                ))}
              </div>
            </div>
            
            <Button asChild variant="link" className="w-full text-muted-foreground">
              <Link href="/">Back to Role Selection</Link>
            </Button>
          </CardContent>
        </Card>
        
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Confirm Entry</AlertDialogTitle>
            <AlertDialogDescription>
                You are about to join {code ? `game ${code}` : 'a game'} with an entry fee of <span className="font-bold text-foreground">₹{selectedAmount}</span>.
                This amount will be deducted from your account.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePayment}>Confirm & Pay</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

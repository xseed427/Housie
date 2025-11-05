"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Game {
  id: string;
  title: string;
  status: 'live' | 'waiting' | 'ended';
  players: number;
  pool: number;
}

export default function OrganizerDashboard() {
  const [orgData, setOrgData] = useState({ name: "Ramesh Kumar", wallet: 1250 });
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    // Mock data fetching
    setGames([
      { id: 'g1', title: "Weekend Bonanza", status: 'live', players: 52, pool: 520 },
      { id: 'g2', title: "Friday Night Fun", status: 'ended', players: 89, pool: 890 },
      { id: 'g3', title: "Diwali Dhamaka", status: 'waiting', players: 0, pool: 0 },
    ]);
  }, []);

  const getStatusBadgeColor = (status: Game['status']) => {
    switch (status) {
        case 'live': return 'bg-green-500/20 text-green-400 border-green-500/30';
        case 'ended': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        case 'waiting': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen py-8 bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-2xl">Hello <span className="font-bold text-primary">{orgData.name}</span> 👋</CardTitle>
          <CardDescription>Your 10% Wallet: <span className="font-bold text-foreground">₹{orgData.wallet.toLocaleString()}</span></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild size="lg" className="w-full font-bold">
            <Link href="/organizer/create"><Plus className="mr-2 h-5 w-5" /> NEW GAME</Link>
          </Button>

          <Separator />

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">My Games</h3>
            {games.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {games.map(game => (
                <Link href={`/game/${game.id}/host`} key={game.id} className="block">
                  <Card className="hover:bg-card/60 transition-colors border-border/50">
                    <CardContent className="p-3 flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{game.title}</p>
                        <p className="text-xs text-muted-foreground">Players: {game.players} | Pool: ₹{game.pool}</p>
                      </div>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusBadgeColor(game.status)}`}>
                        {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">You haven't created any games yet.</p>
            )}
          </div>
            <Separator />
          <Button asChild variant="secondary" className="w-full">
            <Link href="/">Logout</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

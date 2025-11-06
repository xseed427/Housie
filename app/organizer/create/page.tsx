"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function CreateGame() {
  const router = useRouter();
  const { toast } = useToast();
  const [hostCut, setHostCut] = useState(10);

  const launchGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("gameTitle") as string;
    const ticketPrice = formData.get("ticketPrice") as string;
    const maxPlayers = formData.get("maxPlayers") as string;

    const gameId = "newgame_" + Date.now().toString().slice(-6);

    // Pass game settings via query params
    const queryParams = new URLSearchParams({
      title,
      ticketPrice,
      maxPlayers,
      hostCut: hostCut.toString(),
    });

    toast({
      title: "Game Launched!",
      description: "Your game room is now live.",
    });

    router.push(`/game/${gameId}/host?${queryParams.toString()}`);
  }; // ✅ properly closed function before return

  return (
    <main className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create Game</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={launchGame} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="gameTitle">Game Title</Label>
              <Input
                id="gameTitle"
                name="gameTitle"
                placeholder="e.g., Diwali Tambola Night"
                defaultValue="My Housie Party"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ticketPrice">Ticket Price</Label>
                <Select name="ticketPrice" defaultValue="10" required>
                  <SelectTrigger id="ticketPrice">
                    <SelectValue placeholder="Select price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">₹10</SelectItem>
                    <SelectItem value="20">₹20</SelectItem>
                    <SelectItem value="50">₹50</SelectItem>
                    <SelectItem value="100">₹100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxPlayers">Max Players</Label>
                <Select name="maxPlayers" defaultValue="20" required>
                  <SelectTrigger id="maxPlayers">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="200">200</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>
                Host Cut:{" "}
                <span className="font-bold text-primary">{hostCut}%</span>
              </Label>
              <Slider
                defaultValue={[10]}
                min={10}
                max={15}
                step={1}
                onValueChange={(value) => setHostCut(value[0])}
              />
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <Button type="submit" size="lg" className="w-full font-bold">
                LAUNCH GAME ROOM
              </Button>
              <Button asChild variant="ghost" className="text-muted-foreground">
                <Link href="/organizer/dashboard">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

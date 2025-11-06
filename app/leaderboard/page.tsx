
"use client";

import { useCollection } from "@/firebase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { useFirestore, useMemoFirebase } from "@/firebase";
import { Trophy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface LeaderboardEntry {
  id: string;
  name: string;
  housiePoints: number;
}

export default function LeaderboardPage() {
  const firestore = useFirestore();

  const leaderboardQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, "leaderboard"),
      orderBy("housiePoints", "desc"),
      limit(10)
    );
  }, [firestore]);

  const { data: leaderboard, isLoading } = useCollection<LeaderboardEntry>(leaderboardQuery);

  const getRankColor = (rank: number) => {
    if (rank === 0) return "text-yellow-400";
    if (rank === 1) return "text-gray-400";
    if (rank === 2) return "text-yellow-600";
    return "text-foreground";
  }

  return (
    <main className="flex items-center justify-center min-h-screen py-8 bg-background">
      <Card className="w-full max-w-md mx-4 relative">
         <CardHeader className="pt-12 text-center">
            <Button asChild variant="ghost" size="sm" className="absolute top-4 left-4 h-8 px-2">
                <Link href="/"><ArrowLeft className="mr-1 h-4 w-4"/> Back to Home</Link>
            </Button>
            <div className="flex justify-center items-center gap-2">
                <Trophy className="h-8 w-8 text-primary" />
                <CardTitle className="text-3xl font-bold">Leaderboard</CardTitle>
            </div>
          <CardDescription>Top 10 Housie Champions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-1/6">Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead className="text-right">HP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading || !firestore ? (
                Array.from({length: 5}).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-center"><Skeleton className="h-5 w-5 rounded-full mx-auto" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-5 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : leaderboard && leaderboard.length > 0 ? (
                leaderboard.map((player, index) => (
                  <TableRow key={player.id}>
                    <TableCell className={`text-center font-bold text-lg ${getRankColor(index)}`}>
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell className="text-right font-bold">{player.housiePoints}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                    No players on the leaderboard yet. Play a game to get started!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

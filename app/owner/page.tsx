"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function OwnerDashboard() {
  const [stats, setStats] = useState<{ games: number; totalPool: number; ownerCut: number; } | null>(null);

  useEffect(() => {
    // Mocking initial data load
    setTimeout(() => {
        setStats({
            games: 12,
            totalPool: 15600,
            ownerCut: 780,
        });
    }, 1000)

    // Mocking real-time data listener
    const interval = setInterval(() => {
      setStats(prevStats => prevStats ? ({
        games: prevStats.games + Math.floor(Math.random()*2),
        totalPool: prevStats.totalPool + Math.floor(Math.random()*500),
        ownerCut: (prevStats.totalPool + Math.floor(Math.random()*500)) * 0.05,
      }) : null);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm mx-4">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Owner Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3 text-lg">
            {stats ? (
              <>
                <p>Live Games: <span className="font-bold float-right">{stats.games}</span></p>
                <p>Total Pool: <span className="font-bold float-right">₹{stats.totalPool.toLocaleString()}</span></p>
                <p className="text-primary text-xl font-bold pt-2">YOUR 5% TODAY: <span className="float-right">₹{stats.ownerCut.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span></p>
              </>
            ) : (
                <>
                    <Skeleton className="h-7 w-3/4" />
                    <Skeleton className="h-7 w-full" />
                    <Skeleton className="h-8 w-1/2 mt-2" />
                </>
            )}
          </div>
          <Button asChild variant="secondary" className="w-full">
            <Link href="/">Logout</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

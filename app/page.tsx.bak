import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn, UserPlus, Trophy } from "lucide-react";

export default function RoleSelectionPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-gray-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,215,0,0.1),rgba(255,255,255,0))]"></div>
      
      <main className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-sm border-primary/20 bg-card/80 backdrop-blur-sm shadow-2xl shadow-primary/10">
          <CardHeader className="text-center space-y-2 pt-8">
            <h1 
              className="text-5xl font-bold text-primary tracking-tighter"
              style={{ textShadow: '0 2px 4px rgba(255, 215, 0, 0.2)' }}
            >
              HOUSIE EMPIRE
            </h1>
            <p className="text-muted-foreground">₹25,000/night in your pocket</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 p-6">
            <Button asChild size="lg" className="h-12 text-lg font-bold">
              <Link href="/login">
                <LogIn className="mr-2 h-5 w-5" /> Login
              </Link>
            </Button>
            <Button asChild size="lg" className="h-12 text-lg font-bold" variant="secondary">
              <Link href="/signup">
                <UserPlus className="mr-2 h-5 w-5" /> Sign Up
              </Link>
            </Button>
            
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            
            <Button asChild className="w-full" variant="outline">
              <Link href="/leaderboard">
                <Trophy className="mr-2 h-4 w-4 text-primary" /> View Leaderboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

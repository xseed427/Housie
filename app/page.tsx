import { Button } from "@/components/ui/button";
import { Award, Bolt, Gamepad2, Rocket, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="flex flex-col items-center text-center">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/5">
      {icon}
    </div>
    <h3 className="mb-2 text-lg font-bold">{title}</h3>
    <p className="text-sm text-white/60">{children}</p>
  </div>
);


export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">
      {/* Background Glows */}
      <div 
        className="absolute inset-0 z-0 h-full w-full bg-cover bg-center" 
        style={{backgroundImage: "url(/background.gif)"}} 
      />
      <div className="absolute inset-0 z-10 bg-slate-950/80 backdrop-blur-sm" />


      <header className="relative z-20 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Gamepad2 className="h-7 w-7 text-white" />
            <span className="text-xl font-bold tracking-tight">Housie Empire</span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <Link href="#about" className="text-sm font-medium text-white/80 transition-colors hover:text-white">About</Link>
            <Link href="/leaderboard" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Leaderboard</Link>
            <Link href="/organizer/login" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Organizer</Link>
          </div>
          <Link href="/player/login" className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white md:block">Player Login</Link>
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </Button>
        </nav>
      </header>

      <main className="relative z-20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl">
                <span className="block">Play Housie.</span>
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">Win Big. Live & Social</span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-lg text-white/60 sm:max-w-xl">
                Join instant rooms, host secure games, and win real rewards. Housie Empire brings the classic tambola experience online with lightning-fast gameplay and a vibrant community.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Button asChild size="lg" className="h-12 w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold">
                  <Link href="/join">Play Now</Link>
                </Button>
                <Button asChild size="lg" className="become-organizer-button h-12 w-full sm:w-auto" variant="outline">
                   <Link href="/organizer/signup">Become Organizer</Link>
                </Button>
              </div>
              <div className="mt-12 flex justify-center gap-8 lg:justify-start">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400/10">
                    <ShieldCheck className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-bold">Trusted</h3>
                    <p className="text-sm text-white/60">Secure payments & verified hosts</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-400/10">
                    <Bolt className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold">Fast</h3>
                    <p className="text-sm text-white/60">Low-latency game rooms</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
                <Image
                    src="/svg.png"
                    alt="Housie ticket and coin illustration"
                    width={500}
                    height={500}
                    priority
                    className="h-auto w-full max-w-[480px] -rotate-[5deg] transition-transform duration-300 hover:rotate-0 hover:scale-105 lg:rotate-[15deg]"
                />
            </div>
          </div>
        </div>

        <div id="about" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
           <div className="text-center">
             <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">About Housie Empire</h2>
             <p className="mx-auto mt-4 max-w-3xl text-lg text-white/60">
                Housie Empire is the ultimate online destination for classic Tambola fun, reimagined for the digital age. Our mission is to connect people through the thrill of the game, providing a seamless, secure, and rewarding experience for both players and organizers.
             </p>
           </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Why Choose Us?</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
             <FeatureCard icon={<Rocket className="h-6 w-6 text-pink-400" />} title="Play Instantly">
              Join or create rooms in seconds. No waiting, just pure tambola fun. Find games that match your budget and style.
            </FeatureCard>
             <FeatureCard icon={<Users className="h-6 w-6 text-blue-400" />} title="Community Focused">
              Play with friends, family, or a vibrant community of housie lovers. Our platform is built for social interaction.
            </FeatureCard>
            <FeatureCard icon={<Award className="h-6 w-6 text-yellow-400" />} title="Win Real Rewards">
              Play to win real money rewards and climb the leaderboards to earn Housie Points (HP) and bragging rights.
            </FeatureCard>
          </div>
        </div>
      </main>

      <footer className="relative z-20 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-white/60 sm:px-6 lg:px-8">
            <p>&copy; {new Date().getFullYear()} Housie Empire. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

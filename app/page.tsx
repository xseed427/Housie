"use client";

import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#07060a] via-[#0b0620] to-[#10061e] text-white antialiased">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-400 flex items-center justify-center text-xl font-bold shadow-xl">H</div>
          <div className="text-2xl font-extrabold tracking-tight">Housie Empire</div>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login" className="px-4 py-2 rounded-md bg-white text-[#0b1226] font-medium">Login</Link>
        </nav>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Play Housie. Win Big. <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Live & Social</span>
          </h1>
          <p className="text-gray-300 max-w-xl">Join instant rooms, host secure games, and win real rewards. Housie Empire brings the classic tambola experience online with lightning-fast gameplay and a vibrant community.</p>

          <div className="flex flex-wrap gap-4 mt-6">
            <Link href="/signup" className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg transform hover:scale-105 transition">Play Now <span className="text-xs opacity-80 ml-1">Quick match</span></Link>
            <Link href="/organizer/invite" className="inline-flex items-center gap-3 px-6 py-3 border border-gray-700 rounded-full hover:bg-white/5 transition">Become Organizer <span className="text-xs opacity-80 ml-1">Invite-only</span></Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">★</div>
              <div>
                <div className="font-semibold">Trusted</div>
                <div className="text-xs">Secure payments & verified hosts</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">⚡</div>
              <div>
                <div className="font-semibold">Fast</div>
                <div className="text-xs">Low-latency game rooms</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl p-6 bg-gradient-to-br from-white/3 to-white/6 backdrop-blur-md border border-white/5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-300">Live Room</div>
                <div className="text-xl font-bold">Diwali Tambola Night</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Players</div>
                <div className="text-lg font-semibold">120</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-white/5 rounded-md">₹10</div>
              <div className="p-3 bg-white/5 rounded-md">₹20</div>
              <div className="p-3 bg-white/5 rounded-md">₹50</div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Link href="/game/preview" className="px-4 py-2 bg-indigo-600 rounded-md font-medium">Join</Link>
              <Link href="/game/create" className="px-4 py-2 border border-gray-600 rounded-md">Watch</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-white/5 border border-white/5">
            <div className="text-3xl mb-3">🎯</div>
            <div className="font-semibold">Play Instantly</div>
            <div className="text-sm mt-2 text-gray-300">Join or create rooms in seconds with one-click matching.</div>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/5">
            <div className="text-3xl mb-3">🔒</div>
            <div className="font-semibold">Secure Hosting</div>
            <div className="text-sm mt-2 text-gray-300">Organizers are invite-only and roles are verified by server.</div>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/5">
            <div className="text-3xl mb-3">🏆</div>
            <div className="font-semibold">Win Rewards</div>
            <div className="text-sm mt-2 text-gray-300">Fast payouts and transparent scoring.</div>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/5">
            <div className="text-3xl mb-3">⚡</div>
            <div className="font-semibold">Lightning Fast</div>
            <div className="text-sm mt-2 text-gray-300">Optimized for low-latency play on mobile and desktop.</div>
          </div>
        </div>
      </section>

      <footer className="mt-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-400 flex items-center justify-center text-lg font-bold">H</div>
            <div>
              <div className="font-bold">Housie Empire</div>
              <div className="text-sm text-gray-400">© 2025 Housie Empire. All rights reserved.</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-gray-300 hover:underline">Terms</Link>
            <Link href="/privacy" className="text-sm text-gray-300 hover:underline">Privacy</Link>
            <div className="flex items-center gap-3 pl-4 border-l border-white/5">
              <a href="#" aria-label="twitter" className="text-gray-300">TW</a>
              <a href="#" aria-label="instagram" className="text-gray-300">IG</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#0b1226] to-[#1e0f3b] text-white">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-400 shadow-xl flex items-center justify-center text-xl font-bold">H</div>
          <div className="text-2xl font-extrabold">Housie Empire</div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/login" className="px-4 py-2 rounded-md bg-white text-[#0b1226] font-medium">Login</Link>
        </div>
        <div className="md:hidden">
          <Link href="/login" className="px-3 py-2 rounded-md bg-white text-[#0b1226] font-medium">Login</Link>
        </div>
      </nav>

      <header className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight"
            >
              Play Housie. Win Big. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Live & Social</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-gray-200 max-w-xl"
            >
              Join instant rooms, host secure games, and win real rewards. Housie Empire brings the classic tambola experience online with lightning-fast gameplay and a vibrant community.
            </motion.p>

            <motion.div className="mt-8 flex flex-wrap gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Link href="/signup" className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg transform hover:scale-105 transition">
                <span className="font-semibold">Play Now</span>
                <span className="text-sm opacity-80">Quick match</span>
              </Link>
              <Link href="/organizer/invite" className="inline-flex items-center gap-3 px-6 py-3 border border-gray-700 rounded-full hover:bg-white/5 transition">
                <span className="font-semibold">Become Organizer</span>
                <span className="text-sm opacity-80">Invite-only</span>
              </Link>
            </motion.div>

            <div className="mt-8 flex items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">★</div>
                <div>
                  <div className="font-semibold">Trusted</div>
                  <div className="text-xs">Secure payments & verified hosts</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">⚡</div>
                <div>
                  <div className="font-semibold">Fast</div>
                  <div className="text-xs">Low-latency game rooms</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl p-6 bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-md border border-white/5 shadow-2xl"
            >
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

              <div className="mt-6 grid grid-cols-3 gap-2">
                <div className="p-3 bg-white/5 rounded-md text-center">₹10</div>
                <div className="p-3 bg-white/5 rounded-md text-center">₹20</div>
                <div className="p-3 bg-white/5 rounded-md text-center">₹50</div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Link href="/game/preview" className="px-4 py-2 bg-indigo-600 rounded-md font-medium">Join</Link>
                <Link href="/game/create" className="px-4 py-2 border border-gray-600 rounded-md">Watch</Link>
              </div>
            </motion.div>

            <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-purple-500/30 filter blur-3xl"></div>
            <div className="absolute -left-10 -top-10 w-36 h-36 rounded-full bg-indigo-400/20 filter blur-2xl"></div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold text-center mb-8">Features</motion.h2>
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
              <div className="text-sm text-gray-400">© {new Date().getFullYear()} Housie Empire. All rights reserved.</div>
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

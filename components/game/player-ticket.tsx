"use client";

import { cn } from "@/lib/utils";

interface PlayerTicketProps {
  ticket: (number | 0)[][];
  calledNumbers: Set<number>;
}

export function PlayerTicket({ ticket, calledNumbers }: PlayerTicketProps) {
  return (
    <div className="grid grid-rows-3 gap-1 p-2 rounded-lg bg-background">
      {ticket.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-9 gap-1">
          {row.map((num, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={cn(`flex items-center justify-center aspect-[4/3] rounded text-sm sm:text-base font-bold transition-all duration-300`,
                num === 0 ? 'bg-transparent' : 'bg-card shadow-inner',
                calledNumbers.has(num) ? 'bg-accent text-accent-foreground scale-110 shadow-lg' : ''
              )}
            >
              {num !== 0 ? num : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

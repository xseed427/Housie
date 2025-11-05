"use client";

interface NumberBoardProps {
  calledNumbers: Set<number>;
}

export function NumberBoard({ calledNumbers }: NumberBoardProps) {
  const numbers = Array.from({ length: 90 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-10 gap-1.5 p-2 rounded-lg bg-background">
      {numbers.map((num) => (
        <div
          key={num}
          className={`flex items-center justify-center aspect-square rounded-md font-bold text-sm transition-colors duration-300
            ${calledNumbers.has(num) ? 'bg-accent text-accent-foreground scale-110 shadow-lg' : 'bg-card'}`}
        >
          {num}
        </div>
      ))}
    </div>
  );
}

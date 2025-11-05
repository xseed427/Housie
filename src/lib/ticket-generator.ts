// A robust function to generate a valid 3x9 Tambola ticket with 15 numbers.
export function generateTicket(): (number | 0)[][] {
  let ticket: (number | 0)[][] = Array(3).fill(null).map(() => Array(9).fill(0));
  const usedNumbers = new Set<number>();

  // 1. Determine column counts: 15 numbers total, 1 to 3 per column.
  const colCounts = [1, 1, 1, 1, 1, 1, 1, 2, 3]; // A sample valid distribution
  // Shuffle for randomness
  for (let i = colCounts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colCounts[i], colCounts[j]] = [colCounts[j], colCounts[i]];
  }

  // 2. Populate ticket with unique numbers based on column counts
  for (let c = 0; c < 9; c++) {
    const count = colCounts[c];
    const min = c * 10 + 1;
    const max = c === 8 ? 90 : c * 10 + 10;
    const availableRows = [0, 1, 2];

    for (let i = 0; i < count; i++) {
      let num;
      do {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (usedNumbers.has(num));
      usedNumbers.add(num);

      const rowIndex = availableRows.splice(Math.floor(Math.random() * availableRows.length), 1)[0];
      ticket[rowIndex][c] = num;
    }
  }

  // 3. Ensure each row has exactly 5 numbers.
  for (let r = 0; r < 3; r++) {
    let numbersInRow = ticket[r].filter(n => n !== 0).length;
    
    // If row has less than 5 numbers, add more.
    while (numbersInRow < 5) {
      const emptyCols = ticket[r].map((val, idx) => val === 0 ? idx : -1).filter(idx => idx !== -1);
      const c = emptyCols[Math.floor(Math.random() * emptyCols.length)];
      const numbersInCol = ticket.map(row => row[c]).filter(n => n !== 0).length;

      if (numbersInCol < 3) {
        const min = c * 10 + 1;
        const max = c === 8 ? 90 : c * 10 + 10;
        let num;
        do {
            num = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (usedNumbers.has(num));
        usedNumbers.add(num);
        ticket[r][c] = num;
        numbersInRow++;
      }
    }

    // If row has more than 5, move one to another row.
     while (numbersInRow > 5) {
        const filledCols = ticket[r].map((val, idx) => val !== 0 ? idx : -1).filter(idx => idx !== -1);
        const c = filledCols[Math.floor(Math.random() * filledCols.length)];
        
        const emptyRowsInCol = [0, 1, 2].filter(i => i !== r && ticket[i][c] === 0);
        const targetRow = emptyRowsInCol[Math.floor(Math.random() * emptyRowsInCol.length)];
        
        if (targetRow !== undefined && ticket[targetRow].filter(n => n !== 0).length < 5) {
            ticket[targetRow][c] = ticket[r][c];
            ticket[r][c] = 0;
            numbersInRow--;
        }
    }
  }

  // 4. Sort numbers within each column.
  for (let c = 0; c < 9; c++) {
    const colValues = [ticket[0][c], ticket[1][c], ticket[2][c]].filter(n => n !== 0).sort((a, b) => a - b);
    let valIndex = 0;
    for (let r = 0; r < 3; r++) {
      if (ticket[r][c] !== 0) {
        ticket[r][c] = colValues[valIndex++];
      }
    }
  }
  
  // Final check - if something is wrong, try again.
  const totalNumbers = ticket.flat().filter(n => n !== 0).length;
  if(totalNumbers !== 15) {
    return generateTicket();
  }

  return ticket;
}

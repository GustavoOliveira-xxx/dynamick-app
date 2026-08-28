export function analyzeEliminations(records = []) {
  const analysis = {
    marked: 0,
    accurate: 0,
    sure: 0,
    sureAccurate: 0,
    correctOptionsEliminated: 0,
  };

  for (const record of records) {
    for (const [label, certainty] of Object.entries(record.eliminations ?? {})) {
      const option = record.options?.find((candidate) => candidate.label === label);
      if (!option || !['maybe', 'sure'].includes(certainty)) continue;

      analysis.marked += 1;
      if (option.isCorrect) analysis.correctOptionsEliminated += 1;
      else analysis.accurate += 1;

      if (certainty === 'sure') {
        analysis.sure += 1;
        if (!option.isCorrect) analysis.sureAccurate += 1;
      }
    }
  }

  return analysis;
}

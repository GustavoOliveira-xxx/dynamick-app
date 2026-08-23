






export function generateSimulation(pool, blueprint, totalRequested, seed = 'default') {
  const available = pool.filter((question) => !question.isRecovery);
  const used = new Set();
  const picked = [];
  const shortfall = [];

  function take(candidates, count) {
    let taken = 0;
    for (const candidate of candidates) {
      if (taken >= count) break;
      if (used.has(candidate.id)) continue;
      used.add(candidate.id);
      picked.push(candidate.id);
      taken += 1;
    }
    return taken;
  }


  for (const [topicSlug, count] of Object.entries(blueprint.topics ?? {})) {
    const candidates = sortStable(available.filter((q) => q.topicSlug === topicSlug));
    const taken = take(candidates, count);
    if (taken < count) {
      shortfall.push({ dimension: 'tópico', key: topicSlug, requested: count, available: taken });
    }
  }


  for (const [areaSlug, count] of Object.entries(blueprint.areas ?? {})) {
    const alreadyFromArea = picked.filter((id) =>
      available.some((q) => q.id === id && q.areaSlug === areaSlug),
    ).length;
    const missing = count - alreadyFromArea;
    if (missing <= 0) continue;

    const candidates = sortStable(available.filter((q) => q.areaSlug === areaSlug));
    const taken = take(candidates, missing);
    if (taken < missing) {
      shortfall.push({
        dimension: 'área',
        key: areaSlug,
        requested: count,
        available: alreadyFromArea + taken,
      });
    }
  }


  if (picked.length < totalRequested) {
    take(sortStable(available), totalRequested - picked.length);
    if (picked.length < totalRequested) {
      shortfall.push({
        dimension: 'total',
        key: 'questões',
        requested: totalRequested,
        available: picked.length,
      });
    }
  }

  const note =
    shortfall.length > 0
      ? `Não há questões publicadas suficientes para a matriz deste simulado: ${shortfall
          .map((item) => `${item.dimension} "${item.key}" pediu ${item.requested} e havia ${item.available}`)
          .join('; ')}. O simulado foi gerado com o que existe, sem repetir itens.`
      : null;

  return {
    questionIds: shuffleStable(picked.slice(0, totalRequested), seed),
    fallbackNote: note,
    shortfall,
  };
}


function sortStable(items) {
  return [...items].sort((a, b) => a.id.localeCompare(b.id));
}


function shuffleStable(items, seed) {
  const result = [...items];
  let state = 0;
  for (let i = 0; i < seed.length; i += 1) state = (state * 31 + seed.charCodeAt(i)) >>> 0;

  for (let i = result.length - 1; i > 0; i -= 1) {
    state = (state * 1103515245 + 12345) >>> 0;
    const j = state % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

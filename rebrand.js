// Rebrand pass for Ohm (Bill app, fileKey mwmHwXDuayUYeliDAlv3Fo).
// Paste into figma_execute (pass fileKey), then call:
//   return await rebrand(await figma.getNodeByIdAsync('<frameId>'));
//
// For every fill or stroke bound to a *library* variable, swap by name to the local `brand`
// collection. Anything not in REBRAND_MAP stays bound to the library. Walks into instances
// (writes overrides) and handles mixed text fills per range. Skips iOS kit chrome (layers named
// "iOS / ..."), whose variables belong to the iOS kit, not the shadcn kit.
// Returns counts plus any unbound solid paints (raw hex) it saw.
//
// Note: a bound paint keeps a fallback `color`. Instance overrides render that fallback until the
// binding resolves, so the swap writes the brand value as the fallback too (a black fallback made
// an overridden Item render black during testing).

const REBRAND_MAP = {
  'primary': 'primary',
  'ring': 'primary',
  'foreground': 'ink',
  'card-foreground': 'ink',
  'muted-foreground': 'ink-muted',
  'border': 'line',
  'input': 'line',
  'muted': 'surface-muted',
  'secondary': 'surface-muted',
};

async function brandVars() {
  const cols = await figma.variables.getLocalVariableCollectionsAsync();
  const col = cols.find(c => c.name === 'brand');
  if (!col) throw new Error('brand collection missing');
  const out = {};
  for (const id of col.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    out[v.name] = v;
  }
  return out;
}

function brandColor(v) {
  const val = v.valuesByMode[Object.keys(v.valuesByMode)[0]];
  return { r: val.r, g: val.g, b: val.b };
}

function insideIOS(node, root) {
  for (let p = node; p && p !== root.parent; p = p.parent) {
    if ((p.name || '').startsWith('iOS /')) return true;
  }
  return false;
}

async function loadFonts(t) {
  const fonts = t.characters.length ? t.getRangeAllFontNames(0, t.characters.length) : [t.fontName];
  for (const f of fonts) await figma.loadFontAsync(f);
}

async function rebrand(root) {
  const brand = await brandVars();
  const cache = new Map();
  const getVar = async id => {
    if (!cache.has(id)) cache.set(id, await figma.variables.getVariableByIdAsync(id));
    return cache.get(id);
  };
  const stats = { swapped: 0, kept: 0, byName: {}, raw: [] };

  async function swapPaints(paints, node, prop) {
    if (!Array.isArray(paints) || !paints.length) return null;
    let changed = false;
    const next = [];
    for (const p of paints) {
      const alias = p.boundVariables && p.boundVariables.color;
      if (!alias) {
        if (p.type === 'SOLID' && p.visible !== false) stats.raw.push(node.id + ' ' + node.name + ' ' + prop);
        next.push(p);
        continue;
      }
      const v = await getVar(alias.id);
      const target = v && v.remote && REBRAND_MAP[v.name] && brand[REBRAND_MAP[v.name]];
      if (target) {
        const bound = figma.variables.setBoundVariableForPaint(
          { type: 'SOLID', color: brandColor(target) }, 'color', target);
        next.push({ type: 'SOLID', color: bound.color, boundVariables: bound.boundVariables,
                    opacity: p.opacity, visible: p.visible, blendMode: p.blendMode });
        stats.swapped++;
        stats.byName[v.name] = (stats.byName[v.name] || 0) + 1;
        changed = true;
      } else {
        next.push(p);
        if (v && v.remote) stats.kept++;
      }
    }
    return changed ? next : null;
  }

  const nodes = [root, ...(root.findAll ? root.findAll(n => !insideIOS(n, root)) : [])];
  for (const n of nodes) {
    if ('fills' in n) {
      if (n.fills === figma.mixed && n.type === 'TEXT') {
        for (const seg of n.getStyledTextSegments(['fills'])) {
          const next = await swapPaints(seg.fills, n, 'fills[' + seg.start + ']');
          if (next) { await loadFonts(n); n.setRangeFills(seg.start, seg.end, next); }
        }
      } else if (n.fills !== figma.mixed) {
        const next = await swapPaints(n.fills, n, 'fills');
        if (next) n.fills = next;
      }
    }
    if ('strokes' in n && n.strokes !== figma.mixed) {
      const next = await swapPaints(n.strokes, n, 'strokes');
      if (next) n.strokes = next;
    }
  }
  stats.rawCount = stats.raw.length;
  stats.raw = stats.raw.slice(0, 20);
  return stats;
}

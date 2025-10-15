import { ChemicalReaction } from '../types/chemistry';

export function parseReaction(input: string): ChemicalReaction | null {
  try {
    // Split by arrow (→ or ->)
    const parts = input.split(/→|->/).map(p => p.trim());
    if (parts.length !== 2) return null;

    const reactants = parts[0].split('+').map(r => r.trim()).filter(Boolean);
    const products = parts[1].split('+').map(p => p.trim()).filter(Boolean);

    if (reactants.length === 0 || products.length === 0) return null;

    // Determine reaction type
    let type: ChemicalReaction['type'] = 'other';
    if (reactants.length > 1 && products.length === 1) {
      type = 'combination';
    } else if (reactants.length === 1 && products.length > 1) {
      type = 'decomposition';
    } else if (reactants.length === 2 && products.length === 2) {
      type = 'displacement';
    }

    return {
      id: Date.now().toString(),
      reactants,
      products,
      type,
      balanced: false, // Simplified - would need complex logic to verify
      equation: input,
    };
  } catch (error) {
    return null;
  }
}

export function parseFormula(formula: string): { element: string; count: number }[] {
  const atoms: { element: string; count: number }[] = [];
  const regex = /([A-Z][a-z]?)(\d*)/g;
  let match;

  while ((match = regex.exec(formula)) !== null) {
    if (match[1]) {
      atoms.push({
        element: match[1],
        count: match[2] ? parseInt(match[2]) : 1,
      });
    }
  }

  return atoms;
}

export const commonReactions = [
  { equation: '2H2 + O2 → 2H2O', name: 'Water Formation' },
  { equation: 'CH4 + 2O2 → CO2 + 2H2O', name: 'Methane Combustion' },
  { equation: 'N2 + 3H2 → 2NH3', name: 'Ammonia Synthesis' },
  { equation: 'CaCO3 → CaO + CO2', name: 'Limestone Decomposition' },
  { equation: 'Zn + 2HCl → ZnCl2 + H2', name: 'Zinc with Acid' },
  { equation: 'NaCl + AgNO3 → NaNO3 + AgCl', name: 'Precipitation Reaction' },
  { equation: 'Fe + CuSO4 → FeSO4 + Cu', name: 'Displacement Reaction' },
  { equation: '2Na + Cl2 → 2NaCl', name: 'Salt Formation' },
];

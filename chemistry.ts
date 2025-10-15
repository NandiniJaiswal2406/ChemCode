export interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: number;
  group?: number;
  period: number;
  category: string;
  electronConfig: string;
}

export interface Molecule {
  formula: string;
  name: string;
  atoms: { element: string; count: number }[];
  bonds: { type: 'single' | 'double' | 'triple'; atoms: [number, number] }[];
}

export interface ChemicalReaction {
  id: string;
  reactants: string[];
  products: string[];
  type: 'combination' | 'decomposition' | 'displacement' | 'redox' | 'other';
  balanced: boolean;
  equation: string;
}

export type Language = 'en' | 'hi' | 'mr';

export interface Translation {
  en: string;
  hi: string;
  mr: string;
}

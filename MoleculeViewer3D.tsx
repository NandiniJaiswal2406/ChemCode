import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Atom {
  element: string;
  x: number;
  y: number;
  z: number;
}

interface MoleculeViewer3DProps {
  formula: string;
  className?: string;
}

const elementColors: Record<string, string> = {
  H: '#ffffff',
  C: '#909090',
  N: '#3050f8',
  O: '#ff0d0d',
  S: '#ffff30',
  P: '#ff8000',
  Cl: '#1ff01f',
  F: '#90e050',
  Br: '#a62929',
};

export function MoleculeViewer3D({ formula, className = '' }: MoleculeViewer3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 300;
    canvas.height = 300;

    // Parse formula to get atoms
    const atoms = parseFormulaToAtoms(formula);

    let rotation = 0;
    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw bonds first
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
      for (let i = 0; i < atoms.length - 1; i++) {
        const atom1 = rotateAtom(atoms[i], rotation);
        const atom2 = rotateAtom(atoms[i + 1], rotation);
        
        ctx.beginPath();
        ctx.moveTo(centerX + atom1.x, centerY + atom1.y);
        ctx.lineTo(centerX + atom2.x, centerY + atom2.y);
        ctx.stroke();
      }

      // Draw atoms
      atoms.forEach((atom) => {
        const rotated = rotateAtom(atom, rotation);
        const scale = 1 + rotated.z / 200; // Pseudo 3D scaling
        const radius = 20 * scale;

        ctx.fillStyle = elementColors[atom.element] || '#cccccc';
        ctx.beginPath();
        ctx.arc(centerX + rotated.x, centerY + rotated.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw element symbol
        ctx.fillStyle = '#000';
        ctx.font = `${14 * scale}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(atom.element, centerX + rotated.x, centerY + rotated.y);
      });

      rotation += 0.01;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [formula]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-lg shadow-lg bg-gradient-to-br from-gray-900 to-gray-800"
      />
    </motion.div>
  );
}

function parseFormulaToAtoms(formula: string): Atom[] {
  const atoms: Atom[] = [];
  const regex = /([A-Z][a-z]?)(\d*)/g;
  let match;
  let index = 0;

  while ((match = regex.exec(formula)) !== null) {
    const element = match[1];
    const count = match[2] ? parseInt(match[2]) : 1;

    for (let i = 0; i < count; i++) {
      const angle = (index * Math.PI * 2) / 8;
      atoms.push({
        element,
        x: Math.cos(angle) * 60,
        y: Math.sin(angle) * 60,
        z: (index % 2) * 40 - 20,
      });
      index++;
    }
  }

  return atoms;
}

function rotateAtom(atom: Atom, rotation: number): Atom {
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  
  return {
    element: atom.element,
    x: atom.x * cos - atom.z * sin,
    y: atom.y,
    z: atom.x * sin + atom.z * cos,
  };
}

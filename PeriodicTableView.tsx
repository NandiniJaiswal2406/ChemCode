import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { periodicTable, categoryColors } from '../data/periodicTable';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Element } from '../types/chemistry';

export function PeriodicTableView() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const maxPeriod = Math.max(...periodicTable.map(e => e.period));
  const maxGroup = Math.max(...periodicTable.map(e => e.group || 0));

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Periodic Table of Elements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto pb-4">
            <div className="inline-grid gap-1 min-w-max" style={{ gridTemplateColumns: `repeat(18, minmax(60px, 1fr))` }}>
              {periodicTable.map((element) => {
                const gridColumn = element.group || (element.symbol === 'He' ? 18 : 1);
                const gridRow = element.period;

                return (
                  <motion.button
                    key={element.symbol}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedElement(element)}
                    className="aspect-square p-2 rounded-lg border-2 transition-all hover:shadow-lg flex flex-col items-center justify-center"
                    style={{
                      gridColumn,
                      gridRow,
                      backgroundColor: `${categoryColors[element.category]}15`,
                      borderColor: `${categoryColors[element.category]}50`,
                    }}
                  >
                    <span className="text-xs text-muted-foreground">{element.atomicNumber}</span>
                    <span className="font-bold">{element.symbol}</span>
                    <span className="text-xs truncate w-full text-center">{element.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-3">
            {Object.entries(categoryColors).map(([category, color]) => (
              <Badge
                key={category}
                variant="outline"
                className="px-3 py-1"
                style={{ borderColor: color, color }}
              >
                {category.replace('-', ' ')}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Element Detail Dialog */}
      <AnimatePresence>
        {selectedElement && (
          <Dialog open={!!selectedElement} onOpenChange={() => setSelectedElement(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl border-2"
                    style={{
                      backgroundColor: `${categoryColors[selectedElement.category]}20`,
                      borderColor: categoryColors[selectedElement.category],
                    }}
                  >
                    {selectedElement.symbol}
                  </div>
                  <div>
                    <h2>{selectedElement.name}</h2>
                    <Badge
                      style={{
                        backgroundColor: `${categoryColors[selectedElement.category]}20`,
                        color: categoryColors[selectedElement.category],
                      }}
                    >
                      {selectedElement.category}
                    </Badge>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  Detailed information about {selectedElement.name} (Element {selectedElement.atomicNumber})
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Atomic Number</p>
                    <p className="text-2xl">{selectedElement.atomicNumber}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Atomic Mass</p>
                    <p className="text-2xl">{selectedElement.atomicMass}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Period</p>
                    <p className="text-2xl">{selectedElement.period}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Group</p>
                    <p className="text-2xl">{selectedElement.group || 'N/A'}</p>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Electron Configuration</p>
                  <p className="font-mono">{selectedElement.electronConfig}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

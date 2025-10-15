import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChemicalReaction } from '../types/chemistry';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MoleculeViewer3D } from './MoleculeViewer3D';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

interface ReactionVisualizerProps {
  reaction: ChemicalReaction;
}

export function ReactionVisualizer({ reaction }: ReactionVisualizerProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: t('reactants'), compounds: reaction.reactants },
    { title: 'Reaction Process', compounds: [...reaction.reactants, ...reaction.products] },
    { title: t('products'), compounds: reaction.products },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Reaction Header */}
      <Card className="border-2 border-primary/20 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              {t('reactionType')}
            </CardTitle>
            <Badge variant="secondary" className="px-4 py-2">
              {t(reaction.type)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {reaction.reactants.map((reactant, idx) => (
              <React.Fragment key={`reactant-${idx}`}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.2 }}
                  className="px-6 py-3 bg-blue-500/10 border-2 border-blue-500/30 rounded-lg"
                >
                  <span className="text-blue-600 dark:text-blue-400">{reactant}</span>
                </motion.div>
                {idx < reaction.reactants.length - 1 && (
                  <span className="text-muted-foreground">+</span>
                )}
              </React.Fragment>
            ))}
            
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-8 h-8 text-primary" />
            </motion.div>

            {reaction.products.map((product, idx) => (
              <React.Fragment key={`product-${idx}`}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: (reaction.reactants.length + idx) * 0.2 }}
                  className="px-6 py-3 bg-green-500/10 border-2 border-green-500/30 rounded-lg"
                >
                  <span className="text-green-600 dark:text-green-400">{product}</span>
                </motion.div>
                {idx < reaction.products.length - 1 && (
                  <span className="text-muted-foreground">+</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step-by-step breakdown */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            Step-by-Step Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                  currentStep === idx
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                Step {idx + 1}
              </button>
            ))}
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-center mb-6">{steps[currentStep].title}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {steps[currentStep].compounds.map((compound, idx) => (
                <motion.div
                  key={`${currentStep}-${idx}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-center">{compound}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MoleculeViewer3D formula={compound} className="h-64" />
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm text-center text-muted-foreground">
                          Molecular visualization
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Glowing animation effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      </motion.div>
    </motion.div>
  );
}

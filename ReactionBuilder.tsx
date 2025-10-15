import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { parseReaction, commonReactions } from '../utils/reactionParser';
import { ChemicalReaction } from '../types/chemistry';
import { ReactionVisualizer } from './ReactionVisualizer';
import { FlaskConical, Plus, ArrowRight, Download, FileText } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ReactionBuilder() {
  const { t } = useLanguage();
  const [reactionInput, setReactionInput] = useState('');
  const [currentReaction, setCurrentReaction] = useState<ChemicalReaction | null>(null);
  const [selectedReactants, setSelectedReactants] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const commonCompounds = ['H2', 'O2', 'H2O', 'CO2', 'CH4', 'NH3', 'HCl', 'NaCl', 'CaCO3', 'N2'];

  const handleAnalyze = () => {
    const reaction = parseReaction(reactionInput);
    if (reaction) {
      setCurrentReaction(reaction);
      toast.success('Reaction analyzed successfully!');
    } else {
      toast.error('Invalid reaction format. Use format: A + B → C');
    }
  };

  const handleBuildReaction = () => {
    if (selectedReactants.length === 0 || selectedProducts.length === 0) {
      toast.error('Please select both reactants and products');
      return;
    }

    const equation = `${selectedReactants.join(' + ')} → ${selectedProducts.join(' + ')}`;
    const reaction = parseReaction(equation);
    if (reaction) {
      setCurrentReaction(reaction);
      toast.success('Reaction built successfully!');
    }
  };

  const handleExportPDF = () => {
    toast.success('Exporting to PDF... (Demo mode)');
    // In a real app, this would use a library like jsPDF
  };

  const handleExportPNG = () => {
    toast.success('Exporting to PNG... (Demo mode)');
    // In a real app, this would use html2canvas or similar
  };

  const toggleCompound = (compound: string, type: 'reactant' | 'product') => {
    if (type === 'reactant') {
      setSelectedReactants(prev =>
        prev.includes(compound) ? prev.filter(c => c !== compound) : [...prev, compound]
      );
    } else {
      setSelectedProducts(prev =>
        prev.includes(compound) ? prev.filter(c => c !== compound) : [...prev, compound]
      );
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-primary" />
            {t('enterReaction')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="text">{t('textInput')}</TabsTrigger>
              <TabsTrigger value="visual">{t('visualBuilder')}</TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., 2H2 + O2 → 2H2O"
                  value={reactionInput}
                  onChange={(e) => setReactionInput(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAnalyze} className="gap-2">
                  <FlaskConical className="w-4 h-4" />
                  {t('analyze')}
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Common reactions:</p>
                <div className="flex flex-wrap gap-2">
                  {commonReactions.map((reaction, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all"
                      onClick={() => setReactionInput(reaction.equation)}
                    >
                      {reaction.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="visual" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Reactants */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    {t('reactants')}
                  </h3>
                  <div className="flex flex-wrap gap-2 p-4 bg-muted rounded-lg min-h-24">
                    {selectedReactants.map((compound, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Badge
                          variant="default"
                          className="px-4 py-2 cursor-pointer"
                          onClick={() => toggleCompound(compound, 'reactant')}
                        >
                          {compound} ×
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {commonCompounds.map((compound) => (
                      <Badge
                        key={compound}
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-500 hover:text-white transition-all"
                        onClick={() => toggleCompound(compound, 'reactant')}
                      >
                        {compound}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Products */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5" />
                    {t('products')}
                  </h3>
                  <div className="flex flex-wrap gap-2 p-4 bg-muted rounded-lg min-h-24">
                    {selectedProducts.map((compound, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Badge
                          variant="default"
                          className="px-4 py-2 cursor-pointer bg-green-600"
                          onClick={() => toggleCompound(compound, 'product')}
                        >
                          {compound} ×
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {commonCompounds.map((compound) => (
                      <Badge
                        key={compound}
                        variant="outline"
                        className="cursor-pointer hover:bg-green-500 hover:text-white transition-all"
                        onClick={() => toggleCompound(compound, 'product')}
                      >
                        {compound}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Button onClick={handleBuildReaction} className="w-full gap-2">
                <FlaskConical className="w-4 h-4" />
                Build Reaction
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {currentReaction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleExportPDF} className="gap-2">
              <FileText className="w-4 h-4" />
              {t('exportPDF')}
            </Button>
            <Button variant="outline" onClick={handleExportPNG} className="gap-2">
              <Download className="w-4 h-4" />
              {t('exportPNG')}
            </Button>
          </div>

          <ReactionVisualizer reaction={currentReaction} />
        </motion.div>
      )}
    </div>
  );
}

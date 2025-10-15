import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ConceptCard } from './ConceptCard';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { useLanguage } from '../contexts/LanguageContext';
import { Atom, Link2, Droplet, FlaskConical, Zap, GitMerge } from 'lucide-react';
import { MoleculeViewer3D } from './MoleculeViewer3D';

interface Concept {
  id: string;
  titleKey: string;
  descKey: string;
  icon: any;
  gradient: string;
  details: {
    en: string[];
    hi: string[];
    mr: string[];
  };
  examples?: string[];
}

const concepts: Concept[] = [
  {
    id: 'atomic',
    titleKey: 'atomicStructure',
    descKey: 'atomicStructureDesc',
    icon: Atom,
    gradient: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900',
    details: {
      en: [
        'Protons: Positively charged particles in the nucleus',
        'Neutrons: Neutral particles in the nucleus',
        'Electrons: Negatively charged particles orbiting the nucleus',
        'Atomic number = number of protons',
        'Mass number = protons + neutrons',
      ],
      hi: [
        'प्रोटॉन: नाभिक में धनात्मक आवेशित कण',
        'न्यूट्रॉन: नाभिक में तटस्थ कण',
        'इलेक्ट्रॉन: नाभिक के चारों ओर घूमने वाले ऋणात्मक आवेशित कण',
        'परमाणु संख्या = प्रोटॉन की संख्या',
        'द्रव्यमान संख्या = प्रोटॉन + न्यूट्रॉन',
      ],
      mr: [
        'प्रोटॉन: केंद्रकातील धनात्मक आवेशित कण',
        'न्यूट्रॉन: केंद्रकातील तटस्थ कण',
        'इलेक्ट्रॉन: केंद्रकाभोवती फिरणारे ऋण आवेशित कण',
        'अणुक्रमांक = प्रोटॉनची संख्या',
        'वस्तुमान संख्या = प्रोटॉन + न्यूट्रॉन',
      ],
    },
    examples: ['H', 'O', 'C'],
  },
  {
    id: 'ionic',
    titleKey: 'ionic',
    descKey: 'ionicDesc',
    icon: Zap,
    gradient: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900',
    details: {
      en: [
        'Transfer of electrons between atoms',
        'Forms between metals and non-metals',
        'Creates oppositely charged ions',
        'Strong electrostatic attraction',
        'High melting and boiling points',
      ],
      hi: [
        'परमाणुओं के बीच इलेक्ट्रॉनों का स्थानांतरण',
        'धातुओं और अधातुओं के बीच बनता है',
        'विपरीत आवेशित आयन बनाता है',
        'मजबूत स्थिरवैद्युत आकर्षण',
        'उच्च गलनांक और क्वथनांक',
      ],
      mr: [
        'अणूंमध्ये इलेक्ट्रॉनांचे स्थानांतरण',
        'धातू आणि अधातूंमध्ये तयार होते',
        'विरुद्ध आवेशित आयन तयार करते',
        'मजबूत स्थिरवैद्युत आकर्षण',
        'उच्च वितळण्याचा आणि उकळण्याचा बिंदू',
      ],
    },
    examples: ['NaCl', 'MgO', 'CaCl2'],
  },
  {
    id: 'covalent',
    titleKey: 'covalent',
    descKey: 'covalentDesc',
    icon: Link2,
    gradient: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900',
    details: {
      en: [
        'Sharing of electrons between atoms',
        'Forms between non-metals',
        'Can form single, double, or triple bonds',
        'Lower melting and boiling points',
        'Can be polar or non-polar',
      ],
      hi: [
        'परमाणुओं के बीच इलेक्ट्रॉनों की साझेदारी',
        'अधातुओं के बीच बनता है',
        'एकल, दोहरे या तिहरे बंधन बना सकता है',
        'कम गलनांक और क्वथनांक',
        'ध्रुवीय या अध्रुवीय हो सकता है',
      ],
      mr: [
        'अणूंमध्ये इलेक्ट्रॉनांची सामायिकता',
        'अधातूंमध्ये तयार होते',
        'एकल, दुहेरी किंवा तिहेरी बंध तयार करू शकते',
        'कमी वितळण्याचा आणि उकळण्याचा बिंदू',
        'ध्रुवीय किंवा अध्रुवीय असू शकते',
      ],
    },
    examples: ['H2O', 'CO2', 'CH4'],
  },
  {
    id: 'metallic',
    titleKey: 'metallic',
    descKey: 'metallicDesc',
    icon: GitMerge,
    gradient: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900',
    details: {
      en: [
        'Sea of delocalized electrons',
        'Found in metal elements',
        'Conducts electricity and heat',
        'Malleable and ductile',
        'Metallic luster',
      ],
      hi: [
        'विस्थानिक इलेक्ट्रॉनों का सागर',
        'धातु तत्वों में पाया जाता है',
        'बिजली और गर्मी का संचालन करता है',
        'लचीला और तन्य',
        'धात्विक चमक',
      ],
      mr: [
        'विस्थापित इलेक्ट्रॉनांचा समुद्र',
        'धातू घटकांमध्ये आढळतो',
        'वीज आणि उष्णता चालवते',
        'लवचिक आणि तन्य',
        'धातूची चमक',
      ],
    },
    examples: ['Fe', 'Cu', 'Au'],
  },
  {
    id: 'acids',
    titleKey: 'acidsAndBases',
    descKey: 'acidsAndBases',
    icon: Droplet,
    gradient: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900',
    details: {
      en: [
        'Acids: Donate H+ ions, pH < 7',
        'Bases: Accept H+ ions, pH > 7',
        'Neutralization: Acid + Base → Salt + Water',
        'Indicators show pH changes',
        'Strong vs weak acids/bases',
      ],
      hi: [
        'अम्ल: H+ आयन दान करते हैं, pH < 7',
        'क्षार: H+ आयन स्वीकार करते हैं, pH > 7',
        'उदासीनीकरण: अम्ल + क्षार → लवण + जल',
        'संकेतक pH परिवर्तन दिखाते हैं',
        'प्रबल बनाम कमजोर अम्ल/क्षार',
      ],
      mr: [
        'आम्ल: H+ आयन दान करतात, pH < 7',
        'क्षार: H+ आयन स्वीकारतात, pH > 7',
        'तटस्थीकरण: आम्ल + क्षार → मीठ + पाणी',
        'सूचक pH बदल दर्शवितात',
        'मजबूत विरुद्ध कमकुवत आम्ल/क्षार',
      ],
    },
    examples: ['HCl', 'NaOH', 'H2SO4'],
  },
  {
    id: 'reactions',
    titleKey: 'reactionTypes',
    descKey: 'reactionTypes',
    icon: FlaskConical,
    gradient: 'bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900',
    details: {
      en: [
        'Combination: A + B → AB',
        'Decomposition: AB → A + B',
        'Displacement: AB + C → AC + B',
        'Redox: Transfer of electrons',
        'Double displacement: AB + CD → AD + CB',
      ],
      hi: [
        'संयोजन: A + B → AB',
        'अपघटन: AB → A + B',
        'विस्थापन: AB + C → AC + B',
        'रेडॉक्स: इलेक्ट्रॉनों का स्थानांतरण',
        'दोहरा विस्थापन: AB + CD → AD + CB',
      ],
      mr: [
        'संयोजन: A + B → AB',
        'विघटन: AB → A + B',
        'विस्थापन: AB + C → AC + B',
        'रेडॉक्स: इलेक्ट्रॉनांचे स्थानांतरण',
        'दुहेरी विस्थापन: AB + CD → AD + CB',
      ],
    },
    examples: ['2H2 + O2 → 2H2O', 'CaCO3 → CaO + CO2'],
  },
];

export function ConceptsView() {
  const { t, language } = useLanguage();
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {concepts.map((concept) => (
          <ConceptCard
            key={concept.id}
            title={t(concept.titleKey)}
            description={t(concept.descKey)}
            icon={concept.icon}
            gradient={concept.gradient}
            onClick={() => setSelectedConcept(concept)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedConcept && (
          <Dialog open={!!selectedConcept} onOpenChange={() => setSelectedConcept(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <selectedConcept.icon className="w-6 h-6 text-primary" />
                  </div>
                  {t(selectedConcept.titleKey)}
                </DialogTitle>
                <DialogDescription>
                  {t(selectedConcept.descKey)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedConcept.details[language].map((detail, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {selectedConcept.examples && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Examples</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedConcept.examples.map((example, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <Card className="border-2 hover:border-primary/50 transition-all">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-center">{example}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <MoleculeViewer3D formula={example} className="h-48" />
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

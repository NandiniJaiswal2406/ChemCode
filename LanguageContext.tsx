import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types/chemistry';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  appName: { en: "NAJ's ChemCode", hi: "NAJ's ChemCode", mr: "NAJ's ChemCode" },
  home: { en: 'Home', hi: 'होम', mr: 'होम' },
  concepts: { en: 'Concepts', hi: 'अवधारणाएं', mr: 'संकल्पना' },
  periodicTable: { en: 'Periodic Table', hi: 'आवर्त सारणी', mr: 'आवर्त सारणी' },
  reactions: { en: 'Reactions', hi: 'प्रतिक्रियाएं', mr: 'प्रतिक्रिया' },
  atomicStructure: { en: 'Atomic Structure', hi: 'परमाणु संरचना', mr: 'अणू रचना' },
  bonding: { en: 'Chemical Bonding', hi: 'रासायनिक बंधन', mr: 'रासायनिक बंध' },
  acidsAndBases: { en: 'Acids and Bases', hi: 'अम्ल और क्षार', mr: 'आम्ल आणि क्षार' },
  reactionTypes: { en: 'Reaction Types', hi: 'प्रतिक्रिया के प्रकार', mr: 'प्रतिक्रियांचे प्रकार' },
  enterReaction: { en: 'Enter Chemical Reaction', hi: 'रासायनिक प्रतिक्रिया दर्ज करें', mr: 'रासायनिक प्रतिक्रिया प्रविष्ट करा' },
  visualBuilder: { en: 'Visual Builder', hi: 'विजुअल बिल्डर', mr: 'व्हिज्युअल बिल्डर' },
  textInput: { en: 'Text Input', hi: 'टेक्स्ट इनपुट', mr: 'मजकूर इनपुट' },
  analyze: { en: 'Analyze', hi: 'विश्लेषण करें', mr: 'विश्लेषण करा' },
  exportPDF: { en: 'Export PDF', hi: 'PDF निर्यात करें', mr: 'PDF निर्यात करा' },
  exportPNG: { en: 'Export PNG', hi: 'PNG निर्यात करें', mr: 'PNG निर्यात करा' },
  reactants: { en: 'Reactants', hi: 'अभिकारक', mr: 'अभिकारक' },
  products: { en: 'Products', hi: 'उत्पाद', mr: 'उत्पादने' },
  reactionType: { en: 'Reaction Type', hi: 'प्रतिक्रिया प्रकार', mr: 'प्रतिक्रिया प्रकार' },
  combination: { en: 'Combination', hi: 'संयोजन', mr: 'संयोजन' },
  decomposition: { en: 'Decomposition', hi: 'अपघटन', mr: 'विघटन' },
  displacement: { en: 'Displacement', hi: 'विस्थापन', mr: 'विस्थापन' },
  redox: { en: 'Redox', hi: 'रेडॉक्स', mr: 'रेडॉक्स' },
  ionic: { en: 'Ionic Bonding', hi: 'आयनिक बंधन', mr: 'आयनिक बंध' },
  covalent: { en: 'Covalent Bonding', hi: 'सहसंयोजक बंधन', mr: 'सहसंयोजक बंध' },
  metallic: { en: 'Metallic Bonding', hi: 'धात्विक बंधन', mr: 'धातुबंध' },
  atomicStructureDesc: { 
    en: 'Atoms consist of a nucleus containing protons and neutrons, surrounded by electrons in energy levels.',
    hi: 'परमाणु में एक नाभिक होता है जिसमें प्रोटॉन और न्यूट्रॉन होते हैं, जो ऊर्जा स्तरों में इलेक्ट्रॉनों से घिरा होता है।',
    mr: 'अणूमध्ये प्रोटॉन आणि न्यूट्रॉन असलेले केंद्रक असते, ज्याभोवती ऊर्जा स्तरांमध्ये इलेक्ट्रॉन असतात।'
  },
  ionicDesc: {
    en: 'Ionic bonding involves the transfer of electrons from one atom to another, forming ions.',
    hi: 'आयनिक बंधन में एक परमाणु से दूसरे परमाणु में इलेक्ट्रॉनों का स्थानांतरण होता है, जिससे आयन बनते हैं।',
    mr: 'आयनिक बंधनामध्ये एका अणूपासून दुसऱ्या अणूकडे इलेक्ट्रॉनांचे स्थानांतरण होते, ज्यामुळे आयन तयार होतात.'
  },
  covalentDesc: {
    en: 'Covalent bonding involves the sharing of electrons between atoms.',
    hi: 'सहसंयोजक बंधन में परमाणुओं के बीच इलेक्ट्रॉनों की साझेदारी होती है।',
    mr: 'सहसंयोजक बंधनामध्ये अणूंमध्ये इलेक्ट्रॉनांची सामायिक होते.'
  },
  metallicDesc: {
    en: 'Metallic bonding involves a sea of delocalized electrons shared among metal atoms.',
    hi: 'धात्विक बंधन में धातु परमाणुओं के बीच साझा किए गए विस्थानिक इलेक्ट्रॉनों का सागर शामिल है।',
    mr: 'धातुबंधामध्ये धातूच्या अणूंमध्ये सामायिक केलेल्या विस्थापित इलेक्ट्रॉनांचा समुद्र असतो.'
  },
  explore: { en: 'Explore Chemistry', hi: 'रसायन विज्ञान का अन्वेषण करें', mr: 'रसायनशास्त्र एक्सप्लोर करा' },
  learnInteractive: { 
    en: 'Learn chemistry concepts interactively with 3D visualizations and step-by-step breakdowns.',
    hi: '3D विज़ुअलाइज़ेशन और चरण-दर-चरण विवरण के साथ रसायन विज्ञान की अवधारणाओं को इंटरैक्टिव रूप से सीखें।',
    mr: '3D व्हिज्युअलायझेशन आणि चरण-दर-चरण विश्लेषणासह रसायनशास्त्राच्या संकल्पना परस्परसंवादीपणे शिका.'
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

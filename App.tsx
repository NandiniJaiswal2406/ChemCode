import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { HomeView } from './components/HomeView';
import { ConceptsView } from './components/ConceptsView';
import { PeriodicTableView } from './components/PeriodicTableView';
import { ReactionBuilder } from './components/ReactionBuilder';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import {
  Home,
  BookOpen,
  Atom,
  FlaskConical,
  Menu,
  X,
  Languages,
  Moon,
  Sun,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';

type View = 'home' | 'concepts' | 'periodic' | 'reactions';

function AppContent() {
  const { t, language, setLanguage } = useLanguage();
  const [currentView, setCurrentView] = useState<View>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navigation = [
    { id: 'home' as View, icon: Home, labelKey: 'home' },
    { id: 'concepts' as View, icon: BookOpen, labelKey: 'concepts' },
    { id: 'periodic' as View, icon: Atom, labelKey: 'periodicTable' },
    { id: 'reactions' as View, icon: FlaskConical, labelKey: 'reactions' },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={(view) => setCurrentView(view as View)} />;
      case 'concepts':
        return <ConceptsView />;
      case 'periodic':
        return <PeriodicTableView />;
      case 'reactions':
        return <ReactionBuilder />;
      default:
        return <HomeView onNavigate={(view) => setCurrentView(view as View)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setCurrentView('home')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-2 bg-gradient-to-br from-primary to-purple-500 rounded-lg">
                <FlaskConical className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                {t('appName')}
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navigation.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? 'default' : 'ghost'}
                  onClick={() => setCurrentView(item.id)}
                  className="gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {t(item.labelKey)}
                </Button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Languages className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => setLanguage('en')}>
                    English {language === 'en' && '✓'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLanguage('hi')}>
                    हिंदी {language === 'hi' && '✓'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLanguage('mr')}>
                    मराठी {language === 'mr' && '✓'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <Button variant="outline" size="icon" onClick={toggleTheme}>
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-4 space-y-2 overflow-hidden"
              >
                {navigation.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? 'default' : 'ghost'}
                    onClick={() => {
                      setCurrentView(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start gap-2"
                  >
                    <item.icon className="w-4 h-4" />
                    {t(item.labelKey)}
                  </Button>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20 py-8 bg-muted/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-2">NAJ's ChemCode - Interactive Chemistry Education Platform</p>
          <p className="text-sm mb-3">
            Built with React, Motion, and modern web technologies
          </p>
          <div className="pt-3 border-t border-border/50">
            <p className="font-medium bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Created by Nandini Jaiswal
            </p>
            <p className="text-xs mt-1">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { Atom, Beaker, BookOpen, FlaskConical } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: string) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const { t } = useLanguage();

  const features = [
    {
      icon: BookOpen,
      titleKey: 'concepts',
      description: 'Learn fundamental chemistry concepts',
      action: () => onNavigate('concepts'),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Atom,
      titleKey: 'periodicTable',
      description: 'Explore elements and their properties',
      action: () => onNavigate('periodic'),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: FlaskConical,
      titleKey: 'reactions',
      description: 'Build and analyze chemical reactions',
      action: () => onNavigate('reactions'),
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <div className="flex justify-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="p-6 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full"
          >
            <Beaker className="w-20 h-20 text-primary" />
          </motion.div>
        </div>

        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {t('appName')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('learnInteractive')}
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-3"
          >
            <p className="text-sm text-muted-foreground">
              Created by{' '}
              <span className="font-semibold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Nandini Jaiswal
              </span>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.titleKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <Card
              className="border-2 hover:border-primary/50 transition-all hover:shadow-2xl cursor-pointer group overflow-hidden relative"
              onClick={feature.action}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <CardContent className="p-8 space-y-4">
                <div className={`p-4 bg-gradient-to-br ${feature.gradient} rounded-xl w-fit`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl">{t(feature.titleKey)}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
                <Button className="w-full group-hover:scale-105 transition-transform">
                  {t('explore')}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Elements', value: '118+' },
          { label: 'Reactions', value: '1000+' },
          { label: 'Concepts', value: '50+' },
          { label: 'Languages', value: '3' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + idx * 0.1 }}
          >
            <Card className="text-center p-6 border-2 hover:border-primary/50 transition-all">
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-muted-foreground">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
      >
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

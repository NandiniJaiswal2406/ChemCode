import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { LucideIcon } from 'lucide-react';

interface ConceptCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  onClick?: () => void;
}

export function ConceptCard({ title, description, icon: Icon, gradient, onClick }: ConceptCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card
        className={`cursor-pointer border-2 hover:border-primary/50 transition-all shadow-lg overflow-hidden relative ${gradient}`}
        onClick={onClick}
      >
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <Icon className="w-full h-full" />
        </div>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>{title}</CardTitle>
          </div>
          <CardDescription className="line-clamp-3">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}

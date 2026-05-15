import { Feature, UseCase, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '#' },
  { label: 'Concepto', href: '#concepto' },
  { label: 'Características', href: '#caracteristicas' },
  { label: 'Aplicaciones', href: '#aplicaciones' },
  { label: 'Contacto', href: '#contacto' },
];

export const FEATURES: Feature[] = [
  {
    id: 'acoustic',
    title: 'Aislamiento Acústico',
    description: 'Reducción de hasta 45dB para garantizar un entorno de silencio absoluto, vital en momentos de crisis.',
    iconName: 'VolumeX',
  },
  {
    id: 'sensory',
    title: 'Control Sensorial',
    description: 'Iluminación regulable y temperatura controlada para reducir la sobrecarga de estímulos externos.',
    iconName: 'EyeOff',
  },
  {
    id: 'privacy',
    title: 'Privacidad Total',
    description: 'Espacios diseñados para garantizar la confidencialidad absoluta entre el profesional y el afectado.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'rapid',
    title: 'Despliegue Rápido',
    description: 'Estructuras modulares montables en menos de 20 minutos en cualquier terreno o entorno.',
    iconName: 'Zap',
  },
];

export const USE_CASES: UseCase[] = [
  {
    id: 'disaster',
    title: 'Zonas de Desastre',
    description: 'Refugios temporales en escenarios de catástrofes naturales para estabilización inmediata.',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'clinical',
    title: 'Entornos Clínicos',
    description: 'Módulos de calma en hospitales saturados para el personal sanitario y familiares.',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'corporate',
    title: 'Espacios Corporativos',
    description: 'Salas de desconexión y PAP para empresas que priorizan la salud mental de sus equipos.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
  },
];

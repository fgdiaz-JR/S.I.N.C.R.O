import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  ShieldAlert, 
  Wind, 
  Lightbulb, 
  Cpu, 
  TrendingUp,
  Info,
  Lock,
  Bell,
  Thermometer,
  Sparkles
} from 'lucide-react';

// --- Types ---
interface Stage {
  id: string;
  label: string;
  title: string;
  instruction: string;
  interactive?: React.ReactNode;
  content: React.ReactNode;
}

// --- Components ---

const Balloon = ({ delay = 0 }: { delay?: number }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPopped, setIsPopped] = useState(false);
  
  useEffect(() => {
    setPosition({
      x: Math.random() * 100,
      y: Math.random() * 100,
    });
  }, []);

  if (isPopped) return null;

  return (
    <motion.div
      initial={{ y: '110vh', x: `${position.x}vw` }}
      animate={{ 
        y: '-10vh',
        x: [`${position.x}vw`, `${position.x + (Math.random() * 6 - 3)}vw`, `${position.x}vw`]
      }}
      transition={{ 
        y: { duration: 10 + Math.random() * 8, repeat: Infinity, ease: "linear", delay },
        x: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }}
      className="absolute w-10 h-10 bg-accent/15 backdrop-blur-sm rounded-full cursor-crosshair border border-accent/20 z-0 flex items-center justify-center hover:scale-150 transition-transform"
      onClick={() => setIsPopped(true)}
    >
      <div className="w-1 h-1 bg-accent/40 rounded-full" />
    </motion.div>
  );
};

export default function App() {
  const [currentStage, setCurrentStage] = useState(0);
  const [cabinStatus, setCabinStatus] = useState({
    locked: false,
    ventilation: false,
    light: 'Normal',
    alertSent: false
  });

  const stages: Stage[] = [
    {
      id: 'start',
      label: 'Misión 01: Identificación',
      title: 'El Vacío de Intervención',
      instruction: 'Analiza el escenario actual antes de activar SINCRO.',
      content: (
        <div className="space-y-6 text-left">
          <p className="text-lg text-ink font-serif italic">Imagina un entorno institucional saturado. Una crisis ocurre a la vista de todos.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-5 bg-accent-soft/50 border border-accent/20 rounded-2xl">
                <h4 className="font-bold text-accent text-xs uppercase mb-2 font-sans tracking-widest">Problema</h4>
                <p className="text-sm">Las rutas tradicionales fallan cuando el paciente no puede caminar al consultorio debido al bloqueo emocional.</p>
             </div>
             <div className="p-5 bg-white border border-line rounded-2xl">
                <h4 className="font-bold text-ink text-xs uppercase mb-2 font-sans tracking-widest">Solución SINCRO</h4>
                <p className="text-sm">Llevamos la intervención de primeros auxilios psicológicos al pasillo, eliminando la barrera de desplazamiento.</p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'step1',
      label: 'Misión 02: Aislamiento',
      title: 'Privacidad Instantánea',
      instruction: 'Prueba la función de sellado hermético de la cabina.',
      interactive: (
        <button 
          onClick={() => setCabinStatus(prev => ({ ...prev, locked: !prev.locked }))}
          className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold font-sans tracking-widest label-xs transition-all ${cabinStatus.locked ? 'bg-accent text-paper' : 'bg-paper border border-ink text-ink shadow-lg active:scale-95'}`}
        >
          {cabinStatus.locked ? <Lock size={20} /> : <ShieldAlert size={20} />}
          {cabinStatus.locked ? 'CABINA SELLADA' : 'SELLAR CABINA'}
        </button>
      ),
      content: (
        <div className="space-y-4 text-left">
          <p className="text-lg font-serif">SINCRO elimina la **Exposición Pública** al sellarse.</p>
          <div className={`p-6 border-l-4 transition-all duration-700 ${cabinStatus.locked ? 'border-accent bg-accent-soft/40' : 'border-line bg-paper-dark'}`}>
            <p className="text-sm italic font-serif">"Al sellar la compuerta retráctil, el estigma desaparece, deteniendo la escalada de vergüenza y ansiedad."</p>
          </div>
        </div>
      ),
    },
    {
      id: 'step2',
      label: 'Misión 03: Grounding',
      title: 'Regulación Sensorial',
      instruction: 'Inicia los protocolos de aterrizaje fisiológico.',
      interactive: (
        <div className="flex gap-4">
          <button 
            onClick={() => setCabinStatus(prev => ({ ...prev, ventilation: !prev.ventilation }))}
            className={`p-4 px-6 rounded-xl border flex items-center gap-3 label-xs font-sans transition-all ${cabinStatus.ventilation ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-inner' : 'bg-white border-line text-ink'}`}
          >
            <Wind size={20} className={cabinStatus.ventilation ? 'animate-spin' : ''} /> {cabinStatus.ventilation ? 'ACTIVO' : 'CHOQUE TÉRMICO'}
          </button>
          <button 
            onClick={() => setCabinStatus(prev => ({ ...prev, light: cabinStatus.light === 'Zen' ? 'Normal' : 'Zen' }))}
            className={`p-4 px-6 rounded-xl border flex items-center gap-3 label-xs font-sans transition-all ${cabinStatus.light === 'Zen' ? 'bg-amber-50 border-amber-200 text-amber-600 shadow-inner' : 'bg-white border-line text-ink'}`}
          >
            <Lightbulb size={20} /> CROMOTERAPIA {cabinStatus.light === 'Zen' ? 'ON' : 'OFF'}
          </button>
        </div>
      ),
      content: (
        <div className="space-y-4 text-left">
          <p className="text-lg font-serif">El sistema nervioso necesita **Aterrizaje Fisiológico**.</p>
          <p className="text-sm text-neutral-accent font-serif leading-loose italic">
            Mediante ventilación forzada y luz LED regulada, desactivamos el estado de hiperalerta, induciendo una respiración pausada y bajando el cortisol.
          </p>
        </div>
      ),
    },
    {
      id: 'step3',
      label: 'Misión 04: Soporte',
      title: 'Alerta Pasiva',
      instruction: 'Notifica al sistema de apoyo institucional.',
      interactive: (
        <button 
          disabled={cabinStatus.alertSent}
          onClick={() => setCabinStatus(prev => ({ ...prev, alertSent: true }))}
          className={`flex items-center gap-4 px-10 py-5 rounded-2xl font-bold font-sans text-xs tracking-widest transition-all ${cabinStatus.alertSent ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 shadow-lg active:scale-95'}`}
        >
          {cabinStatus.alertSent ? <Sparkles size={20} /> : <Bell size={20} />}
          {cabinStatus.alertSent ? 'SOPORTE EN CAMINO' : 'NOTIFICAR PSICOLOGÍA'}
        </button>
      ),
      content: (
        <div className="space-y-6 text-left">
          <p className="text-lg font-serif italic text-ink">Trasladamos la responsabilidad de la ayuda.</p>
          <p className="text-sm font-serif">Durante la crisis, el individuo pierde la capacidad de pedir ayuda. SINCRO avisa automáticamente al departamento de orientación sobre la ubicación y duración del evento.</p>
        </div>
      ),
    },
    {
      id: 'scaling',
      label: 'Nivel Final: Implementación',
      title: 'Presupuesto y Escalamiento',
      instruction: 'Analiza los costos de llevar SINCRO a tu institución.',
      content: (
        <div className="space-y-6">
          <div className="overflow-hidden shadow-xl border border-line rounded-3xl bg-white">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-paper-dark border-b border-line">
                  <th className="p-5 label-xs font-sans font-black">Infraestructura</th>
                  <th className="p-5 label-xs font-sans font-black text-right">Inversión (COP)</th>
                </tr>
              </thead>
              <tbody className="font-serif">
                <tr className="border-b border-line hover:bg-accent-soft/20 transition-colors">
                  <td className="p-4 px-6">Unidad Acústica Modular (Aislamiento 30dB)</td>
                  <td className="p-4 px-6 text-right font-bold">$8.5M - $12M</td>
                </tr>
                <tr className="border-b border-line hover:bg-accent-soft/20 transition-colors">
                  <td className="p-4 px-6">Mecánica Industrial y Sellado Activo</td>
                  <td className="p-4 px-6 text-right font-bold">$1.5M - $2.5M</td>
                </tr>
                <tr className="border-b border-line hover:bg-accent-soft/20 transition-colors">
                  <td className="p-4 px-6">Sistemas de Control (PLC) y Software</td>
                  <td className="p-4 px-6 text-right font-bold">$2.2M - $4M</td>
                </tr>
                <tr className="border-b border-line hover:bg-accent-soft/20 transition-colors">
                  <td className="p-4 px-6">Climatización HVAC y Cromoterapia DMX</td>
                  <td className="p-4 px-6 text-right font-bold">$0.8M - $1.5M</td>
                </tr>
              </tbody>
              <tfoot className="bg-ink text-paper">
                <tr>
                  <td className="p-5 px-6 font-sans font-black tracking-[0.2em] text-[10px] uppercase">Costo por Cabina Operativa</td>
                  <td className="p-5 px-6 text-right font-serif text-2xl italic font-light">$13.000.000 - $20.000.000</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ),
    }
  ];

  const handleNext = () => {
    if (currentStage < stages.length - 1) setCurrentStage(currentStage + 1);
  };

  const handlePrev = () => {
    if (currentStage > 0) setCurrentStage(currentStage - 1);
  };

  return (
    <div className="h-screen w-full bg-paper overflow-hidden font-sans text-ink flex flex-col relative select-none">
      
      {/* Background Interactive Elements */}
      {[...Array(15)].map((_, i) => (
        <Balloon key={i} delay={i * 1.5} />
      ))}

      {/* Aesthetic Overlays */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-accent via-accent/50 to-accent z-40"></div>
      <div className="absolute left-[30px] top-0 bottom-0 w-px bg-line opacity-20 z-10"></div>
      <div className="absolute right-[30px] top-0 bottom-0 w-px bg-line opacity-20 z-10"></div>

      {/* Header Navigation */}
      <header className="h-24 flex items-center justify-between px-12 z-20 border-b border-line bg-paper/80 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-serif tracking-tighter font-black text-ink"
          >
            SINCRO<span className="text-accent">.</span>
          </motion.h1>
          <div className="h-4 w-px bg-line"></div>
          <span className="label-xs text-neutral-accent opacity-60 tracking-[0.3em]">Simulation Interface v1.0</span>
        </div>
        
        <div className="flex items-center gap-10">
           <div className="flex gap-1.5 items-baseline">
              {stages.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 rounded-full transition-all duration-700 ${idx === currentStage ? 'w-10 bg-accent' : idx < currentStage ? 'w-2 bg-ink/50' : 'w-2 bg-line'}`} 
                />
              ))}
           </div>
        </div>
      </header>

      {/* Central Interactive Content Area */}
      <main className="flex-1 flex items-center justify-center p-6 lg:p-20 relative z-20 overflow-hidden">
        <div className="w-full max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -15 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
              className="bg-white/60 backdrop-blur-2xl border border-line p-10 lg:p-20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[4rem] relative overflow-hidden"
            >
              {/* Internal Accents */}
              <div className="absolute top-0 right-0 p-12">
                 <span className="label-xs text-neutral-accent opacity-20 italic">Task: 0{currentStage + 1}</span>
              </div>
              <div className="absolute top-[40%] left-[-2px] h-20 w-1 bg-accent rounded-r-full"></div>

              <div className="max-w-3xl">
                 <h2 className="label-xs text-accent mb-8 font-black tracking-[0.5em] flex items-center gap-4">
                   <div className="w-2 h-2 rounded-full bg-accent animate-ping"></div>
                   {stages[currentStage].label}
                 </h2>
                 <h1 className="text-5xl lg:text-7xl font-serif text-ink tracking-tight mb-12 leading-none italic">
                   {stages[currentStage].title}
                 </h1>
                 
                 <div className="space-y-12">
                    <div className="flex items-center gap-4 p-4 border border-line/50 bg-paper/50 rounded-2xl">
                       <div className="p-3 bg-white rounded-xl shadow-sm text-accent"><Sparkles size={20} /></div>
                       <p className="text-sm font-sans font-bold uppercase tracking-widest text-ink/70">
                         Instrucción: <span className="text-neutral-accent font-normal italic lowercase">{stages[currentStage].instruction}</span>
                       </p>
                    </div>

                    {/* Simulation Engine Area */}
                    {stages[currentStage].interactive && (
                      <div className="py-12 flex justify-center bg-paper-dark/30 border-y border-line/40 rounded-[2rem] shadow-inner">
                         {stages[currentStage].interactive}
                      </div>
                    )}

                    <div className="min-h-[140px] transition-all">
                       {stages[currentStage].content}
                    </div>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation & Controls */}
      <footer className="h-32 flex items-center justify-between px-12 z-20 border-t border-line bg-paper/80 backdrop-blur-md">
        <div className="flex gap-4">
          <button 
            onClick={handlePrev}
            disabled={currentStage === 0}
            className={`p-6 border border-line hover:bg-white hover:shadow-xl rounded-2xl transition-all flex items-center gap-4 label-xs font-black ${currentStage === 0 ? 'opacity-10 cursor-not-allowed' : 'text-ink cursor-pointer'}`}
          >
            <ChevronLeft size={16} /> Retroceder
          </button>
          
          <button 
            onClick={handleNext}
            disabled={currentStage === stages.length - 1}
            className={`p-6 px-14 bg-ink text-paper hover:bg-accent hover:shadow-xl rounded-2xl transition-all flex items-center gap-4 label-xs font-black ${currentStage === stages.length - 1 ? 'opacity-10 cursor-not-allowed' : 'cursor-pointer'}`}
          >
             {currentStage === stages.length - 2 ? 'Finalizar Tutorial' : 'Continuar'} <ChevronRight size={16} />
          </button>
        </div>

        <div className="hidden lg:flex flex-col items-end">
           <div className="flex gap-6 mb-3">
              <div className="flex items-center gap-2 label-xs text-neutral-accent opacity-50"><Wind size={12} /> VENT</div>
              <div className="flex items-center gap-2 label-xs text-neutral-accent opacity-50"><Lightbulb size={12} /> CROMO</div>
              <div className="flex items-center gap-2 label-xs text-neutral-accent opacity-50"><Bell size={12} /> ALERT</div>
           </div>
           <p className="text-sm font-serif italic text-ink font-light opacity-80 decoration-accent/30 underline underline-offset-8">S.I.N.C.R.O - Ingeniería de la Calma</p>
        </div>
      </footer>

      {/* Interaction Hint */}
      <div className="absolute bottom-40 right-14 z-30 pointer-events-none hidden lg:block opacity-30">
         <div className="flex items-center gap-5 label-xs text-neutral-accent vertical-text rotate-180 font-black tracking-[0.4em]">
            EXPLOTAR ANSIEDAD <div className="w-16 h-px bg-accent"></div>
         </div>
      </div>

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
        }
        .cursor-crosshair {
          cursor: crosshair;
        }
      `}</style>
    </div>
  );
}

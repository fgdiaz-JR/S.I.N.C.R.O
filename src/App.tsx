import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Wind, 
  Lightbulb, 
  Cpu, 
  Bell, 
  Activity,
  Zap,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Volume2,
  Database
} from 'lucide-react';

// --- Game Logic Constants ---
const CRISIS_INCREMENT = 0.5;
const STABILIZATION_RATE = 1.2;

// --- Components ---

const StressBalloon = ({ onPop }: { onPop: () => void, key?: React.Key }) => {
  const [position] = useState({
    x: Math.random() * 80 + 10,
    delay: Math.random() * 5
  });

  return (
    <motion.div
      initial={{ y: '110vh', x: `${position.x}%` }}
      animate={{ y: '-10vh' }}
      transition={{ duration: 6 + Math.random() * 4, delay: position.delay, repeat: Infinity, ease: "linear" }}
      className="absolute w-8 h-8 md:w-12 md:h-12 bg-red-400/20 backdrop-blur-sm rounded-full cursor-crosshair border border-red-500/30 z-20 flex items-center justify-center hover:bg-red-400/40 transition-colors"
      onClick={onPop}
    >
      <div className="w-1 h-1 bg-red-500 rounded-full animate-ping" />
    </motion.div>
  );
};

const DataBar = ({ value, color = "bg-accent" }: { value: number, color?: string }) => (
  <div className="w-full h-1 bg-ink/10 rounded-full overflow-hidden">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      className={`h-full ${color} transition-all duration-300`}
    />
  </div>
);

const TerminalLine = ({ text, delay = 0 }: { text: string, delay?: number }) => (
  <motion.p 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="text-[10px] uppercase font-mono tracking-widest text-neutral-accent mb-1"
  >
    {`> ${text}`}
  </motion.p>
);

export default function App() {
  // Game State
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'SUCCESS' | 'GAMEOVER'>('START');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [crisisLevel, setCrisisLevel] = useState(50);
  const [score, setScore] = useState(0);
  
  // Cabin Subsystems
  const [systems, setSystems] = useState({
    sealed: false,
    ventilation: false,
    chromotherapy: 0, // 0 to 100 intensity
  });

  // Data Logs Unlocked
  const [unlockedLogs, setUnlockedLogs] = useState<string[]>([]);

  // Sound Simulation (Visual cues)
  const [alertPulse, setAlertPulse] = useState(false);

  const popBalloon = useCallback(() => {
    setCrisisLevel(prev => Math.max(0, prev - 5));
    setScore(prev => prev + 50);
  }, []);

  // --- Game Loop ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'PLAYING') {
      interval = setInterval(() => {
        setCrisisLevel(prev => {
          let modifier = CRISIS_INCREMENT;
          
          // Logic: System synergy reduces crisis
          if (systems.sealed) modifier -= 0.8;
          if (systems.ventilation) modifier -= 0.6;
          if (systems.chromotherapy > 50) modifier -= 0.4;

          const next = Math.max(0, Math.min(100, prev + modifier));
          
          if (next >= 100) setGameState('GAMEOVER');
          if (next <= 0) handleLevelComplete();
          
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [gameState, systems]);

  const handleLevelComplete = () => {
    setGameState('SUCCESS');
    setScore(prev => prev + 1000);
    // Move logic to "Mission Success" screen
  };

  const restartLevel = () => {
    setCrisisLevel(50);
    setSystems({ sealed: false, ventilation: false, chromotherapy: 0 });
    setGameState('PLAYING');
  };

  const startMission = (level: number) => {
    setCurrentLevel(level);
    restartLevel();
  };

  // --- Content ---
  const missions = [
    {
      id: 'papy',
      title: 'Protocolo de Emergencia',
      description: 'Un estudiante está sufriendo un ataque de pánico en el pasillo principal.',
      objective: 'Sella la cabina y activa el choque térmico para estabilizar.',
      log: 'S.I.N.C.R.O es una infraestructura física automatizada de "primeros auxilios psicológicos" diseñada para superar picos de ansiedad en zonas de alto tráfico.'
    },
    {
      id: 'grounding',
      title: 'Aterrizaje Sensorial',
      description: 'El ruido ambiental está impidiendo la respiración del usuario.',
      objective: 'Optimiza la cromoterapia y mantén el sellado acústico.',
      log: 'Grounding Fisiológico: Mediante ventilación forzada y cromoterapia, se reducen niveles de cortisol e induce una respiración pausada.'
    },
    {
      id: 'alert',
      title: 'Conexión Institucional',
      description: 'La crisis requiere respuesta del departamento de psicología.',
      objective: 'Activa el sistema de Alerta Pasiva mientras mantienes la calma.',
      log: 'Alerta Pasiva: El sistema notifica automáticamente a orientación, trasladando la responsabilidad de buscar ayuda del paciente al sistema.'
    }
  ];

  return (
    <div className="h-screen w-full bg-paper text-ink font-sans overflow-hidden flex flex-col relative select-none">
      
      {/* Dynamic Background */}
      <div className={`absolute inset-0 transition-colors duration-1000 pointer-events-none z-0 ${crisisLevel > 80 ? 'bg-red-50' : crisisLevel < 20 ? 'bg-accent/5' : 'bg-transparent'}`} />
      
      {/* Interactive Balloons for stress relief */}
      {gameState === 'PLAYING' && crisisLevel > 30 && [...Array(5)].map((_, i) => (
        <StressBalloon key={i} onPop={popBalloon} />
      ))}

      {/* Header / Telemetry Bar */}
      <header className="h-20 border-b border-line bg-white/80 backdrop-blur-md px-8 flex items-center justify-between z-50">
        <div className="flex items-center gap-6">
          <div className="p-2 bg-ink text-paper rounded-lg">
            <Cpu size={20} className={gameState === 'PLAYING' ? 'animate-pulse' : ''} />
          </div>
          <div>
            <h1 className="text-xl font-serif font-black tracking-tighter">SINCRO INTERACTIVE</h1>
            <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-accent">Simulador de Regulación Neuro-Comunitaria</p>
          </div>
        </div>

        <div className="flex items-center gap-12">
          <div className="hidden md:block w-48">
            <div className="flex justify-between mb-1">
              <span className="text-[9px] font-bold uppercase tracking-widest">Nivel de Crisis</span>
              <span className={`text-[9px] font-bold ${crisisLevel > 70 ? 'text-red-500' : 'text-accent'}`}>{Math.round(crisisLevel)}%</span>
            </div>
            <DataBar value={crisisLevel} color={crisisLevel > 70 ? 'bg-red-500' : 'bg-accent'} />
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-accent">Puntaje Operativo</span>
            <span className="text-xl font-serif italic">{score.toLocaleString()} PTS</span>
          </div>
        </div>
      </header>

      {/* Main Gameplay Screen */}
      <main className="flex-1 flex flex-col lg:flex-row p-6 gap-6 z-10 overflow-hidden">
        
        {/* Sidebar: System Logs & Telemetry */}
        <aside className="w-full lg:w-72 flex flex-col gap-6">
          <div className="flex-1 bg-ink text-paper/90 p-5 rounded-3xl font-mono relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Database size={60} />
            </div>
            <h3 className="text-[10px] font-bold mb-4 border-b border-paper/10 pb-2 text-accent">SYSTEM_LOGS_v4.2</h3>
            <div className="space-y-1">
              <TerminalLine text="BOOTING_SINCRO_CORE..." />
              <TerminalLine text="CONNECTION_ESTABLISHED" delay={0.5} />
              <TerminalLine text={`MISSION_TYPE: ${missions[currentLevel].id.toUpperCase()}`} delay={1} />
              <TerminalLine text={`STATUS: ${gameState}`} delay={1.5} />
              <TerminalLine text={`TEMP: ${systems.ventilation ? '21°C' : '28°C'}`} delay={2} />
              <TerminalLine text={`DOOR: ${systems.sealed ? 'LOCKED' : 'OPEN'}`} delay={2.5} />
              {crisisLevel > 60 && <TerminalLine text="WARNING: HIGH_CORTISOL_DETECTED" delay={0} />}
            </div>
          </div>

          <div className="h-48 bg-white border border-line rounded-3xl p-5 flex flex-col justify-center gap-4">
             <div className="flex items-center gap-3">
               <div className={`p-2 rounded-lg ${systems.sealed ? 'bg-accent text-paper' : 'bg-paper-dark text-neutral-accent'}`}>
                  <Lock size={16} />
               </div>
               <span className="text-[10px] font-bold uppercase tracking-widest">Sellado Acústico</span>
             </div>
             <div className="flex items-center gap-3">
               <div className={`p-2 rounded-lg ${systems.ventilation ? 'bg-blue-500 text-paper' : 'bg-paper-dark text-neutral-accent'}`}>
                  <Wind size={16} className={systems.ventilation ? 'animate-spin' : ''} />
               </div>
               <span className="text-[10px] font-bold uppercase tracking-widest">Flujo de Aire (HVAC)</span>
             </div>
             <Activity className="w-full h-8 text-line mt-2" />
          </div>
        </aside>

        {/* Central Display */}
        <div className="flex-1 relative bg-paper-dark/30 rounded-[3rem] border border-line flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {gameState === 'START' && (
              <motion.div 
                key="start"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-center p-12 max-w-lg"
              >
                <div className="w-20 h-20 bg-accent text-paper rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-accent/20">
                  <Play size={40} fill="currentColor" />
                </div>
                <h2 className="text-4xl font-serif font-black mb-4 italic">Iniciar Simulación</h2>
                <p className="text-neutral-accent text-sm mb-8 leading-relaxed">
                  Toma el control de la cabina SINCRO. Tu misión es estabilizar a los usuarios en crisis mediante acciones precisas de aislamiento y regulación.
                </p>
                <button 
                  onClick={() => startMission(0)}
                  className="px-12 py-4 bg-ink text-paper rounded-2xl font-bold font-sans tracking-[0.2em] text-xs hover:bg-accent hover:shadow-xl transition-all active:scale-95"
                >
                  ACEPTAR MISIÓN
                </button>
              </motion.div>
            )}

            {gameState === 'PLAYING' && (
              <motion.div 
                key="playing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full flex flex-col p-12"
              >
                <div className="flex-1 flex flex-col justify-center items-center">
                  <div className={`relative w-64 h-80 transition-all duration-700 ${systems.sealed ? 'scale-100 rotate-0' : 'scale-95 -rotate-2 opacity-60'}`}>
                    {/* The Cabin Visualizer */}
                    <div className={`absolute inset-0 border-4 rounded-3xl shadow-2xl overflow-hidden flex flex-col ${systems.sealed ? 'border-accent' : 'border-ink/20 border-dashed'}`}>
                       <div className={`flex-1 transition-colors duration-1000 flex items-center justify-center`} style={{ backgroundColor: `rgba(13, 148, 136, ${systems.chromotherapy / 200})` }}>
                          <Activity size={40} className={crisisLevel > 50 ? 'animate-bounce text-ink/20' : 'text-accent/40'} />
                       </div>
                       {systems.ventilation && (
                         <div className="absolute top-0 inset-x-0 h-4 bg-blue-500/20 blur-sm animate-pulse" />
                       )}
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-line shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <AlertTriangle className="text-accent" size={20} />
                    <h3 className="text-xs font-bold uppercase tracking-widest">{missions[currentLevel].title}</h3>
                  </div>
                  <p className="text-sm text-neutral-accent mb-6 leading-relaxed italic border-l-2 border-accent pl-4">
                    {missions[currentLevel].objective}
                  </p>
                </div>
              </motion.div>
            )}

            {gameState === 'SUCCESS' && (
               <motion.div 
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-12 max-w-2xl"
              >
                <CheckCircle2 size={80} className="text-accent mx-auto mb-8" />
                <h2 className="text-4xl font-serif font-black mb-4">Misión Exitosa</h2>
                <p className="text-neutral-accent text-sm mb-12">Crisis estabilizada. Has desbloqueado un registro de datos del proyecto.</p>
                
                <div className="bg-white p-8 rounded-[2rem] border border-line text-left mb-12 shadow-sm">
                  <h4 className="text-[10px] font-bold text-accent uppercase mb-4 tracking-widest">Registro Desbloqueado:</h4>
                  <p className="font-serif text-lg leading-relaxed italic">{missions[currentLevel].log}</p>
                </div>

                <button 
                  onClick={() => {
                    if (currentLevel < missions.length - 1) {
                      startMission(currentLevel + 1);
                    } else {
                      setGameState('START');
                      setCurrentLevel(0);
                    }
                  }}
                  className="px-12 py-4 bg-ink text-paper rounded-2xl font-bold font-sans tracking-[0.2em] text-xs hover:bg-accent transition-all"
                >
                  {currentLevel < missions.length - 1 ? 'SIGUIENTE NIVEL' : 'RESET SIMULACIÓN'}
                </button>
              </motion.div>
            )}

            {gameState === 'GAMEOVER' && (
               <motion.div 
                key="gameover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-12"
              >
                <ShieldAlert size={80} className="text-red-500 mx-auto mb-8 animate-bounce" />
                <h2 className="text-4xl font-serif font-black mb-4">CRISIS FUERA DE CONTROL</h2>
                <p className="text-neutral-accent text-sm mb-12">El sistema no pudo contener el pico de ansiedad del usuario.</p>
                <button 
                  onClick={restartLevel}
                  className="flex items-center gap-3 mx-auto px-10 py-4 bg-red-500 text-paper rounded-2xl font-bold font-sans tracking-[0.2em] text-xs"
                >
                  <RotateCcw size={16} /> REINTENTAR PROTOCOLO
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Sidebar: Controls */}
        <aside className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-white border border-line rounded-[3rem] p-8 flex-1 shadow-sm flex flex-col gap-10">
             <div className="flex flex-col gap-4">
               <div className="flex justify-between items-center">
                 <span className="label-xs font-black tracking-widest opacity-40">SELLADO</span>
                 {systems.sealed ? <Lock className="text-accent" size={14} /> : <Unlock className="text-neutral-accent" size={14} />}
               </div>
               <button 
                disabled={gameState !== 'PLAYING'}
                onClick={() => setSystems(s => ({ ...s, sealed: !s.sealed }))}
                className={`w-full h-16 rounded-2xl flex items-center justify-center font-black tracking-[0.2em] text-[10px] transition-all border ${systems.sealed ? 'bg-accent text-paper border-accent shadow-lg shadow-accent/20' : 'bg-paper text-ink border-line active:scale-95'}`}
               >
                 {systems.sealed ? 'CABINA CERRADA' : 'CERRAR PUERTA RECURRENTE'}
               </button>
             </div>

             <div className="flex flex-col gap-4">
               <div className="flex justify-between items-center">
                 <span className="label-xs font-black tracking-widest opacity-40">VENTILACIÓN</span>
                 <Wind size={14} className={systems.ventilation ? 'animate-spin text-blue-500' : 'text-neutral-accent'} />
               </div>
               <button 
                disabled={gameState !== 'PLAYING'}
                onClick={() => setSystems(s => ({ ...s, ventilation: !s.ventilation }))}
                className={`w-full h-16 rounded-2xl flex items-center justify-center font-black tracking-[0.2em] text-[10px] transition-all border ${systems.ventilation ? 'bg-blue-500 text-paper border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-paper text-ink border-line active:scale-95'}`}
               >
                 {systems.ventilation ? 'SISTEMA HVAC ACTIVO' : 'ACTIVAR CHOQUE TÉRMICO'}
               </button>
             </div>

             <div className="flex-1 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="label-xs font-black tracking-widest opacity-40">LUZ LED RGB</span>
                  <span className="text-[10px] font-mono">{systems.chromotherapy}%</span>
                </div>
                <div className="flex-1 flex items-center justify-center p-4 bg-paper-dark rounded-[2rem] border border-line shadow-inner">
                   <input 
                    type="range" 
                    disabled={gameState !== 'PLAYING'}
                    min="0" 
                    max="100" 
                    value={systems.chromotherapy} 
                    onChange={(e) => setSystems(s => ({ ...s, chromotherapy: parseInt(e.target.value) }))}
                    className="w-full accent-accent h-2 bg-line rounded-lg appearance-none cursor-pointer"
                   />
                </div>
                <p className="text-[9px] text-neutral-accent font-serif text-center italic">Ajusta para alcanzar el espectro de calma</p>
             </div>
          </div>

          <div className="bg-ink p-8 rounded-[3rem] text-paper flex items-center justify-between">
             <div className="flex flex-col">
                <span className="text-[9px] font-black tracking-widest text-accent mb-1 uppercase">Alert Status</span>
                <span className="font-serif italic text-lg leading-none">Normal</span>
             </div>
             <Bell className={crisisLevel > 70 ? 'text-red-500 animate-bounce' : 'text-paper opacity-20'} />
          </div>
        </aside>
      </main>

      {/* Interactive Footer / Progress */}
      <footer className="h-24 px-12 border-t border-line bg-white/80 backdrop-blur-md z-50 flex items-center justify-between">
        <div className="flex items-center gap-8">
           <div className="flex gap-1.5">
              {missions.map((_, idx) => (
                <div key={idx} className={`w-3 h-3 rounded-full transition-all duration-500 ${idx === currentLevel ? 'bg-accent' : idx < currentLevel ? 'bg-ink' : 'bg-line'}`} />
              ))}
           </div>
           <div className="h-4 w-px bg-line"></div>
           <p className="label-xs text-neutral-accent tracking-[0.2em]">MISIÓN {currentLevel + 1} DE {missions.length}</p>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-ink/30 italic font-serif">
           <Volume2 size={16} />
           <p className="text-xs">Motorización DC Gestionada por L298N...</p>
        </div>

        <div className="flex items-center gap-4">
           {gameState === 'PLAYING' && (
             <button 
              onClick={() => setGameState('START')}
              className="p-4 border border-line rounded-xl label-xs font-black tracking-widest text-ink hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all"
             >
               ABORTAR
             </button>
           )}
        </div>
      </footer>

      {/* Global CSS for some elements */}
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          background: #0D9488;
          border-radius: 50%;
          cursor: pointer;
          border: 4px solid white;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
      `}</style>
    </div>
  );
}

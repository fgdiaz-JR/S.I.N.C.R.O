import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-paper">
      {/* Editorial Grid Lines */}
      <div className="absolute inset-0 border-[40px] border-paper-dark pointer-events-none hidden lg:block"></div>
      <div className="absolute left-1/3 top-0 bottom-0 w-px bg-line hidden lg:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <p className="font-sans uppercase text-[11px] tracking-[0.3em] text-neutral-accent mb-6 font-bold">Primeros Auxilios Psicológicos</p>
            <h1 className="text-6xl lg:text-8xl font-serif leading-[0.9] text-ink mb-10 tracking-tighter">
              Espacios de <br/> <span className="italic font-light text-slate-accent">Contención</span>
            </h1>
            <p className="text-xl text-ink leading-relaxed mb-12 max-w-lg font-serif italic">
              "El silencio no es la ausencia de sonido, sino la presencia de claridad emocional."
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-10 py-5 bg-ink text-paper font-sans uppercase text-[10px] tracking-[0.2em] hover:bg-slate-accent transition-colors font-bold">
                Consultar Especificaciones
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-7 relative mt-16 lg:mt-0 flex justify-center items-center"
          >
            <div className="w-full aspect-[4/3] bg-paper-dark p-8 lg:p-12 shadow-sm border border-line relative">
              <div className="absolute inset-4 lg:inset-8 border border-white/50 pointer-events-none"></div>
              <div className="bg-white p-8 lg:p-12 h-full w-full shadow-2xl flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <div className="w-16 h-1 bg-ink"></div>
                   <span className="label-xs text-neutral-accent italic opacity-60">Prototipo C-800 / Vista Interior</span>
                </div>
                <div className="flex-1 flex items-center justify-center py-12">
                   <img
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
                    alt="Quiet space concept"
                    className="max-h-full object-cover grayscale brightness-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="grid grid-cols-2 gap-8 border-t border-line pt-8">
                  <div>
                    <span className="label-xs text-neutral-accent block mb-1">Atestación</span>
                    <span className="text-3xl font-serif italic font-light">-45 dB</span>
                  </div>
                  <div>
                    <span className="label-xs text-neutral-accent block mb-1">Montaje</span>
                    <span className="text-3xl font-serif italic font-light">14 Minutos</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

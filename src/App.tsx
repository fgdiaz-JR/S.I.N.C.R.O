import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import CaseStudies from './components/CaseStudies';
import { ArrowRight } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Concepto Section */}
        <section id="concepto" className="py-32 border-y border-line bg-paper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 gap-20 items-center">
              <div className="lg:col-span-6 relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 border-l border-t border-line hidden lg:block"></div>
                <div className="p-4 bg-paper-dark border border-line">
                  <img
                    src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=800"
                    alt="Zen interior"
                    className="grayscale brightness-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-ink p-10 text-paper hidden lg:block max-w-[280px]">
                  <p className="text-4xl font-serif italic mb-2">98%</p>
                  <p className="label-xs text-paper/80 leading-tight">Reducción inmediata de los niveles de cortisol reportado.</p>
                </div>
              </div>
              
              <div className="lg:col-span-6 mt-20 lg:mt-0">
                <p className="label-xs text-slate-accent mb-6 font-bold">Respuesta Cognitiva</p>
                <h2 className="text-5xl font-serif tracking-tight mb-10 leading-tight">¿Por qué una <br/> <span className="italic font-light">cámara aislante</span>?</h2>
                <div className="space-y-8 text-lg text-ink font-serif leading-relaxed italic">
                  <p>
                    En momentos críticos, la sobreestimulación impide que el proceso de Primeros Auxilios Psicológicos sea efectivo.
                  </p>
                  <p className="text-neutral-accent font-normal not-italic">
                    Nuestras cámaras son <span className="text-ink font-medium">biotopos de seguridad cognitiva</span>. Al eliminar el ruido externo, permitimos que el sistema nervioso parasimpático tome el control, facilitando la desescalada emocional.
                  </p>
                </div>
                
                <div className="mt-12 pt-12 border-t border-line grid grid-cols-2 gap-12">
                  <div>
                    <h4 className="label-xs text-ink mb-2">Privacidad</h4>
                    <p className="text-sm text-neutral-accent font-serif font-light italic">Confidencialidad absoluta y ética en el terreno.</p>
                  </div>
                  <div>
                    <h4 className="label-xs text-ink mb-2">Empatía</h4>
                    <p className="text-sm text-neutral-accent font-serif font-light italic">Un espacio que comunica seguridad sin palabras.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeatureGrid />
        
        <CaseStudies />

        {/* Contacto Section */}
        <section id="contacto" className="py-32 bg-paper-dark border-t border-line relative overflow-hidden">
          {/* Decorative Vertical Grid Lines */}
          <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20">
             <div className="w-px h-full bg-line ml-20"></div>
             <div className="w-px h-full bg-line mr-20"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-12 gap-20">
              <div className="lg:col-span-5">
                <p className="label-xs text-slate-accent mb-6 font-bold">Colaboración</p>
                <h2 className="text-5xl font-serif text-ink tracking-tight mb-8 italic">Contáctenos.</h2>
                <p className="text-lg text-neutral-accent font-serif mb-16 leading-relaxed italic pr-12">
                  Ya sea una organización gubernamental o una corporación, tenemos una solución modular diseñada para su equipo.
                </p>
                
                <div className="space-y-12">
                  <div className="flex flex-col gap-2">
                    <p className="label-xs text-ink/40 font-bold uppercase tracking-widest">Sede Central</p>
                    <p className="text-xl font-serif">Madrid, España / CDMX, México</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="label-xs text-ink/40 font-bold uppercase tracking-widest">Email</p>
                    <p className="text-xl font-serif underline decoration-line underline-offset-4">info@serenitate.pap</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 mt-16 lg:mt-0 border border-line bg-paper p-10 lg:p-16">
                <form className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-4">
                      <label className="label-xs text-ink">Nombre Completo</label>
                      <input type="text" className="bg-transparent border-b border-line py-2 focus:border-ink outline-none transition-colors font-serif italic" />
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="label-xs text-ink">E-mail Corporativo</label>
                      <input type="email" className="bg-transparent border-b border-line py-2 focus:border-ink outline-none transition-colors font-serif italic" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <label className="label-xs text-ink">Organización</label>
                    <input type="text" className="bg-transparent border-b border-line py-2 focus:border-ink outline-none transition-colors font-serif italic" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <label className="label-xs text-ink">Mensaje</label>
                    <textarea rows={4} className="bg-transparent border-b border-line py-2 focus:border-ink outline-none transition-colors font-serif italic resize-none"></textarea>
                  </div>
                  <button className="px-12 py-5 bg-ink text-paper label-xs hover:bg-slate-accent transition-colors flex items-center gap-4">
                    Enviar Consulta <ArrowRight size={14} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-paper py-16 border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-baseline gap-8">
          <div className="flex items-center gap-4">
            <span className="text-xl font-serif tracking-tight font-medium">Serenitate</span>
          </div>
          
          <div className="label-xs text-neutral-accent text-center md:text-left">
            © 2026 Serenitate Innovations. Estandares de Salud Mental en Crisis.
          </div>
          
          <div className="flex gap-8">
             <a href="#" className="label-xs text-neutral-accent hover:text-ink transition-colors">LinkedIn</a>
             <a href="#" className="label-xs text-neutral-accent hover:text-ink transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

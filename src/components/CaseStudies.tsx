import React from 'react';
import { USE_CASES } from '../constants';

export default function CaseStudies() {
  return (
    <section id="aplicaciones" className="py-32 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-24">
          <p className="label-xs text-neutral-accent mb-4">Despliegue Operativo</p>
          <h2 className="text-5xl font-serif text-ink tracking-tight italic">
            Versatilidad en el Escenario
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {USE_CASES.map((useCase) => (
            <div key={useCase.id} className="group flex flex-col">
              <div className="aspect-[4/5] bg-paper-dark mb-8 relative border border-line p-4">
                <div className="w-full h-full overflow-hidden">
                   <img
                    src={useCase.imageUrl}
                    alt={useCase.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 brightness-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <h3 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-ink mb-3">{useCase.title}</h3>
              <p className="text-sm text-neutral-accent font-serif leading-relaxed">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

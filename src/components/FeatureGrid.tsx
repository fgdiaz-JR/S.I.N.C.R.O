import React from 'react';
import * as LucideIcons from 'lucide-react';
import { FEATURES } from '../constants';

export default function FeatureGrid() {
  return (
    <section id="caracteristicas" className="py-24 bg-paper-dark border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-20">
          <p className="label-xs text-slate-accent mb-4">Ingeniería Humana</p>
          <h2 className="text-5xl lg:text-6xl font-serif text-ink tracking-tight mb-6">
            Estandares de <span className="italic font-light">Mitigación</span>
          </h2>
          <p className="text-lg text-neutral-accent font-serif leading-relaxed italic">
            Protocolos técnicos desarrollados para la reducción del ruido cognitivo en entornos de alta presión.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          {FEATURES.map((feature, index) => {
            return (
              <div
                key={feature.id}
                className="bg-paper p-10 group hover:bg-paper-dark transition-colors"
              >
                <div className="font-sans text-[10px] border border-ink rounded-full w-6 h-6 flex items-center justify-center shrink-0 mb-8 font-bold">
                  0{index + 1}
                </div>
                <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-ink mb-4">{feature.title}</h3>
                <p className="text-sm text-neutral-accent leading-relaxed font-serif">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

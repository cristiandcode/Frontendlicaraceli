import React from "react";
import { FaWhatsapp, FaCalendarCheck } from "react-icons/fa";

const ActionCall = () => {
  // Número de la Lic. Araceli (Misiones)
  const phoneNumber = "5493765130012";
  const message = "Hola Lic. Araceli, deseo agendar una sesión de psicología. Quedo a la espera de su respuesta.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <section className="py-12 bg-primary/5 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="bg-white p-8 md:p-12 shadow-2xl rounded-2xl border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 text-center md:text-left">
            {/* Icono y etiqueta en Rosa Viejo */}
            <div className="flex items-center justify-center md:justify-start gap-3 text-primary">
              <FaCalendarCheck className="text-2xl" />
              <span className="font-bold uppercase tracking-widest text-sm">Atención Profesional</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary leading-tight">
              Comienza tu camino <br className="hidden md:block" /> hacia el bienestar
            </h2>
            <p className="text-gray-600 max-w-xl text-lg">
              Agenda tu sesión virtual hoy mismo. Obtén un acompañamiento 
              profesional, cálido y humano desde el primer momento. 
              Coordina tu turno directamente para una respuesta ágil.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25d366] hover:bg-[#20bd5a] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-green-500/20 w-full md:min-w-[280px]"
            >
              <FaWhatsapp className="text-2xl" />
              AGENDAR POR WHATSAPP
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ActionCall;
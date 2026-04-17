import React from "react";
import { FaWhatsapp, FaCalendarCheck } from "react-icons/fa";

const ActionCall = () => {
  const phoneNumber = "5493765130012";
  const message = "Hola Lic. Araceli, deseo agendar una sesión de psicología. Quedo a la espera de su respuesta.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Color Rosa Viejo de la Licenciada extraído de tu @theme
  const rosaViejo = "#b07d88";

  return (
    <section 
      id="action-call" 
      className="py-16 transition-colors duration-300"
      style={{ backgroundColor: rosaViejo }} 
    >
      <div className="container mx-auto px-4">
        <div className="bg-white p-8 md:p-12 shadow-2xl rounded-3xl border border-white/20 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Columna de Texto */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 text-primary">
              <FaCalendarCheck className="text-2xl" />
              <span className="font-bold uppercase tracking-widest text-sm">Atención Profesional</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary leading-tight">
              Comienza tu camino <br className="hidden md:block" /> hacia el bienestar
            </h2>
            <p className="text-slate-600 max-w-xl text-lg">
              Agenda tu sesión virtual hoy mismo. Obtén un acompañamiento 
              profesional, cálido y humano desde el primer momento. 
              Coordina tu turno directamente para una respuesta ágil.
            </p>
          </div>

          {/* Botón de Acción */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25d366] hover:bg-[#20bd5a] text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-green-500/20 w-full md:min-w-[300px] text-lg"
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
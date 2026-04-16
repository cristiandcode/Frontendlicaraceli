import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  // Número de la Lic. Araceli (Misiones)
  const phoneNumber = "5493765130012"; 
  
  // Mensaje personalizado para la Licenciada
  const message = "Hola Lic. Araceli, me gustaría realizar una consulta sobre sus sesiones de psicología.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
      {/* Efecto de pulso animado detrás del botón (Color oficial de WA) */}
      <span className="absolute inline-flex h-14 w-14 animate-ping rounded-full bg-[#25d366] opacity-20"></span>
      
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative bg-[#25d366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        {/* Tooltip con fondo limpio (sin dark mode) */}
        <span className="absolute right-16 bg-white text-slate-800 px-3 py-1 rounded-md text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md whitespace-nowrap pointer-events-none border border-slate-200">
          ¿En qué puedo ayudarte?
        </span>
        
        <FaWhatsapp className="text-3xl" />
      </a>
    </div>
  );
};

export default WhatsappButton;
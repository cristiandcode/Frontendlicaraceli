import React from "react";
import { FaGlobeAmericas, FaWhatsapp, FaEnvelope, FaClock, FaVideo } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="bg-slate-50 py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <header className="mb-10 text-center md:text-left">
          {/* Borde lateral Rosa Viejo */}
          <h1 className="text-4xl font-bold border-l-4 border-primary pl-4 uppercase tracking-tight text-secondary">
            Contacto y Modalidad
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 md:p-10 shadow-xl rounded-2xl overflow-hidden">
          {/* Información de Contacto */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-primary">Atención 100% Virtual</h2>
              <p className="text-gray-600 font-medium">
                Sesiones diseñadas para brindar un ambiente de calma, escucha y confidencialidad 
                desde la comodidad de tu hogar, sin importar dónde te encuentres.
              </p>
            </div>

            <div className="space-y-6">
              {/* Ubicación/Alcance */}
              <div className="flex items-start gap-4 group">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <FaGlobeAmericas className="text-primary group-hover:text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-secondary">Alcance</h3>
                  <p className="text-gray-600 text-sm">Desde Leandro N. Alem, Misiones</p>
                  <p className="text-gray-600 text-sm italic">Atención a toda la Argentina y el exterior.</p>
                </div>
              </div>

              {/* Horarios */}
              <div className="flex items-start gap-4 group">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <FaClock className="text-primary group-hover:text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-secondary">Disponibilidad</h3>
                  <p className="text-gray-600 text-sm">
                    Lunes a Viernes: Horarios a convenir según disponibilidad.
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4 group">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <FaWhatsapp className="text-primary group-hover:text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-secondary">WhatsApp</h3>
                  <p className="text-gray-600 text-sm">+54 9 376 513-0012</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <FaEnvelope className="text-primary group-hover:text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-secondary">Email Profesional</h3>
                  <p className="text-gray-600 text-sm underline hover:text-primary transition-colors">aracelirojas.ps@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de Modalidad (Reemplaza al mapa) */}
          <div className="w-full min-h-[400px] flex flex-col items-center justify-center bg-slate-50 border border-gray-100 rounded-2xl p-8 text-center space-y-6">
            <div className="bg-white p-6 rounded-full shadow-inner">
              <FaVideo size={80} className="text-primary/40 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-secondary">¿Cómo son las sesiones?</h3>
            <p className="text-gray-500 max-w-sm">
              Utilizamos plataformas seguras como <b>Google Meet</b> o <b>WhatsApp Video</b>. 
              Solo necesitas una conexión estable a internet y un espacio tranquilo.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="bg-white px-4 py-2 rounded-full text-xs font-bold text-primary border border-primary/20 shadow-sm">SIMPLE</span>
              <span className="bg-white px-4 py-2 rounded-full text-xs font-bold text-primary border border-primary/20 shadow-sm">SEGURO</span>
              <span className="bg-white px-4 py-2 rounded-full text-xs font-bold text-primary border border-primary/20 shadow-sm">CONFIDENCIAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
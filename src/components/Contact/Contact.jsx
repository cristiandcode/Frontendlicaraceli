import React from "react";
import { FaGlobeAmericas, FaWhatsapp, FaEnvelope, FaClock } from "react-icons/fa";

const Contact = () => {
  // Dirección codificada para la URL del mapa
  const mapAddress = encodeURIComponent("Av. Bustamante 2991, N3300 Posadas, Misiones");
  const mapSrc = `https://maps.google.com/maps?q=${mapAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="contact" className="bg-rosasuave py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold border-l-4 border-primary pl-4 uppercase tracking-tight text-secondary">
            Contacto y Modalidad
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 md:p-10 shadow-xl rounded-2xl overflow-hidden border border-primary/5">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-primary">Atención Presencial y Virtual</h2>
              <p className="text-gray-600 font-medium">
                Sesiones diseñadas para brindar un ambiente de calma, escucha y confidencialidad. 
                Podemos encontrarnos de forma <strong>presencial</strong> en nuestro consultorio o 
                mediante <strong>videollamada</strong> desde la comodidad de tu hogar.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <FaGlobeAmericas className="text-primary group-hover:text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-secondary">Ubicación y Alcance</h3>
                  <p className="text-gray-600 text-sm">Av. Bustamante 2991, Posadas, Misiones</p>
                  <p className="text-gray-600 text-sm italic">Atención presencial y virtual a todo el país.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <FaClock className="text-primary group-hover:text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-secondary">Disponibilidad</h3>
                  <p className="text-gray-600 text-sm">Lunes a Viernes: Horarios a convenir.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <FaWhatsapp className="text-primary group-hover:text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-secondary">WhatsApp</h3>
                  <p className="text-gray-600 text-sm">+54 9 376 513-0012</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <FaEnvelope className="text-primary group-hover:text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-secondary">Email Profesional</h3>
                  <p className="text-gray-600 text-sm underline hover:text-primary transition-colors">rojassilvia05@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna de Mapa de Google */}
          <div className="w-full h-[400px] md:h-auto min-h-[400px] rounded-2xl overflow-hidden shadow-inner border border-gray-100">
            <iframe
              title="Ubicación Sindicato de Camioneros Posadas"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
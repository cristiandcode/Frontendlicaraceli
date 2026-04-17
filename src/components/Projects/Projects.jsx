import React from "react";
import { FaUserShield, FaHandHoldingHeart, FaBrain, FaClipboardCheck } from "react-icons/fa";

const CommitmentsData = [
  {
    id: 1,
    name: "Secreto Profesional",
    icon: <FaUserShield className="text-4xl text-primary" />,
    description: "Tu privacidad es la base del proceso. Todas nuestras sesiones se rigen bajo el más estricto secreto profesional y ética ética psicológica."
  },
  {
    id: 2,
    name: "Espacio de Contención",
    icon: <FaHandHoldingHeart className="text-4xl text-primary" />,
    description: "Un lugar seguro de escucha empática y sin juicios, diseñado para que puedas expresarte con total libertad y confianza."
  },
  {
    id: 3,
    name: "Enfoque Terapéutico",
    icon: <FaBrain className="text-4xl text-primary" />,
    description: "Utilizo herramientas validadas para abordar la salud mental de forma integral, adaptándome a tus necesidades y ritmo personal."
  },
  {
    id: 4,
    name: "Cercanía y Seguimiento",
    icon: <FaClipboardCheck className="text-4xl text-primary" />,
    description: "Acompañamiento constante durante tu proceso terapéutico, enfocado en lograr cambios profundos y bienestar emocional duradero."
  },
];

const Projects = () => {
  return (
    <>
      <span id="project"></span>
      <div className="bg-white py-14 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <h1 className="uppercase text-3xl font-bold tracking-widest text-secondary">
              Mi Compromiso Profesional
            </h1>
            {/* Línea decorativa Rosa Viejo */}
            <div className="h-1.5 w-16 bg-primary mx-auto mt-3 rounded-full"></div>
          </header>
          
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {CommitmentsData.map(({ id, name, icon, description }) => {
                return (
                  <div 
                    key={id} 
                    className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="mb-5 transform group-hover:scale-110 transition-transform duration-300">
                      {icon}
                    </div>
                    <div className="space-y-3">
                      <h1 className="text-2xl font-bold text-secondary group-hover:text-primary transition-colors">
                        {name}
                      </h1>
                      <p className="text-gray-600 leading-relaxed italic text-sm md:text-base">
                        "{description}"
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Projects;
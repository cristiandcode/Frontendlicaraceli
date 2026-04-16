import React from "react";
import { FaUsers, FaChild, FaPray } from "react-icons/fa";

const skillsData = [
  {
    name: "Psicología Social y Grupal",
    icon: <FaUsers className="text-5xl text-primary group-hover:text-white duration-300" />,
    description: "Especialista en terapias grupales y procesos vinculares, trabajando la comunicación y la resolución de conflictos desde una mirada social.",
  },
  {
    name: "Niñez, Género y Familia",
    icon: <FaChild className="text-5xl text-primary group-hover:text-white duration-300" />,
    description: "Acompañamiento profesional en infancias y problemáticas de género, brindando un espacio seguro para el desarrollo integral.",
  },
  {
    name: "Abordaje Cristiano",
    icon: <FaPray className="text-5xl text-primary group-hover:text-white duration-300" />,
    description: "Atención especializada para pacientes cristianos, integrando la escucha profesional con el respeto a los valores y la fé.",
  },
];

const Skills = () => {
  return (
    <div id="skills" className="bg-white text-secondary py-14 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold border-b-4 border-primary inline-block pb-2">
            Áreas de Práctica
          </h2>
          <p className="mt-4 text-gray-500 italic font-medium">
            Atención personalizada y remota para cada etapa de la vida.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="group space-y-3 p-6 bg-slate-50 hover:bg-primary duration-300 text-secondary hover:text-white rounded-xl shadow-md hover:shadow-2xl transition-all cursor-default"
            >
              <div className="pb-2">{skill.icon}</div>
              <h1 className="text-2xl font-bold tracking-tight">{skill.name}</h1>
              <p className="text-slate-600 group-hover:text-white/90 leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
import React from "react";
// Importación de la imagen del estudio/consultorio
import AboutImg from "../../assets/fotoconsultoriolic.jpeg";

const About = () => {
  return (
    <section id="about" className="bg-rosaviejo text-white py-16 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Columna de Texto */}
          <div className="space-y-6 order-2 md:order-1">
            <h1 className="text-4xl font-bold border-l-4 border-white pl-4 text-white">
              Sobre la Lic. <span className="text-white/90">Araceli Rojas</span>
            </h1>
            
            <p className="text-white text-lg leading-relaxed font-medium">
              Soy Licenciada en Psicología y Técnica en Psicología Social. MP2274. Con una vocación profunda por el acompañamiento humano. Desde el año 2017, me desempeño profesionalmente en las áreas de niñez, género, familia y discapacidad, brindando un espacio de contención basado en el respeto y la ética profesional.
            </p>
            
            <p className="text-white/90 text-lg leading-relaxed">
              Mi enfoque integra la psicología clínica con una mirada social, especializándome en terapias grupales y en la atención a pacientes cristianos. Mi compromiso es ofrecer un espacio seguro y profesional, actualmente de manera <strong>100% remota</strong>, para que la distancia no sea un obstáculo en tu proceso de sanación.
            </p>
            
            {/* Etiquetas de Formación Rápida - En blanco sólido para resaltar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <h3 className="font-bold text-primary italic">Formación Base</h3>
                <p className="text-sm text-secondary font-medium">UCAD - Universidad de Ciencias y Administración</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <h3 className="font-bold text-primary italic">Especialidades</h3>
                <p className="text-sm text-secondary font-medium">Adolescencia, Mujeres y Violencias</p>
              </div>
            </div>

            {/* Listado de Diplomados y Posgrados */}
            <div className="pt-2">
              <h3 className="font-bold text-white mb-3 uppercase text-sm tracking-widest">Postgrados y Diplomados:</h3>
              <ul className="grid grid-cols-1 gap-2 text-sm text-white/90 font-medium">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-white rounded-full"></span>
                  Máster en Psicología Clínica Infantojuvenil
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-white rounded-full"></span>
                  Postgrado en Atención a Pacientes Cristianos
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-white rounded-full"></span>
                  Diplomada en Trastornos de la Personalidad e Infancia
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-white rounded-full"></span>
                  Diplomados en Intervención Psicosocial y Psicología Infantil
                </li>
              </ul>
            </div>
          </div>

          {/* Columna de Imagen con Máscara Circular */}
          <div className="order-1 md:order-2 flex justify-center relative">
            <div className="relative group">
              {/* Círculo decorativo de fondo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-white/10 rounded-full blur-2xl"></div>
              
              {/* Contenedor Circular (Máscara) */}
              <div className="relative z-10 w-72 h-72 md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <img 
                  src={AboutImg} 
                  alt="Estudio de la Lic. Araceli Rojas" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Elemento flotante decorativo */}
              <div className="absolute -bottom-2 -right-2 bg-white p-4 shadow-xl rounded-2xl z-20 hidden lg:block border border-primary/20">
                <p className="text-primary font-bold text-xl leading-none text-center">2017</p>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 text-center">Trayectoria</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
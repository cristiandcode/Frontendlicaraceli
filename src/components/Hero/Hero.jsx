import React from "react";
// Importación de la imagen de la Licenciada
import HeroImg from "../../assets/fotolicaraceli.jpeg";

const Hero = () => {
  return (
    <div id="home" className="bg-white text-secondary py-12 sm:py-0 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center min-h-[600px]">
          
          {/* Imagen con máscara circular profesional */}
          <div className="relative group">
            {/* Resplandor circular de fondo (Rosa Viejo traslúcido) */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            {/* Contenedor que recorta la imagen (La máscara) */}
            <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-8 border-white shadow-2xl">
              <img 
                src={HeroImg} 
                alt="Lic. Araceli Rojas - Psicóloga" 
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Texto de Bienvenida Personalizado */}
          <div className="space-y-5 text-center sm:text-left">
            <p className="text-primary font-bold tracking-[0.2em] uppercase text-sm">
              Psicología Clínica y Social
            </p>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-secondary">
              Lic. <span className="text-primary">Araceli Rojas</span>
            </h1>
            <p className="text-xl italic text-gray-600">
              "Un espacio de escucha profesional y sanación para tu bienestar."
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Especialista en acompañamiento integral de niñez, género y familia. 
              Brindando herramientas desde 2017 para pacientes individuales, grupales 
              y atención especializada para la comunidad cristiana.
              <span className="block mt-2 font-bold text-primary italic">Atención 100% Online.</span>
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start pt-4">
              {/* Botón Principal - Rosa Viejo */}
              <a 
                href="#booking" 
                className="bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-primary/20 hover:bg-[#966a74] hover:scale-105 transition-all duration-300 uppercase text-sm tracking-widest"
              >
                AGENDAR SESIÓN
              </a>
              
              {/* Botón Secundario - Outline en Rosa Viejo */}
              <a 
                href="#experience" 
                className="inline-block uppercase border-2 border-primary text-primary font-bold py-3 px-6 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 text-sm tracking-widest"
              >
                Ver Trayectoria
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
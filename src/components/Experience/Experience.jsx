import React from "react";

const Experience = () => {
  const yearsOfExperience = 2026 - 2017;

  return (
    <div id="experience" className="bg-rosaviejo text-white py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-8 grid place-items-center border-b-4 border-primary shadow-lg rounded-xl transition-transform hover:scale-105">
            <div className="text-center space-y-2">
              <h1 className="text-6xl font-black text-primary">{yearsOfExperience}</h1>
              <p className="text-xl font-bold uppercase tracking-tighter text-secondary">Años de Trayectoria</p>
              <p className="text-sm text-gray-500 italic">Desde el año 2017</p>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-6">
            <div className="text-center p-6 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
              <h1 className="text-4xl font-bold text-white">100%</h1>
              <p className="font-medium text-white/90">Modalidad Online / Remota</p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-xl border-l-4 border-white backdrop-blur-sm">
              <h1 className="text-4xl font-bold text-white">Grupal</h1>
              <p className="font-medium text-white/90">& Individual</p>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-6">
            <div className="text-center p-6 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
              <h1 className="text-4xl font-bold text-white">8+</h1>
              <p className="font-medium text-white/90">Diplomados y Postgrados</p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-xl border-l-4 border-white backdrop-blur-sm">
              <h1 className="text-4xl font-bold text-white">Fé</h1>
              <p className="font-medium text-white/90">Acompañamiento Cristiano</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Experience;
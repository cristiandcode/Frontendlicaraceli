import React from "react";

const Experience = () => {
  // Calculamos los años desde 2017 hasta la actualidad (2026)
  const yearsOfExperience = 2026 - 2017;

  return (
    <div id="experience" className="bg-slate-50 text-secondary py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {/* Años de trayectoria - Destacado con borde Rosa Viejo inferior */}
          <div className="bg-white p-8 grid place-items-center border-b-4 border-primary shadow-lg rounded-xl">
            <div className="text-center space-y-2">
              <h1 className="text-6xl font-black text-primary">{yearsOfExperience}</h1>
              <p className="text-xl font-bold uppercase tracking-tighter">Años de Trayectoria</p>
              <p className="text-sm text-gray-500 italic">Desde el año 2017</p>
            </div>
          </div>

          {/* Columna 2 - Áreas Clave */}
          <div className="grid grid-rows-2 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-md border-t-2 border-slate-100">
              <h1 className="text-4xl font-bold text-primary">100%</h1>
              <p className="font-medium text-gray-600">Modalidad Online / Remota</p>
            </div>
            {/* Borde lateral Rosa Viejo */}
            <div className="text-center p-6 bg-white rounded-xl shadow-md border-l-4 border-primary">
              <h1 className="text-4xl font-bold text-primary">Grupal</h1>
              <p className="font-medium text-gray-600">& Individual</p>
            </div>
          </div>

          {/* Columna 3 - Formación Específica */}
          <div className="grid grid-rows-2 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-md border-t-2 border-slate-100">
              <h1 className="text-4xl font-bold text-primary">8+</h1>
              <p className="font-medium text-gray-600">Diplomados y Postgrados</p>
            </div>
            {/* Borde lateral Rosa Viejo */}
            <div className="text-center p-6 bg-white rounded-xl shadow-md border-l-4 border-primary">
              <h1 className="text-4xl font-bold text-primary">Fé</h1>
              <p className="font-medium text-gray-600">Acompañamiento Cristiano</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Experience;
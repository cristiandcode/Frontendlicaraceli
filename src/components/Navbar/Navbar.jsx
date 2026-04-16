import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { HiOutlineUserCircle, HiLogout } from "react-icons/hi"; 
import logo from "../../assets/logoaraceli.jpeg";

// Navegación adaptada a la Lic. Araceli Rojas
export const Navlinks = [
  { id: 1, name: "INICIO", link: "#home" },
  { id: 2, name: "ESPECIALIDADES", link: "#skills" },
  { id: 3, name: "TRAYECTORIA", link: "#experience" },
  { id: 4, name: "CONTACTO", link: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  
  // Verificación de sesión para el panel administrativo
  const isLogged = !!sessionStorage.getItem('adminToken');

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    window.location.href = "/";
  };

  return (
    <header className="shadow-md w-full bg-white/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          
          {/* Logo y Nombre de la Licenciada */}
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Logo Araceli Rojas" 
              className="h-14 w-14 object-cover rounded-full border-2 border-primary/20"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-secondary leading-tight">
                Lic. <span className="text-primary italic font-extrabold">Araceli Rojas</span>
              </span>
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
                Psicología Clínica y Social
              </span>
            </div>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              {Navlinks.map(({ id, name, link }) => (
                <li key={id}>
                  <a
                    href={link}
                    className="inline-block text-sm font-bold py-2 text-secondary hover:text-primary transition-all duration-300"
                  >
                    {name}
                  </a>
                </li>
              ))}
              
              {isLogged && (
                <li>
                  <a href="/admin" className="text-sm font-black text-primary border-b-2 border-primary uppercase">
                    Panel Gestión
                  </a>
                </li>
              )}
            </ul>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Acceso Profesional (Sin DarkMode) */}
            <div className="hidden md:flex items-center gap-2">
              {isLogged ? (
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-red-500 font-bold hover:scale-105 transition"
                  title="Cerrar Sesión"
                >
                  <HiLogout className="text-2xl" />
                  <span className="text-[10px] text-gray-400">SALIR</span>
                </button>
              ) : (
                <a 
                  href="/admin" 
                  className="flex items-center gap-1 text-gray-400 hover:text-primary transition"
                  title="Acceso Profesional"
                >
                  <HiOutlineUserCircle className="text-2xl" />
                  <span className="text-[10px] font-bold uppercase">Ingreso</span>
                </a>
              )}
            </div>

            {/* Hamburger Menu - Color Rosa Viejo (Primary) */}
            <button
              className="md:hidden text-3xl text-primary"
              onClick={() => setOpen(!open)}
            >
              {open ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white shadow-xl border-t animate-in slide-in-from-top duration-300">
          <ul className="flex flex-col gap-4 px-6 py-6 font-bold">
            {Navlinks.map(({ id, name, link }) => (
              <li key={id}>
                <a
                  href={link}
                  onClick={() => setOpen(false)}
                  className="block text-lg text-secondary hover:text-primary transition"
                >
                  {name}
                </a>
              </li>
            ))}
            
            <hr className="border-gray-100" />
            
            {isLogged ? (
              <>
                <li>
                  <a href="/admin" onClick={() => setOpen(false)} className="block text-primary text-xl uppercase">
                    Panel de Gestión
                  </a>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-red-500 flex items-center gap-2 uppercase">
                    <HiLogout /> Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li>
                <a href="/admin" onClick={() => setOpen(false)} className="text-gray-400 flex items-center gap-2 uppercase">
                  <HiOutlineUserCircle /> Acceso Profesional
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
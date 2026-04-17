import React, { useState, useEffect } from "react";
import { HiMenu, HiX, HiOutlineUserCircle, HiLogout } from "react-icons/hi"; 
import logo from "../../assets/logoaraceli.jpeg";

export const Navlinks = [
  { id: 1, name: "INICIO", link: "#home" },
  { id: 2, name: "ESPECIALIDADES", link: "#skills" },
  { id: 3, name: "TRAYECTORIA", link: "#experience" },
  { id: 4, name: "CONTACTO", link: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const isLogged = !!sessionStorage.getItem('adminToken');

  // Efecto para el cambio de estilo al hacer scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    window.location.href = "/";
  };

  return (
    <header className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-1" : "bg-white py-3"
    }`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          
          {/* Brand - Logo & Title */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <img 
                src={logo} 
                alt="Araceli Rojas" 
                className={`object-cover rounded-full border-2 border-primary/20 transition-all duration-300 ${
                  scrolled ? "h-11 w-11" : "h-14 w-14"
                }`}
              />
              <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold tracking-tighter text-secondary leading-tight">
                Lic. <span className="text-primary italic font-black">Araceli Rojas</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Psicología Clínica y Social
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {Navlinks.map(({ id, name, link }) => (
                <li key={id}>
                  <a
                    href={link}
                    className="relative text-xs font-black text-secondary hover:text-primary transition-colors tracking-widest group"
                  >
                    {name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Section: Admin & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              {isLogged ? (
                <div className="flex items-center gap-3">
                  <a href="/admin" className="text-[10px] font-black text-primary border-2 border-primary px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all uppercase tracking-tighter">
                    Panel Gestión
                  </a>
                  <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Salir">
                    <HiLogout size={24} />
                  </button>
                </div>
              ) : (
                <a href="/admin" className="flex items-center gap-2 text-slate-400 hover:text-primary transition-all group">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Ingreso</span>
                  <HiOutlineUserCircle size={28} />
                </a>
              )}
            </div>

            {/* Hamburger Button */}
            <button
              className="lg:hidden p-2 text-primary hover:bg-primary/5 rounded-xl transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
            >
              {open ? <HiX size={32} /> : <HiMenu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-secondary/20 backdrop-blur-sm z-[-1] transition-opacity duration-300 lg:hidden ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`} onClick={() => setOpen(false)} />

      {/* Mobile Sidebar */}
      <aside className={`fixed top-0 right-0 h-screen w-[75%] max-w-[300px] bg-white z-[101] shadow-2xl transition-transform duration-500 ease-in-out lg:hidden ${
        open ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-end mb-8">
             <button onClick={() => setOpen(false)} className="p-2 text-secondary">
                <HiX size={32} />
             </button>
          </div>

          <nav className="flex-1">
            <ul className="flex flex-col gap-6">
              {Navlinks.map(({ id, name, link }) => (
                <li key={id}>
                  <a
                    href={link}
                    onClick={() => setOpen(false)}
                    className="text-2xl font-black text-secondary hover:text-primary transition-colors block"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-8 border-t border-slate-100">
            {isLogged ? (
              <div className="space-y-4">
                <a href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-3 text-primary font-bold text-lg">
                  <span className="p-2 bg-primary/10 rounded-lg"><HiOutlineUserCircle /></span>
                  Panel de Gestión
                </a>
                <button onClick={handleLogout} className="flex items-center gap-3 text-red-500 font-bold text-lg w-full">
                  <span className="p-2 bg-red-50 rounded-lg"><HiLogout /></span>
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <a href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-3 text-slate-400 font-bold text-lg">
                <span className="p-2 bg-slate-50 rounded-lg"><HiOutlineUserCircle /></span>
                Acceso Profesional
              </a>
            )}
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Navbar;
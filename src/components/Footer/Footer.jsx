import React from "react";
import { Navlinks } from "../Navbar/Navbar";
import { FaFacebook, FaInstagram, FaLinkedin, FaExternalLinkAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-50 text-secondary pt-12 border-t border-slate-200 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Navegación Rápida */}
        <nav className="mb-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 font-semibold text-sm">
            {Navlinks.map(({ id, name, link }) => (
              <li key={id}>
                <a 
                  href={link} 
                  className="hover:text-primary transition-colors duration-300 uppercase tracking-wider"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Franja Inferior de Créditos y Redes */}
      <div className="bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Logo/Nombre - Rosa Viejo */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-black tracking-tighter">
                Lic. <span className="text-primary italic">Araceli Rojas</span>
              </h2>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">Psicología Social & Clínica</p>
            </div>

            {/* Redes Sociales */}
            <div className="flex gap-6">
              <FaFacebook className="text-xl text-slate-400 hover:text-primary cursor-pointer transition-all hover:scale-110" />
              <FaInstagram className="text-xl text-slate-400 hover:text-primary cursor-pointer transition-all hover:scale-110" />
              <FaLinkedin className="text-xl text-slate-400 hover:text-primary cursor-pointer transition-all hover:scale-110" />
            </div>

            {/* Copyright y Crédito CD Sistemas */}
            <div className="flex flex-col items-center md:items-end gap-3 text-xs text-slate-500">
              <p>© {new Date().getFullYear()} Lic. Araceli Rojas. Misiones, Argentina.</p>
              
              {/* Botón de Desarrollador */}
              <a 
                href="https://www.cdsistemas.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 bg-slate-100 hover:bg-primary/10 px-4 py-2 rounded-full border border-slate-200 hover:border-primary/30 transition-all duration-300"
              >
                <span className="text-[10px] font-bold uppercase tracking-tight text-slate-400 group-hover:text-primary">
                  Desarrollado por <span className="text-secondary group-hover:text-primary">CD Sistemas</span>
                </span>
                <FaExternalLinkAlt size={10} className="text-slate-300 group-hover:text-primary" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
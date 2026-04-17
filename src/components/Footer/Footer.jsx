import React from "react";
import { Navlinks } from "../Navbar/Navbar";
import { FaInstagram, FaTiktok, FaExternalLinkAlt } from "react-icons/fa";

const Footer = () => {
  const instagramUrl = "https://www.instagram.com/silvia.araceli.rojas?igsh=MWQwaXNzYXZrcmY1ag==";
  const tiktokUrl = "https://www.tiktok.com/@lic.aracelirojas?_t=ZM-8uH6unp2D6C&_r=1";

  return (
    <footer className="bg-white text-secondary pt-12 border-t border-slate-200 transition-colors duration-300">
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
      <div className="bg-rosasuave border-t border-primary/10">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Logo/Nombre */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-black tracking-tighter text-secondary">
                Lic. <span className="text-primary italic">Araceli Rojas</span>
              </h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Psicología Social & Clínica</p>
            </div>

            {/* Redes Sociales Reales */}
            <div className="flex gap-8">
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1"
              >
                <FaInstagram className="text-2xl text-secondary group-hover:text-primary transition-all group-hover:scale-110" />
                <span className="text-[8px] font-bold text-slate-400 group-hover:text-primary uppercase tracking-widest">Instagram</span>
              </a>
              <a 
                href={tiktokUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1"
              >
                <FaTiktok className="text-2xl text-secondary group-hover:text-primary transition-all group-hover:scale-110" />
                <span className="text-[8px] font-bold text-slate-400 group-hover:text-primary uppercase tracking-widest">TikTok</span>
              </a>
            </div>

            {/* Copyright y Crédito CD Sistemas */}
            <div className="flex flex-col items-center md:items-end gap-3 text-xs text-slate-500">
              <p className="font-medium">© {new Date().getFullYear()} Lic. Araceli Rojas. Misiones, Argentina.</p>
              
              {/* Botón de Desarrollador */}
              <a 
                href="https://www.cdsistemas.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 bg-white hover:bg-primary/10 px-4 py-2 rounded-xl border border-primary/10 shadow-sm transition-all duration-300"
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
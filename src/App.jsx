import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Componentes de la Landing
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from './components/Footer/Footer';
import WhatsappButton from "./components/WhatsappButton/WhatsappButton";
import ActionCall from "./components/ActionCall/ActionCall";
import Booking from "./components/Booking/Booking";

// Componente Admin
import AdminPanel from "./components/Admin/AdminPanel";

const Landing = () => {
  return (
    <div className="relative bg-white selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <ActionCall />
      <Booking />
      <Contact />
      <Footer />
      <WhatsappButton />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal: Landing Page de la Lic. Araceli Rojas */}
        <Route path="/" element={<Landing />} />

        {/* Ruta para el administrador: Gestión de Agenda */}
        <Route path="/admin" element={<AdminPanel />} />

        {/* Redirección automática para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
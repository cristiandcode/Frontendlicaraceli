import React, { useState } from 'react';
import { Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Nombre del cliente para la personalización
  const CLIENT_NAME = import.meta.env.VITE_CLIENT_NAME || "Lic. Araceli Rojas";
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password.trim() === "") {
      return setError("Por favor, ingresá la contraseña");
    }

    setIsLoading(true);

    try {
      // Implementación con Axios - Base de Oro
      await axios.post(`${API_URL}/settings/login`, {}, {
        headers: { 
          'x-admin-password': password.trim() 
        }
      });

      // Si Axios no detecta error (status 200), procedemos
      onLogin(password.trim());
    } catch (err) {
      console.error("Error de login:", err);
      // Axios captura automáticamente errores 4xx y 5xx en el catch
      setError("Contraseña incorrecta. Intentalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 transition-colors font-sans">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-slate-100 relative">
        
        {/* Botón para volver al inicio */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest"
        >
          <ArrowLeft size={14} /> Volver al sitio
        </Link>

        <div className="text-center mb-10 mt-4">
          {/* Icono con estilo personalizado */}
          <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
            <Lock className="text-primary w-10 h-10 -rotate-3" />
          </div>
          <h2 className="text-3xl font-black text-secondary tracking-tighter uppercase">
            Acceso <span className="text-primary">Privado</span>
          </h2>
          <p className="text-slate-500 mt-2 text-sm font-medium">
            Gestión de Agenda — {CLIENT_NAME}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.2em] ml-1">
              Contraseña de seguridad
            </label>
            <input 
              type="password" 
              placeholder="••••••••"
              className={`w-full p-4 rounded-2xl border-2 outline-none transition-all font-mono ${
                error ? 'border-red-400' : 'border-slate-100 focus:border-primary'
              }`}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoFocus
              disabled={isLoading}
            />
            {error && (
              <p className="text-red-500 text-[10px] font-bold mt-2 ml-1 uppercase tracking-wider">
                {error}
              </p>
            )}
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-secondary text-white py-4 rounded-2xl font-black text-lg hover:bg-primary active:scale-[0.98] transition-all shadow-xl shadow-slate-200 uppercase tracking-tight flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Entrar al Panel"
            )}
          </button>
        </form>

        <div className="mt-10 flex flex-col items-center gap-2">
          <div className="h-1 w-12 bg-slate-100 rounded-full"></div>
          <p className="text-center text-[10px] text-slate-300 uppercase font-black tracking-[0.3em]">
            Base de Oro v1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
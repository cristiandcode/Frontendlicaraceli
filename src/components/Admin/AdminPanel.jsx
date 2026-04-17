import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import { Trash2, MessageCircle, Calendar, Clock, Users, LogOut, Save, X, CheckCircle, Video, User, ArrowLeft, AlertCircle, Phone, CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [password, setPassword] = useState(sessionStorage.getItem('adminToken') || '');
  const [isLogged, setIsLogged] = useState(!!sessionStorage.getItem('adminToken'));
  const [activeTab, setActiveTab] = useState(1); 
  
  const [deleteModal, setDeleteModal] = useState({ show: false, apt: null });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const [settings, setSettings] = useState({
    workingDays: [],
    workingHours: {
      "1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "0": []
    },
    blockedDates: []
  });

  const [appointments, setAppointments] = useState([]);
  const [range, setRange] = useState({ start: "08:00", end: "12:00", interval: 30 });
  
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const SETTINGS_URL = `${API_BASE_URL}/api/settings`;
  const APPOINTMENTS_URL = `${API_BASE_URL}/api/appointments`;

  useEffect(() => {
    if (isLogged) {
      fetchData();
    }
  }, [isLogged]);

  const fetchData = () => {
    fetch(SETTINGS_URL)
      .then(res => {
        if (!res.ok) throw new Error('Error en servidor');
        return res.json();
      })
      .then(data => {
        if (data) {
          const formattedHours = (data.workingHours && !Array.isArray(data.workingHours)) 
            ? data.workingHours 
            : { "1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "0": [] };
          
          const formattedDays = Array.isArray(data.workingDays) ? data.workingDays : [];
          
          setSettings({ 
            ...data, 
            workingDays: formattedDays,
            workingHours: formattedHours 
          });
        }
      })
      .catch(err => {
        console.error("Error cargando settings:", err);
        showToast("Error de conexión con el servidor", "error");
      });

    fetchAppointments();
  };

  const showToast = (msg, type = 'success') => {
    setNotification({ show: true, message: msg, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 4000);
  };

  const fetchAppointments = () => {
    fetch(APPOINTMENTS_URL)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const sorted = data.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
          setAppointments(sorted);
        }
      })
      .catch(err => console.error("Error cargando turnos:", err));
  };

  const handleLogin = (inputPassword) => {
    if (inputPassword.trim() === "") return showToast("Por favor, ingresá la contraseña", "error");
    setPassword(inputPassword);
    setIsLogged(true);
    sessionStorage.setItem('adminToken', inputPassword);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    setIsLogged(false);
    setPassword('');
    window.location.reload();
  };

  const addRange = () => {
    const dayHours = [...(settings.workingHours[activeTab] || [])];
    let start = new Date(`2026-01-01T${range.start}:00`);
    const end = new Date(`2026-01-01T${range.end}:00`);

    if (start >= end) return showToast("La hora de inicio debe ser menor a la de fin", "error");

    while (start < end) {
      const timeString = start.toTimeString().slice(0, 5);
      if (!dayHours.includes(timeString)) {
        dayHours.push(timeString);
      }
      start.setMinutes(start.getMinutes() + parseInt(range.interval));
    }

    setSettings({
      ...settings,
      workingHours: {
        ...settings.workingHours,
        [activeTab]: dayHours.sort()
      }
    });
  };

  const removeHour = (h) => {
    setSettings({
      ...settings,
      workingHours: {
        ...settings.workingHours,
        [activeTab]: (settings.workingHours[activeTab] || []).filter(time => time !== h)
      }
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(SETTINGS_URL, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-password': password 
        },
        body: JSON.stringify(settings)
      });

      if (res.ok) {
        showToast("✅ Agenda actualizada correctamente");
      } else {
        showToast("❌ Error: Contraseña incorrecta o sesión expirada", "error");
      }
    } catch (error) {
      showToast("❌ No se pudo conectar con el servidor", "error");
    }
  };

  const confirmDelete = async (notify) => {
    const apt = deleteModal.apt;
    if (!apt) return;

    try {
      const res = await fetch(`${APPOINTMENTS_URL}/${apt._id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password }
      });

      if (res.ok) {
        if (notify) {
          const cleanPhone = apt.phone.replace(/\D/g, '');
          const message = encodeURIComponent(`Hola ${apt.name}, le informamos que su turno para el día ${apt.date} a las ${apt.time}hs ha sido cancelado por la Lic. Araceli Rojas. Disculpe las molestias.`);
          window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
        }
        setAppointments(appointments.filter(a => a._id !== apt._id));
        setDeleteModal({ show: false, apt: null });
        showToast("Turno anulado correctamente");
      }
    } catch (error) {
      showToast("Error al eliminar el turno", "error");
    }
  };

  const openWhatsApp = (apt) => {
    const cleanPhone = apt.phone.replace(/\D/g, '');
    const clientName = "Lic. Araceli Rojas";
    const message = encodeURIComponent(`Hola ${apt.name}, le escribo de parte de la ${clientName} para confirmar su turno del día ${apt.date} a las ${apt.time}hs.`);
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  if (!isLogged) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const daysLabels = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-32 md:pb-12">
      
      {/* Notificaciones Modernas */}
      {notification.show && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-md animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
            notification.type === 'success' 
            ? 'bg-white border-emerald-100 text-emerald-600' 
            : 'bg-white border-red-100 text-red-600'
          }`}>
            {notification.type === 'success' ? <CheckCircle size={20} className="shrink-0" /> : <AlertCircle size={20} className="shrink-0" />}
            <span className="font-bold text-sm tracking-tight">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Modal de Eliminación Pro */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] md:rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 md:slide-in-from-bottom-0 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-red-50 p-4 rounded-2xl text-red-500">
                <Trash2 size={28} />
              </div>
              <button onClick={() => setDeleteModal({show:false, apt:null})} className="p-2 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-full transition-colors"><X size={20}/></button>
            </div>
            <h3 className="text-2xl font-black mb-2 text-slate-800">¿Anular turno?</h3>
            <p className="text-slate-500 text-base mb-8 leading-relaxed">Estás por cancelar la cita de <span className="text-primary font-bold">{deleteModal.apt?.name}</span>. Esta acción no se puede deshacer.</p>
            
            <div className="flex flex-col gap-3">
              <button onClick={() => confirmDelete(true)} className="flex items-center justify-center gap-3 bg-primary text-white py-4 rounded-2xl font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/25">
                <MessageCircle size={18}/> Cancelar y avisar por WhatsApp
              </button>
              <button onClick={() => confirmDelete(false)} className="bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all">
                Solo cancelar (sin aviso)
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6 md:pt-10">
        
        {/* Header Elegante */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                <div className="w-2 h-6 bg-primary rounded-full"></div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight italic">
                  GESTIÓN <span className="text-primary">AGENDA</span>
                </h1>
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] ml-1">
              Lic. Araceli Rojas — CD Soluciones
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link to="/" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-50 text-slate-500 hover:bg-slate-100 px-6 py-3 rounded-xl text-xs font-bold transition-all border border-slate-200">
              <ArrowLeft size={16} /> Volver
            </Link>
            <button onClick={handleLogout} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 rounded-xl text-xs font-bold transition-all border border-red-100">
              <LogOut size={16} /> Salir
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          {/* Columna Días (Sidebar en Desktop) */}
          <section className="lg:col-span-4 xl:col-span-3 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <h3 className="font-black mb-6 flex items-center gap-3 text-slate-700 uppercase text-xs tracking-widest">
              <CalendarDays size={18} className="text-primary" /> Días Laborales
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              {[1, 2, 3, 4, 5, 6, 0].map(d => (
                <label key={d} className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all border ${settings?.workingDays?.includes(d) ? 'bg-primary/5 border-primary/20 text-primary ring-1 ring-primary/10' : 'bg-slate-50 border-transparent text-slate-400'}`}>
                  <input 
                    type="checkbox"
                    checked={settings?.workingDays?.includes(d) || false}
                    onChange={(e) => {
                      const currentDays = settings?.workingDays || [];
                      const newDays = e.target.checked 
                        ? [...currentDays, d]
                        : currentDays.filter(day => day !== d);
                      setSettings({...settings, workingDays: newDays});
                    }}
                    className="accent-primary w-5 h-5 rounded-lg"
                  />
                  <span className="text-sm font-black">{daysLabels[d]}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Columna Horarios (Main en Desktop) */}
          <section className="lg:col-span-8 xl:col-span-9 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <h3 className="font-black mb-6 flex items-center gap-3 text-slate-700 uppercase text-xs tracking-widest">
              <Clock size={18} className="text-primary" /> Configurar Horas
            </h3>
            
            {/* Tabs de Horarios con scroll horizontal en móvil */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide -mx-2 px-2">
              {[1, 2, 3, 4, 5, 6, 0].map(d => (
                <button
                  key={d}
                  onClick={() => setActiveTab(d)}
                  className={`px-6 py-3 text-xs font-black rounded-2xl transition-all whitespace-nowrap border-2 ${
                    activeTab === d 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xl translate-y-[-2px]' 
                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                  }`}
                >
                  {daysLabels[d]}
                </button>
              ))}
            </div>

            {/* Generador de rangos inteligente */}
            <div className="bg-[#F8FAFC] p-6 rounded-[2rem] mb-8 border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Generador Automático</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <span className="text-[9px] font-bold text-slate-400 ml-2 uppercase">Inicio</span>
                        <input type="time" value={range.start} onChange={(e)=>setRange({...range, start: e.target.value})} className="w-full p-4 rounded-2xl border-none shadow-sm text-sm font-bold focus:ring-2 ring-primary outline-none" />
                    </div>
                    <div className="space-y-1">
                        <span className="text-[9px] font-bold text-slate-400 ml-2 uppercase">Fin</span>
                        <input type="time" value={range.end} onChange={(e)=>setRange({...range, end: e.target.value})} className="w-full p-4 rounded-2xl border-none shadow-sm text-sm font-bold focus:ring-2 ring-primary outline-none" />
                    </div>
                </div>
                <div className="space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 ml-2 uppercase">Duración</span>
                    <select value={range.interval} onChange={(e)=>setRange({...range, interval: e.target.value})} className="w-full p-4 rounded-2xl border-none shadow-sm text-sm font-bold focus:ring-2 ring-primary outline-none appearance-none bg-white">
                        <option value="45">45 min</option>
                        <option value="60">1 hora</option>
                        <option value="30">30 min</option>
                    </select>
                </div>
                <button onClick={addRange} className="self-end bg-secondary text-white p-4 rounded-2xl font-black text-xs uppercase hover:bg-primary transition-all shadow-md shadow-secondary/10">
                  Generar
                </button>
              </div>
            </div>

            {/* Chips de horas con diseño de lujo */}
            <div className="flex flex-wrap gap-3 min-h-[120px] content-start">
              {(settings?.workingHours?.[activeTab] || []).length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center py-8 text-slate-300 border-2 border-dashed border-slate-100 rounded-[2rem]">
                    <Clock size={32} className="mb-2 opacity-20" />
                    <p className="text-xs font-bold">No hay horarios definidos</p>
                </div>
              ) : (
                (settings?.workingHours?.[activeTab] || []).map(h => (
                  <div key={h} className="group flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-200 hover:border-primary transition-all hover:shadow-md animate-in fade-in zoom-in-95">
                    <span className="font-black text-sm text-slate-700">{h}hs</span>
                    <button onClick={() => removeHour(h)} className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-50 text-slate-300 group-hover:bg-red-50 group-hover:text-red-500 transition-all">
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Listado de Pacientes - REINVENTADO PARA MÓVIL */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-xl font-black flex items-center gap-3 text-slate-800 uppercase tracking-tight">
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><Users size={20} /></div>
              Pacientes Agendados
            </h2>
            <span className="bg-slate-100 text-slate-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
              Total: {appointments.length}
            </span>
          </div>

          {/* Vista para Desktop (Tabla) */}
          <div className="hidden md:block bg-white rounded-[2rem] shadow-sm overflow-hidden border border-slate-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Horario</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Paciente</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] text-center">Modalidad</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Motivo</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-20 text-center">
                        <div className="flex flex-col items-center opacity-20">
                            <Calendar size={48} />
                            <p className="mt-4 font-black italic">Sin actividad registrada</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    appointments.map((apt) => (
                      <tr key={apt._id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="p-6">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase mb-1">{apt.date}</span>
                            <span className="text-lg font-black text-primary tracking-tight">{apt.time}hs</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex flex-col">
                            <span className="font-black text-slate-700 text-base">{apt.name}</span>
                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Phone size={10}/> {apt.phone}</span>
                          </div>
                        </td>
                        <td className="p-6 text-center">
                            {apt.modality === 'Presencial' ? (
                              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-tighter border border-emerald-100">
                                <MapPin size={12} /> Presencial
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-tighter border border-blue-100">
                                <Video size={12} /> Virtual
                              </span>
                            )}
                        </td>
                        <td className="p-6">
                          <div className="max-w-[200px] truncate">
                            <span className="text-xs font-bold text-slate-500 bg-slate-100/50 px-3 py-1.5 rounded-lg border border-slate-100">
                                {apt.reason || "Consulta general"}
                            </span>
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openWhatsApp(apt)} className="p-3 bg-white text-primary hover:bg-primary hover:text-white rounded-xl shadow-sm border border-slate-100 transition-all">
                              <MessageCircle size={18} />
                            </button>
                            <button onClick={() => setDeleteModal({ show: true, apt })} className="p-3 bg-white text-red-400 hover:bg-red-500 hover:text-white rounded-xl shadow-sm border border-slate-100 transition-all">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vista para Mobile (Cards) */}
          <div className="md:hidden space-y-4">
            {appointments.length === 0 ? (
               <div className="bg-white rounded-[2rem] p-12 text-center border border-slate-100">
                  <p className="text-slate-400 font-bold italic">No hay pacientes agendados</p>
               </div>
            ) : (
              appointments.map((apt) => (
                <div key={apt._id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4">
                     {apt.modality === 'Presencial' ? (
                       <span className="px-3 py-1 bg-emerald-50 text-emerald-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">Presencial</span>
                     ) : (
                       <span className="px-3 py-1 bg-blue-50 text-blue-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-100">Virtual</span>
                     )}
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary/10 p-4 rounded-2xl text-primary text-center">
                        <span className="block text-[10px] font-black uppercase leading-none mb-1 opacity-60">{apt.date.split('-')[2]}</span>
                        <span className="block text-xl font-black leading-none">{apt.time}</span>
                    </div>
                    <div>
                        <h4 className="font-black text-slate-800 text-lg leading-tight mb-1">{apt.name}</h4>
                        <p className="text-xs font-bold text-slate-400 tracking-tighter">{apt.phone}</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                     <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Motivo de consulta</p>
                     <p className="text-sm font-bold text-slate-600 italic">"{apt.reason || "Sin descripción proporcionada"}"</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => openWhatsApp(apt)} className="flex items-center justify-center gap-2 bg-white text-primary p-4 rounded-2xl font-black text-xs uppercase border-2 border-primary/20 transition-all active:scale-95">
                      <MessageCircle size={18} /> WhatsApp
                    </button>
                    <button onClick={() => setDeleteModal({ show: true, apt })} className="flex items-center justify-center gap-2 bg-red-50 text-red-500 p-4 rounded-2xl font-black text-xs uppercase border-2 border-red-100 transition-all active:scale-95">
                      <Trash2 size={18} /> Anular
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Botón Guardar Flotante (UI/UX Refined) */}
      <div className="fixed bottom-0 left-0 w-full p-4 md:p-8 bg-gradient-to-t from-white via-white/90 to-transparent z-50">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={handleUpdate} 
            className="w-full bg-slate-900 text-white py-5 md:py-6 rounded-2xl md:rounded-3xl font-black text-sm md:text-base shadow-2xl hover:scale-[1.02] active:scale-95 transition-all uppercase flex items-center justify-center gap-4 ring-8 ring-white"
          >
            <Save size={20} className="text-primary" /> Guardar Cambios en Servidor
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import { Trash2, MessageCircle, Calendar, Clock, Users, LogOut, Save, X, CheckCircle, Video, User } from 'lucide-react';

const AdminPanel = () => {
  const [password, setPassword] = useState(sessionStorage.getItem('adminToken') || '');
  const [isLogged, setIsLogged] = useState(!!sessionStorage.getItem('adminToken'));
  const [activeTab, setActiveTab] = useState(1); // Lunes por defecto
  
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
    fetch(SETTINGS_URL)
      .then(res => res.json())
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
      .catch(err => console.error("Error cargando settings:", err));

    fetchAppointments();
  }, [SETTINGS_URL]);

  const showToast = (msg, type = 'success') => {
    setNotification({ show: true, message: msg, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
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
  };

  const confirmDelete = async (notify) => {
    const apt = deleteModal.apt;
    if (!apt) return;

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
    <div className="min-h-screen p-4 md:p-8 bg-slate-50 transition-colors font-sans text-slate-900 relative">
      
      {notification.show && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] w-full max-w-fit px-4">
          <div className={`flex items-center gap-3 px-8 py-4 rounded-3xl shadow-2xl border-2 ${
            notification.type === 'success' 
            ? 'bg-white border-primary text-primary' 
            : 'bg-white border-red-500 text-red-600'
          }`}>
            {notification.type === 'success' ? <CheckCircle size={22}/> : <X size={22}/>}
            <span className="font-black text-xs uppercase tracking-widest whitespace-nowrap">{notification.message}</span>
          </div>
        </div>
      )}

      {deleteModal.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-red-50 p-3 rounded-2xl text-red-600">
                <Trash2 size={24} />
              </div>
              <button onClick={() => setDeleteModal({show:false, apt:null})} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
            </div>
            <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Anular Turno</h3>
            <p className="text-slate-500 text-sm mb-6 font-medium">¿Cómo deseas proceder con el turno de <span className="text-secondary font-bold">{deleteModal.apt?.name}</span>?</p>
            
            <div className="grid gap-3">
              <button onClick={() => confirmDelete(true)} className="flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl font-bold uppercase text-xs hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                <MessageCircle size={18}/> Borrar y Notificar WhatsApp
              </button>
              <button onClick={() => confirmDelete(false)} className="bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold uppercase text-xs hover:bg-slate-200 transition-all">
                Solo Borrar (Silencioso)
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-primary/10">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight">
              Gestión de <span className="text-primary">Agenda</span>
            </h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              Lic. Araceli Rojas — Misiones
            </p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-xl text-xs font-black transition-all uppercase">
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
            <h3 className="font-bold mb-6 flex items-center gap-2 text-primary uppercase text-sm">
              <Calendar size={18} /> Días de Atención
            </h3>
            <div className="grid gap-2">
              {[1, 2, 3, 4, 5, 6, 0].map(d => (
                <label key={d} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${settings?.workingDays?.includes(d) ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-slate-50 border-transparent text-slate-400'}`}>
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
                    className="accent-primary w-4 h-4"
                  />
                  <span className="text-sm font-bold">{daysLabels[d]}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
            <h3 className="font-bold mb-6 flex items-center gap-2 text-primary uppercase text-sm">
              <Clock size={18} /> Franjas Horarias
            </h3>
            
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {[1, 2, 3, 4, 5, 6, 0].map(d => (
                <button
                  key={d}
                  onClick={() => setActiveTab(d)}
                  className={`px-4 py-2 text-[10px] uppercase font-black rounded-xl transition-all ${
                    activeTab === d ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {daysLabels[d].slice(0, 3)}
                </button>
              ))}
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 border border-slate-100">
              <div className="md:col-span-2 grid grid-cols-2 gap-3">
                <input type="time" value={range.start} onChange={(e)=>setRange({...range, start: e.target.value})} className="p-3 rounded-xl border text-sm focus:ring-2 ring-primary outline-none" />
                <input type="time" value={range.end} onChange={(e)=>setRange({...range, end: e.target.value})} className="p-3 rounded-xl border text-sm focus:ring-2 ring-primary outline-none" />
                <select value={range.interval} onChange={(e)=>setRange({...range, interval: e.target.value})} className="col-span-2 p-3 rounded-xl border text-sm focus:ring-2 ring-primary outline-none">
                  <option value="45">Sesiones de 45 min</option>
                  <option value="60">Sesiones de 1 hora</option>
                  <option value="30">Intervalos de 30 min</option>
                </select>
              </div>
              <button onClick={addRange} className="bg-secondary text-white p-3 rounded-xl font-bold text-[10px] uppercase hover:bg-primary transition-all leading-tight">
                Generar {daysLabels[activeTab]}
              </button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[100px] content-start">
              {(settings?.workingHours?.[activeTab] || []).map(h => (
                <span key={h} className="bg-primary/5 px-3 py-2 rounded-xl flex items-center gap-3 border border-primary/10 font-bold text-xs shadow-sm group text-primary">
                  {h}
                  <button onClick={() => removeHour(h)} className="text-primary/30 group-hover:text-red-500 transition-colors">✕</button>
                </span>
              ))}
            </div>
          </section>
        </div>

        <button onClick={handleUpdate} className="mt-8 w-full bg-secondary text-white py-5 rounded-2xl font-black text-lg shadow-2xl hover:bg-primary transition-all uppercase flex items-center justify-center gap-3">
          <Save size={24} /> Guardar Cambios en la Agenda
        </button>

        <section className="mt-16 mb-12">
          <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase">
            <Users className="text-primary" /> Pacientes Agendados
          </h2>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cita</th>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Paciente</th>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Modalidad</th>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Motivo</th>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-10 text-center text-slate-400 italic font-medium">No hay turnos registrados en este momento.</td>
                    </tr>
                  ) : (
                    appointments.map((apt) => (
                      <tr key={apt._id} className="hover:bg-primary/5 transition-colors group">
                        <td className="p-5">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-400 uppercase">{apt.date}</span>
                            <span className="text-lg font-black text-primary leading-none">{apt.time}hs</span>
                          </div>
                        </td>
                        <td className="p-5">
                          <div className="flex flex-col">
                            <span className="font-bold text-secondary">{apt.name}</span>
                            <span className="text-xs text-slate-400">{apt.phone}</span>
                          </div>
                        </td>
                        <td className="p-5 text-center">
                          <div className="flex justify-center">
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-tighter border border-blue-100">
                              <Video size={14} /> Virtual
                            </span>
                          </div>
                        </td>
                        <td className="p-5">
                          <span className="text-xs italic text-slate-500 bg-slate-100 px-2 py-1 rounded">
                            {apt.reason || "Consulta psicológica"}
                          </span>
                        </td>
                        <td className="p-5">
                          <div className="flex justify-center gap-2">
                            <button onClick={() => openWhatsApp(apt)} className="p-3 text-primary hover:bg-primary hover:text-white rounded-xl transition-all shadow-sm">
                              <MessageCircle size={20} />
                            </button>
                            <button onClick={() => setDeleteModal({ show: true, apt })} className="p-3 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm">
                              <Trash2 size={20} />
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
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
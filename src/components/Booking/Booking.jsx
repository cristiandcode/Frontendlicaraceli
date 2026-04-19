import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Clock, CheckCircle, Calendar as CalendarIcon, Video, User, MapPin } from 'lucide-react';

const Booking = () => {
  const [date, setDate] = useState(new Date());
  const [busySlots, setBusySlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', reason: '', modality: 'Virtual' });
  const [step, setStep] = useState(1); 
  const [showModalityModal, setShowModalityModal] = useState(false);

  const [settings, setSettings] = useState({
    workingDays: [1, 2, 3, 4, 5],
    workingHours: {},
    blockedDates: [],
    modalities: {} // Nuevo: para manejar la modalidad por día
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const APPOINTMENTS_URL = `${API_BASE_URL}/appointments`;
  const SETTINGS_URL = `${API_BASE_URL}/settings`;

  useEffect(() => {
    fetch(SETTINGS_URL)
      .then(res => res.json())
      .then(data => { 
        if (data && data.workingHours) {
            setSettings(data);
        }
      })
      .catch(err => console.error("Error cargando configuración:", err));
  }, [SETTINGS_URL]);

  useEffect(() => {
    const fetchBusySlots = async () => {
      const formattedDate = date.toISOString().split('T')[0];
      try {
        const res = await fetch(`${APPOINTMENTS_URL}/${formattedDate}`);
        const data = await res.json();
        setBusySlots(Array.isArray(data) ? data : []);
        setSelectedTime(null);
      } catch (err) {
        console.error("Error cargando turnos ocupados:", err);
      }
    };
    fetchBusySlots();
  }, [date, APPOINTMENTS_URL]);

  const tileDisabled = ({ date: calendarDate, view }) => {
    if (view === 'month') {
      const day = calendarDate.getDay();
      const isNotWorkingDay = !settings.workingDays.includes(day);
      const isDateBlocked = settings.blockedDates.includes(calendarDate.toISOString().split('T')[0]);
      return isNotWorkingDay || isDateBlocked;
    }
  };

  const currentDayOfWeek = date.getDay();
  const allSlotsForDay = settings.workingHours[currentDayOfWeek] || settings.workingHours[String(currentDayOfWeek)] || [];
  
  const availableSlots = allSlotsForDay.filter(slot => {
    const isBusy = Array.isArray(busySlots) && busySlots.includes(slot);
    if (isBusy) return false;

    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      const [hours, minutes] = slot.split(':').map(Number);
      const slotTime = new Date();
      slotTime.setHours(hours, minutes, 0, 0);
      return slotTime > today;
    }
    return true;
  });

  // Lógica nueva para manejar el flujo de modalidad
  const handleNextStep = () => {
    const dayModality = settings.modalities?.[currentDayOfWeek] || settings.modalities?.[String(currentDayOfWeek)] || 'virtual';
    
    if (dayModality === 'ambos') {
      setShowModalityModal(true);
    } else {
      // Si es solo presencial o solo virtual, lo asignamos directo y pasamos al paso 2
      const fixedMode = dayModality === 'presencial' ? 'Presencial' : 'Virtual';
      setFormData({ ...formData, modality: fixedMode });
      setStep(2);
    }
  };

  const selectModality = (mode) => {
    setFormData({ ...formData, modality: mode });
    setShowModalityModal(false);
    setStep(2);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const fullPhone = `+54 9 ${formData.phone}`;
    
    const bookingData = {
      ...formData,
      phone: fullPhone,
      date: date.toISOString().split('T')[0],
      time: selectedTime
    };

    try {
      const res = await fetch(APPOINTMENTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (res.ok) {
        setStep(3);
        const message = `Hola Lic. Araceli Rojas! Soy ${formData.name}. Acabo de agendar un turno para consulta.\n\n📅 Fecha: ${bookingData.date}\n⏰ Hora: ${bookingData.time}hs\n📍 Modalidad: ${formData.modality}\n📝 Motivo: ${formData.reason}`;
        window.open(`https://wa.me/5493765130012?text=${encodeURIComponent(message)}`, '_blank');
        setFormData({ name: '', phone: '', reason: '', modality: 'Virtual' });
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Error al agendar el turno.");
      }
    } catch (err) {
      alert("Error de conexión con el servidor.");
    }
  };

  return (
    <section id="booking" className="py-20 bg-slate-50 transition-colors">
      <style>{`
        .react-calendar { background: transparent !important; border: none !important; width: 100% !important; font-family: inherit !important; }
        .react-calendar__tile { color: #1e293b !important; font-weight: 700 !important; padding: 12px !important; transition: all 0.2s; outline: none !important; border: none !important; }
        .react-calendar__month-view__days__day--neighboringMonth { opacity: 0.4 !important; }
        .react-calendar__tile:disabled { background-color: transparent !important; color: #94a3b8 !important; cursor: not-allowed !important; }
        .react-calendar__month-view__days__day--weekend { color: #1e293b !important; }
        .react-calendar__navigation button { color: #1e293b !important; font-weight: bold; font-size: 1.1rem; background: none !important; }
        .react-calendar__navigation button:enabled:hover { background-color: rgba(181, 131, 141, 0.1) !important; }
        .react-calendar__month-view__weekdays { font-weight: 800; text-transform: uppercase; color: #64748b; }
        .react-calendar__month-view__weekdays__weekday abbr { text-decoration: none !important; }
        .react-calendar__tile--now { background: #fdf2f4 !important; color: #b5838d !important; border-radius: 12px; }
        .react-calendar__tile--active, .react-calendar__tile--active:enabled:hover { 
          background: #b5838d !important; color: white !important; border-radius: 12px !important; 
          box-shadow: 0 4px 12px rgba(181, 131, 141, 0.3);
        }
        .react-calendar__tile:enabled:hover { background: #f1f5f9 !important; border-radius: 12px; color: #1e293b !important; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #b5838d; border-radius: 10px; }
      `}</style>

      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
            <h2 className="text-4xl font-black text-secondary uppercase tracking-tighter">
                Sistema de <span className="text-primary">Turnos</span>
            </h2>
            <p className="text-slate-500 mt-2 italic font-medium">Coordina tu espacio de escucha profesional</p>
        </header>
        
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden">
          
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex justify-center bg-slate-50 p-4 rounded-2xl">
                <Calendar 
                  onChange={setDate} 
                  value={date} 
                  tileDisabled={tileDisabled}
                  className="rounded-xl border-none shadow-sm" 
                  minDate={new Date()} 
                />
              </div>
              <div className="flex flex-col">
                <h3 className="flex items-center gap-2 font-bold mb-6 text-slate-700 text-lg">
                  <Clock size={22} className="text-primary" /> Horarios: {date.toLocaleDateString()}
                </h3>
                
                <div className="grid grid-cols-3 gap-3 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                  {availableSlots.length > 0 ? (
                    availableSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-3 rounded-xl font-bold transition-all duration-300 ${
                          selectedTime === slot ? 'bg-primary text-white scale-105 shadow-lg shadow-primary/30' : 
                          'bg-slate-100 text-secondary hover:bg-primary/10 border-2 border-transparent hover:border-primary'
                        }`}
                      >
                        {slot}
                      </button>
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-10">
                       <p className="text-sm italic text-slate-400">No hay horarios disponibles.</p>
                       <p className="text-[10px] text-slate-300 mt-2">Día {currentDayOfWeek}</p>
                    </div>
                  )}
                </div>

                {selectedTime && (
                  <button onClick={handleNextStep} className="w-full mt-auto bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-primary/20">
                    Siguiente Paso
                  </button>
                )}
              </div>
            </div>
          )}

          {showModalityModal && (
            <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex items-center justify-center p-6">
              <div className="text-center max-w-sm w-full animate-in fade-in zoom-in duration-300">
                <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter">Modalidad de Sesión</h3>
                <div className="grid grid-cols-1 gap-4">
                  <button 
                    onClick={() => selectModality('Virtual')}
                    className="flex items-center justify-between p-5 rounded-2xl border-2 border-primary hover:bg-primary/5 transition-all group bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-xl text-primary">
                        <Video size={24}/>
                      </div>
                      <div className="text-left">
                        <span className="block font-bold text-secondary">Virtual (Online)</span>
                        <span className="text-[10px] text-gray-500 uppercase">Vía Google Meet / WhatsApp</span>
                      </div>
                    </div>
                    <CheckCircle size={20} className="text-primary"/>
                  </button>

                  <button 
                    onClick={() => selectModality('Presencial')}
                    className="flex items-center justify-between p-5 rounded-2xl border-2 border-secondary/20 hover:border-primary hover:bg-primary/5 transition-all group bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-100 p-3 rounded-xl text-secondary group-hover:text-primary transition-colors">
                        <MapPin size={24}/>
                      </div>
                      <div className="text-left">
                        <span className="block font-bold text-secondary">Presencial</span>
                        <span className="text-[10px] text-gray-500 uppercase">En Consultorio</span>
                      </div>
                    </div>
                  </button>
                </div>
                <button onClick={() => setShowModalityModal(false)} className="mt-8 text-slate-400 text-sm font-bold hover:text-red-500">Regresar</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleBooking} className="space-y-5 max-w-lg mx-auto">
              <div className="text-center mb-6 bg-primary/5 p-4 rounded-2xl border border-primary/20">
                <p className="text-primary font-bold">
                    <CalendarIcon className="inline mr-2" size={18}/> {date.toLocaleDateString()} — {selectedTime}hs 
                    <span className="text-slate-300 mx-2">|</span>
                    <span className="uppercase text-xs tracking-widest">{formData.modality}</span>
                </p>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Nombre Completo</label>
                <input 
                    type="text" placeholder="Ej: Juan Pérez" required
                    value={formData.name}
                    className="w-full p-4 rounded-2xl border-2 border-slate-100 outline-none focus:border-primary transition-colors"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">WhatsApp</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 font-bold text-secondary bg-slate-100 px-2 py-1 rounded-lg text-sm">+54 9</span>
                  <input 
                      type="tel" placeholder="3765XXXXXX" required
                      value={formData.phone}
                      className="w-full p-4 pl-20 rounded-2xl border-2 border-slate-100 outline-none focus:border-primary transition-colors"
                      onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/[^0-9]/g, '')})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Motivo de Consulta</label>
                <textarea 
                    placeholder="Ej: Consulta inicial..." required
                    value={formData.reason} rows="3"
                    className="w-full p-4 rounded-2xl border-2 border-slate-100 outline-none focus:border-primary transition-colors resize-none"
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                />
              </div>

              <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 shadow-xl shadow-primary/20">
                Confirmar Turno
              </button>
              <button type="button" onClick={() => setStep(1)} className="w-full text-slate-400 text-sm font-bold mt-2">← Volver</button>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-12">
              <CheckCircle size={60} className="text-primary mx-auto mb-6" />
              <h3 className="text-3xl font-black mb-3">¡TURNO SOLICITADO!</h3>
              <p className="text-slate-500 mb-8">Envía el WhatsApp que se abrió para finalizar.</p>
              <button onClick={() => setStep(1)} className="bg-slate-100 px-10 py-4 rounded-2xl font-black uppercase">Finalizar</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Booking;
import React, { useState } from 'react';

const CustodySchedule = () => {
  const initialMothersWeekend = new Date(2025, 0, 25); // Um sábado
  const [selectedDate, setSelectedDate] = useState(null); // Inicializa como null

  const formatDate = (date) => date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const determineParent = (checkDate) => {
    if (!checkDate) return ''; // Retorna vazio se não houver data selecionada
    
    // Encontra o sábado da semana atual
    const dayOfWeek = checkDate.getDay();
    const daysFromSaturday = dayOfWeek === 0 ? -1 : 6 - dayOfWeek; // Se for domingo, volta 1 dia, caso contrário calcula dias até sábado
    const saturday = new Date(checkDate);
    saturday.setDate(checkDate.getDate() - dayOfWeek + daysFromSaturday);
    
    // Calcula a diferença de semanas baseado no sábado
    const weeksDiff = Math.floor((saturday.getTime() - initialMothersWeekend.getTime()) / (7 * 24 * 60 * 60 * 1000));
    return weeksDiff % 2 === 0 ? 'Chico' : 'Marcela';
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value ? new Date(event.target.value) : null);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Agenda de Finais de Semana com a Isabela</h1>
      <div className="mb-4">
        <label className="block mb-2">Selecione um final de semana no calendário:</label>
        <input type="date" onChange={handleDateChange} className="w-full p-2 border rounded" />
      </div>
      <div className="bg-blue-100 p-4 rounded">
        <h2 className="text-xl font-semibold">Responsável no Final de Semana:</h2>
        <p className="text-2xl font-bold mt-2">{determineParent(selectedDate)}</p>
      </div>
    </div>
  );
};

export default CustodySchedule;
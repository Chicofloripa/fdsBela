import React, { useState } from 'react';

const CustodySchedule = () => {
  const initialMothersWeekend = new Date(2025, 0, 25); // Um sábado
  const [selectedDate, setSelectedDate] = useState(null); // Inicializa como null

  const formatDate = (date) =>
    date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const determineParent = (checkDate) => {
    if (!checkDate) return ''; // Retorna vazio se não houver data selecionada

    // Encontra o sábado da semana atual
    const dayOfWeek = checkDate.getDay();
    const daysFromSaturday = dayOfWeek === 0 ? -1 : 6 - dayOfWeek; // Se for domingo, volta 1 dia, caso contrário calcula dias até sábado
    const saturday = new Date(checkDate);
    saturday.setDate(checkDate.getDate() - dayOfWeek + daysFromSaturday);

    // Calcula a diferença de semanas baseado no sábado
    const weeksDiff = Math.floor((saturday.getTime() - initialMothersWeekend.getTime()) / (7 * 24 * 60 * 60 * 1000));
    return weeksDiff % 2 === 0 ? 'Francisco' : 'Marcela';
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value ? new Date(event.target.value) : null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 max-w-lg bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Agenda de Finais de Semana com a Isabela</h1>
        <div className="mb-4">
          <label className="block mb-2 text-lg font-medium">Selecione um final de semana no calendário:  </label>
          <input
            type="date"
            onChange={handleDateChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-2">Responsável no Final de Semana:</h2>
          <p className="text-3xl font-bold text-blue-700">{determineParent(selectedDate)}</p>
        </div>
      </div>
    </div>
  );
};

export default CustodySchedule;

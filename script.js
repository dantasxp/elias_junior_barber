document.addEventListener('DOMContentLoaded', function() {
    const availableTimes = [
        '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
    ];
    const timesList = document.getElementById('times-list');
    const scheduledList = document.getElementById('scheduled-list');

    // Função para renderizar horários disponíveis
    function renderAvailableTimes() {
        availableTimes.forEach(time => {
            const li = document.createElement('li');
            li.textContent = time;
            li.addEventListener('click', () => scheduleTime(time));
            timesList.appendChild(li);
        });
    }

    // Função para agendar horário
    function scheduleTime(time) {
        const li = document.createElement('li');
        li.textContent = time;
        scheduledList.appendChild(li);

        // Remover horário da lista de disponíveis
        availableTimes.splice(availableTimes.indexOf(time), 1);
        timesList.innerHTML = '';
        renderAvailableTimes();
    }

    renderAvailableTimes();
});

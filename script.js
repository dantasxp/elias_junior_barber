document.addEventListener('DOMContentLoaded', function() {
    const availableTimes = [
        '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
    ];
    const timesList = document.getElementById('times-list');
    const scheduledList = document.getElementById('scheduled-list');
    const nameInput = document.getElementById('name');
    const dateInput = document.getElementById('date');

    // Função para renderizar horários disponíveis
    function renderAvailableTimes() {
        timesList.innerHTML = '';  // Limpar a lista antes de renderizar
        availableTimes.forEach(time => {
            const li = document.createElement('li');
            li.textContent = time;
            li.addEventListener('click', () => scheduleTime(time));
            timesList.appendChild(li);
        });
    }

    // Função para agendar horário
    function scheduleTime(time) {
        const name = nameInput.value.trim();
        const date = dateInput.value;

        if (!name || !date) {
            alert('Por favor, preencha o nome e a data.');
            return;
        }

        const li = document.createElement('li');
        li.textContent = `${time} - ${name} - ${date}`;
        scheduledList.appendChild(li);

        // Remover horário da lista de disponíveis
        const index = availableTimes.indexOf(time);
        if (index > -1) {
            availableTimes.splice(index, 1);
        }
        renderAvailableTimes();  // Atualizar a lista de horários disponíveis

        // Limpar campos de entrada
        nameInput.value = '';
        dateInput.value = '';
    }

    renderAvailableTimes();
});

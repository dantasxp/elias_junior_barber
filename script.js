const horarios = [
    "10:00", "11:00", "11:30", "12:00", "13:00", "13:30", "14:00", "15:00",
    "15:30", "16:00", "17:00", "17:30", "18:00", "19:00", "20:00"
];

let horariosAgendados = [];

// Elementos do DOM
const timesList = document.getElementById('times-list');
const scheduledList = document.getElementById('scheduled-list');

// Função para renderizar horários disponíveis
function renderAvailableTimes() {
    timesList.innerHTML = '';
    horarios.forEach((horario, index) => {
        const li = document.createElement('li');
        const inputNome = document.createElement('input');
        inputNome.type = 'text';
        inputNome.placeholder = 'Seu nome';
        const inputData = document.createElement('input');
        inputData.type = 'date';
        const button = document.createElement('button');
        button.textContent = 'Agendar';
        button.onclick = () => agendarHorario(index, inputNome.value, inputData.value);
        li.textContent = horario;
        li.appendChild(inputNome);
        li.appendChild(inputData);
        li.appendChild(button);
        timesList.appendChild(li);
    });
}

// Função para renderizar horários agendados
function renderScheduledTimes() {
    scheduledList.innerHTML = '';
    horariosAgendados.forEach(({ horario, nome, data }) => {
        const li = document.createElement('li');
        li.textContent = `${formatarData(data)} - ${horario} - ${nome}`;
        scheduledList.appendChild(li);
    });
}

// Função para agendar horário
function agendarHorario(index, nome, data) {
    if (!nome || !data) {
        alert('Por favor, insira seu nome e selecione uma data.');
        return;
    }
    const horario = horarios.splice(index, 1)[0];
    horariosAgendados.push({ horario, nome, data });
    saveAgendamentos();
    renderAvailableTimes();
    renderScheduledTimes();
    verificarTodosHorariosAgendados();
}

// Função para verificar se todos os horários foram agendados
function verificarTodosHorariosAgendados() {
    if (horarios.length === 0) {
        notificarWhatsApp();
    }
}

// Função para notificar via WhatsApp
function notificarWhatsApp() {
    const message = `Todos os horários foram agendados:\n${horariosAgendados.map(({ data, horario, nome }) => `${formatarData(data)} - ${horario} - ${nome}`).join('\n')}`;
    const phoneNumber = '5511932184626'; // Seu número de telefone
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Função para formatar a data
function formatarData(data) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

// Função para salvar horários agendados no Local Storage
function saveAgendamentos() {
    localStorage.setItem('horariosAgendados', JSON.stringify(horariosAgendados));
}

// Função para carregar horários agendados do Local Storage
function loadAgendamentos() {
    const savedAgendamentos = localStorage.getItem('horariosAgendados');
    if (savedAgendamentos) {
        horariosAgendados = JSON.parse(savedAgendamentos);
        // Remover horários agendados da lista de horários disponíveis
        horariosAgendados.forEach(({ horario }) => {
            const index = horarios.indexOf(horario);
            if (index !== -1) {
                horarios.splice(index, 1);
            }
        });
    }
}

// Inicializar o aplicativo
loadAgendamentos();
renderAvailableTimes();
renderScheduledTimes();
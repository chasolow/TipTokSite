// Функция для переключения вкладок
function showSection(sectionId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Функция для расчета стоимости
function calculateCost() {
    const existingPower = document.getElementById('existingPower').value;
    const P = parseFloat(document.getElementById('power').value);
    const Pdop = parseFloat(document.getElementById('Pdop').value);
    const Ku = parseFloat(document.getElementById('voltageClass').value);
    const Ktg = parseFloat(document.getElementById('reactiveCompensation').value);
    const Kc = parseFloat(document.getElementById('agreementSupport').value);
    const Y = parseFloat(document.getElementById('numDevices').value);
    let X = parseFloat(document.getElementById('numLines').value);

    // Проверка на ввод значений
    if (isNaN(P) || P <= 0) {
        document.getElementById('result').innerText = "Ошибка: введите корректную мощность.";
        return;
    }

    if (existingPower === 'no') {
        Pdop = null; // Устанавливаем значение Pdop в null, если мощности нет
    }

    // Рассчитываем коэффициенты
    let Kp = Pdop 
        ? (0.8533 * Math.pow(Pdop, 0.0599) + (0.8533 * Math.pow(P, 0.0599) - 0.8533 * Math.pow(Pdop, 0.0599)) * Pdop / P)
        : (0.8533 * Math.pow(P, 0.0599));

    // Общая стоимость
    let Gx, Gy, Gz;
    if (X && Y) {
        Gx = 1892.9 * Math.pow(X, -0.544);
        Gy = 379.89 * Math.pow(Y, -0.271);
        Gz = 966.81 * 2 * Math.pow(Y, -0.424);
        let cost = Math.round(((X * Gx + Y * Gy) * Kp * Ku * Ktg * Kc + (X * Gz)) / 100) * 100;
        document.getElementById('result').innerText = `Общая стоимость услуги: ${cost} руб.`;
    } else {
        document.getElementById('result').innerText = "Ошибка: проверьте введенные значения.";
    }
}




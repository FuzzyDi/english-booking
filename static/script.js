// Функция переключения темы
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return; // если кнопки нет — выходим

    // Убираем старые обработчики (защита от дублирования)
    const newToggle = themeToggle.cloneNode(true);
    themeToggle.parentNode.replaceChild(newToggle, themeToggle);

    const finalToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    finalToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    finalToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        finalToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

// Функции модального окна (только для главной)
function initBookingModal() {
    window.openBookingModal = function(date, time) {
        const modal = document.getElementById('modal');
        if (modal) {
            document.getElementById('date-input').value = date;
            document.getElementById('time-input').value = time;
            modal.style.display = 'flex';
        }
    };

    window.closeModal = function() {
        const modal = document.getElementById('modal');
        if (modal) modal.style.display = 'none';
    };

    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            fetch('/book', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/success';
                } else {
                    response.text().then(text => alert('Error: ' + text));
                }
            })
            .catch(err => alert('Network error'));
        });
    }
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initBookingModal();
});
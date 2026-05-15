const form = document.getElementById('applicationForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        passport: document.getElementById('passport').value,
        discord: document.getElementById('discord').value,
        age: document.getElementById('age').value,
        about: document.getElementById('about').value
    };

    try {

        const response = await fetch('/api/application', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if(result.success) {

            message.innerHTML = '✅ Заявка успешно отправлена';
            message.style.color = '#00ff90';

            form.reset();

        } else {

            message.innerHTML = '❌ Ошибка при отправке';
            message.style.color = 'red';

        }

    } catch(error) {

        message.innerHTML = '❌ Сервер недоступен';
        message.style.color = 'red';

    }
});
const taskForm = document.querySelector('.task-form');
const taskInput = document.getElementById('task-text');
const taskList = document.getElementById('task-items');
taskForm.addEventListener('submit', function(event) {
    event.preventDefault(); // отменяет стандартное действие браузера (не выполнять обычную отправку с перезагрузкой страницы)
    console.log('форма отправлена')
})
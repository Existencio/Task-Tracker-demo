const taskForm = document.querySelector('.task-form'); // находим форму по CSS селектору
const taskInput = document.getElementById('task-text'); // находим поле ввода по id
const taskList = document.getElementById('task-items'); // находим список задач по id

taskForm.addEventListener('submit', function(event) {  // слушаем сабмит (отправку формы)
    event.preventDefault(); // отменяет стандартное действие браузера (не выполнять обычную отправку с перезагрузкой страницы)
    let inputValue = taskInput.value.trim(); // находим значение от строки ввода (то, что ввёл пользователь)
    if (inputValue === '') {
        return
    }
    console.log(inputValue); // выводим значение из поля ввода в консоль

    let taskUnit = document.createElement('li');
    taskUnit.textContent = inputValue; // textContent помещает строку из поля ввода (inputValue) в DOM-элемент <li> (taskUnit)
    taskList.appendChild(taskUnit); // добавляем узел - элемент <li> (taskUnit) в DOM - в в конец списка дочерних элементов указанного родительского узла (taskList)
    taskInput.value = ''; // поле ввода очищается
    taskInput.focus(); // после добавления задачи курсор снова ставится в поле ввода
})

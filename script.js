// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ

const taskForm = document.querySelector('.task-form'); // форма
const taskInput = document.getElementById('task-input'); // поле ввода
const taskList = document.getElementById('task-list'); // список задач

const filterAllButton = document.getElementById('filter-all-button'); // кнопка "Все задачи"
const filterActiveButton = document.getElementById('filter-active-button'); // кнопка "Активные"
const filterCompletedButton = document.getElementById('filter-completed-button'); // кнопка "Выполненные"

const activeTasksCount = document.getElementById('active-tasks-count') // элемент для отображения количества активных задач


// ОБРАБОТЧИКИ

taskForm.addEventListener('submit', function(event) {  // слушаем сабмит (отправку формы)
    event.preventDefault(); // отменяет стандартное действие браузера (не выполнять обычную отправку с перезагрузкой страницы)
    const inputValue = taskInput.value.trim(); // находим значение от строки ввода (то, что ввёл пользователь)
    if (inputValue === '') {
        return;
    }

    // Параметры: текст из input, и false (новая задача не выполнена)
    const taskItem = createTaskElement(inputValue, false);

    taskList.appendChild(taskItem); // добавляем узел - элемент <li> (taskItem) в DOM - в в конец списка дочерних элементов указанного родительского узла (taskList)
    
    updateActiveCount(); // обновляем счётчик активных задач при добавлении новой задачи
    saveTasks(); // сохраняем задачи в localStorage при добавлении новой задачи

    taskInput.value = ''; // поле ввода очищается
    taskInput.focus(); // после добавления задачи курсор снова ставится в поле ввода
});

filterAllButton.addEventListener('click', function() {

    const allTasks = document.querySelectorAll('.task-item'); // allTasks теперь содержит все элементы задач (находит по css классу .task-item)

    allTasks.forEach(function(task) {
        task.style.display = 'flex'; // делаем DOM-объект видимым (про style читай ниже)
    });
    /*
    style - это объект встроенных inline-стилей именно этого элемента
    через .style JavaScript может менять CSS прямо у конкретного DOM-элемента
    */

    const allFilterButtons = document.querySelectorAll('.task-filter-btn'); // находим по CSS классу '.task-filter-btn' все кнопки, управляющие фильтрами  

    allFilterButtons.forEach(function(button) { // циклом проходимся по каждому элементу класса (кнопке) и применяем к каждой функцию (с параметром button)
        button.classList.remove('filter-highlighted'); // убираем у каждой кнопки класс 'filter-highlighted'
    });

    filterAllButton.classList.add('filter-highlighted'); // присваиваем CSS класс 'filter-highlighted' только для кнопки "Все задачи"

});

filterActiveButton.addEventListener('click', function() {

    const allTasks = document.querySelectorAll('.task-item'); // allTasks теперь содержит все элементы задач (находит по css классу .task-item)
    allTasks.forEach(function(task) { // forEach(...) — пройтись циклом по каждой задаче. function(task) — функция, которая выполнится для каждой задачи
        const checkbox = task.querySelector('input'); // создаём переменную checkbox текущей задачи. task — текущая задача, querySelector('input') — найти внутри этой задачи элемент input
        if (checkbox.checked === false) { // проверяем прожат ли чекбокс
            task.style.display = 'flex'; // если не прожат, то отображаем элемент task
        } else {
            task.style.display = 'none'; // в противном случае не отображаем
        }

    });
    /*
    forEach сам берёт элементы из allTasks
    и по одному подставляет их в параметр функции
    имя task — это просто имя для текущего элемента
    */

    const allFilterButtons = document.querySelectorAll('.task-filter-btn'); // находим по CSS классу '.task-filter-btn' все кнопки, управляющие фильтрами  

    allFilterButtons.forEach(function (button) { // циклом проходимся по каждому элементу класса (кнопке) и применяем к каждой функцию (с параметром button)
        button.classList.remove('filter-highlighted'); // убираем у каждой кнопки класс 'filter-highlighted'
    });

    filterActiveButton.classList.add('filter-highlighted'); // присваиваем CSS класс 'filter-highlighted' только для кнопки "Активные"

});

filterCompletedButton.addEventListener('click', function() {

    const allTasks = document.querySelectorAll('.task-item'); // allTasks теперь содержит все элементы задач (находит по css классу .task-item)
    allTasks.forEach(function(task) {
        const checkbox = task.querySelector('input');
        if (checkbox.checked === true) { // проверяем прожат ли чекбокс
            task.style.display = 'flex'; // если не прожат, то отображаем элемент task
        } else {
            task.style.display = 'none'; // в противном случае не отображаем
        }

    });

    const allFilterButtons = document.querySelectorAll('.task-filter-btn'); // находим по CSS классу '.task-filter-btn' все кнопки, управляющие фильтрами  
    
    allFilterButtons.forEach(function (button) { // циклом проходимся по каждому элементу класса (кнопке) и применяем к каждой функцию (с параметром button)
        button.classList.remove('filter-highlighted'); // убираем у каждой кнопки класс 'filter-highlighted'
    });

    filterCompletedButton.classList.add('filter-highlighted'); // присваиваем CSS класс 'filter-highlighted' только для кнопки "Выполненные"

});


// ФУНКЦИИ

function createTaskElement(text, isCompleted) {
    // На выходе функция будет возвращать готовый taskItem, который можно вставить в DOM

    // Создаём элемент списка
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    // Создаём контейнер для текста
    const taskText = document.createElement('span');
    taskText.classList.add('task-text');
    taskText.textContent = text; // Устанавливаем текст задачи

    // Создаём кнопку удаления
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Удалить задачу';
    deleteButton.addEventListener('click', function () {
        taskItem.remove(); // Удаляем из DOM
        updateActiveCount(); // Пересчитываем счётчик
        saveTasks(); // Сохраняем изменения в localStorage
    })

    // Создаём чекбокс
    const completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    // Устанавливаем сохранённое состояние (true или false)
    completeCheckbox.checked = isCompleted // isCompleted это переменная, которую мы сами передаём

        completeCheckbox.addEventListener('change', function () {
            // Если чекбокс отмечен
            if (completeCheckbox.checked) {
                taskItem.classList.add('completed'); // Добавляем класс для стиля (зачёркивание)
            } else {
                taskItem.classList.remove('completed'); // Убираем класс если чекбокс не отмечен 
            }
            updateActiveCount(); // Пересчитываем счётчик активных
            saveTasks(); // Сохраняем в localStorage
        })
    
    // Собираем DOM-дерево: чекбокс → текст → кнопка удаления
    taskItem.appendChild(completeCheckbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);

    // Возвращаем готовый элемент (его потом добавят в список)
    return taskItem;
}

function updateActiveCount () {
    const allTasks = document.querySelectorAll('.task-item'); // allTasks теперь содержит все элементы задач (находит по css классу .task-item)
    let count = 0; // создаём переменную для подсчёта активных задач
    allTasks.forEach(function (task) {
        const checkbox = task.querySelector('input'); // создаём переменную checkbox текущей задачи. task — текущая задача, querySelector('input') — найти внутри этой задачи элемент input
        if (checkbox.checked === false) {
            count++; // если чекбокс не прожат, то увеличиваем счётчик на единицу
        }
    });
    activeTasksCount.textContent = `Активных задач: ${count}`; // отображаем количество активных задач в элементе activeTasksCount
}


function saveTasks() {
    const tasks = []; // создаём массив для хранения задач
    const allTasks = document.querySelectorAll('.task-item'); // allTasks теперь содержит все элементы задач (находит по css классу .task-item)
    allTasks.forEach(task => { // проходим циклом по каждой задаче и для каждой задачи выполняем функцию, которая принимает эту задачу в виде параметра task
        const text = task.querySelector('.task-text').textContent; // создаём переменную text для хранения текста задачи. task — текущая задача, querySelector('.task-text') — найти внутри этой задачи элемент с классом .task-text, textContent — получить текстовое содержимое этого элемента
        const isCompleted = task.querySelector('input').checked; // создаём переменную isCompleted для хранения статуса выполнения задачи. task — текущая задача, querySelector('input') — найти внутри этой задачи элемент input, checked — получить булевое значение, указывающее, отмечен ли чекбокс
        tasks.push({ text, isCompleted }); // добавляем объект с текстом и статусом выполнения задачи в массив tasks. push — метод массива, который добавляет элемент в конец массива. { text, isCompleted } — объект, который содержит текст задачи и её статус выполнения
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); // сохраняем задачи в localStorage в виде строки
}
/*
localStorage умеет хранить только строки.
Поэтому сначала превращаем массив tasks в JSON с помощью JSON.stringify.
*/

function loadTasks() {
    // Получаем строку из localStorage с ключом 'tasks'
    const saved = localStorage.getItem('tasks'); 

    // Проверяем, есть ли вообще сохранённые данные
    if (saved) {
        // Превращаем JSON-строку обратно в массив объектов
        const tasks = JSON.parse(saved);

        // Проходим циклом по каждому объекту задачи
        tasks.forEach(taskData => {
            // taskData — один объект вроде { text: "Купить молоко", isCompleted: false }

            // Создаём элемент списка через функцию
            const taskItem = createTaskElement(taskData.text, taskData.isCompleted);
            
            // Добавляем в список
            taskList.appendChild(taskItem);
        });
        updateActiveCount(); // Обновляем счётчик после восстановления всех задач
    }
}

// Вызываем функцию загрузки задач при загрузке страницы
loadTasks();
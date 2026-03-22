const taskForm = document.querySelector('.task-form'); // находим форму по CSS селектору
const taskInput = document.getElementById('new-task-input'); // находим поле ввода по id
const taskList = document.getElementById('task-items'); // находим список задач по id

taskForm.addEventListener('submit', function(event) {  // слушаем сабмит (отправку формы)
    event.preventDefault(); // отменяет стандартное действие браузера (не выполнять обычную отправку с перезагрузкой страницы)
    const inputValue = taskInput.value.trim(); // находим значение от строки ввода (то, что ввёл пользователь)
    if (inputValue === '') {
        return;
    }

    const taskItem = document.createElement('li'); // создаём элемент списка
    taskItem.classList.add('task-item'); // новосозданному DOM-элементу (li) присваивается css класс "task-item"
    
    const taskText = document.createElement('span'); // создаём строчный контейнер для текста внутри элемента списка
    taskText.classList.add('task-text'); // новосозданному DOM-элементу (span) присваивается css класс "task-text"
    taskText.textContent = inputValue; // textContent помещает строку из поля ввода (inputValue) в DOM-элемент <span> (taskText)    

    const deleteButton = document.createElement('button'); // создаём кнопку для удаления задачи
    deleteButton.classList.add('delete-button'); // присваиваем кнопке css класс 'delete-button'
    deleteButton.textContent = 'Удалить задачу'; // делаем надпись на кнопке
    deleteButton.type = 'button'; // задаём тип кнопки чтобы она не делала submit
    deleteButton.addEventListener('click', function() { // слушаем click по кнопке удаления
        taskItem.remove(); // taskItem удаляется по нажатию
    });

    const completeCheckbox = document.createElement('input'); // создаём элемент input для выполненных задач
    completeCheckbox.type = 'checkbox'; // задаём ему тип checkbox

    completeCheckbox.addEventListener('change', function () { // слушаем изменение состояния чекбокса
        if (completeCheckbox.checked) { // если checked === true 
            taskItem.classList.add('completed'); // присваиваем задаче класс 'completed'
        } else {
            taskItem.classList.remove('completed'); // в остальных случаях класс 'completed' удаляется
        }
    });

    taskItem.appendChild(completeCheckbox); // добавляем узел - элемент input checkbox (completeCheckbox) в DOM - в в конец списка дочерних элементов указанного родительского узла (taskItem)
    taskItem.appendChild(taskText); // добавляем узел - элемент <span> (taskText) в DOM - в в конец списка дочерних элементов указанного родительского узла (taskItem)
    taskItem.appendChild(deleteButton); // добавляем узел - элемент <button> (deleteButton) в DOM - в в конец списка дочерних элементов указанного родительского узла (taskItem)    
    taskList.appendChild(taskItem); // добавляем узел - элемент <li> (taskItem) в DOM - в в конец списка дочерних элементов указанного родительского узла (taskList)
    
    taskInput.value = ''; // поле ввода очищается
    taskInput.focus(); // после добавления задачи курсор снова ставится в поле ввода
});

const taskInp = document.getElementById("task_inp");
const btnAdd = document.getElementById("btn_add");
const todoBody = document.querySelector(".todo_body");
const darkMode = document.querySelector('.darkMode') ;
const toggler = document.querySelector('.darkMode span') ;

let arrayOfTasks  ;

if (localStorage.getItem('tasks') !== null ) {
    arrayOfTasks = JSON.parse(localStorage.tasks) ;
} else {
    arrayOfTasks = [] ;
}

showTasks() ;

function addTask() {
  let task = {
    title: taskInp.value,
    isDone: false,
  };
  arrayOfTasks.push(task);
  localStorage.setItem('tasks' , JSON.stringify(arrayOfTasks)) ;
  showTasks() ;
  taskInp.value = '' ;
  taskInp.focus() ;
}

function showTasks() {
    if (taskInp.value !='') {
            todoBody.innerHTML = '' ;
    let divTask ;
  for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].isDone) {
            divTask = `
        <div class="new_task done">
            <p data-target =${i}>${arrayOfTasks[i].title}</p>
            <span onclick = "deleteTask(${i})"><i class="fas fa-window-close"></i></span>
        </div>
        `;
        } else {
            divTask = `
        <div class="new_task">
            <p data-target =${i}>${arrayOfTasks[i].title}</p>
            <span onclick = "deleteTask(${i})"><i class="fas fa-window-close"></i></span>
        </div>
        `;
        }
        todoBody.innerHTML += divTask ;
    }

  }

  let allTasks = document.querySelectorAll('.new_task p') ;
  allTasks.forEach(task=> {
      task.addEventListener('click' , function() {
          this.classList.toggle('done') ;
          if (this.classList.contains('done')) {
              arrayOfTasks[+this.getAttribute('data-target')].isDone = true ;
              localStorage.setItem('tasks' , JSON.stringify(arrayOfTasks)) ;
          } else {
            arrayOfTasks[+this.getAttribute('data-target')].isDone = false ;
            localStorage.setItem('tasks' , JSON.stringify(arrayOfTasks)) ;
          }
      })
  })
}

function deleteTask(i) {
    arrayOfTasks.splice(i , 1) ;
    localStorage.setItem('tasks' , JSON.stringify(arrayOfTasks)) ;
    showTasks() ;
}

btnAdd.addEventListener('click', addTask) ;

darkMode.onclick = function () {
    toggler.classList.toggle('move') ;
    if ( toggler.classList.contains('move') ) {
        document.body.classList.add('dark') ;
    }  else {
        document.body.classList.remove('dark') ;
    }
}

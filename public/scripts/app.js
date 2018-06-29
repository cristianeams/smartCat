$(document).ready(function () {

loadTasks(); 

function loadTasks() {
    $.ajax({
      method: "GET",
      url: "/api/users/Bob",                      //as per instructions demo login not required 
      success: function(tasksdata) {
        console.log('LOAD TWEETS DATA:', tasksdata);
        renderTasks(tasksdata);
      }
    })
  }

  function createTaskElement(task) {
    let $task = $(`
    <div class="task-field input-group col-lg-10">
                  <p>Watch: ${task.description}</p>
                  <span class="align-right">
                    <i class="fas fa-film fa-2x"></i>
                  <button type="button" class="btn btn-outline-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Category
                  </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">Watch</a>
                      <a class="dropdown-item" href="#">Read</a>
                      <a class="dropdown-item" href="#">Eat</a>
                      <a class="dropdown-item" href="#">Buy</a>
                    </div>
                  </span>
                </div>  
    
    `)
  
    return $task; 
  }

  
  function renderTasks (tasks) {
    $('.tasks-container').empty(); 
    for (let i = 0; i < tasks.length; i++ ) {
      $('.tasks-container').append(createTaskElement(tasks[i])); 
    }
  }



})







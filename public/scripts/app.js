$(document).ready(function () {

  loadTasks(); 
  
  function loadTasks() {
      $.ajax({
        method: "GET",
        url: "/api/users/Bob",                      //as per instructions demo login not required 
        success: function(tasksdata) {
          //console.log('LOAD TWEETS DATA:', tasksdata);
          console.log('hello im in ajax')
          renderTasks(tasksdata);
        }
      })
    }
  
  function getCategoryIcon(categoryID) {
    let icon ;
    console.log(categoryID);
    if (categoryID === 1) {
       icon = '<i class="fas fa-utensils fa-2x"></i>'
    } else if (categoryID === 2) {
      icon = '<i class="fas fa-film fa-2x"></i>'
    } else if (categoryID === 3) {
      icon = '<i class="fas fa-book fa-2x"></i>'
    } else if (categoryID === 4) {
      icon = '<i class="fas fa-shopping-cart fa-2x"></i>'
    }
    return icon
  }
  
  
  function getCategoryName(categoryID) {
    
    let word ;
    if (categoryID === 1) {
       word = 'Eat: '
    } else if (categoryID === 2) {
      word = 'Watch: '
    } else if (categoryID === 3) {
      word = 'Read: '
    } else if (categoryID === 4) {
      word = 'Buy: '
    }
    return word;
  }
  
    function createTaskElement(task) {
      let icon = getCategoryIcon(task.category_id);
      console.log('icon' , icon);
      let word = getCategoryName(task.category_id);
      let $task = $(`
      <div class="task-field input-group col-lg-10">
                    <p>${word} ${task.description}</p>
                    <span class="align-right">
                      ${icon}
                    <div class="btn-group dropup">
                      <button type="button" class="btn btn-outline-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Category
                      </button>
                        <div class="dropdown-menu">
                          <a class="dropdown-item" href="#">Watch</a>
                          <a class="dropdown-item" href="#">Read</a>
                          <a class="dropdown-item" href="#">Eat</a>
                          <a class="dropdown-item" href="#">Buy</a>
                      </div>
                    </div>
                    </span>
                  </div>  
      
      `)
    
      return $task; 
    }
  
    
    function renderTasks (tasks) {
      console.log(tasks, 'taks')
      $('.tasks-container').empty(); 
      for (let i = 0; i < tasks.length; i++ ) {
        $('.tasks-container').append(createTaskElement(tasks[i])); 
      }
    }
    $("#changes").on("click", function () {
      var input = $("input#name").val();
      var imgUrl = $("input#url").val();
      $("h4").text(input);
      $("#profile_pic").attr("src", imgUrl).modal('hide');
    });
  })
  
  
 






$(document).ready(function () {

  loadTasks(); 
  
  function loadTasks() {
    $.ajax({
      method: "GET",
      url: "/api/users/2",//as per instructions demo login not required 
      success: function(tasksdata) {
      //console.log('LOAD TWEETS DATA:', tasksdata);
      console.log('hello im in ajax')
      renderTasks(tasksdata);
      }
    })
  }
  
  function getCategoryIcon(categoryID) {
    let icon ;
    //console.log(categoryID);
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
    
    let word;
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
    //console.log('icon' , icon);
    let word = getCategoryName(task.category_id);
    let $task = $(`
      <div class="task-field input-group col-lg-10">
                    <p>${word} ${task.description}</p>
                    <span class="align-right">
                      ${icon}
                    <div class="btn-group">
                    <button method="POST" id="edit-cat" data-toggle="modal" data-target="#exampleModal" class="btn btn-outline-success"> Change Category </button>
                    </div>
                    </span>
                  </div>
                  <!-- Update Category Modal -->
                  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Category</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          Enter new Category:
                          <input type="text" name="category" id="new-cat">
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
                          <button type="button" class="btn btn-outline-success" id="cat-changes">Update</button>
                        </div>
                      </div>
                    </div>
                  </div>
      `)
      $("#cat-changes").on("click", function () {
        var input = $("input#new-cat").val();
        $.ajax('/api/users/2/edit', {
          method: 'POST', 
          data: {
          text: input 
        } 
        
      })
      console.log(input);
      return $task; 
    }
  
  function renderTasks (tasks) {
    //console.log(tasks, 'taks')
    $('.tasks-container').empty(); 
    for (let i = 0; i < tasks.length; i++ ) {
    $('.tasks-container').prepend(createTaskElement(tasks[i])); 
    }
  }

  $("#changes").on("click", function () {
    var input = $("input#name").val();
    var imgUrl = $("input#url").val();
    $("h4").text(input);
    $("#profile_pic").attr("src", imgUrl).modal('hide');
  });

 

  $('#add-new-task').on('click',function(task) {
    task.preventDefault(); 
    var data = $('.new-task-area input').val(); 
    console.log('My text data:', data)
    if(!data) {
      alert('Please enter a task?');
    } else {
      $.ajax('/api/users/2', {
        method: 'POST', 
        data: {
        text: data
      } 
    })
    .done(function(res) {
      //console.log('============>', res); 
      loadTasks(res); 
      $('.new-task-area input').val('')
    })
    }
  }); 


});
  
  
 






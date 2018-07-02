$(document).ready(function () {

  loadTasks();
  loadProfile(); 

  function loadTasks() {
    $.ajax({
      method: "GET",
      url: "/api/users/2", //as per instructions demo login not required 
      success: function (tasksdata) {
        renderTasks(tasksdata);
      }
    })
  }

  function loadProfile() {
    $.ajax({
      method: "GET",
      url: "/api/users/2/profile", //as per instructions demo login not required 
      success: function (userdata) {
        renderProfile(userdata); 
      }
    })
  }

  function getCategoryIcon(categoryID) {
    let icon;
    if (categoryID === 1) {
      icon = '<i class="fas fa-utensils fa-2x"></i>';
    } else if (categoryID === 2) {
      icon = '<i class="fas fa-film fa-2x"></i>';
    } else if (categoryID === 3) {
      icon = '<i class="fas fa-book fa-2x"></i>';
    } else if (categoryID === 4) {
      icon = '<i class="fas fa-shopping-cart fa-2x"></i>';
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


  function createUserProfile(user) {
    let $profile = $(`<img src="https://i.imgur.com/HUZvaXJ.jpg" class="rounded-circle" id="profile_pic" alt="Profile Picture">
                    <!-- Modal -->
                    <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Profile</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            Name :
                            <input type="text" name="name" id="name">
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-outline-success" id="changes" data-backdrop="false" data-dismiss="modal">Update</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h4>${user}</h4>
                    <button method="POST" id="edit-profile" data-toggle="modal" data-target="#exampleModal" class="btn btn-outline-success">
                    Edit </button>`)
  $profile.find("#changes").on("click", function(){
    var newName = $("input#name").val();
    $.ajax('/api/users/2/updateProfile', {
      method: 'POST',
      data: {
        newName: newName,
        success: function (userdata) {
          loadProfile(userdata);  
        }
      }
    })
  })
  return $profile; 
  }

  function renderProfile(profile) {
    $('.side-bar').html(createUserProfile(profile));
  }

  function createTaskElement(task) {
    let taskAttr = task.id;
    let taskCatId = task.category_id;
    let icon = getCategoryIcon(task.category_id);
    let word = getCategoryName(task.category_id);
    let $task = $(` <div class="task-field input-group col-lg-10">
                    <span class="align-left">
                        <input class="form-check-input position-static" type="checkbox" data-toggle="tooltip" data-placement="top" title="Remove from tasks" aria-label="...">
                        <p>${word} ${task.description}</p>
                    </span>
                      <span class="align-right">
                        ${icon}
                      <div class="btn-group dropup">
                        <select class="btn btn-outline-success">
                          <option>Change</option>
                          <option>Eat</option>
                          <option>Watch</option>
                          <option>Read</option>
                          <option>Buy</option>
                        </select>
                      </div>
                    </span>
                  </div>`)
    $task.find('select').on('change', function (event) {
      var currentCat = $(this).find("option:selected").text();
      if (currentCat === 'Eat') {
        taskCatId = 1;
      } else if (currentCat === 'Watch') {
        taskCatId = 2;
      } else if (currentCat === 'Read') {
        taskCatId = 3;
      } else {
        taskCatId = 4;
      }
      $.ajax('/api/users/2/update', {
        method: 'POST',
        data: {
          taskAttr: taskAttr,
          taskCatId: taskCatId,
          success: function (tasksdata) {
            loadTasks(tasksdata);
          }
        }
      })
    })
    $task.find('input[type=checkbox]').on('change', function(){
      if (this.checked) {
        $.ajax('/api/users/2/deleteTask', {
          method: 'POST',
          data: {
            taskAttr: taskAttr,
            success: function (tasksdata) {
              loadTasks(tasksdata);
            }
          }
        })   
      }
    });
    return $task;
   
  }


  function renderTasks(tasks) {
    $('.tasks-container').empty();
    for (let i = 0; i < tasks.length; i++) {
      $('.tasks-container').prepend(createTaskElement(tasks[i]));
    }
  }

  $('#add-new-task').on('click', function (task) {
    task.preventDefault();
    var data = $('.new-task-area input').val();
    console.log('My text data:', data)
    if (!data) {
      alert('Please enter a task?');
    } else {
      $.ajax('/api/users/2', {
        method: 'POST',
        data: {
          text: data
        }
      })
      .done(function (res) {
        loadTasks(res);
        $('.new-task-area input').val('')
      })
    }
  })

  //Click event on enter/return key
  $('.new-task-area').bind("enterKey",function(e){
    e.preventDefault();
    var data = $('.new-task-area input').val();
    console.log('My text data:', data)
    if (!data) {
      alert('Please enter a task?');
    } else {
      $.ajax('/api/users/2', {
        method: 'POST',
        data: {
          text: data
        }
      })
      .done(function (res) {
        loadTasks(res);
        $('.new-task-area input').val('')
      })
    }
  });
  $('.new-task-area').keyup(function(e){
    if(e.keyCode == 13){
      $(this).trigger("enterKey");
    }
  });    

});

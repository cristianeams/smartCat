$(document).ready(function () {

  loadTasks();
  loadProfile(); 
  

  function loadTasks() {
    $.ajax({
      method: "GET",
      url: "/api/users/2", //as per instructions demo login not required 
      success: function (tasksdata) {
        //console.log('LOAD TWEETS DATA:', tasksdata);
        //console.log('hello im in ajax')
        renderTasks(tasksdata);
      }
    })
  }

  function loadProfile() {
    
    $.ajax({
      method: "GET",
      url: "/api/users/2/profile", //as per instructions demo login not required 
      success: function (userdata) {
        //console.log('LOAD TWEETS DATA:', tasksdata);
        //console.log('hello im in ajax')
        renderProfile(userdata);
        
      }
    })
  }

  function getCategoryIcon(categoryID) {
    let icon;
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


  function createUserProfile(user) {
    console.log("USERRRRRR OBJECT OBJECT",user)
    let $profile = $(`<img src="https://www.shareicon.net/data/256x256/2016/08/18/814068_face_512x512.png" class="rounded-circle" id="profile_pic"
    alt="Profile Picture">
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
        <div class="modal-body">
          URL :
          <input type="text" name="url" id="url">
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
    //console.log(task); 
    let icon = getCategoryIcon(task.category_id);
    //console.log('icon' , icon);
    let word = getCategoryName(task.category_id);
    let $task = $(`
      <div class="task-field input-group col-lg-10">
                    <p>${word} ${task.description}</p>
                    <span class="align-right">
                      ${icon}
                    <div class="btn-group dropup">
                        <select class="btn btn-outline-success">
                          <option class="dropdown-item change">Change</option>
                          <option class="dropdown-item eat">Eat</option>
                          <option class="dropdown-item watch">Watch</option>
                          <option class="dropdown-item read">Read</option>
                          <option class="dropdown-item buy">Buy</option>
                        </select>
                    </div>
                  </span>
      </div>`)
    $task.find('select').on('change', function (event) {
      var currentCat = $(this).find("option:selected").text();
      console.log(currentCat);
      if (currentCat === 'Eat') {
        //console.log("food");
        taskCatId = 1;
        //console.log(taskCatId);
      } else if (currentCat === 'Watch') {
        //console.log("movie");
        taskCatId = 2;
        //console.log(taskCatId);
      } else if (currentCat === 'Read') {
        //console.log("book");
        taskCatId = 3;
        //console.log(taskCatId);
      } else {
        //console.log("product");
        taskCatId = 4;
        //console.log(taskCatId);
      }
      console.log(taskCatId);
      console.log('Clicked/', taskAttr, 'EVENT>>>', event.currentTarget);
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
    });
    return $task;
  }


  function renderTasks(tasks) {
    console.log(tasks, 'taks')
    $('.tasks-container').empty();
    for (let i = 0; i < tasks.length; i++) {
      $('.tasks-container').prepend(createTaskElement(tasks[i]));
    }
  }



  $("#changes").on("click", function () {
    var input = $("input#name").val();
    var imgUrl = $("input#url").val();
    $("h4").text(input);
    $("#profile_pic").attr("src", imgUrl).modal('hide');
  });

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
          console.log('============>', res);
          loadTasks(res);
          $('.new-task-area input').val('')
        })
    }
  })



})

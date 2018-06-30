$(document).ready(function () {

  loadTasks(); 
  
  function loadTasks() {
      $.ajax({
        method: "GET",
        url: "/api/users/2",                      //as per instructions demo login not required 
        success: function(tasksdata) {
          //console.log('LOAD TWEETS DATA:', tasksdata);
          //console.log('hello im in ajax')
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
      $task.find('select').on('change',function(event){
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
        method:'POST', 
        data: {
          taskAttr: taskAttr,
          taskCatId: taskCatId
        }
      })
    });
      return $task; 
    }
  
    
    function renderTasks (tasks) {
      console.log(tasks, 'taks')
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
          console.log('============>', res); 
          loadTasks(res); 
          $('.new-task-area input').val('')
        })
      }
    })
    


  })
  
  
 






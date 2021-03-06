$(document).ready(function(){
  var getAndDisplayAllTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=247',
      dataType: 'json',
      success: function (response, textStatus) {
           $('#todo-list').empty();
           response.tasks.forEach(function (task) {

             if (task.completed) {
     $('#todo-list').append('<div class="row toggled-complete"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
   }
   else  {
          $('#todo-list').append('<div class="row toggled-active"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
   }
           });

      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=247',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task-content').val()
        }
      }),
      success: function (response, textStatus) {
         $('#new-task-content').val('');
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var deleteTask = function (id) {
  $.ajax({
 type: 'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=247',
    success: function (response, textStatus) {
      getAndDisplayAllTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

$(document).on('click', '.delete', function () {
 deleteTask($(this).data('id'));
});

  $('#create-task').on('submit', function (e) {
    e.preventDefault();
    createTask();
  });

  $('#toggle-all').on('click', function () {
getAndDisplayAllTasks();
console.log("all");
  });

  $('#toggle-active').on('click', function () {
console.log("active");

$( ".toggled-complete" ).remove();

$.ajax({
  type: 'GET',
  url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=247',
  dataType: 'json',
  success: function (response, textStatus) {
       $('#todo-list').empty();
       response.tasks.forEach(function (task) {

         if (task.completed) {
console.log("completed");
}
else  {
      $('#todo-list').append('<div class="row toggled-active"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
}
       });

  },
  error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);
  }
});



  });

  $('#toggle-completed').on('click', function () {
console.log("complete");
$( ".toggled-active" ).remove();
$.ajax({
  type: 'GET',
  url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=247',
  dataType: 'json',
  success: function (response, textStatus) {
       $('#todo-list').empty();
       response.tasks.forEach(function (task) {

         if (task.completed) {
 $('#todo-list').append('<div class="row toggled-complete"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
}
else  {
    return;
}
       });

  },
  error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);
  }
});
  });

  var markTaskComplete = function (id) {
    $.ajax({
   type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=247',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var markTaskActive = function (id) {
    $.ajax({
   type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=247',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('change', '.mark-complete', function () {
   if (this.checked) {
      markTaskComplete($(this).data('id'));
    } else {
      markTaskActive($(this).data('id'));
    }
  });



  getAndDisplayAllTasks();



});

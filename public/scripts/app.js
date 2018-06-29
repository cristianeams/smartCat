$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
  $("#changes").on("click", function () {
    var input = $("input#name").val();
    var imgUrl = $("input#url").val();
    $("h4").text(input);
    $("#profile_pic").attr("src", imgUrl).modal('hide');
  })

});

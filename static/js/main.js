
$(document).ready(function(){
  console.log("DOCUMENT READY JS");
  $('.saveJob').on('submit', function(ev){
    console.log("SUBMITTING");
    ev.preventDefault();
    // console.log($(ev.target).serialize());

    var element = $(this);
    var url = element.attr('action');
    var formData = element.serialize();
    console.log(url);
    console.log(formData);

    $.ajax({
      method: 'POST',
      url: url,
      data: formData
    }).done(function(data){
      console.log(data);
      console.log("AJAX RUNNING");

      var html = '<div class="alert alert-success" id="success-alert">' + data + '</div>';

      $("#alerts-container").append(html).fadeTo(2000, 500).slideUp(500, function(){
          $("#success-alert").slideUp(500);
      });
    });
  });

  //delete
  $(".deleteJob").on('submit', function(ev){
    ev.preventDefault();
    console.log("Delete just got clicked...");
    var element = $(this);
    var url = element.attr('action');

    $.ajax({
      method: 'DELETE',
      url: url
    }).done(function(data) {
      // get data returned from the DELETE route
      console.log(data);
      // go back to the homepage after deleting anything.
      window.location = '/profile';
    });
  });

});

$(document).ready(function(){});

$('#saveJob').on('submit', function(ev){
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
    window.location= "/profile";

  });
});

  // $.post();

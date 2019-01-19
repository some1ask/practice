/* eslint-disable no-undef */

$(document).ready(function(){

  var flag = true;
  $(".switch-button").on('click',function(e){
    e.preventDefault();
    if(flag){
      flag = false;
      $(".logform").hide();
      $(".regform").show('slow');
    }
    else{
      flag = true;
      $(".logform").show('slow');
      $(".regform").hide();
    }
  })

  $(".register-button").on('click',function(e){
    e.preventDefault();

    var data ={
      login : $("#login-register").val(),
      password: $("#password-register").val(),
      reqPassword: $("#password-register-require").val()
    };
    console.log(data);

    $.ajax({
      type:'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url:'api/auth/register'
    }).done(function(data){
        console.log(data);
    });
  });

});
  /* eslint-unable no-undef */
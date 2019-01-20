/* eslint-disable no-undef */

$(document).ready(function(){
//form swithcer
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


//reg script
$(".register-button").on('click',function(e){
  e.preventDefault();

  var data ={
    login : $("#login-register").val(),
    password: $("#password-register").val(),
    reqPassword: $("#password-register-require").val()
  };
  console.log(data);

  $('input').on('focus',function(){
    $('p.error').remove();
  })

  $.ajax({
    type:'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    url:'api/auth/register'
  }).done(function(data){
      if(!data.ok){
        $('[name = "register_form"').after('<p class="error">' + data.error + '</p>');
      }
      else{
        $('[name = "register_form"').after('<p class="success">Спасибо за регистрацию</p>');
      }
  });
});

//auth script
$(".login-button").on('click',function(e){
  e.preventDefault();

  var data ={
    login : $("#login-login").val(),
    password: $("#password-login").val()
  };
  console.log(data);

  $('input').on('focus',function(){
    $('p.error').remove();
  })

  $.ajax({
    type:'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    url:'api/auth/login'
  }).done(function(data){
      if(!data.ok){
        $('[name = "login_form"').after('<p class="error">' + data.error + '</p>');
      }
      else{
        $('[name = "login_form"').after('<p class="success">Спасибо за регистрацию</p>');
      }
  });
})
});
  /* eslint-unable no-undef */
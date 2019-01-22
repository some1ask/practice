/* eslint-disable no-undef */

//form swithcer
$('p.error').remove();
  var flag = true;
  $(".switch-button").on('click',function(e){
    e.preventDefault();
    $('p.error').remove();
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

  $('input').on('focus',function(){
    $('p.error').remove();
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

 

  $.ajax({
    type:'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    url:'api/auth/register'
  }).done(function(data){
      if(!data.ok){
        $('.register-button').after('<p class="error">' + data.error + '</p>');
        
      }
      else{
       // $('.register-button').after('<p class="success">Спасибо за регистрацию</p>');
        $(location).attr('href','/');
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
        $('.login-button').after('<p class="error">' + data.error + '</p>');
      }
      else{
        // $('.login-button').after('<p class="success">Спасибо за регистрацию</p>');
        $(location).attr('href','/');
      }
  });
})
  /* eslint-unable no-undef */
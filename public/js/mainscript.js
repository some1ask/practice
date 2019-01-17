/* eslint-disable no-undef */

$(document).ready(function(){

  
  });
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
  /* eslint-unable no-undef */
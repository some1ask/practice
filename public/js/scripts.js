/* eslint-disable no-undef*/ $(".login-button").on("click",function(o){o.preventDefault();var r={login:$("#login-login").val(),password:$("#password-login").val()};console.log(r),$("input").on("focus",function(){$("p.error").remove()}),$.ajax({type:"POST",data:JSON.stringify(r),contentType:"application/json",url:"api/auth/login"}).done(function(o){o.ok?$(location).attr("href","/"):$(".login-button").after('<p class="error">'+o.error+"</p>")})}),$(".register-button").on("click",function(o){o.preventDefault();var r={login:$("#login-register").val(),password:$("#password-register").val(),reqPassword:$("#password-register-require").val()};console.log(r),$.ajax({type:"POST",data:JSON.stringify(r),contentType:"application/json",url:"api/auth/register"}).done(function(o){o.ok?$(location).attr("href","/"):$(".register-button").after('<p class="error">'+o.error+"</p>")})}),$(".publish-btn").on("click",function(o){o.preventDefault();var r={title:$("#title").val(),body:$("#body").val()};console.log(r)}),$("p.error").remove();var flag=!0;$(".switch-button").on("click",function(o){o.preventDefault(),$("p.error").remove(),flag?(flag=!1,$(".logform").hide(),$(".regform").show("slow")):(flag=!0,$(".logform").show("slow"),$(".regform").hide())}),$("input").on("focus",function(){$("p.error").remove()}); /* eslint-unable no-undef*/
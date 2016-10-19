$(function () {
   $("#submit-btn").on('click',function () {
        var username=$("#email-input").val();
       if(username!='' && /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(username) ){
           $.post('/regist',{username:username},function (data) {
              console.log(data);
               if(data.status==1){
                   $(".form-box").removeClass('error').addClass('success');
                   $(".message-box").removeClass('error').addClass('success').slideDown(200);
                   $(".message-box .header").html('Thank you very much for your joining!');
                   $(".message-box p").html('Please go to the personal home page to change the password after logging in.');
                   setTimeout(function () {
                       $(".message-box").slideUp(200);
                       window.location.href='/login';
                   },3000);

               }
               if(data.status==3){
                   $(".form-box").removeClass('success').addClass('error');
                   $(".message-box").removeClass('success').addClass('error').slideDown(200);
                   $(".message-box .header").html('E-mail address already exists!');
                   $(".message-box p").html('You need to change a new email or <a href="/login">sign in</a>.');
                   setTimeout(function () {
                       $(".message-box").slideUp(200);
                   },3000);
               }
           })
       }else {
           alert("邮箱格式不正确！")
       }
       // alert(username);
   });

    $('.ui.form')
        .form({
            on: 'blur',
            fields: {
                email: {
                    identifier  : 'email',
                    rules: [
                        {
                            type   : 'email',
                            prompt : 'Please enter a valid e-mail'
                        }
                    ]
                }
            }
        })
    ;
});
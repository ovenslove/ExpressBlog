$(function () {
    var verifiCodeNum;
    function getNum() {
        var str='';
        var wayarr=['+','-','*','/']
        var rand1=Math.floor((Math.random()*30)+2);
        var rand2=Math.floor((Math.random()*30)+2);
        var randway=wayarr[Math.floor((Math.random()*4))];
        if(randway=='+'){
             str=rand1 +'+'+rand2+'=?';
            verifiCodeNum=rand1+rand2;
        }
        if(randway=='-'){
            if(rand1>=rand2){
                 str=rand1 +'-'+rand2+'=?';
                verifiCodeNum=rand1-rand2;
            }else {
                 str=rand2 +'-'+rand1+'=?';
                verifiCodeNum=rand2-rand1;
            }
        }
        if(randway=='*'){
             str=rand1 +'*'+rand2+'=?';
            verifiCodeNum=rand1*rand2;
        }
        if(randway=='/'){
             str=(rand1*rand2) +'/'+rand2+'=?';
            verifiCodeNum=rand1;
        }
        return str;
    }
    /*修改密码容器出现*/
    $(".exchangePassword").on('click',function () {
        $("#verifiCode").text(getNum());
        console.log("11");
        $(".exchangePassword-box").slideToggle(200);
    }) ;
    /*
     判断字符类型
     */
    function CharMode(iN) {
        if (iN >= 48 && iN <= 57) //数字
            return 1;
        if (iN >= 65 && iN <= 90) //大写字母
            return 2;
        if (iN >= 97 && iN <= 122) //小写
            return 4;
        else
            return 8; //特殊字符
    }
    /*
     统计字符类型
     */
    function bitTotal(num) {
        modes = 0;
        for (i = 0; i < 4; i++) {
            if (num & 1) modes++;
            num >>>= 1;
        }
        return modes;
    }
    /*
     返回密码的强度级别
     */
    function checkStrong(sPW) {
        if (sPW.length <= 4)
            return 0; //密码太短
        Modes = 0;
        for (i = 0; i < sPW.length; i++) {
            //测试每一个字符的类别并统计一共有多少种模式.
            Modes |= CharMode(sPW.charCodeAt(i));
        }
        return bitTotal(Modes);
    }

    /*修改密码输入框检测*/
    /*旧密码检测*/
    $(".old-psd").on('input propertychange blur',function () {
        var val=$(this).val();
        if(val != ''){
            $(this).removeClass('error').addClass('success');
        }else {
            $(this).removeClass('success').addClass('error');
        }
        if($(".exchangePassword-box input.success").length==4){
            $("#exchangePassword-cimmit-btn").addClass('commit-active');
        }else {
            $("#exchangePassword-cimmit-btn").removeClass('commit-active');
        }
    });
    /*新密码检测*/
    $(".new-psd1").on('input propertychange blur',function () {
        var val=$(this).val();
        var pv=checkStrong(val);
        if(val != '' && /^.{4,32}$/.test(val) ){
            $(this).removeClass('error').addClass('success');
            $(".complexity1 span").removeClass('active');
            for(var i=1;i<=pv;i++){
                $(".complexity1 span").eq(i-1).addClass('active');
            }
        }else {
            $(this).removeClass('success').addClass('error');
        }

        if($(".exchangePassword-box input.success").length==4){
            $("#exchangePassword-cimmit-btn").addClass('commit-active');
        }else {
            $("#exchangePassword-cimmit-btn").removeClass('commit-active');
        }
    });
    /*新密码2检测*/
    $(".new-psd2").on('input propertychange blur',function () {
        var val=$(this).val();
        var pv=checkStrong(val);
        if(val != '' && val == $(".new-psd1").val()){
            $(this).removeClass('error').addClass('success');
            $(".complexity2 span").removeClass('active');
            for(var i=1;i<=pv;i++){
                $(".complexity2 span").eq(i-1).addClass('active');
            }
        }else {
            $(this).removeClass('success').addClass('error');
        }
        if($(".exchangePassword-box input.success").length==4){
            $("#exchangePassword-cimmit-btn").addClass('commit-active');
        }else {
            $("#exchangePassword-cimmit-btn").removeClass('commit-active');
        }
    });
    /*验证码检测*/
    $("#verifiCodeInput").on('input propertychange blur',function () {
        var val=$(this).val();
        if(val !='' && val==verifiCodeNum){
            $(this).removeClass('error').addClass('success');
        }else {
            $(this).removeClass('success').addClass('error');
        }
        if($(".exchangePassword-box input.success").length==4){
            $("#exchangePassword-cimmit-btn").addClass('commit-active');
        }else {
            $("#exchangePassword-cimmit-btn").removeClass('commit-active');
        }
    });
    /*修改密码输入框密码显示*/
    $(".psd-show").on('mousedown mouseup',function (event) {
        if(event.type=='mousedown'){
            $(this).prev('input').prop('type','text');
        }else if(event.type=='mouseup'){
            $(this).prev('input').prop('type','password');
        }

    });
    /*修改密码确认按钮*/
    $("#exchangePassword-cimmit-btn").on('click',function () {
        $(".exchangePassword-box input").blur();
        if($(this).hasClass('commit-active')){
            var postdata={
                opsd:$(".old-psd").val(),
                npsd1:$(".new-psd1").val(),
                npsd2:$(".new-psd2").val()
            }
            $.post('/home/user/excpsd',postdata,function (data) {
                if(data.status==1){
                    alert(data.message);
                    window.location.href='/home/user'
                }
            });
        }
    });


    $(".exchangeLogo").on('click',function () {
        $("#userLogoPreview-show").slideToggle(200);
        $("#userLogoPreview-container").slideToggle(200);

    });
    $("#verifiCode").on('click',function () {
        $("#verifiCode").text(getNum());
    });
   $(".exchangePassword-box .close-btn").on('click',function () {
       $(".exchangePassword-box").slideUp(200);
   }) ;



    /*用户头像*/
    $("#userLogoPreview-input").on('blur',function () {
       var val=$(this).val();
        $("#userLogoPreview>img").attr('src',val);
        // $("#userlogo-img").slideUp();
        $("#userlogo-img")[0].onload = function() {
            $("#userLogoPreview").slideDown(200);
        }
    });




    var $image = $('#userlogo-img');
    $image.cropper({
        aspectRatio: 16 / 16,
        preview:".userlogo-preview",
        crop: function(e) {
        }
    });
    $(".get-image-data-btn").on('click',function () {
        var imgdata=$image.cropper('getCroppedCanvas',{width:400,height:400}).toDataURL();
        // console.log(imgdata);
        $.post('/home/user/exclogo',{'imgdata':imgdata},function (data) {
            if(data.status === 1){
                window.location.reload();
            }
        });
        // window.open(imgdata);
    });
    //判断浏览器是否支持FileReader接口
    if(typeof FileReader == 'undefined'){
        result.InnerHTML="<p>你的浏览器不支持FileReader接口！</p>";
        //使选择控件不可操作
        file.setAttribute("disabled","disabled");
    }

    $("#put-image-data-input").on('change',function () {
        var file = $(this)[0].files[0];
        if(!/image\/\w+/.test(file.type)){
            alert("看清楚，这个需要图片！");
            return false;
        }
        var reader = new FileReader();
        //将文件以Data URL形式读入页面
        reader.readAsDataURL(file);
        reader.onload=function(e){
            //显示文件
            var data=this.result;
            $image.cropper('replace', data);
        }
    });

    /*基本信息提交*/
    $(".user-info-submit").on('click',function () {
       var postData={
           nickname:$("#nickname-input").val() || '',
           age:$("#age-input").val() || '',
           sex:$("#sex-input").val() || '',
           phoneNumber:$("#phoneNumber-input").val() || '',
           education:$("#education-input").val() || '',
           occupation:$("#occupation-input").val() || '',
           hobbit:$("#hobbit-input").val() || '',
           introduce:$("#introduce-input").val() || ''
       };
       $.post('/home/user/excBaseInfo',postData,function (data) {
          if(data.status===1){
              window.location.reload();
          }else {
              alert("更新失败，请重新提交！")
          }
       });

    });
});
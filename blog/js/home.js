$(function(){
    init();

});

function init(){
    getOneWord();
}
function getOneWord(){
    $.get('/home/oneWord',function(data){
        if(data.status == 1){
            $(".oneWord-container .oneWord-en").html(data.message.en).textillate();
            setTimeout(function () {
                $(".oneWord-container .oneWord-zh").html(data.message.zh).textillate();
            },2000);

        }
    });
}
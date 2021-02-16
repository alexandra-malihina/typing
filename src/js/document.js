
function include(url){
    let script = document.createElement('script');
    script.src ='./src/js/'+ url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

include('play.js');

$( document ).ready(function(){
    $( "body" ).keydown(function( event ){ // задаем функцию при нажатиии любой клавиши клавиатуры на элементе
      console.log( event.which ); // выводим код нажатой клавиши
      play.button_action(event.which);
    });
  });
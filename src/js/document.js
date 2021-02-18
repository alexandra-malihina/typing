
function include(url){
    let script = document.createElement('script');
    script.src ='./src/js/'+ url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

include('play.js');
include('run_string.js');

$( document ).ready(function(){
    $( "body" ).keydown(function( event ){

      play.button_action(event.key);


      if(event.key!="Control" && event.key!="Enter" && event.key!="Escape" && event.key!="CapsLock" && event.key!="Shift" && event.key!="Alt" ){
        let bub=new Bubble(event.key);
      }
      
    });
  });
class Bubble{
  constructor(letter){
    this.letter=letter;
    this.background='rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
    this.x=Math.floor(Math.random()*(document.documentElement.clientWidth-190)+20);

    this.y=0;
    this.context=$("<div class='bub'></div>")
    this.y_speed=Math.floor(Math.random()*2+2);
    this.opacity_speed=0.0001*Math.floor(Math.random()*255+1);
    this.opacity=0.5;
    this.timer_id=null;
    this.set_bub();

  }
  set_bub(){
    this.context.html("<span style='left:"+Math.floor(Math.random()*60+15)+"%;top:"+Math.floor(Math.random()*50+10)+"%'>"+this.letter+"</span>");
    this.context.css('background-color',this.background);
    this.context.css('bottom',this.y+'px');
    this.context.css('left',this.x+'px');
    $("#animations").append(this.context);

    let inst=this;
    this.timer_id = setInterval(() => inst.change(inst), 100);
  }

  change(instance){

    instance.opacity-=instance.opacity_speed;
    instance.context.css('opacity',instance.opacity);
    instance.y+=instance.y_speed;
    instance.context.css('bottom',instance.y);
    if(instance.opacity<=0)
    {
      instance.context.remove();
      clearInterval(instance.timer_id);

    }


  }

}
class Play{
    constructor(){
        this.context=$('#text');
        this.message_context=$('#message');
        this.data={
            error:{
                being:false,
                message:"No errors",
                error:null,
            },
            text:"",
            speed:0,
            accuracy:100,
            current_letter:0,
            text_length:0,
            time:0,
            all_tap:0,
            timer_id:null
        }
        this.start=false;
        this.messages={
            to_start:"Press ENTER to start",
            to_end:"Press ESC to end",
        }
        this.get_new_text();
       
    }
    get_new_text(){
        this.start=false;
        this.data.accuracy=0;
        this.data.speed=0;
        this.data.text_length=0;
        this.data.time=0;
        this.data.all_tap=0;
        this.data.current_letter=0;
        this.data.text="";
        
        let this_play=this;
       $.ajax({
        url:"https://baconipsum.com/api/?type=all-meat&paras=1&start-with-lorem=1&format=json",

        success:function(data){
            if(data){

                this_play.data.text=data[0].replace(/\s+/g,' ').trim();
                this_play.data.text_length=this_play.data.text.length;

                this_play.set_new_text();
            }
            else{
                this_play.set_default_text();
            }

        },
        error: function(jqxhr, status, errorMsg) {
            this_play.set_default_text();
        }
       });
       this.set_block_info();
       this.set_message();
    }

    set_default_text(){
        this.data.text="I am the best and most wonderful person. I'll make it work. And I will be able to type texts very quickly And they will call me - !? * % # - The fastest fingers in the West.".replace(/\s+/g,' ').trim();
        this.data.text_length=this.data.text.length;
        this.run_string("default_text");
        this.set_new_text();
    }
    set_new_text(){
        let this_play=this;
        this_play.context.empty();
       for(let i=0;i<this_play.data.text_length;i++){
           this_play.context.append('<span id="'+i+'">'+this_play.data.text[i]+'</span>');
       }
       this_play.set_point_current_letter();
    }

    set_point_current_letter(ok=true){
        $('.ok, .not_ok').removeClass('ok not_ok');
        if(ok){
            $('#'+this.data.current_letter).toggleClass('ok');
        }
        else{
            $('#'+this.data.current_letter).toggleClass('not_ok');
        }
        this.set_block_info();
    }

    set_speed(){
        $('#speed').html(this.data.speed);
    }
    set_accuracy(){

        if(this.data.all_tap==0){
            this.data.accuracy=100;
        }
        else{
            this.data.accuracy=Math.floor(this.data.current_letter/this.data.all_tap*100);
        }
        $('#accuracy').html(this.data.accuracy);
    }
    set_block_info(){
        this.set_accuracy();
        this.set_speed();
    }
    set_start(start=true){
        this.start=start;
        this.set_message();
        this.set_block_info();
    }
    set_message(){
        
        if (this.start){
            this.message_context.html(this.messages.to_end);
        }
        else{
            this.message_context.html(this.messages.to_start);
        }
    }
    time_block(inst){
        if(inst.start){
           let time=new Date().getTime()-inst.data.time;
           inst.data.speed=Math.floor(inst.data.all_tap/(time/60/1000));
           inst.set_block_info();
        }
    }
    set_time(){
        let inst=this;
        this.data.time=new Date().getTime();
        this.data.timer_id=setInterval(inst.time_block, 500,inst);
        $('time_block').toggleClass('show');
    }
    run_string(mode=""){
        let str="";
        let className="";
        let span=$('#string');
        switch(mode){
            case "good":str=run_string.good[Math.floor(Math.random()*run_string.good.length)]; className="good";break;
            case "bad":str=run_string.bad[Math.floor(Math.random()*run_string.bad.length)]; className="bad";break;
            case "win":str=run_string.win; className="win";break;
            case "CapsLock":str=run_string.CapsLock; className="bad";break;
            case "default_text":str=run_string.no_text; className="bad";break;
            default: str=""; className="bad";break;
        }
        span.attr('class',className);
        span.html(str);
    }


    button_action(button_key){
        if(this.start && button_key=="Escape"){
            this.set_start(false);
            clearInterval(this.data.timer_id);
            this.data.timer_id=null;
            this.get_new_text();
            this.run_string();
            return;
        }
        if(!this.start && button_key=="Enter"){
            this.set_start(true);

            return;
        } 

        if(this.start && this.data.current_letter==this.data.text_length){
            this.get_new_text();
            return;
        }

        if(this.start==true){
            
            if(button_key=="CapsLock"){
                this.run_string("CapsLock");
            }
            if(button_key=="Shift" || button_key=="CapsLock"){
                if((this.data.text[this.data.current_letter].localeCompare(this.data.text[this.data.current_letter].toUpperCase())))
                {
                    this.set_point_current_letter(false);                   
                }
                return;
            }
            this.data.all_tap++;
            if(this.data.all_tap==1){
                this.set_time();
            }
            if(button_key==this.data.text[this.data.current_letter])
            {
                this.data.current_letter++;
                if(this.data.current_letter==this.data.text_length){
                    this.run_string("win");
                    clearInterval(this.data.timer_id);
                    this.data.timer_id=null;
                    return;
                }
                this.set_point_current_letter(true);
                this.run_string("good");
            }
            else{
                this.set_point_current_letter(false);
                this.run_string("bad");

            }
        }
        

        
    }
}
let play = new Play();


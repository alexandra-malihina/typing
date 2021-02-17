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
            to_end:"Press ESC to stop",
        }
        this.get_new_text();
       
    }
    get_new_text(){
        this.start=false;
        this.data.accuracy=0;
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
                console.log(data);
                this_play.data.text=data[0];
                this_play.data.text_length=data[0].length;

                console.log(this_play);
                this_play.set_new_text();
            }
            else{
                //$(this).html("Error");
            }

        }
       });
       this.set_block_info();
       this.set_message();
    }

    set_new_text(){
        let this_play=this;
        this_play.context.empty();
        console.log('set_new_text');
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
        console.log(this.data.all_tap);
        console.log(this.data.current_letter);
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
    time_block(){
        if(this.start){
            $('time_block').toggleClass('show')
        }
    }
    set_time(){

    }

    button_action(button_key){
        if(this.start && button_key=="Escape"){
            this.set_start(false);
            clearInterval(this.data.timer_id);
            this.data.timer_id=null;
            return;
        }
        if(!this.start && button_key=="Enter"){
            this.set_start(true);
            this.data.timer_id = setInterval(this.set_block_info(),100);
            return;
        } 

        if(this.start==true){
            
            if(button_key=="Shift" || button_key=="CapsLock"){
                if((this.data.text[this.data.current_letter].localeCompare(this.data.text[this.data.current_letter].toUpperCase())))
                {
                    this.set_point_current_letter(false);                   
                }
                return;

            }
            this.data.all_tap++;
            if(button_key==this.data.text[this.data.current_letter])
            {
                this.data.current_letter++;
                this.set_point_current_letter(true);
            }
            else{
                this.set_point_current_letter(false);

            }
        }
        

        
    }
}
let play = new Play();

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
        }
        this.start=false;
        this.messages={
            to_start:"Press ENTER to start",
            to_end:"Press ESC to stop",
        }
        this.get_new_text();
       
    }
    get_new_text(){
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
        if(ok){
            $('#'+this.data.current_letter).toggleClass('ok');
        }
        else{
            $('#'+this.data.current_letter).toggleClass('not_ok');
        }
    }

    set_speed(){
        $('#speed').html(this.data.speed+' min');
    }
    set_accuracy(){
        $('#accuracy').html(this.data.accuracy+' %');
    }
    set_block_info(){
        this.set_accuracy();
        this.set_speed();
    }
    set_start(start=true){
        this.start=start;
    }
    set_message(){
        if (this.start){
            this.message_context.html(this.messages.to_end);
        }
        else{
            this.message_context.html(this.messages.to_start);
        }
    }

    button_action(button_code){
        if(this.start && button_code==27){
            this.start=false;
        }
        if(!this.start && button_code==13){
            this.start=true;
        } 


        this.set_message();
    }
}
let play = new Play();

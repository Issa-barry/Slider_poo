class mySliderThumbs extends HTMLElement{
    constructor(){
        super();
        this.timer    = null;
        this.position     = 0;
        this.sources  = [];
    }
    //Un peu comme le constructor
    connectedCallback(){ 
        this.sources  = JSON.parse(document.querySelector("#data").innerHTML);
         this.$preview  =  this.parentNode.querySelector('my-slider-preview img');

         let $ul      = document.createElement('ul');
         $ul.classList.add('slider-thumbs');

         for(let index in this.sources){
             let source = this.sources[index]
            let $li = document.createElement('li');
            let $img = document.createElement('img');
               $img.src = source;
               $img.addEventListener("click", this.choose.bind(this,index))

               $li.appendChild($img);
               $ul.appendChild($li);

         }
         this.appendChild($ul);
         this.$preview.src  = this.sources[this.position];
         this.startTimer();
        //  this.parentNode.querySelector("my-slider-preview img").src = sources[0]
    }//#connectedCallback
        


    choose(index){
        this.stopTimer()
        this.position     = index;
        this.$preview.src = this.sources[this.position];
        this.startTimer()
    }


    stopTimer(){
        clearInterval(this.timer);
        this.timer = null;
    }

  startTimer(){
       if(this.timer) {
           return 
          }
      this.timer =setInterval(() => {
          this.position++;
          if(this.position > this.sources.length - 1){
              this.position = 0;
          }
          this.$preview.src = this.sources[this.position]
      },3000)
   }

 }
 
 //Creer des instance
 customElements.define('my-slider-thumbs', mySliderThumbs)
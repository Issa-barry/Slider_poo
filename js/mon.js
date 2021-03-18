
class Slider{
    constructor($slider){
       this.$slider      = $slider;
       this.$sdContainer = this.$slider.querySelector(".slider-container");
       this.$thumbs      = this.$slider.querySelectorAll(".slider-thumbs img");
       this.$preview     = this.$slider.querySelector(".slider-preview img");
       this.$left        = this.$slider.querySelector(".slider-left");
       this.$right       = this.$slider.querySelector(".slider-right");
       this.$pause       = this.$slider.querySelector(".slider-pause");
       this.$sdNave = this.$slider.querySelector(".slider-nav");

       this.timer    = null;
       this.time     = 2000;
       this.sdnaveTimer = null;
       this.timerNav    = 4000;
       this.sources  = [];
       this.position = 0;

   
       if(this.$slider.dataset.timer){
           this.time = this.$slider.dataset.timer
       }
       if(!this.$preview
           ||this.$left
           ||this.$right
           ||this.$pause
           ||this.$slider
           ||this.$thumbs.length === 0){
               console.error("Il manque des informations pour initialiser le");
           }

       for(let $img of this.$thumbs){
           // Je met les sources d'images dans la collection
           this.sources.push($img.src)
       }
       this.position = this.sources.indexOf(this.$preview.src);
       this.startTimer();
       this.$left.addEventListener('click', this.left.bind(this))
       this.$right.addEventListener('click', this.right.bind(this))
       this.$pause.addEventListener('click', this.pause.bind(this))
       this.$sdContainer.addEventListener('mouseover', this.sdContainer.bind(this))

       
       for(let [index,$img]  of this.$thumbs.entries()){
            $img.addEventListener("click", this.choose.bind(this, index))
       }
       //Ont cache les bouttons du slider
       this.$slider.addEventListener("mousemove", this.hideNav(this) )
    //    this.sdContainer();
    }//#Fin constructeur


/**=================================================================
*                         EVENEMENT DU NAV SLIDER
*=================================================================*/

//METHOD 1
hideNav(){
    console.log("hhelo")
}



//METHOD 2

    sdContainer(){
       this.stopTimerNav()
       if(this.$sdNave.classList.contains("desactiver")){
           this.$sdNave.classList.remove('desactiver')
       }
       this.startTimerNav()
       
    }
    stopTimerNav(){
       clearInterval(this.sdnaveTimer);
       this.sdnaveTimer = null;
   }

   startTimerNav(){
       if(this.sdnaveTimer) {
           return 
          }
      this.sdnaveTimer =setInterval(() => {
       if(!this.$sdNave.classList.contains("desactiver")){
           this.$sdNave.classList.add('desactiver')
       } 
  
      },  this.timerNav)
   }

   
/**=================================================================
*                         EVENEMENT DU  SLIDER
*=================================================================*/
  
   startTimerActiver(){
       if(this.sdnaveTimer) {
           return 
          }
      this.sdnaveTimer =setInterval(() => {
       if(this.$sdNave.classList.contains("desactiver")){
           this.$sdNave.classList.remove('desactiver')
       } 
  
      },  this.timerNav)
   }

    choose(index){
        this.stopTimer()
        this.position     = index;
        this.$preview.src = this.sources[this.position];
        this.startTimer()
    }
   /////////////////////////////////////////////////////////////////////
   left(){
        //**Pour enlever le play css */
        if(this.$pause.classList.contains("play")){
           this.$pause.classList.remove('play')
       }
       //**Code du left */
       this.stopTimer();
       this.position--;
       if(this.position < 0){
           this.position = this.sources.length - 1
       }
       this.$preview.src = this.sources[this.position];
       this.startTimer();
       this.sdContainer();
   }

   right(){
       //**Pour enlever le play css */
       if(this.$pause.classList.contains("play")){
           this.$pause.classList.remove('play')
       }
       //*************** Code du right */
       this.stopTimer();
       this.position++;
       if(this.position > this.sources.length - 1){
           this.position = 0
       }
       this.$preview.src = this.sources[this.position];
       this.startTimer();
       this.sdContainer();
   }
   pause(){
        if(!this.$pause.classList.contains("play")){
            this.stopTimer();
            this.$pause.classList.add('play')
        }else{
             this.$pause.classList.remove("play");
             this.startTimer();
             this.sdContainer();
        }
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
       },this.time)
    }

    static load(selector){
         for(let $slider of document.querySelectorAll(selector)){
             new this($slider)
         }
    }
    
}


Slider.load(".slider");
















































// /* 1)
// //-----------------------------------------------ES5
// var name = "Issa"//context variable
//      world    = "hello"//Global

//      function hello(){
//           var name  = "toto"//context
//                world = "world"//global
//                var test = "test" //Utilisable qu'ici
//      }

//      hello()

// // console.log(name, world)
// // console.log(test)


// //----------------------------------------------ES6
// if(true){
//     let toto  = "toto"
//     var tata  = "tata"//Utilisable en dehor
//     const titi = "titi"
// }

// // console.log(tata)


// // Function dans le js



// // 2) ----------------------variable

// var nul;
// var ok = true
// var age = 20
// var price = 30.14
// var name = "issa"
// var collection = []
// var obj = {}
// var fct = function(){}


// */

// //3)----------------------------POO

// // class Users{
// //     constructor(firstname = null){this.firstname = firstname}
// //     hello(){
// //         console.log("Hello " + this.firstname);
// //     }
// // }

// // var us = new Users("Mariame")
// //  console.log(us.hello())


// //4)---------------------------------SLIDER------------------------------------------------------------------
// /*
// let sliders = document.querySelectorAll(".slider");

// function slid(){
//         for(let $slider of sliders){ //Pour recupere juste la valeur on utilise for avec "of", si on v la cle on utilise "in"
//         // Je creer une variable qui liste tous les images possible à l'interieur qui sera vide 
//         let sources = []
//         // Je boucle pour extraitre du document HTML les #tes source d'image possible
//         for(let img of $slider.querySelectorAll(".slider-thumbs img")){
//             // Je met les sources d'images dans la collection
//             sources.push(img.src)
//         }
//         // Je recupere l'image afficher actuellement
//         let positionDeDepart = sources.indexOf($slider.querySelector(".slider-preview img").src)
    
//         //Tous les 5 seconde j'effectue ma rotation 
//         $slider.timer = setInterval(()=>{
//             positionDeDepart++;
//             if(positionDeDepart > sources.length - 1){
//                 //si c'est le cas je remet le compteur a 0
//                 positionDeDepart = 0;
//             }
//             // Une fois que je connais la future image a charger, je la charge
//             $slider.querySelector(".slider-preview img").src = sources[positionDeDepart];
//         }, 4000)
//     }

// }

// slid()
// */






// //Je recupere tous les slider de mon template
// let sliders = document.querySelectorAll(".slider");

// function slid(){
//         for(let $slider of sliders){ //Pour recupere juste la valeur on utilise for avec "of", si on v la cle on utilise "in"
//         // Je creer une variable qui liste tous les images possible à l'interieur qui sera vide 
//         let sources = []
//         // Je boucle pour extraitre du document HTML les #tes source d'image possible
//         for(let img of $slider.querySelectorAll(".slider-thumbs img")){
//             // Je met les sources d'images dans la collection
//             sources.push(img.src)
//         }
//         // Je recupere l'image afficher actuellement
//         let positionDeDepart = sources.indexOf($slider.querySelector(".slider-preview img").src)
    
//         //Tous les 5 seconde j'effectue ma rotation 
         
//             positionDeDepart++;
//             if(positionDeDepart > sources.length - 1){
//                 //si c'est le cas je remet le compteur a 0
//                 positionDeDepart = 0;
//             }
//             // Une fois que je connais la future image a charger, je la charge
//             $slider.querySelector(".slider-preview img").src = sources[positionDeDepart];
         
//     }

// }

// slid()









// /*/////////////devoire :

//   //AJOUTER UN SYSTEM DE PAUSE 
//  //AOUJTER DES FLECHES POUR AFFICHER L'IMAGE SUIVANTE OU PRECEDENTE
//  //AJOUTER LA POSSIBILITER DE CLIQUER SUR LA MINIATURE POUR AFFICHER L'IMAGE SOUHAITER DIRECTEMENT
// */



// //AOUJTER DES FLECHES POUR AFFICHER L'IMAGE SUIVANTE OU PRECEDENTE

// const myNext =  document.querySelector('.slider-left')
// const myPreced =  document.querySelector(".slider-right")
// const myPause =  document.querySelector(".slider-pause")




// myNext.addEventListener('click', function(){
    
//     for(let $slider of sliders){   
//         let sources = []   
//         for(let img of $slider.querySelectorAll(".slider-thumbs img")){
          
//             sources.push(img.src)
//         }
//         let positionDeDepart = sources.indexOf($slider.querySelector(".slider-preview img").src)
         
//         if(positionDeDepart >= sources.length - 1)
//         {
//             positionDeDepart = 0;
//              $slider.querySelector(".slider-preview img").src = sources[positionDeDepart];
             
//         }else {
//             positionDeDepart++;
//             $slider.querySelector(".slider-preview img").src = sources[positionDeDepart];
             
//         }


//     }
// })

// myPreced.addEventListener('click', function(){
//     for(let $slider of sliders){   
//         let sources = []   
//         for(let img of $slider.querySelectorAll(".slider-thumbs img")){
          
//             sources.push(img.src)
//         }
//         let positionDeDepart = sources.indexOf($slider.querySelector(".slider-preview img").src)
         
//         if(positionDeDepart <= 0)
//         {
//             positionDeDepart = sources.length - 1;
//              $slider.querySelector(".slider-preview img").src = sources[positionDeDepart];
             
//         }else {
//             positionDeDepart--;
//             $slider.querySelector(".slider-preview img").src = sources[positionDeDepart];
             
             
//         }
//     }
// })

// var time = setInterval(slid, 4500);

// function Stop(){
    
//     if (time) {
//       clearInterval(time);
//       time = null;
//     }else  time = setInterval(slid, 2500);
// }

// //AJOUTER UN SYSTEM DE PAUSE 
// myPause.addEventListener('click', function(){
//   Stop();
// });

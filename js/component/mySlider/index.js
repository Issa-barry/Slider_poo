class mySlider extends HTMLElement{
     //Un peu comme le constructor
   connectedCallback(){
       //Creation du shadow pour cloisioner
    this.$shadow = this.attachShadow({mode: 'open'})
    //Pour ajouter le css  <link   rel     = "stylesheet"   href     = "css/style.css">
    //On creer une balise link
   let $link = document.createElement('link');
    $link.rel ="stylesheet";
    $link.type ="text/css";
    $link.href ="css/style.css";


    this.$shadow.appendChild($link);
    this.$shadow.appendChild(document.createElement('my-slider-thumbs'));
    this.$shadow.appendChild(document.createElement('my-slider-nav'));
    this.$shadow.appendChild(document.createElement('my-slider-preview'));
   }
}

//Creer des instance
customElements.define('my-slider', mySlider)
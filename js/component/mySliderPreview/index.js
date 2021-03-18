class mySliderPreview extends HTMLElement{
     //Un peu comme le constructor
    connectedCallback(){ 
      
       this.appendChild(document.createElement('img'));
    }
 }
 
 //Creer des instance
 customElements.define('my-slider-preview', mySliderPreview)
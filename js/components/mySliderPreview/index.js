class mySliderPreview extends HTMLElement {

	connectedCallback(){
		this.appendChild(document.createElement('img'))
	}

}

customElements.define('my-slider-preview', mySliderPreview);
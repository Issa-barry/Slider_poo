class mySlider extends HTMLElement {

	connectedCallback(){
		this.$shadow = this.attachShadow({mode: 'open'})

		let $link      = document.createElement("link");
			$link.rel  = "stylesheet";
			$link.type = "text/css"
			$link.href = "css/style.css";

		this.$shadow.appendChild($link);
		this.$shadow.appendChild(document.createElement('my-slider-nav'));
		this.$shadow.appendChild(document.createElement('my-slider-preview'));
		this.$shadow.appendChild(document.createElement('my-slider-thumbs'));
	}

}

customElements.define('my-slider', mySlider)
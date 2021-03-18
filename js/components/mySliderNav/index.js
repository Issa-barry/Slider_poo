class mySliderNav extends HTMLElement {

	constructor(){
		super();
		this.navTimer = null;
	}

	connectedCallback(){
		this.$left  = document.createElement("div");
		this.$right = document.createElement("div");
		this.$pause = document.createElement("div");
  
		this.$left.classList.add("slider-left");
		this.$pause.classList.add("slider-pause");
		this.$right.classList.add("slider-right");

		this.appendChild(this.$left);
		this.appendChild(this.$pause);
		this.appendChild(this.$right);

		setTimeout(()=> {
			this.$thumbs  = this.parentNode.querySelector('my-slider-thumbs');
			this.$preview = this.parentNode.querySelector('my-slider-preview img');
		},0)

		this.$left.addEventListener("click",this.left.bind(this))
		this.$right.addEventListener("click",this.right.bind(this))
		this.$pause.addEventListener("click",this.pause.bind(this))

		document.addEventListener("mousemove", this.hideNav.bind(this))
	}

	hideNav(){
		this.classList.add("active");

		if(this.navTimer){
			clearTimeout(this.navTimer)
		}

		this.navTimer = setTimeout(() => {
			this.classList.remove("active");
			clearTimeout(this.navTimer)
			this.navTimer = null;
		},3000)
	}

	left(){
		if (this.$pause.classList.contains("play") ){
			this.$pause.classList.remove("play");
		}

		this.$thumbs.stopTimer();
		this.$thumbs.position--;
		if (this.$thumbs.position < 0 ) {
			this.$thumbs.position =  this.$thumbs.sources.length - 1;
		}
		this.$preview.src = this.$thumbs.sources[this.$thumbs.position];
		this.$thumbs.startTimer();
	}

	right(){
		if (this.$pause.classList.contains("play") ){
			this.$pause.classList.remove("play");
		}

		this.$thumbs.stopTimer();
		this.$thumbs.position++;
		if (this.$thumbs.position > this.$thumbs.sources.length - 1 ) {
			this.$thumbs.position = 0;
		}
		this.$preview.src = this.$thumbs.sources[this.$thumbs.position];
		this.$thumbs.startTimer();
	}

	pause(){
		if (!this.$pause.classList.contains("play") ){
			this.$thumbs.stopTimer();
			this.$pause.classList.add("play");
		} else {
			this.$pause.classList.remove("play");
			this.$thumbs.startTimer();
		}
	}


}

customElements.define('my-slider-nav', mySliderNav);
class Slider {

	constructor($slider){
		this.$slider  = $slider;
		this.$thumbs  = this.$slider.querySelectorAll(".slider-thumbs img");
		this.$preview = this.$slider.querySelector(".slider-preview img");
		this.$left    = this.$slider.querySelector(".slider-left");
		this.$right   = this.$slider.querySelector(".slider-right"); 
		this.$pause   = this.$slider.querySelector(".slider-pause");
		this.$nav     = this.$slider.querySelector(".slider-nav");

		this.timer    = null;
		this.navTimer = null;
		this.time     = 5000;
		this.sources  = [];
		this.position = 0;

		if (this.$slider.dataset.timer){
			this.time = this.$slider.dataset.timer
		}

		if (!this.$preview 
		||  !this.$left 
		||  !this.$right 
		||  !this.$pause
		||  !this.$slider
		||   this.$thumbs.length === 0) {
			console.error("Il manque des informations pour initialiser le Slider");
		}

		for (let $img of this.$thumbs){
			this.sources.push($img.src);
		}

		this.position = this.sources.indexOf(this.$preview.src);
		this.startTimer();
		this.$left.addEventListener("click", this.left.bind(this));
		this.$right.addEventListener("click", this.right.bind(this));
		this.$pause.addEventListener("click", this.pause.bind(this));
		for (let [index, $img] of this.$thumbs.entries()) {
			$img.addEventListener("click",this.choose.bind(this,index))
		}

		this.$slider.addEventListener("mousemove", this.hideNav(this) )
	}

	hideNav(){
		this.$nav.classList.add("active");

		if(this.navTimer){
			clearTimeout(this.navTimer)
		}

		this.navTimer = setTimeout(() => {
			this.$nav.classList.remove("active");
			clearTimeout(this.navTimer)
			this.navTimer = null
		},3000)
	}

	choose(index){
		this.stopTimer()
		this.position     = index
		this.$preview.src = this.sources[this.position];
		this.startTimer()
	}

	left(){
		if (this.$pause.classList.contains("play") ){
			this.$pause.classList.remove("play");
		}

		this.stopTimer();
		this.position--;
		if (this.position < 0 ) {
			this.position =  this.sources.length - 1;
		}
		this.$preview.src = this.sources[this.position];
		this.startTimer();
	}

	right(){
		if (this.$pause.classList.contains("play") ){
			this.$pause.classList.remove("play");
		}

		this.stopTimer();
		this.position++;
		if (this.position > this.sources.length - 1 ) {
			this.position = 0;
		}
		this.$preview.src = this.sources[this.position];
		this.startTimer();
	}

	pause(){
		if (!this.$pause.classList.contains("play") ){
			this.stopTimer();
			this.$pause.classList.add("play");
		} else {
			this.$pause.classList.remove("play");
			this.startTimer();
		}
	}

	stopTimer(){
		clearInterval(this.timer);
		this.timer = null
	}

	startTimer(){
		if (this.timer){
			return
		}

		this.timer = setInterval(() => {
			this.position++;
			if (this.position > this.sources.length - 1){
				this.position = 0;
			}
	
			this.$preview.src = this.sources[this.position];
		},  this.time);
	}

	static load(selector){
		for (let $slider of document.querySelectorAll(selector)){
			new this($slider)
		}
	}


}



Slider.load(".slider");





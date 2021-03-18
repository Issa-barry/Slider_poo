
// Je récupères tous les slider de mon template HTML
let sliders = document.querySelectorAll(".slider");

// Sur chaque slider
for( let $slider of sliders){

	// je creer une variable qui listes toutes les images possible a l'intérieur qui sera vide
	$slider.sources = []
	// je boucle pour extraire du document HTML les différentes source d'image possible
	for (let img of $slider.querySelectorAll(".slider-thumbs img")){
		// je met les sources d'images dans la collections
		$slider.sources.push(img.src)
	}

	// je récupère l'image afficher actuellement
	$slider.position = $slider.sources.indexOf($slider.querySelector(".slider-preview img").src)
	// toutes les 5 secondes j'effectue ma rotation
	$slider.timer = setInterval(() => {
		// je part de l'image par défault et j'incrémente pour trouver la prochaine
		$slider.position++;
		// je fait un test de sécurité pour savoir si je dépasse les choix possible
		if ($slider.position > $slider.sources.length - 1){
			// si c'est le cas je remet mon compteur a 0
			$slider.position = 0;
		}

		// une fois que je connais la futur image a charger, je la charge		
		$slider.querySelector(".slider-preview img").src = $slider.sources[$slider.position];
	},5000);

	document.querySelector(".slider-pause").addEventListener("click",(e) => {
		// je regard si l'élément pause a la class play
		// si il ne l'a pas
		if ( !e.target.classList.contains("play") ){
			// je kill le timer
			clearInterval($slider.timer)
			// je lui ajoute la class
			e.target.classList.add("play")
		} else {
			// si il l'a
			// je remove la class play
			e.target.classList.remove("play")
			// je relance le timer
			$slider.timer = setInterval(() => {
				// je part de l'image par défault et j'incrémente pour trouver la prochaine
				$slider.position++;
				// je fait un test de sécurité pour savoir si je dépasse les choix possible
				if ($slider.position > $slider.sources.length - 1){
					// si c'est le cas je remet mon compteur a 0
					$slider.position = 0;
				}

				// une fois que je connais la futur image a charger, je la charge		
				$slider.querySelector(".slider-preview img").src = $slider.sources[$slider.position];
			},5000);
		}

	})

	document.querySelector(".slider-left").addEventListener("click",() => {
		// je kill le timer
		clearInterval($slider.timer)
		// je decale la position du curseur
		$slider.position--
		// je controle si c'est pas inférieur a 0
		if ( $slider.position < 0 ) {
			// si c'est le cas je place le curseur sur le dernier élément du tableau
			$slider.position =  $slider.sources.length - 1
		}
		// je charge l'image souhaiter
		$slider.querySelector(".slider-preview img").src = $slider.sources[$slider.position];
		// je relance le timer
		$slider.timer = setInterval(() => {
			// je part de l'image par défault et j'incrémente pour trouver la prochaine
			$slider.position++;
			// je fait un test de sécurité pour savoir si je dépasse les choix possible
			if ($slider.position > $slider.sources.length - 1){
				// si c'est le cas je remet mon compteur a 0
				$slider.position = 0;
			}
			// une fois que je connais la futur image a charger, je la charge		
			$slider.querySelector(".slider-preview img").src = $slider.sources[$slider.position];
		},5000);
	})

	document.querySelector(".slider-right").addEventListener("click",() => {
		// je kill le timer
		clearInterval($slider.timer)
		// je decale la position du curseur
		$slider.position++
		// je controle si c'est pas inférieur a 0
		if ( $slider.position > $slider.sources.length - 1 ) {
			// si c'est le cas je place le curseur sur le dernier élément du tableau
			$slider.position = 0
		}
		// je charge l'image souhaiter
		$slider.querySelector(".slider-preview img").src = $slider.sources[$slider.position];
		// je relance le timer
		$slider.timer = setInterval(() => {
			// je part de l'image par défault et j'incrémente pour trouver la prochaine
			$slider.position++;
			// je fait un test de sécurité pour savoir si je dépasse les choix possible
			if ($slider.position > $slider.sources.length - 1){
				// si c'est le cas je remet mon compteur a 0
				$slider.position = 0;
			}

			// une fois que je connais la futur image a charger, je la charge		
			$slider.querySelector(".slider-preview img").src = $slider.sources[$slider.position];
		},5000)
	})

	// je récupère toutes les miniatures
	let imgs = document.querySelectorAll(".slider-thumbs img");
	// sur chaque miniatures
	for (let [imgIndex, img] of imgs.entries()) {
		// j'ajoute un ecouteur chaque image
		img.addEventListener("click",() => {
			// je kill le timer
			clearInterval($slider.timer)
			// je charge l'image souhaiter
			$slider.position = imgIndex
			$slider.querySelector(".slider-preview img").src = $slider.sources[$slider.position];
			// je relance le timer
			$slider.timer = setInterval(() => {
				// je part de l'image par défault et j'incrémente pour trouver la prochaine
				$slider.position++;
				// je fait un test de sécurité pour savoir si je dépasse les choix possible
				if ($slider.position > $slider.sources.length - 1){
					// si c'est le cas je remet mon compteur a 0
					$slider.position = 0;
				}

				// une fois que je connais la futur image a charger, je la charge		
				$slider.querySelector(".slider-preview img").src = $slider.sources[$slider.position];
			},5000)
		})
	}

}

// Ajouter un system de pause sur le slider
// Ajouter des fleches pour afficher l'image suivante ou précédente
// Ajouter la possibilité de cliquer sur la miniature pour afficher l'image souhaiter directement











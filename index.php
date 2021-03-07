<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Chateau Des Tours</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400" rel="stylesheet" />    
    <link href="css/all.min.css" rel="stylesheet" />
	  <link href="css/style.css" rel="stylesheet"/>
	  <link href="css2/style2.css" rel="stylesheet"/>
  


</head>
<!--

Chateau Des Tours Index


-->
<body> 
	
	<div class="container">	
		

			<!-- Top box -->
		<!-- Logo & Site Name -->
		<div class="placeholder">
		<div  class="parallax-window" data-parallax="scroll"><video src="img/Chateau des tours.mp4" autoplay loop  muted></video>
				<div class="tm-header">
					<div class="row tm-header-inner">
						<div class="col-md-6 col-12">
						<img src="img/phoenix.png" alt="Logo" class="tm-site-logo"/>
							<div class="tm-site-text-box">
								<h1 class="tm-site-title">Ch&acirc;teau des Tours & Beyond</h1>
								<h6 class="tm-site-description">Entrez et Partagez !</h6>	
							</div>
						</div>
						<nav class="col-md-6 col-12 tm-nav">
							<ul class="tm-nav-ul">
								<li class="tm-nav-li"><a href="index.php" class="tm-nav-link active ">Accueil</a></li>
								<li class="tm-nav-li"><a href="wine.php" class="tm-nav-link ">La cuvée</a></li>
								<li class="tm-nav-li"><a href="contact.php" class="tm-nav-link">Contact</a></li>
							</ul>
						</nav>	
					</div>
				</div>
			</div>
		</div>

		<main>

			<header class="row tm-welcome-section">
				<h2 class="col-12 text-center tm-section-title">Bienvenue sur le site <br><p> Ch&acirc;teau des Tours<p></h2>
				<p class="col-12 text-center">Le Ch&acirc;teau des Tours est un ch&acirc;teau situ&eacute; sur la commune de Montagne<br> dans le d&eacute;partement de la Gironde dans la r&eacute;gion Nouvelle-Aquitaine du sud-ouest de la France .</p>
			</header>

		

			<h2 style="text-align:center">Galerie</h2>

<div class="row">
  <div class="column">
    <img src="img/gallery/Entré.jpg" style="width:100%" onclick="openModal();currentSlide(1)" class="hover-shadow cursor">
  </div>
  <div class="column">
    <img src="img/gallery/GlobalView.jpg" style="width:100%" onclick="openModal();currentSlide(2)" class="hover-shadow cursor">
  </div>
  <div class="column">
    <img src="img/gallery/AerianView.jpg" style="width:100%" onclick="openModal();currentSlide(3)" class="hover-shadow cursor">
  </div>
  <div class="column">
    <img src="img/gallery/Courintérieur.jpg" style="width:100%" onclick="openModal();currentSlide(4)" class="hover-shadow cursor">
  </div>
  <div class="column">
    <img src="img/gallery/Pic1P2.jpg" style="width:100%" onclick="openModal();currentSlide(5)" class="hover-shadow cursor">
  </div>
  <div class="column">
    <img src="img/gallery/Pic2P2.jpg" style="width:100%" onclick="openModal();currentSlide(6)" class="hover-shadow cursor">
  </div>
  <div class="column">
    <img src="img/gallery/Pic3P2.jpg" style="width:100%" onclick="openModal();currentSlide(7)" class="hover-shadow cursor">
  </div>
  <div class="column">
    <img src="img/gallery/Pic4P2.jpg" style="width:100%" onclick="openModal();currentSlide(8)" class="hover-shadow cursor">
  </div>
  <div class="column">
    <img src="img/cripypic.jpg" style="width:100%" onclick="openModal();currentSlide(9)" class="hover-shadow cursor">
  </div>
  <div class="column">
    <img src="img/Perspective2.jpg" style="width:100%" onclick="openModal();currentSlide(10)" class="hover-shadow cursor">
  </div>
  <div class="column">
    <img src="img/Perspective3.jpg" style="width:100%" onclick="openModal();currentSlide(11)" class="hover-shadow cursor">
  </div>
  <div class="column">
    <img src="img/Perspective4.jpg" style="width:100%" onclick="openModal();currentSlide(12)" class="hover-shadow cursor">
  </div>
</div>


<div id="myModal" class="modal">
  <span class="close cursor" onclick="closeModal()">&times;</span>
  <div class="modal-content">

    <div class="mySlides">
      <div class="numbertext">1 / 13</div>
      <img src="img/gallery/Entré.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">2 / 13</div>
      <img src="img/gallery/GlobalView.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">3 / 13</div>
      <img src="img/gallery/AerianView.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">4 / 13</div>
      <img src="img/gallery/Courintérieur.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">5 / 13</div>
      <img src="img/gallery/Pic1P2.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">6 / 13</div>
      <img src="img/gallery/Pic2P2.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">7 / 13</div>
      <img src="img/gallery/Pic3P2.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">8 / 13</div>
      <img src="img/gallery/Pic4P2.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">9 / 13</div>
      <img src="img/cripypic.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">10 / 13</div>
      <img src="img/Perspective2.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">11 / 13</div>
      <img src="img/Perspective3.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">12 / 13</div>
      <img src="img/Perspective4.jpg" style="width:100%">
    </div>
    
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>

    <div class="caption-container">
      <p id="caption"></p>
    </div>


    <div class="column">
      <img class="demo cursor" src="img/gallery/Entré.jpg" style="width:100%" onclick="currentSlide(1)" alt="Galerie">
    </div>
    <div class="column">
      <img class="demo cursor" src="img/gallery/GlobalView.jpg" style="width:100%" onclick="currentSlide(2)" alt="Galerie">
    </div>
    <div class="column">
      <img class="demo cursor" src="img/gallery/AerianView.jpg" style="width:100%" onclick="currentSlide(3)" alt="Galerie">
    </div>
    <div class="column">
      <img class="demo cursor" src="img/gallery/Courintérieur.jpg" style="width:100%" onclick="currentSlide(4)" alt="Galerie">
    </div>
    <div class="column">
      <img class="demo cursor" src="img/gallery/Pic1P2.jpg" style="width:100%" onclick="currentSlide(5)" alt="Galerie">
    </div>
    <div class="column">
      <img class="demo cursor" src="img/gallery/Pic2P2.jpg" style="width:100%" onclick="currentSlide(6)" alt="Galerie">
    </div>
    <div class="column">
      <img class="demo cursor" src="img/gallery/Pic3P2.jpg" style="width:100%" onclick="currentSlide(7)" alt="Galerie">
    </div>
    <div class="column">
      <img class="demo cursor" src="img/gallery/Pic4P2.jpg" style="width:100%" onclick="currentSlide(8)" alt="Galerie">
    </div>
    <div class="column">
      <img class="demo cursor" src="img/cripypic.jpg" style="width:100%" onclick="currentSlide(9)" alt="Galerie">
    </div>
    <div class="column">
      <img class="demo cursor" src="img/Perspective2.jpg" style="width:100%" onclick="currentSlide(10)" alt="Galerie">
    </div>
    <div class="column">
      <img class="demo cursor" src="img/Perspective3.jpg" style="width:100%" onclick="currentSlide(11)" alt="Galerie">
    </div>
    <div class="column">
      <img class="demo cursor" src="img/Perspective4.jpg" style="width:100%" onclick="currentSlide(12)" alt="Galerie">
    </div>
  
  </div>
</div>
		</main>

		<?php include("Footer.php");?>
	</div>

<!--Website Script-->

	<script src="js/jquery.min.js"></script>
	<script src="js/parallax.min.js"></script>
	<script>
	
	</script>
  <script>
    // --------------Script Gallerie---------------//
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}
</script>

		

	

</body>
</html>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "[http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd]">  
<html lang="fr">  
    
	<head>  
	<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Chateau des Tours - Page Contact</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet" />
	<link href="css/all.min.css" rel="stylesheet" />
	<link href="css/style.css" rel="stylesheet" />
	
</head> 

	<body>


	<div class="container">
			<!-- Logo & Site Name -->
			<div class="placeholder">
			 <div  class="parallax-window" data-parallax="scroll"><video src="img/Abandoned castle - France.mp4" autoplay loop  muted></video>
				<div class="tm-header">
					<div class="row tm-header-inner">
						<div class="col-md-6 col-12">
						<img src="img/phoenix.png" alt="Logo" class="tm-site-logo" /> 
							<div class="tm-site-text-box">
								<h1 class="tm-site-title">Ch&acirc;teau des Tours & Beyond</h1>
								<h6 class="tm-site-description">Entrez et Partagez !</h6>	
							</div>
						</div>
						<nav class="col-md-6 col-12 tm-nav">
							<ul class="tm-nav-ul">
								<li class="tm-nav-li"><a href="index.php" class="tm-nav-link">Accueil</a></li>
								<li class="tm-nav-li"><a href="wine.php" class="tm-nav-link">La cuvée</a></li>
								<li class="tm-nav-li"><a href="contact.php" class="tm-nav-link active">Contact</a></li>
							</ul>
						</nav>	
					</div>
				</div>
			</div>
		</div>
		</div>

		<main>
			<header class="row tm-welcome-section">
				<h2 class="col-12 text-center tm-section-title">NOUS CONTACTER</h2>
				<p class="col-12 text-center">Remplissez le formulaire de contact ci-dessous pour nous contacter.</p>
			</header>
           <!---------------Contact form------------------->
		   <div class="container">
        <div class="row">
            <div class="col-lg-6 m-auto">
                <div class="card mt-5">
                    
                    <div class="form-control">
                        <form action="process.php" method="post">
                            <input type="text" name="UName" placeholder="Votre Nom" class="form-control mb-2">
                            <input type="email" name="Email" placeholder="E-mail" class="form-control mb-2">
                            <input type="text" name="Subject" placeholder="Objet" class="form-control mb-2">
                            <textarea name="msg" class="form-control mb-2" placeholder=" Un Message à faire passer ? "></textarea>
                            <button class="btn btn-success" name="btn-send">Envoyer</button>
                        </form>
						 <!--Message envoyé ou non ?-->

						 <div class="card-title">
                        <h2 class="text-center py-2"></h2>
                        <hr>
                        <?php 
                            $Msg = "";
                            if(isset($_GET['error']))
                            {
                                $Msg = " Remplissez les champs correspondants ";
                                echo '<div class="alert alert-danger">'.$Msg.'</div>';
                            }

                            if(isset($_GET['success']))
                            {
                                $Msg = " Votre message à été envoyé ";
                                echo '<div class="alert alert-success">'.$Msg.'</div>';
                            }
                        
                        ?>
                    </div>

					 <!-- fin Message envoyé ou non ?-->

                    </div>
                </div>
            </div>
        </div>
    </div>

                 <!--------------- END Contact form--------------->	

					<div class="col-md-6">
						<div class="tm-address-box">
							<h4 class="tm-info-title tm-text-success">Notre Adresse</h4>
							<address>
							Lieu Ch&acirc;teau des Tours<br>33570 MONTAGNE
							</address>
							<a href="tel:05 57 26 26 66" class="tm-contact-link">
								<i class="fas fa-phone tm-contact-icon"></i>tel: 05-57-26-26-66
							</a>
							<a href="mailto:divin@divin-sa.fr" class="tm-contact-link">
								<i class="fas fa-envelope tm-contact-icon"></i>divin@divin-sa.fr 
							</a>
							<div class="tm-contact-social">
								<a href="https://www.facebook.com/groups/285217252702/?notif_id=1613860026304927&notif_t=group_r2j_approved&ref=notif" class="tm-social-link"><i class="fab fa-facebook tm-social-icon"></i>
							</a>
								
							</div>
						</div>
					</div>
				</div>
			</div>
            
<!-- How to change your own map point
	1. Go to Google Maps
	2. Click on your location point
	3. Click "Share" and choose "Embed map" tab
	4. Copy only URL and paste it within the src="" field below
-->
			<div class="tm-container-inner-2 tm-map-section">
				<div class="row">
					<div class="col-12">
						<div class="tm-map">
						<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11299.373257691683!2d-0.11916692711384891!3d44.92652179866177!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5736689e4795e4ba!2sCh%C3%A2teau%20des%20Tours!5e0!3m2!1sen!2sfr!4v1613933224382!5m2!1sen!2sfr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
						</div>
					</div>
				</div>
			</div>
			<div class="tm-container-inner-2 tm-info-section">
				<div class="row">
					<!-- FAQ -->
					<div class="col-12 tm-faq">
						<h2 class="text-center tm-section-title">FAQ</h2>
						<p class="text-center">Toutes les r&eacute;ponses &agrave; vos questions sur le Ch&acirc;teau Des Tours.</p>
						<div class="tm-accordion">
							<button class="accordion">1. Peut-on le visiter?</button>
							<div class="panel">
							  <p>Non, sauf demande au propri&eacute;taire</p>
							</div>
							
							<button class="accordion">2. Peut-on acheter du vin?</button>
							<div class="panel">
							  <p>Oui surement en direct &agrave; la propri&eacute;t&eacute;</p>
							</div>
							
							<button class="accordion">3. Pour toutes questions suppl&eacute;mentaires?</button>
							<div class="panel">
							  <p>Remplissez le formulaire ou <a href="mailto:divin@divin-sa.fr" class="tm-contact-link">contactez-nous directement</a></p>
							</div>

							<button class="accordion">4. Vous voulez faire partie du mouvement<br>&nbsp;&nbsp;&nbsp;&nbsp;Sauvons le Ch&acirc;teau des Tours ?</button>
							<div class="panel">
							  <p>Rendez-vous sur le groupe facebook <a style="color:#80bdff;" href="https://www.facebook.com/groups/285217252702/?multi_permalinks=10157932820737703%2C10157932787617703&notif_id=1614249863669716&notif_t=group_activity&ref=notif" target="_blank">Sauvons le Ch&acirc;teau des Tours!</a></p>
							</div>
							
	
								<p style="text-align:center;">Merci de votre visite.<br>Au plaisir de vous revoir !!</p>
							</div>
						</div>	
					</div>
				</div>
			</div>
		</main>

		<?php include("Footer.php") ;?>
	</div>
	<script src="js/jquery.min.js"></script>
	<script src="js/parallax.min.js"></script>
	<script>
		$(document).ready(function(){
			var acc = document.getElementsByClassName("accordion");
			var i;
			
			for (i = 0; i < acc.length; i++) {
			  acc[i].addEventListener("click", function() {
			    this.classList.toggle("active");
			    var panel = this.nextElementSibling;
			    if (panel.style.maxHeight) {
			      panel.style.maxHeight = null;
			    } else {
			      panel.style.maxHeight = panel.scrollHeight + "px";
			    }
			  });
			}	
		});
	</script>
	
	</body>
</html>
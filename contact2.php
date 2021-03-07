<!DOCTYPE html>
<html lang="fr">
<?php 
$message_sent =false;
//Conditions if values are right then it can run
if (isset($_POST['name'])&& $_POST[submit] != ''){
 
	


 //sets Values
$UserName = $_POST['name'];
$user_email = $_POST ['email'];
$messaggeSubject = $_POST ['subject'];
$message = $_POST ['message'];

 //concatenation
$email_from = "noreply@avinashkr.com";
$email_subject = "new Form submission";
$email_body = "name: $UserName.\n".
			  "email Id: $user_email\n".
			  "User Message:$user_message.\n";

$to_email = "rbeloncle@gmail.com";
$headers = "from: $email_from\r\n";
$headers = "Reply-to $user_email\r\n";

	$response = file_get_contents($url);
	$response = json_decode($response);

	if ($response -> success){
		mail($to_email,$email_subject,$email_body,$headers);
		echo "Message sent";

	}else

	{
		echo"invalid Email,please try again";
	}

}



 ?>

<head>
	<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Chateau des Tours - Page Contact</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet" />
	<link href="css/all.min.css" rel="stylesheet" />
	<link href="css/style.css" rel="stylesheet" />
	

	
	



</head>
<!--

Simple House

https://templatemo.com/tm-539-simple-house

-->
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
        <form action="contact.php" method="POST" class="form" action="<?php echo( $_SERVER['REQUEST_URI'] ); ?>">
            <div class="form-group">
                <label for="name" class="form-label">Votre Nom</label>
                <input  type="text" class="form-control" id="name" name="name" placeholder="Jon Doe" tabindex="1"  value="<?php echo ($form); ?>"/>
            </div>
            <div class="form-group">
                <label for="email" class="form-label">Votre e-mail</label>
                <input type="email" class="form-control" id="email" name="email" placeholder="jon@doe.com" tabindex="2"  value="<?php echo ( $from) ; ?>"/>
            </div>
            <div class="form-group">
                <label for="subject" class="form-label">Objet</label>
                <input type="text" class="form-control" id="subject" name="subject" placeholder="C'est à quel sujet ? " tabindex="3" value="<?php echo ($objet); ?>" />
            </div>
            <div class="form-group">
                <label for="message" class="form-label">Entrez votre message</label>
                <textarea class="form-control" rows="5" cols="50" id="message" name="message" placeholder="Remplissez pas trop ^^!" tabindex="4"><?php echo ($message); ?></textarea>
            </div>
            <div>
                <button type="submit" class="btn">Envoy&eacute;</button>
            </div>
        </form>
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
								<a href="https://www.facebook.com/groups/285217252702/?notif_id=1613860026304927&notif_t=group_r2j_approved&ref=notif" class="tm-social-link"><i class="fab fa-facebook tm-social-icon"></i></a>
								
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
							  <p>Remplissez le formulaire ou <a href="mailto:divin@divin-sa.fr" class="tm-contact-link">contactez-nous directement.</p>
							</div>
							
	
								<p style="margin-left:150px;">Merci de votre visite. Au plaisir de vous revoir !!</p>
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
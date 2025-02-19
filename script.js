function calculerAge(date) {
	const aujourdHui = new Date();
	let age = aujourdHui.getFullYear() - date.getFullYear();
	const moisDiff = aujourdHui.getMonth() - date.getMonth();
	if (
		moisDiff < 0 ||
		(moisDiff === 0 && aujourdHui.getDate() < date.getDate())
	) {
		age--;
	}
	return age;
}
function afficherRecapitulatif(donnees) {
	const recapitulatif = document.getElementById("recapitulatif");
	recapitulatif.innerHTML = `
    <p><strong>Nom:</strong> ${donnees.nom}</p>
    <p><strong>Prénom:</strong> ${donnees.prenom}
    <p><strong>Date de naissance:</strong> ${donnees.date}</p>
    <p><strong>Téléphone:</strong> ${donnees.telephone}</p>
    <p><strong>Motivation:</strong> ${donnees.motivation}</p>
    `;

	document.getElementById("resultat").classList.remove("hidden");
	//Réinitialisation du formulaire
	document.getElementById("inscription").reset();
	document.getElementById("compteur").textContent = "0 caractères";
}

function showCustomAlert(message) {
	const alert = document.createElement("div");
	alert.className = "custom-alert";
	alert.textContent = message;
	document.body.appendChild(alert);
}

document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("inscription");
	const motivation = document.getElementById("motivation");
	const compteur = document.getElementById("compteur");

	//Mise à jour du compteur
	motivation.addEventListener("input", function () {
		const count = motivation.value.length;
		compteur.textContent = `${count} caractères`;
	});

	form.addEventListener("submit", function (e) {
		e.preventDefault();

		//Recuperation  de valeurs
		const nom = document.getElementById("nom").value;
		const prenom = document.getElementById("prenom").value;
		const date = new Date(document.getElementById("date").value);
		const telephone = document.getElementById("telephone").value;
		const motivationText = motivation.value;

		//Vaidation de l'âge
		const age = calculerAge(date);
		if (age < 18) {
			showCustomAlert("Vous devez avoir au moins 18 ans pour vous inscrire.");
			return;
		}
		//Validation du numero
		if (!telephone.match(/^01\d{8}$/)) {
			showCustomAlert(
				"Le numéro de téléphone doit commencer par 01 et contenir 10 chiffres."
			);
			return;
		}

		//validation de la motivation
		if (motivationText.length < 1000) {
			showCustomAlert("Votre motivation doit faire au moins 1000 caractères.");
			return;
		}
		if (motivationText.length > 2500) {
			showCustomAlert("Votre motivation ne doit pas dépasser 2500 caractères.");
			return;
		}
		//Affichage du recapulatif
		afficherRecapitulatif({
			nom,
			prenom,
			date: date.toLocaleDateString("fr-FR"),
			telephone,
			motivation: motivationText,
		});
	});
});

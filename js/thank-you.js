thankYou();
function thankYou() {
	if (localStorage.getItem("user_order") != null) {
		// It checks if user's order is not null
		let user_order = JSON.parse(localStorage.getItem("user_order")); // Then, get this one and with a .parse to use it
		document.getElementById("order_name").innerHTML =
			user_order.contact.firstName + " " + user_order.contact.lastName;
		document.getElementById("order_id").innerHTML = user_order.orderId;
		localStorage.removeItem("user_order");
	} else {
		// Or it returns an error to the user
		document.getElementById(
			"message"
		).innerHTML = `<div class="card-panel red darken-3 white-text">Vous n'avez passé aucune commande.</div>`;
	}
}

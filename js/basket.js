const API_URL = `http://localhost:3000/api/teddies/`;
let products = [];
let contact;
let user_basket = JSON.parse(localStorage.getItem("user_basket")) || [];

buyingProcess();
confirmOrder();

function checkBasket() {
	let basket_content = JSON.parse(localStorage.getItem("user_basket")); // parse item

	if (
		basket_content == "" ||
		basket_content == null ||
		basket_content == [] ||
		basket_content.length < 1
	) {
		// Check if items is  null or empty
		document.getElementById(
			"form_message"
		).innerHTML = `<div class="card-panel orange darken-3 white-text">Votre panier est vide... Merci de refaire celui-ci.</div>`;
		return false;
	} else {
		// parse item and for each product, push in
		JSON.parse(localStorage.getItem("user_basket")).forEach((product) =>
			products.push(product._id)
		);
		return true;
	}
}

function removeBasket(id) {
	// Remove a product with its id
	document.getElementById("produit" + id).remove();
	user_basket.splice(id, 1);
	localStorage.clear();
	localStorage.setItem("user_basket", JSON.stringify(user_basket));
	window.location.reload();
}

function checkFormInputs() {
	// Checks that all data is valid to be send
	let first_name = document.getElementById("first_name").value;
	let last_name = document.getElementById("last_name").value;
	let email = document.getElementById("email").value;
	let address = document.getElementById("address").value;
	let city = document.getElementById("city").value;

	let message_error = "";

	let check_input_string = /[a-zA-Z]/;
	let check_input_number = /[0-9]/;
	let check_input_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	let check_special_characters = /^[!@#\$%\^\&*\)\(+=._-]+$/;

	if (
		!check_input_string.test(first_name) ||
		check_input_number.test(first_name) ||
		check_special_characters.test(first_name) ||
		first_name == ""
	)
		message_error = "Le prénom doit uniquement contenir des lettres.";

	if (
		!check_input_string.test(last_name) ||
		check_input_number.test(last_name) ||
		check_special_characters.test(last_name) ||
		last_name == ""
	)
		message_error += `${message_error}\nLe prénom doit uniquement contenir des lettres.`;

	if (!check_input_email.test(email))
		message_error += `${message_error}\nL'adresse email n'est pas valide.`;

	if (check_special_characters.test(address) || address == "")
		message_error += `${message_error}\nL'adresse doit uniquement contenir des chiffres et des lettres.`;

	if (check_special_characters.test(city) || check_input_number.test(city) || city == "")
		message_error += `${message_error}\nLa ville doit uniquement contenir des lettres.`;

	if (message_error !== "") {
		document.getElementById(
			"form_message"
		).innerHTML = `<div class="card-panel red darken-3 white-text">
        ${message_error}
        </div>`;
	} else {
		contact = {
			firstName: first_name,
			lastName: last_name,
			email: email,
			address: address,
			city: city,
		};
		return contact;
	}
}

function buyingProcess() {
	// Create an array with all data
	if (JSON.parse(localStorage.getItem("user_basket")).length > 0) {
		let table = document.createElement("table");
		let table_line = document.createElement("tr");
		let table_line_total = document.createElement("tr");
		let table_column_name = document.createElement("th");
		let table_column_price_unitary = document.createElement("th");
		let table_column_total = document.createElement("th");
		let table_column_price_paid = document.createElement("td");
		let = document.getElementById("basket");
		let i = 0;

		basket.appendChild(table);
		table.appendChild(table_line);
		table_line.appendChild(table_column_name);
		table_column_name.textContent = "Produit";
		table_line.appendChild(table_column_price_unitary);
		table_column_price_unitary.textContent = "Prix";

		JSON.parse(localStorage.getItem("user_basket")).forEach((product) => {
			let product_line = document.createElement("tr");
			let product_name = document.createElement("td");
			let product_price_unitary = document.createElement("td");
			let product_remove = document.createElement("button");

			product_line.setAttribute("id", "produit" + i);
			product_remove.setAttribute("id", i);
			product_remove.setAttribute("class", "btn waves-effect red darken-2");
			product_remove.setAttribute("onclick", `removeBasket(${i});`);
			product_remove.textContent = "Supprimer";
			i++;

			table.appendChild(product_line);
			product_line.appendChild(product_name);
			product_line.appendChild(product_price_unitary);
			product_line.appendChild(product_remove);

			product_name.innerHTML = product.name;
			product_price_unitary.textContent = product.price / 100 + "€";
		});

		table.appendChild(table_line_total);
		table_line_total.appendChild(table_column_total);
		table_column_total.textContent = "Total";
		table_line_total.appendChild(table_column_price_paid);
		table_column_price_paid.setAttribute("id", "total_sum");

		let total_paid = 0;
		JSON.parse(localStorage.getItem("user_basket")).forEach((product) => {
			total_paid += product.price / 100;
		});

		document.getElementById("total_sum").textContent = total_paid + "€";
	}
}

function confirmOrder() {
	// Confirm the order with some functions and send it with fetch POST, create an item user_order with infos on the user and all products of his basket !
	let confirm_order = document.getElementById("confirm_order");
	confirm_order.addEventListener("click", function (event) {
		event.preventDefault();
		if (checkBasket() == true && checkFormInputs() != null) {
			let order = {
				contact,
				products,
			};

			let order_request = JSON.stringify(order);
			fetch(API_URL + "order", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: order_request,
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					localStorage.setItem("user_order", JSON.stringify(data));
					contact = {};
					products = [];
					localStorage.removeItem("user_basket");
					setTimeout(function () {
						window.location = "../thank-you.html";
					}, 300);
				});
		}
	});
}

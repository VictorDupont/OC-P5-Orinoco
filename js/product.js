const API_URL = `http://localhost:3000/api/teddies/`;

// addBasket();

product_id = location.search.substring(4); // Get id with removal of ?id=

fetch(API_URL + product_id) // fetch API to get data of a product
	.then((response) => response.json()) // transform the response in json
	.then((data) => {
		informationsOnProduct(data); // use the data to execute the function
		addBasket(data); // use the data to execute the function
	});

function informationsOnProduct(product) {
	// Function displays informations about a teddy like image, name, description and price
	document.getElementById("product_informations").innerHTML += `
    <div class="row">
    <div class="col l6 s12">
        <img class="responsive-img" src="${product.imageUrl}">
    </div>
    <div class="col s12 l6" id="product_part2">
        <h4 class="product-title">Nom : ${product.name}</h3>
        <h5 class="product-description">Description : ${product.description}</h4>
        <h6 class="product-price">Prix : ${product.price / 100}€</h6>
        <select name="option" id="variation">
            <option value="">Choisir la variation</option>
        </select>
        <a class="waves-effect waves-light btn-large purple" id="add_to_basket">Ajouter au panier</a>
    </div>
    </div>
    `; // (price is divided by 100 to get the price in EUR)

	console.log(product_informations);

	product.colors.forEach((option) => {
		// for each variation color of a teddy, create an option in the select
		let product_option = document.createElement("option");
		let select_variation = document.getElementById("variation");
		select_variation.style.display = "block";
		select_variation.appendChild(product_option).innerHTML = option;
	});
}

function addBasket(product) {
	let product_buy = document.getElementById("add_to_basket");
	let product_added = document.getElementById("added_to_basket");

	product_buy.addEventListener("click", function () {
		// On click on the button to add to basket, execute the function
		let user_basket = JSON.parse(localStorage.getItem("user_basket")) || []; // Get user_basket otherwise variable is an empty array
		user_basket.push(product); // Add the teddy to localStorage
		localStorage.setItem("user_basket", JSON.stringify(user_basket)); // Set user_basket with the new one

		product_added.innerHTML = `<div class="card-panel green darken-3 white-text">
        Le produit a été ajouté à votre panier!
        </div>`;
	});
}

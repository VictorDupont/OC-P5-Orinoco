/* Prepare API to get all teddies! */

const API_URL = `http://localhost:3000/api/teddies/`; // Teddies, cameras or furniture
let product_id = "";
let basket_initialization = [];

/*************************************************/
/* Basket */ // If item in the localStorage doesn't exist, then we create it with an empty array

if (!localStorage.getItem("user_basket"))
	localStorage.setItem("user_basket", JSON.stringify(basket_initialization));

/*************************************************/
displayAllProducts();
// Utiliser fetch();
function getAllProducts() {
	// Get all teddies
	return new Promise((resolve) => {
		let request = new XMLHttpRequest(); // New XMLHttpRequest

		request.onreadystatechange = function () {
			// When the request state changes
			if (this.readyState == XMLHttpRequest.DONE && this.status == 200)
				// When the request is done, then we continue
				resolve(JSON.parse(this.responseText)); // Parse the response
		};
		request.open("GET", API_URL + product_id); // New GET request with API URL
		request.send(); // Send the request
	});
}

async function displayAllProducts() {
	const get_products = await getAllProducts(); // Wait to get API infos
	let products_list = document.getElementById("products");

	get_products.forEach((product) => {
		// For each teddy, it displays its id, image, name and price (divided by 100 to get it in EUR)
		products_list.innerHTML += `
			<div class="col s12 m6">
			<a href="product.html?id=${product._id}">
				<div class="card">
    				<div class="card-image waves-effect waves-block waves-light">
      					<img class="activator" src="${product.imageUrl}">
    				</div>
    				<div class="card-content">
      					<span class="card-title activator grey-text text-darken-4">${product.name} - ${
			product.price / 100
		}€</span>
    				</div>
  				</div></a>
  			</div>
			`;
	});
}

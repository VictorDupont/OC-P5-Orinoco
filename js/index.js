/* Prepare API to get all teddies! */

const API_URL = `http://localhost:3000/api/teddies/`; // Teddies, cameras or furniture
let product_id = "";
let basket_initialization = [];

/*************************************************/
/* Basket */

if (!localStorage.getItem("user_basket"))
	localStorage.setItem("user_basket", JSON.stringify(basket_initialization));

/*************************************************/
displayAllProducts();
// Utiliser fetch();
function getAllProducts() {
	return new Promise((resolve) => {
		let request = new XMLHttpRequest();

		request.onreadystatechange = function () {
			if (this.readyState == XMLHttpRequest.DONE && this.status == 200)
				resolve(JSON.parse(this.responseText));
		};
		request.open("GET", API_URL + product_id);
		request.send();
	});
}

async function displayAllProducts() {
	const get_products = await getAllProducts();
	let products_list = document.getElementById("products");

	get_products.forEach((product) => {
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

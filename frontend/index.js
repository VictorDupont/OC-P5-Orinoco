let content = document.getElementById("content");

fetch("http://localhost:3000/api/teddies") // Fetch all teddies in the api
	.then((response) => response.json()) // Transform the response in json
	.then((json) => {
		console.log("Teddies " + json[0].colors[3]);
		json.forEach((element) => {
			content.innerHTML += `
			<div class="col s3">
				<div class="card">
    				<div class="card-image waves-effect waves-block waves-light">
      					<img class="activator" src="${element.imageUrl}">
    				</div>
    				<div class="card-content">
      					<span class="card-title activator grey-text text-darken-4">${element.name} - ${
				element.price / 100
			}€<i class="material-icons right">more_vert</i></span>
      					<p><a href="product.html?id=${element._id}">Page du produit</a></p>
    				</div>
    				<div class="card-reveal">
      					<span class="card-title grey-text text-darken-4">${
							element.name
						}<i class="material-icons right">close</i></span>
      					<p>
						  <span>Couleurs disponibles : ${element.colors}</span><br/><br/>
						  <span>Description : ${element.description}</span>
						</p>
    				</div>
  				</div>
  			</div>
			`;
		});
	}); // Display the result

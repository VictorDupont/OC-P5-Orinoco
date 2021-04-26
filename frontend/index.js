fetch("http://localhost:3000/api/teddies") // Fetch all teddies in the api
	.then((response) => response.json()) // Transform the response in json
	.then((json) => console.log("Teddies " + json[0].colors[3])); // Display the result

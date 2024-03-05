
async function getData() {
	try {
		await fetch(`http://api.valantis.store:40000/`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json', 
				'X-Auth': 'd6d2e7f7df174fbd03e83b5abe40eeff'
			},
			body: JSON.stringify({ 
				"action": "get_ids",
				"params": {"offset": 1, "limit": 10}})
		})
		.then(response => response.json().then(results => 
			{let data = results
					if (data !== undefined) {
							console.log(data.result)
							return data.result
					}
			}))
	} catch (error) {
		console.log(error.message);
	}
}
getData();

const name = document.getElementById('name')
const password = document.getElementById('password')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')

form.addEventListener('submit', (e) => {
	let messages = []
	if (name.value === '' || name.value == null) {
		messages.push('Name is required')
	}

	if (password.value.length <= 6) {
		messages.push('Password must be longer than 6 characters')
	}

	if (password.value.length >= 20) {
		messages.push('Password must be less than 20 characters')
	}

	if (password.value=== name) {
		messages.push('Password cannot be the name')
	}



	if (messages.length > 0) {
		e.preventDefault()
		errorElement.innerText = messages.join(', ')
	}
	else {
		e.preventDefault()
		$.post('http://localhost:8080/login', { name: document.getElementById("name"), password: document.getElementById("password") }, function (returnedData) {
			console.log(data.mail + " " + data.password);
			if (returnedData == "OK") {
				$("#links").load("links.html");
				$("#page").load("adsPage.html");
				adds();
			}
			else ("User Does Not Exist.");
		});	}

	
	
})
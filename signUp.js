const name = document.getElementById('name')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
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

	if (password.value === name) {
		messages.push('Password cannot be the name')
	}

	if (password.value != password2.value) {
		messages.push('The passwords are not equal')
    }

	if (messages.length > 0) {
		e.preventDefault()
		errorElement.innerText = messages.join(', ')
	}
	else {
		e.preventDefault()
		
	}



})
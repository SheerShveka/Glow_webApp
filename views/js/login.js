const username = document.getElementById('username');
const password = document.getElementById('password');
const errorElement = document.getElementById('error');

$('#submit').click(function () {
	let messages = [];
	if (username.value === '' || username.value == null) {
		messages.push('Username is required');
	}
	if (password.value.length <= 6) {
		messages.push('Password must be longer than 6 characters');
	}
	if (password.value.length >= 20) {
		messages.push('Password must be less than 20 characters');
	}
	if (password.value === username) {
		messages.push('Password cannot be the username');
	}
	if (messages.length > 0) {
		errorElement.innerText = messages.join(', ');
		return;
	}
	else {
		$.ajax({
			type: 'post', 
			url: '/login', 
			data: JSON.stringify({
				username: username.value, 
				password: password.value,
			}),
			dataType: 'json',
			contentType : 'application/json',
			success: function (data) {
				window.location.href = 'http://localhost:3000/index';
			},
			error: function(err) {
				errorElement.innerText = err;
				console.log(err);
				return;
			}
		});
	}
}); 
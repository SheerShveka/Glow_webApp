const form = document.getElementById("newPost");
const posts = document.getElementById("your-posts");
const imageSource = document.getElementById("img-src");
const description = document.getElementById("description");
const category = document.getElementById("category");
const blush = document.getElementById("blush");

$('#add-post-button').click(function () {
	form.hidden = false;
})

$('#postBtn').click(function () {
	$.ajax({
		type: 'post',
		url: '/newPost',
		data: JSON.stringify({
			imageSource: imageSource.value,
			description: description.value,
			category: category.value
		}),
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {
			form.hidden = true;
			blush.hidden = false;
		},
		error: function (err) {
			console.log(err);
			return;
		}
	});
});

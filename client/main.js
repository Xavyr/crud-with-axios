$(document).ready(function () {
	console.log('main connected');
	console.log('axios working?', axios);

//action for the findOne button
	document.getElementById('find-one').addEventListener("click", function (event){
		console.log('axios');
		let thing1 = document.getElementById('thing1').value;
		let thing2 = document.getElementById('thing2').value;

		axios({
			method: 'post',
			url: 'http://localhost:3000/findOne',
			data: {
				thing1: thing1,
				thing2: thing2
			}
		}).then(function(response) {
			let p = document.createElement('p');
			p.innerHTML = `thing1 is ${response.data.thing1} and thing2 is ${response.data.thing2}`;
			document.getElementById('data').appendChild(p);
		});


		event.preventDefault();
	});

//action for the findAll button
	document.getElementById('find-all').addEventListener("click", function (event){
		axios.get('/findAll')
			.then(function (response) {
				console.log(response);
				response.data.forEach(function (obj, index){
					let p = document.createElement("p");
					p.innerHTML = `thing1 is ${obj.thing1} and thing2 is ${obj.thing2}`;
					p.setAttribute("id", index);
					document.getElementById('data').appendChild(p);
				});
			})
			.catch(function (error) {
				console.log(error);
			});


		event.preventDefault();
	});

	document.getElementById('delete')


//action for the delete button
	document.getElementById('delete').addEventListener("click", function (event){
		let thing1 = document.getElementById('thing1').value;
		let thing2 = document.getElementById('thing2').value;

		axios.delete('/removeOne',{
			data: {thing1, thing2},
		});

		event.preventDefault();
	});

//action for the insert-one button
	document.getElementById('insert-one').addEventListener("click", function (event){
		let thing1 = document.getElementById('thing1').value;
		let thing2 = document.getElementById('thing2').value;
		axios.post('/insertOne', {
			thing1, thing2
		})
			.then(function (response) {
				let p = document.createElement('p');
				p.innerHTML = `thing 1 is ${response.data.thing1} and thing2 is ${response.data.thing2}`;
				document.getElementById('data').appendChild(p);
			})
			.catch(function (error) {
				console.log(error);
			});


		event.preventDefault();
	});

//action for the update-one button
	document.getElementById('update-one').addEventListener("click", function (event){
		let thing1 = document.getElementById('thing1').value;
		let thing2 = document.getElementById('thing2').value;
		let newValueForThing1 = document.getElementById('newValue').value;


		axios({
			method:'put',
			url:'/updateOne',
			data: {
				thing1,
				thing2,
				newValueForThing1
			}
		})
			.then(function(response) {
				console.log(response);
			});


		event.preventDefault();
	});
	

});

var campos = [
	document.querySelector('#data'),
	document.querySelector('#quantidade'),
	document.querySelector('#valor')
]


document.querySelector('.form').addEventListener('submit', function(e){
	e.preventDefault();

	var table = document.querySelector('table tbody');
	var tr = document.createElement('tr');
	table.appendChild(tr);


	campos.forEach(function(campo){	
		var td = document.createElement('td');
		td.textContent = campo.value;
		tr.appendChild(td);
	});

	var td = document.createElement('td');
	console.log(campos);
	td.textContent = campos[1].value * campos[2].value;
	tr.appendChild(td);

	campos[0].value = '';
	campos[1].value = 1;
	campos[2].value = 0;

	campos[0].focus();
});

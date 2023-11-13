<script>
	let tabla;

	function inicializarTabla(data) 
	{
		if (tabla) 
		{
			$('#myTable').DataTable().destroy();
		}

		tabla = $('#myTable').DataTable({
			data: data,
			columns: [
				{
					data: 'link_test',
					render: function (data, type, row, meta) {
						if (type === 'display') {
							return '<a href="' + data + '">' + data + '</a>';
						}
						return data;
					}
				},
				{ data: 'anio_publicacion' },
				{ data: 'tipo' },
				{ data: 'rango_aplicacion' },
				{ data: 'virtualizado' }
			],
			language: {
				url: "//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json"
			}
		});
	}

	document.getElementById("buscarForm").addEventListener("submit", function (event) {
		event.preventDefault();

		const formData = new FormData(this);
		const jsonObject = {};

		for (const [key, value] of formData.entries()) {
			jsonObject[key] = value;
		}

		// Imprimir el JSON en la consola
		console.log("JSON a enviar:", JSON.stringify(jsonObject));

		const jsonString = JSON.stringify(jsonObject);

		const base_url = "<?php echo base_url(); ?>";
		const url = base_url + "index.php/prueba_psicologica/buscar";

		const xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				const response = JSON.parse(xhr.responseText);

				if (response.length > 0) {
					document.getElementById("tableContainer").style.display = "block";
					inicializarTabla(response);
				} else {
					document.getElementById("tableContainer").style.display = "none";
				}
			}
		};

		xhr.send(jsonString);
	});

</script>

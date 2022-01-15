function addRow(index, grade, review) {
	$(document).ready(() => {
		$("#table").append('<tr> <th scope="row">' + index + '</th> <td>' + grade + '</td> <td>' + review + '</td> </tr>');
	});
}
function refreshTable() {
	$(document).ready(() => {
		$("#table tbody").html('');
	});
}
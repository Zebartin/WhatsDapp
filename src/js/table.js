function addRow(index, addr, grade, review) {
	$(document).ready(() => {
		$("#table").append('<tr> <th scope="row">' + index + '</th> <td>' + addr + '</td> <td>' + grade + '</td> <td>' + review + '</td> </tr>');
	});
}
function refreshTable(){
	$(document).ready(() => {
		$("#table").html('');
	});
}
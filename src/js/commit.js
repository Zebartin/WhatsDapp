$(document).ready(function(){
	$('#com').click(function(){
		var review = $("#review").val();
		var grade = $("#grade").text();
		var data_str = '{' + '"review":"' + review + '",' + '"grade":' + grade +'}';
		var data_json = JSON.parse(data_str);
		console.log(data_json);
	})
})
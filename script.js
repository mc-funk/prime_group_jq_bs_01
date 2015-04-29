var apikey = 'c5efa99a7dbd7d52f466cb2413154950ae0a962f'; // Put your API key here
var index = 0;
var searchResults;

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function displayResult(result) {
    console.log(result);
	$(".displayImage").html("<img src='" + result.image.medium_url + "'>");
	var el = "";
	for (var i = 0; i < result.platforms.length; i++){
		el += (result.platforms[i].name+", ");
	}
	el = el.substr( 0, (el.length - 2));
	$(".displayInfo").html("<h2 class='lead'>"+result.name+"</h2><p>"+result.deck+"</p><p>"+el+"</p>");
	$(".display").show();
}

$(document).ready(function() {

	$(".searchBtn").on('click', function(){
		$(".searchStatus").show();
		$(".container").children(".row").remove();
		var searchTerm = $("#searchField").val();
		$("#searchField").val('');
		searchResults = search(searchTerm);
	});

	// When an individual nav button is clicked, display those search results
	$(".circleBtn").on('click', function(){
		index = $(this).data("index");
		displayResult(searchResults[index]);
	});

	$(".leftArrow").on("click", function() {
		index--;
		if (index < 0){
			index = 7;
		}
		displayResult(searchResults[index]);
	});

	$(".rightArrow").on("click", function() {
		index++;
		if (index > 7){
			index = 0;
		}
		displayResult(searchResults[index]);
	});
	//
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
			searchResults = (data.results);
			searchResults = searchResults.slice(0,8);
	        displayResult(searchResults[0]);
	        $(".searchStatus").hide();
	        //data.results holding all results from ajax query 
	    }
	});

}

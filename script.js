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
	$(".displayInfo").html("<h2 class='lead'>"+result.name+"</h2><p>"+result.deck+"</p><p><strong>Platform(s): </strong>"+el+"</p><div class='btn btn-danger btn-lg readMoreBtn'>Read More</div>");
	$(".display").show();
	var releaseDate = new Date(result.original_release_date).toLocaleDateString();
	if (result.description) {
		$(".displayInfo").append("<div class='additional'><strong>Original Release Date:</strong>" + releaseDate +"<br>" + result.description + "<br><div class='btn btn-danger btn-lg collapseBtn'>Collapse</div></div>");
	} else {
		$(".displayInfo").append("<div class='additional'><strong>Original Release Date:</strong>" + releaseDate +"<br><div class='btn btn-danger btn-lg collapseBtn'>Collapse</div></div>");
	}
	$(".additional").hide();
}

function setThumbs(results){
	for (var i=0; i <results.length; i++){
		$(".nav").find("[data-index='" + i + "']").empty();
		$(".nav").find("[data-index='" + i + "']").append("<img src='"+results[i].image.tiny_url+"' class='img-circle'>");
	}

}

$(document).ready(function() {

	$(".searchBtn").on('click', function(){
		$(".searchStatus").show();
		var searchTerm = $("#searchField").val();
		$("#searchField").val('');
		searchResults = search(searchTerm);
	});

	// When an individual nav button is clicked, display those search results
	$(".circleBtn").on('click', function(){
		$(this).addClass("selected");
		$(this).siblings().removeClass("selected");
		index = $(this).data("index");
		displayResult(searchResults[index]);
	});

	$(".leftArrow").on("click", function() {
		index--;
		if (index < 0){
			index = 7;
		}
		$(this).siblings().removeClass("selected");
		$(".nav").find("[data-index='" + index + "']").addClass("selected");
		displayResult(searchResults[index]);
	});

	$(".rightArrow").on("click", function() {
		index++;
		if (index > 7){
			index = 0;
		}
		$(this).siblings().removeClass("selected");
		$(".nav").find("[data-index='" + index + "']").addClass("selected");
		displayResult(searchResults[index]);
	});

	$(".displayInfo").on('click', ".readMoreBtn", function(){
		$(this).hide();
		$('.additional').slideDown("slow");
	})

	$(".displayInfo").on('click', ".collapseBtn", function(){
		$('.readMoreBtn').show();
		$('.additional').slideUp("slow");
	})
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){
	searchResults = undefined;
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
			$(".nav").find("[data-index=0]").addClass("selected");
			setThumbs(searchResults);
	        displayResult(searchResults[0]);
	        $(".searchStatus").hide();
	        //data.results holding all results from ajax query 
	    }
	});

}

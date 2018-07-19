$(document).ready(function() {

    var $searchBox = $(".search-box");
    var $gifs = $(".gifs");
    var searches = ["rick and morty", "pickle rick"];

    const renderButtons = function() {
        $(".user-searches").empty();
        $.each(searches, function(index, value) {
            var button = $("<button>").addClass("btn btn-primary mx-2 my-2 search-btn")
                .attr("data-keyword", value)
                .text(value);
            $(".user-searches").append(button);
        })
    };

    $(document).on("click", ".add-search", function(event) {
        event.preventDefault();
        var search = $searchBox.val().trim();
        if (search.length > 0) {
            searches.push(search);
            $searchBox.val("");
            renderButtons();
        }
    });

    $(document).on("click", "button", function() {
        var apiKey = "Pp4Ne79GSqyRqQOyvOoHQbiAJK8sN839";
        var limit = "10";
        var keyword = $(this).attr("data-keyword");
        var queryURL = `https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${apiKey}&limit=${limit}`;
    
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            var result = response.data;
            $gifs.empty();

            $.each(result, function(index, value) {
                var gifDiv = $("<div class='item'>");
                var rating = result[index].rating;
                var p = $("<p>").text(`Rating: ${rating}`);
                var gif = $("<img>");
                gif.attr("src", result[index].images.fixed_height.url);
            
                gifDiv.prepend(p);
                gifDiv.prepend(gif);
                $gifs.append(gifDiv);
            })
        });
    });

    renderButtons();

})
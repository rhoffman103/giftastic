$(document).ready(function() {

    var $searchBox = $(".search-box");
    var $gifs = $(".gifs");
    var apiKey = "Pp4Ne79GSqyRqQOyvOoHQbiAJK8sN839";  
    var searches = ["rick and morty", "adult swim", "pickle rick", "poopybutthole", "birdperson", "rick sanchez", "morty smith",
                    "squanchy", "summer smith", "gazorpian", "mulan sauce", "show me what you got", "wubba lubba dub dub"]; 

    const renderButtons = function() {
        $(".user-searches").empty();
        $.each(searches, function(index, value) {
            var button = $("<button>").addClass("btn btn-primary mx-2 my-2 search-btn")
                .attr("data-keyword", value)
                .text(value);
            $(".user-searches").append(button);
        })
    };

    const doSearch = function(keyword, limit) {
        var queryURL = `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(keyword)}&api_key=${apiKey}&limit=${limit}&rating=g`;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            var result = response.data;
            $gifs.empty();
            console.log(result[0]);

            $.each(result, function(index, value) {
                var gifDiv = $("<div class='item float-left mr-4'>");
                var rating = result[index].rating;
                var p = $("<p>").text(`Rating: ${rating}`);
                var gif = $("<img>");
                gif.attr("src", result[index].images.fixed_height.url);
            
                gifDiv.prepend(p);
                gifDiv.prepend(gif);
                $gifs.append(gifDiv);
            })
        });
    };

    $(document).on("click", ".add-search", function(event) {
        event.preventDefault();
        var keyword = $searchBox.val().trim();
        if (keyword.length > 0) {
            searches.push(keyword);
            $searchBox.val("");
            renderButtons();
            var limit = $("#ControlSelect").val();;
            doSearch(keyword, limit);
        }
    });

    $(document).on("keypress", "button", function() {
        if (event.keyCode == 13) {
            $(".add-search").click()
        };
    });

    $(document).on("click", ".search-btn", function() {
        var keyword = $(this).attr("data-keyword");
        var limit = $("#ControlSelect").val();
        doSearch(keyword, limit);
    });

    renderButtons();

})
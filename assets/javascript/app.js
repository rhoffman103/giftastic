$(document).ready(function() {

    var currentKeyword;
    var offset         = 0;
    var $searchBox     = $(".search-box");
    var $userSearches  = $(".user-searches");
    var $gifs          = $(".gifs");
    var $offset        = $(".offset");
    var apiKey         = "Pp4Ne79GSqyRqQOyvOoHQbiAJK8sN839";  
    var searches       = ["rick and morty", "adult swim", "pickle rick", "poopybutthole", "birdperson", "rick sanchez", "morty smith",
                         "squanchy", "summer smith", "mulan sauce", "show me what you got", "wubba lubba dub dub"]; 

    const renderButtons = function() {
        $userSearches.empty();
        $.each(searches, function(index, value) {
            var button = $("<button>").addClass("btn btn-primary mx-2 my-2 search-btn")
                .attr("data-keyword", value)
                .text(value);
            $userSearches.append(button);
        })
    };

    const renderOffsetButtons = function(limit) {
        $offset.empty();
        var options = ["<< Previous", "Next >>"]
        
        $.each(options, function(index, value) {
            var offsetBtn = $("<button>").attr("type", "submit")
                .addClass("btn btn-primary mx-2 my-2 offset-btn offset-btn-" + (index + 1))
                .attr("data-offset", limit)
                .text(value);
            $offset.append(offsetBtn);
        })
    };

    const getParameters = function(event, limit, offset = 0) {
        var limit = $("#ControlSelect").val();
        
            if (event.target.classList[4] === "search-btn") {
            currentKeyword = event.currentTarget.innerText;
            console.log(currentKeyword)
        }
            else if ($searchBox.val().length > 0) {
            currentKeyword = $searchBox.val();
            console.log(currentKeyword)
        }
        
        return [currentKeyword, limit, offset];
        
    }

    const doSearch = function(keyword, limit, offset = 0) {
        var queryURL = `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(keyword)}&api_key=${apiKey}&limit=${limit}&offset=${offset}&rating=g`;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            var result = response.data;
            $gifs.empty();
            renderOffsetButtons(limit);

            $.each(result, function(index, value) {
                var gifDiv = $("<div class='item float-left mx-3'>");
                var rating = result[index].rating;
                var p = $("<p>").text(`Rating: ${rating}`);
                var gif = $("<img>");
                gif.addClass("giffy");
                gif.attr("src", result[index].images.fixed_height_still.url);
                gif.attr("data-still", result[index].images.fixed_height_still.url);
                gif.attr("data-animate", result[index].images.fixed_height.url)
                gif.attr("data-state", "still");
            
                gifDiv.prepend(p);
                gifDiv.prepend(gif);
                $gifs.append(gifDiv);
            })
        });
    };

    $(document).on("click", ".add-search", function(event) {
        event.preventDefault();
        var parameters = getParameters(event);
        console.log("add search");
        
        if (parameters[0].length > 0) {
            searches.push(parameters[0]);
            $searchBox.val("");
            renderButtons();
            doSearch(parameters[0], parameters[1]);
        }
    });

    $(document).on("keypress", "button", function() {
        if (event.keyCode == 13) {
            $(".add-search").click()
            console.log("keypress");
        };
    });

    $(document).on("click", ".search-btn", function(event) {
        var parameters = getParameters(event);
        doSearch(parameters[0], parameters[1]);
        console.log("search button");
    });

    $(document).on("click", ".giffy", function() {
        var $this = $(this);
        var state = $this.attr("data-state");

        if (state === "still") {
            $this.attr("src", $this.attr("data-animate"));
            $this.attr("data-state", "animate");
        } else {
            $this.attr("src", $this.attr("data-still"));
            $this.attr("data-state", "still");
        }
    });

    $(document).on("click", ".offset-btn", function(event) {
        var parameters = getParameters(event);
        
        if ($(this)[0].attributes[1].nodeValue.includes("offset-btn-1")) {
            offset -= parseInt(parameters[1]);
        } 
        else {
            offset += parseInt(parameters[1]);
        }
        doSearch(currentKeyword, parameters[1], offset);
    })

    $("#ControlSelect").change(function(event) {
        var parameters = getParameters(event);
        doSearch(currentKeyword, parameters[1], parameters[2]);
        console.log("click success");
    });

    renderButtons();

})
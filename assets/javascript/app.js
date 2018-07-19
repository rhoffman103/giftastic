$(document).ready(function() {

    var $searchBox = $(".search-box");
    var searches = ["rick and morty", "pickle rick"];

    const renderButtons = function() {
        $(".user-searches").empty();
        $.each(searches, function(index, value) {
            var button = $("<button>").addClass("btn btn-primary mx-2 my-2 search-btn")
                .attr("data-name", value)
                .text(value);
            $(".user-searches").append(button);
        })
    };

    $(document).on("click", ".add-search", function(event) {
        event.preventDefault();
        var search = $searchBox.val().trim();
        searches.push(search);
        $searchBox.val("");
        renderButtons();
    });



    renderButtons();

})
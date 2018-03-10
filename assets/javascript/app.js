//starting arrey of items that will populate the first buttons.
var topics = ["dogs", "cats", "bears", "birds"];

//renderButtons creates a button and gives in the class animal and the bootstrap class for large button as well as text and a data type for a later ajex call.
function renderButtons(searchTerm) {

    var a = $("<button>");

    a.addClass("animal");

    a.addClass("btn btn-primary btn-lg");

    a.attr("data-name", searchTerm);

    a.attr("data-state", "still");

    a.text(searchTerm);

    $("#buttons-appear-here").append(a);
}

//For loop iterates over the renderButtons function to creat buttons for the starting arrey items.
for (var i = 0; i < topics.length; i++) {
    renderButtons(topics[i]);
}

//on click event that adds a button based on the user input from the html.
$("#addButton").on("click", function (e) {

    var newAnimal = $("#add-animal").val();

    renderButtons(newAnimal);
});

$(document).on("click", "button.animal", function () {

    $('#gifs-appear-here').empty();

    var animal = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=x9qxuuDsCFj5OtIBiaF0985LDE2jqAzJ&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            console.log(queryURL);

            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    var gifDiv = $("<div class='item'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var image = $("<img>");

                    image.attr("src", results[i].images.fixed_height.url);

                    gifDiv.attr('class', 'd-inline-block');
                    gifDiv.append(p, image);

                    $("#gifs-appear-here").prepend(gifDiv);

                }
            }
        });
});
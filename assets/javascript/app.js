$(document).ready(function () {

    // topic set on page load
    var topics = ['the office', 'dogs', 'cats', 'anger','community', 'kenya west', 'cardi b', 'scrubs', 'greys anatomy', 'surprise', 'good place', 'marvel'];

    // Passes topic in preset array to renderButton function upon page load
    function pageSet() {
        for (var i = 0; i < topics.length; i++) {
            renderButton(topics[i]);
        };
    };

    // Creates a button either from item in preset array, or from user input in form
    function renderButton(buttonName) {
        var newButton = $('<button>');
        newButton.text(buttonName);
        newButton.attr({
            type: 'button',
            class: 'btn btn-primary topic',
        })
        $("#buttons-appear-here").append(newButton);
    };

    // Creates a random index number to be used in getGif function
    function randomIndex(x){
        return Math.floor((Math.random() * x));
    };

    // Retrieves and topic gifs on page
    function getGif() {

        // Clears old gives, then sets variables for use in ajax
        $('#gifs-appear-here').empty();

        var name = $(this).text();
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + name + '&api_key=GMZR7cz1zr9lSowtZf1BSY3w78yDcm5f&limit=50';

        // Get 50 gifs of selected show from giphy
        $.ajax({
            url: queryURL,
            method: 'Get'

        
        }).then(function(res){

            // Place all returned gifs in temp array named allGifsArray
            var allGifsArray = [];
            
            for (var i=0; i < res.data.length; i++){
                allGifsArray.push(res.data[i]);
            }

            // Randomly select 10 gifs from previous temp array and push to newly created temp array named selectedGifsArray, removing slected gif from allGifsArray
            var selectedGifsArray = [];

            for (var i=0; i<10; i++) {
                var index = randomIndex(allGifsArray.length);
                selectedGifsArray.push(allGifsArray[index]);
                allGifsArray.splice(index, 1);
            }

            // Push gif and rating to page inside a newly created div
            for (var i = 0; i < selectedGifsArray.length; i++){
                var newDiv = $('<div>');
                var image = $('<img>');
                var text = $('<p>');

                var activeImageSrc = selectedGifsArray[i].images.fixed_height.url;
                var stillImageSrc = selectedGifsArray[i].images.fixed_height_still.url;
                var rating = selectedGifsArray[i].rating;

                // Attaches sources for both still and active gif to img tag
                image.attr({
                    src: stillImageSrc,
                    class: 'gifs',
                }).data({
                    still: stillImageSrc,
                    active: activeImageSrc,
                });

                text.text(rating);

                newDiv.append(text, image);
                newDiv.attr('class');
                $('#gifs-appear-here').prepend(newDiv);
            };

        });
    };

    // Start and stop playing gif
    function startStop(){

        //Checks is gif is stopped if so,
        if ($(this).data('still') === $(this).attr('src')){

            //Swap current source with active gif source
            var newSrc = $(this).data('active');
            $(this).attr('src', newSrc);

        // If in motion,
        } else {
            
            //Swap current source with still gif source
            var newSrc = $(this).data('still');
            $(this).attr('src', newSrc);
        }
    };

    // Grabs user input and passes that to renderButton function
    function addSomething(){

        event.preventDefault();
        var newTopic = $('#addSomethingForm').val().trim();
        renderButton(newTopic);

        // Clear the form to be ready for more user input
        $('form')[0].reset();
    }

    // Places buttons from preset array on page on load
    pageSet();
    
    // Runs getGif when user clicks show button
    $(document).on('click', '.topic', getGif);

    // Changes gif from active to in
    $(document).on('click', '.gifs', startStop);

    // Allows user to add a new show button
    $('.addSomethingButton').on('click', addSomething);







});
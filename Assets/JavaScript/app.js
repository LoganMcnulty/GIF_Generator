$(document).ready(function(){
    var gifs = ["Hubble Telescope", "Moon", "SpaceX"];

    // displayMovieInfo function re-renders the HTML to display the appropriate content
    function displayGifInfo() {

      var gif = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&apikey=SzuaIKjuCAaNHHDhIPI1sShcenT1PnkR";

      // Creating an AJAX call for the specific movie button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response);
            $("#gifContainer").empty();
          for (var i = 0; i < response.data.length; i++){
            console.log("spaghetti")
            var gifURL = response.data[i].images.fixed_height.url;
            var gifTitle = response.data[i].title;
            var gifRating = response.data[i].rating;

            var gifCard = $("<div class='card h-10' style='width:10rem'>");
            var gifImage = $("<img>").addClass("card-img-top ").attr("src", gifURL).attr("alt", "Card image cap");
            var gifCardBody = $("<div>");
            gifCardBody.addClass("card-body");
            var pOne = $("<p>").text("Rating: " + gifRating);
            gifCardBody.append(pOne);
            var pTwo = $("<p>").text("Title: " + gifTitle);
            gifCardBody.append(pTwo);

            
            gifCard.append(gifImage);    
            gifCard.append(gifCardBody);    

            $("#gifContainer").append(gifCard);

            
              console.log(gifURL,gifTitle,gifRating);
          }
      });

    }

    // Function for displaying gif data
    function renderButtons() {

      // Deleting the gifs prior to adding new gifs
      // (this is necessary otherwise you will have repeat buttons)
      $("#buttonContainer").empty();

      // Looping through the array of gifs
      for (var i = 0; i < gifs.length; i++) {

        // Then dynamicaly generating buttons for each gf in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("btn btn-primary btn-lg gifButton");
        // Adding a data-attribute
        a.attr("data-name", gifs[i]);
        // Providing the initial button text
        a.text(gifs[i]);
        // Adding the button to the buttons-view div
        $("#buttonContainer").append(a);
      }
    }

    // This function handles events where addGifButton (submit) is clicked
    $("#addGifButton").on("click", function(event) {
      event.preventDefault();
      // This line grabs the input from the textbox
      var gif = $("#addGif").val().trim();

      // Adding movie from the textbox to our array
      gifs.push(gif);

      // Calling renderButtons which handles the processing of our movie array
      renderButtons();
    });

    // Adding a click event listener to all elements with a class of "movie-btn"
    $(document).on("click", ".gifButton", displayGifInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
});
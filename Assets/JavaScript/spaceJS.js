$(document).ready(function(){
    var gifs = ["Hubble Telescope", "Moon", "SpaceX"];

    $("#space").on("click", function() {
        $("head link#themeSelectorCSS").attr("href", "assets/css/spaceCSS.css");
        // $("#themeSelectorJS").attr("src", "assets/Javascript/spaceJS.js");
        $("#title").text("A Universe of GIFs");
    });

    
    $("#zooAnimals").on("click", function() {
        $("head link#themeSelectorCSS").attr("href", "assets/css/zooAnimalsCSS.css");
        // $("#themeSelectorJS").attr("src", "assets/Javascript/zooAnimals.js");
        $("#title").text("Animalistic GIFs");

    });

    
    $("#finance").on("click", function() {
        $("head link#themeSelectorCSS").attr("href", "assets/css/financeCSS.css");
        // $("#themeSelectorJS").attr("src", "assets/Javascript/finance.js");
        $("#title").text("Speculating in the GIF Market");
    });

    
    $("#sports").on("click", function() {
        $("head link#themeSelectorCSS").attr("href", "assets/css/sportsCSS.css");
        // $("#themeSelectorJS").attr("src", "assets/Javascript/sports.js");
        $("#title").text("Allstar Sports GIFs");
    });

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
          $("#gifContainer").remove();
          var gifContainer = $("<div class='col-10' id='gifContainer'>")
          for (var i = 0; i < response.data.length; i++){
            console.log("spaghetti")
            var gifURL = response.data[i].images.fixed_height.url;
            var gifTitle = response.data[i].title;
            var gifRating = response.data[i].rating;

            var gifCard = $("<div class='card h-10' style='width:10rem; height: 20em; margin:1%;'>");
            var gifImage = $("<img>").addClass("card-img-top").attr("src", gifURL).attr("alt", "Card image cap");
            var gifCardBody = $("<div>");
            gifCardBody.addClass("card-body").attr("style","padding:1%;");
            var pOne = $("<p>").text("Rating: " + gifRating);
            gifCardBody.append(pOne);
            var pTwo = $("<p>").text("Title: " + gifTitle);
            gifCardBody.append(pTwo);

            
            gifCard.append(gifImage);    
            gifCard.append(gifCardBody);    

            $("#gifRow").append(gifContainer);
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

        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("btn btn-lg gifButton");
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
$(document).ready(function(){

  //define starting gif buttons, one for each theme
    var gifs = ["Toucan","Stock Market", "Football",  "Hubble Telescope"];

    //Theme modification buttons. On theme selction, update CSS and title
    $("#space").on("click", function() {
        $("head link#themeSelectorCSS").attr("href", "assets/css/spaceCSS.css");
        $("#title").text("A Universe of GIFs");
    });

    
    $("#zooAnimals").on("click", function() {
        $("head link#themeSelectorCSS").attr("href", "assets/css/zooAnimalsCSS.css");
        $("#title").text("Animalistic GIFs");

    });

    
    $("#finance").on("click", function() {
        $("head link#themeSelectorCSS").attr("href", "assets/css/financeCSS.css");
        $("#title").text("Speculating in the GIF Market");
    });

    
    $("#sports").on("click", function() {
        $("head link#themeSelectorCSS").attr("href", "assets/css/sportsCSS.css");
        $("#title").text("Allstar Sports GIFs");
    });

  //function for displaying the gif images to the lower most Div
    function displayGifInfo() {
      //pass the "data-name" of the big button that is clicked to the query URL
        var gif = $(this).attr("data-name");
        var limit = 20;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=" + limit + "&apikey=SzuaIKjuCAaNHHDhIPI1sShcenT1PnkR";

      // Creating an AJAX call for the specific gif button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response);
          console.log(queryURL);

          //remove the gif container for each new gif button request, in order to populate again with new gifs
            $("#gifContainer").remove();
          //create a new gif container since old one removed
            var gifContainer = $("<div class='col-10' id='gifContainer'>")
          //for the number of responses from the AJAX call...
            for (var i = 0; i < response.data.length; i++){
            //push the gif URL, title, and rating to their variables for later use
              var gifURL = response.data[i].images.fixed_height.url;
              var gifTitle = response.data[i].title;
              var gifRating = response.data[i].rating;

            //create a gifCard using bootstrap
              var gifCard = $("<div class='card h-10' style='width:10rem; height: 20em; margin:1%;'>");
            //create a gif image for the card
              var gifImage = $("<img>").addClass("card-img-top").attr("src", gifURL).attr("alt", "Card image cap");
            //create a card body for title and rating
              var gifCardBody = $("<div>");
            //define class of card body, add style
              gifCardBody.addClass("card-body").attr("style","padding:1%;");
            // create p tags for the card body, add variables as content, and append to card body
              var pOne = $("<p>").text("Rating: " + gifRating);
              gifCardBody.append(pOne);
              var pTwo = $("<p>").text("Title: " + gifTitle);
              gifCardBody.append(pTwo);

            //append gif image first, and then card body after, to make a complete card
              gifCard.append(gifImage);    
              gifCard.append(gifCardBody);    
      
            //append the new gifContainer to the empty gifRow that exists in the HTML
              $("#gifRow").append(gifContainer);
            //append the gif card to the gif container
              $("#gifContainer").append(gifCard);
          }
      });

    }

    // Function for rendering the gif buttons 
    function renderButtons() {

      // Deleting the gifs prior to adding new gifs
      // (this is necessary otherwise you will have repeat buttons)
      $("#buttonContainer").empty();


      // Looping through the array of gifs
      for (var i = 0; i < gifs.length; i++) {
        //create a button
          var a = $("<button>");
        // Adding a class of gifButton
          a.addClass("btn btn-lg gifButton");
        // Adding a data-name that stores the name of the gif provided by the array
          a.attr("data-name", gifs[i]);
        // modify the text of the button to be the data-name value
          a.text(gifs[i]);
        // append button to button container
          $("#buttonContainer").append(a);
      }
    }

    // on click function for submit button
    $("#addGifButton").on("click", function(event) {
      //prevent page refresh on submit
        event.preventDefault();
      // store input to "gif", trim spaces
        var gif = $("#addGif").val().trim();
      // push gif name to the gif array
        gifs.push(gif);
      // call renderButtons function in order to update the gif buttons container
        renderButtons();
    });

   

    //click event listener for all elements with a class of gifButtonbtn
      $(document).on("click", ".gifButton", displayGifInfo);

    // Calling the renderButtons function to display the intial four buttons
      renderButtons();
});
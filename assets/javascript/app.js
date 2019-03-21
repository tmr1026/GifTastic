$(document).ready(function(){
    


var topics= ["RHOA", "GOT", "Married to Medicine"];

function createButtons(){
    $("#buttons").empty();
    for (var i =0; i<topics.length; i++){
        var btn= $("<button class= 'topic-btn'>");
        btn.attr("data-show",topics[i]);
        btn.text(topics[i]);
        $("#buttons").append(btn);
    }
}
createButtons();

$(document).on("click",".topic-btn",function(){
    $("#gifs").empty();
    var show= $(this).data("show");
    var queryURL= "https://api.giphy.com/v1/gifs/search?q=" +show+"&api_key=NhgwCqPd156MAD7Ibckt6dMbPICgzYpj&limit=10"
    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .done(function(response){
        for(var i=0; i<response.data.length;i++){
            var topicsDiv =$("<div class = 'search-item'>");
            var rating = response.data[i].rating;
            var p = $("<p>").text("Rating: "+rating);
            var moving= response.data[i].images.fixed_height.url;
            var still= response.data[i].images.fixed_height_still.url;
            var image= $("<img>");
            image.attr("src",still);
            image.attr("data-still", still);
            image.attr("data-animate", moving);
            image.attr("data-state","still");
            image.attr("class","gifImage");
            topicsDiv.append(p);
            topicsDiv.append(image);
            $("#gifs").append(topicsDiv);
        }
    })
})

$(".gifImage").on("click",function(){
    var state = $(this).attr("data-state");
    if(state == "still"){
        $(this).attr("src", $("this").attr("data-animate"));
        $(this).attr("data-state", "animate");
    }else{
        $(this).attr("src", $("this").attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

$("#add-Gif").on("click",function(event){
    event.preventDefault();
    var newGif= $("#search-input").val().trim();
    topics.push(newGif);
    createButtons();  
})
});
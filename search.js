// variables
const searchBtn = document.getElementById("searchBtn");
const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];


const SEARCH_NEWS = 'https://gnews.io/api/v4/search?q=';



searchBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4> You Searched for: "+newsQuery.value+"</h4>";
    fetchQueryNews();
});


// Get the input field
var input = document.getElementById("newsQuery");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("searchBtn").click();
  }
});


    const fetchQueryNews = async () => {
   //alert ('https://gnews.io/api/v4/search?q='+ newsQuery.value +'=token=d2c21d98cdab619c0303c82f718a1df2&lang=en')
        if(newsQuery.value == null)
            return;
    
        const response = await fetch('https://gnews.io/api/v4/search?q='+ newsQuery.value +'&token='+apiKey+'&lang=en');
        newsDataArr = [];
        if(response.status >= 200 && response.status < 300) {
            const myJson = await response.json();
            newsDataArr = myJson.articles;
        } else {
            //error handle
            console.log(response.status, response.statusText);
            newsdetails.innerHTML = "<h5>No data found.</h5>"
            return;
        }
    
        displayNews();
    }
    


function displayNews() {

    newsdetails.innerHTML = "";

    // if(newsDataArr.length == 0) {
    //     newsdetails.innerHTML = "<h5>No data found.</h5>"
    //     return;
    // }

    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T");
        
        var col = document.createElement('div');
        col.className="col-sm-12 col-4 col-lg-3 p-2 card ";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height","matchparents");
        image.setAttribute("width","100%");
        image.src=news.image;

        var cardBody = document.createElement('div');
        
        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML = news.description;

        var link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Continue reading";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });

}
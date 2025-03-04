const searchInput= document.getElementById("movie-name");

const searchButton = document.getElementById("search-btn");

const result = document.getElementById('result');

//Function to fetch movie data
function fetchMovie(){
  const movieName= searchInput.value.trim(); 

  if (movieName ===""){
    result.innerHTML = `<h3>Please enter a movie name!</h3>` ;
    return;
  }

  //showing loading message
  result.innerHTML = `<h3>Loading...</h3>`;

  //fetch movie data using API key from key.js
  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${movieName}`)
   .then(response => response.json())//convert response to JSON
   .then(data => {
   if (data.Response ==="False"){
    result.innerHTML=`<h3> Movie not found. Kindly try once again or another.</h3>`;
    return;
   }

   //Handle missing data
   const poster= data.Poster !=="N/A" ? data.Poster : "placeholder.jpg";
   const genre = data.Genre ? data.Genre : "Not available";
   const plot = data.Plot ? data.Plot : "No description available.";

   //Display movie details
   result.innerHTML=`
   <h2>${data.Title}</h2>
   <img src="${poster}" alt="${data.Title}">
   <p><strong>Year:</strong> ${data.Year}</p>
   <p><strong>Genre:</strong> ${genre}</p>
   <p><strong>Plot:</strong> ${plot}</p>
   `;// log API response

   //Clear Input field after search
   searchInput.value ="";
   })
   .catch(error => {
     console.error('Error fetching data:', error);
     result.innerHTML= `<h3> Something went wrong. Please try again.</h3>`;//catch error
    });

  }
  //click event for the search button
  searchButton.addEventListener('click', fetchMovie);

  //press Enter  to trigger search
  searchInput.addEventListener("keypress", function(event){
    if(event.key ==="Enter"){
      fetchMovie();
    }
  });


 



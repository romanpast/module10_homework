// const btn = document.querySelector(".btn");
const btnLocation = document.querySelector(".btn-location");
const messageBox = document.querySelector(".messenger");
// btn.addEventListener("click", () => {
//     alert("The screen width is " + window.screen.width + "px" + "\n" + "The screen height is " + window.screen.height + "px")
// })

function getLocationAndCreateDiv() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var location = "Latitude: " + latitude + ", Longitude: " + longitude;
        var div = document.createElement("div");
        div.classList.add("client_message");
        div.innerHTML = location;
        messageBox.appendChild(div);
      });
    } else {
      var div = document.createElement("div");
      div.innerHTML = "Geolocation is not supported by this browser.";
      document.body.appendChild(div);
    }
  }

//   btnLocation.addEventListener("click", (e) => {
//     getLocationAndCreateDiv()
//     e.preventDefault()
//   })

  function getLocationAndCreateDiv() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var location = latitude + "," + longitude;
        var apiKey = "03e081d9f3a64dd29e322f85098ab85b";
        var url = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKey}`;
  
        fetch(url)
          .then(response => response.json())
          .then(data => {
            let country = data.results[0].components.country
            var city = data.results[0].components.town || data.results[0].components.city || data.results[0].components.state_district;
            var div = document.createElement("div");
            div.innerHTML = "I am in " + city + ", " + country;
            div.classList.add("client_message");
            messageBox.appendChild(div);
          });
      });
    } else {
      var div = document.createElement("div");
      div.innerHTML = "Geolocation is not supported by this browser.";
      document.body.appendChild(div);
    }
  }

  btnLocation.addEventListener("click", (e) => {
    getLocationAndCreateDiv()
    e.preventDefault()
  })
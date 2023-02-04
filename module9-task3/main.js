const btnLocation = document.querySelector(".btn-location");
const messageBox = document.querySelector(".messenger");
const messageInput = document.querySelector(".text_input");
const form = document.querySelector(".client_input");
const socket = new WebSocket("wss://echo-ws-service.herokuapp.com");


socket.onopen = function () {
  console.log("Connected to the echo server.");
};

socket.onmessage = function (event) {
  const message = document.createElement("div");
  message.innerText = event.data;
  message.classList.add("ws_message");
  messageBox.appendChild(message);
};

socket.onclose = function () {
  console.log("Disconnected from the echo server.");
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const sentMessage = document.createElement("div");
  sentMessage.innerText = messageInput.value;
  sentMessage.classList.add("client_message");
  messageBox.appendChild(sentMessage);
  socket.send(messageInput.value);
  messageInput.value = "";
});

function getLocation() {
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
          console.log(data);
          let flagName = data.results[0].components.country_code;
          let country = data.results[0].components.country;
          let city = data.results[0].components.town || data.results[0].components.city || data.results[0].components.state_district;
          let message = document.createElement("div");
          let flag = document.createElement("img");
          flag.setAttribute("src", `https://flagcdn.com/16x12/${flagName}.png`)
          message.innerHTML = "I am in " + city + ", " + country + " ";
          message.classList.add("client_message");
          message.appendChild(flag);
          messageBox.appendChild(message);
        });
    });
  } else {
    let div = document.createElement("div");
    div.innerHTML = "Geolocation is not supported by this browser.";
    document.body.appendChild(div);
  }
}

btnLocation.addEventListener("click", (e) => {
  getLocation()
  e.preventDefault()
})
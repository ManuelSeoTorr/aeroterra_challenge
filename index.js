const mapDiv = document.getElementById("map");
const input = document.getElementById("locationInput");
const openButton = document.getElementById("openButton");
const closeButton = document.getElementById("closeButton");
const resetButton = document.getElementById("resetButton");
const formModal = document.getElementById("form");
const modal = document.getElementById("modal");
let map;
let autocomplete;

function initMap() {
  //initiate the map
  map = new google.maps.Map(mapDiv, {
    center: { lat: -34.595986, lng: -58.3724715 },
    zoom: 12,
  });
  initAutocomplete();
  map.addListener("click", (event) => {
    console.log(event)
    const place = event.latLng;
    createIndicator(place);
  });
}

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", function () {
    const place = autocomplete.getPlace();
    map.setCenter(place.geometry.location);
    map.setZoom(10);
    createIndicator(place);
  });
}

function createIndicator(place) {
    const indicator = new google.maps.Marker({
      position: place.geometry && place.geometry.location ? place.geometry.location : place,
      icon: {
        url: "./media/indicator.png",
        scaledSize: new google.maps.Size(31, 38),
      },
      map: map,
    });
  
    indicator.addListener("click", function () {
      if (place.formatted_address) {
        document.getElementById("description").value = place.formatted_address;
      }
  
      const positionToSet = place.geometry && place.geometry.location ? place.geometry.location : place;
  
      document.getElementById("coordLat").value = positionToSet.lat();
      document.getElementById("coordLng").value = positionToSet.lng();
  
      modal.showModal();
      indicator.setMap(null);
    });
  }

openButton.addEventListener("click", () => {
  modal.showModal();
});

closeButton.addEventListener("click", () => {
  modal.close();
});

resetButton.addEventListener("click", () => {
  formModal.reset();
});

modal.addEventListener("click", (event) => {
  //close modal by clicking outside
  const dialogDimensions = modal.getBoundingClientRect();
  if (
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom
  ) {
    modal.close();
  }
});

// const createMarker = require("./createMarker.js")

const form = document.getElementById("form");
const modalForm = document.getElementById("modal");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let description = document.getElementById("description").value;
  let adress = document.getElementById("adress").value;
  let phone = document.getElementById("phone").value;
  let category = document.getElementById("category").value;
  let lat = document.getElementById("coordLat").value;
  let lng = document.getElementById("coordLng").value;
  console.log(description, adress, phone, category, lat, lng);
  form.reset();
  modalForm.close();
  createMarker(description, adress, phone, category, lat, lng);
});

createMarker = (description, adress, phone, category, lat, lng) => {
  image = "./media/mixto.png";
  if (category === "Comercial") {
    image = "./media/comercial.png";
  }
  if (category === "Recidencial") {
    image = "./media/recidencial.png";
  }

  const marker = new google.maps.Marker({
    position: { lat: Number(lat), lng: Number(lng) },
    icon: {
      url: image,
      scaledSize: new google.maps.Size(31, 38),
    },
    map: map,
  });
  let content =
    "<strong>Descripción: </strong>" +
    (description.trim() !== "" ? description : adress) +
    "</br>";
  content += "<strong>Dirección: </strong>" + adress + "</br>";

  if (phone.trim() !== "") {
    content += "<strong>Teléfono: </strong>" + phone + "</br>";
  }

  content += "<strong>(X, Y): </strong>" + lat + ", " + lng + "</br>";
  content += "<strong>Categoría: </strong>" + category;

  let information = new google.maps.InfoWindow({
    content: content,
  });
  marker.addListener("click", function () {
    information.open(map, marker);
  });
  map.setCenter({ lat: Number(lat), lng: Number(lng) });
};

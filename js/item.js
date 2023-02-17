const sushiJSON = "https://raw.githubusercontent.com/Eclassic32/FoodDelivery/master/js/sushi.json";
const companyJSON = "https://raw.githubusercontent.com/Eclassic32/FoodDelivery/master/js/company.json";
let data = {};
let item;
const addressIndex = random(3)

if(window.location.search){
    const urlParams = new URLSearchParams(window.location.search);
    item = Number(urlParams.get('item'));
    console.log(`item: ${item}`);
} else { 
    window.open(`?item=`+random(15),"_self");
}

$.getJSON(sushiJSON, function(sushidata){
    data = sushidata[item];
    $.getJSON(companyJSON, function(compdata){
        data.company = compdata[data.company];
        console.log(data);
        
        $("main h1").text(data.name);
        $("main #amount span").text(data.amount);
        $("main p span").text(data.desc);
        $("main h3 span").text(data.price);
        $("main #address span").text(data.company.address[addressIndex]);
        $("main #company span").text(data.company.name);
        
        $("main img").attr("src", `./assets/sushi/${item}.jpg`);
        
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({address: data.company.map[addressIndex]}, function(results, status) {
            if (status === 'OK') {
              var coorComp = results[0].geometry.location;
              var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: coorComp,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
              });
    
              var startMarker = new google.maps.Marker({
                position: coorComp,
                map: map,
                label: {
                  text: "\ue57a",
                  fontFamily: "Material Icons",
                  color: "#ffffff",
                  fontSize: "16px",
                },
              });
            }
        });
    });
});

$("#buybtn").click(async function(event){
  const orderId = random(9000) + 1000;
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(buyItem, locationError);
      await window.open(`order.html?id=` + orderId,"_self");
    } else {
        $("#error").text("Geolocation is not supported by this browser.");
    }
    
    function buyItem(position){
        getPlaceIdFromCoords(position)
        .then(async function (placeId){
            // console.log('Place ID:', placeId);
            var order = {"place": placeId, "id": orderId, "item": item, "address": addressIndex};
            console.log(order);

            var cookie = getCookie("order");
            if(cookie == '') cookie = [];
            else cookie = JSON.parse(cookie);
            cookie.push(order);
            setCookie("order", JSON.stringify(cookie), 1);
            console.log(JSON.parse(getCookie("order")));

        }).catch(function(err){
            console.error('Error: ', err);
        });
    }
    
    function locationError(error) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            $("#error").text("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            $("#error").text("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            $("#error").text("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            $("#error").text("An unknown error occurred.");
            break;
        }
    }

    function getPlaceIdFromCoords(position) {
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var geocoder = new google.maps.Geocoder();
      
        return new Promise(function(resolve, reject) {
          geocoder.geocode({ 'location': latLng }, function(results, status) {
            if (status === 'OK') {
              if (results[0]) {
                resolve(results[0].place_id);
              } else {
                reject('No results found');
              }
            } else {
              reject('Geocoder failed due to: ' + status);
            }
          });
        });
      }
      
});

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function random(num){
    return Math.floor(Math.random()*num);
}
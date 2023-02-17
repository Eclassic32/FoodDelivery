const sushiJSON = "https://raw.githubusercontent.com/Eclassic32/FoodDelivery/master/js/sushi.json";
const companyJSON = "https://raw.githubusercontent.com/Eclassic32/FoodDelivery/master/js/company.json";
let data = {};
let id;

if(window.location.search){
    const urlParams = new URLSearchParams(window.location.search);
    id = Number(urlParams.get('id'));
    console.log(`id: ${id}`);
} else { 
    window.open('index.html',"_self");
}

var cookie = getCookie("order");
// var cookie = '[{"place": "ChIJz4TXtUJpgzgR4Fn4lkRG2YI", "id": 1234, "item": 7, "address": 2},{"place":"ChIJz4TXtUJpgzgR4Fn4lkRG2YI","id":2058,"item":3, "address": 1}]'
if (cookie != '' && getOrder(cookie, id) != false) {
    data = getOrder(cookie, id);
    console.log(data);
    
    $.getJSON(sushiJSON, function(sushidata){
        const sushi = sushidata[data.item];
        $.getJSON(companyJSON, async function(compdata){
            const company = compdata[sushi.company];
            console.log(sushi);
            console.log(company);

            await initMap(company.map[data.address], data.place);

            $("#id").text(id);
            $("#item").text(sushi.name);
            $("#company").text(company.name);
            $("#from").text(company.address[data.address]);

            // var dirData = await getDirections(company.map[data.address], data.place);
            // await console.log(dirData);

            // await $("#to").text(dirData.routes[0].legs[0].end_address);
            // await $("#time").text(dirData.routes[0].legs[0].duration.text);
        });
        
    });
    
    
} else {   
    window.open('index.html',"_self");
}

// async function getDirections(startAddress, endPlaceId) {
//     const language = "ru";

//     const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(startAddress)}&destination=place_id:${encodeURIComponent(endPlaceId)}&language=${language}&key=AIzaSyA5EFmXSwJxQS40ziJxK_shBAiWREJnqBU`;
//     const proxyUrl = "https://cors-anywhere.herokuapp.com/" + apiUrl;
//     try {
//         const response = await fetch(proxyUrl);
//         const data = await response.json();
//         console.log(data);
//         return data;
//     } catch (error) {
//         console.error("Error fetching directions data:", error);
//         return null;
//     }
//   }
  

function getOrder(cookie, id){
    try {
        cookie = JSON.parse(cookie);
        for (let i = 0; i < cookie.length; i++) {
            const el = cookie[i];
            if (el.id = id){
                return el;
            }
        }
        return false;
    } catch (e) {
        console.error(e);
        return false;
    }
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


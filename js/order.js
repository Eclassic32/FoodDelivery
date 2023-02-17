const sushiJSON = "https://raw.githubusercontent.com/Eclassic32/FoodDelivery/master/js/sushi.json";
const companyJSON = "https://raw.githubusercontent.com/Eclassic32/FoodDelivery/master/js/company.json";
let data = {};
let id;

if(window.location.search){
    const urlParams = new URLSearchParams(window.location.search);
    id = Number(urlParams.get('id'));
    console.log(`id: ${id}`);
} else { 
    // window.open('index.html',"_self");
}

// var cookie = getCookie("order");
var cookie = '[{"place": "ChIJz4TXtUJpgzgR4Fn4lkRG2YI", "id": 1234, "item": 7},{"place":"ChIJz4TXtUJpgzgR4Fn4lkRG2YI","id":2058,"item":3}]'
if (cookie != '' && getOrder(cookie, id) != false) {
    data = getOrder(cookie, id);
    console.log(data);
    
    $.getJSON(sushiJSON, function(sushidata){
        $("#id").text(sushidata[data.item].name);
    });

    $.getJSON(companyJSON, function(compdata){

    });
} else {   

}

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
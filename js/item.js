const sushiJSON = "https://raw.githubusercontent.com/Eclassic32/FoodDelivery/master/js/sushi.json";
const companyJSON = "https://raw.githubusercontent.com/Eclassic32/FoodDelivery/master/js/company.json";
let data = {};
let item;

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
        const addressIndex = random(data.company.address.length)
        
        $("main h1").text(data.name);
        $("main #amount span").text(data.amount);
        $("main p span").text(data.desc);
        $("main h3 span").text(data.price);
        $("main #address span").text(data.company.address[addressIndex]);
        $("main #company span").text(data.company.name);
        
        $("main img").attr("src", `./assets/sushi/${item}.jpg`);
    });
});





function random(num){
    return Math.floor(Math.random()*num);
}
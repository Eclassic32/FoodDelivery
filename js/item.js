const sushiJSON = "https://raw.githubusercontent.com/Eclassic32/FoodDelivery/master/js/sushi.json";
const companyJSON = "https://raw.githubusercontent.com/Eclassic32/FoodDelivery/master/js/company.json";
let data = {};
let item;

if(window.location.search){
    const urlParams = new URLSearchParams(window.location.search);
    item = Number(urlParams.get('item'));
    console.log(`item: ${item}`);
} else { 
    goToRandom();
}

$.getJSON(sushiJSON, function(sushidata){
    data = sushidata[item];
    $.getJSON(companyJSON, function(compdata){
        data.company = compdata[data.company];
        console.log(data);
        
        $("main h1").text(data.name);
        $("main h5 span").text(data.amount);
        $("main p span").text(data.desc);
        $("main h3 span").text(data.price);
        
        $("main img").attr("src", `./assets/sushi/${item}.jpg`);
    });
});





function goToRandom(){
    var num = Math.floor(Math.random()*15);
    window.open(`?item=${num}`,"_self");
}
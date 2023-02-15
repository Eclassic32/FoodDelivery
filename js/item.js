const jsonURL = "https://raw.githubusercontent.com/Eclassic32/FoodDelivery/master/js/sushi.json";
var data = {};

if(window.location.search){
    const urlParams = new URLSearchParams(window.location.search);
    item = Number(urlParams.get('item'));
    comp = String(urlParams.get('comp'));
    console.log(`item: ${gameId} \t company: ${comp}`);
} else { 
    goToBasic();
}

$.getJSON(jsonURL, function(sushidata){
    for (let i = 0; i < sushidata.length; i++) {
        if (comp == sushidata[i].company){
            try {
                data = sushidata[i].sushi[item];
            } catch (error) {
                console.log(error);
                goToBasic();
            }
            
        }
        
    }


    
    
});

function goToBasic(){
    window.open(`?item=0&comp=pakipaki`,"_self");
}
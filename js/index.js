const sushiJSON = "https://raw.githubusercontent.com/Eclassic32/FoodDelivery/master/js/sushi.json";

$.getJSON(sushiJSON, function(sushidata){
    console.log(sushidata)
    sushidata.forEach(item => {
        var sushiCard = `<div class="col-3 my-3">
                            <div class="card">
                                <img src="assets/sushi/${i}.jpg" class="card-img-top" alt="" style="height: 230px;">
                                <div class="card-body">
                                    <h4 class="card-title">${item.name}</h5>
                                    <p class="card-text">${item.desc}</p>
                                    <h5 id="amount" class="card-text">${item.amount} шт.</h4>
                                    <h5 id="price" class="card-text">${item.price} ₸</h4>
                                    <a href="item.html?item=${i}" class="btn btn-info">Заказать</a>
                                </div>
                            </div>
                        </div>`;
        $('#allSushi').append(sushiCard);
    });
});
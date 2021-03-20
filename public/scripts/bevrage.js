var imgEl = document.querySelector('#drinkimg')
var ingrdientEl = document.querySelector('#ingrdient')
var pourEl = document.querySelector('#pour')
var selectBtn = document.querySelector('#drinkpage')
//
var ingredientlist = [];
var obj = {};
var measurelist = [];
var obj_measure ={};
for (let i = 0; i < 15; i++) {
    ingredientlist[i] = "strIngredient"+(i+1);
    obj[i] = ingredientlist[i]
}

for (let i = 0; i < 15; i++) {
    measurelist[i] = "strMeasure"+(i+1);
    obj_measure[i] = measurelist[i]
}

function getCategories(catagory){
    var api_catagories = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + catagory;

    fetch(api_catagories)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var listID = [...Array(data.drinks.length).keys()];
        console.log(listID)
        var randomID = listID[Math.floor(Math.random() * listID.length)];
        console.log(randomID)
        var pairedDrink = data.drinks[randomID].strDrink;
        console.log(pairedDrink)
        getDrink(pairedDrink);
    });
}

function getDrink(pairedDrink) {
    var api_name = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + pairedDrink;
    fetch(api_name)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
            // put data to html
            // console.log(data.drinks[0].strDrink)
            // console.log(data.drinks[0].strInstructions)
            // console.log(data.drinks[0].strDrinkThumb)
            var pageurl = 'https://www.thecocktaildb.com/drink/' + data.drinks[0].idDrink;
            console.log(pageurl)
            selectBtn.setAttribute("href",pageurl);
            imgEl.setAttribute("src",data.drinks[0].strDrinkThumb);
            imgEl.setAttribute("alt",data.drinks[0].strDrink);

            for (let i = 0; i < 15; i++) {
                if (data.drinks[0][obj[i]] !== null){
                    // console.log(data.drinks[0][obj[i]])
                    // put data to html
                    var ingUl = document.createElement('ul');
                    var ingli = document.createElement('li');

                    ingli.textContent = data.drinks[0][obj[i]];
                    ingrdientEl.appendChild(ingUl);
                    ingUl.appendChild(ingli);
                }
            }

            for (let i = 0; i < 15; i++) {
                if (data.drinks[0][obj_measure[i]] !== null){
                    // console.log(data.drinks[0][obj_measure[i]])
                    var pourUl = document.createElement('ul');
                    var pourli = document.createElement('li');

                    pourli.textContent = data.drinks[0][obj_measure[i]];
                    pourEl.appendChild(pourUl);
                    pourUl.appendChild(pourli);
                }
            }
    });
};

getCategories('beer')
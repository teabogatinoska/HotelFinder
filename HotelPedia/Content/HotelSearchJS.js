﻿function checkCookie() {

    var brStars = getCookie("numStars");
    var brDollars = getCookie("cookieDollars");

    if (brStars != "" && brDollars != "") {

        document.getElementById("brojIzbraniZvezdi").innerHTML = brStars;
        document.getElementById("brojIzbraniDolari").innerHTML = brDollars;

        document.cookie = 'numStars=; Max-Age=0';
        document.cookie = 'cookieDollars=; Max-Age=0';

        var date = new Date();
        date.setTime(date.getTime() + (1 * 1000));

        getHotels();
    }
}

function getHotels() {

    var preneseni_stars = document.getElementById("brojIzbraniZvezdi").innerHTML.toString();
    var preneseni_dolars = document.getElementById("brojIzbraniDolari").innerHTML.toString();

    var arrHotels = document.getElementsByClassName('oneHotel');

//    var arrNewHotels = [...arrHotels];

//    var hotelStars = document.getElementsByClassName('brStars');
//    var hotelDolars = document.getElementsByClassName("brPrice");

//    var containerdiv = document.getElementsByClassName("hoteliContainer")[0];
//    var newcontainer = document.getElementById("newcontainer");

    var arrLength = arrHotels.length;

    for (var i = 1; i < arrLength + 1; i++) {

        var div_hotel = document.getElementById("hotel_" + i)
        var hotel_stars = div_hotel.querySelector('span[class=brStars]').textContent;
        var hotel_dollars = div_hotel.querySelector('span[class=brPrice]').textContent;

        if (hotel_stars === preneseni_stars && hotel_dollars === preneseni_dolars) {

            div_hotel.classList.remove("sokrienDiv");
            div_hotel.classList.add("oneHotel");
        }
        else {
            div_hotel.classList.remove("oneHotel");
            div_hotel.classList.add("sokrienDiv");
        }
    }

    // vaka bese pred 19.12.2020 

    /* document.getElementById("newcontainer").style.display = "inline";
 
     containerdiv.innerHTML = "";
     containerdiv.append(newcontainer);*/

    // do tuka

}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";";

}


function funcSort() {

    var arrHotels = document.getElementsByClassName('oneHotel');
    var arrZaSort = [];

    var sortOptions = document.getElementById('sortSelect');
    var sortChoice = sortOptions.value;

    for (var i = 0; i < arrHotels.length; i++) {

        if (sortChoice === "most_stars") {
            var child = arrHotels[i].querySelectorAll('.brStars');
            var sorterBy = 0 - child[0].textContent;
        }
        else if (sortChoice === "least_stars") {
            var child = arrHotels[i].querySelectorAll('.brStars');
            var sorterBy = child[0].textContent;
        }
        else if (sortChoice === "lowest_price") {
            var child = arrHotels[i].querySelectorAll('.brPrice');
            var sorterBy = child[0].textContent;
        }
        else if (sortChoice === "highest_price") {
            var child = arrHotels[i].querySelectorAll('.brPrice');
            var sorterBy = 0 - child[0].textContent;
        }
        else if (sortChoice === "center_closest") {
            var child = arrHotels[i].querySelectorAll('.distCenter');
            var sorterBy = child[0].textContent;
        }
        else if (sortChoice === "airport_closest") {
            var child = arrHotels[i].querySelectorAll('.distAirport');
            var sorterBy = child[0].textContent;
        }
        else if (sortChoice === "az") {
            var child = arrHotels[i].querySelectorAll('.imeAngHotel');
            var sorterBy = child[0].textContent;
        }
        else {
            var child = arrHotels[i].querySelectorAll('.imeAngHotel');
            var sorterBy = child[0].textContent;
        }

        arrZaSort.push([sorterBy, arrHotels[i]]);
    }

    arrZaSort.sort(function (a, b) {

        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }

    });

    console.log(arrZaSort);

    var hoteliContainer = document.getElementsByClassName("hoteliContainer")
    var conteinerDiv = hoteliContainer[0]
    conteinerDiv.innerHTML = ""

    for (var i = 0; i < arrZaSort.length; i++) {
        conteinerDiv.append(arrZaSort[i][1]);
    }

}

function funcFilter() {

    var arrHotels = document.getElementsByClassName('oneHotel');
    var arrNewHotels = [...arrHotels];

    var checkboxes = document.querySelectorAll('input[name="filtri"]:checked');
    console.log(checkboxes)

    var filters = [];
    checkboxes.forEach((checkbox) => {
        filters.push(checkbox.value);
    });
    console.log(filters);
    for (var i = 0; i < filters.length; i++) {

        var arrEmpty = [];


        for (var j = 0; j < arrNewHotels.length; j++) {
            //var distance = arrNewHotels[j].querySelector('span[class=distCenter1]');
            //console.log(distance);


            if (filters[i] === "distCenter1") {
                var distance = arrNewHotels[j].querySelector('span[class=distCenter1]');
                var value = distance.innerHTML.toString();

                if (value < "1") {
                    arrEmpty.push(arrNewHotels[j]);
                }
            }
            else if (filters[i] === "distCenter2") {
                var distance = arrNewHotels[j].querySelector('span[class=distCenter2]');
                var value = distance.innerHTML.toString();

                if (value < "2") {
                    arrEmpty.push(arrNewHotels[j]);
                }
            }
            else if (filters[i] === "distAirport") {
                var distance = arrNewHotels[j].querySelector('span[class=distAirport]');
                var value = distance.innerHTML.toString();

                if (value < "25") {
                    arrEmpty.push(arrNewHotels[j]);
                }
            }

            else {
                const zz = arrNewHotels[j].querySelector('span[class=' + filters[i] + ']');
                const zz2 = zz.querySelectorAll('input[class="check-box"]:checked');
                if (zz2[0] != undefined) {
                    arrEmpty.push(arrNewHotels[j]);
                }
            }
        }

        arrNewHotels = [];
        arrNewHotels = [...arrEmpty];

    }

    var innerhtml = "";

    for (var i = 0; i < arrNewHotels.length; i++) {

        innerhtml += arrNewHotels[i].innerHTML;
    }

    console.log("innerhtml:")
    console.log(innerhtml)

    var newcontainerFilters = document.getElementById("newcontainerFilters");
    newcontainerFilters.style.display = "inline";

    newcontainer.innerHTML = "";
    newcontainer.innerHTML = innerhtml;

    newcontainer.append(newcontainerFilters);


}

document.getElementById("idsubmit").addEventListener("click", function () {

    var arrHotels = document.getElementsByClassName('oneHotel');
    var arrNewHotels = [...arrHotels];

    var searchinput = document.getElementById("searchinput").value;
    var nameEN = document.getElementsByClassName('imeAngHotel');
    var nameMK = document.getElementsByClassName('imeMkHotel');

    var arrResult = [];

    for (var i = 0; i < arrNewHotels.length; i++) {

        if (nameEN[i].textContent.toLowerCase().includes(searchinput) || nameMK[i].textContent.toLowerCase().includes(searchinput)) {
            arrResult.push(arrNewHotels[i]);
        }
    }

    var innerhtml = "";

    for (var i = 0; i < arrResult.length; i++) {
        innerhtml += arrResult[i].innerHTML;
    }

    var newcontainerFilters = document.getElementById("newcontainerFilters");
    newcontainerFilters.style.display = "inline";

    newcontainer.innerHTML = "";
    newcontainer.innerHTML = innerhtml;

    newcontainer.append(newcontainerFilters);

});

﻿//Se povikuva na body on load i se filtriraat sprema izbraniot broj na zvezdi i dolari izbrani na prethodnata strana
function inicijalizacijaFunc() {

    //So Cookie gi prenesuva vrednostite na izbranite zvezdi i dolari
    var brStars = getCookie("numStars");
    var brDollars = getCookie("cookieDollars");

    if (brStars != "" && brDollars != "") {

        document.getElementById("brojIzbraniZvezdi").innerHTML = brStars;
        document.getElementById("brojIzbraniDolari").innerHTML = brDollars;

        //Se brisat cookies-ot 
        document.cookie = 'numStars=; Max-Age=0';
        document.cookie = 'cookieDollars=; Max-Age=0';

        var date = new Date();
        date.setTime(date.getTime() + (1 * 1000));

        var zvezdi = document.getElementById("brojIzbraniZvezdi").innerHTML;
        var starsContainer = document.getElementById('stars');
        var checkboxes = starsContainer.querySelectorAll('span');

        //Se prikazuva brojot na izbrani zvezdi i dolari vo html-ot
        for (var i = 4; i > zvezdi - 1; i--) {

            checkboxes[i].classList.add('nevidliva');
        }
        var dolari = document.getElementById("brojIzbraniDolari").innerHTML;
        var dollarsContainer = document.getElementById('dollarz');
        var checkDollar = dollarsContainer.querySelectorAll('span');
        for (var i = 2; i > dolari - 1; i--) {

            checkDollar[i].classList.add('nevidliva');
        }

        //Se povikuva funckijata za filtriranje
        funcFilter(1);
    }

}

//Funkcija za sortiranje na hoteli
function funcSort() {

    var arrHotels = document.getElementsByClassName('oneHotel'); // niza od site hoteli

    var temp = document.getElementsByClassName('idhotel'); // niza so spanovi so id na site hoteli
    var arrIds = [];

    for (var k = 0; k < temp.length; k++) {
        arrIds.push(temp[k].innerHTML); // vo arrIds se ids za sekoj hotel po redosled kako sto se na ekran
    }

    var arrZaSort = new Array(); // prazna niza kade sto ke se smestat sorter i hotelite i ke se sortiraat

    var sortOptions = document.getElementById('sortSelect'); // site mozni opcii za sortiranje
    var sortChoice = sortOptions.value; // izbranata opcija za sortiranje

    var child = "";
    var sorterBy = "";

    var flagAsc = true;

    // Se vrtat site hoteli
    for (var i = 0; i < arrHotels.length; i++) {

        child = "";
        sorterBy = "";

        imehotel = document.getElementById("imeAngHotel_" + i);
        idhotel = document.getElementById("hotel_" + i);

        // proverka za koja opcija za sortiranje e izbrana
        if (sortChoice === "most_stars") {
            flagAsc = false;
            child = document.getElementById("brStars_" + arrIds[i]) // go zema span-ot koj ja sodrzi vrednosta na zvezdi
            sorterBy = child.innerHTML; // ja zema vrednosta na zvezdi
        }
        else if (sortChoice === "least_stars") {
            child = document.getElementById("brStars_" + arrIds[i]) // go zema span-ot koj ja sodrzi vrednosta na zvezdi
            sorterBy = child.innerHTML; // ja zema vrednosta na zvezdi
        }
        else if (sortChoice === "lowest_price") {
            child = document.getElementById("brPrice_" + arrIds[i]) // go zema span-ot koj ja sodrzi vrednosta na cena
            sorterBy = child.innerHTML; // ja zema vrednosta na dolari
        }
        else if (sortChoice === "highest_price") {
            flagAsc = false;
            child = document.getElementById("brPrice_" + arrIds[i]) // go zema span-ot koj ja sodrzi vrednosta na cena
            sorterBy = child.innerHTML; // ja zema vrednosta na dolari
        }
        else if (sortChoice === "center_closest") {
            child = document.getElementById("distCenter1_" + arrIds[i]); // go zema span-ot koj ja sodrzi vrednosta na odalecenosta od centar
            sorterBy = parseFloat(child.innerHTML.toString()); // ja zema vrednosta na odalecenosta od centar
        }
        else if (sortChoice === "airport_closest") {
            child = document.getElementById("distAirport_" + arrIds[i]) // go zema span-ot koj ja sodrzi vrednosta na odalecenosta od aerodrom
            sorterBy = child.innerHTML; // ja zema vrednosta na odalecenosta od aerodrom
        }
        else if (sortChoice === "az") {
            child = document.getElementById("imeAngHotel_" + arrIds[i]) // go zema span-ot koj go sodrzi imeto na hotelot
            sorterBy = child.innerHTML; // go zema imeto na hotelot
        }
        else {
            child = document.getElementById("imeAngHotel_" + arrIds[i]) // go zema span-ot koj go sodrzi imeto na hotelot
            sorterBy = child.innerHTML; // go zema imeto na hotelot
        }

        arrZaSort.push(sorterBy + "!" + i); //se polni arrZaSort so sorterBy i redniot broj na hotelot vo originalnata area (pr. za i=0, hotelot e hotel_1)
    }

    // Opsta funckija za sortiranje
    if (flagAsc) {
        arrZaSort.sort(function (a, b) {
            if (a === b) {
                return 0;
            }
            else {
                return (a < b) ? -1 : 1;
            }
        });
    } else {
        arrZaSort.sort(function (a, b) {
            if (a === b) {
                return 0;
            }
            else {
                return (a > b) ? -1 : 1;
            }
        });
    }

    var elementOdArr = "";
    var strAll = "";
    var splitnato = [];
    var jj = 0;

    for (var i = 0; i < arrZaSort.length; i++) {

        elementOdArr = arrZaSort[i];

        splitnato = elementOdArr.split("!"); // odvoi spored "-" sorter od indeks vo arrHotels
        jj = splitnato[splitnato.length - 1]; // originalniot indeks na hotelot vo arrHotels e na krajot na redot posle "-"

        strAll += arrHotels[jj].outerHTML; // vo strAll dodavame html za hotelot, strAll na kraj ke bide celosniot html za site hoteli
    }

    document.getElementById("hoteliContainerId").innerHTML = strAll;
}

document.getElementById("idsubmit").addEventListener("click", function () {

    var arrHotels = document.getElementsByClassName('oneHotel'); // niza od site hoteli

    var searchinput = document.getElementById("searchinput").value.toLowerCase(); // search input

    var angIme = "";
    var mkIme = "";
    var ii = 0;
    var flag_imaHotel = false;

    for (var i = 0; i < arrHotels.length; i++) {

        ii = i + 1;
        angIme = document.getElementById("imeAngHotel_" + ii).innerText;
        mkIme = document.getElementById("imeMkHotel_" + ii).innerText;

        if (angIme.toLowerCase().includes(searchinput) || mkIme.toLowerCase().includes(searchinput)) {

            flag_imaHotel = true;
            arrHotels[i].classList.remove("sokrienDiv");  // pazi!!! ne smee da se referencira array so remove so classList
            arrHotels[i].classList.add("pokaziHotel");
            
        } else {
            arrHotels[i].classList.remove("pokaziHotel");
            arrHotels[i].classList.add("sokrienDiv");  // pazi!!! ne smee da se referencira array so remove so classList
        }   
    }


    if (!flag_imaHotel) { // nema nieden hotel koj go ispolnuva uslovot
        document.getElementById("noHotelsMatch").classList.remove("noHotelsMatchInvisible");
        document.getElementById("noHotelsMatch").classList.add("noHotelsMatchVisible");
    } else {
        document.getElementById("noHotelsMatch").classList.remove("noHotelsMatchVisible");
        document.getElementById("noHotelsMatch").classList.add("noHotelsMatchInvisible");
    }

});

document.getElementById("btnClearFilters").addEventListener("click", function () {

    var arrHotels = document.getElementsByClassName('oneHotel'); // niza od site hoteli

    for (var i = 0; i < arrHotels.length; i++) {
        arrHotels[i].classList.remove("sokrienDiv");  // pazi!!! ne smee da se referencira array so remove so classList
        arrHotels[i].classList.add("pokaziHotel");
    }

    //Resetiranje checked filtri
    //Se zema koi filtri se odbrani
    var checkboxes = document.querySelectorAll('input[name="filtri"]:checked');

    checkboxes.forEach((checkbox) => {
        
        checkbox.checked = false;
    });
});


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

//Se povikuva na body on load i se filtriraat sprema izbraniot broj na zvezdi i dolari izbrani na prethodnata strana
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


function funcFilter(nacinPovik) {


    //Se zema vrednosta na izbranite zvezdi i dolari
    var preneseni_stars = document.getElementById("brojIzbraniZvezdi").innerHTML.toString();
    var preneseni_dolars = document.getElementById("brojIzbraniDolari").innerHTML.toString();


    //Se zemaat site hoteli
    var arrHotels = document.getElementsByClassName('oneHotel');
    var arrLength = arrHotels.length;



    /*if (nacinPovik === 1) {
        console.log("povikana od body onload")
    } else {
        console.log("povikana onclick")
    }*/

    //Se zema koi filtri se odbrani
    var checkboxes = document.querySelectorAll('input[name="filtri"]:checked');

    var vw_filters = [];        // vo vw_filters se site filtri od view
    checkboxes.forEach((checkbox) => {
        vw_filters.push(checkbox.value);
    });


    var arr_rbr_hotel = []; //niza so rednite broevi na hotelite

    for (var i = 0; i < arrLength; i++) {

        var ime_hotel = arrHotels[i].id;
        arr_rbr_hotel.push(ime_hotel.substring(ime_hotel.lastIndexOf("_") + 1));
    }


    for (var i = 0; i < arrLength; i++) {  // gi vrti hotelite

        var rbr_hotel = arr_rbr_hotel[i]; // redniot broj na tekovniot hotel
        var div_hotel = document.getElementById("hotel_" + rbr_hotel); //go zema div-ot na tekovniot hotel

        var hotel_stars = div_hotel.querySelector('span[class=brStars]').textContent; //gi zema zvezdite na tekovniot hotel
        var hotel_dollars = div_hotel.querySelector('span[class=brPrice]').textContent; //ja zema cenata na tekovniot hotel

        var FLAG_TRGNI_HOTEL = false;

        // 1. Proverka za stars i dollars izbrani od home page
        if (!FLAG_TRGNI_HOTEL) {
            // Vleguva dokolku se sovpagjaat brojot na zvezdi i cenata so izbranite
            if (hotel_stars === preneseni_stars && hotel_dollars === preneseni_dolars) {

                FLAG_TRGNI_HOTEL = false;
            }
            else {
                FLAG_TRGNI_HOTEL = true;
            }
        }

        // 2. Proverka za filtri
        if (!FLAG_TRGNI_HOTEL) {

            for (var j = 0; j < vw_filters.length; j++) { // gi vrti selektiranite filtri

                // eden_filter_hotel primer: "parking_1"
                const eden_filter_hotel = document.getElementById(vw_filters[j] + "_" + rbr_hotel)

                // specijalni slucai za distance od center i distance od airport, koi ne se bool-----------

                // izbraniot filter e ditance from center < 1 km
                if (vw_filters[j] == "distCenter1") {

                    var distance = document.getElementById("distCenter1_" + rbr_hotel);
                    var value_distance = parseFloat(distance.innerHTML.toString());

                    if (value_distance < 1) {
                        FLAG_TRGNI_HOTEL = false;
                        break;
                    } else {
                        FLAG_TRGNI_HOTEL = true;
                    }
                }
                // izbraniot filter e ditance from center < 2 km
                else if (vw_filters[j] == "distCenter2") {

                    var distance = document.getElementById("distCenter2_" + rbr_hotel);
                    var value_distance = parseFloat(distance.innerHTML.toString());

                    if (value_distance < 2) {
                        FLAG_TRGNI_HOTEL = false;
                        break;
                    } else {
                        FLAG_TRGNI_HOTEL = true;
                    }
                }
                // izbraniot filter e ditance from center < 1 km
                else if (vw_filters[j] == "distAirport") {

                    var distance = document.getElementById("distAirport_" + rbr_hotel);
                    var value_distance = parseFloat(distance.innerHTML.toString());

                    if (value_distance < 25) {
                        FLAG_TRGNI_HOTEL = false;
                        break;
                    } else {
                        FLAG_TRGNI_HOTEL = true;
                    }
                }
                // kraj na specijalni slucai---------------------------------

                // ova e za boolean
                else {
                    // eden_filter_hotel primer: "parking" dali go ima hotelot
                    const eden_filter_hotel_checked = eden_filter_hotel.querySelectorAll('input[class="check-box"]:checked');

                    if (eden_filter_hotel_checked[0] == undefined) {
                        // ako vlegol ovde znaci deka go nema toj filter
                        FLAG_TRGNI_HOTEL = true;
                        break;
                    }
                } // end of else
            } // end of for (var j = 0; j < vw_filters.length; j++)
        } // end of if (!FLAG_TRGNI_HOTEL)



        // trganje hotel
        if (FLAG_TRGNI_HOTEL === true) {

            div_hotel.classList.remove("pokaziHotel"); // pazi!!! ne smee da se referencira array so remove so classList
            div_hotel.classList.add("sokrienDiv");

        } else {
            div_hotel.classList.remove("sokrienDiv");  // pazi!!! ne smee da se referencira array so remove so classList
            div_hotel.classList.add("pokaziHotel");
        }

    } // end of for (var i = 0; i < arrLength; i++) {  // gi vrti hotelite
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

    for (var i = 0; i < arrHotels.length; i++) {

        ii = i + 1;
        angIme = document.getElementById("imeAngHotel_" + ii).innerText;
        mkIme = document.getElementById("imeMkHotel_" + ii).innerText;

        if (angIme.toLowerCase().includes(searchinput) || mkIme.toLowerCase().includes(searchinput)) {

            arrHotels[i].classList.remove("sokrienDiv");  // pazi!!! ne smee da se referencira array so remove so classList
            arrHotels[i].classList.add("pokaziHotel");
        } else {
            arrHotels[i].classList.remove("pokaziHotel");
            arrHotels[i].classList.add("sokrienDiv");  // pazi!!! ne smee da se referencira array so remove so classList
        }   
    }

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

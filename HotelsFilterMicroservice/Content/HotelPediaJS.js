// Se povikuva koga kje se vcita stranata
document.addEventListener('DOMContentLoaded', function () {

    const allStarLabels = document.querySelectorAll('.rating label');

    // Funkcija za selektiranje zvezdi
    allStarLabels.forEach(thisLabel =>

        thisLabel.addEventListener('click', e => {
            e.preventDefault();
            let radioElement = e.target.previousElementSibling;
            radioElement.checked = !radioElement.checked;
            document.getElementById("brIzbraniStars").innerHTML = radioElement.value;

            var brStars = getCookie("numStars"); // se zema vrednosta na zvezdi preku cookie

            // Dokolku ima vrednost vo cookie, se brise
            if (brStars != "") {

                document.cookie = 'numStars=; Max-Age=0';

            }
            // Se stava vrednosta na izbrani zvezdi vo cookie
            setCookie("numStars", radioElement.value);

        })
    )
    var range = document.getElementById('myRange');

    // Funkcija za selektiranje dolari
    range.addEventListener('click', function () {
        var rangeValue = range.value;
        var brDollars = getCookie("cookieDollars"); // se zema vrednosta na dolari preku cookie
        // Dokolku ima vrednost vo cookie, se brise
        if (brDollars != "") {

            document.cookie = 'cookieDollars=; Max-Age=0';

        }
        // Se stava vrednosta na izbrani dolari vo cookie
        setCookie("cookieDollars", rangeValue);
    });
    
});


// Funckija za zemanje cookie 
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

// Funkcija za setiranje na cookie 
function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";";
}







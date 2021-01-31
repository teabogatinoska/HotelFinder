window.onload = function () {

    var brStars = getCookie("numStars");

    if (brStars != "") {

        document.cookie = 'numStars=; Max-Age=0;';

        var date = new Date();
        date.setTime(date.getTime() + (1 * 1000));
        document.cookie('numStars', "", { expires: date });  // expires after 1 second
    }

};

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

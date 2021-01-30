var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = 'Select Price';

slider.oninput = function() {

    if (this.value == 0) {
        output.innerHTML = 'Select Price';
    }
    else if (this.value==1) {
        output.innerHTML = '$';
    } else if (this.value==2) {
        output.innerHTML = '$$';
    } else if (this.value==3) {
        output.innerHTML = '$$$';
    }
};
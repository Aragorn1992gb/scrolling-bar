var flag;

var barHeigth = (document.getElementById("myContainer").clientHeight);
var textTop = (document.getElementById("text-container").offsetTop);

var textDeep = document.getElementById("text-container").textContent.length;
var scrollPercentage = 2;
var pxForTimes = (textDeep * scrollPercentage) / 100;

var pointClicked = 0;
var pxForTimesText = 0;


var pos = 0;
var pos2 = 0;

document.getElementById("myContainer").style.top = textTop.toString() + 'px';
document.getElementById("upButton").style.top = (textTop - 50).toString() + 'px';
document.getElementById("downButton").style.top = (textTop + barHeigth + 25).toString() + 'px';

function scrollDown(pixel) {
    document.getElementById("text-container").scrollTop += pixel;
}

function scrollUp(pixel) {
    document.getElementById("text-container").scrollTop -= pixel;
}

function moveBar1(event) {

    var elem = document.getElementById("myAnimation");
    var rect = elem.getBoundingClientRect();

    flag = false;
    var id = setInterval(frame, 10);
    function frame() {
        if (flag) {
            clearInterval(id);
        } else {
            pos += pxForTimes;
            scrollDown(pos);
            flag = true;
            elem.style.top = pos + 'px';
        }
    }

}

function moveBar2(event) {

    var elem = document.getElementById("myAnimation");

    var rect = elem.getBoundingClientRect();
    console.log("posizione elem " + rect.top);

    flag = false;
    var id = setInterval(frame, 10);
    function frame() {
        if (flag) {
            clearInterval(id);
        } else {
            if (event.clientY > rect.bottom + 25 || event.clientY < rect.top - 25) {

                pxForTimesText = (event.clientY * textDeep / document.getElementById('myContainer').clientHeight + (document.getElementById('myContainer').offsetTop / 2));


                if (event.clientY >= document.getElementById('myContainer').clientHeight - (document.getElementById('myContainer').offsetTop / 2)) {
                    pos = (document.getElementById('myContainer').clientHeight - document.getElementById('myContainer').offsetTop);
                    alert(pos);
                }

                else {
                    pos = (event.clientY - (document.getElementById('myContainer').offsetTop / 2)) - (document.getElementById('myAnimation').clientHeight);
                }

                document.getElementById("text-container").scrollTop = pxForTimesText;


            }
            else if (event.clientY < rect.top) {
                pos -= pxForTimes;
                scrollUp(pos);
            }
            else {
                pos += pxForTimes;
                scrollDown(pos);
            }
            flag = true;
            elem.style.top = pos + 'px';
        }
    }

}

(document.getElementById("myAnimation")).addEventListener("click", moveBar1);
(document.getElementById("myContainer")).addEventListener("click", moveBar2);

(document.getElementById("myAnimation")).addEventListener("touchstart", moveBar1);
(document.getElementById("myContainer")).addEventListener("touchstart", moveBar2);


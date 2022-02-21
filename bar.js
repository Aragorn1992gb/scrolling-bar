var flag;

    var barHeigth = (document.getElementById("containerBar").clientHeight);
    var textTop = (document.getElementById("text-container").offsetTop);
    var textHeight = (document.getElementById("text-container").clientHeight);

    var textDeep = document.getElementById("text-container-2").offsetHeight;

    var scrollPercentage = 5;
    var pxForTimes = (textDeep * scrollPercentage) / 100;

    var n = (textDeep - textHeight) / pxForTimes + 1;

	
	n = n <= 0 ? 1 : n
    var littleBarHeight = barHeigth / n;

    var pxForTimesText = 0;

    var pos = 0;

    var limitStep = 0;

    var contBar = document.getElementById("movingBar");
    contBar.style.height = littleBarHeight.toString() + 'px';

    var elementTxtContainer = document.getElementById('text-container');
    var positionTextTop = elementTxtContainer.getBoundingClientRect();
    var elementMvBar = document.getElementById("movingBar");

    document.getElementById("containerBar").style.top = textTop + "px";
    document.getElementById("upButton").style.top = (textTop - 50).toString() + 'px';
    document.getElementById("downButton").style.top = (textTop + barHeigth + 25).toString() + 'px';

    function scrollDown(pixel) {
      document.getElementById("text-container").scrollTop += pixel;
    }

    function scrollUp(pixel) {
      document.getElementById("text-container").scrollTop -= pixel;
    }

    function moveBar1(event) {

      var rect = elementMvBar.getBoundingClientRect();
      var bbMovement = rect.bottom - textTop;
      var btMovement = rect.top - textTop;

      flag = false;
      var id = setInterval(frame, 10);
      function frame() {
        if (flag) {
          clearInterval(id);
        } else {
          pos += littleBarHeight;
          scrollDown(pxForTimes);
          flag = true;

          if (bbMovement >= barHeigth - littleBarHeight) {
            pos = (barHeigth - littleBarHeight);
            elementMvBar.style.bottom = (barHeigth) + 'px';
          }
          elementMvBar.style.top = pos + 'px';
        }
      }
    }

    function moveBar2(event) {
      var clickedY = event.clientY - textTop;
      var rect = elementMvBar.getBoundingClientRect();
      var bbMovement = rect.bottom - textTop;
      var btMovement = rect.top - textTop;

      flag = false;
      var id = setInterval(frame, 10);
      function frame() {
        if (flag) {
          clearInterval(id);
        } else {
          if ((clickedY > (bbMovement + limitStep)) || (clickedY < (btMovement - limitStep))) {
            var jumpScrollPercent = (clickedY * 100) / barHeigth;
            pxForTimesText = (jumpScrollPercent * (textDeep - textHeight)) / 100;
            if (clickedY >= barHeigth - (littleBarHeight / 2)) {
              pos = (barHeigth - littleBarHeight);
              pxForTimesText = textDeep + textHeight;
            }
            else if (clickedY <= littleBarHeight / 2) {
              pos = 0;
              pxForTimesText = 0;
            }
            else {
              pos = clickedY - (littleBarHeight / 2);
            }
            document.getElementById("text-container").scrollTop = pxForTimesText;
          }
          else if (clickedY < btMovement) {
            if (clickedY <= littleBarHeight / 2) {
              pos = 0;
            }
            else {
              pos -= littleBarHeight;
            }
            scrollUp(pxForTimes);
          }
          else {

            if (clickedY >= barHeigth - (littleBarHeight / 2)) {
              pos = (barHeigth - littleBarHeight);
            }
            else {
              pos += littleBarHeight;
            }
            scrollDown(pxForTimes);
          }
          flag = true;
          elementMvBar.style.top = pos + 'px';
        }
      }
    }

    function moveBar1Up(event) {
      var rect = elementMvBar.getBoundingClientRect();
      var bbMovement = rect.bottom - textTop;
      var btMovement = rect.top - textTop;
      flag = false;
      var id = setInterval(frame, 10);
      function frame() {
        if (flag) {
          clearInterval(id);
        } else {
          pos -= littleBarHeight;
          scrollUp(pxForTimes);
          flag = true;

          if (pos < (littleBarHeight / 2))
            pos = 0;
          elementMvBar.style.top = pos + 'px';
        }
      }
    }

    (document.getElementById("movingBar")).addEventListener("click", moveBar1);
    (document.getElementById("containerBar")).addEventListener("click", moveBar2);
    (document.getElementById("movingBar")).addEventListener("touchstart", moveBar1);
    (document.getElementById("containerBar")).addEventListener("touchstart", moveBar2);
    (document.getElementById("upButton")).addEventListener("click", moveBar1Up);
    (document.getElementById("upButton")).addEventListener("touchstart", moveBar1Up);
    (document.getElementById("downButton")).addEventListener("click", moveBar1);
    (document.getElementById("downButton")).addEventListener("touchstart", moveBar1);
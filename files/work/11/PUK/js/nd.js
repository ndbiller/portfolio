/*--PUK-----------------------------*
 *                                  *
 *  Original Game by Laser Dog      *
 *  Javascript-Remake by ndbiller   *
 *                                  *
 *---------------------------nd.js--*/


//mouse to touch handler
function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

//call this in ready function to initialise mouse to touch handler
function init() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}

//center-funktion für zu platzierende objekte mit position:absolute in einem anderen position:absolute objekt 
function setCenter(obj) {
    var scrWidth = $(window).width();
    var scrHeight = $(window).height();
    var abstLeft = parseInt((scrWidth / 2) - ($(obj).width() / 2));
    var abstTop = parseInt((scrHeight / 2) - ($(obj).height() / 2));
    $(obj).css("left", abstLeft);
    $(obj).css("top", abstTop);
}

//hit test
function isHit(obj1, obj2) {
    var rect1 = obj1.getBoundingClientRect();
    var rect2 = obj2.getBoundingClientRect();
    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
}

//Random Number Generator
function rng(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

//Shuffle function für Arrays
function shuffleArray(array) {
    for (i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tempArray = array[i];
        array[i] = array[j];
        array[j] = tempArray;
    }
    return array;
}

//Errechne die Distanz in km mit zwei GPS-Positionen
function getDistanceFromGps(lat1, long1, lat2, long2) {
    var dist;
    var lat1 = parseFloat(lat1);
    var long1 = parseFloat(long1);
    var lat2 = parseFloat(lat2);
    var long2 = parseFloat(long2);
    var lat = (lat1 + lat2) / 2 * 0.01745;
    var dx = 111.3 * Math.cos(lat) * (long1 - long2);
    var dy = 111.3 * (lat1 - lat2);
    dist = Math.sqrt(dx * dx + dy * dy);
    return dist;
}

//Mausposition berrechnen und zurückgeben
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return{
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

//cut off excessive floating points...
function truncateDecimals (num, digits) {
    var numS = num.toString(),
        decPos = numS.indexOf('.'),
        substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
        trimmedResult = numS.substr(0, substrLength),
        finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;
    return parseFloat(finalResult);
}

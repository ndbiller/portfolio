/*--PUK-----------------------------*
 *                                  *
 *  Original Game by Laser Dog      *
 *  Javascript-Remake by ndbiller   *
 *                                  *
 *-------------------------main.js--*/

var inter;
var timeout;
var tick = 0;
var count;
var angleInRadians;
var vStartX;
var vStartY;
var vStopX;
var vStopY;
var dragging = false;
var points;
var targetsHit;
var level;
var gameOver = false;
var moving = false;
var speed = 20;
var friction = 0.98;
var xForce = speed;
var yForce = speed;
var dragTop;
var dragLeft;
var oLeft;
var oTop;
var myOldPosX;
var myOldPosY;
var myNewPosX;
var myNewPosY;

$(document).ready(
        function() {
            //console.log("seite geladen");
            init();
            createTitle();
        }
);

function gameLoop() {
    if (!gameOver) {
        //Countdown
        if (count <= 1000) {
            $("#lineLeftBox").css("width", "0px");
            $("#lineRightBox").css("width", "0px");
            $("#lineRightBox").css("left", "360px");
        }
        if (count <= 950) {
            $("#lineLeftBox").css("width", "9px");
            $("#lineRightBox").css("width", "9px");
            $("#lineRightBox").css("left", "351px");
        }
        if (count <= 900) {
            $("#lineLeftBox").css("width", "18px");
            $("#lineRightBox").css("width", "18px");
            $("#lineRightBox").css("left", "342px");
        }
        if (count <= 850) {
            $("#lineLeftBox").css("width", "27px");
            $("#lineRightBox").css("width", "27px");
            $("#lineRightBox").css("left", "333px");
        }
        if (count <= 800) {
            $("#lineLeftBox").css("width", "36px");
            $("#lineRightBox").css("width", "36px");
            $("#lineRightBox").css("left", "324px");
        }
        if (count <= 750) {
            $("#lineLeftBox").css("width", "45px");
            $("#lineRightBox").css("width", "45px");
            $("#lineRightBox").css("left", "315px");
        }
        if (count <= 700) {
            $("#lineLeftBox").css("width", "54px");
            $("#lineRightBox").css("width", "54px");
            $("#lineRightBox").css("left", "306px");
        }
        if (count <= 650) {
            $("#lineLeftBox").css("width", "63px");
            $("#lineRightBox").css("width", "63px");
            $("#lineRightBox").css("left", "297px");
        }
        if (count <= 600) {
            $("#lineLeftBox").css("width", "72px");
            $("#lineRightBox").css("width", "72px");
            $("#lineRightBox").css("left", "288px");
        }
        if (count <= 550) {
            $("#lineLeftBox").css("width", "81px");
            $("#lineRightBox").css("width", "81px");
            $("#lineRightBox").css("left", "279px");
        }
        if (count <= 500) {
            $("#lineLeftBox").css("width", "90px");
            $("#lineRightBox").css("width", "90px");
            $("#lineRightBox").css("left", "270px");
        }
        if (count <= 450) {
            $("#lineLeftBox").css("width", "99px");
            $("#lineRightBox").css("width", "99px");
            $("#lineRightBox").css("left", "261px");
        }
        if (count <= 400) {
            $("#lineLeftBox").css("width", "108px");
            $("#lineRightBox").css("width", "108px");
            $("#lineRightBox").css("left", "252px");
        }
        if (count <= 350) {
            $("#lineLeftBox").css("width", "117px");
            $("#lineRightBox").css("width", "117px");
            $("#lineRightBox").css("left", "243px");
        }
        if (count <= 300) {
            $("#lineLeftBox").css("width", "126px");
            $("#lineRightBox").css("width", "126px");
            $("#lineRightBox").css("left", "234px");
        }
        if (count <= 250) {
            $("#lineLeftBox").css("width", "135px");
            $("#lineRightBox").css("width", "135px");
            $("#lineRightBox").css("left", "225px");
        }
        if (count <= 200) {
            $("#lineLeftBox").css("width", "144px");
            $("#lineRightBox").css("width", "144px");
            $("#lineRightBox").css("left", "216px");
        }
        if (count <= 150) {
            $("#lineLeftBox").css("width", "153px");
            $("#lineRightBox").css("width", "153px");
            $("#lineRightBox").css("left", "207px");
        }
        if (count <= 100) {
            $("#lineLeftBox").css("width", "162px");
            $("#lineRightBox").css("width", "162px");
            $("#lineRightBox").css("left", "198px");
        }
        if (count <= 50) {
            $("#lineLeftBox").css("width", "171px");
            $("#lineRightBox").css("width", "171px");
            $("#lineRightBox").css("left", "189px");
        }
        if (count <= 0) {
            $("#lineLeftBox").css("width", "180px");
            $("#lineRightBox").css("width", "180px");
            $("#lineRightBox").css("left", "180px");
            //falls noch targets existieren, wenn die zeit vorbei ist...
            if (aData.length > 0) {
                gameOver = true;
            }
        }
        count--;
        //console.log("count::" + count);

        if (dragging) {
            tick--;
            //console.log("tick::" + tick);
            dragTop = $("#pukBox").offset().top - $("#gameBox").offset().top;
            //console.log("dragTop::" + dragTop);
            //stop drag-event at 500px
            if (dragTop <= 500) {
                //console.log("stop dragging here!");
                $("#pukBox").mouseup();
            }
            dragLeft = $("#pukBox").offset().left - $("#gameBox").offset().left;
            //console.log("dragTop::" + dragTop);
            //stop drag-event at 500px
            if (dragLeft <= 100 || dragLeft >= 200) {
                //console.log("stop dragging here!");
                $("#pukBox").mouseup();
            }
        }

        if (moving) {
            //disable draggable
            $("#pukBox").draggable("disable");
            //get current position
            oLeft = $("#pukBox").offset().left - $("#gameBox").offset().left;
            //console.log("oLeft::" + oLeft);
            oTop = $("#pukBox").offset().top - $("#gameBox").offset().top;
            //console.log("oTop::" + oTop);
            //save old position
            myOldPosX = truncateDecimals(oLeft, 1);
            //console.log("myOldPosX::"+myOldPosX);
            myOldPosY = truncateDecimals(oTop, 1);
            //console.log("myOldPosY::"+myOldPosY);

            //check for walls
            //top
            if (oTop <= 0) {
                //console.log("yForce::" + yForce);
//                if (yForce > 0) {
                yForce = yForce * (-1);
//                }
            }
            //bottom
            if (oTop > 580) {
                //console.log("yForce::" + yForce);
//                if (yForce <= 0) {
                yForce = yForce * (-1);
//                }
            }
            //left
            if (oLeft <= 0) {
                //console.log("xForce::" + xForce);
//                if (xForce <= 0) {
                xForce = xForce * (-1);
//                }  
            }
            //right
            if (oLeft > 300) {
                //console.log("xForce::" + xForce);
//                if (xForce > 0) {
                xForce = xForce * (-1);
//                } 
            }

            //apply friction to force
            xForce *= friction;
            yForce *= friction;
            //calculate movement
            oLeft += Math.cos(angleInRadians) * xForce;
            //console.log("oLeft::" + oLeft);
            oTop += Math.sin(angleInRadians) * yForce;
            //console.log("oTop::" + oTop);
            //set new position
            $("#pukBox").css("left", oLeft + "px");
            $("#pukBox").css("top", oTop + "px");
            //save new position
            myNewPosX = truncateDecimals(oLeft, 1);
            //console.log("myNewPosX::"+myNewPosX);
            myNewPosY = truncateDecimals(oTop, 1);
            //console.log("myNewPosY::"+myNewPosY);
            //puk stopped
            if (myNewPosX == myOldPosX && myNewPosY == myOldPosY) {
                //console.log("i stopped!");
                //$("#gameBox").css("background","green");
                setPuk();
            }
        }

        for (i in aData) {
            //Hit-Test
            if (isHit(document.getElementById(aData[i]), pukBox)) {
                //console.log("isHit");
                //get data-nr of hit target
                var nr = $("#" + aData[i]).attr("data-nr");
                //console.log("nr::" + nr);
                //calculate center for death-animation
                var xHit = (parseInt($("#t" + nr).attr("data-x")) + (parseInt($("#t" + nr).attr("data-size")) / 2)) + "px";
                //console.log("xHit::"+xHit);
                var yHit = (parseInt($("#t" + nr).attr("data-y")) + (parseInt($("#t" + nr).attr("data-size")) / 2)) + "px";
                //console.log("yHit::"+yHit);
                //add points to score
                points += (parseInt($("#t" + nr).attr("data-points") / parseInt($("#t" + nr).attr("data-size"))));
                //console.log("points::" + points);
                setPoints();

                //animate hit target
                $("#t" + nr).animate({width: "0px", height: "0px", top: yHit, left: xHit}, 250, function() {
                    /*putting the remove-code here still messes up my gameloop*/
                });

                //remove hit target from play and array
                $("#t" + nr).remove();
                aData.splice(i, 1);
                //console.log("aData::" + aData);
                targetsHit++;
                console.log("targetsHit::" + targetsHit);
                //reset the puk
                setPuk();
                //if it's the last one and there's still time left, reset level
                if (aData.length == 0 && count > 0) {
                    setPuk();
                    setTarget();
                    resetCount();
                }
            }
        }
    }
    //Game Over
    else {
        endScreen();
    }
}

function mUp() {
    //console.log("click");
    $(document).off("mouseup");
    createInstructions();
}

function mUpInstructions() {
    $(document).off("mouseup");
    timeout = window.setTimeout(createGame, 1000);
}

function mUpReplay() {
    //console.log("replay");
    $("#replayBox").off("mouseup");
    timeout = window.setTimeout(resetGame, 1000);
}

function mUpReturnToTitle(){
    //console.log("return to title");
    $("#returnToTitleBox").off("mouseup");
    timeout = window.setTimeout(returnToTitle, 1000);
}

function createTitle() {
    $(document).on("mouseup", function() {
        mUp();
    });
    $("#gameBox").append('<div id="titlePukBox"></div><div id="titlePukInnerBox"></div><div id="titleBox">P U K</div>');
}

function createInstructions() {
    $("#titlePukBox").remove();
    $("#titlePukInnerBox").remove();
    $("#titleBox").remove();
    $(document).on("mouseup", function() {
        mUpInstructions();
    });
    $("#gameBox").append('<div id="instructionsBox"><p>------------------------------------------</p>HOW TO PLAY<br><p>------------------------------------------<span>move the puk at the bottom of the screen by dragging it with your mouse towards the targets</span></p><p>------------------------------------------<span>hit all the targets in a level before the timer runs out to advance to the next</span></p><p>------------------------------------------</p></div>');
}

function createGame() {
    initializeSettings();
    $("#instructionsBox").remove();
}

function initializeSettings() {
    window.clearTimeout(timeout);
    points = 0;
    targetsHit = 0;
    level = -1;
    $("#gameBox").append('<div id="lineLeftBox"></div><div id="lineRightBox"></div><div id="pukBox" data-x="150" data-y="565"></div>');
    $("#pukBox").draggable(
            {containment: "parent"},
    {start: function() {
            dragStart();
        }},
    {drag: function() {
            //console.log("drag");
        }},
    {stop: function() {
            dragStop();
        }}
    );
    inter = setInterval("gameLoop()", 10);
    createScreen();
}

function createScreen() {
    //console.log("screen created");
    resetCount();
    setTarget();
    setPuk();
    setPoints();
}

function setPuk() {
    //end the move by setting moving to false and reseting variables
    moving = false;
    xForce = speed;
    yForce = speed;
    //disable the drag by manually firing the mouseup event
    $("#pukBox").mouseup();
    //set position
    var xPos = $("#pukBox").attr("data-x");
    $("#pukBox").css("left", xPos + "px");
    var yPos = $("#pukBox").attr("data-y");
    $("#pukBox").css("top", yPos + "px");
    //enable draggable
    $("#pukBox").draggable("enable");
}

function setTarget() {
    //remove old targets and clear aData
    $(".targets").remove();
    aData.length = 0;
    //set number of targets to be created
    var targetCount = rng(1, 10);
    //console.log("targetCount::" + targetCount);
    //create Targets
    for (i = 0; i < targetCount; i++) {
        $("#gameBox").append('<div id="t' + i + '" class="targets" data-nr="' + i + '" data-size="" data-x="" data-y="" data-points="15000"></div>');
        //set Size
        var size = rng(50, 100);
        //console.log("size::" + size);
        $("#t" + i).attr("data-size", size);
        $("#t" + i).css("width", size);
        $("#t" + i).css("height", size);
        //set Position
        //TODO: method to choose new position if it intersects with other target
        var xPos = rng(0, parseInt(360 - size));
        //console.log("xPos::" + xPos);
        $("#t" + i).attr("data-x", xPos);
        $("#t" + i).css("left", xPos + "px");
        var yPos = rng(0, parseInt(450 - size));
        //console.log("yPos::" + yPos);
        $("#t" + i).attr("data-y", yPos);
        $("#t" + i).css("top", yPos + "px");
        //save created target in array
        aData.push("t" + i);
    }
    //console.log("aData::" + aData);
}

//TODO: method to draw random obstacles to switch up gameplay

//TODO: method to animate some targets (maybe target collisions, all targets moving on bounce, etc.)

//TODO: reset puk manually method (to speed up gameplay)

//TODO: timer bars should look different from walls

//TODO: timer counter (digits)

//TODO: sound effects and music

function dragStart() {
    //console.log("start");
    tick = 50;
    dragTop = "";
    dragging = true;
    vStartX = "";
    vStartY = "";
    vStartX = parseInt($("#pukBox").offset().left - $("#gameBox").offset().left);
    vStartY = parseInt($("#pukBox").offset().top - $("#gameBox").offset().top);
    //console.log("vStartX::" + vStartX + "//vStartY::" + vStartY);
}

function dragStop() {
    //console.log("stop");
    dragging = false;
    vStopX = "";
    vStopY = "";
    vStopX = parseInt($("#pukBox").offset().left - $("#gameBox").offset().left);
    vStopY = parseInt($("#pukBox").offset().top - $("#gameBox").offset().top);
    //console.log("vStopX::" + vStopX + "//vStopY::" + vStopY);
    calculateForces();
}

function calculateForces() {
    //console.log("calculateForces:");
    angleInRadians = "";
    angleInRadians = Math.atan2((vStopY - vStartY), (vStopX - vStartX));
    //console.log("angleInRadians::" + angleInRadians);
    moving = true;
}

function setPoints() {
    $("#scoreBox").css("opacity","1");
    $("#scoreBox").html("SCORE : " + points);
}

function resetCount() {
    count = 1000;
    level++;
    console.log("level::" + level);
}

function endScreen() {
//    $("#gameBox").css("background", "green");
//    $("#pukBox").css("background","green");
    $("#gameBox").append("<div id='gameOverBox'>X</div>");
    $("#gameBox").append("<div id='replayBox'><br>replay</div>");
    $("#scoreBox").animate({top: "63px",opacity:"1"}, 500);
    $("#gameBox").append("<div id='targetsHitBox'>TARGETS HIT : " + targetsHit + "</div>");
    $("#targetsHitBox").animate({top: "33px",opacity:"1"}, 500);
    $("#gameBox").append("<div id='levelBox'>LEVEL CLEARED : " + level + "</div>");
    $("#levelBox").animate({top: "3px",opacity:"1"}, 500);
    $("#gameBox").append('<div id="ndBox"><a href="https://ndbiller.github.io/portfolio/index.html"><br>nd</a></div>');
    $("#gameBox").append('<div id="returnToTitleBox">X</div>');
    $("#returnToTitleBox").on("mouseup", function() {
        mUpReturnToTitle();
    });
    $("#replayBox").on("mouseup", function() {
        mUpReplay();
    });
    $("#pukBox").draggable("disable");
    $("#pukBox").remove();
    aData.length = 0;
    $(".targets").remove();
    clearInterval(inter);
}

function resetGame() {
    console.log("resetGame");
    initializeSettings();
    $("#gameOverBox").remove();
    $("#replayBox").remove();
    $("#lineLeftBox").remove();
    $("#lineRightBox").remove();
    $("#ndBox").remove();
    $("#returnToTitleBox").remove();
    $("#targetsHitBox").animate({top: "-20px",opacity:"0"}, 500, function() {
        $("#targetsHitBox").remove();
    });
    $("#levelBox").animate({top: "-20px",opacity:"0"}, 500, function() {
        $("#levelBox").remove();
    });
    $("#scoreBox").animate({top: "10px",opacity:"1"}, 500);
    gameOver = false;
}

function returnToTitle(){
    $("#gameOverBox").remove();
    $("#replayBox").remove();
    $("#lineLeftBox").remove();
    $("#lineRightBox").remove();
    $("#ndBox").animate({left:"-75px",opacity:"0"}, 500, function() {
        $("#ndBox").remove();
    });
    $("#returnToTitleBox").animate({left:"435px",opacity:"0"}, 500, function() {
        $("#returnToTitleBox").remove();
    });
    $("#targetsHitBox").animate({top: "-20px",opacity:"0"}, 500, function() {
        $("#targetsHitBox").remove();
    });
    $("#levelBox").animate({top: "-20px",opacity:"0"}, 500, function() {
        $("#levelBox").remove();
    });
    $("#scoreBox").animate({top: "10px",opacity:"0"}, 500);
    gameOver = false;
    createTitle();
}













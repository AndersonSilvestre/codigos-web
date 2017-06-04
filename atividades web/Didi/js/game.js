var itemGridSelected;
var itemGridSelectedCross;
var itemGridSelectedCircle;
var itemGridSelectable  = ["a1","b1","c1","a2","b2","c2","a3","b3","c3"];
var itemGridAvailable;
var winnerCombinations = [
    ["a1","b1","c1"],
    ["a2","b2","c2"],
    ["a3","b3","c3"],
    ["a1","a2","a3"],
    ["b1","b2","b3",],
    ["c1","c2","c3"],
    ["a1","b2","c3"],
    ["c1","b2","a3"]
];
var whoStart = 0; // 0 = circle | 1 = cross
var whoPlayed; // 0 = circle | 1 = cross
var winner = -1; // 0 = circle | 1 = cross | -1 null

function alertMsg(msg){
    $("#msg").text(msg).show();
}
 
function rand(min,max){
    return Math.floor(Math.random()*max)+(min);
}

$(function(){
    startGame();
});
 
function restartGame(){
    if(whoStart == 1){
        whoStart = 0;
    }else{
        whoStart = 1;
    };
    setTimeout(function(){
        startGame();
    },2000);
}
 
function startGame(){
    $('.itemGrid').not('.noEvent').bind('click',clickGrid);
    $("#msg").hide();
    winner = -1;
    itemGridSelected    = [];
    itemGridSelectedCross   = [];
    itemGridSelectedCircle  = [];
    itemGridAvailable   = ["a1","b1","c1","a2","b2","c2","a3","b3","c3"];
 
    $('.itemGrid').not('.noEvent').removeClass('circle cross');
    if(whoStart == 1){
        playCPU();
    }
}
 
 
 
function clickGrid(){
    o = $(this);
    _id = o.attr('id');
    if($.inArray(_id, itemGridSelected) == -1){
        itemGridSelected.push(_id);
        itemGridSelectedCircle.push(_id);
        o.addClass('circle');
        whoPlayed = 0;
        reloadAvailableItem();
    }
}
 
function reloadAvailableItem(){
    itemGridAvailable = [];
    $.each(itemGridSelectable, function(k,v){
        if($.inArray(v, itemGridSelected) == -1){
            itemGridAvailable.push(v);
        }
    });
    if(hasWinner()){
        if(winner == 0){
            _points = new Number($("#circle").text());
            _points = _points + 1;
            $("#circle").text(_points);
            alertMsg("No Céu tem Pão!");
        }else{
            _points = new Number($("#cross").text());
            _points = _points + 1;
            $("#cross").text(_points);
            alertMsg("No céu não tem pão!");
        }
        restartGame();
    }else{
        if(itemGridAvailable.length == 0){
            alertMsg("E morreu.");
            $('.itemGrid').not('.noEvent').unbind('click');
            restartGame();
        }else{
             
            if(whoPlayed == 0){
                playCPU();
            }
        }
         
    }
}
 
function hasWinner(){
     
    $.each(winnerCombinations, function(key,combination){
        crossCount = 0;
        circleCount = 0;
        $.each(combination, function(k,v){
            if($.inArray(v,itemGridSelectedCircle) != -1){
                circleCount++;
            }
             
            if($.inArray(v,itemGridSelectedCross) != -1){
                crossCount++;
            }
             
            if(circleCount == 3){
                $('.itemGrid').not('.noEvent').unbind('click');
                winner = 0;
                return;
            }
             
            if(crossCount == 3){
                $('.itemGrid').not('.noEvent').unbind('click');
                winner = 1;
                return;
                 
            }
        });
    });
    if(winner != -1){
        return true;
    }else{
        return false;
    }
}
 
function playCPU(){
    _index = rand(0,itemGridAvailable.length);
    _id = itemGridAvailable[_index];
    o = $("#"+_id);
    itemGridSelected.push(_id);
    itemGridSelectedCross.push(_id);
    o.addClass('cross');
    whoPlayed = 1;
    reloadAvailableItem();
     
}
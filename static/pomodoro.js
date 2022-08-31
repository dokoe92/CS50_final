var start = document.getElementById("start");
var pause = document.getElementById("pause");
var reset = document.getElementById("reset");

var set_pomodoro = document.getElementById("set_pomodoro");
var set_short_break = document.getElementById("set_short_break");
var set_long_break = document.getElementById("set_long_break");

var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");



// store a reference to the variable
var startTimer = null;

function timer(){
    if (minutes.value == 0 && seconds.value == 0){
        minutes.value = 0;
        seconds.value = 0;
    }
    else if (seconds.value != 0){
        seconds.value--;
        seconds.innterHTML = format(seconds);
    }
    else if (minutes.value != 0 && seconds.value == 0){
        seconds.value = 59;
        minutes.value--;
        minutes.innerHTML = format(minutes);
    }
}

function stopTimer(){
    clearInterval(startTimer);
}

start.addEventListener("click", function(){
    //initialize the variable startTimer
    function startInterval(){
        startTimer = setInterval(function(){
            timer();
        }, 1000)
    }
    startInterval()
})

pause.addEventListener("click", function(){
    stopTimer();
})



set_pomodoro.addEventListener("click", function(){
    stopTimer();
    minutes.value = 25;
    seconds.value = 00;
    minutes.innerHTML = format(minutes);
    seconds.innerHTML = format(seconds);
    reset.addEventListener("click", function(){
        minutes.value = 25;
        seconds.value = 00;
        minutes.innerHTML = format(minutes);
        seconds.innerHTML = format(seconds);
        stopTimer();
    })

})

set_short_break.addEventListener("click", function(){
    stopTimer();
    minutes.value = 05;
    seconds.value = 00;
    minutes.innerHTML = format(minutes);
    seconds.innerHTML = format(seconds);
    reset.addEventListener("click", function(){
        minutes.value = 05;
        seconds.value = 00;
        minutes.innerHTML = format(minutes);
        seconds.innerHTML = format(seconds);
        stopTimer();
    })
})

set_long_break.addEventListener("click", function(){
    stopTimer();
    minutes.value = 15;
    seconds.value = 00;
    minutes.innerHTML = format(minutes);
    seconds.innerHTML = format(seconds);
    reset.addEventListener("click", function(){
        minutes.value = 15;
        seconds.value = 00;
        minutes.innerHTML = format(minutes);
        seconds.innerHTML = format(seconds);
        stopTimer();
    })
})




//helpers//
function format(input){
    if(input.value.length == 1){
        return input.value = "0" + input.value;
    }
    else return input.value
}


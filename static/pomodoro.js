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
var pomodoro_counter = 0;
var pomodoro_true = true;
var click_count = 0;
var timer_sound = new Audio("static/Analog-alarm-clock-bell-rings-short-sound-effect.mp3");


function timer(){
    if (minutes.value == 0 && seconds.value == 0){
        minutes.value = 0;
        seconds.value = 0;
        minutes.innerHTML = format(minutes);
        seconds.innerHTML = format(seconds);
        if (pomodoro_true == true){
            pomodoro_counter++;
            stopTimer();
            send_pomodoro_backend();
            pomodoro_counter = 0;
            timer_sound.play();
            alert("Pomodoro finished!");
        }
        if (pomodoro_true == false) {
            stopTimer();
            timer_sound.play();
            alert("Pause finished!");
        }
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


// Add eventlisteners to buttons
start.addEventListener("click", function(){
    //initialize the variable startTimer
    if (click_count == 0){
        click_count = 1;
        function startInterval(){
            startTimer = setInterval(function(){
                timer();
            }, 1000)
        }
        startInterval()
    }
})

pause.addEventListener("click", function(){
    stopTimer();
    click_count = 0;
})

reset.addEventListener("click", function(){
    stopTimer();
    click_count = 0;
    minutes.value = 25;
    seconds.value = 00;
    minutes.innerHTML = format(minutes);
    seconds.innerHTML = format(seconds);
})


set_pomodoro.addEventListener("click", function(){
    stopTimer();
    minutes.value = 25;
    seconds.value = 00;
    pomodoro_true = true;
    minutes.innerHTML = format(minutes);
    seconds.innerHTML = format(seconds);
    reset.addEventListener("click", function(){
        click_count = 0;
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
    pomodoro_true = false;
    minutes.innerHTML = format(minutes);
    seconds.innerHTML = format(seconds);
    reset.addEventListener("click", function(){
        click_count = 0;
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
    pomodoro_true = false;
    minutes.innerHTML = format(minutes);
    seconds.innerHTML = format(seconds);
    reset.addEventListener("click", function(){
        click_count = 0;
        minutes.value = 15;
        seconds.value = 00;
        minutes.innerHTML = format(minutes);
        seconds.innerHTML = format(seconds);
        stopTimer();
    })
})


//helpers
function format(input){
    if(input.value.length == 1){
        return input.value = "0" + input.value;
    }
    else return input.value
}

//Send JSON of pomodoro_counter to Python with AJAX
function send_pomodoro_backend() {
    const dict_values = {pomodoro_counter}
    const s = JSON.stringify(dict_values);
    console.log(s)

    $.ajax({
        url:"/pomodoro",
        type:"POST",
        contentType: "application/json",
        data: JSON.stringify(s)
    })
}
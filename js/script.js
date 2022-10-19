$(document).ready(function(){
    const measure = $('select#measure')
    const ammount = $('input#num')
    const timer = $('#timer-group')
    const s = $('#detik')
    const m = $('#menit')
    const h = $(timer).find('.hours')

    const getMinutes = $('input#minutes')
    const getSeconds = $('input#seconds')

    var seconds = 0
    var minutes = 0
    var hours = 0

    var interval = null;

    var clockType = undefined;


    //Ketika klik tombol countdown
    $('button#start-button').on('click', function(){
        if($(getMinutes).val() != '' && $(getSeconds).val() > 0) {
            clockType = 'countdown'
            startClock()
        }
        else if ($(ammount).val() == '') {
            alert('Type in the Ammount')
        }
        else if ($(measure).val() == 0) {
            alert('Select the Unit')
        }
    })


    //Ketika klik stopwatch
    $('button#start-cronometer').on('click', function(){
        clockType = 'cronometer'
        if ($(ammount).val() != '' && $(measure).val() == 0) {
            alert('Select the Unit')
        } else if ($(ammount).val() > -1) {
            startClock()
        }
    })

    $('button#stop-timer').on('click', function() {
        pauseClock()
    })

    $('button#reset-timer').on('click', function() {
        restartClock()
    })

    $('button#resume-timer').on('click', function () {
        $('button#resume-timer').fadeOut(100)
        $('button#reset-timer').fadeOut(100)
        switch (clockType) {
            case 'countdown':
                countdown()
                break
            default:
                break;
        }
    })

    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString()
    }


    //Perintah jalan
    function startClock() {
        hasStarted = false
        hasEnded = false

        seconds = 0
        minutes = 0
        hours = 0

        
        if ($(getMinutes).val() > 60) {
            let hou = Math.floor($(getMinutes).val() / 60)
            hours = hou
            let min = Math.floor(($(getMinutes).val() - (hou * 60)))
            minutes = min;
            seconds = $(getSeconds).val()
        }else{
            minutes = $(getMinutes).val()
            seconds = $(getSeconds).val()
        }
            
        if (seconds <= 10 && clockType == 'countdown' && minutes == 0) {
            $(timer).find('h1').addClass('red')
        }

        refreshClock()

        $('.input-wrapper').slideUp(350) //menghilangkan inputan

        //hitung mundur
        setTimeout(function () {
            $('#timer-group').fadeIn(350)
            $('#stop-timer').fadeIn(350)
        }, 350)

        switch (clockType) {
            case 'countdown':
                countdown()
                break
            default:
                break;
        }
    }


    //Perintah reset 1
    function restartClock() {
        clear(interval)
        hasStarted = false
        hasEnded = false

        seconds = 0
        minutes = 0
        hours = 0

        $(s).text('00')
        $(m).text('00')
        $(h).text('00')

        $(timer).find('span').removeClass('red')

        $('#timer-group').fadeOut(350)
        $('#stop-timer').fadeOut(100)
        $('button#resume-timer').fadeOut(100)
        $('button#reset-timer').fadeOut(100)
        setTimeout(function(){
            $('.input-wrapper').slideDown(350)
        },350)
    }


    //Perintah Pause
    function pauseClock() {
        clear(interval)
        $('#resume-timer').fadeIn()
        $('#reset-timer').fadeIn()
    }

    var hasStarted = false
    var hasEnded = false
    if (hours == 0 && minutes == 0 && seconds == 0 && hasStarted == true) {
        hasEnded = true
    }


    //Perintah Countdown
    function countdown() {
        hasStarted = true
        interval = setInterval(() => {
            if(hasEnded == false) {
                if (seconds <= 11 && minutes == 0) {
                    $(timer).find('span').addClass('red')
                }

                if(seconds > 0) {
                    seconds--
                    refreshClock()
                }
                else if (seconds == 0) {
                    minutes--
                    seconds = 59
                    refreshClock()
                }
            }
            else {
                restartClock()
            }

        }, 1000)

    }

    //Perintah Stopwatch
    function cronometer() {
        hasStarted = true
        interval = setInterval(() => {
            if (seconds < 59) {
                seconds++
                refreshClock()
            }
            else if (seconds == 59) {
                minutes++
                seconds = 0
                refreshClock()
            }

            if (minutes == 60) {
                hours++
                minutes = 0
                seconds = 0
                refreshClock()
            }

        }, 1000)
    }


    //Perintah finish
    function refreshClock() {
        $('#seconds').val(pad(seconds))
        $('#minutes').val(pad(minutes))

        if (minutes == 0 && seconds == 0 && hasStarted == true) {
            hasEnded = true
            alert('The Timer has Ended !')
        }
    }


    //Perintah clear
    function clear(intervalID) {
        clearInterval(intervalID)
        console.log('cleared the interval called ' + intervalID)
    }
})
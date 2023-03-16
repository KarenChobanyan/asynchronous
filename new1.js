"use strict"

class Clock {
    constructor(hour, minute, second) {
        this.hour = hour
        this.minute = minute
        this.second = second
    }
    start() {
        setInterval(() => {
            this.second += 1
            if (this.second > 59) {
                this.minute += 1
                this.second -= 60
                if (this.minute > 59) {
                    this.hour += 1
                    this.minute -= 60
                    if (this.hour > 23) {
                        this.hour -= 24
                    }
                }
            }
        }, 1000)
    };
    getTimeInMs(hour,min,second){
        if(!min){
            min = 0
        }
        if(!second){
            second = 0
        }
        return (hour * 60 * 60 *1000) + (min * 60 * 1000) + (second * 1000)
    }
    
    setAlert(hour, minute) {
        let forTimer = 0
        let clockTimeInMs = this.getTimeInMs(this.hour,this.minute,this.second)
        return new Promise((resolve) => {
            
        let alertTimeInMs = this.getTimeInMs.call(null,hour,minute)
        if(alertTimeInMs>clockTimeInMs){
          forTimer = alertTimeInMs - clockTimeInMs
        }else{
            forTimer = this.getTimeInMs(24) - (clockTimeInMs - alertTimeInMs)
        }
            setTimeout(() => {
                resolve()
            }, forTimer)
        })
    }

    get time() {
        return this.hour + " : " + this.minute + " : " + this.second
    }
}

let clock = new Clock(2,7,25)
clock.start()
clock.setAlert(10,0).then(() => console.log("Wake up",  clock.time));
clock.setAlert(11,10).then((result) => console.log("WAKE UP!It's too late", clock.time));
clock.setAlert(12,20).then((result) => console.log("Alright! Don't give up on your dreams.Keep sleeping", clock.time));




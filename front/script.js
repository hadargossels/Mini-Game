$(document).ready(function () {
    $("#landedon3-bg").hide();
    $("#dice").children().hide()    

    function dragElement(elmnt) {
    $("#background").css({"cursor": "grab"})
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        elmnt.onmousedown = dragMouseDown;


    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmousedown = null;
            document.onmouseup = null;
            document.onmousemove = null;
            $("#background").css({"cursor": "auto"})
        }
    }

    $("#white-circle").click(() => {
        return dragElement(document.getElementById("background"))
    }        
    )

    function rollDice () {
        return Math.floor(Math.random() * 6) + 1;
    }

    let message = false
    let apiKey = '1be9a6884abd4c3ea143b59ca317c6b2';
    let ip = $.getJSON('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey, function(data) {
            return(data.ip_address);
        });
    let logId = $.get( "http://localhost:5000/log", function( data ) {
        return (data.recordset.length)
      });

    $("#roll-dice-div").click(function move() {
        $("#dice").children().hide()
        let IP = ip.responseJSON.ip_address
        let LogId = logId.responseJSON.recordset.length + 2
        let dice = rollDice()
        let pos =  1
        let text = ""
        let win = ""
        let logObj = {
            id: LogId,
            ip: IP
        }
        let logData = []

        logData.push({...logObj, action: `Start Game`, dateTime: new Date})
        LogId++ 
        logData.push({...logObj, id: LogId, action: `User got ${dice}`, dateTime: new Date}) 
        LogId++
        
        for (let index = 1; index <= dice; index++) {
            
            pos = pos + 1
            
            if (pos > 6) {pos = pos - 6}
            //animate
            
            if (message === false) {
                if (pos === 2) {$( "#player" ).animate({ "left": "+=800px" }, "slow" )}
                else if (pos === 3) {$( "#player" ).animate({ "left": "+=500px" }, "slow" )}
                else if (pos === 4) {$( "#player" ).animate({ "left": "-=500px", "top": "+=500px" }, "slow" )}
                else if (pos === 5) {$( "#player" ).animate({ "left": "-=1000px", "top": "+=200px" }, "slow" )}
                else if (pos === 6) {$( "#player" ).animate({ "left": "+=1400px"}, "slow" )}
                else if (pos === 1) {$( "#player" ).animate({ "left": "-=1400px", "top": "-=800px" }, "slow" )}
                
            }
            
            else if (message === true) {
                if (pos === 2) {$( "#player" ).animate({ "left": "+=1400px"}, "slow" )}
                else if (pos === 3) {$( "#player" ).animate({ "left": "-=1400px", "top": "-=800px" }, "slow" )}
                else if (pos === 4) {$( "#player" ).animate({ "left": "+=800px" }, "slow" )}
                else if (pos === 5) {$( "#player" ).animate({ "left": "+=500px" }, "slow" )}
                else if (pos === 6) {$( "#player" ).animate({ "left": "-=500px", "top": "+=500px" }, "slow" )}
                else if (pos === 1) {$( "#player" ).animate({ "left": "-=1000px", "top": "+=200px" }, "slow" )}
                message = false   
            }
            
            
        }
        timeoutFlag = true
        if (pos === 1) {
            text = "You came back to the same place."
            win = "You Lose!"
            message = false
            $("#dice img:nth-child(0)").show()
            logData.push({...logObj, id: LogId, action: `User got back to the pirate`, dateTime: new Date})
            LogId++
        }
        else if (pos === 2) {
            let rand = Math.floor(Math.random() * 2)
            if (rand === 0) {
                text = "The Rum is spoiled!"
                win = "You Lose!"
                logData.push({...logObj, id: LogId, action: `User got spoild rum`, dateTime: new Date})
                LogId++
                
            }
            else if (rand === 1) {
                text = "You have found Rum!"
                win = "You Win!"
                logData.push({...logObj, id: LogId, action: `User got good rum`, dateTime: new Date})
                LogId++
            }
            $("#dice img:nth-child(1)").show()
            message = false 
        }
        else if (pos === 3) {
            text = "You have got eaten by a dragon!"
            win = "You Lose!"
            logData.push({...logObj, id: LogId, action: `User got eaten by a dragon`, dateTime: new Date})
            LogId++
            $("#dice img:nth-child(2)").show()
            message = false
        }
        else if (pos === 4) {
            text = "You have found a treasure!"
            win = "You Win!"
            logData.push({...logObj, id: LogId, action: `User have found a treasure`, dateTime: new Date})
            LogId++
            $("#dice img:nth-child(3)").show()
            message = false
        }
        else if (pos === 5) {
            messageIndex = Math.floor(Math.random() * 3) + 1;

            function makeRequest (method, url, done) {
                var xhr = new XMLHttpRequest();
                xhr.open(method, url);
                xhr.onload = function () {
                  done(null, xhr.response);
                };
                xhr.onerror = function () {
                  done(xhr.response);
                };
                xhr.send();
              }
              
              makeRequest('GET', `http://localhost:5000/message/${messageIndex}`, function (err, records) {
                if (err) { throw err; }
                $("#text").css({'font-size': '65px'})
                text = JSON.parse(records).recordset[0].Message
              });

            win = ""
            message = true
            logData.push({...logObj, id: LogId, action: `User got message in a bottle`, dateTime: new Date})
            LogId++
            $("#dice img:nth-child(4)").show()
        }
        else if (pos === 6) {
            text = "You got back to the island! You are saved!"
            win = "You Win!"
            logData.push({...logObj, id: LogId, action: `User got back to the island`, dateTime: new Date})
            LogId++
            $("#dice img:nth-child(5)").show()
            message = false
        }
        logData.push({...logObj, id: LogId, action: `Game Over`, dateTime: new Date})

        setTimeout(() => {             
            $("#text").html(text)
            $("#win").html(win)
            $("#landedon3-bg").show()    
        }, 3500);

        $.ajax({ 
            type:"POST",
            url:"http://localhost:5000/log",
            data: JSON.stringify(logData), 
            contentType: 'application/json',
            success: function(res) {
                console.log(res);
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(JSON.stringify(logData))
                console.error(xhr, status, err.toString());
            }.bind(this)
        });  
    })

    $("#try-again").click(function clear() {
        $("#landedon3-bg").hide();
        $("#dice").children().hide()
        $("#player").css({'left': '450px', 
            'top': '350px'})
    })  


})
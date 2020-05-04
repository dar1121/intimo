        
        var canvas;

        // let input = document.getElementById("text-box");
        // var zipCode = document.getElementById("text-box").value;
        // console.log(zipCode);

        var url;

        var apiKey = "3f56d66bf44e9bbf90cbf9c5a0db23a5";
        // let zipCode = 21218;

        let weather;

        let xPos, xPos2, xPos3, xPos4, xPos5;
        let yPos, yPos2, yPos3, yPos4, yPos5;
        const orbSize = 1000;

        let h = 0;
        let s = 100;

    
        function setup() {

            var button = select('#submit');
            button.mousePressed(updateJSON);

            input = select('#text-box');
            console.log(input.value());

            canvas = createCanvas(windowWidth, windowHeight*2);
            canvas.position(0, 0);
            canvas.style('z-index', '-2');
            colorMode(HSB);
            noStroke();
  
            // loadJSON(url, gotData);

            xPos = random(0, windowWidth);
        	yPos = random(0, windowHeight);

        	xPos2 = random(0, windowWidth);
        	yPos2 = random(0, windowHeight);

        	xPos3 = random(0, windowWidth);
        	yPos3 = random(0, windowHeight);

        	xPos4 = random(0, windowWidth);
        	yPos4 = random(0, windowHeight);

        	xPos5 = random(0, windowWidth);
        	yPos5 = random(0, windowHeight);


        }

        function gotData(data) {

            weather = data;
        }

        function windowResized() {
            resizeCanvas(windowWidth, windowHeight);
            console.log("resized");       
        }

        function updateJSON() {
            url = "http://api.openweathermap.org/data/2.5/weather?zip=" + input.value() +",us&appid=" + apiKey + "&units=metric"; 
            loadJSON(url, gotData);
            console.log(input);
        }


        function draw() {

    //ORBS           
            fill(h, s, 100);
            ellipse(xPos, yPos, orbSize, orbSize);

            fill(h+10, s, 100);
            ellipse(xPos2, yPos2, orbSize, orbSize);

            fill(h+20, s, 100);
            ellipse(xPos3, yPos3, orbSize, orbSize);

            fill(h-10, s, 100);
            ellipse(xPos4, yPos4, orbSize, orbSize);

            fill(h-20, s, 100);
            ellipse(xPos5, yPos5, orbSize, orbSize);

    //USING JSON DATA

            if(weather) { 

            	let speed = weather.wind.speed;
                let temp = weather.main.temp;
                let humidity = weather.main.humidity;

    //TYING DATA TO HUE AND SATURATION

                h = map(temp, 10, 60, 0, 360);
                s = map(humidity, 100, 0, 30, 90);


    // IF MOVING OFF SCREEN

        // XPOS + YPOS +

            	if(xPos >= windowWidth + orbSize/2) {
            		xPos = -orbSize/2;
            	}

            	if(yPos >= windowHeight + orbSize/2) {
            		yPos = -orbSize/2;
            	}

        // XPOS - YPOS -

                if(xPos2 <= -orbSize/2) {
                    xPos2 = windowWidth + orbSize/2;
                }

                if(yPos2 <= -orbSize/2) {
                    yPos2 = windowHeight + orbSize/2;
                }

        // XPOS + YPOS -

                if( xPos3 >= windowWidth + orbSize/2) {
                    xPos3 = -orbSize/2;
                }

                if(yPos3 <= -orbSize/2) {
                    yPos3 = windowHeight + orbSize/2;
                }

        // XPOS - YPOS +

                if(xPos4 <= -orbSize/2) {
                    xPos4 = windowWidth + orbSize/2;
                }

                if(yPos4 >= windowHeight + orbSize/2) {
                    yPos4 = -orbSize/2;
                }

        // XPOS + YPOS +

                if(xPos5 >= windowWidth + orbSize/2) {
                    xPos5 = -orbSize/2;
                }

                if(yPos5 >= windowHeight + orbSize/2) {
                    yPos5 = -orbSize/2;
                }


            xPos += speed;
            yPos += speed;

            xPos2 -= speed;
            yPos2 -= speed;

            xPos3 += speed;
            yPos3 -= speed;

            xPos4 -= speed;
            yPos4 += speed;

            xPos5 += speed;
            yPos5 += speed;
         	
        }

    }

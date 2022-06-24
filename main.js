Status = "";
objects = [];

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (Status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotresult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : object detected";
            document.getElementById("number_object").innerHTML = "Number Of Objects Detected Are : " + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == object_name) {
                video.stop();
                objectDetector.detect(gotresult);
                document.getElementById("number_object").innerHTML = object_name + " Found";
                var synth = window.speechSynthesis;
                var utterthis = new SpeechSynthesisUtterance(object_name + " Found");
                synth.speak(utterthis);
            } else {
                document.getElementById("number_object").innerHTML = object_name + " Not Found";
            }
        }
    }
}

function start_video() {
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status : detecting objects";
    object_name = document.getElementById("object_name").value;
}

function modelloaded() {
    console.log("modelloaded");
    Status = true;
}
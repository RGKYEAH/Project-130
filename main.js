song = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

ScoreleftWrist = 0;
ScorerightWrist = 0;

song_status = "";
song2_status = "";

function preload() {
    song = loadSound("audio1.mp3");
    song2 = loadSound("audio2.mp3");
}

function setup() {
    canvas = createCanvas(600,600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function draw() {
    image(video,0,0,600,600);

    song = song_status;

    fill("royalblue");
    stroke("royalblue");

    song_status.isPlaying();

    if(ScoreleftWrist > 0.2) {
        circle(leftWristX,leftWristY,25);

        song2.stop();

        if(song_status = false) {
            song.play();

            document.getElementById("heading").innerHTML = "Dandelions By RUTH B";
        }
    }

    song2_status.isPlaying();

    if(ScorerightWrist > 0.2) {
        circle(rightWristX,rightWristY,25);

        song.stop();

        if(song2_status = false) {
            song2.play();

            document.getElementById("heading").innerHTML = "World Cup By ISHOWSPEED";
        }
    }
}

function modelLoaded() {
    console.log("PoseNet model is loaded");
}

function gotposes(results) {
    if(results.length > 0) {
        console.log(results);


        ScorerightWrist = results[0].pose.keypoints[10].score;
        ScoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("LEFT WRIST SCORE = "+ScoreleftWrist, + "RIGHT WRIST SCORE = "+ScorerightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log("LEFT WIRST X = "+leftWristX);
        console.log("LEFT WRIST Y = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("RIGHT WRIST X = "+rightWristX);
        console.log("RIGHT WRIST Y = "+rightWristY);
    }
}
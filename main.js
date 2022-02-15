song1="";
song2="";
leftScore =0;
rightScore=0;

leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotResult);
}


function draw() 
{
    image(video, 0, 0, 600, 500);
    fill("#ff0000");
    stroke("#ff0000");
    console.log(leftScore);

    if(leftScore > 0.2){
        circle(leftWristX, leftWristY, 20);
        console.log(leftScore);
        leftX=Math.floor(Number(leftWristY));
        leftX = leftX / 500;
        if (!song1.isPlaying()){
            song2.stop();
            song2.play(); 
        }else {
            song1.stop();
            song2.play();
        }
    }

    if(rightScore > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.play();
        if (!song2.isPlaying()){
            song1.stop();
            song1.play(); 
        }else {
            song2.stop();
            song1.play();
        }
    }
}

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("song1.mp3");
}

function play()
{
    song.play();
}

function gotResult(results){
    if(results.length > 0)
    {
        leftWristX = results[0].pose.leftWrist.x + 200;
        leftWristY = results[0].pose.leftWrist.y + 95;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftScore = results[0].pose.keypoints[9].score;
        rightScore = results[0].pose.keypoints[10].score;
    }
    // console.log(results);
}  

function modelLoaded(){
    console.log("model Loaded");
}
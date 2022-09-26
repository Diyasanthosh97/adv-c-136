video="";
status="";
objects=[];

function preload(){
    video=createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas=createCanvas(480,480);
canvas.center();
}
function gotresults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function draw(){
    image(video,0,0,480,480);
    if(status!=""){
        objectdetector.detect(video,gotresults);
        for(i=0 ;i<objects.length; i++){
            document.getElementById("status").innerHTML="object is detected";
document.getElementById("nofobj").innerHTML="No:of objects is:"+ objects.length;
fill("#808080");
percent=floor(objects[i].confidence*100);
text(objects[i].label +""+ percent+ "%"+ objects[i].x,objects[i].y);
noFill();
stroke("#808080");
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function start(){
    objectdetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status:detecting objects";
}
function modelLoaded(){
    console.log("Model is loaded");
    status=true;
    video.loop();
    video.volume(0);
    video.speed(1);
}


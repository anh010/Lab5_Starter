// expose.js
window.addEventListener('DOMContentLoaded', init);
const jsConfetti = new JSConfetti();

function init() {
  // DONE
 // select the dropdown and listen for changes
  const select_element = document.getElementById("horn-select");
  select_element.addEventListener('change',updateImgAndAudio);
  // select the button and listen for click 
  const button_tag = document.getElementsByTagName("button");
  const button = button_tag.item(0);
  button.addEventListener("click",playsound);
  // listen for changes in the volume slider
  const vol_elem = document.getElementById("volume");
  vol_elem.addEventListener('input', updateVolumeAndIcon);
}

// plays sound button is pushed
function playsound(){
  let audio_tag = document.getElementsByTagName("audio");
  let audio = audio_tag.item(0);
  audio.play();
  partyHornCheck();//inside here because we only shoot confetti when the button is pressed
}
//helper to quickly check if the horn is the party one 
// shoots the confetti if found
function partyHornCheck(){
  let imgValues = document.getElementById("horn-select");
  //store the current image name that is selected
  let img_name  = imgValues.options[imgValues.selectedIndex].value;
  if (img_name == "party-horn"){
    jsConfetti.addConfetti();
  }
}
//changes the picture on screen and sets audio accordingly 
function updateImgAndAudio(){
  //select collect the list of potential image name
  let imgValues = document.getElementById("horn-select");
  //store the current image that is selected
  let img_name  = imgValues.options[imgValues.selectedIndex].value;
  //select html objects
  let img_tags = document.getElementsByTagName("img");
  let audio_tag = document.getElementsByTagName("audio");
  //index html objects
  let img1 = img_tags.item(0);
  let audio = audio_tag.item(0);
  // we must choose the first image tage since they have no id 
  let im_path ="assets/images/"+ img_name + ".svg";
  let aud_path ="assets/audio/"+ img_name +".mp3";
  // create path to the correct image and audio
  audio.src= aud_path;
  img1.src = im_path;
}

//updates volume icon to corresponding level
function updateVolumeAndIcon(){
  const vol_elem = document.getElementById("volume");
  let vol = vol_elem.value;
   //selecting the second img tag.this would be easier 
  // not magic number(kinda ?? )
  let img_tags = document.getElementsByTagName("img");
  let img2 = img_tags.item(1);
  let path= "assets/icons/volume-level-";

  setVolume(vol);//helper that handles actual volume level
 
  if(vol == 0 ){
    img2.src= path + "0.svg";
  }else if (vol >= 1 && vol < 33){
    img2.src= path + "1.svg";
  }else if(vol >= 33 && vol < 67){
    img2.src= path + "2.svg";
  } else if (vol > 67){
    img2.src= path + "3.svg";
  }
}

//helper function to updateVolumeAndIcon 
//sets actual volum of horn
function setVolume(vol){
  let audio_tag = document.getElementsByTagName("audio");
  let audio = audio_tag.item(0);

  if (vol == 100){
    audio.volume = 1.0
  }else if (vol==0 ){
    audio.volume =0.0;
  }else{
    audio.volume = Number("0."+vol);
  }
}
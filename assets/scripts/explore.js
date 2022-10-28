// explore.js

window.addEventListener('DOMContentLoaded', init);
function init() {
  // DONE
  //speech synthesis variable 
  const synth = window.speechSynthesis;
  //selector variable 
  const select= document.querySelector('select');
  //array that will store all voices
  let voices= [];

  //this is how we load the drop down menu when the page loads 
  synth.addEventListener('voiceschanged', () => {
  voices = synth.getVoices();
  for (let i = 0; i < voices.length ; i++) {
    //create new html element
    const voice_option = document.createElement('option');
    //set what the user sees for drop down 
    voice_option.textContent = `${voices[i].name} (${voices[i].lang})`;
    //sett attritube, hidden from user, this is how we can chose the value eaiser
    voice_option.setAttribute('data-name', voices[i].name);
    //add to select list 
    select.appendChild(voice_option);
  }
});
  //the next three lines just set up the button listener to play the voice
  const button_tag = document.getElementsByTagName("button");
  const button = button_tag.item(0);
  button.addEventListener("click",playTextInput);
  //image selector to update later on in the code.
  const img_tag = document.getElementsByTagName('img');
  const img = img_tag.item(0);

//function that reads the selected input from drop down "speaks" text  
function playTextInput(){
  //read the selected voice from drop down and read the input text
  const chosen_voice = select.selectedOptions[0].getAttribute('data-name');
  const input_text  = document.getElementById("text-to-speak").value;
  let utterance = new SpeechSynthesisUtterance(input_text);
  // this loop is quickly find the voice data need to set the utterance 
  // voice to the corrrect voice. 
  for (let i = 0; i < voices.length ;i++){
    if (chosen_voice == voices[i].name){
      utterance.voice = voices[i];
    }
  }
  //IT LIVES
  synth.speak(utterance);
}
//logic to update the smily face
function updateSmiley(){
  if(synth.speaking){
    img.src = "assets/images/smiling-open.png";
  }else{
    img.src ="assets/images/smiling.png";
  }
}
  //interval to check and update the smily 
  setInterval(updateSmiley,50);
}



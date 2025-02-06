// ==UserScript==
// @name         Neopies Unluck Calculator
// @version      2025-02-06
// @description  Track how unlucky you have to be to not win the Neopies avatar
// @author       Flutterz
// @match        https://www.neopets.com/neopies/
// @grant        none
// ==/UserScript==

let wa = document.getElementById("winners-announced").children[1];
let avatar = false;
let avatarOdds = 1;
for (let i = 0; i < wa.children.length; i++){
    let yv = wa.children[i].getElementsByClassName("yourVote").length;
    if (!yv)avatar = true;
    let loseOdds = 1-wa.children[i].getElementsByClassName("winningVote")[0].parentElement.parentElement.children[2].innerText.trim().replace("%","")/100;
    avatarOdds = avatarOdds * loseOdds;
}
let text = document.getElementsByClassName("flavor-text")[0].children[0];
avatarOdds = 1/avatarOdds;
if (avatarOdds < 10){
avatarOdds = Math.round((avatarOdds) * 100) / 100;
} else if (avatarOdds < 100){
    avatarOdds = Math.round((avatarOdds) * 10) / 10;
} else {
    avatarOdds = Math.round(avatarOdds);
}
avatarOdds = ""+avatarOdds;
let unluckyNumber = "";
while ((avatarOdds.length>3)&&(!avatarOdds.includes("."))){
    unluckyNumber = ","+avatarOdds.substring(avatarOdds.length-3) + unluckyNumber;
    avatarOdds = avatarOdds.substring(0,avatarOdds.length-3);
}
unluckyNumber = avatarOdds + unluckyNumber;
if (avatar==true){
    text.innerHTML += "<br><br><b>You've won the avatar already! Lucky you! But 1 in "+unluckyNumber+" people haven't been as lucky so far!</b>";
} else {
    text.innerHTML += "<br><br><b>You're in the unlucky 1 in "+unluckyNumber+" people that haven't won the avatar so far!</b>";
}

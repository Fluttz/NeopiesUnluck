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
avatarOdds = Math.round((1/avatarOdds) * 100) / 100;
if (avatar==true){
    text.innerHTML += "<br><br><b>You've won the avatar already! Lucky you! But 1 in "+avatarOdds+" people haven't been as lucky so far!</b>";
} else {
    text.innerHTML += "<br><br><b>You're in the unlucky 1 in "+avatarOdds+" people that haven't won the avatar so far!</b>";
}

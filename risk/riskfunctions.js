//
// RISK DICE ROLLING PROGRAM
//
// by Robert M. Laurie
// 2 March 2012
// Written in JavaScript, HTML5, and CSS
//
// This program will roll risk dice after players
// enter their total pieces in the two countries at war.
// Attacker gets to roll three dice, while defender only rolls two dice.
// The defender wins on ties, so probabilistically they will do better.
// A stop loss can be set by the attacker, but the attacker will continue
// to roll three dice so there is a chance they may loose one more then
// the stop loss setting. The delay time can be changed to increase or decrease the
// speed of the carnage.
//
// GLOBAL VARIABLE DECLARATIONS ARE STORED HERE
//
// Sound Files to Objects
// All browsers except IE can play wav files

var browser_name = navigator.userAgent;
var audioext = "wav";
if (browser_name.indexOf("Opera")!= -1)
   browser_name = "Opera";
else if (browser_name.indexOf("Firefox")!= -1)
   browser_name = "Firefox";
else if (browser_name.indexOf("MSIE")!= -1)
{
   browser_name = "MSIE";
   audioext = "mp3";
}
else if (browser_name.indexOf("Safari")!= -1)
   browser_name = "Safari";


var sndCharge = new Audio("charge." + audioext);
var sndDefend = new Audio("DefendA." + audioext);
var sndAttack = new Audio("M1 Garand.");
//
// Array to Store dice rolls
var DefRolls = new Array(2);
var AtkRolls = new Array(3);
//
// Array to store 7 dice image states
var imgDieRed = new Array(7);
var imgDieBlu = new Array(7);
for(var i = 0; i <= 6; i++)
{
  imgDieRed[i] = new Image(33, 33);
  imgDieRed[i].src = "die"+i+"r.gif";
  imgDieBlu[i] = new Image(33, 33);
  imgDieBlu[i].src = "die"+i+"b.gif";
}
//
// Array to store 4 soldier image states
var imgRedSoldiers = new Array(4);
var imgBlueSoldiers = new Array(4);
for(var i = 0; i < 4; i++)
{
  imgRedSoldiers[i] = new Image(58, 69);
  imgRedSoldiers[i].src = "redSoldier"+i+".gif";
  imgBlueSoldiers[i] = new Image(58, 69);
  imgBlueSoldiers[i].src = "blueSoldier"+i+".gif";
}
//
// Array contains image objects displaying army
var aryRedArmy = new Array();
var aryBlueArmy = new Array();
//
//
//
// FUNCTIONS DECLARATIONS

function PlayRisk()
{
  Attackers = document.getElementById("txtAttack");
  Defenders = document.getElementById("txtDefend");
  StopLoss = document.getElementById("txtStopLoss");

  var DieDef0   = document.getElementById("imgDieDef0");
  var DieDef1   = document.getElementById("imgDieDef1");
  var DieAtk0   = document.getElementById("imgDieAtk0");
  var DieAtk1   = document.getElementById("imgDieAtk1");
  var DieAtk2   = document.getElementById("imgDieAtk2");
  var AttkArmy  = document.getElementById("divRedArmy");
  var DfndArmy  = document.getElementById("divBlueArmy");

  var DelayTimer   = document.getElementById("optDelay");

  var Timer = parseFloat(DelayTimer.value);

  var Stop = parseInt(StopLoss.value);
  var Attack = parseInt(Attackers.value);
  var Defend = parseInt(Defenders.value);


  if(Defend >= 1 && Attack > Stop)
  {
     // Select Quantity of Dice Defender
     if(Defend > 1)
     {
        RollDice(DefRolls, 2);
        DieDef0.src = imgDieBlu[DefRolls[0]].src;
        DieDef1.src = imgDieBlu[DefRolls[1]].src;
     }
     else
     {
        RollDice(DefRolls, 1);
        DieDef0.src = imgDieBlu[DefRolls[0]].src;
        DieDef1.src = imgDieBlu[0].src;
     }

     // Select Quantity of Dice Attacker
     if(Attack >= 4)
     {
        RollDice(AtkRolls, 3);
        DieAtk0.src = imgDieRed[AtkRolls[0]].src;
        DieAtk1.src = imgDieRed[AtkRolls[1]].src;
        DieAtk2.src = imgDieRed[AtkRolls[2]].src;
     }
     else if(Attackers == 3)
     {
        RollDice(AtkRolls, 2);
        DieAtk0.src = imgDieRed[AtkRolls[0]].src;
        DieAtk1.src = imgDieRed[AtkRolls[1]].src;
        DieAtk2.src = imgDieRed[0].src;
     }
     else
     {
        RollDice(AtkRolls, 1);
        DieAtk0.src = imgDieRed[AtkRolls[0]].src;
        DieAtk1.src = imgDieRed[0].src;
        DieAtk2.src = imgDieRed[0].src;
     }
     // Determine Casualties

      Casulty(0);
      if(DefRolls[1] > 0 && AtkRolls[1] > 0)
      {
        Casulty(1);
      }
      // Reload function after time out
      var Timer1 = window.setTimeout("PlayRisk()", Timer);
  }
}

function Casulty(Roll)
{
   Attackers = document.getElementById("txtAttack");
   Defenders = document.getElementById("txtDefend");
   var Red = parseInt(Attackers.value);
   var Blue = parseInt(Defenders.value);
   if(DefRolls[Roll] >= AtkRolls[Roll])
   {

      sndDefend.play();
      aryRedArmy[aryRedArmy.length - Red].src = imgRedSoldiers[0].src;
      Red--;
      if(Red > 0)
         aryRedArmy[aryRedArmy.length - Red].src = imgRedSoldiers[1].src;
      if(Red > 1)
         aryRedArmy[aryRedArmy.length - Red + 1].src = imgRedSoldiers[2].src;
      
   }
   else
   {
      sndAttack.play();
      aryBlueArmy[aryBlueArmy.length - Blue].src = imgBlueSoldiers[0].src;
      Blue--;
      if(Blue > 0)
         aryBlueArmy[aryBlueArmy.length - Blue].src = imgBlueSoldiers[1].src;
      if(Blue > 1)
         aryBlueArmy[aryBlueArmy.length - Blue + 1].src = imgBlueSoldiers[2].src;
   }
   Attackers.value = Red;
   Defenders.value = Blue;
   return;
}

// Roll Dice function passes-by-reference an array of dice and rolls
// the quantity of dice specified.
function RollDice(Dice, Qty)
{
  var i;
  for(i = 0; i < Dice.length; i++)
    Dice[i] = 0;
  for(i = 0; i < Qty; i++)
     Dice[i] = Math.floor(6 * Math.random())+1;
  Dice.sort();
  Dice.reverse();
  return;
}

// Verify Stop Loss function verifies the onchange event validates
// entered stop loss.
function VerifyStopLoss()
{
  var Stop = document.getElementById("txtStopLoss");
  var Attack = document.getElementById("txtAttack");
  var Entry = parseInt(Stop.value);
  var Atk = parseInt(Attack.value);
  if( Entry < 1 || isNaN(Entry) || Entry > Atk)
  {
     alert("Stop Loss must be greater then or equal to 1\n"
     + "and Stop Loss must be less then Attackers");
     Stop.value = 1;
  }
  return;
}

function ChangeAttackers()
{
  var Attack = document.getElementById("txtAttack");
  var RedArmy  = document.getElementById("divRedArmy");
  var sArmy = new String("");
  var Entry = parseInt(Attack.value);

  if( Entry < 2 || isNaN(Entry))
  {
     alert("You can't Attack unless you have at least two armies!\n"
     + "One army must be left in country.");
     Attack.value = 0;
  }
  for(var i=0; i < Entry; i++)
  {
    sArmy += '<img src="redSoldier3.gif" alt="" style="float: right;" name="imgRedMan">';
  }
  RedArmy.innerHTML = sArmy;
  aryRedArmy = document.getElementsByName("imgRedMan");

  aryRedArmy[0].src = imgRedSoldiers[1].src;
  if(aryRedArmy.length > 2)
    aryRedArmy[1].src = imgRedSoldiers[2].src;
  return;
}

function ChangeDefenders()
{
  var Defend= document.getElementById("txtDefend");
  var BlueArmy  = document.getElementById("divBlueArmy");
  var sArmy = new String("");
  var Entry = parseInt(Defend.value);

  if( Entry < 1 || isNaN(Entry))
  {
     alert("You must have at least one army in the country!\n"
     + "Please enter one or more armies.");
     Defend.value = 0;
  }
  for(var i=0; i < Entry; i++)
  {
    sArmy += '<img src="blueSoldier3.gif" alt="" style="float: left;"  name="imgBlueMan">';
  }
  BlueArmy.innerHTML = sArmy;
  aryBlueArmy = document.getElementsByName("imgBlueMan");

  aryBlueArmy[0].src = imgBlueSoldiers[1].src
   if(aryBlueArmy.length >= 2)
       aryBlueArmy[1].src = imgBlueSoldiers[2].src;
   return;
}

// Window Onload function is used to wait for DOM to preload before initializing
//    Other and more advanced techniques
//       http://www.javascriptkit.com/dhtmltutors/domready.shtml
//       http://www.htmlgoodies.com/beyond/javascript/article.php/3724571
// window.onload=LoadDOM();

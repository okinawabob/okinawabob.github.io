// Sound Files to Objects
var sndCharge = new Audio("charge.wav")
var sndDefend = new Audio("DefendA.wav")
var sndAttack = new Audio("M1 Garand.wav")

function PlayRisk()
{
  var Attackers = document.getElementById("txtAttack");
  var Defenders = document.getElementById("txtDefend");
  var StopLoss  = document.getElementById("txtStopLoss");
  var Delay     = document.getElementById("optDelay");
  var DieDef0   = document.getElementById("imgDieDef0");
  var DieDef1   = document.getElementById("imgDieDef1");
  var DieAtk0   = document.getElementById("imgDieAtk0");
  var DieAtk1   = document.getElementById("imgDieAtk1");
  var DieAtk2   = document.getElementById("imgDieAtk2");
  var DelayTimer   = document.getElementById("optDelay");

  var DieRed = new Array(7);
  var DieBlu = new Array(7);
  for(var i=0; i<=6; i++)
  {
    DieRed[i] = new Image();
    DieRed[i].src = "die"+i+"r.gif";
    DieBlu[i] = new Image();
    DieBlu[i].src = "die"+i+"b.gif";
  }
			
  var Timer = parseFloat(DelayTimer.value);
  var DefRolls = new Array(2);
  var AtkRolls = new Array(3);

  var Stop = parseInt(StopLoss.value);
  var Attack = parseInt(Attackers.value);
  var Defend = parseInt(Defenders.value);


  if(Defend >= 1 && Attack > Stop)
  {
     // Select Quantity of Dice Defender
     if(Defend > 1)
     {
        RollDice(DefRolls, 2);
        DieDef0.src = DieBlu[DefRolls[0]].src;
        DieDef1.src = DieBlu[DefRolls[1]].src;
        //  parent.frames("fraDefend").document.images[Defenders-1].src = SoldierBlue[2].src;
        // parent.frames("fraDefend").document.images[Defenders-2].src = SoldierBlue[1].src;
     }
     else
     {
        RollDice(DefRolls, 1);
        DieDef0.src = DieBlu[DefRolls[0]].src;
        DieDef1.src = DieBlu[0].src;
 //       parent.frames("fraDefend").document.images[Defenders-1].src = SoldierBlue[2].src;
     }

     // Select Quantity of Dice Attacker
     if(Attack >= 4)
     {
        RollDice(AtkRolls, 3);
        DieAtk0.src = DieRed[AtkRolls[0]].src;
        DieAtk1.src = DieRed[AtkRolls[1]].src;
        DieAtk2.src = DieRed[AtkRolls[2]].src;
        //parent.frames("fraAttack").document.images[Attackers-1].src = SoldierRed[1].src;
        //parent.frames("fraAttack").document.images[Attackers-2].src = SoldierRed[2].src;
     }
     else if(Attackers == 3)
     {
        RollDice(AtkRolls, 2);
        DieAtk0.src = DieRed[AtkRolls[0]].src;
        DieAtk1.src = DieRed[AtkRolls[1]].src;
        DieAtk2.src = DieRed[0].src;
//        parent.frames("fraAttack").document.images[Attackers-1].src = SoldierRed[1].src;
//        parent.frames("fraAttack").document.images[Attackers-2].src = SoldierRed[2].src;
     }
     else
     {
        RollDice(AtkRolls, 1);
        DieAtk0.src = DieRed[AtkRolls[0]].src;
        DieAtk1.src = DieRed[0].src;
        DieAtk2.src = DieRed[0].src;
       // parent.frames("fraAttack").document.images[Attackers-1].src = SoldierRed[2].src;
     }

      // DETERMINE WINNER
      if(DefRolls[0] >= AtkRolls[0])
      {
         Attack--;
         sndDefend.play();
      //     parent.frames("fraAttack").document.images[Attackers].src = SoldierRed[0].src;
      }
      else
      {
         Defend--;
         sndAttack.play();
      //     parent.frames("fraDefend").document.images[Defenders].src = SoldierBlue[0].src;
      }
      if(DefRolls[1] > 0 && AtkRolls[1] > 0)
      {
         if(DefRolls[1] >= AtkRolls[1])
         {
            Attack--;
            setTimeout("sndDefend.play()", 1000);
      //        parent.frames("fraAttack").document.images[Attackers].src = SoldierRed[0].src;
         }
         else
         {
            Defend--;
            setTimeout("sndAttack.play()", 1000);
      //        parent.frames("fraDefend").document.images[Defenders].src = SoldierBlue[0].src;
         }
      }

      // Display Results
      Attackers.value = Attack;
      Defenders.value = Defend;

      Timer1 = window.setTimeout("ProgramCycle()", Timer);
  }
}

function ProgramCycle()
{
  PlayRisk();
}

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
/*
//function SortIntMaxToMin(val1, val2)
//{
//  return parseInt(val2)-parseInt(val1);
//}


*/



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
}

function ChangeAttackers()
{
  var Attack = document.getElementById("txtAttack");
  var Entry = parseInt(Attack.value);
  if( Entry < 2 || isNaN(Entry))
  {
     alert("You can't Attack unless you have at least two armies!\n"
     + "One army must be left in country.");
     Attack.value = 2;
  }
  // ShowArmy("Attack", parseInt(document.frmRisk.txtAttack.value));
}

function ChangeDefenders()
{
  var Defend= document.getElementById("txtDefend");
  var Entry = parseInt(Defend.value);
  if( Entry < 1 || isNaN(Entry))
  {
     alert("You must have at least one army in the country!\n"
     + "One army must be left in country.");
     Defend.value = 1;
  }     
  // ShowArmy("Defend", parseInt(document.frmRisk.txtDefend.value));
}

/*
function ShowArmy(Side, Qty)
{
  var Color;
  parent.frames("fra"+Side).document.write('<html><head><\/head><body background="wpWar.jpg">');
  if(Side=="Attack")
     Color="red";
  else
     Color="blue";
  for(var i=0; i<Qty; i++)
     parent.frames("fra"+Side).document.write('<img src=\"'+Color+'Soldier3.gif\" \/>');
  parent.frames("fra"+Side).document.write('<\/body><\/html>');
  parent.frames("fra"+Side).document.close();
}

*/
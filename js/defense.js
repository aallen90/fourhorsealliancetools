/* Phil's Highly Unused Combat Evaluating Monster! v0.3 20130912 
This was my second and last attempt at JavaScript. The first is the attack calculator.
Never could get arrays to work for me, sorry for the variable names. Did not waste
very much time on the UI either, obviously. Plenty of room for improvement.
But it crunches the numbers just fine; worked for me in every in-game test.

Austin's modified version for mobile
*/
// Defense Calculator
// ReSharper disable once InconsistentNaming


function Combat_calc(Form) {
    var debug = false;

    // Initialize vars
    var rawMeleeLeft = 0;
    var rawMeleeCenter = 0;
    var rawMeleeRight = 0;
    var rawRangedLeft = 0;
    var rawRangedCenter = 0;
    var rawRangedRight = 0;

    // Set HTML entity for a space, to a variable for easier typing.
    var s = "&nbsp;";

    // Set answer string
    var answer = "working...<br/>";
    var ok = false;

    /* Loop through the available Wall radio buttons, and try to assign the associated level value (1,2,3,4).
        If one is selected, continue. Otherwise, the cast will fail.
        */
    var wallCoefficient;
    for (var i = 0; i < 4; i++) {
        if (Form.Wall[i].checked) {
            wallCoefficient = Number(Form.Wall[i].value); // Assigns the wall value coefficient
            ok = true;
        }
    }
    if (ok) {
        wallCoefficient = wallCoefficient * 20; // 20 is the defense increase per wall level. Multiply to get total wall boost
        rawMeleeLeft += wallCoefficient; // Set each raw M/R value to the base wall defense.
        rawMeleeCenter += wallCoefficient;
        rawMeleeRight += wallCoefficient;
        rawRangedLeft += wallCoefficient;
        rawRangedCenter += wallCoefficient;
        rawRangedRight += wallCoefficient;
    } else {
        answer = answer + "Problem with castle wall.<br/>";
    }

    // grab the Gate level from the textfield
    var gateCoefficient = Number(Form.Gate.value);
    if (gateCoefficient > 0 && gateCoefficient <= 4) { // Set max Gate to 4 for mobile.
        gateCoefficient = gateCoefficient * 20; // Get total gate bonus for the level.
        rawMeleeCenter += gateCoefficient; // Add the Gate bonus to the raw M/R score (which is just Wall + Gate bonus so far).
        rawRangedCenter += gateCoefficient; // Only applies to the center scores.
    } else {
        answer = answer + "Problem with castle gate.<br/>";
    }

    // Reset boolean flag
    ok = false;

    // Loop through the available Moat radios (0,1,2) and set the level
    var moatCoefficient;
    for (i = 0; i < 3; i++) {
        if (Form.Moat[i].checked) {
            moatCoefficient = Number(Form.Moat[i].value);
            ok = true;
        }
    }
    if (ok) {
        moatCoefficient = moatCoefficient * 10; // Multiply the Moat level with 10 to get to boost.
        rawMeleeLeft += moatCoefficient; // Add the moat bonus to the both raw scores on all three sides.
        rawMeleeCenter += moatCoefficient;
        rawMeleeRight += moatCoefficient;
        rawRangedLeft += moatCoefficient;
        rawRangedCenter += moatCoefficient;
        rawRangedRight += moatCoefficient;
    } else {
        answer = answer + "Problem with castle moat.<br/>";
    }

    // Get user's wall troop count. This maxes out based on their tower level, but tower level is not necessary for this calc.
    var troops = Number(Form.Troops.value);
    if (troops < 4 || troops > 260) { // Make sure the user has entered a number between the minimum, and max(20 level 4 towers at 13 troops is 260)
        answer = answer + "Problem with troop count.<br/>";
    }

    // This is where we set the defense values to use based on the defender type that is chosen. Implied that user will choose the best defenders when able.
    // TEFKAJ, I just added the base guys to help lower levelers
    var meleeDefenseVal, meleeDefenderName, rangedDefenseVal, rangedDefenderName;
    if (Form.TroopType[0].checked) {
        meleeDefenseVal = 26;
        meleeDefenderName = "Spearmen";
        rangedDefenseVal = 24;
        rangedDefenderName = "Bowmen";
    }
    if (Form.TroopType[1].checked) {
        meleeDefenseVal = 135;
        meleeDefenderName = "Halberdiers";
        rangedDefenseVal = 125;
        rangedDefenderName = "Longbowmen";
    }
    if (Form.TroopType[2].checked) {
        meleeDefenseVal = 142;
        meleeDefenderName = "Veteran Spearmen";
        rangedDefenseVal = 132;
        rangedDefenderName = "Veteran Bowmen";
    }
    if (Form.TroopType[3].checked) {
        meleeDefenseVal = 150;
        meleeDefenderName = "Sentinels of Kingsguard";
        rangedDefenseVal = 139;
        rangedDefenderName = "Scouts of Kingsguard";
    }
    if (debug) { // If we're debugging, spit out the troops
        answer = answer + "MDEFVAL: " + meleeDefenseVal + " " + meleeDefenderName + " RDEFVAL: " + rangedDefenseVal + " " + rangedDefenderName + "<br/>";
    }

    // Get all of the tools from the inputs
    // Attack tools
    var ladderLeft = Number(Form.LL.value);
    var ladderCenter = Number(Form.LC.value);
    var ladderRight = Number(Form.LR.value);
    var siegeTowerLeft = Number(Form.STL.value);
    var siegeTowerCenter = Number(Form.STC.value);
    var siegeTowerRight = Number(Form.STR.value);
    var belfryLeft = Number(Form.EL.value);
    var belfryCenter = Number(Form.EC.value);
    var belfryRight = Number(Form.ER.value);
    var batteringRam = Number(Form.FBRC.value);
    var ironRam = Number(Form.IRC.value);
    var heavyRam = Number(Form.HRC.value);
    var mantletLeft = Number(Form.NL.value);
    var mantletCenter = Number(Form.NC.value);
    var mantletRight = Number(Form.NR.value);
    var ironMantletLeft = Number(Form.CML.value);
    var ironMantletCenter = Number(Form.CMC.value);
    var ironMantletRight = Number(Form.CMR.value);
    var shieldWallLeft = Number(Form.FSWL.value);
    var shieldWallCenter = Number(Form.FSWC.value);
    var shieldWallRight = Number(Form.FSWR.value);
    var woodBundleLeft = Number(Form.WBL.value);
    var woodBundleCenter = Number(Form.WBC.value);
    var woodBundleRight = Number(Form.WBR.value);
    var assaultBridgeLeft = Number(Form.ABL.value);
    var assaultBridgeCenter = Number(Form.ABC.value);
    var assaultBridgeRight = Number(Form.ABR.value);
    var boulderLeft = Number(Form.BLL.value);
    var boulderCenter = Number(Form.BLC.value);
    var boulderRight = Number(Form.BLR.value);

    //Defense tools
    var rocksLeft = Number(Form.RL.value);
    var rocksCenter = Number(Form.RC.value);
    var rocksRight = Number(Form.RR.value);
    var tarKettleLeft = Number(Form.TL.value);
    var tarKettleCenter = Number(Form.TC.value);
    var tarKettleRight = Number(Form.TR.value);
    var machicolationLeft = Number(Form.FMAL.value);
    var machicolationCenter = Number(Form.FMAC.value);
    var machicolationright = Number(Form.FMAR.value);
    var gateReinforcement = Number(Form.GRC.value);
    var insulatingMat = Number(Form.IMC.value);
    var portcullis = Number(Form.PC.value);
    var fireArrowsLeft = Number(Form.FAL.value);
    var fireArrowsCenter = Number(Form.FAC.value);
    var fireArrowsRight = Number(Form.FAR.value);
    var bulwarkLeft = Number(Form.WL.value);
    var bulwarkCenter = Number(Form.WC.value);
    var bulwarkRight = Number(Form.WR.value);
    var arrowSlitLeft = Number(Form.ASL.value);
    var arrowSlitCenter = Number(Form.ASC.value);
    var arrowSlitRight = Number(Form.ASR.value);
    var sharpStakeLeft = Number(Form.SSL.value);
    var sharpStakeCenter = Number(Form.SSC.value);
    var sharpStakeRight = Number(Form.SSR.value);
    var gatorLeft = Number(Form.GSL.value);
    var gatorCenter = Number(Form.GSC.value);
    var gatorRight = Number(Form.GSR.value);
    var fireMoatLeft = Number(Form.FML.value);
    var fireMoatCenter = Number(Form.FMC.value);
    var fireMoatRight = Number(Form.FMR.value);

    // Check defensive wall numbers
    if (rocksLeft < 0 || rocksCenter < 0 || rocksRight < 0 || tarKettleLeft < 0 || tarKettleCenter < 0 || tarKettleRight < 0 || machicolationLeft < 0 || machicolationCenter < 0 || machicolationright < 0) {
        answer = answer + "Problem with defensive wall tool numbers<br/>";
    }
    if (rocksLeft + rocksCenter + rocksRight + tarKettleLeft + tarKettleCenter + tarKettleRight + machicolationLeft + machicolationCenter + machicolationright > 36) {
        answer = answer + "Problem with defensive wall tool numbers<br/>";
    }
    // Check gate tool numbers
    if (gateReinforcement < 0 || insulatingMat < 0 || portcullis < 0) {
        answer = answer + "Problem with defensive gate tool numbers<br/>";
    }
    if (gateReinforcement + insulatingMat + portcullis > 8) {
        answer = answer + "Problem with defensive gate tool numbers<br/>";
    }
    // Check ranged defensive tool numbers
    if (fireArrowsLeft < 0 || fireArrowsCenter < 0 || fireArrowsRight < 0 || bulwarkLeft < 0 || bulwarkCenter < 0 || bulwarkRight < 0 || arrowSlitLeft < 0 || arrowSlitCenter < 0 || arrowSlitRight < 0) {
        answer = answer + "Problem with defensive range tool numbers<br/>";
    }
    if (fireArrowsLeft + fireArrowsCenter + fireArrowsRight + bulwarkLeft + bulwarkCenter + bulwarkRight + arrowSlitLeft + arrowSlitCenter + arrowSlitRight > 12) {
        answer = answer + "Problem with defensive range tool numbers<br/>";
    }
    // Check defensive moat tool numbers
    if (sharpStakeLeft < 0 || sharpStakeCenter < 0 || sharpStakeRight < 0 || gatorLeft < 0 || gatorCenter < 0 || gatorRight < 0 || fireMoatLeft < 0 || fireMoatCenter < 0 || fireMoatRight < 0) {
        answer = answer + "Problem with defensive moat tool numbers<br/>";
    }
    if (sharpStakeLeft + sharpStakeCenter + sharpStakeRight + gatorLeft + gatorCenter + gatorRight + fireMoatLeft + fireMoatCenter + fireMoatRight > 12) {
        answer = answer + "Problem with defensive moat tool numbers<br/>";
    }

    // Spit out the the tool data ONLY if we're checking for bugs!
    if (debug) {

        answer = answer + "Raw tool data:<br/>";
        answer = answer + ladderLeft + s + ladderCenter + s + ladderRight + s + s + rocksLeft + s + rocksCenter + s + rocksRight + "<br/>";
        answer = answer + siegeTowerLeft + s + siegeTowerCenter + s + siegeTowerRight + s + s + tarKettleLeft + s + tarKettleCenter + s + tarKettleRight + "<br/>";
        answer = answer + belfryLeft + s + belfryCenter + s + belfryRight + s + s + machicolationLeft + s + machicolationCenter + s + machicolationright + "<br/>";
        answer = answer + batteringRam + s + gateReinforcement + "<br/>";
        answer = answer + ironRam + s + insulatingMat + "<br/>";
        answer = answer + heavyRam + s + portcullis + "<br/>";
        answer = answer + mantletLeft + s + mantletCenter + s + mantletRight + s + s + fireArrowsLeft + s + fireArrowsCenter + s + fireArrowsRight + "<br/>";
        answer = answer + ironMantletLeft + s + ironMantletCenter + s + ironMantletRight + s + s + bulwarkLeft + s + bulwarkCenter + s + bulwarkRight + "<br/>";
        answer = answer + shieldWallLeft + s + shieldWallCenter + s + shieldWallRight + s + s + arrowSlitLeft + s + arrowSlitCenter + s + arrowSlitRight + "<br/>";
        answer = answer + woodBundleLeft + s + woodBundleCenter + s + woodBundleRight + s + s + sharpStakeLeft + s + sharpStakeCenter + s + sharpStakeRight + "<br/>";
        answer = answer + assaultBridgeLeft + s + assaultBridgeCenter + s + assaultBridgeRight + s + s + gatorLeft + s + gatorCenter + s + gatorRight + "<br/>";
        answer = answer + boulderLeft + s + boulderCenter + s + boulderRight + s + s + fireMoatLeft + s + fireMoatCenter + s + fireMoatRight + "<br/>";
    }

    // Add up the total attack tool deductions by multiplying the tool amount by their deduction bonus.
    var attackToolWallLeft = 10 * ladderLeft + 15 * siegeTowerLeft + 20 * belfryLeft;
    var attackToolWallFront = 10 * ladderCenter + 15 * siegeTowerCenter + 20 * belfryCenter;
    var attackToolWallRight = 10 * ladderRight + 15 * siegeTowerRight + 20 * belfryRight;
    var attackToolGate = 10 * batteringRam + 15 * ironRam + 20 * heavyRam;
    var attackToolRangedLeft = 5 * mantletLeft + 10 * ironMantletLeft + 15 * shieldWallLeft;
    var attackToolRangedCenter = 5 * mantletCenter + 10 * ironMantletCenter + 15 * shieldWallCenter;
    var attackToolRangedRight = 5 * mantletRight + 10 * ironMantletRight + 15 * shieldWallRight;
    var attackToolMoatLeft = 5 * woodBundleLeft + 10 * assaultBridgeLeft + 15 * boulderLeft;
    var attackToolMoatCenter = 5 * woodBundleCenter + 10 * assaultBridgeCenter + 15 * boulderCenter;
    var attackToolMoatRight = 5 * woodBundleRight + 10 * assaultBridgeRight + 15 * boulderRight;

    // Add up the total defense tool bonus by multiplying the tool amount by their deduction bonus.
    var defenseToolWallLeft = 25 * rocksLeft + 40 * tarKettleLeft + 50 * machicolationLeft;
    var defenseToolWallCenter = 25 * rocksCenter + 40 * tarKettleCenter + 50 * machicolationCenter;
    var defenseToolWallRight = 25 * rocksRight + 40 * tarKettleRight + 50 * machicolationright;
    var defenseToolGate = 35 * gateReinforcement + 60 * insulatingMat + 75 * portcullis;
    var defenseToolRangedLeft = 25 * fireArrowsLeft + 50 * bulwarkLeft + 70 * arrowSlitLeft;
    var defenseToolRangedCenter = 25 * fireArrowsCenter + 50 * bulwarkCenter + 70 * arrowSlitCenter;
    var defenseToolRangedRight = 25 * fireArrowsRight + 50 * bulwarkRight + 70 * arrowSlitRight;
    var defenseToolMoatLeft = 35 * sharpStakeLeft + 80 * gatorLeft + 110 * fireMoatLeft;
    var defenseToolMoatCenter = 35 * sharpStakeCenter + 80 * gatorCenter + 110 * fireMoatCenter;
    var defenseToolMoatRight = 35 * sharpStakeRight + 80 * gatorRight + 110 * fireMoatRight;

    // Spit out tool number calculations if debugging
    if (debug) {
        s = "&nbsp;"; // Set HTML entity for a space, to a variable for easier typing.
        answer = answer + "Tool calculations:<br/>";
        answer = answer + attackToolWallLeft + s + attackToolWallFront + s + attackToolWallRight + s + s + defenseToolWallLeft + s + defenseToolWallCenter + s + defenseToolWallRight + "<br/>";
        answer = answer + attackToolGate + s + defenseToolGate + "<br/>";
        answer = answer + attackToolRangedLeft + s + attackToolRangedCenter + s + attackToolRangedRight + s + s + defenseToolRangedLeft + s + defenseToolRangedCenter + s + defenseToolRangedRight + "<br/>";
        answer = answer + attackToolMoatLeft + s + attackToolMoatCenter + s + attackToolMoatRight + s + s + defenseToolMoatLeft + s + defenseToolMoatCenter + s + defenseToolMoatRight + "<br/>";
    }

    // Get the Castellan's equipment bonuses (that matter in defense)
    var castWall = Number(Form.CasWall.value);
    if (castWall < 0 || castWall > 100) {
        answer = answer + "Problem with Castellan wall value<br/>";
    }
    var castGate = Number(Form.CasGate.value);
    if (castGate < 0 || castGate > 100) {
        answer = answer + "Problem with Castellan gate value<br/>";
    }
    var castMoat = Number(Form.CasMoat.value);
    if (castMoat < 0 || castMoat > 100) {
        answer = answer + "Problem with Castellan moat value<br/>";
    }
    var castMelee = Number(Form.CasMelee.value);
    if (castMelee < 0 || castMelee > 100) {
        answer = answer + "Problem with Castellan melee value<br/>";
    }
    var castRange = Number(Form.CasRange.value);
    if (castRange < 0 || castRange > 100) {
        answer = answer + "Problem with Castellan range value<br/>";
    }

    //Get the commander's equipment bonuses (that matter in attack)
    var commanderWall = Number(Form.ComWall.value);
    if (commanderWall < 0 || commanderWall > 100) {
        answer = answer + "Problem with Commander wall value<br/>";
    }
    var commanderGate = Number(Form.ComGate.value);
    if (commanderGate < 0 || commanderGate > 100) {
        answer = answer + "Problem with Commander gate value<br/>";
    }
    var commanderMoat = Number(Form.ComMoat.value);
    if (commanderMoat < 0 || commanderMoat > 100) {
        answer = answer + "Problem with Commander moat value<br/>";
    }
    var commanderMelee = Number(Form.ComMelee.value);
    if (commanderMelee < 0 || commanderMelee > 100) {
        answer = answer + "Problem with Commander melee value<br/>";
    }
    var commanderRanged = Number(Form.ComRange.value);
    if (commanderRanged < 0 || commanderRanged > 100) {
        answer = answer + "Problem with Commander range value<br/>";
    }

    // Set the raw melee numbers by taking the original raw value (wall + gate + moat), adding in the defensive tool values,
    // subtracting the attack tool deductions, and factoring in the affected castellan/commander wall/gate/moat bonuses.
    // Since the number cannot be less than 0, set it back to the 0 if it goes under for each M/R Wall.
    // Doesn't factor in equiment bonuses here, as they get factored into the result.
    rawMeleeLeft = rawMeleeLeft + defenseToolWallLeft + defenseToolMoatLeft - attackToolWallLeft - attackToolMoatLeft + castWall + castMoat - commanderWall - commanderMoat;
    if (rawMeleeLeft < 0) {
        rawMeleeLeft = 0;
    }
    // Melee center factors in additional gate numbers
    rawMeleeCenter = rawMeleeCenter + defenseToolWallCenter + defenseToolGate + defenseToolMoatCenter + castWall + castGate + castMoat - attackToolWallFront - attackToolGate - attackToolMoatCenter - commanderWall - commanderGate - commanderMoat;
    if (rawMeleeCenter < 0) {
        rawMeleeCenter = 0;
    }
    rawMeleeRight = rawMeleeRight + defenseToolWallRight + defenseToolMoatRight + castWall + castMoat - attackToolWallRight - attackToolMoatRight - commanderWall - commanderMoat;
    if (rawMeleeRight < 0) {
        rawMeleeRight = 0;
    }

    // Adds in Ranged values for these groups
    // If the total ranged value at the walls is less than the total ranged attack tool deduction,
    // then set the ranged value to the attack tool deduction value.
    // TEFKAJ, can you verify that this? If I send 30 shield walls, and they have nothing, does my raw get set to -450?
    // It would seem that we could stack this up ridiculously.
    rawRangedLeft = rawRangedLeft + defenseToolWallLeft + defenseToolRangedLeft + defenseToolMoatLeft + castWall + castMoat - attackToolWallLeft - attackToolRangedLeft - attackToolMoatLeft - commanderWall - commanderMoat;
    if (rawRangedLeft < -attackToolRangedLeft) {
        rawRangedLeft = -attackToolRangedLeft;
    }
    //Adds in gate numbers for the center group
    rawRangedCenter = rawRangedCenter + defenseToolWallCenter + defenseToolGate + defenseToolRangedCenter + defenseToolMoatCenter + castWall + castGate + castMoat - attackToolWallFront - attackToolGate - attackToolRangedCenter - attackToolMoatCenter - commanderWall - commanderGate - commanderMoat;
    if (rawRangedCenter < -attackToolRangedCenter) {
        rawRangedCenter = -attackToolRangedCenter;
    }
    rawRangedRight = rawRangedRight + defenseToolWallRight + defenseToolRangedRight + defenseToolMoatRight + castWall + castMoat - attackToolWallRight - attackToolRangedRight - attackToolMoatRight - commanderWall - commanderMoat;
    if (rawRangedRight < -attackToolRangedRight) {
        rawRangedRight = -attackToolRangedRight;
    }

    // Factors the Castellan and Commander bonuses into the raw scores after
    // everything has been applied, so that the defender can have a minimum chance to defend.
    rawMeleeLeft = rawMeleeLeft + castMelee - commanderMelee;
    rawMeleeCenter = rawMeleeCenter + castMelee - commanderMelee;
    rawMeleeRight = rawMeleeRight + castMelee - commanderMelee;
    rawRangedLeft = rawRangedLeft + castRange - commanderRanged;
    rawRangedCenter = rawRangedCenter + castRange - commanderRanged;
    rawRangedRight = rawRangedRight + castRange - commanderRanged;

    // Spit out the raw M/R values if we're debugging.
    if (debug) {
        s = "&nbsp;";
        answer = answer + "Melee and range values:<br/>";
        answer = answer + rawMeleeLeft + s + rawMeleeCenter + s + rawMeleeRight + "<br/>";
        answer = answer + rawRangedLeft + s + rawRangedCenter + s + rawRangedRight + "<br/>";
    }

    // This is where we calculate the attacking troops raw attack scores.
    // It gets the value from the corresponding troop's box, and multiplies it
    // by the unit's attack score.
    // initialize raw attack values
    var meleeAttackLeft = 0;
    var meleeAttackCenter = 0;
    var meleeAttackRight = 0;
    var rangedAttackLeft = 0;
    var rangedAttackCenter = 0;
    var rangedAttackRight = 0;

    // Here we go. Cast each form value as a number.
    // Spearman
    meleeAttackLeft = meleeAttackLeft + 25 * Number(Form.SL.value);
    meleeAttackCenter = meleeAttackCenter + 25 * Number(Form.SC.value);
    meleeAttackRight = meleeAttackRight + 25 * Number(Form.SR.value);

    // Bowman
    rangedAttackLeft = rangedAttackLeft + 23 * Number(Form.BL.value);
    rangedAttackCenter = rangedAttackCenter + 23 * Number(Form.BC.value);
    rangedAttackRight = rangedAttackRight + 23 * Number(Form.BR.value);

    // Maceman
    meleeAttackLeft = meleeAttackLeft + 38 * Number(Form.ML.value);
    meleeAttackCenter = meleeAttackCenter + 38 * Number(Form.MC.value);
    meleeAttackRight = meleeAttackRight + 38 * Number(Form.MR.value);

    // Crossbowman
    rangedAttackLeft = rangedAttackLeft + 39 * Number(Form.CL.value);
    rangedAttackCenter = rangedAttackCenter + 39 * Number(Form.CC.value);
    rangedAttackRight = rangedAttackRight + 39 * Number(Form.CR.value);

    // Swordsman
    meleeAttackLeft = meleeAttackLeft + 31 * Number(Form.GL.value);
    meleeAttackCenter = meleeAttackCenter + 31 * Number(Form.GC.value);
    meleeAttackRight = meleeAttackRight + 31 * Number(Form.GR.value);

    // Archer
    rangedAttackLeft = rangedAttackLeft + 10 * Number(Form.AL.value);
    rangedAttackCenter = rangedAttackCenter + 10 * Number(Form.AC.value);
    rangedAttackRight = rangedAttackRight + 10 * Number(Form.AR.value);

    // Halberdier
    meleeAttackLeft = meleeAttackLeft + 17 * Number(Form.HL.value);
    meleeAttackCenter = meleeAttackCenter + 17 * Number(Form.HC.value);
    meleeAttackRight = meleeAttackRight + 17 * Number(Form.HR.value);

    // Longbowman
    rangedAttackLeft = rangedAttackLeft + 20 * Number(Form.OL.value);
    rangedAttackCenter = rangedAttackCenter + 20 * Number(Form.OC.value);
    rangedAttackRight = rangedAttackRight + 20 * Number(Form.OR.value);

    // Twohanded Swordsman
    meleeAttackLeft = meleeAttackLeft + 109 * Number(Form.ZL.value);
    meleeAttackCenter = meleeAttackCenter + 109 * Number(Form.ZC.value);
    meleeAttackRight = meleeAttackRight + 109 * Number(Form.ZR.value);

    // Heavy Crossbowman
    rangedAttackLeft = rangedAttackLeft + 92 * Number(Form.XL.value);
    rangedAttackCenter = rangedAttackCenter + 92 * Number(Form.XC.value);
    rangedAttackRight = rangedAttackRight + 92 * Number(Form.XR.value);

    // Veteran Spearman
    meleeAttackLeft = meleeAttackLeft + 15 * Number(Form.VSL.value);
    meleeAttackCenter = meleeAttackCenter + 15 * Number(Form.VSC.value);
    meleeAttackRight = meleeAttackRight + 15 * Number(Form.VSR.value);

    // Veteran Bowman
    rangedAttackLeft = rangedAttackLeft + 18 * Number(Form.VBL.value);
    rangedAttackCenter = rangedAttackCenter + 18 * Number(Form.VBC.value);
    rangedAttackRight = rangedAttackRight + 18 * Number(Form.VBR.value);

    // Veteran Maceman
    meleeAttackLeft = meleeAttackLeft + 118 * Number(Form.VML.value);
    meleeAttackCenter = meleeAttackCenter + 118 * Number(Form.VMC.value);
    meleeAttackRight = meleeAttackRight + 118 * Number(Form.VMR.value);

    //Veteran Crossbowman
    rangedAttackLeft = rangedAttackLeft + 98 * Number(Form.VCL.value);
    rangedAttackCenter = rangedAttackCenter + 98 * Number(Form.VCC.value);
    rangedAttackRight = rangedAttackRight + 98 * Number(Form.VCR.value);

    // Veteran Swordsman ** Should be removed!!!
    meleeAttackLeft = meleeAttackLeft + 111 * Number(Form.VGL.value);
    meleeAttackCenter = meleeAttackCenter + 111 * Number(Form.VGC.value);
    meleeAttackRight = meleeAttackRight + 111 * Number(Form.VGR.value);

    // Shadow Maceman
    meleeAttackLeft = meleeAttackLeft + 38 * Number(Form.SML.value);
    meleeAttackCenter = meleeAttackCenter + 38 * Number(Form.SMC.value);
    meleeAttackRight = meleeAttackRight + 38 * Number(Form.SMR.value);

    // Shadow Crossbowman
    rangedAttackLeft = rangedAttackLeft + 39 * Number(Form.SCL.value);
    rangedAttackCenter = rangedAttackCenter + 39 * Number(Form.SCC.value);
    rangedAttackRight = rangedAttackRight + 39 * Number(Form.SCR.value);

    // Shadow Rogue
    meleeAttackLeft = meleeAttackLeft + 109 * Number(Form.SRL.value);
    meleeAttackCenter = meleeAttackCenter + 109 * Number(Form.SRC.value);
    meleeAttackRight = meleeAttackRight + 109 * Number(Form.SRR.value);

    // Shadow Felon
    rangedAttackLeft = rangedAttackLeft + 92 * Number(Form.SFL.value);
    rangedAttackCenter = rangedAttackCenter + 92 * Number(Form.SFC.value);
    rangedAttackRight = rangedAttackRight + 92 * Number(Form.SFR.value);

    // Marauder
    meleeAttackLeft = meleeAttackLeft + 113 * Number(Form.MAL.value);
    meleeAttackCenter = meleeAttackCenter + 113 * Number(Form.MAC.value);
    meleeAttackRight = meleeAttackRight + 113 * Number(Form.MAR.value);

    // Pyromaniac
    meleeAttackLeft = meleeAttackLeft + 111 * Number(Form.PYL.value);
    meleeAttackCenter = meleeAttackCenter + 111 * Number(Form.PYC.value);
    meleeAttackRight = meleeAttackRight + 111 * Number(Form.PYR.value);

    // Travelling Knight
    meleeAttackLeft = meleeAttackLeft + 132 * Number(Form.TZL.value);
    meleeAttackCenter = meleeAttackCenter + 132 * Number(Form.TZC.value);
    meleeAttackRight = meleeAttackRight + 132 * Number(Form.TZR.value);

    // Travelling Crossbowman
    rangedAttackLeft = rangedAttackLeft + 121 * Number(Form.TXL.value);
    rangedAttackCenter = rangedAttackCenter + 121 * Number(Form.TXC.value);
    rangedAttackRight = rangedAttackRight + 121 * Number(Form.TXR.value);

    // Knight of the Kingsguard
    meleeAttackLeft = meleeAttackLeft + 138 * Number(Form.KZL.value);
    meleeAttackCenter = meleeAttackCenter + 138 * Number(Form.KZC.value);
    meleeAttackRight = meleeAttackRight + 138 * Number(Form.KZR.value);

    // Bowman of the Kingsguard
    rangedAttackLeft = rangedAttackLeft + 127 * Number(Form.KXL.value);
    rangedAttackCenter = rangedAttackCenter + 127 * Number(Form.KXC.value);
    rangedAttackRight = rangedAttackRight + 127 * Number(Form.KXR.value);

    // Sentinel of Kingsguard
    meleeAttackLeft = meleeAttackLeft + 14 * Number(Form.KHL.value);
    meleeAttackCenter = meleeAttackCenter + 14 * Number(Form.KHC.value);
    meleeAttackRight = meleeAttackRight + 14 * Number(Form.KHR.value);

    // Scout of Kingsguard
    rangedAttackLeft = rangedAttackLeft + 16 * Number(Form.KOL.value);
    rangedAttackCenter = rangedAttackCenter + 16 * Number(Form.KOC.value);
    rangedAttackRight = rangedAttackRight + 16 * Number(Form.KOR.value);

    // Norseman with Ax
    meleeAttackLeft = meleeAttackLeft + 109 * Number(Form.NAL.value);
    meleeAttackCenter = meleeAttackCenter + 109 * Number(Form.NAC.value);
    meleeAttackRight = meleeAttackRight + 109 * Number(Form.NAR.value);

    // Norseman with Bow
    rangedAttackLeft = rangedAttackLeft + 86 * Number(Form.NBL.value);
    rangedAttackCenter = rangedAttackCenter + 86 * Number(Form.NBC.value);
    rangedAttackRight = rangedAttackRight + 86 * Number(Form.NBR.value);

    // Barbarian
    meleeAttackLeft = meleeAttackLeft + 113 * Number(Form.BRL.value);
    meleeAttackCenter = meleeAttackCenter + 113 * Number(Form.BRC.value);
    meleeAttackRight = meleeAttackRight + 113 * Number(Form.BRR.value);

    // Desert Bowman
    rangedAttackLeft = rangedAttackLeft + 94 * Number(Form.DBL.value);
    rangedAttackCenter = rangedAttackCenter + 94 * Number(Form.DBC.value);
    rangedAttackRight = rangedAttackRight + 94 * Number(Form.DBR.value);

    // Cultist Warrior
    meleeAttackLeft = meleeAttackLeft + 124 * Number(Form.CWL.value);
    meleeAttackCenter = meleeAttackCenter + 124 * Number(Form.CWC.value);
    meleeAttackRight = meleeAttackRight + 124 * Number(Form.CWR.value);

    // Cultist Bowman
    rangedAttackLeft = rangedAttackLeft + 112 * Number(Form.CBL.value);
    rangedAttackCenter = rangedAttackCenter + 112 * Number(Form.CBC.value);
    rangedAttackRight = rangedAttackRight + 112 * Number(Form.CBR.value);

    // Demon Horror
    meleeAttackLeft = meleeAttackLeft + 185 * Number(Form.DZL.value);
    meleeAttackCenter = meleeAttackCenter + 185 * Number(Form.DZC.value);
    meleeAttackRight = meleeAttackRight + 185 * Number(Form.DZR.value);

    // Deathly Horror
    rangedAttackLeft = rangedAttackLeft + 162 * Number(Form.DXL.value);
    rangedAttackCenter = rangedAttackCenter + 162 * Number(Form.DXC.value);
    rangedAttackRight = rangedAttackRight + 162 * Number(Form.DXR.value);


    var finalMeleeLeft;
    if (rawMeleeLeft > 0) {
        finalMeleeLeft = Math.round(meleeAttackLeft * 100 / (100 + rawMeleeLeft));
    } else {
        finalMeleeLeft = Math.round(meleeAttackLeft * (100 - rawMeleeLeft) / 100);
    }
    var finalMeleeCenter;
    if (rawMeleeCenter > 0) {
        finalMeleeCenter = Math.round(meleeAttackCenter * 100 / (100 + rawMeleeCenter));
    } else {
        finalMeleeCenter = Math.round(meleeAttackCenter * (100 - rawMeleeCenter) / 100);
    }
    var finalMeleeRight;
    if (rawMeleeRight > 0) {
        finalMeleeRight = Math.round(meleeAttackRight * 100 / (100 + rawMeleeRight));
    } else {
        finalMeleeRight = Math.round(meleeAttackRight * (100 - rawMeleeRight) / 100);
    }
    var finalRangedLeft;
    if (rawRangedLeft > 0) {
        finalRangedLeft = Math.round(rangedAttackLeft * 100 / (100 + rawRangedLeft));
    } else {
        finalRangedLeft = Math.round(rangedAttackLeft * (100 - rawRangedLeft) / 100);
    }
    var finalRangedCenter;
    if (rawRangedCenter > 0) {
        finalRangedCenter = Math.round(rangedAttackCenter * 100 / (100 + rawRangedCenter));
    } else {
        finalRangedCenter = Math.round(rangedAttackCenter * (100 - rawRangedCenter) / 100);
    }
    var finalRangedRight;
    if (rawRangedRight > 0) {
        finalRangedRight = Math.round(rangedAttackRight * 100 / (100 + rawRangedRight));
    } else {
        finalRangedRight = Math.round(rangedAttackRight * (100 - rawRangedRight) / 100);
    }

    s = "&nbsp;";
    answer = answer + "melee coefficients: " + rawMeleeLeft + s + rawMeleeCenter + s + rawMeleeRight + "<br/>";
    answer = answer + "range coefficients: " + rawRangedLeft + s + rawRangedCenter + s + rawRangedRight + "<br/>";
    answer = answer + "raw melee numbers: " + meleeAttackLeft + s + meleeAttackCenter + s + meleeAttackRight + "<br/>";
    answer = answer + "raw range numbers: " + rangedAttackLeft + s + rangedAttackCenter + s + rangedAttackRight + "<br/>";

    var totalAttack = meleeAttackLeft + meleeAttackCenter + meleeAttackRight + rangedAttackLeft + rangedAttackCenter + rangedAttackRight;
    if (totalAttack == 0) {
        answer = answer + "Some bad information here... fix your inputs and do NOT want use my solution.<br/>";
    } else {
        answer = answer + "the attack coming is: " + Math.round((meleeAttackLeft + rangedAttackLeft) / totalAttack * 100) + " - " + Math.round((meleeAttackCenter + rangedAttackCenter) / totalAttack * 100) + " - " + Math.round((meleeAttackRight + rangedAttackRight) / totalAttack * 100) + "<br/>";
        if (meleeAttackLeft + rangedAttackLeft == 0) {
            answer = answer + "and is 0 / 0 on the left<br/>";
        } else {
            answer = answer + "and is " + Math.round(meleeAttackLeft / (meleeAttackLeft + rangedAttackLeft) * 100) + " / " + Math.round(rangedAttackLeft / (meleeAttackLeft + rangedAttackLeft) * 100);
            answer += " melee/range on the left<br/>";
        }
        if (meleeAttackCenter + rangedAttackCenter == 0) {
            answer = answer + " and is 0 / 0 in the center<br/>";
        } else {
            answer = answer + "and is " + Math.round(meleeAttackCenter / (meleeAttackCenter + rangedAttackCenter) * 100) + " / " + Math.round(rangedAttackCenter / (meleeAttackCenter + rangedAttackCenter) * 100) + " melee/range in the center<br/>";
        }
        if (meleeAttackRight + rangedAttackRight == 0) {
            answer = answer + " and is 0 / 0 on the right<br/>";
        } else {
            answer = answer + "and is " + Math.round(meleeAttackRight / (meleeAttackRight + rangedAttackRight) * 100) + " / " + Math.round(rangedAttackRight / (meleeAttackRight + rangedAttackRight) * 100) + " melee/range on the right<br/>";
        }
    }

    answer = answer + "THE ABOVE IS CORRECT AND USEFUL<br/><br/>";
    answer = answer + "THE FOLLOWING IS ARGUABLY GOOD ADVICE:<br/>";
    answer = answer + "Final results:<br/>";
    answer = answer + "melee: " + finalMeleeLeft + s + finalMeleeCenter + s + finalMeleeRight + "<br/>";
    answer = answer + "range: " + finalRangedLeft + s + finalRangedCenter + s + finalRangedRight + "<br/>";


    var meleeDefenderCountLeft = Math.round(finalMeleeLeft / meleeDefenseVal);
    var meleeDefenderCountCenter = Math.round(finalMeleeCenter / meleeDefenseVal);
    var meleeDefenderCountRight = Math.round(finalMeleeRight / meleeDefenseVal);
    var rangedDefenderCountLeft = Math.round(finalRangedLeft / rangedDefenseVal);
    var rangedDefenderCountCenter = Math.round(finalRangedCenter / rangedDefenseVal);
    var rangedDefenderCountRight = Math.round(finalRangedRight / rangedDefenseVal);

    answer = answer + "Using " + meleeDefenderName + " and " + rangedDefenderName + ", you will need:<br/>";
    answer = answer + meleeDefenderCountLeft + s + meleeDefenderCountCenter + s + meleeDefenderCountRight + s + meleeDefenderName + "<br/>";
    answer = answer + rangedDefenderCountLeft + s + rangedDefenderCountCenter + s + rangedDefenderCountRight + s + rangedDefenderName + "<br/>";

    var totalAttackScore = finalMeleeLeft + finalMeleeCenter + finalMeleeRight + finalRangedLeft + finalRangedCenter + finalRangedRight;
    var meleePercentageLeft = Math.round(finalMeleeLeft / (finalMeleeLeft + finalRangedLeft) * 100);
    var meleePercentageCenter = Math.round(finalMeleeCenter / (finalMeleeCenter + finalRangedCenter) * 100);
    var meleePercentageRight = Math.round(finalMeleeRight / (finalMeleeRight + finalRangedRight) * 100);
    var rangedPercentageLeft = Math.round(finalRangedLeft / (finalMeleeLeft + finalRangedLeft) * 100);
    var rangedPercentageCenter = Math.round(finalRangedCenter / (finalMeleeCenter + finalRangedCenter) * 100);
    var rangedPercentageRight = Math.round(finalRangedRight / (finalMeleeRight + finalRangedRight) * 100);

    answer = answer + "<br/>I think that:<br/>";
    if (meleeDefenderCountLeft + meleeDefenderCountCenter + meleeDefenderCountRight + rangedDefenderCountLeft + rangedDefenderCountCenter + rangedDefenderCountRight <= troops) {
        answer = answer + "You can hold all three walls!<br/>";
        answer = answer + "Set your walls to " + Math.round((finalMeleeLeft + finalRangedLeft) / totalAttackScore * 100) + " - " + Math.round((finalMeleeCenter + finalRangedCenter) / totalAttackScore * 100) + " - " + Math.round((finalMeleeRight + finalRangedRight) / totalAttackScore * 100) + "<br/>";
        answer = answer + "and use M/R of: " + meleePercentageLeft + "/" + rangedPercentageLeft + s + meleePercentageCenter + "/" + rangedPercentageCenter + s + meleePercentageRight + "/" + rangedPercentageRight + "<br/>";
    } else if (meleeDefenderCountLeft + rangedDefenderCountLeft + meleeDefenderCountCenter + rangedDefenderCountCenter <= troops) {
        answer = answer + "You can hold the left and center!<br/>";
        answer = answer + "Set your walls to " + Math.round((finalMeleeLeft + finalRangedLeft) / (finalMeleeLeft + finalRangedLeft + finalMeleeCenter + finalRangedCenter) * 100) + " - " + Math.round((finalMeleeCenter + finalRangedCenter) / (finalMeleeLeft + finalRangedLeft + finalMeleeCenter + finalRangedCenter) * 100) + " - 0 <br/>";
        answer = answer + "and use M/R of: " + meleePercentageLeft + "/" + rangedPercentageLeft + s + meleePercentageCenter + "/" + rangedPercentageCenter + " 50/50<br/>";
    } else if (meleeDefenderCountCenter + rangedDefenderCountCenter + meleeDefenderCountRight + rangedDefenderCountRight <= troops) {
        answer = answer + "You can hold the center and right!<br/>";
        answer = answer + "Set your walls to 0 - " + Math.round((finalMeleeCenter + finalRangedCenter) / (finalMeleeCenter + finalRangedCenter + finalMeleeRight + finalRangedRight) * 100) + " - " + Math.round((finalMeleeRight + finalRangedRight) / (finalMeleeCenter + finalRangedCenter + finalMeleeRight + finalRangedRight) * 100) + "<br/>";
        answer = answer + "and use M/R of: 50/50 " + meleePercentageCenter + "/" + rangedPercentageCenter + s + meleePercentageRight + "/" + rangedPercentageRight + "<br/>";
    } else if (meleeDefenderCountLeft + rangedDefenderCountLeft + meleeDefenderCountRight + rangedDefenderCountRight <= troops) {
        answer = answer + "You can hold the left and right walls!<br/>";
        answer = answer + "Set your walls to " + Math.round((finalMeleeLeft + finalRangedLeft) / (finalMeleeLeft + finalRangedLeft + finalMeleeRight + finalRangedRight) * 100) + " - 0 - " + Math.round((finalMeleeRight + finalRangedRight) / (finalMeleeLeft + finalRangedLeft + finalMeleeRight + finalRangedRight) * 100) + "<br/>";
        answer = answer + "and use M/R of: " + meleePercentageLeft + "/" + rangedPercentageLeft + " 50/50 " + meleePercentageRight + "/" + rangedPercentageRight + "<br/>";
    } else if (meleeDefenderCountCenter + rangedDefenderCountCenter <= troops) {
        answer = answer + "Well, you can hold the center, and that is something, right?<br/>";
        answer = answer + "Set your walls to 0 - 100 - 0 and pray. That's your best bet.<br/>";
        answer = answer + "and use M/R of: " + meleePercentageCenter + "/" + rangedPercentageCenter + "<br/>";
    } else if (meleeDefenderCountLeft + rangedDefenderCountLeft <= troops) {
        answer = answer + "Well, hang on to the left wall, at least you can do that.<br/>";
        answer = answer + "Set your walls to 100 - 0 - 0 and pray. That's your best bet.<br/>";
        answer = answer + "and use M/R of: " + meleePercentageLeft + "/" + rangedPercentageLeft + "<br/>";
    } else if (meleeDefenderCountRight + rangedDefenderCountRight <= troops) {
        answer = answer + "Well, hang on to the right wall, at least you can do that.<br/>";
        answer = answer + "Set your walls to 0 - 0 - 100 and pray. That's your best bet.<br/>";
        answer = answer + "and use M/R of: " + meleePercentageRight + "/" + rangedPercentageRight + "<br/>";
    } else {
        answer = answer + "Consider opening your gates. Seriously. Move everyone out. Now!<br/>";
        answer = answer + "Your best bet is to place your head between your legs and kiss your ass goodbye.<br/>";
    }

    document.getElementById("answer").innerHTML = answer;
    document.getElementById("answer2").innerHTML = answer;
}

/* Phil's Espionage Without Spies */

// ReSharper disable InconsistentNaming

function Espi_calc(Form) {
    // ReSharper restore InconsistentNaming
    var towerCount0 = Number(Form.Tower0.value);
    var towerCount1 = Number(Form.Tower1.value);
    var towerCount2 = Number(Form.Tower2.value);
    var towerCount3 = Number(Form.Tower3.value);
    var towerCount4 = Number(Form.Tower4.value);
    var answer;
    var ok = false;

    if (towerCount0 >= 0 && towerCount1 >= 0 && towerCount2 >= 0 && towerCount3 >= 0 && towerCount4 >= 0 && towerCount0 + towerCount1 + towerCount2 + towerCount3 + towerCount4 <= 20) {
        answer = 13 * towerCount4 + 10 * towerCount3 + 6 * towerCount2 + 3 * towerCount1 + towerCount0 + " men on the walls<br/><br/>";
    } else {
        answer = "Cannot count the men on the walls<br/><br/>";
    }

    var wallCoefficient;
    for (var i = 0; i < 4; i++) {
        if (Form.Walle[i].checked) {
            wallCoefficient = Number(Form.Walle[i].value);
            ok = true;
        }
    }
    if (ok) {
        var maxWallPercent = 20 * wallCoefficient + 50;
        answer = answer + 20 * wallCoefficient + "% wall bonus before tools  (maximum you will face is " + maxWallPercent + "% per section per wave)<br/>";
        answer = answer + "Send at least " + Math.round(20 * wallCoefficient / 10) + " ladders, " + Math.round(20 * wallCoefficient / 15) + " siege towers, or " + Math.round(20 * wallCoefficient / 20) + " belfries in each section.<br/>";
        answer = answer + "But no more than " + Math.round(maxWallPercent / 10) + " ladders, " + Math.round(maxWallPercent / 15) + " siege towers, or " + Math.round(maxWallPercent / 20) + " belfries in each section.<br/><br/>";
    } else {
        answer = answer + "Cannot calculate the wall bonus<br/><br/>";
    }
    var gateCoefficient = Number(Form.Gatee.value);
    if (gateCoefficient > 0 && gateCoefficient < 6) {
        var maxGatePercent = 20 * gateCoefficient + 75;
        answer = answer + 20 * gateCoefficient + "% gate bonus before tools (maximum you will face is " + maxGatePercent + "% per section per wave)<br/>";
        answer = answer + "Send at least " + Math.round(20 * gateCoefficient / 10) + " battering rams, " + Math.round(20 * gateCoefficient / 15) + " iron rams, or " + Math.round(20 * gateCoefficient / 20) + " heavy rams in each section.<br/>";
        answer = answer + "But no more than " + Math.round(maxGatePercent / 10) + " battering rams, " + Math.round(maxGatePercent / 15) + " iron rams, or " + Math.round(maxGatePercent / 20) + " heavy rams in each section.<br/><br/>";
    } else {
        answer = answer + "Cannot calculate the gate bonus<br/><br/>";
    }
    ok = false;
    var moatCoefficient;
    for (i = 0; i < 3; i++) {
        if (Form.Moate[i].checked) {
            moatCoefficient = Number(Form.Moate[i].value);
            ok = true;
        }
    }
    if (ok) {
        var maxMoatPercent;
        if (moatCoefficient > 0) {
            maxMoatPercent = 10 * moatCoefficient + 110;
        } else {
            maxMoatPercent = 0;
        }
        answer = answer + 10 * moatCoefficient + "% moat bonus before tools (maximum you will face is " + maxMoatPercent + "% per section per wave)<br/>";
        answer = answer + "Send at least " + Math.round(10 * moatCoefficient / 5) + " wood bundles, " + Math.round(10 * moatCoefficient / 10) + " assault bridges, or " + Math.round(10 * moatCoefficient / 15) + " boulders in each section.<br/>";
        answer = answer + "But no more than " + Math.round(maxMoatPercent / 5) + " wood bundles, " + Math.round(maxMoatPercent / 10) + " assault bridges, or " + Math.round(maxMoatPercent / 15) + " boulders in each section.<br/><br/>";
    } else {
        answer = answer + "Cannot calculate the moat bonus<br/><br/>";
    }
    document.getElementById("toolsanswer").innerHTML = answer;
}
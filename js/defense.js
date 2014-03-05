/* Phil's Highly Unused Combat Evaluating Monster! v0.3 20130912 
This was my second and last attempt at javascript. The first is the attack calculator.
Never could get arrays to work for me, sorry for the variable names. Did not waste
very much time on the UI either, obviously. Plenty of room for improvement.
But it cruches the numbers just fine; worked for me in every in-game test.
*/

function Combat_calc(Form) {
    debug = false;
    m0 = 0;
    m1 = 0;
    m2 = 0;
    r0 = 0;
    r1 = 0;
    r2 = 0;
    answer = "working...<BR>";
    ok = false;
    for (i = 0; i < 5; i++) {
        if (Form.Wall[i].checked) {
            t = Number(Form.Wall[i].value);
            ok = true
        }
    }
    if (ok) {
        t = t * 20;
        m0 += t;
        m1 += t;
        m2 += t;
        r0 += t;
        r1 += t;
        r2 += t
    } else {
        answer = answer + "Problem with castle wall.<BR>"
    }

    t = Number(Form.Gate.value);
    if (t > 0 && t < 6) {
        t = t * 20;
        m1 += t;
        r1 += t
    } else {
        answer = answer + "Problem with castle gate.<BR>"
    }

    ok = false;
    for (i = 0; i < 3; i++) {
        if (Form.Moat[i].checked) {
            t = Number(Form.Moat[i].value);
            ok = true
        }
    }
    if (ok) {
        t = t * 10;
        m0 += t;
        m1 += t;
        m2 += t;
        r0 += t;
        r1 += t;
        r2 += t
    } else {
        answer = answer + "Problem with castle moat.<BR>"
    }

    troops = Number(Form.Troops.value);
    if (troops < 4 || troops > 320) {
        answer = answer + "Problem with troop count.<BR>"
    }

    if (Form.TroopType[0].checked) {
        mdefval = 135;
        mdefname = "Halberdiers";
        rdefval = 125;
        rdefname = "Longbowmen"
    }
    if (Form.TroopType[1].checked) {
        mdefval = 142;
        mdefname = "Veteran Spearmen";
        rdefval = 132;
        rdefname = "Veteran Bowmen"
    }
    if (Form.TroopType[2].checked) {
        mdefval = 150;
        mdefname = "Sentinels of Kingsguard";
        rdefval = 139;
        rdefname = "Scouts of Kingsguard"
    }
    if (debug) {
        answer = answer + "MDEFVAL: " + mdefval + " " + mdefname + " RDEFVAL: " + rdefval + " " + rdefname + "<BR>"
    }

    ll = Number(Form.LL.value);
    lc = Number(Form.LC.value);
    lr = Number(Form.LR.value);
    stl = Number(Form.STL.value);
    stc = Number(Form.STC.value);
    str = Number(Form.STR.value);
    el = Number(Form.EL.value);
    ec = Number(Form.EC.value);
    er = Number(Form.ER.value);
    brc = Number(Form.FBRC.value);
    irc = Number(Form.IRC.value);
    hrc = Number(Form.HRC.value);
    nl = Number(Form.NL.value);
    nc = Number(Form.NC.value);
    nr = Number(Form.NR.value);
    cml = Number(Form.CML.value);
    cmc = Number(Form.CMC.value);
    cmr = Number(Form.CMR.value);
    swl = Number(Form.FSWL.value);
    swc = Number(Form.FSWC.value);
    swr = Number(Form.FSWR.value);
    wbl = Number(Form.WBL.value);
    wbc = Number(Form.WBC.value);
    wbr = Number(Form.WBR.value);
    abl = Number(Form.ABL.value);
    abc = Number(Form.ABC.value);
    abr = Number(Form.ABR.value);
    bll = Number(Form.BLL.value);
    blc = Number(Form.BLC.value);
    blr = Number(Form.BLR.value);
    rl = Number(Form.RL.value);
    rc = Number(Form.RC.value);
    rr = Number(Form.RR.value);
    tl = Number(Form.TL.value);
    tc = Number(Form.TC.value);
    tr = Number(Form.TR.value);
    mal = Number(Form.FMAL.value);
    mac = Number(Form.FMAC.value);
    mar = Number(Form.FMAR.value);
    grc = Number(Form.GRC.value);
    imc = Number(Form.IMC.value);
    pc = Number(Form.PC.value);
    fal = Number(Form.FAL.value);
    fac = Number(Form.FAC.value);
    far = Number(Form.FAR.value);
    wl = Number(Form.WL.value);
    wc = Number(Form.WC.value);
    wr = Number(Form.WR.value);
    asl = Number(Form.ASL.value);
    asc = Number(Form.ASC.value);
    asr = Number(Form.ASR.value);
    ssl = Number(Form.SSL.value);
    ssc = Number(Form.SSC.value);
    ssr = Number(Form.SSR.value);
    gsl = Number(Form.GSL.value);
    gsc = Number(Form.GSC.value);
    gsr = Number(Form.GSR.value);
    fml = Number(Form.FML.value);
    fmc = Number(Form.FMC.value);
    fmr = Number(Form.FMR.value);

    if (rl < 0 || rc < 0 || rr < 0 || tl < 0 || tc < 0 || tr < 0 || mal < 0 || mac < 0 || mar < 0) {
        answer = answer + "Problem with defensive wall tool numbers<BR>"
    }
    if (rl + rc + rr + tl + tc + tr + mal + mac + mar > 36) {
        answer = answer + "Problem with defensive wall tool numbers<BR>"
    }
    if (grc < 0 || imc < 0 || pc < 0) {
        answer = answer + "Problem with defensive gate tool numbers<BR>"
    }
    if (grc + imc + pc > 8) {
        answer = answer + "Problem with defensive gate tool numbers<BR>"
    }
    if (fal < 0 || fac < 0 || far < 0 || wl < 0 || wc < 0 || wr < 0 || asl < 0 || asc < 0 || asr < 0) {
        answer = answer + "Problem with defensive range tool numbers<BR>"
    }
    if (fal + fac + far + wl + wc + wr + asl + asc + asr > 12) {
        answer = answer + "Problem with defensive range tool numbers<BR>"
    }
    if (ssl < 0 || ssc < 0 || ssr < 0 || gsl < 0 || gsc < 0 || gsr < 0 || fml < 0 || fmc < 0 || fmr < 0) {
        answer = answer + "Problem with defensive moat tool numbers<BR>"
    }
    if (ssl + ssc + ssr + gsl + gsc + gsr + fml + fmc + fmr > 12) {
        answer = answer + "Problem with defensive moat tool numbers<BR>"
    }

    if (debug) {
        s = "&nbsp;";
        answer = answer + "Raw tool data:<BR>";
        answer = answer + ll + s + lc + s + lr + s + s + rl + s + rc + s + rr + "<BR>";
        answer = answer + stl + s + stc + s + str + s + s + tl + s + tc + s + tr + "<BR>";
        answer = answer + el + s + ec + s + er + s + s + mal + s + mac + s + mar + "<BR>";
        answer = answer + brc + s + grc + "<BR>";
        answer = answer + irc + s + imc + "<BR>";
        answer = answer + hrc + s + pc + "<BR>";
        answer = answer + nl + s + nc + s + nr + s + s + fal + s + fac + s + far + "<BR>";
        answer = answer + cml + s + cmc + s + cmr + s + s + wl + s + wc + s + wr + "<BR>";
        answer = answer + swl + s + swc + s + swr + s + s + asl + s + asc + s + asr + "<BR>";
        answer = answer + wbl + s + wbc + s + wbr + s + s + ssl + s + ssc + s + ssr + "<BR>";
        answer = answer + abl + s + abc + s + abr + s + s + gsl + s + gsc + s + gsr + "<BR>";
        answer = answer + bll + s + blc + s + blr + s + s + fml + s + fmc + s + fmr + "<BR>"
    }

    attwl = 10 * ll + 15 * stl + 20 * el;
    attwc = 10 * lc + 15 * stc + 20 * ec;
    attwr = 10 * lr + 15 * str + 20 * er;
    attgc = 10 * brc + 15 * irc + 20 * hrc;
    attrl = 5 * nl + 10 * cml + 15 * swl;
    attrc = 5 * nc + 10 * cmc + 15 * swc;
    attrr = 5 * nr + 10 * cmr + 15 * swr;
    attml = 5 * wbl + 10 * abl + 15 * bll;
    attmc = 5 * wbc + 10 * abc + 15 * blc;
    attmr = 5 * wbr + 10 * abr + 15 * blr;

    defwl = 25 * rl + 40 * tl + 50 * mal;
    defwc = 25 * rc + 40 * tc + 50 * mac;
    defwr = 25 * rr + 40 * tr + 50 * mar;
    defgc = 35 * grc + 60 * imc + 75 * pc;
    defrl = 25 * fal + 50 * wl + 70 * asl;
    defrc = 25 * fac + 50 * wc + 70 * asc;
    defrr = 25 * far + 50 * wr + 70 * asr;
    defml = 35 * ssl + 80 * gsl + 110 * fml;
    defmc = 35 * ssc + 80 * gsc + 110 * fmc;
    defmr = 35 * ssr + 80 * gsr + 110 * fmr;

    if (debug) {
        s = "&nbsp;";
        answer = answer + "Tool calculations:<BR>";
        answer = answer + attwl + s + attwc + s + attwr + s + s + defwl + s + defwc + s + defwr + "<BR>";
        answer = answer + attgc + s + defgc + "<BR>";
        answer = answer + attrl + s + attrc + s + attrr + s + s + defrl + s + defrc + s + defrr + "<BR>";
        answer = answer + attml + s + attmc + s + attmr + s + s + defml + s + defmc + s + defmr + "<BR>"
    }

    casw = Number(Form.CasWall.value);
    if (casw < 0 || casw > 100) {
        answer = answer + "Problem with Castellan wall value<BR>"
    }
    casg = Number(Form.CasGate.value);
    if (casg < 0 || casg > 100) {
        answer = answer + "Problem with Castellan gate value<BR>"
    }
    casd = Number(Form.CasMoat.value);
    if (casd < 0 || casd > 100) {
        answer = answer + "Problem with Castellan moat value<BR>"
    }
    casm = Number(Form.CasMelee.value);
    if (casm < 0 || casm > 100) {
        answer = answer + "Problem with Castellan melee value<BR>"
    }
    casr = Number(Form.CasRange.value);
    if (casr < 0 || casr > 100) {
        answer = answer + "Problem with Castellan range value<BR>"
    }
    comw = Number(Form.ComWall.value);
    if (comw < 0 || comw > 100) {
        answer = answer + "Problem with Commander wall value<BR>"
    }
    comg = Number(Form.ComGate.value);
    if (comg < 0 || comg > 100) {
        answer = answer + "Problem with Commander gate value<BR>"
    }
    comd = Number(Form.ComMoat.value);
    if (comd < 0 || comd > 100) {
        answer = answer + "Problem with Commander moat value<BR>"
    }
    comm = Number(Form.ComMelee.value);
    if (comm < 0 || comm > 100) {
        answer = answer + "Problem with Commander melee value<BR>"
    }
    comr = Number(Form.ComRange.value);
    if (comr < 0 || comr > 100) {
        answer = answer + "Problem with Commander range value<BR>"
    }

    m0 = m0 + defwl + defml - attwl - attml + casw + casd - comw - comd;
    if (m0 < 0) {
        m0 = 0
    }
    m1 = m1 + defwc + defgc + defmc + casw + casg + casd - attwc - attgc - attmc - comw - comg - comd;
    if (m1 < 0) {
        m1 = 0
    }
    m2 = m2 + defwr + defmr + casw + casd - attwr - attmr - comw - comd;
    if (m2 < 0) {
        m2 = 0
    }
    r0 = r0 + defwl + defrl + defml + casw + casd - attwl - attrl - attml - comw - comd;
    if (r0 < -attrl) {
        r0 = -attrl
    }
    r1 = r1 + defwc + defgc + defrc + defmc + casw + casg + casd - attwc - attgc - attrc - attmc - comw - comg - comd;
    if (r1 < -attrc) {
        r1 = -attrc
    }
    r2 = r2 + defwr + defrr + defmr + casw + casd - attwr - attrr - attmr - comw - comd;
    if (r2 < -attrr) {
        r2 = -attrr
    }
    m0 = m0 + casm - comm;
    m1 = m1 + casm - comm;
    m2 = m2 + casm - comm;
    r0 = r0 + casr - comr;
    r1 = r1 + casr - comr;
    r2 = r2 + casr - comr;

    if (debug) {
        s = "&nbsp;";
        answer = answer + "Melee and range values:<BR>";
        answer = answer + m0 + s + m1 + s + m2 + "<BR>";
        answer = answer + r0 + s + r1 + s + r2 + "<BR>"
    }

    lm = 0;
    cm = 0;
    rm = 0;
    lr = 0;
    cr = 0;
    rr = 0;
    lm = lm + 25 * Number(Form.SL.value);
    cm = cm + 25 * Number(Form.SC.value);
    rm = rm + 25 * Number(Form.SR.value);
    lr = lr + 23 * Number(Form.BL.value);
    cr = cr + 23 * Number(Form.BC.value);
    rr = rr + 23 * Number(Form.BR.value);
    lm = lm + 38 * Number(Form.ML.value);
    cm = cm + 38 * Number(Form.MC.value);
    rm = rm + 38 * Number(Form.MR.value);
    lr = lr + 39 * Number(Form.CL.value);
    cr = cr + 39 * Number(Form.CC.value);
    rr = rr + 39 * Number(Form.CR.value);
    lm = lm + 31 * Number(Form.GL.value);
    cm = cm + 31 * Number(Form.GC.value);
    rm = rm + 31 * Number(Form.GR.value);
    lr = lr + 10 * Number(Form.AL.value);
    cr = cr + 10 * Number(Form.AC.value);
    rr = rr + 10 * Number(Form.AR.value);
    lm = lm + 17 * Number(Form.HL.value);
    cm = cm + 17 * Number(Form.HC.value);
    rm = rm + 17 * Number(Form.HR.value);
    lr = lr + 20 * Number(Form.OL.value);
    cr = cr + 20 * Number(Form.OC.value);
    rr = rr + 20 * Number(Form.OR.value);
    lm = lm + 109 * Number(Form.ZL.value);
    cm = cm + 109 * Number(Form.ZC.value);
    rm = rm + 109 * Number(Form.ZR.value);
    lr = lr + 92 * Number(Form.XL.value);
    cr = cr + 92 * Number(Form.XC.value);
    rr = rr + 92 * Number(Form.XR.value);
    if (debug) {
        answer = answer + "Z: " + Number(Form.ZL.value) + s + Number(Form.ZC.value) + s + Number(Form.ZR.value) + "<BR>";
        answer = answer + "R: " + Number(Form.XL.value) + s + Number(Form.XC.value) + s + Number(Form.XR.value) + "<BR>"
    }
    lm = lm + 15 * Number(Form.VSL.value);
    cm = cm + 15 * Number(Form.VSC.value);
    rm = rm + 15 * Number(Form.VSR.value);
    lr = lr + 18 * Number(Form.VBL.value);
    cr = cr + 18 * Number(Form.VBC.value);
    rr = rr + 18 * Number(Form.VBR.value);
    lm = lm + 118 * Number(Form.VML.value);
    cm = cm + 118 * Number(Form.VMC.value);
    rm = rm + 118 * Number(Form.VMR.value);
    lr = lr + 98 * Number(Form.VCL.value);
    cr = cr + 98 * Number(Form.VCC.value);
    rr = rr + 98 * Number(Form.VCR.value);
    lm = lm + 111 * Number(Form.VGL.value);
    cm = cm + 111 * Number(Form.VGC.value);
    rm = rm + 111 * Number(Form.VGR.value);
    lm = lm + 38 * Number(Form.SML.value);
    cm = cm + 38 * Number(Form.SMC.value);
    rm = rm + 38 * Number(Form.SMR.value);
    lr = lr + 39 * Number(Form.SCL.value);
    cr = cr + 39 * Number(Form.SCC.value);
    rr = rr + 39 * Number(Form.SCR.value);
    lm = lm + 109 * Number(Form.SRL.value);
    cm = cm + 109 * Number(Form.SRC.value);
    rm = rm + 109 * Number(Form.SRR.value);
    lr = lr + 92 * Number(Form.SFL.value);
    cr = cr + 92 * Number(Form.SFC.value);
    rr = rr + 92 * Number(Form.SFR.value);
    lm = lm + 113 * Number(Form.MAL.value);
    cm = cm + 113 * Number(Form.MAC.value);
    rm = rm + 113 * Number(Form.MAR.value);
    lm = lm + 111 * Number(Form.PYL.value);
    cm = cm + 111 * Number(Form.PYC.value);
    rm = rm + 111 * Number(Form.PYR.value);
    lm = lm + 132 * Number(Form.TZL.value);
    cm = cm + 132 * Number(Form.TZC.value);
    rm = rm + 132 * Number(Form.TZR.value);
    lr = lr + 121 * Number(Form.TXL.value);
    cr = cr + 121 * Number(Form.TXC.value);
    rr = rr + 121 * Number(Form.TXR.value);
    lm = lm + 138 * Number(Form.KZL.value);
    cm = cm + 138 * Number(Form.KZC.value);
    rm = rm + 138 * Number(Form.KZR.value);
    lr = lr + 127 * Number(Form.KXL.value);
    cr = cr + 127 * Number(Form.KXC.value);
    rr = rr + 127 * Number(Form.KXR.value);
    lm = lm + 14 * Number(Form.KHL.value);
    cm = cm + 14 * Number(Form.KHC.value);
    rm = rm + 14 * Number(Form.KHR.value);
    lr = lr + 16 * Number(Form.KOL.value);
    cr = cr + 16 * Number(Form.KOC.value);
    rr = rr + 16 * Number(Form.KOR.value);
    lm = lm + 109 * Number(Form.NAL.value);
    cm = cm + 109 * Number(Form.NAC.value);
    rm = rm + 109 * Number(Form.NAR.value);
    lr = lr + 86 * Number(Form.NBL.value);
    cr = cr + 86 * Number(Form.NBC.value);
    rr = rr + 86 * Number(Form.NBR.value);
    lm = lm + 75 * Number(Form.WHL.value);
    cm = cm + 75 * Number(Form.WHC.value);
    rm = rm + 75 * Number(Form.WHR.value);
    lm = lm + 113 * Number(Form.BRL.value);
    cm = cm + 113 * Number(Form.BRC.value);
    rm = rm + 113 * Number(Form.BRR.value);
    lm = lm + 111 * Number(Form.SWL.value);
    cm = cm + 111 * Number(Form.SWC.value);
    rm = rm + 111 * Number(Form.SWR.value);
    lr = lr + 94 * Number(Form.DBL.value);
    cr = cr + 94 * Number(Form.DBC.value);
    rr = rr + 94 * Number(Form.DBR.value);
    lr = lr + 16 * Number(Form.CAL.value);
    cr = cr + 16 * Number(Form.CAC.value);
    rr = rr + 16 * Number(Form.CAR.value);
    lm = lm + 14 * Number(Form.FBL.value);
    cm = cm + 14 * Number(Form.FBC.value);
    rm = rm + 14 * Number(Form.FBR.value);
    lm = lm + 124 * Number(Form.CWL.value);
    cm = cm + 124 * Number(Form.CWC.value);
    rm = rm + 124 * Number(Form.CWR.value);
    lr = lr + 112 * Number(Form.CBL.value);
    cr = cr + 112 * Number(Form.CBC.value);
    rr = rr + 112 * Number(Form.CBR.value);
    lm = lm + 185 * Number(Form.DZL.value);
    cm = cm + 185 * Number(Form.DZC.value);
    rm = rm + 185 * Number(Form.DZR.value);
    lr = lr + 162 * Number(Form.DXL.value);
    cr = cr + 162 * Number(Form.DXC.value);
    rr = rr + 162 * Number(Form.DXR.value);
    lr = lr + 98 * Number(Form.LBL.value);
    cr = cr + 98 * Number(Form.LBC.value);
    rr = rr + 98 * Number(Form.LBR.value);
    lm = lm + 117 * Number(Form.LWL.value);
    cm = cm + 117 * Number(Form.LWC.value);
    rm = rm + 117 * Number(Form.LWR.value);
    lr = lr + 98 * Number(Form.BBL.value);
    cr = cr + 98 * Number(Form.BBC.value);
    rr = rr + 98 * Number(Form.BBR.value);
    lm = lm + 117 * Number(Form.BWL.value);
    cm = cm + 117 * Number(Form.BWC.value);
    rm = rm + 117 * Number(Form.BWR.value);

    if (m0 > 0) {
        fm0 = Math.round(lm * 100 / (100 + m0))
    } else {
        fm0 = Math.round(lm * (100 - m0) / 100)
    }
    if (m1 > 0) {
        fm1 = Math.round(cm * 100 / (100 + m1))
    } else {
        fm1 = Math.round(cm * (100 - m1) / 100)
    }
    if (m2 > 0) {
        fm2 = Math.round(rm * 100 / (100 + m2))
    } else {
        fm2 = Math.round(rm * (100 - m2) / 100)
    }
    if (r0 > 0) {
        fr0 = Math.round(lr * 100 / (100 + r0))
    } else {
        fr0 = Math.round(lr * (100 - r0) / 100)
    }
    if (r1 > 0) {
        fr1 = Math.round(cr * 100 / (100 + r1))
    } else {
        fr1 = Math.round(cr * (100 - r1) / 100)
    }
    if (r2 > 0) {
        fr2 = Math.round(rr * 100 / (100 + r2))
    } else {
        fr2 = Math.round(rr * (100 - r2) / 100)
    }

    s = "&nbsp;";
    answer = answer + "melee coefficients: " + m0 + s + m1 + s + m2 + "<BR>";
    answer = answer + "range coefficients: " + r0 + s + r1 + s + r2 + "<BR>";
    answer = answer + "raw melee numbers: " + lm + s + cm + s + rm + "<BR>";
    answer = answer + "raw range numbers: " + lr + s + cr + s + rr + "<BR>";

    ta = lm + cm + rm + lr + cr + rr;
    if (ta == 0) {
        answer = answer + "Some bad information here... you do NOT want to see my solution.<BR>"
    } else {
        answer = answer + "the attack coming is: " + Math.round((lm + lr) / ta * 100) + " - " + Math.round((cm + cr) / ta * 100) + " - " + Math.round((rm + rr) / ta * 100) + "<BR>";
        if (lm + lr == 0) {
            answer = answer + "and is 0 / 0 on the left<BR>"
        } else {
            answer = answer + "and is " + Math.round(lm / (lm + lr) * 100) + " / " + Math.round(lr / (lm + lr) * 100) + " melee/range on the left<BR>"
        }
        if (cm + cr == 0) {
            answer = answer + " and is 0 / 0 in the center<BR>"
        } else {
            answer = answer + "and is " + Math.round(cm / (cm + cr) * 100) + " / " + Math.round(cr / (cm + cr) * 100) + " melee/range in the center<BR>"
        }
        if (rm + rr == 0) {
            answer = answer + " and is 0 / 0 on the right<BR>"
        } else {
            answer = answer + "and is " + Math.round(rm / (rm + rr) * 100) + " / " + Math.round(rr / (rm + rr) * 100) + " melee/range on the right<BR>"
        }
    }

    answer = answer + "THE ABOVE IS CORRECT AND USEFUL (as of this posting)<BR><BR>"
    answer = answer + "THE FOLLOWING IS ARGUABLY GOOD ADVICE:<BR>"
    answer = answer + "Final results:<BR>";
    answer = answer + "melee: " + fm0 + s + fm1 + s + fm2 + "<BR>";
    answer = answer + "range: " + fr0 + s + fr1 + s + fr2 + "<BR>";

    answer = answer + "Using " + mdefname + " and " + rdefname + ", you will need:<BR>";
    ffm0 = Math.round(fm0 / mdefval);
    ffm1 = Math.round(fm1 / mdefval);
    ffm2 = Math.round(fm2 / mdefval);
    ffr0 = Math.round(fr0 / rdefval);
    ffr1 = Math.round(fr1 / rdefval);
    ffr2 = Math.round(fr2 / rdefval);
    answer = answer + ffm0 + s + ffm1 + s + ffm2 + s + mdefname + "<BR>";
    answer = answer + ffr0 + s + ffr1 + s + ffr2 + s + rdefname + "<BR>";

    answer = answer + "<BR>Using very primitive (stupid) AI, I think that:<BR>";
    ftot = fm0 + fm1 + fm2 + fr0 + fr1 + fr2;
    x1 = Math.round(fm0 / (fm0 + fr0) * 100);
    x2 = Math.round(fm1 / (fm1 + fr1) * 100);
    x3 = Math.round(fm2 / (fm2 + fr2) * 100);
    y1 = Math.round(fr0 / (fm0 + fr0) * 100);
    y2 = Math.round(fr1 / (fm1 + fr1) * 100);
    y3 = Math.round(fr2 / (fm2 + fr2) * 100);
    if (ffm0 + ffm1 + ffm2 + ffr0 + ffr1 + ffr2 <= troops) {
        answer = answer + "You can hold all three walls!<BR>";
        answer = answer + "Set your walls to " + Math.round((fm0 + fr0) / ftot * 100) +
            " - " + Math.round((fm1 + fr1) / ftot * 100) + " - " + Math.round((fm2 + fr2) / ftot * 100) + "<BR>";
        answer = answer + "and use M/R of: " + x1 + "/" + y1 + s + x2 + "/" + y2 + s + x3 + "/" + y3 + "<BR>"
    } else if (ffm0 + ffr0 + ffm1 + ffr1 <= troops) {
        answer = answer + "You can hold the left and center!<BR>";
        answer = answer + "Set your walls to " + Math.round((fm0 + fr0) / (fm0 + fr0 + fm1 + fr1) * 100) +
            " - " + Math.round((fm1 + fr1) / (fm0 + fr0 + fm1 + fr1) * 100) + " - 0 <BR>";
        answer = answer + "and use M/R of: " + x1 + "/" + y1 + s + x2 + "/" + y2 + " 50/50<BR>"
    } else if (ffm1 + ffr1 + ffm2 + ffr2 <= troops) {
        answer = answer + "You can hold the center and right!<BR>";
        answer = answer + "Set your walls to 0 - " + Math.round((fm1 + fr1) / (fm1 + fr1 + fm2 + fr2) * 100) + " - " + Math.round((fm2 + fr2) / (fm1 + fr1 + fm2 + fr2) * 100) + "<BR>";
        answer = answer + "and use M/R of: 50/50 " + x2 + "/" + y2 + s + x3 + "/" + y3 + "<BR>"
    } else if (ffm0 + ffr0 + ffm2 + ffr2 <= troops) {
        answer = answer + "You can hold the left and right walls!<BR>";
        answer = answer + "Set your walls to " + Math.round((fm0 + fr0) / (fm0 + fr0 + fm2 + fr2) * 100) + " - 0 - " + Math.round((fm2 + fr2) / (fm0 + fr0 + fm2 + fr2) * 100) + "<BR>";
        answer = answer + "and use M/R of: " + x1 + "/" + y1 + " 50/50 " + x3 + "/" + y3 + "<BR>"
    } else if (ffm1 + ffr1 <= troops) {
        answer = answer + "Well, you can hold the center, and that is something, right?<BR>";
        answer = answer + "Set your walls to 0 - 100 - 0 and pray. That's your best bet.<BR>";
        answer = answer + "and use M/R of: " + x2 + "/" + y2 + "<BR>"
    } else if (ffm0 + ffr0 <= troops) {
        answer = answer + "Well, hang on to the left wall, at least you can do that.<BR>";
        answer = answer + "Set your walls to 100 - 0 - 0 and pray. That's your best bet.<BR>";
        answer = answer + "and use M/R of: " + x1 + "/" + y1 + "<BR>"
    } else if (ffm2 + ffr2 <= troops) {
        answer = answer + "Well, hang on to the right wall, at least you can do that.<BR>";
        answer = answer + "Set your walls to 0 - 0 - 100 and pray. That's your best bet.<BR>";
        answer = answer + "and use M/R of: " + x3 + "/" + y3 + "<BR>"
    } else {
        answer = answer + "Consider opening your gates. Seriously. Move everyone out. Now!<BR>";
        answer = answer + "Your best bet is to place your head between your legs and kiss your ass goodbye.<BR>"
    }

    document.getElementById("answer").innerHTML = answer;
    document.getElementById("answer2").innerHTML = answer;
}

/* Phil's Espionage Without Spies */

function Espi_calc(Form) {
    t0 = Number(Form.Tower0.value);
    t1 = Number(Form.Tower1.value);
    t2 = Number(Form.Tower2.value);
    t3 = Number(Form.Tower3.value);
    t4 = Number(Form.Tower4.value);
    t5 = Number(Form.Tower5.value);
    if (t0 >= 0 && t1 >= 0 && t2 >= 0 && t3 >= 0 && t4 >= 0 && t5 >= 0 && t0 + t1 + t2 + t3 + t4 + t5 <= 20) {
        a = 16 * t5 + 13 * t4 + 10 * t3 + 6 * t2 + 3 * t1 + t0 + " men on the walls<BR><BR>"
    } else {
        a = "Cannot count the men on the walls<BR><BR>"
    }
    ok = false;
    for (i = 0; i < 5; i++) {
        if (Form.Walle[i].checked) {
            w = Number(Form.Walle[i].value);
            ok = true
        }
    }
    if (ok) {
        t = 20 * w + 50;
        a = a + 20 * w + "% wall bonus before tools  (maximum you will face is " + t + "% per section per wave)<BR>";
        a = a + "Send at least " + Math.round(20 * w / 10) + " ladders or " + Math.round(20 * w / 15) + " siege towers or " + Math.round(20 * w / 20) + " belfries in each section.<BR>";
        a = a + "But no more than " + Math.round(t / 10) + " ladders or " + Math.round(t / 15) + " siege towers or " + Math.round(t / 20) + " belfries in each section.<BR><BR>"
    } else {
        a = a + "Cannot calculate the wall bonus<BR><BR>"
    }
    g = Number(Form.Gatee.value);
    if (g > 0 && g < 6) {
        t = 20 * g + 75;
        a = a + 20 * g + "% gate bonus before tools (maximum you will face is " + t + "% per section per wave)<BR>";
        a = a + "Send at least " + Math.round(20 * g / 10) + " battering rams or " + Math.round(20 * g / 15) + " iron rams or " + Math.round(20 * g / 20) + " heavy rams in each section.<BR>";
        a = a + "But no more than " + Math.round(t / 10) + " battering rams or " + Math.round(t / 15) + " iron rams or " + Math.round(t / 20) + " heavy rams in each section.<BR><BR>"
    } else {
        a = a + "Cannot calculate the gate bonus<BR><BR>"
    }
    ok = false;
    for (i = 0; i < 3; i++) {
        if (Form.Moate[i].checked) {
            m = Number(Form.Moate[i].value);
            ok = true
        }
    }
    if (ok) {
        if (m > 0) {
            t = 10 * m + 110;
        } else {
            t = 0;
        }
        a = a + 10 * m + "% moat bonus before tools (maximum you will face is " + t + "% per section per wave)<BR>";
        a = a + "Send at least " + Math.round(10 * m / 5) + " wood bundles or " + Math.round(10 * m / 10) + " assault bridges or " + Math.round(10 * m / 15) + " boulders in each section.<BR>";
        a = a + "But no more than " + Math.round(t / 5) + " wood bundles or " + Math.round(t / 10) + " assault bridges or " + Math.round(t / 15) + " boulders in each section.<BR><BR>"
    } else {
        a = a + "Cannot calculate the moat bonus<BR><BR>"
    }
    document.getElementById("toolsanswer").innerHTML = a
}
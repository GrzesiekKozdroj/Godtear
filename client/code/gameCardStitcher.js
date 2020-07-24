
        const makedata = (skill)=>{
            let champDATA = []
            for(let D in skill){
                let data = /*D === 'm' ? encodeURIComponent(JSON.stringify(skill[D])) :*/ `"${skill[D]}"`
                let dataModel = `data-${D}=${data} `
                if(D!=='desc')
                    champDATA = [...champDATA, dataModel]
            }
            return champDATA.join(' ')
        }

const bigCard_bb = (a,b)=>`<span class="${b>0?'booned':b<0?'blighted':'normal'} big_card__BB_skill">${a+b}</span>`
        const dis_min_BBs = (skill,baim,bdamage) => {
            let produce = []
            if ( skill.aim )
                if ( baim > 0 )
                    produce = [ ...produce, aimBoon ]
                else if ( baim < 0 )
                    produce = [ ...produce, aimBlight ]
            if( skill.hurt )
                if ( bdamage > 0 )
                    produce = [ ...produce, damageBoon ]
                else if ( bdamage < 0 )
                produce = [ ...produce, damageBlight ]
            return [styled_attribute_name(skill.name,bdamage+baim),...produce].join('')
        }

        const bloodedUnit = (unitName, side, unitSize,type, name) =>{
            const gunit = $(`[data-name="${unitName}"].${side}`)
            const onChamp = (gunit.length === 0 && type === 'champion')
            if( (gunit.length < unitSize && gunit.length > 0 && side === mySide && type !== 'champion') || onChamp
             )
            return `
            <div id='rallyAction' class='game_card-attrib card_base_action ${phase} unit rally'
                data-unitname=${onChamp ? name : unitName} 
                data-side=${side} 
                data-type=${type} 
                data-name=${onChamp ? unitName : name}
            >
                <div class='top'></div><div class='bottom'></div>
            </div>`
            else return ''
        }
function leftCard ({klass, type, name, unitSize, icon, speed, dodge, protection, health, skills,banner,index,unitName},phase,side) {
    const { baim, bdamage,bdodge,bprotection,bspeed,healthleft } = extractBoons_Blights( $(`[data-name="${name}"].${side}`) )
    const skillList = (skills,side)=>{
        let skillzList = []
        for(let s in skills[phase]){
            let skill = skills[phase][s]
            skillzList = [...skillzList,skill]
        }
        for(let d in skills.util){
            let util = skills.util[d]
            skillzList = [...skillzList, util]
        }
        return skillzList.map((skill)=>{
            //let {name,desc,icon,dist,aim,hurt,unused,legendary,m} = skill;
            let name = skill.name? skill.name : false;
            let desc = skill.desc? skill.desc : false;
            let icon = skill.icon ? skill.icon : false;
            let dist = skill.dist ? skill.dist : false;
            let aim = skill.aim ? skill.aim : false;
            let hurt = skill.hurt ? skill.hurt : false;
            let unused = skill.unused ? skill.unused : 0;
            let legendary = skill.legendary ? skill.legendary : 0;
            let m = skill.m ? skill.m : false;
            let aimshow = Array.isArray(aim) ? 
                aim.map(a=>`<div class='roster_abil_number smaller_num'>${bigCard_bb(a,baim)}</div>`).join('') : 
                aim ?
                `<div class='roster_abil_number'>${bigCard_bb(aim,baim)}</div>` :
                '';

            let hurtshow = Array.isArray(hurt) ? 
                hurt.map(a=>`<div class='roster_abil_number smaller_num'>${bigCard_bb(a,bdamage)}</div>`).join('') : 
                hurt ?
                `<div class='roster_abil_number'>${bigCard_bb(hurt,bdamage)}</div>` : '';

        return `
                <div class="card_list_item_${phase} ${skill.legendaryUsed === false ?'legendary':''} ${side}" ${makedata(skill)}>

                    <div class="img_${icon}_${phase} ${side}"></div>

                    <div class="roster_description">
                        <div class="roster_abil_name left">${name}</div>
                        <div class="roster_abil_desc ${phase} left">${desc ? desc : ''}</div>
                    </div>

                    <div class="roster_abil_stats">

                        <div class="roster_abil_column">
                            <div class="roster_abil_icon roster_abil_dist_${phase}"></div>
                            ${ dist ? dist : '<div class="roster_abil_number"></div>' }
                        </div>

                        <div class="roster_abil_column">
                            <div class="roster_abil_icon roster_abil_aim_${phase}"></div>
                            ${ aimshow }
                        </div>

                        <div class="roster_abil_column">
                            <div class="roster_abil_icon roster_abil_hurt_${phase}"></div>
                            ${ hurtshow }
                        </div>

                    </div>

                </div>
            `
        }).join('') 
    }
    return `
        <div id='game_card-big' class='${side}_card'
            data-klass='${klass}' 
            data-type='${type}' 
            data-name='${name}' 
            data-index='${index}'
            data-side='${side}'
            data-phase='${phase}'
            data-baim='${baim}' 
            data-bdamage='${bdamage}' 
            data-bdodge='${bdodge}' 
            data-bprotection='${bprotection}' 
            data-bspeed='${bspeed}' 
            >

        <div class='game_card-portrait card_shadow-${side}'>

            <div class='game_card-picture ${side===mySide?'whiteTem':'blackTem'}'>
                <div class='top'></div>
                <img class='heroImg' src='${icon}'/>
                <div class='bottom'></div>
                ${showMeName(phase,name)}
            </div>

            <div class='game_card-attribs'>

                <div id='card_speed_${phase}' class='game_card-attrib offset-speed'>
                    <div class='top'></div>
                    ${phase==='white'?styled_attribute_number(speed[0],bspeed):styled_attribute_number(speed[1],bspeed)}
                    <div class='bottom'></div>
                </div> 

                <div id='card_dodge_${phase}' class='game_card-attrib offset-dodge'>
                    <div class='top'></div>
                    ${styled_attribute_number(dodge,bdodge)}
                    <div class='bottom'></div>
                </div>

                <div id='card_protection_${phase}' class='game_card-attrib offset-protection'>
                    <div class='top'></div>
                    ${styled_attribute_number(protection,bprotection)}
                    <div class='bottom'></div>
                </div>

                <div id='card_health_${phase}' class='game_card-attrib offset-health'>
                    <div class='top'></div>
                    ${styled_attribute_number(health,-1*(health-healthleft) )}
                    <div class='bottom'></div>
                </div>

            </div>

        </div>

        <div class='game_card-actions card_shadow-${side}'>
            ${endActionButton(type,phase,side)}

            <div id='claimAction' class='game_card-attrib card_base_action ${phase} ${type} claim'>
                <div class='top'></div><div class='bottom'></div>
            </div>

            ${bloodedUnit(unitName, side, unitSize,type,name)}
            ${treasureBox(side)}

        </div>

        <div class='game_card-skill_list card_shadow-${side}'>
            ${skillList(skills,side)}
        </div>

    </div>
    `
}

function rightCard ({klass, type, name, unitSize, icon, speed, dodge, protection, health, skills,banner,index,unitName},phase,side){
    const { baim, bdamage,bdodge,bprotection,bspeed,healthleft } = extractBoons_Blights( $(`[data-name="${name}"].${side}`) )
    const skillList = (skills,side)=>{
        let skillzList = []
        for(let s in skills[phase]){
            let skill = skills[phase][s]
            skillzList = [...skillzList,skill]
        }
        for(let d in skills.util){
            let util = skills.util[d]
            skillzList = [...skillzList, util]
        }
    return skillzList.map((skill)=>{
            //let {name,desc,icon,dist,aim,hurt,unused,legendary,m} = skill;
            let name = skill.name? skill.name : false;
            let desc = skill.desc? skill.desc : false;
            let icon = skill.icon ? skill.icon : false;
            let dist = skill.dist ? skill.dist : false;
            let aim = skill.aim ? skill.aim : false;
            let hurt = skill.hurt ? skill.hurt : false;
            let unused = skill.unused ? skill.unused : 0;
            let legendary = skill.legendary ? skill.legendary : 0;
            let m = skill.m ? skill.m : false;
            let aimshow = Array.isArray(aim) ? 
                aim.map(a=>`<div class='roster_abil_number smaller_num'>${bigCard_bb(a,baim)}</div>`).join('') : 
                aim ?
                `<div class='roster_abil_number'>${bigCard_bb(aim,baim)}</div>` :
                '';

            let hurtshow = Array.isArray(hurt) ? 
                hurt.map(a=>`<div class='roster_abil_number smaller_num'>${bigCard_bb(a,bdamage)}</div>`).join('') : 
                hurt ?
                `<div class='roster_abil_number'>${bigCard_bb(hurt,bdamage)}</div>` : '';

        return `
                <div class="card_list_item_${phase} ${skill.legendaryUsed ===false?'legendary':''} ${side}" ${makedata(skill)} >

                    <div class="roster_abil_stats">

                        <div class="roster_abil_column">
                            <div class="roster_abil_icon roster_abil_hurt_${phase}"></div>
                            ${ hurtshow }
                        </div>

                        <div class="roster_abil_column">
                            <div class="roster_abil_icon roster_abil_aim_${phase}"></div>
                            ${ aimshow }
                        </div>

                        <div class="roster_abil_column">
                            <div class="roster_abil_icon roster_abil_dist_${phase}"></div>
                            ${ dist ? dist : '<div class="roster_abil_number"></div>' }
                        </div>

                    </div>

                    <div class="roster_description">
                        <div class="roster_abil_name">${name}</div>
                        <div class="roster_abil_desc ${phase}">${desc ? desc : ''}</div>
                    </div>

                    <div class="img_${icon}_${phase} ${side}"></div>

                </div>
            `
        }).join('') 
    }

    return `
    <div id='game_card-big' class='${side}_card' 
        data-klass='${klass}' 
        data-type='${type}' 
        data-name='${name}' 
        data-index='${index}'
        data-side='${side}'
        data-phase='${phase}'
        data-baim='${baim}' 
        data-bdamage='${bdamage}' 
        data-bdodge='${bdodge}' 
        data-bprotection='${bprotection}' 
        data-bspeed='${bspeed}' 
        >

        <div class='game_card-portrait card_shadow-${side}'>
            <div class='game_card-attribs'>
                <div id='card_dodge_${phase}' class='game_card-attrib offset-dodge ${side}'>
                    <div class='top'></div>
                    ${styled_attribute_number(dodge,bdodge)}
                    <div class='bottom'></div>
                </div>
                <div id='card_speed_${phase}' class='game_card-attrib offset-speed ${side}'>
                    <div class='top'></div>
                    ${phase==='white' ? styled_attribute_number(speed[0],bspeed) : styled_attribute_number(speed[1],bspeed)}
                    <div class='bottom'></div>
                </div> 
                <div id='card_health_${phase}' class='game_card-attrib offset-health ${side}'>
                    <div class='top'></div>
                    ${styled_attribute_number(health,-1*(health-healthleft))}
                    <div class='bottom'></div>
                </div>

                <div id='card_protection_${phase}' class='game_card-attrib offset-protection ${side}'>
                    <div class='top'></div>
                    ${styled_attribute_number(protection,bprotection)}
                    <div class='bottom'></div>
                </div>
            </div>
            <div class='game_card-picture ${side===mySide?'whiteTem':'blackTem'}'>
                <div class='top'></div>
                <img class='heroImg' src='${icon}'/>
                <div class='bottom'></div>
                ${showMeName(phase,name)}
            </div>
        </div>
        <div class='game_card-actions card_shadow-right'>
            ${bloodedUnit(unitName, side, unitSize,type,name)}
            ${treasureBox(side)}
            <div id='claimAction' class='game_card-attrib card_base_action ${phase} ${type} claim'>
                <div class='top'></div><div class='bottom'></div>
            </div>
            ${endActionButton(type,phase,side)}
        </div>
        <div class='game_card-skill_list card_shadow-right'>
            ${skillList(skills,side)}
        </div>
    </div>
    `
}

function miniCard ({klass,type,name,unitSize,icon,speed,dodge,protection,health,healthleft,skills,banner,index,unitName},phase,side){
    let skillx = rosters[klass][index][type==='champion'?'champ':'grunt'].skills// JSON.parse(decodeURIComponent(skills));
    const { baim, bdamage, bdodge, bprotection, bspeed } = extractBoons_Blights( $($(`[data-name="${name}"].${side}`)[0]) )
    feedSkillstheData (skillx)
    const zpeed = (speed,i) => typeof speed === 'string' ? Number([...speed][i===0?0:2]):speed[i]
    const skillzBlack = (skillx,phase,side)=>{
        let skillList = []
        for(let s in skillx[phase]){
            let skill = skillx[phase][s]
            skillList = [...skillList, skill]
        }
        skillList = skillx.util.legendary ? [...skillList, skillx.util.legendary] : skillList;
        return skillList.map(skill=>{
            let jinput = skill.legendaryUsed === false ? 'legendary' : skill.m && typeof skill.m === 'string' ? skill.m : null
            let stajtus = abilTruthRead(jinput,side,name) ? 'glow_unused' : 'usedSkill'
            let b_b = baim+bdamage
            return `
                <div class='smallCard img_${skill.icon}_${phase} ${side} ${stajtus} skill' ${makedata(skill)} >
                    <div class='top ${stajtus}'></div>
                    ${dis_min_BBs(skill,baim,bdamage)}
                    <div class='bottom ${stajtus}'></div>
                </div>
            `}).join('')
    }
    const BB_HUD = (c)=>c>0? 'glow_BB_card booned' : c < 0 ? 'glow_BB_card blighted' : ''
    return `
    <div class='
            miniGameCard 
            ${side} ${phase} 
            ${ side === mySide && myTurn ?
                    'activatingShow'
               : side === opoSide && !myTurn ? 
                    'activatingShow' 
               : 
                 'nonActivShow' 
            }
        ' 
        data-klass='${klass}' 
        data-type='${type}' 
        data-name='${name}' 
        data-index='${index}' 
        data-side='${side}' 
        data-phase='${phase}' 
        data-baim='${baim}' 
        data-bdamage='${bdamage}' 
        data-bdodge='${bdodge}' 
        data-bprotection='${bprotection}' 
        data-bspeed='${bspeed}' 
        data-healthleft='${healthleft}'
        >

    <div class='puller ${side}'>
        <div class='pullerCircle ${side}'>
            <div class='pullerTriangle ${side}'></div>
        </div>
    </div>
    <div class='list ${side}'>

        <div class='smallCard ${side===mySide?'whiteTem':'blackTem'}'>
            <div class='top'></div>
            <img class='heroImg' src='${icon}'/>
            <div class='bottom'></div>
            ${showMeName(phase,name)}
        </div>

        <div class='smallCard speed ${phase} ${BB_HUD(bspeed)}'>
            <div class='top'></div>
            ${phase==='white' ? styled_attribute_number(zpeed(speed,0),bspeed) : styled_attribute_number(zpeed(speed,1),bspeed)}
            <div class='bottom'></div>
        </div>

        <div class='smallCard dodge ${phase}  ${BB_HUD(bdodge)}'>
            <div class='top'></div>
            ${styled_attribute_number(dodge,bdodge)}
            <div class='bottom'></div>
        </div>

        <div class='smallCard protection ${phase}  ${BB_HUD(bprotection)}'>
            <div class='top'></div>
            ${styled_attribute_number(protection,bprotection)}
            <div class='bottom'></div>
        </div>

        <div class='smallCard health ${phase}'>
            <div class='top'></div>
            ${   styled_attribute_number(health,-1*(health-healthleft) )    }
            <div class='bottom'></div>
        </div>
        ${skillzBlack(skillx,phase,side)}
        ${endActionButton(type,phase,side,1)}
        <div id="dummy_contain" class="${side}">
            <div class="mini-card-actions">
                <div id='claimAction' class='game_card-attrib card_base_action ${phase} ${type} claim'>
                    <div class='top'></div><div class='bottom'></div>
                </div>
                ${bloodedUnit(unitName, side, unitSize,type,name)}
                ${treasureBox(side)}
            </div>
        </div>
    </div>
</div>
    `
}

const feedSkillstheData = (s) => {
}

function styled_attribute_number(num, bb){
    const colour = bb === 1 ? 'booned' : bb === 0 ? 'normal' : 'blighted'
    return `
        <p class="${colour} gameCard_num ${phase}" >${Number(num)+bb}</p>
    `
}
function styled_attribute_name(name, bb){
    const colour = bb === 1 ? 'booned' : bb === 0 ? 'normal' : 'blighted'
    return `
        <p class="${colour} gameCard_name ${phase}" >${name}</p>
    `
}
function treasureBox(side){
    let s = side === mySide ? 'my' : 'opo'
    return `
        <div class="treasureBox ${side}">
            <img class="gem1 ${checkPOINTS({side, num:1})}" src="../img/tear-${s}-1.svg" />
            <img class="gem2 ${checkPOINTS({side, num:2})}" src="../img/tear-${s}-2.svg" />
            <img class="gem3 ${checkPOINTS({side, num:3})}" src="../img/tear-${s}-3.svg" />
            <img class="gem4 ${checkPOINTS({side, num:4})}" src="../img/tear-${s}-4.svg" />
            <img class="gem5 ${checkPOINTS({side, num:5})}" src="../img/tear-${s}-2.svg" />
        </div>
    `
}
function checkPOINTS({side, num}){
    if(side === mySide){
        if(MY_SCORE<num)
            return 'nope'
    }else{
        if(OP_SCORE<num)
            return 'nope'
    }
     
}
const endActionButton = (type,phase,side,napis=false)=>`
    <div id='endAction' class='game_card-attrib card_base_action endTask ${type} ${phase} ${side}'>
        ${napis?''/*'<span>End<br/>Turn</span>'*/:''}
        <div class='top'></div><div class='bottom'></div>
    </div>`
const showMeName = (phase,name) => `<span class="myName ${phase}">${name}</span>`
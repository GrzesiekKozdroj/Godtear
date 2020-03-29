
        const makedata = (skill)=>{
            let champDATA = []
            for(let D in skill){
                let data = /*D === 'm' ? encodeURIComponent(JSON.stringify(skill[D])) :*/ `"${skill[D]}"`
                let dataModel = `data-${D}=${data} `
                champDATA = [...champDATA, dataModel]
            }
            return champDATA.join(' ')
        }
function leftCard ({klass, type, name, unitSize, icon, speed, dodge, protection, health, skills,banner,index},phase,side) {
    const skillList = (skills)=>{
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
                aim.map(a=>`<div class='roster_abil_number smaller_num'>${a}</div>`).join('') : 
                aim ?
                `<div class='roster_abil_number'>${aim}</div>` :
                '';

            let hurtshow = Array.isArray(hurt) ? 
                hurt.map(a=>`<div class='roster_abil_number smaller_num'>${a}</div>`).join('') : 
                hurt ?
                `<div class='roster_abil_number'>${hurt}</div>` : '';

        return `
                <div class="card_list_item_${phase} ${skill.legendaryUsed === false ? 'legendary' : ''}" ${makedata(skill)}>

                    <div class="img_${icon}_${phase}"></div>

                    <div class="roster_description">
                        <div class="roster_abil_name left">${name}</div>
                        <div class="roster_abil_desc left">${desc ? desc : ''}</div>
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
            >

        <div class='game_card-portrait card_shadow-${side}'>

            <div class='game_card-picture'>
                <div class='top'></div>
                <img class='heroImg' src='${icon}'/>
                <div class='bottom'></div>
            </div>

            <div class='game_card-attribs'>

                <div id='card_speed_${phase}' class='game_card-attrib offset-speed'>
                    <div class='top'></div>
                    <p >${phase==='white'?speed[0]:speed[2]}</p>
                    <div class='bottom'></div>
                </div> 

                <div id='card_dodge_${phase}' class='game_card-attrib offset-dodge'>
                    <div class='top'></div>
                    <p >${dodge}</p>
                    <div class='bottom'></div>
                </div>

                <div id='card_protection_${phase}' class='game_card-attrib offset-protection'>
                    <div class='top'></div>
                    <p >${protection}</p>
                    <div class='bottom'></div>
                </div>

                <div id='card_health_${phase}' class='game_card-attrib offset-health'>
                    <div class='top'></div>
                    <p >${health}</p>
                    <div class='bottom'></div>
                </div>

            </div>

        </div>

        <div class='game_card-actions card_shadow-${side}'>

            <div id='walkAction' class='game_card-attrib card_base_action walk ${type} ${phase}'>
                <div class='top'></div><div class='bottom'></div>
            </div>

            <div id='claimAction' class='game_card-attrib card_base_action ${phase} ${type} claim'>
                <div class='top'></div><div class='bottom'></div>
            </div>

            <div id='rallyAction' class='game_card-attrib card_base_action ${phase} ${type} rally'>
                <div class='top'></div><div class='bottom'></div>
            </div>

        </div>

        <div class='game_card-skill_list card_shadow-${side}'>
            ${skillList(skills)}
        </div>

    </div>
    `
}

function rightCard ({klass, type, name, unitSize, icon, speed, dodge, protection, health, skills,banner,index},phase,side){
    const skillList = (skills)=>{
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
                aim.map(a=>`<div class='roster_abil_number smaller_num'>${a}</div>`).join('') : 
                aim ?
                `<div class='roster_abil_number'>${aim}</div>` :
                '';

            let hurtshow = Array.isArray(hurt) ? 
                hurt.map(a=>`<div class='roster_abil_number smaller_num'>${a}</div>`).join('') : 
                hurt ?
                `<div class='roster_abil_number'>${hurt}</div>` : '';

        return `
                <div class="card_list_item_${phase} ${skill.legendaryUsed === false ? 'legendary' : ''}" ${makedata(skill)} >

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
                        <div class="roster_abil_desc">${desc ? desc : ''}</div>
                    </div>

                    <div class="img_${icon}_${phase}"></div>

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
        >

        <div class='game_card-portrait card_shadow-${side}'>
            <div class='game_card-attribs'>
                <div id='card_dodge_${phase}' class='game_card-attrib offset-dodge ${side}'>
                    <div class='top'></div>
                    <p>${dodge}</p>
                    <div class='bottom'></div>
                </div>
                <div id='card_speed_${phase}' class='game_card-attrib offset-speed ${side}'>
                    <div class='top'></div>
                    <p >${phase==='white' ? speed[0] : speed[2]}</p>
                    <div class='bottom'></div>
                </div> 
                <div id='card_health_${phase}' class='game_card-attrib offset-health ${side}'>
                    <div class='top'></div>
                    <p >${health}</p>
                    <div class='bottom'></div>
                </div>

                <div id='card_protection_${phase}' class='game_card-attrib offset-protection ${side}'>
                    <div class='top'></div>
                    <p >${protection}</p>
                    <div class='bottom'></div>
                </div>
            </div>
            <div class='game_card-picture'>
                <div class='top'></div>
                <img class='heroImg' src='${icon}'/>
                <div class='bottom'></div>
            </div>
        </div>
        <div class='game_card-actions card_shadow-right'>
            <div id='rallyAction' class='game_card-attrib card_base_action ${phase} ${type} rally'>
                <div class='top'></div><div class='bottom'></div>
            </div>
            <div id='claimAction' class='game_card-attrib card_base_action ${phase} ${type} claim'>
                <div class='top'></div><div class='bottom'></div>
            </div>
            <div id='walkAction' class='game_card-attrib card_base_action walk ${type} ${phase}'>
                <div class='top'></div><div class='bottom'></div>
            </div>
        </div>
        <div class='game_card-skill_list card_shadow-right'>
            ${skillList(skills)}
        </div>
    </div>
    `
}

function miniCard ({klass, type, name, unitSize, icon, speed, dodge, protection, health, skills,banner,index},phase,side){
    let skillx = rosters[klass][index][type==='champion'?'champ':'grunt'].skills// JSON.parse(decodeURIComponent(skills));
    feedSkillstheData (skillx)
    const skillzBlack = (skillx,phase)=>{
        let skillList = []
        for(let s in skillx[phase]){
            let skill = skillx[phase][s]
            skillList = [...skillList, skill]
        }
        skillList = skillx.util.legendary ? [...skillList, skillx.util.legendary] : skillList;
        return skillList.map(skill=>`
                <div class='smallCard img_${skill.icon}_${phase}' ${makedata(skill)} >
                    <div class='top'></div>
                    <p>${/*skill.name*/''}</p>
                    <div class='bottom'></div>
                </div>
            `).join('')
    }

    return `
    <div class='miniGameCard ${side}' 
        data-klass='${klass}' 
        data-type='${type}' 
        data-name='${name}' 
        data-index='${index}'
        data-side='${side}'
        data-phase='${phase}'
        >

    <div class='puller ${side}'>
        <div class='pullerCircle ${side}'>
            <div class='pullerTriangle ${side}'></div>
        </div>
    </div>
    <div class='list ${side}'>

        <div class='smallCard'>
            <div class='top'></div>
            <img class='heroImg' src='${icon}'/>
            <div class='bottom'></div>
        </div>

        <div class='smallCard speed ${phase}'>
            <div class='top'></div>
            <p >${phase==='white' ? speed[0] : speed[2]}</p>
            <div class='bottom'></div>
        </div>

        <div class='smallCard dodge ${phase}'>
            <div class='top'></div>
            <p >${dodge}</p>
            <div class='bottom'></div>
        </div>

        <div class='smallCard protection ${phase}'>
            <div class='top'></div>
            <p >${protection}</p>
            <div class='bottom'></div>
        </div>

        <div class='smallCard health ${phase}'>
            <div class='top'></div>
            <p >${health}</p>
            <div class='bottom'></div>
        </div>
        ${skillzBlack(skillx,phase,false)}
    </div>
</div>
    `
}

const feedSkillstheData = (s) => {
}
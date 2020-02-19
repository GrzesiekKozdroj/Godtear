function bandSelection(){
    return `        
        <div id="bandSelection" class="">
            ${char_swiper(rosters.guardian)}
            ${char_swiper(rosters.maelstrom)}
            ${char_swiper(rosters.shaper)}
            ${char_swiper(rosters.slayer)}
        </div>`
}


function char_swiper(o){ 
let all_champs = [];
for(let key in o){
    let champ = o[key].champ;
    all_champs.push(`
        <div class="selection_champCointajner">
            <img 
                class="selection_heroImg" 
                data-name="${champ.name}" 
                data-klass="${champ.klass}" 
                data-index="${champ.index}" 
                src="${champ.icon}" 
            />
        </div>
    `)
}
 return `
        <div id="selection_${o[1].champ.klass}" class="selection_section">
            ${all_champs.join('')}
        </div>
     `
}

function selection_animator(o){
    //let o = { anime:{ start:{}, end:{} }, callback:o=>o }
    $('.selection_heroImg').removeClass('cardDisplayed').removeClass('dechosen')
    if(!o.champ.hasClass('greyedOut'))o.champ.toggleClass('cardDisplayed')
    $('#selection_card')
        .removeClass('hinge-in-from-bottom mui-enter mui-enter-active')
        .addClass('hinge-out-from-top mui-leave mui-leave-active')
    setTimeout(()=>{
        $('#card')
            .empty()
            .append(    roster_card( rosters[o.champ.data('klass')][Number(o.champ.data('index'))] )    )
    },450)
    setTimeout(()=>$('#selection_card').addClass('mui-enter-active'),750)
}

function chosen_move(img) {
    let icon = (o)=>{
        img.removeClass('nameDisplayed').addClass('greyedOut')
        for(let k in rosters){
            let subjects = rosters[k];
            if(subjects[0].champ.klass === img.data('klass')){
                for(let h=0; h<subjects.length;h++){
                    if(subjects[h].champ.name===img.data('name')){
                        return o ? subjects[h].champ.icon : subjects[h].champ.name
                    }
                }
            }
        }
    }
    const isUnique = () => {
        if( 
            $('.ch_st').children('.card_heroImg').data('name') !== img.data('name') &&
            $('.ch_nd').children('.card_heroImg').data('name') !== img.data('name') &&
            $('.ch_rd').children('.card_heroImg').data('name') !== img.data('name') 
        ) return true; else return false;
    }

    if( !$('.ch_st').children('.card_heroImg').attr('style') && isUnique() )
    {
        $('.ch_st').children('.card_heroImg').css('background-image',`url(${icon(true)})`)
        $('.ch_st').children('.card_heroImg').attr('data-name',icon(false))
    }
    else if( !$('.ch_nd').children('.card_heroImg').attr('style') && isUnique() )
    {
        $('.ch_nd').children('.card_heroImg').css('background-image',`url(${icon(true)})`)
        $('.ch_nd').children('.card_heroImg').attr('data-name',icon(false))
    }
    else if ( !$('.ch_rd').children('.card_heroImg').attr('style') && isUnique() )
    {
        $('.ch_rd').children('.card_heroImg').css('background-image',`url(${icon(true)})`)
        $('.ch_rd').children('.card_heroImg').attr('data-name',icon(false))
    } 
    if($('.ch_rd').children('.card_heroImg').attr('style') &&
       $('.ch_nd').children('.card_heroImg').attr('style') &&
       $('.ch_st').children('.card_heroImg').attr('style') ){
            $('#gameTypeForm').addClass('mui-enter-active')
            $('#beginGameButton').addClass('mui-enter-active')
       }
}
function roster_attribute(o,attrib,phase){
    return `
        <div class="selection_card_hexagram" id="card_${attrib}_${phase}">   
            <div class="top"></div>  
            <div class="bottom"></div>   
            <p id="" class="card_attribute">${o[attrib]}</p>
        </div>
    `
}
function roster_face(o){
    return `
        <div class="selection_card_hexagram card_hex_big" >   
            <div class="top"></div>  
            <div class="bottom"></div>
            <div class="card_heroImg" style=background-image:url(${o.icon})></div>
        </div>
        <div class="selection_card_hexagram card_hex_big">   
            <div class="top"></div>  
            <div class="bottom"></div>   
            <div class="card_heroImg" style=background-image:url(${o.banner})></div>
        </div>
    `
}
function roster_ability(o,phase){
    let digit_looper = z => {
        let t = [];
        z.forEach(el => t.push(`<div class="roster_abil_number">${el}</div>`))
        return t;
    }
    let aim  = o.aim  ? digit_looper(o.aim).join('')  : '';
    let hurt = o.hurt ? digit_looper(o.hurt).join('') : '';
    let dist = o.dist ? o.dist : '';
    let desc = o.desc ? o.desc : '';
    let icon = o.icon ? o.icon : '';
    return `
    <div class="card_list_item_${phase}">
        <div class=img_${icon}_${phase}></div>
        <div class="roster_description">
            <div class="roster_abil_name">${o.name}</div>
            <div class="roster_abil_desc">${desc}</div>
        </div>
        <div class="roster_abil_stats">
            <div class="roster_abil_column roster_distance">
                <div class="roster_abil_icon roster_abil_dist_${phase}"></div>
                <div class="roster_abil_number roster_dist_num">${dist}</div>
            </div>
            <div class="roster_abil_column">
                <div class="roster_abil_icon roster_abil_aim_${phase}"></div>
                ${aim}
            </div>
            <div class="roster_abil_column">
                <div class="roster_abil_icon roster_abil_hurt_${phase}"></div>
                ${hurt}
            </div>
        </div>
    </div>
    `
}
function roster_banner(o){

    let attributes = [
        roster_attribute(o,'speed','white'), 
        roster_attribute(o,'dodge','white'),
        roster_attribute(o,'protection','white'),
        roster_attribute(o,'health','white')
    ].join('');

    let faces = [
        roster_face(o)
    ]

    return `
        <div class="selection_card_champion">
        ${attributes}
        ${faces}
    </div>
    `
}
function list_of_abilities(o){
    let skills = [];
    for(let key in o.skills.black){
        let skill = o.skills.black[key];
        if(skill)skills.push(roster_ability(skill,'black'))
    }
    for(let key in o.skills.white){
        let skill = o.skills.white[key];
        if(skill)skills.push(roster_ability(skill,'white'))
    }
    for(let key in o.skills.util){
        let skill = o.skills.util[key];
        if(skill)skills.push(roster_ability(skill,'white'))
    }
    return skills
}
function roster_card(o){//console.log(o)
 return `
     <div id="selection_card" class="hinge-in-from-bottom mui-enter ">
         <div class="selection_card_images">
            ${roster_banner(o.champ)}
            ${roster_banner(o.grunt)}
         </div>
         <div class="selection_card_skills">
             <div id="champion_card_skills" class="card_skills">
                 <div class="card_tab champ_tab tab_behind">${o.champ.name}</div>
                 <div class="selection_list_of_skills">
                    ${list_of_abilities(o.champ).join('')}
                 </div>
             </div>
             <div id="unit_class_skills" class="card_skills skills_unit">
                 <div class="card_tab unit_tab ">${o.grunt.name}</div>
                 <div class="selection_list_of_skills">
                    ${list_of_abilities(o.grunt).join('')}
                 </div>
             </div>
         </div>
    </div>
 `
}

function make_selected_group_flashing(daddy){
    $('.marked_group').removeClass('marked_group')
    daddy.toggleClass('marked_group');
    let nameOfDisplayed = daddy.children('.selection_heroImg').data('name')
    for(let key in rosters){
        let champs = rosters[key]
        for(let i = 0; i < champs.length; i++){
            if(champs[i].champ.name === nameOfDisplayed){
                $('#card').empty().append(roster_card(champs[i]))
                break;
            }
        }
    }
}
function selectionFirstInfo(){
    return `
        <div id="introductory_insructions_info" class="hinge-in-from-top mui-enter">
            <article>
                <p id="st_info">click champ to see card</p>
                <p id="nd_info">click again to add to roster</p>
                <p id="rd_info">click to continue</p>
            </article>
        </div>
    `
}
function selectionForm(){
    return `
        <div id="bandNamePlace" class="hinge-in-from-right mui-enter">
            <div id="bandDisplay">
                <div class="chosen ch_st">
                    <div class="top"></div>
                    <div class="bottom"></div>
                    <div class="card_heroImg" ></div>
                </div>
                <div class="chosen ch_nd">
                    <div class="top"></div>
                    <div class="bottom"></div>
                    <div class="card_heroImg" ></div>
                </div>
                <div class="chosen ch_rd">
                    <div class="top"></div>
                    <div class="bottom"></div>
                    <div class="card_heroImg" ></div>
                </div>
                <div id="beginGameButton" type="submit" class="bobo scale-in-down mui-enter">
                    <div class="top"></div>
                    <p class="card_attribute">
                        play
                    </p>
                    <div class="bottom"></div>
                </div>
            </div>
            <form id="gameTypeForm" class="slide-in-up mui-enter">
                <input type="text" id="gamePlayerName" class="introductionInfo" placeholder="nickname" required>
                <div id="wronCharWarning"></div>
                <input type="text" id="gamePlaceName" class="introductionInfo" placeholder="battlefield" required>
            </form>
        </div>
    `
}
function firstStitch(){
    return `
        ${bandSelection()}
        ${selectionFirstInfo()}
        <div id="card" class=""></div>
        ${selectionForm()}
    `
}
function waiting_block(o){ 
    let img_src;
    let txt;
    if(o.msg) {
        img_src = "./img/pocket-watch.png"
        txt = o.msg
    } else if (o.roster) {
        img_src = `./img/${o.roster}.png`;
        txt = o.roster;
    } else if (o.nickName) {
        img_src = "./img/barbute.png";
        txt = o.nickName;
    } else if (o.gamePlaceName) {
        img_src = "./img/treasure-map.png";
        txt = o.gamePlaceName;
    }
    return `
    <div class="waiting_hex waiting_left" ${!o.roster?`style="background-image:url('../${img_src}')"`:``}>
        <div class="top"></div>
        ${o.roster?`<img class="waiter_img" src="${img_src}"/>`:``}
        <div class="bottom"></div>
    </div>
    <div class="waiting_name">${txt}</div>
    <div class="waiting_hex waiting_right" ${!o.roster?`style="background-image:url('../${img_src}')"`:``}>
        <div class="top"></div>
        ${o.roster?`<img class="waiter_img" src="${img_src}"/>`:``}
        <div class="bottom"></div>
    </div>
    `
}
function opponentWaitingScreen(){
    return `
        <div id="waiter" class="backfield_glow">
            <div id="spinner1">
                ${spinning_loader(Math.floor( Math.random () * (3 - 0 + 1)) + 0)}
                ${spinning_loader(Math.floor( Math.random () * (3 - 0 + 1)) + 0)}
            </div>
                <div id="waiter_list">
                    <div class="waiter_segment">
                        ${waiting_block({nickName:nickName})}
                    </div>
                    <div class="waiter_segment">
                        ${waiting_block({gamePlaceName:gamePlaceName})}
                    </div>
                    <div class="waiter_segment">
                        ${waiting_block({roster:roster[0]})}
                    </div>
                    <div class="waiter_segment">
                        ${waiting_block({roster:roster[1]})}
                    </div>
                    <div class="waiter_segment">
                        ${waiting_block({roster:roster[2]})}
                    </div>
                    <div class="waiter_segment">
                        ${waiting_block({msg:"waiting for opponent"})}
                    </div>
                </div>
            <div id="spinner2">
                ${spinning_loader(Math.floor( Math.random () * (3 - 0 + 1)) + 0)}
                ${spinning_loader(Math.floor( Math.random () * (3 - 0 + 1)) + 0)}
            </div>
        </div>
    `
}

function spinning_loader(b){
    let a = [`
        <div class='loader loader1'>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`,
        `
        <div class='loader loader2'>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `,`
        <div class='loader loader3'>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `,`
        <div class='loader loader4'>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <div>
                            <div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    `]
    return a[b]
}
function hexoMaker ({img, background, text, classes}) {
    return `
        <div 
    `
}
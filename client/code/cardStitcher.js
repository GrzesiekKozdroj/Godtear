function bandSelection(){
    return `        
        <div id="bandSelection">
            ${char_swiper(Rhodri)}
            ${char_swiper(Grimgut)}
            ${char_swiper(Nia)}
            ${char_swiper(Lorsann)}
        </div>`
}


function char_swiper(o){
 // o = {klass : "slayer",img:"./img/Lorsann.png",name:"Nia"};
 return `
         <div id="selection_${o.klass}" class="selection_section">
             <div class="selection_backward_frame">
                 <div class="selection_backward">
                 </div>
             </div>
             <div class="selection_heroImg" style=background-image:url(${o.icon}) data-name="${o.name}" data-klass="${o.klass}">
             </div>
             <div class="selection_class_banner selection_banner_${o.klass}">
             </div>
        </div>
     `
}

function selection_animator(o){

    $('#card').empty()
    //let o = {that:that,dist:howfar,callback:o=>o}
    o.champ.css('position','relative').animate(o.anime, 420, function(){
        for(let k in rosters){
            let subjects = rosters[k];
            if(subjects[0].champ.klass === o.champ.data('klass')){
                for(let h=0; h<subjects.length;h++){
                    if( subjects[h].champ.name===o.champ.data('name') ){
                        let skipper = 1;
                        let newChamp = () => ( h + skipper ) % subjects.length;
                        let c = newChamp();
                        $('.chosen').children('.card_heroImg')
                            .each(function(){
            if( $(this).attr('style') === `background-image: url("${subjects[c].champ.icon}");` ){    
                skipper++;
                c = newChamp();
             }  
                            }) 
                        o.champ
                            .css('background-image',`url(${subjects[c].champ.icon})`)
                            .data('name',subjects[c].champ.name)
                            .animate({
                                left:'0vw'
                            }, 420,()=>$('#card').append(roster_card(subjects[c])));
                        break;
                    }
                }
            }
        }
    });
}

function chosen_move(img) {
    let icon = (o)=>{
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
    <div class="card_list_item">
        <div class=img_${phase}>${icon}</div>
        <div class="roster_description">
            <div class="roster_abil_name_${phase}">${o.name}</div>
            <div class="roster_abil_desc_${phase}">${desc}</div>
        </div>
        <div class="roster_abil_stats">
            <div class="roster_abil_column roster_distance">
                <div class="roster_abil_icon roster_abil_dist"></div>
                <div class="roster_abil_number roster_dist_num_${phase}">${dist}</div>
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
    skills.join('')
    return skills
}
function roster_card(o){
 return `
     <div id="selection_card">
         <div class="selection_card_images">
            ${roster_banner(o.champ)}
            ${roster_banner(o.grunt)}
         </div>
         <div class="selection_card_skills">
             <div id="champion_card_skills" class="card_skills">
                 <div class="card_tab champ_tab tab_behind">${o.champ.name}</div>
                 <div class="selection_list_of_skills">
                    ${list_of_abilities(o.champ)}
                 </div>
             </div>
             <div id="unit_class_skills" class="card_skills skills_unit">
                 <div class="card_tab unit_tab ">${o.grunt.name}</div>
                 <div class="selection_list_of_skills">
                    ${list_of_abilities(o.grunt)}
                 </div>
             </div>
         </div>
    </div>
 `
}
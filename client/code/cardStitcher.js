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
    //let o = {that:that,dist:howfar,callback:o=>o}
    o.champ.css('position','relative').animate(o.anime, 420, function(){
        for(let k in rosters){
            let subjects = rosters[k];
            if(subjects[0].champ.klass === o.champ.data('klass')){
                for(let h=0; h<subjects.length;h++){
                    if( subjects[h].champ.name===o.champ.data('name') ){
                        let skipper = 1;
                        let newChamp = () => ( h + skipper ) % subjects.length;
                        $('.card_heroImg')
                            .each(function(){
            if( $(this).attr('style') === `background-image: url("${subjects[newChamp()].champ.icon}");` ){    skipper++    }  
                            }) 
                        
                        o.champ
                            .css('background-image',`url(${subjects[newChamp()].champ.icon})`)
                            .data('name',subjects[newChamp()].champ.name)
                            .animate({
                                left:'0vw'
                            }, 420);
                        break;
                    }
                }
            }
        }
    });
}

function chosen_move(img) {
    let icon = ()=>{
        for(let k in rosters){
            let subjects = rosters[k];
            if(subjects[0].champ.klass === img.data('klass')){
                for(let h=0; h<subjects.length;h++){
                    if(subjects[h].champ.name===img.data('name')){
                        return subjects[h].champ.icon
                    }
                }
            }
        }
    }
    console.log($('.ch_st').children('.card_heroImg').css('background-image') )
    const isUnique = () => {
        if( 
            $('.ch_st').children('.card_heroImg').css('background-image') !== `url("./img/${img.data('name')}.png")` &&
            $('.ch_nd').children('.card_heroImg').css('background-image') !== `url("./img/${img.data('name')}.png")` &&
            $('.ch_rd').children('.card_heroImg').css('background-image') !== `url("./img/${img.data('name')}.png")` 
        ) return true; else return false;
    }


        if( !$('.ch_st').children('.card_heroImg').attr('style') && isUnique() )
        {
            $('.ch_st').children('.card_heroImg').css('background-image',`url(${icon()})`)
        }
        else if( !$('.ch_nd').children('.card_heroImg').attr('style') && isUnique() )
        {
            $('.ch_nd').children('.card_heroImg').css('background-image',`url(${icon()})`)
        }
        else if ( !$('.ch_rd').children('.card_heroImg').attr('style') && isUnique() )
        {
            $('.ch_rd').children('.card_heroImg').css('background-image',`url(${icon()})`)
        }
}
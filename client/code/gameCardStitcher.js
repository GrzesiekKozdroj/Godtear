function leftCard ({klass, type, name, unitSize, icon, speed, dodge, protection, health, skills,banner,index}) {
    return `
        <div id='game_card' class='left_card'>

        <div class='game_card-portrait card_shadow-left'>

            <div class='game_card-picture'>
                <div class='top'></div>
                <img class='heroImg' src='${icon}'/>
                <div class='bottom'></div>
            </div>

            <div class='game_card-attribs'>

                <div id='card_speed_black' class='game_card-attrib offset-speed'>
                    <div class='top'></div>
                    <p >${speed}</p>
                    <div class='bottom'></div>
                </div> 

                <div id='card_dodge_white' class='game_card-attrib offset-dodge'>
                    <div class='top'></div>
                    <p >${dodge}</p>
                    <div class='bottom'></div>
                </div>

                <div id='card_protection_black' class='game_card-attrib offset-protection'>
                    <div class='top'></div>
                    <p >${protection}</p>
                    <div class='bottom'></div>
                </div>

                <div id='card_health_white' class='game_card-attrib offset-health'>
                    <div class='top'></div>
                    <p >${health}</p>
                    <div class='bottom'></div>
                </div>

            </div>

        </div>

        <div class='game_card-actions card_shadow-left'>

            <div id='walkAction' class='game_card-attrib card_base_action walk unit white'>
                <div class='top'></div><div class='bottom'></div>
            </div>

            <div id='claimAction' class='game_card-attrib card_base_action white unit claim'>
                <div class='top'></div><div class='bottom'></div>
            </div>

            <div id='rallyAction' class='game_card-attrib card_base_action white unit rally'>
                <div class='top'></div><div class='bottom'></div>
            </div>

        </div>

        <div class='game_card-skill_list card_shadow-left'>

            <div class="card_list_item_black">
                <div class="img_skull_black"></div>
                <div class="roster_description">
                    <div class="roster_abil_name">${o}</div>
                    <div class="roster_abil_desc">${o}</div>
                </div>
                <div class="roster_abil_stats">
                    <div class="roster_abil_column roster_distance">
                        <div class="roster_abil_icon roster_abil_dist_white"></div>
                        <div class="roster_abil_number roster_dist_num">8</div>
                    </div>
                    <div class="roster_abil_column">
                        <div class="roster_abil_icon roster_abil_aim_black"></div>
                        4
                    </div>
                    <div class="roster_abil_column">
                        <div class="roster_abil_icon roster_abil_hurt_white"></div>
                        3
                    </div>
                </div>
            </div>

        </div>

    </div>
    `
}


function rightCard (o){
    return `
        <div id='game_card' class='right_card'>

        <div class='game_card-portrait card_shadow-right'>

            <div class='game_card-attribs'>

                <div id='card_dodge_white' class='game_card-attrib offset-dodge right'>
                    <div class='top'></div>
                    <p >5</p>
                    <div class='bottom'></div>
                </div>
                <div id='card_speed_black' class='game_card-attrib offset-speed right'>
                    <div class='top'></div>
                    <p >5</p>
                    <div class='bottom'></div>
                </div> 



                <div id='card_health_white' class='game_card-attrib offset-health right'>
                    <div class='top'></div>
                    <p >5</p>
                    <div class='bottom'></div>
                </div>

                <div id='card_protection_black' class='game_card-attrib offset-protection right'>
                    <div class='top'></div>
                    <p >5</p>
                    <div class='bottom'></div>
                </div>
            </div>
            <div class='game_card-picture'>
                <div class='top'></div>
                <img class='heroImg' src='./img/Blackjaw.png'/>
                <div class='bottom'></div>
            </div>


        </div>

        <div class='game_card-actions card_shadow-right'>

            <div id='rallyAction' class='game_card-attrib card_base_action white unit rally'>
                <div class='top'></div><div class='bottom'></div>
            </div>

            <div id='claimAction' class='game_card-attrib card_base_action white unit claim'>
                <div class='top'></div><div class='bottom'></div>
            </div>

            <div id='walkAction' class='game_card-attrib card_base_action walk unit white'>
                <div class='top'></div><div class='bottom'></div>
            </div>

        </div>

        <div class='game_card-skill_list card_shadow-right'>

            <div class="card_list_item_black">
                <div class="roster_abil_stats">
                    <div class="roster_abil_column">
                        <div class="roster_abil_icon roster_abil_hurt_white"></div>
                        3
                    </div>
                    <div class="roster_abil_column">
                        <div class="roster_abil_icon roster_abil_aim_black"></div>
                        4
                    </div>
                    <div class="roster_abil_column roster_distance">
                        <div class="roster_abil_icon roster_abil_dist_white"></div>
                        <div class="roster_abil_number roster_dist_num">8</div>
                    </div>
                </div>
                <div class="roster_description">
                    <div class="roster_abil_name">${o}</div>
                    <div class="roster_abil_desc">${o}</div>
                </div>
                <div class="img_skull_black"></div>
            </div>

        </div>
    </div>
    `
}
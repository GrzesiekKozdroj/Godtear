new Vue ({
    el: '#vue-app',
    data:{
        name:'Larhendiel',
        job: 'Jedi',
        time: 'afternoon'
    },
    methods:{
        greet:(props)=>{
            return `Good ${props.time} ${props.name}`
        }
    }
});


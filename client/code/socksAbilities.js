//{aim: [], hurt:[], hex, row, socksMethod}
for(let key in m_){
    socket.on(key, p=>{
        m_[p.socksMethod](p)
    })
}
for(let key in m__){
    socket.on(key, p=>{
        m_[p.socksMethod](p)
    })
}
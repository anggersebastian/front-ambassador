module.exports =  function(socket, io){

    socket.on('GET_MESSAGE_NEW_ORDER', (arg)=>{
        io.of('/admin-page').emit('MSG_NEW_ORDER', arg)
    })
    socket.on('disconnect', function () { 
        console.log('disconnexct')
    })

}
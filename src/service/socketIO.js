const { Server } = require("socket.io")

const connectSocketIO = () => {
    try {
        const io = new Server({
            cors: 'http://localhost:5173'
        })

        io.on("connection", (socket) => {
            console.log(socket.id);
            
            socket.emit("welcome", "Welcome to socket io.")

            socket.on("send_msg", ({id, message}) => {
                console.log(id, message);
                
                io.to(id).emit("rec_msg", message)
            })

            socket.on("join_group", (group) => {
                console.log(group);

                socket.join(group)
            })
        })

        io.listen(8000);
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = connectSocketIO
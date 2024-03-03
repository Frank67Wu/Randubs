const options = { /* ... */ };
const io = require("socket.io")(options);

io.on("connection", socket => { /* ... */ });

io.listen(3001);
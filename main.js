const server = require("./server")
const port = process.env.PORT || 8080



server.listen(port, async  () => {
    console.log(`listening  to port ${port}`);
})


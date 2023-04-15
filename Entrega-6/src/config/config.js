const { connect } = require("mongoose")

let url = `mongodb+srv://admin:123@cluster0.ytp6sst.mongodb.net/?retryWrites=true&w=majority`

const objConfig = {
    connectDB: async () => {
        try {
            await connect(url)
            console.log('Base de datos conectada')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = {
    objConfig
}

require('express-async-errors')
require('dotenv/config')
const express = require('express')
const app = express()

app.use(express.json())


const uploadsConfig = require('./config/uploadsConfig')

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const AppError = require('./utils/appError')
const routes = require('./routes')
const cors = require('cors')



app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://127.0.0.1:5173"
        ],
        credentials: true
    })
)


app.use('/files', express.static(uploadsConfig.UPLOADS_FOLDER))
app.use('/files_image', express.static(uploadsConfig.UPLOADS_FOLDER_DISH))

app.use(routes)

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }

    console.log(error)

    return response.status(500).json({
        status: 'error',
        message: 'error internal server'
    })
})


const PORT = process.env.PORT || 3333
app.listen(PORT, console.log(`Server is running in port ${PORT}`))
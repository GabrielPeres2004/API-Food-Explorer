const authConfig = {
    JWT: {
        secret: process.env.AUTH_SECRET || "default",
        expiresIn: '2d'
    }
}

module.exports = authConfig
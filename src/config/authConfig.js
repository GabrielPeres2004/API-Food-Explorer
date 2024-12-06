const authConfig = {
    JWT: {
        secret: process.env.AUTH_SECRET || "default",
        expiresIn: '1d'
    }
}

module.exports = authConfig
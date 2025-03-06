const CreateSessionsServices = require('../services/sessions/CreateSessionsServices')
const SessionRepository = require('../repositories/SessionRepository')

class SessionController {

    async create(request, response) {
        const { email, password } = request.body

        const sessionRepository = new SessionRepository()
        const createSessionsServices = new CreateSessionsServices(sessionRepository)

        const { token, user } = await createSessionsServices.execute({ email, password }, response)


        return response.json({ token, user })

    }
}

module.exports = SessionController
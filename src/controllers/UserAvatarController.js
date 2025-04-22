const DiskStorage = require('../provider/DiskStorage')

const AvatarUserService = require('../services/users/AvatarUserService')
const UserRepository = require("../repositories/UserRepository")


class UserAvatarController {
    async update(request, response) {
        const user_id = request.user.id
        const AvatarFileName = request.file.filename
        const diskStorage = new DiskStorage()

        const userRepository = new UserRepository()
        const avatarUserService = new AvatarUserService(userRepository)

        const { user } = await avatarUserService.execute(user_id, AvatarFileName, diskStorage)

        return response.json({ user })

    }

}

module.exports = UserAvatarController
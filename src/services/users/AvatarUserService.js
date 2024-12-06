const AppError = require('../../utils/appError')

class AvatarUserService {
    constructor(UserRepository) {
        this.UserRepository = UserRepository
    }

    async execute(user_id, AvatarFileName, diskStorage) {

        const user = await this.UserRepository.findByUserWithId(user_id)

        if (!user) {
            throw new AppError("Somente usuários autenticados podem mudar o seu avatar.", 401)
        }

        if (user.avatar) {
            await diskStorage.deleteFile(user.avatar)
        }

        const fileName = await diskStorage.saveFile(AvatarFileName)

        await this.UserRepository.updatedUserWithAvatar(fileName, user_id)

        return
    }
}

module.exports = AvatarUserService
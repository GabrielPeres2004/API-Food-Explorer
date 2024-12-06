const AppError = require('../../utils/appError')

class DeleteAddresService {
    constructor(AddressRepository) {
        this.AddressRepository = AddressRepository
    }

    async execute(user_id) {

        if (!user_id) {
            throw new AppError("Você não está autenticado.", 401);
        }

        return await this.AddressRepository.deleteAddress(user_id)
    }

}

module.exports = DeleteAddresService
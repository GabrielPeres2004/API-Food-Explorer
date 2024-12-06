const AppError = require('../../utils/appError')

class ShowAddressService {
    constructor(AddressRepository) {
        this.AddressRepository = AddressRepository
    }

    async execute(user_id) {

        if (!user_id) {
            throw new AppError("Você não está autenticado.", 401);
        }

        const userAddress = await this.AddressRepository.findByAddressWithUserId(user_id)

        return { userAddress }

    }
}


module.exports = ShowAddressService
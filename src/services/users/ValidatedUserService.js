class ValidatedUser {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute({ user_id }) {
        const checkUserExists = await this.userRepository.findByUserWithId(user_id)

        if (checkUserExists.length > 0) {
            throw new AppError("Unauthourized", 401);
        }

        return { checkUserExists }

    }
}

module.exports = ValidatedUser
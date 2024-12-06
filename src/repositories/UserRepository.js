const knex = require("../database/knex")


class UserRepository {
    async findByEmail(email) {
        const user = await knex('users').where({ email }).first()

        return user
    }


    async create({ name, email, password }) {
        const userId = await knex('users').insert({
            name,
            email,
            password
        })

        return { id: userId }
    }

    async findByUserWithId(id) {
        const user = await knex('users').where({ id }).first()

        return user
    }

    async updatedUser({ name, email, password, id }) {
        await knex('users')
            .where({ id })
            .update({
                name,
                email,
                password,
                updated_at: knex.fn.now()
            })

        return
    }

    async updatedUserWithAvatar(avatar, user_id) {

        return await knex("users").update({
            avatar,
            updated_at: knex.fn.now()
        }).where({ id: user_id })

    }

}

module.exports = UserRepository
const knex = require('../database/knex')

class AddressRepository {


    async createAddressWithoutCep(city, neighborhood, street, number, complement, id) {
        await knex('address').insert({
            city,
            neighborhood,
            street,
            number,
            complement,
            user_id: id
        }).where({ user_id: id })

    }

    async createAddressWithCep({ city, neighborhood, street, number, cep, complement, id }) {
        await knex('address').insert({
            city,
            neighborhood,
            street,
            number,
            cep,
            complement,
            user_id: id
        }).where({ user_id: id })

    }

    async deleteAddress(id) {
        await knex("address").where({ user_id: id }).delete()

    }

    async findByAddressWithUserId(id) {

        return await knex("address").where({ user_id: id }).first()

    }

    async updateAddressWithCep({ city, neighborhood, street, number, cep, complement, id }) {
        return await knex('address').update({
            city,
            neighborhood,
            street,
            number,
            cep,
            complement,
            user_id: id,
            updated_at: knex.fn.now()
        }).where({ user_id: id })

    }

    async updateAddressWithoutCep({ city, neighborhood, street, number, cep, complement, id }) {

        return await knex('address')
            .update({
                city,
                neighborhood,
                street,
                number,
                cep,
                complement,
                user_id: id,
                updated_at: knex.fn.now()

            })
            .where({ user_id: id })
    }
}


module.exports = AddressRepository
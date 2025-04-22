const knex = require('../database/knex')

class AddressRepository {


    async createAddressWithCep({ city, neighborhood, street, number, cep, complement, id }) {
        let address
        await knex('address').insert({
            city,
            neighborhood,
            street,
            number,
            cep,
            complement,
            user_id: id
        })

        address = {
            city,
            neighborhood,
            street,
            number,
            cep,
            complement,
            user_id: id
        }

        return { address }

    }

    async deleteAddress(id) {
        await knex("address").where({ user_id: id }).delete()

    }

    async findByAddressWithUserId(id) {

        return await knex("address").where({ user_id: id }).first()

    }

    async updateAddressWithCep({ city, neighborhood, street, number, cep, complement, id }) {
        let address
        await knex('address').update({
            city,
            neighborhood,
            street,
            number,
            cep,
            complement,
            user_id: id,
            updated_at: knex.fn.now()
        }).where({ user_id: id })

        address = {
            city,
            neighborhood,
            street,
            number,
            cep,
            complement,
            user_id: id
        }

        return { address }


    }

    async updateAddressWithoutCep({ city, neighborhood, street, number, cep, complement, id }) {
        let address

        await knex('address')
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

        address = {
            city,
            neighborhood,
            street,
            number,
            cep,
            complement,
            user_id: id
        }

        return { address }
    }
}


module.exports = AddressRepository
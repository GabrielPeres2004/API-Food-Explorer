const AppError = require('../../utils/appError')
const knex = require('../../database/knex')

class CreateAddresService {
    constructor(AddressRepository) {
        this.AddressRepository = AddressRepository
    }

    async execute(city, neighborhood, street, number, cep, complement, user_id) {
        let addressFromCep

        if (!cep) {
            throw new AppError("Digite o seu cep.", 400);
        }

        if (cep) {
            await fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    addressFromCep = data
                })

            if (!addressFromCep.bairro) {
                if (!neighborhood) {
                    throw new AppError("Não foi possível encontrar o bairro para este CEP. Por favor, insira o bairro manualmente.", 400);
                }
            }

            if (!addressFromCep.logradouro) {
                if (!street) {
                    throw new AppError("Não foi possível encontrar a sua rua para este CEP. Por favor, insira a rua manualmente.", 400);
                }
            }

            if (!number) {
                throw new AppError("Digite o número de sua residencia", 400)
            }

            await this.AddressRepository.deleteAddress(user_id)

            const { address } = await this.AddressRepository.createAddressWithCep({
                city: addressFromCep.localidade,
                neighborhood: addressFromCep.bairro || neighborhood,
                street: addressFromCep.logradouro || street,
                number,
                cep,
                complement,
                id: user_id
            })

            return { address }

        }


    }

}

module.exports = CreateAddresService
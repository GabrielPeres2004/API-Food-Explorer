const AppError = require('../../utils/appError')

class UpdateAddressSerivce {
    constructor(AddressRepository) {
        this.AddressRepository = AddressRepository
    }

    async execute(city, neighborhood, street, number, cep, complement, user_id) {
        let addressFromCep

        const userAddress = await this.AddressRepository.findByAddressWithUserId(user_id)

        if (!userAddress) {
            throw new AppError("Não foi possível encontrar o seu endereço.", 400);
        }

        const normalizeString = (string) => {
            if (!string) return "";
            return string
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
        };


        userAddress.number = number ?? userAddress.number
        userAddress.city = city ?? userAddress.city
        userAddress.neighborhood = neighborhood ?? userAddress.neighborhood
        userAddress.street = street ?? userAddress.street
        userAddress.complement = complement ?? userAddress.complement

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
                throw new AppError("Digite o número de sua residência.", 400)
            }


            try {
                await this.AddressRepository.updateAddressWithCep({
                    city: addressFromCep.localidade,
                    neighborhood: addressFromCep.bairro || neighborhood,
                    street: addressFromCep.logradouro || street,
                    number: userAddress.number,
                    cep,
                    complement: userAddress.complement,
                    id: user_id
                })

            } catch (error) {
                throw new AppError("Não foi possível atualizar o endereço utilizando CEP.", 400)
            }


        } else {

            await fetch(`https://viacep.com.br/ws/${userAddress.cep}/json/`)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    addressFromCep = data
                })


            if (city && normalizeString(city) !== normalizeString(addressFromCep.localidade)) {
                throw new AppError("A cidade que você informou não confere com o seu CEP atual, atualize o CEP ou verifique se as informações estão corretas.", 400);
            }

            if (addressFromCep.bairro &&
                neighborhood &&
                normalizeString(neighborhood) !== normalizeString(addressFromCep.bairro)) {
                throw new AppError("O bairro que você informou não confere com o seu CEP atual, atualize o CEP ou verifique se as informações estão corretas.", 400);
            }

            if (addressFromCep.logradouro &&
                street && normalizeString(street) !== normalizeString(addressFromCep.logradouro)) {
                throw new AppError("A rua que você informou não confere com o seu CEP atual, atualize o CEP ou verifique se as informações estão corretas.", 400);
            }

            try {
                await this.AddressRepository
                    .updateAddressWithoutCep({
                        city: userAddress.city,
                        neighborhood: userAddress.neighborhood,
                        street: userAddress.street,
                        number: userAddress.number,
                        cep: userAddress.cep,
                        complement: userAddress.complement,
                        id: user_id
                    })

            } catch (error) {
                throw new AppError("Não foi possível atualizar o endereço.", 400)
            }

        }


    }
}

module.exports = UpdateAddressSerivce
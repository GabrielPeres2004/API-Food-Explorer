const AddressRepository = require('../repositories/AddressRepository')

const CreateAddressService = require('../services/Addres/CreateAddressService')
const DeleteAddressService = require('../services/Addres/DeleteAddressService')
const ShowAddressService = require("../services/Addres/ShowAddressService")
const UpdateAddressService = require("../services/Addres/UpdateAddressService")

class AddressController {

    async create(request, response) {
        const { city, neighborhood, street, number, cep, complement } = request.body
        const user_id = request.user.id

        const addressRepository = new AddressRepository()
        const createAddressService = new CreateAddressService(addressRepository)

        await createAddressService.execute(city, neighborhood, street, number, cep, complement, user_id)


        return response.json({ message: "Endereço criado com sucesso" })
    }

    async delete(request, response) {
        const user_id = request.user.id

        const addressRepository = new AddressRepository()
        const deleteAddressService = new DeleteAddressService(addressRepository)

        await deleteAddressService.execute(user_id)

        return response.json({ message: "Endereço apagado com sucesso" })

    }


    async show(request, response) {
        const user_id = request.user.id

        const addressRepository = new AddressRepository()
        const showAddressService = new ShowAddressService(addressRepository)

        const { userAddress } = await showAddressService.execute(user_id)

        return response.json({ userAddress })

    }

    async updated(request, response) {
        const { city, neighborhood, street, number, cep, complement } = request.body
        const user_id = request.user.id

        const addressRepository = new AddressRepository()
        const updateAddressService = new UpdateAddressService(addressRepository)

        await updateAddressService.execute(city, neighborhood, street, number, cep, complement, user_id)

        return response.json({ message: "Endereço atualizado com sucesso" })
    }

}


module.exports = AddressController
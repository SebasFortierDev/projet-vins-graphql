const { getVins, getVin, createVin, updateVin, validateYear, validateGrade } = require("../models/Vin");

module.exports.getVins = async () => {
    return await getVins()
}

module.exports.getVin = async ({ id }) => {
    let vin = await getVin(id)

    if (!vin) {
        throw new Error('Aucun vin avec l\'id \' ' + id + '\' existe dans la base de données')
    }

    return vin
}

module.exports.createVin = async ({ input }) => {
    if (! validateYear(input.year)) {
        throw new Error('L\'année du vin doit être entre 1900 et 2022 inclusivement')
    }

    if (! validateGrade(input.grade)) {
        throw new Error('La note doit être entre 1 et 5')
    }

    return await createVin(input)
}

module.exports.updateVin = async ({ id, input }) => {
    if (! validateYear(input.year)) {
        throw new Error('L\'année du vin doit être entre 1900 et 2022 inclusivement')
    }

    if (! validateGrade(input.grade)) {
        throw new Error('La note doit être entre 1 et 5')
    }

    let vin = await updateVin(id, input)

    if (!vin) {
        throw new Error('Aucun vin avec l\'id \' ' + id + '\' existe dans la base de données')
    }

    return vin
}






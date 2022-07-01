const vinController = require('../../controllers/VinController')

module.exports = {
    getVins: vinController.getVins,
    getVin: vinController.getVin,
    createVin: vinController.createVin,
    updateVin: vinController.updateVin,
}

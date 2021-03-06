const { Router } = require('express')
const controllers = require('../controllers/locations')

const router = Router()


router.get('/locations', controllers.getLocations)
// router.get('/locations/:id', controllers.getLocation)
router.post('/locations', controllers.createLocation)
router.put('/locations/:id', controllers.updateLocation)
router.delete('/locations/:id', controllers.deleteLocation)
// router.delete('/locations/:id', controllers.deleteLocation)


router.get('/images', controllers.getImages)
router.post('/images', controllers.createImage)

module.exports = router
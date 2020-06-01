const express = require('express')

const ChildController = require('../controller/child.controller')

const ChildRouter = express.Router()

ChildRouter.get('/child', ChildController.findAllChildren);
ChildRouter.get('/child/:childName', ChildController.findByChildName);

ChildRouter.delete('/child/:childName', ChildController.deleteByChildName);

module.exports = ChildRouter
const express = require('express')

const ParentController = require('../controller/parent.controller')

const ParentRouter = express.Router()

ParentRouter.get('/init', ParentController.init);
ParentRouter.get('/:parentName', ParentController.getParent);

ParentRouter.delete('/:parentName', ParentController.deleteParent);

module.exports = ParentRouter
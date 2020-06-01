const express = require('express')

const ChoreController = require('../controller/chore.controller')

const ChoreRouter = express.Router()

const BASE = '/chores/:childName/'

// GET ALL
ChoreRouter.get(`${BASE}`, ChoreController.getAllChores);
ChoreRouter.get(`${BASE}:day/:timeOfDay/totals`, ChoreController.getChoresByTimeOfDayTotals);

// GET INCOMPLETE
ChoreRouter.get(`${BASE}incomplete/:day`, ChoreController.getAllInompleteChores);
ChoreRouter.get(`${BASE}incomplete/:day/:timeOfDay`, ChoreController.getInompleteChoresByTimeOfDay);

// GET COMPLETE
ChoreRouter.get(`${BASE}completed/:day`, ChoreController.getAllCompletedChores);
ChoreRouter.get(`${BASE}completed/:day/:timeOfDay`, ChoreController.getCompleteChoresByTimeOfDay);

// POST
ChoreRouter.post(`${BASE}createChore`, ChoreController.createChore);

// UPDATE
ChoreRouter.put('/chores/:choreId', ChoreController.updateChoreById);

// DELETE
ChoreRouter.delete('/chores/:choreId', ChoreController.deleteChoreById)

module.exports = ChoreRouter
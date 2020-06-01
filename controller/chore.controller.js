const Chore = require('../models/chore.model');
const Child = require('../models/child.model');

function errorHandler(error, response, childName) {
  if (error) {
    if (error.kind === 'ObjectId') {
      return response.status(404).send({
        success: false,
        message: "Child not found with given name " + childName
      });
    }
    return response.status(500).send({
      success: false,
      message: "Error retrieving Child with given Parent Id " + childName
    });
  }
}

createChore = (req, res) => {
  const { body, params } = req;

  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a chore',
    })
  }

  Child.findOne({ name: params.childName })
    .exec(function (err, child) {
      errorHandler(err, res, params.childName);

      const chore = new Chore({
        child: child.id,
        completed: false,
        days: body.days,
        description: body.description,
        image: body.image,
        name: body.name,
        timeOfDay: body.timeOfDay
      })

      chore.save(function (err) {
        if (err) return console.error(err.stack)
      });

      res.status(200).json({ success: true, message: `Chore: ${body.name} Created!!` });
    });
}

getAllChores = (req, res) => {
  const { childName } = req.params;
  Child.findOne({ name: childName })
    .exec(function (err, child) {
      errorHandler(err, res, childName);

      Chore.find({ child: child._id })
        .exec(function (err, chores) {
          errorHandler(err, res, childName);

          res.status(200).json({ success: true, chores });
        });
    });
}

getAllCompletedChores = (req, res) => {
  const { childName, day } = req.params;
  Child.findOne({ name: childName })
    .exec(function (err, child) {
      errorHandler(err, res, childName);

      Chore.find({ child: child._id })
        .exec(function (err, chores) {
          errorHandler(err, res, childName);
          const totals = {
            morning: { current: 0, possible: 0},
            school_and_work: { current: 0, possible: 0 },
            afternoon: { current: 0, possible: 0 },
            evening: { current: 0, possible: 0 }
          }

          const completed = chores.filter(chore => {
            if (chore.completed && chore.days[day]) totals[chore.timeOfDay].current += 1;
            if (chore.days[day]) totals[chore.timeOfDay].possible += 1;
            return chore.completed && chore.days[day]
          });

          res.status(200).json({ success: true, chores: completed, totals });
        });
    });
}

getCompleteChoresByTimeOfDay = (req, res) => {
  const { childName, day, timeOfDay } = req.params;
  Child.findOne({ name: childName })
    .exec(function (err, child) {
      errorHandler(err, res, childName);

      Chore.find({ child: child._id })
        .exec(function (err, chores) {
          errorHandler(err, res, childName);
          
          const completed = chores.filter(chore => {
            return chore.completed === true && chore.timeOfDay === timeOfDay && chore.days[day]
          });

          res.status(200).json({ success: true, chores: completed });
        });
    });
}

getAllInompleteChores = (req, res) => {
  const { childName, day } = req.params;
  Child.findOne({ name: childName })
    .exec(function (err, child) {
      errorHandler(err, res, childName);

      Chore.find({ child: child._id })
        .exec(function (err, chores) {
          errorHandler(err, res, childName);

          const incomplete = chores.filter(chore => {

            if (day === 'all') return chore.completed === false
            return chore.completed === false && chore.days[day]
          });

          res.status(200).json({ success: true, chores: incomplete });
        });
    });
}

getInompleteChoresByTimeOfDay = (req, res) => {
  const { childName, day, timeOfDay } = req.params;
  Child.findOne({ name: childName })
    .exec(function (err, child) {
      errorHandler(err, res, childName);

      Chore.find({ child: child._id })
        .exec(function (err, chores) {
          errorHandler(err, res, childName);
          
          const incomplete = chores.filter(chore => {
            return chore.completed === false && chore.timeOfDay === timeOfDay && chore.days[day]
          });

          res.status(200).json({ success: true, chores: incomplete });
        });
    });
}

getChoresByTimeOfDayTotals = (req, res) => {
  const { childName, day, timeOfDay } = req.params;
  Child.findOne({ name: childName })
    .exec(function (err, child) {
      errorHandler(err, res, childName);

      Chore.find({ child: child._id })
        .exec(function (err, chores) {
          errorHandler(err, res, childName);
          
          const timeOfDayTotals = chores.filter(chore => {
            return chore.timeOfDay === timeOfDay && chore.days[day]
          });

          res.status(200).json({ success: true, chores: timeOfDayTotals });
        });
    });
}

updateChoreById = (req, res) => {
  const { body, params } = req;
  Chore.findByIdAndUpdate({ _id: params.choreId }, { completed: body.completed }).exec(function (err, chore) {
    errorHandler(err, res, 'unknown');

    res.status(200).json({ success: true, message: `Chore: ${chore.name} Updated` });
  })
}

deleteChoreById = (req, res) => {
  Chore.findByIdAndDelete(req.params.choreId).exec(function (err, chore) {
    errorHandler(err, res, 'unknown');

    res.status(200).json({ success: true, message: `Chore: ${chore.name} Deleted` });
  })
}

module.exports = {
  // Create
  createChore,
  getAllChores,
  // Incomplete
  getAllInompleteChores,
  getInompleteChoresByTimeOfDay,
  getChoresByTimeOfDayTotals,
  // Complete
  getAllCompletedChores,
  getCompleteChoresByTimeOfDay,
  // Update
  updateChoreById,
  // Delete
  deleteChoreById
}
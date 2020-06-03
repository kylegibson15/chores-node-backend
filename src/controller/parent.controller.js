const Parent = require('../models/parent.model.js');
const Child = require('../models/child.model.js');
const Chore = require('../models/chore.model.js');

init = (req, res) => {
  const dean = new Parent({
    name: 'Dean',
    rewards: { morning: 25, school_and_work: 35, afternoon: 25, evening: 25 }
  });

  dean.save(function (err) {
    if (err) return console.error(err.stack)

    const romeo = new Child({
      name: "Romeo",
      image: '',
      parent: dean._id,
      total_points: 0
    });

    const chore1 = new Chore({
      child: romeo.id,
      completed: false,
      days: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true
      },
      description: 'Make Bed',
      image: '',
      name: 'Make Bed',
      timeOfDay: 'morning'
    })

    chore1.save(function (err) {
      if (err) return console.error(err.stack)
    });

    romeo.save(function (err) {
      if (err) return console.error(err.stack)
    });
  });
  res.send("Database Initialized!");
}

getParent = (req, res) => {
  Parent.findOne({ name: req.params.parentName })
    .then(child => {
      console.log({ child })
      res.send(child);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

deleteParent = (req, res) => {
  Parent.findOneAndDelete({ name: req.params.parentName }, (err, parent) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    console.log({ parent });
    if (!parent) {
      return res
        .status(404)
        .json({ success: false, error: `Parent: ${req.params.parentName}, not found` })
    }

    return res.status(200).json({ success: true, deleted: true })
  }).catch(err => console.log(err))
};

module.exports = {
  init,
  getParent,
  deleteParent
}
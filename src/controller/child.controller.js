const Parent = require('../models/parent.model.js');
const Child = require('../models/child.model.js');

findAllChildren = async (req, res) => {
  await Child.find({}, (err, children) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!children.length) {
      return res
        .status(404)
        .json({ success: false, error: `0 Children found` })
    }
    return res.status(200).json({ success: true, children: children })
  }).catch(err => console.log(err))
};

// Find a Child by Name
findByChildName = (req, res) => {
  Child.findOne({ name: req.params.childName })
    .populate('parent')
    .exec(function (err, child) {
      if (err) {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "Child not found with given name " + req.params.childName
          });
        }
        return res.status(500).send({
          message: "Error retrieving Child with given Parent Id " + req.params.childName
        });
      }
      res.json(child);
    });
};

deleteByChildName = (req, res) => {
  Child.findOneAndDelete({ name: req.params.childName }, (err, child) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!child) {
      return res
        .status(404)
        .json({ success: false, error: `Child: ${req.params.childName}, not found` })
    }

    return res.status(200).json({ success: true, deleted: true })
  }).catch(err => console.log(err))
};

module.exports = {
  findAllChildren,
  findByChildName,
  deleteByChildName
}
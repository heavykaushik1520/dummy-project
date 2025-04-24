const Member = require('../models/Member');
const memberValidation = require('../validations/memberValidation');

exports.getAll = async (req, res) => {
  const members = await Member.findAll();
  res.json(members);
};

exports.getById = async (req, res) => {
  const member = await Member.findByPk(req.params.id);
  if (!member) return res.status(404).send("Member not found");
  res.json(member);
};

exports.create = async (req, res) => {
  const { error } = memberValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const member = await Member.create(req.body);
  res.status(201).json(member);
};

exports.update = async (req, res) => {
  const { error } = memberValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const [updated] = await Member.update(req.body, {
    where: { id: req.params.id }
  });

  if (!updated) return res.status(404).send("Member not found");
  const updatedMember = await Member.findByPk(req.params.id);
  res.json(updatedMember);
};

exports.delete = async (req, res) => {
  const deleted = await Member.destroy({ where: { id: req.params.id } });
  if (!deleted) return res.status(404).send("Member not found");
  res.send("Deleted successfully");
};

const { Schema, model } = require('mongoose');

const Mod = new Schema({
  Hit: Number,
  Wound: Number,
  Save: Number,
  FnP: Number,
  Damage: Number,
  ModAp: Number,
  SInV: Number,
  rerollHits: String,
  rerollWounds: String,
  rerollSaved: String,
  rerollDamage: String,
});

module.exports = model('penalizations', Mod);

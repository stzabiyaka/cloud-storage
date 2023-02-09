const { Schema, model } = require('mongoose');
const { handleDBSaveError } = require('../helpers');

const userSchema = new Schema(
  {
    name: { type: String, default: 'User' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    diskSpace: { type: Number, default: 1024 ** 3 * 2 },
    usedSpace: { type: Number, default: 0 },
    avatarURL: { type: String, default: null },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post('save', handleDBSaveError);

module.exports = model('User', userSchema);

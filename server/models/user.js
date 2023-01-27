const { Schema, model } = require('mongoose');
const { handleDBSaveError } = require('../helpers');

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  diskSpace: { type: Number, default: 1024 ** 3 * 10 },
  usedSpace: { type: Number, default: 0 },
  avatar: { type: String },
  files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
},
  { versionKey: false, timestamps: true });
userSchema.post('save', handleDBSaveError);

module.exports = model('User', userSchema);

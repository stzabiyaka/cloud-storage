const { Schema, model } = require('mongoose');
const { handleDBSaveError } = require('../helpers');

const fileSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    filePath: { type: String, default: '' },
    accessLink: { type: String },
    size: { type: Number, default: 0 },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    parent: { type: Schema.Types.ObjectId, ref: 'File' },
    children: [{ type: Schema.Types.ObjectId, ref: 'File' }],
  },
  { versionKey: false, timestamps: true }
);

fileSchema.post('save', handleDBSaveError);

module.exports = model('File', fileSchema);

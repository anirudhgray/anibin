import mongoose from 'mongoose'
import PollResponse from './pollResponse.js'

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  details: {
    type: String,
    required: false,
    trim: false
  },
  mcq: {
    type: Boolean,
    required: true
  },
  options: {
    type: [String],
    default: undefined,
    required: function () {
      return this.mcq
    }
  },
  theme: {
    type: String,
    required: true,
    trim: true
  },
  singleResponse: {
    type: Boolean,
    required: true,
    default: false
  },
  open: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
})

pollSchema.virtual('pollResponses', {
  ref: 'PollResponse',
  localField: '_id',
  foreignField: 'poll' // the field in the ref with which relationship is being set up.
})

pollSchema.methods.toJSON = function () {
  const pollObject = this.toObject()
  return pollObject
}

pollSchema.pre('remove', async function (next) {
  await PollResponse.deleteMany({ poll: this._id })
  next()
})


const Paste = mongoose.model('Poll', pollSchema)

export default Paste
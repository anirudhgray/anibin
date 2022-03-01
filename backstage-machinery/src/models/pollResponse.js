import mongoose from 'mongoose'

const pollResponseSchema = new mongoose.Schema({
  response: {
    type: String,
    required: true
  },
  poll: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Poll'
  },
  ip: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

pollResponseSchema.methods.toJSON = function () {
  const pollResponseObject = this.toObject()
  delete pollResponseObject.ip
  return pollResponseObject
}

const PollResponse = mongoose.model('PollResponse', pollResponseSchema)

export default PollResponse
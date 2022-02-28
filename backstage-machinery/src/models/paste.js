import mongoose from 'mongoose'

const pasteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: false
  },
  language: {
    type: String,
    required: true,
    trim: true
  },
  theme: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

const Paste = mongoose.model('Paste', pasteSchema)

export default Paste
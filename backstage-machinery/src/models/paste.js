import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

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
  },
  password: {
    type: String,
    trim: true,
    required: function () {
      if (this.protected) {
        return true
      } else {
        return false
      }
    }
  },
  protected: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
})

pasteSchema.methods.toJSON = function () {
  const pasteObject = this.toObject()
  delete pasteObject.password
  return pasteObject
}

pasteSchema.pre('save', async function (next) {

  if (this.isModified('password') && this.protected) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

const Paste = mongoose.model('Paste', pasteSchema)

export default Paste
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_CONN, {
  useNewUrlParser: true
})
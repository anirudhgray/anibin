import express from 'express'
import Paste from '../models/paste.js'
import bcrypt from 'bcryptjs'

const router = express.Router()

router.post("/pastes", async (req, res) => {
  const paste = new Paste({
    ...req.body
  })

  try {
    await paste.save()
    res.status(201).send(paste)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get("/pastes/:id", async (req, res) => {
  const _id = req.params.id

  try {
    const paste = await Paste.findOne({ _id })

    if (!paste) {
      return res.status(404).send()
    }

    if (paste.protected) {
      return res.status(400).send({ error: "Protected paste!" })
    }

    res.status(200).send(paste)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get("/pastes/:id/protected", async (req, res) => {
  const _id = req.params.id

  try {
    const password = req.header('Authorization').replace("Bearer ", "")
    const paste = await Paste.findOne({ _id })

    if (!paste) {
      return res.status(404).send()
    }

    const isMatch = await bcrypt.compare(password, paste.password)

    if (!isMatch) {
      return res.status(400).send({ error: "Invalid password." })
    }

    res.status(200).send(paste)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default router
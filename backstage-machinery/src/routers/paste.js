import express from 'express'
import Paste from '../models/paste.js'

const router = express.Router()

router.post("/pastes", async (req, res) => {
  const paste = new Paste({
    ...req.body
  })

  try {
    await paste.save()
    res.status(201).send(paste)
  } catch (e) {
    res.status(500).send()
  }
})

router.get("/pastes/:id", async (req, res) => {
  const _id = req.params.id

  try {
    const paste = await Paste.findOne({ _id })

    if (!paste) {
      return res.status(404).send()
    }

    res.status(200).send(paste)
  } catch (e) {
    res.status(500).send()
  }
})

export default router
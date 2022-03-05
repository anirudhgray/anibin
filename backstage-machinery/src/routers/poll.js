import express from 'express'
import Poll from '../models/poll.js'
import PollResponse from '../models/pollResponse.js'

const router = express.Router()

router.post("/polls", async (req, res) => {
  const poll = new Poll({
    ...req.body
  })

  try {
    await poll.save()
    res.status(201).send(poll)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get("/polls/:id", async (req, res) => {
  const _id = req.params.id

  try {
    const poll = await Poll.findOne({ _id })

    if (!poll) {
      return res.status(404).send()
    }

    if (!poll.open) {
      return res.status(401).send({error: "This poll is no longer accepting responses."})
    }

    const existingResponse = await PollResponse.findOne({ip:req.ip, poll:_id})
    if (existingResponse && poll.singleResponse) {
      return res.status(401).send({error: "You have already submitted a response."})
    }

    res.status(200).send(poll)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.post('/polls/:id/responses', async (req, res) => {
  const _id = req.params.id
  try {
    const poll = await Poll.findOne({ _id })

    if (!poll) {
      return res.status(404).send({error: "Poll not found."})
    }

    if (!poll.open) {
      return res.status(401).send({error: "This poll is no longer accepting responses."})
    }

    if (poll.mcq && !(poll.options.includes(req.body.response))) {
      return res.status(400).send({error: "Invalid response to poll."})
    }

    const existingResponse = await PollResponse.findOne({ip:req.ip, poll:_id})
    if (existingResponse && poll.singleResponse) {
      return res.status(401).send({error: "You have already submitted a response."})
    }

    const pollResponse = new PollResponse({
      ...req.body,
      poll: _id,
      ip: req.ip
    })

    await pollResponse.save()

    res.status(201).send(pollResponse)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/polls/:id/responses', async (req, res) => {
  const _id = req.params.id

  try {
    const poll = await Poll.findOne({ _id })

    if (!poll) {
      return res.status(404).send()
    }

    await poll.populate({
      path: 'pollResponses',
    })
    const responses = poll.pollResponses

    res.status(200).send(responses)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default router
import express from 'express';
import player from './player';

const router = express.Router();
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

router.post('/play', async (req, res) => {
  try {
    await player.play(req.body.name);
    res.json({ status: SUCCESS });
  } catch (error) {
    res.json({ status: FAILURE });
  }
});

router.post('/pause', (req, res) => {
  player.pause();

  res.json({ status: SUCCESS });
});

router.post('/resume', (req, res) => {
  player.resume();

  res.json({ status: SUCCESS });
});

router.post('/stop', (req, res) => {
  player.stop();

  res.json({ status: SUCCESS });
});

export default router;

import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
    const { message } = req.body;
    console.log('Received Message:', message);

    // message send to gmail

    res.status(200).json({ success: true, message: 'message received successfully!' });
});

export default router;
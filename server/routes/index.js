import express from 'express';

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res) => {
  res.send({ status: 200, data: "welcome to epicmail" });
});

export default router;

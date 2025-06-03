// /routes/register.js

const express = require('express');
const router = express.Router();
const axios = require('axios');

// Rich Menu IDs
const RICH_MENUS = {
  resident: 'richmenu-c63530939b6203e73f72e374db402136',
  technician: 'richmenu-a4c247adf3dcbe494c411138c1f84731',
};

// LINE Channel Access Token
const CHANNEL_ACCESS_TOKEN = 'YOUR_CHANNEL_ACCESS_TOKEN_HERE'; // แนะนำอย่า hardcode

// POST /api/register
router.post('/', async (req, res) => {
  const { userId, role } = req.body;
  console.log(`📥 ได้รับคำขอเปลี่ยน Rich Menu: userId=${userId}, role=${role}`);

  if (!userId || !role) {
    return res.status(400).json({ message: 'userId และ role จำเป็น' });
  }

  const richMenuId = RICH_MENUS[role];

  if (!richMenuId) {
    return res.status(400).json({ message: 'ไม่พบ Rich Menu สำหรับ role นี้' });
  }

  try {
    // ผูก Rich Menu ให้ user
    await axios.post(
      `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.status(200).json({ message: '✅ เปลี่ยน Rich Menu เรียบร้อยแล้ว' });
  } catch (err) {
    console.error('❌ Error changing Rich Menu:', err.response?.data || err.message);
    return res.status(500).json({ message: '❌ เปลี่ยน Rich Menu ล้มเหลว', error: err.response?.data || err.message });
  }
});

module.exports = router;

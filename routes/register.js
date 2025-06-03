// /routes/register.js

const express = require('express');
const router = express.Router();
const axios = require('axios');

const RICH_MENUS = {
  resident: 'richmenu-c63530939b6203e73f72e374db402136',
  technician: 'richmenu-a4c247adf3dcbe494c411138c1f84731',
};

const CHANNEL_ACCESS_TOKEN = 'qIvNO1l0vxERUs0TwZWrY4AtcpuR9FEGZLkXLvue0ooF1NxYNnnBOSfGNVdLB0i2T4ymCXsr/9mRSGdAjixhoHwjPFwA2eEzz0URvWSsFE8/PwH+9nHNEmjZ//s3CEwUDHhvW6vKwdutJ6w6M3cufAdB04t89/1O/w1cDnyilFU=';

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
    // 1. ลบ Rich Menu เดิม (ถ้ามี)
    await axios.delete(`https://api.line.me/v2/bot/user/${userId}/richmenu`, {
      headers: {
        Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
      },
    });

    // 2. ผูก Rich Menu ใหม่
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

    return res.status(200).json({ message: 'เปลี่ยน Rich Menu เรียบร้อย' });
  } catch (err) {
    console.error('❌ Error changing Rich Menu:', err.response?.data || err.message);
    return res.status(500).json({ message: 'เปลี่ยน Rich Menu ล้มเหลว' });
  }
});

module.exports = router;

require('dotenv').config(); // โหลดตัวแปรสิ่งแวดล้อมจากไฟล์ .env
const express = require('express');
const cors = require('cors');
const instructorsRoutes = require('../routes/instructors'); // นำเข้า route

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ใช้ route สำหรับผู้สอน
app.use('/api/instructors', instructorsRoutes);

app.listen(port, () => {
  console.log(`เซิร์ฟเวอร์กำลังทำงานที่ http://localhost:${port}`);
});

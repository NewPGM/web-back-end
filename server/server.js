//server/server.js
require('dotenv').config(); // โหลดตัวแปรสิ่งแวดล้อมจากไฟล์ .env
const express = require('express');
const cors = require('cors');
const instructorsRoutes = require('./routes/instructors'); // แก้ไขเส้นทาง
const roomsRoutes = require('./routes/rooms'); // แก้ไขเส้นทาง
const locationsRoutes = require('./routes/locations');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ใช้ route สำหรับผู้สอน
app.use('/api/instructors', instructorsRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/locations', locationsRoutes);

app.listen(port, () => {
  console.log(`เซิร์ฟเวอร์กำลังทำงานที่ http://localhost:${port}`);
});

require('dotenv').config(); // โหลดตัวแปรสิ่งแวดล้อมจากไฟล์ .env
const express = require('express');
const mysql = require('mysql2/promise'); // ใช้ promise เพื่อรองรับ async/await
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

// ใช้ Connection Pool เพื่อประสิทธิภาพที่ดีกว่า
const pool = mysql.createPool({
  uri: process.env.DB_URI,
  connectionLimit: 10, // กำหนดจำนวนการเชื่อมต่อพร้อมกัน
});

// ฟังก์ชันทั่วไปสำหรับจัดการการทำงานกับฐานข้อมูล
async function executeQuery(query, params, res, successMessage) {
  try {
    const [results] = await pool.query(query, params);
    if (successMessage && results.affectedRows > 0) {
      res.status(201).send(successMessage);
    } else if (results.affectedRows === 0) {
      res.status(404).send('ไม่พบข้อมูลหรือไม่มีการเปลี่ยนแปลง');
    } else {
      res.json(results);
    }
  } catch (err) {
    console.error('เกิดข้อผิดพลาดในการดำเนินการฐานข้อมูล:', err);
    res.status(500).send('เกิดข้อผิดพลาด');
  }
}

// Endpoint สำหรับดึงข้อมูลผู้สอน
app.get('/api/instructors', async (req, res) => {
  const query = `
    SELECT instructors.*, rooms.room_name 
    FROM instructors 
    JOIN rooms ON instructors.room_id = rooms.room_id
  `;
  await executeQuery(query, [], res);
});

// Endpoint สำหรับเพิ่มข้อมูลผู้สอน พร้อมตรวจสอบข้อมูลที่ป้อนเข้า
app.post('/api/instructors', async (req, res) => {
  const { name, email, room_id } = req.body; // เปลี่ยนจาก room_name เป็น room_id ถ้าจำเป็น

  // พิมพ์ข้อมูลที่รับมาเพื่อตรวจสอบ
  console.log("ข้อมูลที่รับจากไคลเอนต์:", { name, email, room_id });

  if (!name || !email || !room_id) {
    return res.status(400).send('กรุณาระบุข้อมูลทั้งหมด');
  }

  try {
  const query = 'INSERT INTO instructors (name, email, room_id) VALUES (?, ?, ?)';
  await pool.query(query, [name, email, room_id]);
  res.status(201).send('เพิ่มข้อมูลผู้สอนเรียบร้อยแล้ว');
} catch (err) {
  console.error('เกิดข้อผิดพลาดในการดำเนินการฐานข้อมูล:', err.message); // เพิ่มการพิมพ์ err.message
  res.status(500).send('เกิดข้อผิดพลาดในการดำเนินการฐานข้อมูล');
}

});


// Endpoint สำหรับลบข้อมูลผู้สอนตาม ID
app.delete('/api/instructors/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM instructors WHERE instructor_id = ?';
  await executeQuery(query, [id], res, 'ลบข้อมูลผู้สอนเรียบร้อยแล้ว');
});

// Endpoint สำหรับอัปเดตข้อมูลผู้สอน
app.put('/api/instructors/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, room_id } = req.body;

  if (!name || !email || !room_id) {
    return res.status(400).send('กรุณาระบุข้อมูลทั้งหมด');
  }

  const query = `
    UPDATE instructors
    SET name = ?, email = ?, room_id = ?
    WHERE instructor_id = ?
  `;
  await executeQuery(query, [name, email, room_id, id], res, 'อัปเดตข้อมูลผู้สอนเรียบร้อยแล้ว');
});

app.listen(port, () => {
  console.log(`เซิร์ฟเวอร์กำลังทำงานที่ http://localhost:${port}`);
});

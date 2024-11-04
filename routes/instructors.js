const express = require('express');
const router = express.Router();
const pool = require('../config/db');

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
    console.error('เกิดข้อผิดพลาดในการดำเนินการฐานข้อมูล:', err.message);
    res.status(500).send('เกิดข้อผิดพลาด');
  }
}

// Endpoint สำหรับดึงข้อมูลผู้สอน
router.get('/', async (req, res) => {
  const query = `
    SELECT instructors.*, rooms.room_name 
    FROM instructors 
    JOIN rooms ON instructors.room_id = rooms.room_id
  `;
  await executeQuery(query, [], res);
});

// Endpoint สำหรับเพิ่มข้อมูลผู้สอน
router.post('/', async (req, res) => {
  const { name, email, room_id } = req.body;
  console.log("ข้อมูลที่รับจากไคลเอนต์:", { name, email, room_id });

  if (!name || !email || !room_id) {
    return res.status(400).send('กรุณาระบุข้อมูลทั้งหมด');
  }

  try {
    const query = 'INSERT INTO instructors (name, email, room_id) VALUES (?, ?, ?)';
    await pool.query(query, [name, email, room_id]);
    res.status(201).send('เพิ่มข้อมูลผู้สอนเรียบร้อยแล้ว');
  } catch (err) {
    console.error('เกิดข้อผิดพลาดในการดำเนินการฐานข้อมูล:', err.message);
    res.status(500).send('เกิดข้อผิดพลาดในการดำเนินการฐานข้อมูล');
  }
});

// Endpoint สำหรับลบข้อมูลผู้สอนตาม ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM instructors WHERE instructor_id = ?';
  await executeQuery(query, [id], res, 'ลบข้อมูลผู้สอนเรียบร้อยแล้ว');
});

// Endpoint สำหรับอัปเดตข้อมูลผู้สอน
router.put('/:id', async (req, res) => {
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

module.exports = router;

// server/routes/rooms.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM rooms ORDER BY room_name');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).send('Error fetching rooms');
  }
});

// Add room
router.post('/', async (req, res) => {
  const { room_name } = req.body;
  if (!room_name) {
    return res.status(400).send('Room name is required');
  }
  try {
    // eslint-disable-next-line no-empty-pattern
    const [] = await pool.query(
      'INSERT INTO rooms (room_name) VALUES (?)',
      [room_name]
    );
    res.status(201).send('Room added successfully');
  } catch (error) {
    console.error('Error adding room:', error);
    res.status(500).send('Error adding room');
  }
});

// Update room
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { room_name } = req.body;
  if (!room_name) {
    return res.status(400).send('Room name is required');
  }
  try {
    const [result] = await pool.query(
      'UPDATE rooms SET room_name = ? WHERE room_id = ?',
      [room_name, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).send('Room not found');
    } else {
      res.send('Room updated successfully');
    }
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).send('Error updating room');
  }
});

// Delete room
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      'DELETE FROM rooms WHERE room_id = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      res.status(404).send('Room not found');
    } else {
      res.send('Room deleted successfully');
    }
  } catch (error) {
    console.error('Error deleting room:', error);
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      res.status(400).send('Cannot delete room as it is being used by instructors');
    } else {
      res.status(500).send('Error deleting room');
    }
  }
});

module.exports = router;
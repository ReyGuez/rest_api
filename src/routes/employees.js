const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Employees
router.get('/api/get_values', (req, res) => {
  mysqlConnection.query('SELECT * FROM `sensores`', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log('que pedo', err);
    }
  });  
});

// SELECT * FROM `2020-10-01`
// // GET An Employee
// router.get('/:id', (req, res) => {
//   const { id } = req.params; 
//   mysqlConnection.query('SELECT * FROM employee WHERE id = ?', [id], (err, rows, fields) => {
//     if (!err) {
//       res.json(rows[0]);
//     } else {
//       console.log(err);
//     }
//   });
// });

// // DELETE An Employee
// router.delete('/:id', (req, res) => {
//   const { id } = req.params;
//   mysqlConnection.query('DELETE FROM employee WHERE id = ?', [id], (err, rows, fields) => {
//     if(!err) {
//       res.json({status: 'Employee Deleted'});
//     } else {
//       console.log(err);
//     }
//   });
// });

// INSERT An Employee
router.post('/api/add_values', (req, res) => {
  const {id, location, voltage, corriente, nivel, ph, fecha} = req.body;
  console.log(id, location, voltage, corriente, nivel, ph, fecha);
  const query = `
    SET @id = ?;
    SET @location = ?;
    SET @voltage = ?;
    SET @corriente = ?;
    SET @nivel = ?;
    SET @ph = ?;
    SET @fecha = ?;
    CALL insert_data(@id, @location, @voltage, @corriente, @nivel, @ph, @fecha);
  `;
  mysqlConnection.query(query, [0, location, voltage, corriente, nivel, ph, new Date()], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Data Saved'});
    } else {
      console.log(err);
    }
  });

});

// router.put('/:id', (req, res) => {
//   const { name, salary } = req.body;
//   const { id } = req.params;
//   const query = `
//     SET @id = ?;
//     SET @name = ?;
//     SET @salary = ?;
//     CALL employeeAddOrEdit(@id, @name, @salary);
//   `;
//   mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
//     if(!err) {
//       res.json({status: 'Employee Updated'});
//     } else {
//       console.log(err);
//     }
//   });
// });

module.exports = router;

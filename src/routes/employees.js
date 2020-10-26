const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Employees
router.get('/api/get_values', (req, res) => {
  mysqlConnection.query('SELECT * FROM `2020-10-01`', (err, rows, fields) => {
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
  const {dc, voltage} = req.body;
  console.log(dc, voltage);
  const query = `
    SET @dc = ?;
    SET @voltage = ?;
    SET @id = ?;
    CALL employeeAddOrEdit(@dc, @voltage, @id);
  `;
  mysqlConnection.query(query, [dc, voltage, 0], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Employeed Saved'});
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

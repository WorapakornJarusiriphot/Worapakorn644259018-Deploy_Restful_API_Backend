const mysql = require("mysql")//เป็นการเอาในส่วนของ mysql ในไฟล์ package.json นำมาใช้งาน //require คือเป็นการimport โดยเก็บไว้ในออฟเจ็คที่ชื่อว่า mysql
const dbConfig = require("../config/db.config")//เป็นการเอาในส่วนของไฟล์  db.config ในโฟเดอร์ config นำมาใช้งาน //require คือเป็นการimport โดยเก็บไว้ในออฟเจ็คที่ชื่อว่า dbConfig และ ../ คือเป็นการ move เข้าไปอีกหนึ่งสเต็ป ต้องออกจากโฟเดอร์ models ก่อน เป็นคำสั่งที่ใช้ในการออกจากโฟเดอร์ models พอใช้ ../ แล้วจะขึ้นโฟเดอร์หรือไฟล์ที่อยู่ข้างนอกโฟเดอร์ models เช่น config , node_modules , routes , package-lock.json , package.json , server.js ถ้าเป็นไฟล์ก็จะเสร็จเลยแต่ถ้าเป็นโฟเดอร์ก็จะต้องพิม / เพื่อเข้าไปเลือกไฟล์อีกเช่น ../config/db.config

//Create DB Connection
const connection = mysql.createConnection({ //สร้างตัวแปร connection 
  host:dbConfig.HOST, //:dbConfig. เป็นการส่งค่าพารามิเตอร์ให้เขา //ค่านี้เก็บเอาไว้ในไฟล์ db.config.js ไว้เรียบร้อย
  user:dbConfig.USER, //ค่านี้เก็บเอาไว้ในไฟล์ db.config.js ไว้เรียบร้อย
  password:dbConfig.PASSWORD, //ค่านี้เก็บเอาไว้ในไฟล์ db.config.js ไว้เรียบร้อย
  database:dbConfig.DATABASE //ค่านี้เก็บเอาไว้ในไฟล์ db.config.js ไว้เรียบร้อย
});

//Connect to DB
connection.connect((error)=>{
    if(error) throw error //ถ้ามี error เราก็ทำการจบเลย โยน error ออกไป
    console.log("Successfully connected to the database ....") //ถ้าconnect สำเร็จก็จะขึ้น Successfully connected to database server....
})
module.exports = connection; //เป็นการเมื่อดราทำ connection เสร็จแล้ว แต่อยากจะเอาไปใช้ที่อื่นด้วย //เพื่อให้มองเห็นจากข้างนอกได้
const {Sequelize} = require("sequelize");//เป็นการเอาในส่วนของ mysql ในไฟล์ package.json นำมาใช้งาน //require คือเป็นการimport โดยเก็บไว้ในออฟเจ็คที่ชื่อว่า mysql
const dbConfig = require("../config/db.config")//เป็นการเอาในส่วนของไฟล์  db.config ในโฟเดอร์ config นำมาใช้งาน //require คือเป็นการimport โดยเก็บไว้ในออฟเจ็คที่ชื่อว่า dbConfig และ ../ คือเป็นการ move เข้าไปอีกหนึ่งสเต็ป ต้องออกจากโฟเดอร์ models ก่อน เป็นคำสั่งที่ใช้ในการออกจากโฟเดอร์ models พอใช้ ../ แล้วจะขึ้นโฟเดอร์หรือไฟล์ที่อยู่ข้างนอกโฟเดอร์ models เช่น config , node_modules , routes , package-lock.json , package.json , server.js ถ้าเป็นไฟล์ก็จะเสร็จเลยแต่ถ้าเป็นโฟเดอร์ก็จะต้องพิม / เพื่อเข้าไปเลือกไฟล์อีกเช่น ../config/db.config

//Create sequelize instance
//instance
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{ //สร้างตัวแปร connection 
    host:dbConfig.HOST, //:dbConfig. เป็นการส่งค่าพารามิเตอร์ให้เขา //ค่านี้เก็บเอาไว้ในไฟล์ db.config.js ไว้เรียบร้อย
    dialect:"mysql"
  })

//Test the database connection
  async function testConection(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }


  testConection();

  module.exports = sequelize;
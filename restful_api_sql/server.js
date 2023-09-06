const express = require("express");//เป็นการเอาในส่วนของ express ในไฟล์ package.json นำมาใช้งาน //require คือเป็นการimport โดยเก็บไว้ในออฟเจ็คที่ชื่อว่าexpress 
const cors = require("cors");//เป็นการเอาในส่วนของ cors ในไฟล์ package.json นำมาใช้งาน //require คือเป็นการimport โดยเก็บไว้ในออฟเจ็คที่ชื่อว่าcors
const sql = require("./models/db");
const PORT = 5000 //เป็นการประกาศตัวแปร PORT 
const restaurantRouter = require("./routes/restaurant.router") //เป็นการ import ในส่วนของ router นำมาใช้ //require คือเป็นการimport โดยเก็บไว้ในออฟเจ็คที่ชื่อว่าrestaurantRouter และ ./ คือ คือเป็นการ move เข้าไปอีกหนึ่งสเต็ป ต้องอยู่ในโฟเดอร์ตัวเองก็คือโฟเดอร์ routes ในไฟล์ restaurant.router //restaurantRouterเป็นตัวแปรที่อยู่ภายนอก
//1. Create app
const app = express()

//2. Setting middleware //MiddLeware เป็นซอฟต์แวร์ที่อยู่ระหว่างกลาง
app.use(cors())// ให้ใช้ตัว cors
app.use(express.json())// ให้ใช้ตัว express ให้แปลงเป็น json ให้หน่อย
app.use(express.urlencoded({extended:false}))// ให้ใช้ตัว express ให้แปลงเป็น urlencoded ให้หน่อย โดยที่ extended เป็น false ก็คือไม่ต้อง extended ต่อไปนะ //urlencoded คือมันเป็นการเข้ารหัส url ก็คือเวลาเราส่งมา เวลาเราข้ามNetwork มันจะมีการแนบ url มาด้วย แล้วมันจะสนใจแต่ตัวที่มันเข้ารหัส เพื่อป้องกันไม่ให้มีคนเข้ามาแทรกโค้ดอะไรบางอย่างที่มันไม่ควรrun

//3. Router //เป็นตัวจัดการกับ Router
app.get("/", (req, res)=>{ //req หรือ request คือ User ส่งคำขอไปยังเซิฟเวอร์    //res หรือ response คือ เซิฟเวอร์จะตอบสนองหรือส่งกลับไปหา User 
    res.send("<h1>This is a restaurant API</h1>") //เซิฟเวอร์ ส่งคำว่า Restaurant API Using MySQL ให้กับ User
})

//Use restaurant router
app.use("",restaurantRouter)  //เป็นการบอกว่าเธอๆ app เธออะ ให้ใช้ไฟล์ router ตรงนี้นะ ก็คือ restaurantRouter

//4. Running app
app.listen(PORT, ()=>{ //เป็นการบอกให้ app มันค่อนฟังเสมอว่ามีใครเรียกใช้งานที่หมายเลข port ต่อไปนี้หรือป่าว
    console.log("app listening at http://localhost:"+PORT+" ..."); //เป็นการบอกว่ามันrunอยู่ที่ http://localhost:5000 มาจากตัวแปรที่กำหนดไว้ตรงบรรทัดที่3 
})
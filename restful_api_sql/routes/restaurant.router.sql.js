const express = require("express"); //เป็นการเอาในส่วนของ express ในไฟล์ package.json นำมาใช้งาน //require คือเป็นการimport โดยเก็บไว้ในออฟเจ็คที่ชื่อว่าexpress
const router = express.Router(); //เป็นการสร้างตัว router //Routerเป็นออฟเจ็ค
const Restaurant = require("../models/restaurant.model.sql"); //เป็นการเอาในส่วนของไฟล์ restaurant.model ในโฟเดอร์ models นำมาใช้งาน //require คือเป็นการimport โดยเก็บไว้ในออฟเจ็คที่ชื่อว่า Restaurant และ ../ คือ คือเป็นการ move เข้าไปอีกหนึ่งสเต็ป ต้องออกจากโฟเดอร์ตัวเองแล้วไปอยู่โฟเดอร์หรือไฟล์อะไรก็ได้ที่ไม่ใช่โฟเดอร์หรือไฟล์ routes ก็คือโฟเดอร์ models ที่เลือกเอาไว้ //sqlเป็นตัวแปรที่อยู่ภายนอก

// Restaurant router
// Insert new restaurant to DB
// http://localhost:5000/restaurants
router.post("/restaurants", (req, res) => { // router.post("/restaurants", เป็นการสร้าง id , name , type , imageURL ใหม่จาก User
  //create Restaurant object
  const newRestaurant = new Restaurant({ // สร้างออฟเจ็กใหม่ชื่อ newRestaurants
    id: req.body.id, //User ส่งอะไรมาให้หาได้จาก req.body // เซิฟเวอร์จะตอบสนองหรือส่ง id กลับไปหา User 
    name: req.body.name, // เซิฟเวอร์จะตอบสนองหรือส่ง name กลับไปหา User 
    type: req.body.type, // เซิฟเวอร์จะตอบสนองหรือส่ง type กลับไปหา User 
    imageURL: req.body.imageURL, // เซิฟเวอร์จะตอบสนองหรือส่ง imageURL กลับไปหา User 
  });
  //Save to DB
  Restaurant.create(newRestaurant, (err, data) => { //เป็นการประกาศว่าออฟเจ็ค Restaurant จะ create หรือสร้าง คือต้องเป็นค่าต่อไปนี้นะ ต้องเป็นฟังก์ชั่นต่อไปนี้นะ //ซึ่งเวลาเราสร้าง Restaurant เราก็จะส่ง newRestaurant อันใหม่เข้าไป ก็คือข้อมูลของร้านค้าตัวใหม่เราต้องใส่เข้าไป //แล้วก็ส่งตัว err, data ที่จะเก็บผลลัพท์ที่มันจะ return กลับมา //เป็นการบอกว่า create เป็นฟังค์ชั่นต่อไปนี้นะ //ผลลัพท์จะเก็บไว้ในตัวแปร err, data
    if (err) { //เป็นการเช็คว่ามี error ไหม
      res.status(500).send({ //เป็น 500 เพราะ error เกิดจาก2แบล็คเอน 
        message: err.message || "Some error occured", //เป็นการบอก message คืออะไร ว่าถ้ามี error ของ message ที่ได้จากระบบ หรือถ้าไม่มีจากระบบเราก็มากำหนดเองเป็น "Some error occured"
      });
    } else {
      res.send(data); //ถ้าไม่มี error ก็จะ save ข้อมูลไปเลย แบบเงียบๆ ไม่มีแจ้งเตือนว่า save แล้ว
    }
  });
});

// Get All restaurant
// http://localhost:5000/restaurants
router.get("/restaurants", (req, res) => { //"/restaurants" เป็นการใส่ /restaurants หลัง http://localhost:5000 จนกลายเป็น http://localhost:5000/restaurants เพื่อหาข้อมูลจากลิงค์
  Restaurant.getAll((err, data) => { //เป็นการประกาศว่าออฟเจ็ค Restaurant จะ getAll หรือโชว์ผลลัพท์ทั้งหมด คือต้องเป็นค่าต่อไปนี้นะ ต้องเป็นฟังก์ชั่นต่อไปนี้นะ //ซึ่งเวลาเราสร้าง Restaurant เราก็จะส่ง newRestaurant อันใหม่เข้าไป ก็คือข้อมูลของร้านค้าตัวใหม่เราต้องใส่เข้าไป //แล้วก็ส่งตัว err, data ที่จะเก็บผลลัพท์ที่มันจะ return กลับมา //เป็นการบอกว่า getAll เป็นฟังค์ชั่นต่อไปนี้นะ //ผลลัพท์จะเก็บไว้ในตัวแปร err, data
   if (err) { //เป็นการเช็คว่ามี error ไหม
     res.status(500).send({ //เป็น 500 เพราะ error เกิดจาก2แบล็คเอน 
       message: err.message || "Some error occured", //เป็นการบอก message คืออะไร ว่าถ้ามี error ของ message ที่ได้จากระบบ หรือถ้าไม่มีจากระบบเราก็มากำหนดเองเป็น "Some error occured"
     });
   } else {
     res.send(data); //ถ้าไม่มี error ก็จะ save ข้อมูลไปเลย แบบเงียบๆ ไม่มีแจ้งเตือนว่า save แล้ว
   }
  });
});

// Get Restaurant by ID
// http://localhost:5000/restaurants/1
router.get("/restaurants/:id", (req,res) =>{ //"/restaurants/:id" ก็คือเมื่อใส่ id หลัง http://localhost:5000/restaurants/ ก็จะขึ้นข้อมูลแค่ id นั้น เช่น http://localhost:5000/restaurants/1 ก็จะขึ้นแค่ข้อมูลจาก Id 1
  const restaurantId = Number.parseInt(req.params.id); // กำหนดให้ตัวแปร restaurantId ให้เป็นจำนวนเต็ม //มันจะอยู่ใน req.params.id
  Restaurant.getById(restaurantId, (err, data)=>{ //เป็นการประกาศว่าออฟเจ็ค Restaurant จะ getById หรือค้นหาผลลัพท์จาก ID คือต้องเป็นค่าต่อไปนี้นะ ต้องเป็นฟังก์ชั่นต่อไปนี้นะ //ซึ่งเวลาเราสร้าง Restaurant เราก็จะส่ง restaurantId อันใหม่เข้าไป ก็คือข้อมูลของร้านค้าตัวใหม่เราต้องใส่เข้าไป //แล้วก็ส่งตัว err, data ที่จะเก็บผลลัพท์ที่มันจะ return กลับมา //เป็นการบอกว่า getById เป็นฟังค์ชั่นต่อไปนี้นะ //ผลลัพท์จะเก็บไว้ในตัวแปร err, data
    if(err){ //เป็นการเช็คว่ามี error ไหม
      if(err.kind === "not_found"){ //kind คือประเภท //ถ้าประเภท error ก็คือแสดงว่าเราหา id นี้ไม่เจอ
        res.status(400).send({ //เป็นการ send บอกเขาหน่อยนึง //(400) คือเป็น error ที่เกิดจากฝั่งของclient
          message:`Restaurant id: ${restaurantId} is not found` //ว่า Restaurant id: .... is not found
        })
      }
      else{
         res.status(500).send({ //เป็น 500 เพราะ error เกิดจาก2แบล็คเอน 
           message: `Error while retrieving Restaurant id: ${restaurantId}`,
         });
      }
    }
    else{
      res.send(data) //ถ้าไม่มี error ก็จะ save ข้อมูลไปเลย แบบเงียบๆ ไม่มีแจ้งเตือนว่า save แล้ว
    }
  })
})

//Update Restaurant Data
router.put("/restaurants/:id", (req, res) => { // router.put("/restaurants/:id", เป็นการแปลงจาก id , name , type , imageURL ให้กลายเป็นอันใหม่จาก User
  const restaurantId = Number.parseInt(req.params.id); // กำหนดให้ตัวแปร restaurantId ให้เป็นจำนวนเต็ม //มันจะอยู่ใน req.params.id
  // Check Empty Body
  if(req.body.constructor == Object && Object.keys(req.body).length === 0){ //คือเขาได้ส่งออฟเจ็คอะไรมาให้เราหรือป่าว เขาส่ง Object และ Objectนั้น .keys มี req.body //.length === 0 คือถ้าเขาส่งข้อมูลเปล่าๆมา ก็จะไม่ให้อพัเดท
    res.status(400).send({message:"Content can not be empty !"}) //เป็นการ send บอกเขาหน่อยนึง //ว่า Content can not be empty ! //(400) คือเป็น error ที่เกิดจากฝั่งของclient
  }

  Restaurant.updateById(restaurantId,new Restaurant(req.body), (err,data)=>{
    if (err) { //เป็นการเช็คว่ามี error ไหม
      if (err.kind === "not_found") { //kind คือประเภท //ถ้าประเภท error ก็คือแสดงว่าเราหา id นี้ไม่เจอ
        res.status(400).send({ //เป็นการ send บอกเขาหน่อยนึง //(400) คือเป็น error ที่เกิดจากฝั่งของclient
          message: `Restaurant id: ${restaurantId} is not found`, //ว่า Restaurant id: .... is not found
        });
      } else {
        res.status(500).send({ //เป็น 500 เพราะ error เกิดจาก2แบล็คเอน 
          message: `Error while updating Restaurant id: ${restaurantId}`, 
        });
      }
    } else {
      res.send(data); //ถ้าไม่มี error ก็จะ save ข้อมูลไปเลย แบบเงียบๆ ไม่มีแจ้งเตือนว่า save แล้ว
    }
  })
});


//Delete Restaurant
router.delete("/restaurants/:id", (req, res) => { // router.delete("/restaurants/:id", เป็นการลบ id , name , type , imageURL ออกไปในเซิฟเวอร์จาก User
  const restaurantId = Number.parseInt(req.params.id); // กำหนดให้ตัวแปร restaurantId ให้เป็นจำนวนเต็ม //มันจะอยู่ใน req.params.id
  Restaurant.deleteById(restaurantId, (err,data)=>{ //เป็นการประกาศว่าออฟเจ็ค Restaurant จะ deleteById หรือค้นหาผลลัพท์จาก ID คือต้องเป็นค่าต่อไปนี้นะ ต้องเป็นฟังก์ชั่นต่อไปนี้นะ //ซึ่งเวลาเราสร้าง Restaurant เราก็จะส่ง restaurantId อันใหม่เข้าไป ก็คือข้อมูลของร้านค้าตัวใหม่เราต้องใส่เข้าไป //แล้วก็ส่งตัว err, data ที่จะเก็บผลลัพท์ที่มันจะ return กลับมา //เป็นการบอกว่า deleteById เป็นฟังค์ชั่นต่อไปนี้นะ //ผลลัพท์จะเก็บไว้ในตัวแปร err, data
     if (err) { //เป็นการเช็คว่ามี error ไหม
       if (err.kind === "not_found") { //kind คือประเภท //ถ้าประเภท error ก็คือแสดงว่าเราหา id นี้ไม่เจอ
         res.status(400).send({ //เป็นการ send บอกเขาหน่อยนึง //(400) คือเป็น error ที่เกิดจากฝั่งของclient
           message: `Restaurant id: ${restaurantId} is not found`, //ว่า Restaurant id: .... is not found
         });
       } else {
         res.status(500).send({ //เป็น 500 เพราะ error เกิดจาก2แบล็คเอน 
           message: `Error while deleting Restaurant id: ${restaurantId}`,
         });
       }
     } else {
       res.send({message:"Restaurant id:"+restaurantId+" is deleted"}); //ถ้าไม่มี error ก็จะขึ้นว่า Restaurant id: ..... is deleted
     }
  })

});
module.exports = router; //เป็นการเมื่อดราทำ router เสร็จแล้ว แต่อยากจะเอาไปใช้ที่อื่นด้วย //เพื่อให้มองเห็นจากข้างนอกได้




//เป็นตัวที่ไว้ใช้จัดการกับ router
//เป็นการสร้างไฟล์ router ที่เอาไว้ใช้จัดการตาราง restaurants
//router คือผู้จัดหาเส้นทาง
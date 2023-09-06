# restful_api_sql ในโฟลเดอร์ routes



## ไฟล์ restaurant.router.js

1. `const express = require("express");`: นำเข้าโมดูล Express ที่จำเป็นในการสร้างเซิร์ฟเวอร์
2. `const router = express.Router();`: สร้างตัวแปร router โดยใช้ Express Router ทำให้สามารถจัดการ route ได้
3. `const Restaurant = require("../controllers/restaurant.controllers");`: นำเข้าตัวควบคุมร้านอาหารจากไดเรกทอรี controllers
4. `router.post("/restaurants",async (req,res)=>{ ... });`: กำหนด route POST ไปยัง `/restaurants` และรับ request และ response จากไคลเอนต์
   - ในส่วนของ function:
     1. `const newRestaurant = req.body;`: รับข้อมูลร้านอาหารจาก request body
     2. `const createRestaurant = await Restaurant.createRestaurant(newRestaurant);`: เรียก function `createRestaurant` และส่งข้อมูลร้านอาหารให้มันประมวลผล
     3. `res.status(201).json(createRestaurant);`: ส่ง response กลับไปยังไคลเอนต์ด้วยสถานะ 201 และข้อมูลร้านอาหารที่สร้าง
     4. `catch (err) { res.status(500).json({err:"Fail to create restaurant"}); }`: จัดการข้อผิดพลาดที่อาจเกิดขึ้นในกรณีที่มีปัญหาในการสร้างร้านอาหาร



### ดึงข้อมูลร้านอาหารทั้งหมด
5. `router.get("/restaurants", async(req, res)=>{ ... });`: กำหนด route GET ไปยัง `/restaurants`
   - `const restaurants = await Restaurant.getAll();`: เรียก function `getAll` จากตัวควบคุมร้านอาหารเพื่อดึงข้อมูลทั้งหมด
   - `res.status(200).json(restaurants);`: ส่ง response กลับไปยังไคลเอนต์ด้วยสถานะ 200 และข้อมูลร้านอาหารทั้งหมด
   - `catch (error) { res.status(500).json({err:"Fail to create restaurant"}); }`: จัดการข้อผิดพลาดที่อาจเกิดขึ้น

### ดึงข้อมูลร้านอาหารโดยระบุ ID
6. `router.get("/restaurants/:id", async(req, res)=>{ ... });`: กำหนด route GET ไปยัง `/restaurants/:id` โดยมีพารามิเตอร์ `id`
   - `const restaurantId = req.params.id;`: รับค่า ID ของร้านอาหารจากพารามิเตอร์ใน URL
   - `const restaurant = await Restaurant.getById(restaurantId);`: เรียก function `getById` และส่ง ID ของร้านอาหารให้มันประมวลผล
   - `res.status(200).json(restaurant);`: ส่ง response กลับไปยังไคลเอนต์ด้วยสถานะ 200 และข้อมูลร้านอาหาร
   - `catch (error) { res.status(500).json({err:"Fail to create restaurant by Id"}); }`: จัดการข้อผิดพลาดที่อาจเกิดขึ้น



### อัปเดตข้อมูลร้านอาหาร
7. `router.put("/restaurants/:id", async(req, res)=>{ ... });`: กำหนด route PUT ไปยัง `/restaurants/:id` สำหรับอัปเดตร้านอาหาร
   - `const restaurantId = req.params.id;`: รับค่า ID ของร้านอาหารจากพารามิเตอร์ใน URL
   - `const restaurantData = req.body;`: รับข้อมูลร้านอาหารที่จะอัปเดตจาก request body
   - `const restaurant = await Restaurant.updateById(restaurantId, restaurantData);`: เรียก function `updateById` สำหรับอัปเดตร้านอาหาร
   - `res.status(200).json(restaurant);`: ส่ง response กลับไปยังไคลเอนต์ด้วยสถานะ 200 และข้อมูลร้านอาหารที่อัปเดต
   - `catch (error) { ... }`: จัดการข้อผิดพลาดที่อาจเกิดขึ้น รวมถึงกรณีที่ไม่พบร้านอาหาร

### ลบร้านอาหาร
8. `router.delete("/restaurants/:id", async(req, res)=>{ ... });`: กำหนด route DELETE ไปยัง `/restaurants/:id` สำหรับลบร้านอาหาร
   - `const restaurantId = req.params.id;`: รับค่า ID ของร้านอาหารจากพารามิเตอร์ใน URL
   - `const restaurant = await Restaurant.removeById(restaurantId);`: เรียก function `removeById` สำหรับลบร้านอาหาร
   - `if (restaurant) { ... }`: ส่ง response กลับไปยังไคลเอนต์ด้วยข้อความและสถานะที่เหมาะสม
   - `catch (error) { ... }`: จัดการข้อผิดพลาดที่อาจเกิดขึ้น รวมถึงกรณีที่ไม่พบร้านอาหาร

9. `module.exports = router;`: ส่งตัวแปร router ออกไป เพื่อให้สามารถนำไปใช้ในไฟล์อื่นได้





## ไฟล์ restaurant.router.sql.js


### การสร้าง API Endpoint สำหรับเพิ่มร้านอาหาร

### การติดตั้งและสร้าง Router
1. `const express = require("express");`: นำเข้าโมดูล Express จาก package.json
2. `const router = express.Router();`: สร้างตัวแปร router จาก Express Router
3. `const Restaurant = require("../models/restaurant.model.sql");`: นำเข้าโมดูล Restaurant จากไฟล์ restaurant.model ในโฟลเดอร์ models

### การเพิ่มร้านอาหาร
4. `router.post("/restaurants", (req, res) => { ... });`: กำหนด route POST ไปยัง `/restaurants`
   - สร้างออบเจ็กต์ `newRestaurant` จากข้อมูลที่ได้รับจากไคลเอนต์
   - ใช้เมท็อด `Restaurant.create(newRestaurant, (err, data) => { ... });` เพื่อบันทึกข้อมูลลงฐานข้อมูล
   - ตรวจสอบข้อผิดพลาด และส่ง response กลับไปยังไคลเอนต์

### อธิบายเพิ่มเติม
- การนำเข้า Express และสร้าง router เป็นขั้นตอนเบื้องต้นในการสร้างเซิร์ฟเวอร์
- การนำเข้าโมดูล Restaurant เชื่อมต่อกับโมเดลในฐานข้อมูล
- ในส่วนของ `router.post`, การสร้างร้านอาหารใหม่จะเริ่มจากการรับข้อมูลจากไคลเอนต์ แล้วบันทึกลงในฐานข้อมูลผ่านเมท็อด `create`
- หากมีข้อผิดพลาด จะส่งข้อความผิดพลาดกลับไปยังไคลเอนต์ หากสำเร็จ จะส่งข้อมูลที่บันทึกกลับไป


### การสร้าง API Endpoint สำหรับดึงข้อมูลร้านอาหารทั้งหมด

5. `router.get("/restaurants", (req, res) => { ... });`: กำหนด route GET ไปยัง `/restaurants`
   - สร้าง request ไปยัง URL `http://localhost:5000/restaurants` สำหรับดึงข้อมูลร้านอาหารทั้งหมด
6. `Restaurant.getAll((err, data) => { ... });`: เรียกใช้เมท็อด `getAll` จากโมดูล Restaurant เพื่อดึงข้อมูลทั้งหมดจากฐานข้อมูล
   - ถ้ามีข้อผิดพลาด (error) จะส่งข้อความผิดพลาดกลับไปยังไคลเอนต์
   - ถ้าสำเร็จ จะส่งข้อมูลทั้งหมดกลับไปยังไคลเอนต์

### อธิบายเพิ่มเติม
- โค้ดนี้เป็นการกำหนด API endpoint ที่จะรอรับการร้องขอเข้ามาเป็นประเภท GET ที่ URL /restaurants เพื่อดึงข้อมูลร้านอาหารทั้งหมด
- เมื่อมีการร้องขอเข้ามา โค้ดจะเรียกเมท็อด getAll จากโมดูล Restaurant ซึ่งสามารถดึงข้อมูลร้านอาหารทั้งหมดจากฐานข้อมูลได้
- หากมีข้อผิดพลาดในการดึงข้อมูล โค้ดจะส่ง response กลับไปยังไคลเอนต์ด้วยสถานะ 500 และข้อความแจ้งเตือนข้อผิดพลาด
- หากดึงข้อมูลสำเร็จ โค้ดจะส่งข้อมูลทั้งหมดกลับไปยังไคลเอนต์



### การสร้าง API Endpoint สำหรับดึงข้อมูลร้านอาหารตาม ID

1. `router.get("/restaurants/:id", (req, res) => { ... });`: กำหนด route GET ไปยัง `/restaurants/:id`
   - เมื่อใส่ ID หลัง URL, เช่น `http://localhost:5000/restaurants/1`, จะดึงข้อมูลร้านอาหาร ID 1
2. `const restaurantId = Number.parseInt(req.params.id);`: แปลง ID ที่รับมาเป็นจำนวนเต็ม
3. `Restaurant.getById(restaurantId, (err, data) => { ... });`: เรียกใช้เมท็อด `getById` จากโมดูล Restaurant เพื่อดึงข้อมูลร้านอาหารด้วย ID
   - ถ้าไม่พบ ID, ส่งข้อความว่า "Restaurant id: ... is not found" พร้อมสถานะ 400
   - ถ้ามีข้อผิดพลาดอื่น, ส่งข้อความผิดพลาดกลับพร้อมสถานะ 500
   - ถ้าสำเร็จ, ส่งข้อมูลร้านอาหารกลับไปยังไคลเอนต์


### อธิบายเพิ่มเติม
- โค้ดนี้เป็นการกำหนด API endpoint ที่จะรอรับการร้องขอเข้ามาเป็นประเภท GET ที่ URL /restaurants/:id เพื่อดึงข้อมูลร้านอาหารตาม ID ที่ระบุ
- การรับ ID จากไคลเอนต์แล้วแปลงเป็นจำนวนเต็มเพื่อใช้ในการค้นหาในฐานข้อมูล
- การเรียกใช้เมท็อด getById จากโมดูล Restaurant สำหรับดึงข้อมูลร้านอาหารด้วย ID และตรวจสอบข้อผิดพลาด
- หากไม่พบ ID, ส่งข้อความแจ้งเตือนพร้อมสถานะ 400
- หากมีข้อผิดพลาดอื่นๆ, ส่งข้อความแจ้งเตือนพร้อมสถานะ 500
- หากดึงข้อมูลสำเร็จ, ส่งข้อมูลกลับไปยังไคลเอนต์




### การอัพเดทข้อมูลร้านอาหาร

โค้ดนี้จะอธิบายการทำงานของ API endpoint สำหรับการอัพเดทข้อมูลร้านอาหาร

### URL และ Method

- **URL**: `/restaurants/:id`
- **Method**: `PUT`

### ลักษณะการทำงาน

1. **รับ ID จาก URL**: ระบบจะรับ `id` ที่ส่งมาจาก URL และแปลงเป็นจำนวนเต็ม
2. **ตรวจสอบ Body**: ถ้า Body ที่ส่งมาว่างเปล่า ระบบจะส่งข้อความแจ้งเตือนว่า "Content can not be empty !" พร้อมสถานะ 400
3. **การอัพเดทข้อมูล**: 
   - ใช้เมท็อด `updateById` จากโมดูล Restaurant สำหรับอัพเดทข้อมูลด้วย `id` และ Object ที่สร้างจาก `req.body`
   - ถ้าไม่พบ `id`, ส่งข้อความแจ้งเตือนพร้อมสถานะ 400
   - ถ้ามีข้อผิดพลาดอื่นๆ, ส่งข้อความแจ้งเตือนพร้อมสถานะ 500
   - หากอัพเดทสำเร็จ, ส่งข้อมูลกลับไปยังไคลเอนต์

### ตัวอย่าง URL

- `http://localhost:5000/restaurants/1`: อัพเดทข้อมูลร้านอาหารที่มี ID เป็น 1


#### โค้ดนี้เป็นการกำหนด API endpoint สำหรับการอัพเดทข้อมูลร้านอาหารโดยใช้ URL ในรูปแบบ /restaurants/:id และ HTTP method เป็น PUT โดยการทำงานมีดังนี้:

1. ระบบจะรับ ID ของร้านอาหารจาก URL และแปลงเป็นจำนวนเต็ม
2. ตรวจสอบว่าข้อมูลที่ส่งมาว่างเปล่าหรือไม่ หากว่างจะส่งข้อความแจ้งเตือนกลับไป
3. ถ้าข้อมูลถูกต้อง จะเรียกใช้เมท็อด updateById ของออบเจกต์ Restaurant เพื่ออัพเดทข้อมูล
4. ถ้าพบข้อผิดพลาดจะส่งข้อความแจ้งเตือนและสถานะทาง HTTP ตามสถานะข้อผิดพลาด
5. หากอัพเดทสำเร็จ จะส่งข้อมูลอัพเดทกลับไปที่ไคลเอนต์

โค้ดนี้ช่วยในการจัดการข้อมูลร้านอาหารในระบบ และให้ข้อความแจ้งเตือนที่ชัดเจนเมื่อมีข้อผิดพลาดเกิดขึ้น


### ลบข้อมูลร้านอาหาร

โค้ดนี้แสดงถึง API endpoint สำหรับลบข้อมูลร้านอาหารโดยใช้ ID

### คำอธิบาย

#### การกำหนดเส้นทาง
`router.delete("/restaurants/:id", (req, res) => { ... });`
- กำหนดเส้นทางสำหรับลบข้อมูลร้านอาหารโดยใช้ ID
- `:id` ใน URL เป็นตัวแทนของ ID ของร้านอาหาร

#### การดึง ID จากคำขอ
`const restaurantId = Number.parseInt(req.params.id);`
- ดึง ID ของร้านอาหารจาก URL
- แปลง ID เป็นจำนวนเต็ม

#### การลบข้อมูลร้านอาหารโดยใช้ ID
`Restaurant.deleteById(restaurantId, (err, data) => { ... });`
- เรียกใช้เมธอด `deleteById` ของออบเจ็กต์ `Restaurant`
- ส่ง ID ของร้านอาหารเป็นพารามิเตอร์
- จัดการผลลัพธ์ในฟังก์ชันตอบกลับ `(err, data)`

#### การจัดการข้อผิดพลาด
- `if (err) { ... }`: ตรวจสอบข้อผิดพลาด
- `if (err.kind === "not_found") { ... }`: ตรวจสอบประเภท "not_found", ส่งรหัสสถานะ 400
- `else { ... }`: ส่งรหัสสถานะ 500 สำหรับข้อผิดพลาดอื่นๆ

#### การตอบสนองสำเร็จ
`res.send({message:"Restaurant id:"+restaurantId+" is deleted"});`
- ส่งข้อความแสดงว่าร้านอาหารถูกลบเรียบร้อยแล้ว

#### การส่งออก Router
`module.exports = router;`
- ส่งออก router เพื่อใช้ในส่วนอื่นๆ ของแอพพลิเคชัน
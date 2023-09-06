# restful_api_sql ในโฟลเดอร์ controllers


## ไฟล์ restaurant.controllers.js

ไฟล์นี้เป็นส่วนหนึ่งของระบบจัดการร้านอาหาร ซึ่งประกอบด้วย function ที่ใช้ในการสร้างและจัดการข้อมูลร้านอาหาร

### รายละเอียดโค้ด

#### การนำเข้าโมดูลร้านอาหาร (Restaurant model)

```javascript
const Restaurant = require("../models/restaurant.model")
```

บรรทัดนี้นำเข้าโมดูลที่เกี่ยวข้องกับร้านอาหาร โมดูลนี้สามารถใช้ในการจัดการข้อมูลร้านอาหารได้

#### การสร้างร้านอาหาร (Create Restaurant)

```javascript
Restaurant.createRestaurant = async(newRestaurant) => {
    try {
        const createRestaurant = await Restaurant.create(newRestaurant);
        console.log("created restaurant:", createRestaurant.toJSON());
        return createRestaurant.toJSON();
    } catch (err) {
        console.log("err", err);
        throw err;
    }
}
```

ฟังก์ชันนี้ใช้สำหรับการสร้างร้านอาหารโดยรับข้อมูลร้านอาหารเข้ามา แล้วจัดเก็บลงฐานข้อมูล หากเกิดข้อผิดพลาดจะได้รับการจัดการโดยบล็อก `catch`

#### การดึงข้อมูลร้านอาหารทั้งหมด (Get All Restaurants)

```javascript
Restaurant.getAll = async () => {
    try {
        const restaurants = await Restaurant.findAll();
        return restaurants.map(restaurant => restaurant.toJSON());
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
}
```

ฟังก์ชันนี้ใช้สำหรับการดึงข้อมูลร้านอาหารทั้งหมดจากฐานข้อมูล และส่งกลับเป็นรูปแบบ JSON

#### การดึงข้อมูลร้านอาหารตามไอดี (Get Restaurant By ID)

```javascript
Restaurant.getById = async (restaurantId) => {
    try {
        const restaurant = await Restaurant.findByPk(restaurantId);
        if(restaurant){
            return restaurant.toJSON();
        }
        else{
            throw {kind: "not_found"};
        }
    } catch (err) {
        ...
    }
}
```

ฟังก์ชันนี้ใช้สำหรับการดึงข้อมูลร้านอาหารตามไอดี หากไม่พบร้านอาหารด้วยไอดีนั้น จะส่งกลับข้อผิดพลาด `not_found`

#### การดึงข้อมูลร้านอาหารทั้งหมด (Get All Restaurants)

```javascript
Restaurant.getAll = async () => {
    try {
        const restaurants = await Restaurant.findAll();
        return restaurants.map(restaurant => restaurant.toJSON());
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
}
```

- `Restaurant.getAll`: กำหนดฟังก์ชัน getAll ในอ็อบเจกต์ Restaurant
- `async ()`: ประกาศฟังก์ชันแบบ asynchronous ที่ไม่รับพารามิเตอร์ใดๆ
- `try`: ใช้งานบล็อก try-catch สำหรับการจัดการข้อผิดพลาด
- `const restaurants = await Restaurant.findAll()`: ดึงข้อมูลร้านอาหารทั้งหมดและจัดเก็บไว้ในตัวแปร `restaurants`
- `return restaurants.map(restaurant => restaurant.toJSON())`: แปลงข้อมูลร้านอาหารเป็นรูปแบบ JSON และส่งกลับ
- `catch (error)`: จัดการข้อผิดพลาดและพิมพ์ลงคอนโซล และส่งต่อข้อผิดพลาด

#### การดึงข้อมูลร้านอาหารตามไอดี (Get Restaurant By ID)

```javascript
Restaurant.getById = async (restaurantId) => {
    try {
        const restaurant = await Restaurant.findByPk(restaurantId);
        if(restaurant){
            return restaurant.toJSON();
        }
        else{
            throw {kind: "not_found"};
        }
    } catch (err) {
        ...
    }
}
```

- `Restaurant.getById`: กำหนดฟังก์ชัน getById ในอ็อบเจกต์ Restaurant
- `async (restaurantId)`: ประกาศฟังก์ชันแบบ asynchronous ที่รับพารามิเตอร์ `restaurantId`
- `try`: ใช้งานบล็อก try-catch สำหรับการจัดการข้อผิดพลาด
- `const restaurant = await Restaurant.findByPk(restaurantId)`: ดึงข้อมูลร้านอาหารด้วยไอดีที่กำหนดและจัดเก็บไว้ในตัวแปร `restaurant`
- `if(restaurant)`: ตรวจสอบว่าพบข้อมูลร้านอาหารหรือไม่
- `return restaurant.toJSON()`: ถ้าพบ ส่งกลับข้อมูลร้านอาหารในรูปแบบ JSON
- `else`: ถ้าไม่พบ ส่งกลับข้อผิดพลาด `not_found`
- `catch (err)`: จัดการข้อผิดพลาด

# restful_api_sql ในโฟลเดอร์ models



## ไฟล์ db.js

### การนำเข้าโมดูล Sequelize และ db.config

```javascript
const {Sequelize} = require("sequelize");
const dbConfig = require("../config/db.config");
```

- `const {Sequelize} = require("sequelize")`: นำเข้าคลาส Sequelize จากโมดูล sequelize
- `const dbConfig = require("../config/db.config")`: นำเข้าการตั้งค่าฐานข้อมูลจากไฟล์ db.config.js ที่อยู่ในโฟลเดอร์ config

### การสร้าง Instance ของ Sequelize

```javascript
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: "mysql"
});
```

- `const sequelize`: ประกาศตัวแปร sequelize เพื่อจัดเก็บ instance ของ Sequelize
- `new Sequelize(...)`: สร้าง instance ของ Sequelize ด้วย constructor
- `dbConfig.DB`: ชื่อฐานข้อมูล
- `dbConfig.USER`: ชื่อผู้ใช้ฐานข้อมูล
- `dbConfig.PASSWORD`: รหัสผ่านของฐานข้อมูล
- `host: dbConfig.HOST`: ที่อยู่ IP หรือ hostname ของเซิร์ฟเวอร์ฐานข้อมูล
- `dialect: "mysql"`: ระบุว่าใช้ dialect ของฐานข้อมูลประเภทอะไร (ในที่นี้เป็น MySQL)

### ทำการเชื่อมต่อฐานข้อมูล

```javascript
sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch(error => {
        console.error("Unable to connect to the database:", error);
    });
```

- `sequelize.authenticate()`: ทำการเชื่อมต่อกับฐานข้อมูล
- `.then(...)`: ถ้าเชื่อมต่อสำเร็จ แสดงข้อความ "Connection has been established successfully."
- `.catch(error => ...)`: ถ้าเชื่อมต่อไม่สำเร็จ แสดงข้อความ "Unable to connect to the database:" พร้อมรายละเอียดข้อผิดพลาด





## ไฟล์ db.sql.js

### การนำเข้าโมดูล mysql และไฟล์ db.config

```javascript
const mysql = require("mysql");
const dbConfig = require("../config/db.config");
```

- `const mysql = require("mysql")`: นำเข้าโมดูล `mysql` สำหรับการจัดการฐานข้อมูล MySQL
- `const dbConfig = require("../config/db.config")`: นำเข้าไฟล์ `db.config` ซึ่งเก็บการตั้งค่าฐานข้อมูล

### การสร้างการเชื่อมต่อฐานข้อมูล

```javascript
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});
```

- `const connection`: ประกาศตัวแปร `connection` เพื่อจัดเก็บการเชื่อมต่อฐานข้อมูล
- สร้างการเชื่อมต่อโดยใช้การตั้งค่าที่ระบุ

### การเปิดการเชื่อมต่อ

```javascript
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});
```

- `connection.connect(...)`: เปิดการเชื่อมต่อฐานข้อมูล
- `if (error) throw error`: หากมีข้อผิดพลาด จะโยนข้อผิดพลาดนั้นออกมา
- `console.log(...)`แสดงข้อความว่า "Successfully connected to the database." ถ้าเชื่อมต่อสำเร็จ







## ไฟล์ restaurant.model.js

### การนำเข้าโมดูล DataTypes และไฟล์ db

```javascript
const { DataTypes } = require("sequelize");
const sequelize = require("./db");
```

- `const { DataTypes } = require("sequelize")`: นำเข้าคลาส DataTypes จากโมดูล sequelize เพื่อกำหนดประเภทข้อมูลในโมเดล
- `const sequelize = require("./db")`: นำเข้า instance ของ sequelize จากไฟล์ db เพื่อจัดการการเชื่อมต่อฐานข้อมูล

### การกำหนดโครงสร้างโมเดล "restaurant"

```javascript
const Restaurant = sequelize.define("restaurant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
  },
  imageURL: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
});
```

- `const Restaurant`: ประกาศตัวแปร Restaurant เพื่อจัดเก็บโมเดล
- `sequelize.define("restaurant", {...})`: กำหนดโครงสร้างของโมเดล "restaurant" โดยมีฟิลด์ต่าง ๆ ดังนี้:
  - `id`: กำหนดให้เป็น primary key และมีค่าเพิ่มขึ้นอัตโนมัติ
  - `name`: กำหนดประเภทเป็นสตริง และไม่สามารถเป็นค่าว่างได้
  - `type`, `imageURL`: กำหนดประเภทเป็นสตริง
  - `createdAt`, `updatedAt`: กำหนดประเภทเป็นวันที่ และมีค่าเริ่มต้นเป็นเวลาปัจจุบัน

### การส่งออกโมเดล "restaurant"

```javascript
module.exports = Restaurant;
```

- ทำการส่งออกโมเดล "restaurant" เพื่อให้สามารถนำไปใช้งานในไฟล์อื่นได้





## ไฟล์ restaurant.model.sql.js

### ส่วนของการนำเข้า (Importing)

```javascript
const sql = require("./db.sql"); // เป็นการเอาในส่วนของไฟล์ db ในโฟเดอร์ models นำมาใช้งาน
// require คือเป็นการ import โดยเก็บไว้ในออฟเจ็คที่ชื่อว่า sql และ ./ คือเป็นการ move เข้าไปอีกหนึ่งสเต็ป ต้องอยู่ในโฟเดอร์ตัวเองก็คือโฟเดอร์ models
// sql เป็นตัวแปรที่อยู่ภายนอก
```

ส่วนนี้เป็นการนำเข้าโมดูล db.sql จากโฟลเดอร์เดียวกันเพื่อใช้งานในไฟล์นี้ โดยเก็บเป็นตัวแปรชื่อ sql เพื่อใช้สำหรับการดำเนินการทางฐานข้อมูลต่อไป

### ส่วนของการสร้างคอนสตรักเตอร์ (Constructor)

```javascript
const Restaurant = function (restaurant) {
  // Attributes
  this.id = restaurant.id;
  this.name = restaurant.name;
  this.type = restaurant.type;
  this.imageURL = restaurant.imageURL;
};
```

โค้ดส่วนนี้สร้างคอนสตรักเตอร์สำหรับคลาส Restaurant โดยมีแอตทริบิวต์ id, name, type, และ imageURL โค้ดนี้เป็นการกำหนดโครงสร้างของข้อมูลร้านอาหารที่จะใช้ในโปรแกรม

### ส่วนของการสร้างเมธอดสำหรับการแทรกข้อมูลร้านอาหาร

```javascript
// Method
// Insert new restaurant
Restaurant.create = (newRestaurant, result) => {
  // INSERT INTO restaurant (id, name, type, imageURL) VALUES ("1", "KFC", "Fastfood", "url")
  sql.query("INSERT INTO restaurants SET ?", newRestaurant, (err, res) => {
    // ...
  });
};
```

รายละเอียดเมธอด create

- `Restaurant.create`: เป็นเมธอดที่สร้างขึ้นในคลาส Restaurant สำหรับการแทรกข้อมูลร้านอาหารใหม่เข้าสู่ฐานข้อมูล
- `newRestaurant`: พารามิเตอร์ที่รับข้อมูลร้านอาหารใหม่เข้ามา
- `result`: พารามิเตอร์ที่ใช้สำหรับเก็บผลลัพท์หลังจากการแทรกข้อมูล
- `sql.query`: เป็นการเรียกใช้เมธอด query จากตัวแปร sql (ที่เราได้ import มาจากไฟล์ db.sql) สำหรับการแทรกข้อมูลร้านอาหารใหม่ลงในตาราง restaurants
โดยโค้ดส่วนนี้จะสร้างคำสั่ง SQL สำหรับการแทรกข้อมูลร้านอาหารใหม่ และส่งข้อมูลเข้าไปยังฐานข้อมูลผ่าน connection ที่สร้างจาก sql

### ส่วนของการจัดการกับข้อผิดพลาดในเมธอด create

```javascript
if (err) {
  console.log("error", err);
  result(err, null);
  return;
}
console.log("New restaurant inserted:", { id: res.id, ...newRestaurant });
result(null, { id: res.id, ...newRestaurant });
```

- ถ้ามีข้อผิดพลาด (err) เกิดขึ้น โค้ดจะแสดงข้อความ "error" พร้อมรายละเอียดข้อผิดพลาด และส่งผลลัพธ์กลับด้วยข้อผิดพลาดนั้น
- หากไม่มีข้อผิดพลาด โค้ดจะแสดงข้อความ "New restaurant inserted:" พร้อมรายละเอียดของร้านอาหารที่ถูกแทรก

### ส่วนของการสร้างเมธอด getAll

```javascript
// Get All Restaurant
Restaurant.getAll = (result) => {
  // ...
};
```

- เมธอด getAll สร้างขึ้นในคลาส Restaurant เพื่อโชว์ผลลัพธ์ทั้งหมดจากตารางร้านอาหาร
- พารามิเตอร์ result ใช้สำหรับเก็บผลลัพธ์ที่จะส่งกลับ


### ส่วนของการจัดการกับข้อผิดพลาดในเมธอด getAll

```javascript
// SELECT * FROM restaurants
sql.query("SELECT * FROM restaurants", (err, res) => {
  if (err) {
    console.log("error", err);
    result(err, null);
    return;
  }
  result(null, res);
});
```

- เมธอดนี้ใช้คำสั่ง SQL SELECT * FROM restaurants เพื่อดึงข้อมูลทั้งหมดจากตาราง restaurants
- ถ้ามีข้อผิดพลาด (err) เกิดขึ้น โค้ดจะแสดงข้อความ "error" พร้อมรายละเอียดข้อผิดพลาด และส่งผลลัพธ์กลับด้วยข้อผิดพลาดนั้น
- หากไม่มีข้อผิดพลาด โค้ดจะส่งผลลัพธ์ (res) กลับ


### ส่วนของการสร้างเมธอด getById

- เมธอด getById สร้างขึ้นในคลาส Restaurant เพื่อค้นหาข้อมูลร้านอาหารจาก ID ที่ระบุ
- พารามิเตอร์ restaurantId ใช้รับ ID ของร้านอาหารที่ต้องการค้นหา
- พารามิเตอร์ result ใช้สำหรับเก็บผลลัพธ์ที่จะส่งกลับ


### ส่วนของการดำเนินการในเมธอด getById

```javascript
// SELECT * FROM restaurants WHERE id = restaurantId
sql.query(
  `SELECT * FROM restaurants WHERE id = ${restaurantId}`,
  (err, res) => {
    // fail
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    // Success
    if (res.length) {
      result(null, res[0]);
      return;
    }
    // fail
    result({ kind: "not_found" }, null);
  }
);
```

รายละเอียดการดำเนินการ
- เมธอดนี้ใช้คำสั่ง SQL SELECT * FROM restaurants WHERE id = restaurantId เพื่อค้นหาข้อมูลร้านอาหารจาก ID ที่ระบุ
- ถ้ามีข้อผิดพลาด (err) เกิดขึ้น โค้ดจะแสดงข้อความ "error" พร้อมรายละเอียดข้อผิดพลาด และส่งผลลัพธ์กลับด้วยข้อผิดพลาดนั้น
- หากค้นหาสำเร็จและพบข้อมูล (ตรวจสอบจาก res.length) โค้ดจะส่งผลลัพธ์แถวแรก (res[0]) กลับ
- หากไม่พบข้อมูล โค้ดจะส่งผลลัพธ์กลับด้วยข้อความว่า "not_found"
โค้ดส่วนนี้ทำการค้นหาข้อมูลร้านอาหารจาก ID และจัดการกับสถานการณ์ที่อาจเกิดขึ้น ทั้งสถานการณ์ที่สำเร็จและสถานการณ์ที่ล้มเหลว



### ส่วนของการดำเนินการในเมธอด updateById

```javascript
// Update By ID
Restaurant.updateById = (id, params, result) => {
  // UPDATE restaurants SET name = "name", type = "type", imageurl = "imageurl" WHERE id ="id"
  sql.query(
    "UPDATE restaurants SET name = ?, type = ?, imageurl = ? WHERE id = ?",
    [params.name, params.type, params.imageURL, id],
    // ...
  );
};
```

รายละเอียดการดำเนินการ
- เมธอดนี้ใช้คำสั่ง SQL UPDATE restaurants SET ... WHERE id = id เพื่ออัพเดทข้อมูลร้านอาหารตาม ID ที่ระบุ
- พารามิเตอร์ id ใช้รับ ID ของร้านอาหารที่ต้องการอัพเดท
- พารามิเตอร์ params ใช้รับข้อมูลที่ต้องการอัพเดท ซึ่งประกอบด้วย name, type, และ imageURL
- พารามิเตอร์ result ใช้สำหรับเก็บผลลัพธ์ที่จะส่งกลับ
โค้ดส่วนนี้ทำการอัพเดทข้อมูลร้านอาหารในฐานข้อมูลตาม ID ที่ระบุ และจัดการกับสถานการณ์ที่อาจเกิดขึ้น ทั้งสถานการณ์ที่สำเร็จและสถานการณ์ที่ล้มเหลว



### ส่วนของการดำเนินการในเมธอด updateById (ต่อ)

```javascript
(err, res) => {
  if (err) {
    console.log("err", err);
    result(err, null);
    return;
  }
  if (res.length == 0) {
    result({ kind: "not_found" }, null);
    return;
  }
  result(null, { id: id, ...params });
}
```

- จัดการกับข้อผิดพลาดและสถานการณ์ที่อาจเกิดขึ้นเมื่ออัพเดทข้อมูล
- ถ้ามีข้อผิดพลาด หรือไม่พบ ID ที่ระบุ จะส่งผลลัพธ์กลับด้วยข้อความ "err" หรือ "not_found"
- ถ้าสำเร็จ จะส่งผลลัพธ์กลับด้วยข้อมูลที่ถูกอัพเดท



### ส่วนของการสร้างเมธอด deleteById

```javascript
// Delete Restaurant
Restaurant.deleteById = (id, result) => {
  sql.query("DELETE FROM restaurants WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("err", err);
      result(err, null);
      return;
    }
    if (res.length == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Restaurant id:" + id + " is deleted !");
    result(null, res);
  });
};
```

- เมธอดนี้ใช้คำสั่ง SQL DELETE FROM restaurants WHERE id = ? เพื่อลบข้อมูลร้านอาหารจาก ID ที่ระบุ
- จัดการกับข้อผิดพลาดและสถานการณ์ที่อาจเกิดขึ้นเมื่อลบข้อมูล
- ถ้ามีข้อผิดพลาด หรือไม่พบ ID ที่ระบุ จะส่งผลลัพธ์กลับด้วยข้อความ "err" หรือ "not_found"
- ถ้าสำเร็จ จะแสดงข้อความ "Restaurant id: ... is deleted !" และส่งผลลัพธ์กลับ


### ส่วนของการส่งออกโมดูล

```javascript
module.exports = Restaurant;
```

- เป็นการส่งออกคลาส Restaurant เพื่อให้สามารถนำไปใช้งานในไฟล์อื่นได้





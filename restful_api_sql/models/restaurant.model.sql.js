const sql = require("./db.sql");//เป็นการเอาในส่วนของไฟล์ db ในโฟเดอร์ models นำมาใช้งาน //require คือเป็นการimport โดยเก็บไว้ในออฟเจ็คที่ชื่อว่า sql และ ./ คือ คือเป็นการ move เข้าไปอีกหนึ่งสเต็ป ต้องอยู่ในโฟเดอร์ตัวเองก็คือโฟเดอร์ models //sqlเป็นตัวแปรที่อยู่ภายนอก

//Constructor
const Restaurant = function (restaurant) { //เป็นการสร้างฟังก์ชั่นที่ใช้ในการสร้าง class ขึ้นมาก็คือ Restaurant โดยฟังก์ชั่นจะรับพารามิเตอร์เป็น restaurant //เป็นการมอง id , name ,type , imageURL เป็นก้อนๆเดียวกัน เป็นตัวแปรก้อนๆเดียวกันเป็น Restaurant
  //Attributes
  this.id = restaurant.id; //this ให้มองว่ามันผูกติดกับออฟเจ็ค ก็คือ Restaurant //restaurant เป็นออฟเจ็คที่เราส่งเข้าไปมันมี4ค่า มีค่า id , name ,type , imageURL
  this.name = restaurant.name; //restaurant เป็นออฟเจ็คที่เราส่งเข้าไปมันมี4ค่า มีค่า id , name ,type , imageURL
  this.type = restaurant.type; //restaurant เป็นออฟเจ็คที่เราส่งเข้าไปมันมี4ค่า มีค่า id , name ,type , imageURL
  this.imageURL = restaurant.imageURL; //restaurant เป็นออฟเจ็คที่เราส่งเข้าไปมันมี4ค่า มีค่า id , name ,type , imageURL
};

//Method
//Insert new restaurant //เป็นการสร้าง เพราะใน database ของเรายังไม่มีข้อมูลเลย แล้วเราจะสร้าง Insert มันเข้าไป
Restaurant.create = (newRestaurant, result) => { //เป็นการประกาศว่าออฟเจ็ค Restaurant จะ create หรือสร้าง คือต้องเป็นค่าต่อไปนี้นะ ต้องเป็นฟังก์ชั่นต่อไปนี้นะ //ซึ่งเวลาเราสร้าง Restaurant เราก็จะส่ง newRestaurant อันใหม่เข้าไป ก็คือข้อมูลของร้านค้าตัวใหม่เราต้องใส่เข้าไป //แล้วก็ส่งตัว result ที่จะเก็บผลลัพท์ที่มันจะ return กลับมา //เป็นการบอกว่า create เป็นฟังค์ชั่นต่อไปนี้นะ //ผลลัพท์จะเก็บไว้ในตัวแปร result
  //INSERT INTO restaurant (id, name, type, imageURL) VALUES ("1", "KFC", "Fastfood", "url")
  sql.query("INSERT INTO restaurants SET ?", newRestaurant, (err, res) => { //เรียกออฟเจ็คที่เราสร้าง connection เอาไว้ ก็คือ sql //SET เป็น keyword พิเศษ เพื่อบอกว่า id พวกนี้เราจะตั้งค่ามันนะ // , เอาไว้ใช้ต่อ sting //(err, res) เป็นการดูว่ามี error หรือไม่มี //ตัวแปรพวก newRestaurant, (err, res) นี้จะถูกแทนที่ ? ให้เราเอง
    if (err) { //เป็นการเช็คว่ามี error ไหม
      console.log("error", err); //ถ้ามี error ก็จะบอกเขาหน่อยว่า ("error", err) ก็คือมี error นะ
      result(err, null);
      return; //return ก็คือจบเลยไม่ต้องทำอะไรต่อแล้ว
    }
    console.log("New restaurant inserted:", { id: res.id, ...newRestaurant }); //ถ้าไม่  ก็จะบอกว่า New restaurant inserted: (idใหม่) แล้วต่อsting //{ id: res.id, ...newRestaurant } ก็คือสิ่งที่มันจะ return กลับมาก็คือ idได้id แล้วก็ทุกอย่างใน newRestaurant
    result(null, { id: res.id, ...newRestaurant }); //error ไม่มี result ก็จะถูกsetให้เป็น null //result คือสิ่งที่เราได้มีจาก { id: res.id, ...newRestaurant }
  });
};

//Get All Restaurant
Restaurant.getAll = (result) => { //เป็นการประกาศว่าออฟเจ็ค Restaurant จะ getAll หรือโชว์ผลลัพท์ทั้งหมด คือต้องเป็นค่าต่อไปนี้นะ ต้องเป็นฟังก์ชั่นต่อไปนี้นะ  //แล้วก็ส่งตัว result ที่จะเก็บผลลัพท์ที่มันจะ return กลับมา //เป็นการบอกว่า getAll เป็นฟังค์ชั่นต่อไปนี้นะ //ผลลัพท์จะเก็บไว้ในตัวแปร result
  //SELECT * FROM restaurants
  sql.query("SELECT * FROM restaurants", (err, res) => { //เรียกออฟเจ็คที่เราสร้าง connection เอาไว้ ก็คือ sql  // , เอาไว้ใช้ต่อ sting //(err, res) เป็นการดูว่ามี error หรือไม่มี 
    if (err) {//เป็นการเช็คว่ามี error ไหม
      console.log("error", err); //ถ้ามี error ก็จะบอกเขาหน่อยว่า ("error", err) ก็คือมี error นะ
      result(err, null); //กรณีที่ error ก็ไป err ถ้าไม่ error ก็ไป null
      return; //return ก็คือจบเลยไม่ต้องทำอะไรต่อแล้ว
    }
    result(null, res); //error ไม่มี result ก็จะถูกsetให้เป็น null  //result คือสิ่งที่เราได้มีจาก res
  });
};

//Get By ID
Restaurant.getById = (restaurantId, result) => { //เป็นการประกาศว่าออฟเจ็ค Restaurant จะ getById หรือค้นหาผลลัพท์จาก ID คือต้องเป็นค่าต่อไปนี้นะ ต้องเป็นฟังก์ชั่นต่อไปนี้นะ //ซึ่งเวลาเราสร้าง Restaurant เราก็จะส่ง restaurantId อันใหม่เข้าไป ก็คือข้อมูลของร้านค้าตัวใหม่เราต้องใส่เข้าไป //แล้วก็ส่งตัว result ที่จะเก็บผลลัพท์ที่มันจะ return กลับมา //เป็นการบอกว่า getById เป็นฟังค์ชั่นต่อไปนี้นะ //ผลลัพท์จะเก็บไว้ในตัวแปร result
  //SELECT * FROM restaurants WHERE id = restaurantId
  sql.query(
    `SELECT * FROM restaurants WHERE id = ${restaurantId}`, //เรียกออฟเจ็คที่เราสร้าง connection เอาไว้ ก็คือ sql  // , เอาไว้ใช้ต่อ sting 
    (err, res) => { //(err, res) เป็นการดูว่ามี error หรือไม่มี 
      //fail
      if (err) { //เป็นการเช็คว่ามี error ไหม
        console.log("error", err); //ถ้ามี error ก็จะบอกเขาหน่อยว่า ("error", err) ก็คือมี error นะ
        result(err, null); //กรณีที่ error ก็ไป err ถ้าไม่ error ก็ไป null
        return; //return ก็คือจบเลยไม่ต้องทำอะไรต่อแล้ว
      }
      //Success
      if (res.length) { //เป็นการเช็คความยาวหรือขนาด ว่าตอนที่เราเรียก query 
        result(null, res[0]); //เป็นการส่ง result กลับไป //ฝั่ง error ก็จะเป็น null  //res[0] คือส่งindexที่0ไป ก็คือแถวแรกที่เจอ
        return; //return ก็คือจบเลยไม่ต้องทำอะไรต่อแล้ว
      }
      //fail
      result({ kind: "not_found" }, null);  //กรณีที่หลุดมา1 ก็จะขึ้นมาไม่เจอ id ละ แสดงว่า id เรามันหาไม่เจอ //กรณีที่ error ก็จะ not_found ถ้าไม่ error ก็ไป null
    }
  );
};

//Update By ID
Restaurant.updateById = (id, params, result) => { //ซึ่งเวลาเราอัพเดทBy ID สิ่งที่เราต้องส่งไปคือ หมายเลขid params result เพื่องอ้างอิง //เป็นการประกาศว่าออฟเจ็ค Restaurant จะ updateById หรืออัพเดทผลลัพท์จาก ID คือต้องเป็นค่าต่อไปนี้นะ ต้องเป็นฟังก์ชั่นต่อไปนี้นะ //ซึ่งเวลาเราสร้าง Restaurant เราก็จะส่ง updateById อันใหม่เข้าไป ก็คือข้อมูลของร้านค้าตัวใหม่เราต้องใส่เข้าไป //แล้วก็ส่งตัว result ที่จะเก็บผลลัพท์ที่มันจะ return กลับมา //เป็นการบอกว่า updateById เป็นฟังค์ชั่นต่อไปนี้นะ //ผลลัพท์จะเก็บไว้ในตัวแปร result
  //UPDATE restaurants SET name = "name", type = "type", imageurl = "imageurl" WHERE id ="id"
  sql.query(
    "UPDATE restaurants SET name = ?, type = ?, imageurl = ? WHERE id = ?", //ตัว ? คือ สิ่งใหม่ที่ใส่เข้ามา //SET เป็น keyword พิเศษ เพื่อบอกว่า id พวกนี้เราจะตั้งค่ามันนะ //name = ? ความหมายคือ name เท่ากับอะไรเอ่ย
    [params.name, params.type, params.imageURL, id], //เป็นการดึงข้อมูลจากตัวแปรที่ชื่อว่า params 
    (err, res) => { //(err, res) เป็นการดูว่ามี error หรือไม่มี 
      //fail
      if (err) { //เป็นการเช็คว่ามี error ไหม
        console.log("err", err); //ถ้ามี error ก็จะบอกเขาหน่อยว่า ("error", err) ก็คือมี error นะ
        result(err, null); //กรณีที่ error ก็ไป err ถ้าไม่ error ก็ไป null
        return; //return ก็คือจบเลยไม่ต้องทำอะไรต่อแล้ว
      }
      //fail
      if (res.length == 0) { //ถ้าความยาวหรือขนาดเท่ากับ 0 แสดงว่ามันไม่เจอ id นี้
        result({ kind: "not_found" }, null); //กรณีที่หลุดมา1 ก็จะขึ้นมาไม่เจอ id ละ แสดงว่า id เรามันหาไม่เจอ //กรณีที่ error ก็จะ not_found ถ้าไม่ error ก็ไป null
        return; //return ก็คือจบเลยไม่ต้องทำอะไรต่อแล้ว
      }
      //Success
      result(null, { id: id, ...params }); //คือมันอัพเดทได้ //กรณีที่ error ก็ไป null ถ้าไม่ก็ไป { id: id, ...params } //ส่วนข้อมูลที่จะส่งกลับไปก็คือ id 
    }
  );
};

//Delete Restaurant
Restaurant.deleteById = (id, result) =>{ //ซึ่งเวลาเรา Delete Restaurant  สิ่งที่เราต้องส่งไปคือ หมายเลขid result เพื่องอ้างอิง //เป็นการประกาศว่าออฟเจ็ค Restaurant จะ deleteById หรือลบผลลัพท์จาก ID คือต้องเป็นค่าต่อไปนี้นะ ต้องเป็นฟังก์ชั่นต่อไปนี้นะ //ซึ่งเวลาเราสร้าง Restaurant เราก็จะส่ง deleteById อันใหม่เข้าไป ก็คือข้อมูลของร้านค้าตัวใหม่เราต้องใส่เข้าไป //แล้วก็ส่งตัว result ที่จะเก็บผลลัพท์ที่มันจะ return กลับมา //เป็นการบอกว่า deleteById เป็นฟังค์ชั่นต่อไปนี้นะ //ผลลัพท์จะเก็บไว้ในตัวแปร result
    //DELETE FROM restaurants WHERE id = ?
    sql.query("DELETE FROM restaurants WHERE id = ?", id, (err,res)=>{ //, id, คือถูกแทนด้วย id //id = ? ความหมายคือ id เท่ากับอะไรเอ่ย
      //fail
      if (err) {//เป็นการเช็คว่ามี error ไหม
        console.log("err", err); //ถ้ามี error ก็จะบอกเขาหน่อยว่า ("error", err) ก็คือมี error นะ
        result(err, null); //กรณีที่ error ก็ไป err ถ้าไม่ error ก็ไป null
        return; //return ก็คือจบเลยไม่ต้องทำอะไรต่อแล้ว
      }
      //fail
      if (res.length == 0) { //ถ้าความยาวหรือขนาดเท่ากับ 0 แสดงว่ามันไม่เจอ id นี้
        result({ kind: "not_found" }, null); //กรณีที่หลุดมา1 ก็จะขึ้นมาไม่เจอ id ละ แสดงว่า id เรามันหาไม่เจอ //กรณีที่ error ก็จะ not_found ถ้าไม่ error ก็ไป null
        return;//return ก็คือจบเลยไม่ต้องทำอะไรต่อแล้ว
      }
      //Success
      console.log("Restaurant id:" + id+ " is deleted !"); //เป็นการบอกกับ client ว่า Restaurant id: ..... is deleted ! ก็คือเราลบ id นี้ทิ้งไปแล้วนะ
      result(null, res); //error ไม่มี result ก็จะถูกsetให้เป็น null  //result คือสิ่งที่เราได้มีจาก res
    });
}

module.exports = Restaurant; //เป็นการเมื่อดราทำ Restaurant เสร็จแล้ว แต่อยากจะเอาไปใช้ที่อื่นด้วย //เพื่อให้มองเห็นจากข้างนอกได้

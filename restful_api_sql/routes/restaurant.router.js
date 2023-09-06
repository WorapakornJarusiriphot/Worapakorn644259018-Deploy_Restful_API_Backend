const express = require("express");
const router = express.Router();
const Restaurant = require("../controllers/restaurant.controllers");

// Insert new restaurant to DB
// http://localhost:5000/restaurants
router.post("/restaurants",async (req,res)=>{
    try {
    const newRestaurant = req.body;
    console.log(newRestaurant)
    const createRestaurant = await Restaurant.createRestaurant(newRestaurant);
    console.log(createRestaurant)
    res.status(201).json(createRestaurant);
   }catch (err){
    res.status(500).json({err:"Fail to create restaurant"});
    }
});

//Get All restaurant
router.get("/restaurants", async(req, res)=>{
    try {
        const restaurants = await Restaurant.getAll();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({err:"Fail to create restaurant"});
    }
})

// get Restaurant By ID
router.get("/restaurants/:id", async(req, res)=>{
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.getById(restaurantId);
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({err:"Fail to create restaurant by Id"});
    }
})

// Update a restaurant data 
router.put("/restaurants/:id", async(req, res)=>{
  try {
    const restaurantId = req.params.id;
    const restaurantData = req.body;
    const restaurant = await Restaurant.updateById(
        restaurantId,
        restaurantData
        );
        res.status(200).json(restaurant);
  } catch (error) {
    if (error.kind === "not_founf") {
        res.status(400).json({ error: "Restaurant not found "});
    }else {
        res.status(500).json({ error: "Failed to update restaurant data"});
    }
  }
});

//Delete
router.delete("/restaurants/:id", async(req, res)=>{
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.removeById(restaurantId);
        if (restaurant) {
            res.status(200)
            .json({
                message: "Restaurant id " + restaurantId + " is deleted",
                isDelete: restaurant,
            });
        }
    } catch (error) {
        if (error.kind === "not_found") {
            res.status(404).json({ error: "Restaurant not found "});
        }else {
            res.status(500).json({ error: "Failed to update restaurant data"});
        }
      }
    });
module.exports = router;

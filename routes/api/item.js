const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');

router.get('/', (req, res) => {
  Item.find()
     .then(users => res.json(users))
})

// Add Item Via Barcode Scan
router.post('/addData', (req, res) => {

  let { itemName, quantity, price, categoryID, supplierID } = req.body;

  const newItem = new Item({
    itemName,
    quantity,
    price,
    categoryID,
    supplierID
  });

  newItem
    .save()
    .then((result) => {
      res.json({
        status: "SUCCESS",
        message: "Sign up successful",
        data: result,
      });
    })
    .catch((err) => {
      res.json({
        status: "FAILED",
        message: "An error occurred while saving new item",
        data: err,
      });
    });
});

router.post('/itempurchase/:itemName', (req, res) => {
  Item.updateOne({ itemName: req.params.itemName }, { '$inc': { 'quantity': -1 } })
      .then(() => res.json({success: true}))
      .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
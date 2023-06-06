const express = require('express');
const path = require('path');
const router = express.Router();
const { getCardsofboardController, getCardController, createCardController, updateCardController, deleteCardController } = require('../controller/card.controller')


// get list on cards from db only
router.get('/list', (req, res) => {
    getCardController(req,res)
})

// get list on a board with cards data from mongo db only
router.get('/', (req, res) => {
    getCardsofboardController(req,res)
})

// create a new card
router.post('/', (req, res) => {
    createCardController(req, res)
})

// udpate a card
router.put('/:id', (req, res) => {
    updateCardController(req, res)
})

// delete a card
router.delete('/:id', (req, res) => {
    deleteCardController(req, res)
})

module.exports = router;
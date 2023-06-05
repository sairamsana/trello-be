const express = require('express');
const path = require('path');
const router = express.Router();
const { getCardsofboardController, getCardController, createCardController, updateCardController, deleteCardController } = require('../controller/card.controller')

router.get('/list', (req, res) => {
    getCardController(req,res)
})

router.get('/', (req, res) => {
    getCardsofboardController(req,res)
})


router.post('/', (req, res) => {
    createCardController(req, res)
})

router.put('/:id', (req, res) => {
    updateCardController(req, res)
})

router.delete('/:id', (req, res) => {
    deleteCardController(req, res)
})

module.exports = router;
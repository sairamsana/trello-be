const { response } = require('express')
const CardSchema = require('../models/CardSchema')
const ListSchema = require('../models/ListSchema')

const { getTrelloListOnBoardsData, getTrelloListOfCardData, saveTrelloCard, updateTrelloCard, deleteTrelloCard } = require('../services/trello.service')


// get cards of board
const getCardsofboardController = (req, res) => {

    const idBoard = req.session.idBoard;
    return getListonBoard({ idBoard: idBoard }).then((listData) => {
        const listIds = listData.map((item) => item._id.toString())
        listData = JSON.parse(JSON.stringify(listData))
        const query = { idList: { $in: listIds } }
        getCards(query).then((cardsList) => {
            const listCards = listData.map(listItem => {
                listItem.cards = cardsList.filter((carditem) => carditem.idList === listItem._id.toString())
                return listItem;
            });
            return res.json(listCards)
        })
    })

}


// required idList
const createCardController = (req, res) => {
    const parseData = req.body;
    return saveTrelloCard(parseData, req.session.token).then((response) => {
        if (response.status == 200) {
            const { id, idBoard, idList, name, email, dateLastActivity, desc } = response.data;
            return saveCard({ id, idBoard, idList, name, email, dateLastActivity, desc }).then((saved) => {
                return res.status(response.status).json(saved)
            })
        } else {
            return res.status(400).json("Bad Request")
        }
    }, (error) => {
        let { response } = error;
        return res.status(response.status).json(response.data);
    })
}

// required param cardid 
const updateCardController = (req, res) => {
    const parseData = req.body;
    const cardID = req.params.id;
    return updateTrelloCard(cardID, parseData, req.session.token).then((response) => {
        if (response.status == 200) {
            const { id, idBoard, idList, name, email, dateLastActivity, desc } = response.data;
            return updateCard({ id, idBoard, idList, name, email, dateLastActivity, desc }).then((updated) => {
                return res.status(response.status).json(updated)
            })
        } else {
            return res.status(400).json("Bad Request")
        }
    }, (error) => {
        let { response } = error;
        return res.status(response.status).json(response.data);
    })
}

// required param cardid 
const deleteCardController = (req, res) => {
    const cardID = req.params.id;
    return deleteTrelloCard(cardID, req.session.token).then((response) => {
        if (response.status == 200) {
            return deleteCard({ _id: cardID }).then((deleted) => {
                return res.status(response.status).json({ status: "deleted successfully", ...deleted })
            })
        } else {
            return res.status(400).json("Bad Request")
        }
    }, (error) => {
        let { response } = error;
        return res.status(response.status).json(response.data);
    })
}

const getCardController = (req, res) => {
    return getCards({ idList: "647ac9a8fa422bad0b47dce0" }).then((cardList) => {
        return res.status(200).json(cardList)
    })
}

// get a Card from database
const getCard = (query) => {
    return CardSchema.findOne(query).then((res) => {
        return res;
    }, (error) => {
        console.log("Error ", error)
    })
};

// get List of Cards from database
const getCards = (query) => {
    return CardSchema.find(query).then((res) => {
        return res;
    }, (error) => {
        console.log("Error ", error)
    })
};

// save a new Card
const saveCard = (data) => {
    data = { _id: data.id, ...data }
    return CardSchema.create(data).then((res) => {
        return res;
    }, (error) => {
        console.log("Error ", error)
    })
};

// update an existing Card
const updateCard = (data) => {
    data = { _id: data.id, ...data }
    return CardSchema.findByIdAndUpdate(data._id, data, { returnOriginal: false }).then((res) => {
        return res;
    }, (error) => {
        console.log("Error ", error)
    })
};

// delete an existing Card
const deleteCard = (data) => {
    return CardSchema.findByIdAndDelete(data._id).then((res) => {
        return res;
    }, (error) => {
        console.log("Error ", error)
    })
};

// get list on board required query idMember
const getListonBoard = (data) => {
    return ListSchema.find(data).then((res) => {
        return res;
    }, (error) => {
        console.log("Error ", error)
    })
};

module.exports = { getCardsofboardController, getCardController, createCardController, updateCardController, deleteCardController };
const axios = require('axios');

// get member information after getting access token
const getTrelloMemberData = (access_token) => {
  const url = `${process.env.TRELLO_BASEURL}/members/me/`;
  return axios.get(url, { params: { key: process.env.TRELLO_APIKEY, token: access_token, } })
    .then((res) => {
      return res
    }, (error) => {
      return error
    });
};

// get list on a board @ required idList
const getTrelloListOnBoardsData = (boardID, access_token) => {
  const url = `${process.env.TRELLO_BASEURL}/boards/${boardID}/lists/`;
  return axios.get(url, { params: { key: process.env.TRELLO_APIKEY, token: access_token, } })
    .then((res) => {
      return res
    }, (error) => {
      return error
    });
};

// get list of cards @ required list id
const getTrelloListOfCardData = (cardID, access_token) => {
  const url = `${process.env.TRELLO_BASEURL}/cards/${cardID}/list/`;
  return axios.get(url, { params: { key: process.env.TRELLO_APIKEY, token: access_token, } })
    .then((res) => {
      return res
    }, (error) => {
      return error
    });
};

// create a new card
const saveTrelloCard = (params, access_token) => {
  const url = `${process.env.TRELLO_BASEURL}/cards`;
  return axios.post(url, {}, { params: { key: process.env.TRELLO_APIKEY, token: access_token, ...params } })
    .then((res) => {
      return res
    }, (error) => {
      return error
    });

};


// update a card @required Card ID
const updateTrelloCard = (cardID, params, access_token) => {
  const url = `${process.env.TRELLO_BASEURL}/cards/${cardID}`;
  return axios.put(url, {}, { params: { key: process.env.TRELLO_APIKEY, token: access_token, ...params } })
    .then((res) => {
      return res
    }, (error) => {
      return error
    });
};

// delete a card
const deleteTrelloCard = (cardID, access_token) => {
  const url = `${process.env.TRELLO_BASEURL}/cards/${cardID}`;
  return axios.delete(url, { params: { key: process.env.TRELLO_APIKEY, token: access_token, } })
    .then((res) => {
      return res
    }, (error) => {
      return error
    });
};


module.exports = { getTrelloMemberData, getTrelloListOnBoardsData, getTrelloListOfCardData, saveTrelloCard, updateTrelloCard, deleteTrelloCard };

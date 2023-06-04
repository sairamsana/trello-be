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
const getListOnBoardsData = (boardID, access_token) => {
  const url = `${process.env.TRELLO_BASEURL}/lists/${boardID}/cards/`;
  return axios.get(url, { params: { key: process.env.TRELLO_APIKEY, token: access_token, } })
    .then((res) => {
      return res
    }, (error) => {
      return error
    });
};


// create a new card
const saveCard = (params, access_token) => {
  const url = `${process.env.TRELLO_BASEURL}/cards`;
  return axios.post(url, {}, { params: { key: process.env.TRELLO_APIKEY, token: access_token, ...params } })
    .then((res) => {
      return res
    }, (error) => {
      return error
    });

};


// update a card @required Card ID
const updateCard = (cardID, params, access_token) => {
  const url = `${process.env.TRELLO_BASEURL}/cards/${cardID}`;
  return axios.put(url, {}, { params: { key: process.env.TRELLO_APIKEY, token: access_token, ...params } })
    .then((res) => {
      return res
    }, (error) => {
      return error
    });
};

// delete a card
const deleteCard = (cardID, access_token) => {
  const url = `${process.env.TRELLO_BASEURL}/cards/${cardID}`;
  return axios.delete(url, { params: { key: process.env.TRELLO_APIKEY, token: access_token, } })
    .then((res) => {
      return res
    }, (error) => {
      return error
    });
};


module.exports = { getTrelloMemberData,getListOnBoardsData, saveCard, updateCard, deleteCard };

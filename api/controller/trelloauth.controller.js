const { response } = require('express')
const MembersSchema = require('../models/MembersSchema')
const ListSchema = require('../models/ListSchema')
const { getTrelloMemberData, getTrelloListOnBoardsData } = require('../services/trello.service')

// temp save for testing
const token = ''

// create a new member after getting token successfully
const createMember = (req, res) => {

    return getTrelloMemberData(req.body.token).then((response) => {
        if (response !== null && response.status == 200) {

            // have to check will there be a default board else below string will fail?
            const boardID = response.data.idBoards[0]

            // session create for login user
            req.session.idMember = response.data.id;
            req.session.idBoard = boardID;
            req.session.token = req.body.token;
            req.session.memberInfo = JSON.stringify(response.data)

            // check if the user exists in db
            query = { _id: response.data.id }
            return getMember(query).then((member) => {
                if (member !== null && member._id == query._id) {

                    // if user exists then update the existing user with token
                    return updateMember(member).then((updated) => {
                        return getTrelloListOnBoardsData(boardID, req.session.token).then((listRes) => {
                            if (listRes.status == 200) {
                                return udpateList(addIdMember(listRes.data, response.data)).then((updateList) => {
                                    return true
                                })
                            }
                        })
                    })

                } else {
                    // create a new user in db
                    return saveMember(response.data).then((saved) => {
                        return getTrelloListOnBoardsData(boardID, req.session.token).then((listRes) => {
                            if (listRes.status == 200) {
                                return saveList(addIdMember(listRes.data, response.data)).then((savedList) => {
                                    return true
                                })
                            }
                        })
                    })
                }
            })
        } else {
            return false;
        }
    }, (error) => {
        let { response } = error;
        return false;
    })
};

// add member id to list on boards
const addIdMember = (lists, member) => {
    const retList = []
    lists.forEach(l => {
        retList.push({ _id: l.id, idMember: member.id, ...l })
    });
    return retList
}


// Mongo DB CRUD Operations 

// get a member from database
const getMember = (query) => {
    return MembersSchema.findOne(query).then((res) => {
        return res;
    }, (error) => {
        console.log("Error ", error)
    })
};

// save a new member
const saveMember = (data) => {
    data = { _id: data.id, ...data }
    return MembersSchema.create(data).then((res) => {
        return res;
    }, (error) => {
        console.log("Error ", error)
    })
};

// update an existing member
const updateMember = (data) => {
    return MembersSchema.findByIdAndUpdate(data._id, data).then((res) => {
        return res;
    }, (error) => {
        console.log("Error ", error)
    })
};

// save array list
const saveList = (data) => {
    return ListSchema.insertMany(data).then((res) => {
        return res;
    }, (error) => {
        console.log("Error ", error)
    })
};

// udpate array list
const udpateList = (data) => {
    return ListSchema.updateMany(data).then((res) => {
        return res;
    }, (error) => {
        console.log("Error ", error)
    })
};

module.exports = createMember;
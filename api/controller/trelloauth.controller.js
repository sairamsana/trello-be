const { response } = require('express')
const MembersSchema = require('../models/MembersSchema')
const { getTrelloMemberData } = require('../services/trello.service')

// temp save for testing
const token = ''

// create a new member after getting token successfully
const createMember = (req, res, next) => {
    return getTrelloMemberData(token).then((response) => {
        if (response !== null && response.status == 200) {

            // check if the user exists in db
            query = { _id: response.data.id }
            return getMember(query).then((member) => {
                if (member !== null && member._id == query._id) {

                    // if user exists then update the existing user with token
                    return updateMember(member).then((updated) => {
                        return res.status(response.status).json(updated)
                    })
                } else {

                    // create a new user in db
                    return saveMember(response.data).then((updated) => {
                        return res.status(response.status).json(updated)
                    })
                }
            })
        } else {
            return res.status(response.status).json(response.data);
        }
    }, (error) => {
        let { response } = error;
        return res.status(response.status).json(response.data);
    })
};

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

module.exports = createMember;
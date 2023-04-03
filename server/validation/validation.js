const joi = require("joi");


//showFriendList controller.
const showFriendListSchema = joi.object({
    username: joi.string().min(3).max(20).required()
});


//getFriend controller
const friendListSchema = joi.object({
    friendId: joi.number().min(1).required(),
    id: joi.number().min(1)
});

// deleteFriend controller
const friendDeleteSchema = joi.object({
    userId: joi.number().min(1),
    id: joi.number().min(1).required()
});

// listCreate controller, createList
const listCreateSchema = joi.object({
    todo: joi.string().max(50).required(),
    id: joi.number().min(1)
});



const updateListSchema = joi.object({
    todo: joi.string().max(50).required(),
    id: joi.number().min(1).required()
});





module.exports = {
    showFriendListSchema,
    friendListSchema,
    friendDeleteSchema,
    listCreateSchema,
    updateListSchema
}
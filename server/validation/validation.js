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

module.exports = {
    showFriendListSchema,
    friendListSchema
}
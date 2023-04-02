const joi = require("joi");

const friendListSchema = joi.object({
    friendId: joi.string().min(3).max(20).required()
});

module.exports = {
    friendListSchema
}
const { Schema, model } = require('mongoose');
const searchSchema = new Schema({
    searchname: {
        type: String,
        required: true,
        trim: true,
        unique: false
    },
}, {
    timestamps: true
});
module.exports = model('Search', searchSchema);


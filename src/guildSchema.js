const { Schema, model } = require('mongoose')

const reqString = {
  type: String,
  required: true
}

const schema = new Schema({
  _id: reqString,
  prefix: String,
  lang: {
    type: String,
    default: "en"
  }
})

module.exports = model('gotloader:guilds', schema)
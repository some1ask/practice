/* eslint-disable no-unused-vars */
const faker = require('faker');

const model = require('./models');

const owner = '5c5426217bb938220c98de09';

module.exports = () =>{
    model.Post.remove().then(()=>{
        Array.from({length: 10}).forEach((_,i)=>{
            model.Post.create({
                title:faker.lorem.words(5),
                body:faker.lorem.words(20),
                owner
            }).then(console.log).catch(console.log)
        })
    }).catch(console.log)
}
const { Post } = require('../models');

const postData = [{
    title: "Fear to fail....",
    content: "This is my last shot in life, this is my life line.",
    user_id: 1
},
{
    title: "Started from nothing, no experience and no knowledge in Coding",
    content: "Learning what people studied in 3 years within 2 months. Lol. Me neither. I don't know how we can learn so many concepts in such little time. ",
    user_id: 2
},
{
    title: "False hope?",
    content: "Am I just wasting my time and money on some heavily marketed course??",
    user_id: 3
},
{
    title: "I miss having a life",
    content: "I just wanna succeed.",
    user_id: 4    
}
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
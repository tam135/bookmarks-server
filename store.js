const uuid = require('uuid/v4')
const booksmarks = [
    {
        id: uuid(),
        title: 'Youtube',
        url: 'https://youtube.com',
        description: 'Funny videos of cats',
        rating: 4
    }
]

module.exports = {bookmarks}
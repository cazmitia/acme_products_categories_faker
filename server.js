const express = require('express')
const {db, syncAndSeed, Category, Product} = require('./db.js')
const app = express()
const path = require('path')

const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/app.js', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist', 'main.js'))
})

app.get('/api/categories', (req, res, next) => {
    Category.findAll({
        include: [{
            model: Product
        }]
    })
    .then( categories => res.send(categories))
})

app.delete('/api/categories/:id', (req, res, next) => {
    Product.destroy({
        where: {categoryId: req.params.id}
    })
    .then(() => {
        Category.destroy({
        where: {id: req.params.id}
        })
    })
    .then(() => res.sendStatus(204))
    .catch(next);
})

app.delete('/api/products/:id', (req, res, next) => {
    Product.destroy({
        where: {id: req.params.id}
    })
    .then(() => res.sendStatus(204))
    .catch(next);
})

app.post('/api/categories', (req, res, next) => {
    Category.addCat()
    .then(category => res.send(category))
})

app.post('/api/categories/:id/products', (req, res, next) => {
    Product.addProduct(req.params.id)
    .then(product => res.send(product))
})

syncAndSeed()
.then(() => {
    app.listen(port, () => console.log(`listening on port ${port}`))
})


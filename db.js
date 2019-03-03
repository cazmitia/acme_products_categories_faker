const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL);
const faker = require('faker');

const Category = db.define('category', {
    title: Sequelize.STRING
})

Category.addCat = function() {
    return Category.create({title: faker.commerce.department()})
}

const Product = db.define('product', {
    title: Sequelize.STRING
})

Product.addProduct = function(catId) {
    return Product.create({title: `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} ${faker.commerce.product()}`, categoryId: catId})
}

const syncAndSeed = async () => {
    try {
        Product.belongsTo(Category)
        Category.hasMany(Product, {onDelete: 'CASCADE'})
        await db.sync({force: true})
        await Promise.all([Category.addCat(), Category.addCat(), Category.addCat()])
        await Promise.all([Product.addProduct(1), Product.addProduct(2), Product.addProduct(3)])
    } catch (e) {
    console.error(e)
    }
}

module.exports = {
    db,
    syncAndSeed,
    Category,
    Product
}

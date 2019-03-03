import React, { Component } from 'react';
import axios from 'axios';
import List from './list';

class App extends Component{
    constructor() {
        super()
        this.state = {
            categories: []
        }
        this.createCat = this.createCat.bind(this)
        this.createProduct = this.createProduct.bind(this)
        this.destroyCat = this.destroyCat.bind(this)
        this.destroyProduct = this.destroyProduct.bind(this)
    }
    createCat() {
        axios.post('/api/categories')
        .then(response => response.data)
        .then(category => {
            const categories = this.state.categories;
            category.products = [];
            categories.push(category);
            this.setState({categories})
        })
    }

    destroyCat(id) {
        axios.delete(`/api/categories/${id}`)
        .then(() => {
            const categories = this.state.categories.filter(category => category.id !== id);
            this.setState({categories})
        })
    }

    createProduct(id) {
        axios.post(`/api/categories/${id}/products`)
        .then(response => response.data)
        .then(product => {
            const categories = this.state.categories;
            categories.find(category => category.id === id).products.push(product);
            this.setState({categories})
        })
    }

    destroyProduct(id, catId) {
        axios.delete(`/api/products/${id}`)
        .then(() => {
            const categories = this.state.categories;
            const products = categories.find(category => category.id === catId).products.filter(product => product.id !== id);
            categories.find(category => category.id === catId).products = products;
            this.setState({categories})
        })
    }

    componentDidMount() {
        axios.get('/api/categories')
            .then( response => response.data)
            .then(categories => this.setState({categories}))
    }
    render() {
        const { categories } = this.state;
        const { createCat, createProduct, destroyCat, destroyProduct} = this;
        return (
            <div>
                <h1>Acme Categories and Products <i>by faker</i></h1>
                <button class="btn btn-primary" onClick={createCat}>Create Category</button>
                <ul className="list-group">
                {categories.map(category => (
                    <List key={category.id} category ={ category} products ={category.products} createProduct = {createProduct} destroyCat={destroyCat} destroyProduct={destroyProduct}/>
                ))}
                </ul>

            </div>
        );
    }
}

export default App

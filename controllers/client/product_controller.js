const Product = require('../../models/product_model');

module.exports.index = async (req, res) => {
    const products = await Product.find({
        deleted: false,
    });

    const newProducts = products.map(item => {
        item.priceNew = item.price - (item.price * item.discountPercentage / 100).toFixed(0);
        return item;
    });

    console.log(products);
    res.render('client/pages/products/index', {
        pageTitle: 'Products',
        products: newProducts
    });
}

module.exports.detailProduct = async (req, res) => {
    console.log(req.params.slug);
    try{
        const requireFind = {
            deleted: false,
            slug: req.params.slug
        }
    
        const product = await Product.findOne(requireFind);
        res.render('client/pages/products/detail_product', {
            pageTitle: 'Product detail',
            product: product
        });
    }catch(error){
        console.log(error);
    }
}
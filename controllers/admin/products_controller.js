const Product = require('../../models/product_model');
const filterStatusHelper = require('..//../helper/filter_status');
const searchHandleHelper = require('../../helper/search');
const paginationHelper = require('../../helper/pagination');
const systemConfig = require('../../config/system');

module.exports.product = async(req, res) => {
    let findCriteria = {
        deleted: false
    }
    
    const filterStatus  = filterStatusHelper(req.query);
    if(req.query.status){
        findCriteria.status = req.query.status;
    }
    
    const searchInput = searchHandleHelper(req.query);
    if(searchInput){
        findCriteria.title = new RegExp(searchInput, 'i');
    }

    //pagination
    const countProducts = await Product.countDocuments(findCriteria);
    let objectPagination = paginationHelper(
    {
        currentPage: 1,
        limitItems: 4,
    }, 
        req.query,
        countProducts
    );

    const products = await Product.find(findCriteria).
    sort({position: 'desc'}).
    limit(objectPagination.limitItems).skip(objectPagination.skip);

    res.render('admin/pages/product/index', {
        pageTitle: 'Trang san pham',
        products: products,
        filterStatus: filterStatus,
        search: searchInput,
        pagination: objectPagination
    });
};

module.exports.changeStatus = async (req,res) => {
    console.log(req.params);
    const statusOfProduct = req.params.status;
    const idOfProduct = req.params.id;

    await Product.updateOne({_id: idOfProduct}, {status: statusOfProduct});
    req.flash('success', 'Change status success');
    res.redirect('back');
}

module.exports.changeMultiStatusProduct = async (req,res) => {
    console.log("The content of the body is: ");
    const type = req.body.type;
    const ids = req.body.ids.split(', ');
    switch(type){
        case "active":
            await Product.updateMany({_id: {$in: ids}}, {status: "active"});
            req.flash('success', `Change status of ${ids.length} items to active success`);
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids}}, {status: "inactive"});
            req.flash('success', `Change status of ${ids.length} items to inactive success`);
            break;
        case "delete-all":
            await Product.updateMany({_id: {$in: ids}}, {deleted: true, deletedAt: Date.now()});
            req.flash('success', `Delete all ${ids.length} items success`);
        case "change-position":
            for(const item of ids){
                let [id, position] = item.split('-');
                await Product.updateOne({_id: id}, {position: position});
                req.flash('success', `Change the position of ${ids.length} items success`);
            }
            break;
        default:
            break;
    }
    res.redirect('back');
}

module.exports.deleteItem = async (req,res) => {
    const id = req.params.id;
    await Product.deleteOne({_id: id});
    req.flash('success', 'Delete item success');
    res.redirect('back');
}

module.exports.createProduct = async (req,res) =>  {
    res.render('admin/pages/product/create_product', {
        pageTitle: 'Create new product',
    });
}

module.exports.handleCreateProduct = async (req,res) =>  {
    req.body.price = parseInt(req.body.price);
    req.body.discount = parseInt(req.body.discount);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position){
        req.body.position = parseInt(req.body.position);
    }
    else{
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    }

    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

module.exports.editProduct = async (req,res) =>  {
    try{
        const requireFind = {
            deleted: false,
            _id: req.params.id
        }
    
        const product = await Product.findOne(requireFind);
        res.render('admin/pages/product/edit_product', {
            pageTitle: 'Edit new product',
            product: product
        });
    }catch(error){
        ////
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}

module.exports.handleEditProduct = async (req,res) =>  {
    req.body.price = parseInt(req.body.price);
    req.body.discount = parseInt(req.body.discount);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    try{
        await Product.updateOne({_id: req.params.id}, req.body);
        req.flash('success', `Update product success`);
    }catch(error){
        console.log(error);
        req.flash('success', `Update product fail`);
    }
    res.redirect('back');
}

module.exports.detailProduct = async (req,res) =>  {
    try{
        const requireFind = {
            deleted: false,
            _id: req.params.id
        }
    
        const product = await Product.findOne(requireFind);
        res.render('admin/pages/product/detail_product', {
            pageTitle: 'Detail product',
            product: product
        });
    }catch(error){
        ////
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}
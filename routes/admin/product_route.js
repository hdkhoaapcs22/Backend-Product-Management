const express = require('express');
const router = express.Router();
const multer  = require('multer')
const storageMulter = require('../../helper/storage_multer');
const upload = multer({ storage: storageMulter() }); // middleware, which is used to upload file, storage helps make the file can link to the other tab without downloading it
const productValidate = require('../../validates/admin/product_validate'); // middleware
const controller = require('../../controllers/admin/products_controller');

router.get('/', controller.product);

router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMultiStatusProduct);

router.delete('/delete/:id', controller.deleteItem);

router.get('/create', controller.createProduct);
router.post('/handle-create-new-product', upload.single('thumbnail'), productValidate, controller.handleCreateProduct);

router.get('/edit/:id', controller.editProduct);
router.patch('/edit/:id', upload.single('thumbnail'),productValidate, controller.handleEditProduct);

router.get('/detail/:id', controller.detailProduct);

module.exports = router; 

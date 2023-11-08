import {Router} from 'express'
import { addProduct, deleteProduct, getAllProduct, getDetailProduct, updateProduct } from '../controllers/products.js'

const router = Router()
router.get('/products', getAllProduct)
router.post('/products/:id', addProduct)
router.get('/products/:id', getDetailProduct)
router.delete('/products/:id', deleteProduct)
router.put('/products/:id', updateProduct)
// router.get('/products', getAllProduct)
export default router
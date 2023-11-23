import {Router} from 'express'
import { addProduct, deleteProduct, getAllProduct, getDetailProduct, updateProduct } from '../controllers/products.js'

const routerProduct = Router()
routerProduct.get('/', getAllProduct)
routerProduct.post('/', addProduct)
routerProduct.get('/:id', getDetailProduct)
routerProduct.delete('/:id', deleteProduct)
routerProduct.put('/:id', updateProduct)


export default routerProduct
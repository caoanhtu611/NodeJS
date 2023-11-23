import {Router} from 'express'
import { createCategory, deleteCategory, getCategory, getOneCategory, updateCategory } from '../controllers/category.js'


const routerCategory = Router()
routerCategory.get('/', getCategory);
routerCategory.get('/:id', getOneCategory);
routerCategory.post('/', createCategory);
routerCategory.put('/:id', updateCategory);
routerCategory.delete('/:id', deleteCategory);


export default routerCategory
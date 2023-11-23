import { Router } from "express";
import routerProduct from "./product.js";
import routerCategory from "./category.js";
import routerUser from "./user.js";
const router = Router()

router.use("/products",routerProduct)
router.use("/category",routerCategory)
router.use("/user", routerUser)

export default router
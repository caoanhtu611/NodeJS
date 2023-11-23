import Product from "../models/Product.js";
import { validateProduct } from "../validation/productValid.js";

export const getAllProduct = async (req, res) => {
  try {
    const data = await Product.find().populate("categories").exec();

    if (data && data.length) {
      return res.status(200).json({
        message: "Lay danh sach san pham thanh cong!",
        data,
      });
    }

    return res.status(404).json({
      message: "Khong tim thay san pham nao!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server",
    });
  }
};

export const getDetailProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Product.findById(id);
    if (data) {
      return res.status(200).json({
        message: "Lay san pham thanh cong!",
        datas: data,
      });
    }

    return res.status(404).json({
      message: "Khong tim thay san pham!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server",
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const body = req.body;
    const { error } = validateProduct.validate(body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => {
        return err.message;
      });

      res.status(404).json({
        message: errors.join(", "),
      });
    }
    const data = await Product.create(body);
    res.status(200).json({
      message: "them san pham  thanh cong!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Product.findByIdAndDelete(id);
    if (data) {
      return res.status(200).json({
        message: "Xoas san pham thanh cong!",
        data,
      });
    }

    return res.status(404).json({
      message: "Khong tim thay san pham!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const { error } = validateProduct.validate(body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => {
        return err.message;
      });

      return res.status(404).json({
        message: errors.join(", "),
      });
    }

    const data = await Product.findByIdAndUpdate(id, body, { new: true });
    if (data) {
      return res.status(200).json({
        message: "Update thanh cong",
        datas: data,
      });
    }

    return res.status(404).json({
      message: "Khong tim thay san pham!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server",
    });
  }
};

// export const getCategory = async (req, res) => {
//   try {
//    let data = await Category.find().populate("products").exec()

//   res.status(200).json({data})
//   } catch (error) {
//     return res.status(500).json({
//       message: "Loi server",
//     });
//   }
// };

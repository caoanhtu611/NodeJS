import Category from "../models/Category.js";


export const getCategory = async (req, res) => {
    try {
     
      const data = await Category.find().populate('products').exec();
  
      if (data && data.length) {
        return res.status(200).json({
          message: "Lay danh muc san pham thanh cong!",
          data,
        });
      }
  
      return res.status(404).json({
        message: "Khong tim danh muc san pham nao!",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Loi server",
      });
    }
  };

  export const getOneCategory = async (req, res) => {
    try {
     
      const data = await Category.findById(req.params.id).populate('products').exec();
  
      if (!data && data.length==0) {
        return res.status(404).json({
          message: "Khong tim danh muc san pham nao!",
        });
      }
      return res.status(200).json({
        message: "Lay danh muc san pham thanh cong!",
        data,
      });
      
    } catch (error) {
      return res.status(500).json({
        message: "Loi server",
      });
    }
  };

  export const createCategory = async (req, res) => {
    try {
     console.log(req.body);
      const data = await Category.create(req.body);
  
      if (!data && data.length == 0) {
        res.status(400).json({
          message: "Khoi tao danh muc that bai",
        })
      }
      return res.status(200).json({
        message: "Tao danh muc san pham thanh cong!",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Loi server",
      });
    }
  };

  export const deleteCategory = async (req, res) => {
    try {
     
      const data = await Category.findByIdAndDelete(req.params.id);
  
      if (!data && data.length == 0) {
        res.status(400).json({
          message: "khong tim thay danh muc naof",
        })
      }
      return res.status(200).json({
        message: "Xoa danh muc san pham thanh cong!",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Loi server",
      });
    }
  };

  export const updateCategory = async (req, res) => {
    try {
     
      const data = await Category.findByIdAndUpdate( req.params.id, req.body, {new: true});
  
      if (!data && data.length == 0) {
        res.status(400).json({
          message: "Update danh muc that bai",
        })
      }
      return res.status(200).json({
        message: "Update danh muc san pham thanh cong!",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Loi server",
      });
    }
  };
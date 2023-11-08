import axios from "axios";



export const getAllProduct = async (req, res) => {
  try {
    const { data } = await axios.get("http://localhost:3000/products");

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
    const { data } = await axios.get(`http://localhost:3000/products/${id}`);
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

export const addProduct = async(req, res) => {
  try {
    const body = req.body;
    const {data} = await axios.post(`http://localhost:3000/products`, body);
  } catch (error) {
    return res.status(500).json({
      message: "Loi server",
    });
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { data } = await axios.delete(`http://localhost:3000/products/${id}`);
    // fetch API o day
    if (data) {
      return res.status(200).json({
        message: "Xoas san pham thanh cong!",
        data,
      });
    }
    console.log("object");

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
    let name = req.body.name;
    let price = req.body.price;

    const { data } = await axios.put(`http://localhost:3000/products/${id}`, {
      name: name,
      price: price,
    });
    if (data) {
      return res.status(200).json({
        message: "sua thanh cong",
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
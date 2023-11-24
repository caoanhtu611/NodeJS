import User from "../models/user.js";
import { signUpValid, singInValid } from "../validation/userValid.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { error } = signUpValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors.join(", "),
      });
    }
    const checkEmail = await User.findOne({ email: req.body.email });

    if (checkEmail) {
      return res.status(400).json({
        message: "Email da duoc dang ki. Ban co muon dang nhap khong?",
      });
    }

    // Ma hoa password bawng bcryptjs

    const passwordHash = await bcryptjs.hash(req.body.password, 10);
    if (!passwordHash) {
      return res.status(400).json({
        message: "ma hoa PassWord that bai.",
      });
    }
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: passwordHash,
    };
    const data = await User.create(user);

    if (!data) {
      return res.status(400).json({
        message: "Dang Ki That Bai.",
      });
    }
    data.password = undefined;
    return res.status(200).json({
      message: "Dang ki thanh cong!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Đăng Kí Thất Bại!",
      details: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    /**
     * Buoc 1: Validation values
     * Buoc 2: Kiem tra email co ton tai trong he thong khong?
     * Buoc 3: So sanh password
     * Buoc 4: Tao token
     * Buoc 5: Gui token cho nguoi dung
     */
    const error = singInValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    // Buoc 2: Kiem tra email co ton tai trong he thong khong?
    const checkEmail = await User.findOne({ email: req.body.email });
    // Buoc 3: So sanh pass:
    if (!checkEmail) {
      return res.status(400).json({
        message: "Email chua duoc dang ki!",
      });
    }
    const checkPass = await bcryptjs.compare(
      req.body.password,
      checkEmail.password
    );
    console.log(checkPass);
    if (!checkEmail) {
      return res.status(400).json({
        message: "Mat khau khong dung!",
      });
    }
    // Buoc 4: Tao token
    const token = jwt.sign({ _id: checkEmail._id }, "A Ton", {
      expiresIn: "1d",
    });
    if (!token) {
      return res.status(400).json({
        message: "Tao Token that bai!",
      });
    }
    // Buoc 5: Gui token cho nguoi dung
    checkEmail.password = undefined;
    return res.status(200).json({
      message: "Dang nhap thanh cong!",
      accessToken: token,
      user: checkEmail,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const data = await User.find();

    if (data && data.length) {
      return res.status(200).json({
        message: "Lay danh sach nguoi thanh cong!",
        data,
      });
    }

    return res.status(404).json({
      message: "Khong tim nguoi dung nao!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server",
    });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const data = await User.findById(req.params.id);

    if (!data && data.length == 0) {
      return res.status(404).json({
        message: "Khong tim nguoi dung nao!",
      });
    }
    return res.status(200).json({
      message: "Tim thay 1 nguoi dung!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const body = req.body;
    const { error } = validateUser.validate(body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => {
        return err.message;
      });

      res.status(400).json({
        message: errors.join(", "),
      });
    }
    // Check Email
    const checkEmail = await User.findOne({ email: req.body.email });

    if (checkEmail) {
      return res.status(400).json({
        message: "Email da duoc duoc dang ki ban co muon dang nhap khong!",
      });
    }

    // Ma hoa password
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(400).json({
          message: "Ma hoa mat khau that bai!",
        });
      }
      if (hash) {
        const user = {
          username: req.body.username,
          email: req.body.email,
          password: hash,
        };
        const data = await User.create(user);
        if (!data) {
          return res.status(400).json({
            message: "Đăng kí thất bại!",
          });
        }
        data.password = undefined;
        return res.status(200).json({
          message: "Tao nguoi dung thanh cong!",
          data,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Đăng kí thất bại!",
      details: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const data = await User.findByIdAndDelete(req.params.id);

    if (!data && data.length == 0) {
      res.status(400).json({
        message: "khong tim thay nguoi dung nao!",
      });
    }
    return res.status(200).json({
      message: "Xoa nguoi dung thanh cong!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!data && data.length == 0) {
      res.status(400).json({
        message: "Update nguoi dung that bai",
      });
    }
    return res.status(200).json({
      message: "Update nguoi dung thanh cong!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server",
    });
  }
};

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
    },
    categories: [
      { type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export default mongoose.model("product", productSchema);
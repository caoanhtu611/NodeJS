import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    slug: {
      type: String,
    },
    products: [
      { type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export default mongoose.model("category", categorySchema);
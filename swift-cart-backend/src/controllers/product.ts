import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";

// export const newProduct = () =>
//   TryCatch(
//     async (
//       req: Request<{}, {}, NewProductRequestBody>,
//       res: Response,
//       next: NextFunction
//     ) => {
//       const { name, price, stock, category } = req.body;
//       const photo = req.file;

//       console.log("info", name, price, stock, category, photo?.path);

//       await Product.create({
//         name,
//         price,
//         stock,
//         category: category.toLowerCase(),
//         photo: photo?.path,
//       });

//       return res.status(201).json({
//         success: true,
//         message: "Product created successfully",
//       });
//     }
//   );

export const newProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, stock, category } = req.body;
    const photo = req.file;

    if (!photo) return next(new ErrorHandler("Please add photo", 400));

    if (!name || !price || !stock || !category) {
      rm(photo.path, () => {
        console.log("Photo deleted");
      });
      return next(new ErrorHandler("Please enter all Fields", 400));
    }

    await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo.path,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getLatestProducts = TryCatch(async (req, res, next) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);

  return res.status(200).json({ success: true, products });
});

export const getAllCategories = TryCatch(async (req, res, next) => {
  const categories = await Product.distinct("category");

  return res.status(200).json({ success: true, categories });
});

export const getAdminProducts = TryCatch(async (req, res, next) => {
  const products = await Product.find({});

  return res.status(200).json({ success: true, products });
});

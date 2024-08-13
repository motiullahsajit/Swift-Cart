import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import {
  BaseQuery,
  NewProductRequestBody,
  SearchRequestQuery,
} from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
import { nodeCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";

export const getLatestProducts = TryCatch(async (req, res, next) => {
  const { category } = req.query;
  let products;

  const cacheKey =
    category === "latest" ? "latest-products" : `category-${category}-products`;

  if (nodeCache.has(cacheKey)) {
    products = JSON.parse(nodeCache.get(cacheKey) as string);
  } else {
    if (category === "latest") {
      products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    } else {
      products = await Product.find({ category })
        .sort({ createdAt: -1 })
        .limit(5);
    }
    nodeCache.set(cacheKey, JSON.stringify(products));
  }

  return res.status(200).json({ success: true, products });
});

export const getAllCategories = TryCatch(async (req, res, next) => {
  let categories;
  if (nodeCache.has("categories")) {
    categories = JSON.parse(nodeCache.get("categories") as string);
  } else {
    categories = await Product.distinct("category");
    nodeCache.set("categories", JSON.stringify(categories));
  }

  return res.status(200).json({ success: true, categories });
});

export const getAdminProducts = TryCatch(async (req, res, next) => {
  let products;
  if (nodeCache.has("all-products")) {
    products = JSON.parse(nodeCache.get("all-products") as string);
  } else {
    products = await Product.find({});
    nodeCache.set("all-products", JSON.stringify(products));
  }

  return res.status(200).json({ success: true, products });
});

export const getSingleProduct = TryCatch(async (req, res, next) => {
  let product;
  const id = req.params.id;
  if (nodeCache.has(`product-${id}`)) {
    product = JSON.parse(nodeCache.get(`product-${id}`) as string);
  } else {
    product = await Product.findById(id);
    if (!product) return next(new ErrorHandler("Product Not Found", 404));
    nodeCache.set(`product-${id}`, JSON.stringify(product));
  }

  return res.status(200).json({ success: true, product });
});

export const newProduct = TryCatch(
  async (
    req: Request<{}, {}, NewProductRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, price, stock, category, description } = req.body;
    const photo = req.file;

    if (!photo) return next(new ErrorHandler("Please add Photo", 400));

    if (!name || !price || !stock || !category || !description) {
      rm(photo.path, () => {
        console.log("Deleted");
      });

      return next(new ErrorHandler("Please enter All Fields", 400));
    }

    await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      description,
      photo: photo.path,
    });

    invalidateCache({ product: true, admin: true });

    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
    });
  }
);

export const updateProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { name, price, stock, category } = req.body;
  const photo = req.file;
  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  if (photo) {
    rm(product.photo, () => {
      console.log("Old Photo Deleted");
    });

    product.photo = photo.path;
  }

  if (name) product.name = name;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category) product.category = category;

  await product.save();
  invalidateCache({
    product: true,
    productId: String(product._id),
    admin: true,
  });

  return res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
  });
});

export const deleteProduct = TryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  rm(product.photo, () => {
    console.log("Product Photo Deleted");
  });
  await product.deleteOne();
  invalidateCache({
    product: true,
    productId: String(product._id),
    admin: true,
  });

  return res
    .status(200)
    .json({ success: true, message: "Product Deleted Successfully" });
});

export const getAllProducts = TryCatch(
  async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
    const { search, sort, category, price } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;

    const baseQuery: BaseQuery = {};

    if (search)
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };

    if (price) baseQuery.price = { $lte: Number(price) };

    if (category) baseQuery.category = category;

    const productsPromise = Product.find(baseQuery)
      .sort(sort && { price: sort === "asc" ? 1 : -1 })
      .limit(limit)
      .skip(skip);

    const [products, filteredOnlyProduct] = await Promise.all([
      productsPromise,
      Product.find(baseQuery),
    ]);

    const totalPage = Math.ceil(filteredOnlyProduct.length / limit);

    return res.status(200).json({ success: true, products, totalPage });
  }
);

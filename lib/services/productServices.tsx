//function to load data from database
import { cache } from 'react'
import dbConnect from '../dbConnect'
import ProductModel, { Product } from '../models/ProductModel'

//we use cache to cache te database query result and prevent multiple hitting database

export const revalidate = 3600 //the cache value will be updated every 1 hour

const getLatest = cache(async () => {
  await dbConnect()
  const products = await ProductModel.find({}).sort({ _id: -1 }).limit(4).lean() //sort based in id in deccending order so we call the latest product first, limit 4 to get first 4 results only and use lean to convert result to plain javascript
  return products as Product[]
})

const getFeatured = cache(async () => {
  await dbConnect()
  const products = await ProductModel.find({ isFeatured: true }).limit(3).lean()
  return products as Product[]
})

const getBySlug = cache(async (slug: string) => {
  await dbConnect()
  const product = await ProductModel.findOne({ slug }).lean()
  return product as Product
})
const productService = {
  getLatest,
  getFeatured,
  getBySlug,
}
export default productService

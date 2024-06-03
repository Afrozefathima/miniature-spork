import data from '@/lib/data'
import dbConnect from '@/lib/dbConnect'
import ProductModel from '@/lib/models/ProductModel'
import UserModel from '@/lib/models/UserModel'
import { NextResponse } from 'next/server'

export const GET = async (request: NextResponse) => {
  const { users, products } = data
  await dbConnect()
  await UserModel.deleteMany() //deletes all te records in user collections
  await UserModel.insertMany(users)
  await ProductModel.deleteMany()
  await ProductModel.insertMany(products)

  return NextResponse.json({
    message: 'seeded successfully',
    users,
    products,
  })
}

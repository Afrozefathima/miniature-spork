export const round2 = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100
//we use math to convert number to decimal points. we use this function to round the prices in the shopping cart

export function convertDocToObj(doc: any) {
  doc._id = doc._id.toString()
  return doc
}

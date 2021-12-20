import { CarTypes } from './const'

export type CartTypesType = {
  id: number
  name: string
}

export const getCartTypeById = (cartTypeId: number) => {
  const [carType] = CarTypes.filter( (cartType: CartTypesType) => cartType.id === cartTypeId )
  return carType ? carType.name : '-'
}

export const formatDataPayload = (data: any) => {
  let content:any = []
  if (data.length === 0) return []

  data.map((item: any) => {
    item.payload.id = item.id
    return content.push(item.payload)
  })

  return content
}
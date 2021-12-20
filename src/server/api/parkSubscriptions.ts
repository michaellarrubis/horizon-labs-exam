import axios from 'axios'
import { ContentItemTypes } from '../../components/ContentItem/types'
require('dotenv').config()

const API_URL = `${process.env.REACT_APP_API_URL}`

const getAllParkSubscriptions = async () => {
  return await axios.get(`${API_URL}/parking-subscriptions`)
}

const getParkSubscriptionById = async (parkSubscriptionId: number) => {
  return await axios.get(`${API_URL}/parking-subscriptions/${parkSubscriptionId}`)
}

const upsertParkSubscription = async (payload: ContentItemTypes) => {
  if (payload.id) return await axios.put(`${API_URL}/parking-subscriptions/${payload.id}`, { payload })
  return await axios.post(`${API_URL}/parking-subscriptions`, { payload })
}

const deleteParkSubscription = async (parkSubscriptionId: number) => {
  return await axios.delete(`${API_URL}/parking-subscriptions/${parkSubscriptionId}`)
}

const deleteBulkParkSubscription = async (payload: ContentItemTypes[]) => {
  return Promise.all(payload.map(item => deleteParkSubscription(Number(item.id))))
}

export {
  getAllParkSubscriptions,
  getParkSubscriptionById,
  upsertParkSubscription,
  deleteParkSubscription,
  deleteBulkParkSubscription
}
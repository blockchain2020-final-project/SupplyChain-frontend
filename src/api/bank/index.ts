/* eslint-disable */

import * as api from './api'
import http from '@/util/http'

export function getReceipts (addr: string) {
  return http.get(`${api.getReceipts}/${addr}/receipts`)
}

export function getBank (addr: string) {
  return http.get(`${api.getReceipts}/${addr}`)
}

export function registerBank (bank_address: string, bank_name: string) {
  return http.post(api.createBank, {
    bank_address,
    bank_name
  })
}

export function getAllBanks () {
  return http.get(api.getAllBank)
}

export function sendCredit (bank_address: string, amount: number) {
  return http.post(api.sendCredit, {
    bank_address,
    amount
  })
}

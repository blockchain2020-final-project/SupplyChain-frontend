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

export function getAllFinances (addr: string) {
  return http.get(`${api.getAllFinances}/${addr}/unsettledfinances`)
}

export function getAllFinanceAsks (addr: string) {
  return http.get(`${api.getAllFinanceAsks}/${addr}/finances`)
}

export function deposite (addr: string, amount: number) {
  return http.post(api.deposite, {
    companyAddr: addr,
    amount
  })
}

export function withdraw (addr: string, amount: number) {
  return http.post(api.withdraw, {
    companyAddr: addr,
    amount
  })
}

export function response (body: any) {
  return http.post(api.respond, body)
}

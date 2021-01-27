/* eslint-disable */

import * as api from './api'
import http from '@/util/http'

export function createTransaction (body: {
  sellerAddr: string,
  amount: string,
  deadline: string,
  tMode: string,
  oriReceiptId: string
}) {
  return http.post(api.createTransaction, body)
}

export function getCoreCompany (addr: string) {
  return http.get(`${api.getCoreCompany}/${addr}`)
}

export function createCoreCompany (company_address: string, company_name: string) {
  return http.patch(api.createCoreCompany, {
    company_name,
    company_address
  })
}

export function getAllCoreCompany () {
  return http.get(api.getAllCoreCompany)
}

export function getAllTransactions (addr: string) {
  return http.get(`${api.getAllTransactions}/${addr}/transactions`)
}

export function getAllReceipt (addr: string) {
  return http.get(`${api.getAllReceipts}/${addr}/receipts`)
}

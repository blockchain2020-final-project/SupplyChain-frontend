/* eslint-disable */

import * as api from './api'
import http from '@/util/http'

export function createTransactionNew (body: {
  payeeAddr: string,
  amount: number,
  deadline: number,
  info: string
}) {
  return http.post(api.createTransactionNew, body)
}

export function createTransactionOld (body: {
  payeeAddr: string,
  amount: number,
  deadline: number,
  info: string,
  oriReceiptId: string
}) {
  return http.post(api.createTransactionOld, body)
}

export function getCoreCompany (addr: string) {
  return http.get(`${api.getCoreCompany}/${addr}`)
}

export function createCoreCompany (company_address: string, company_name: string) {
  return http.post(api.createCoreCompany, {
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
  return http.get(`${api.getAllReceipts}/${addr}/unsettledreceipts`)
}

export function createFinance (body: any) {
  return http.post(api.createFinance, body)
}

export function getAllFinance (addr: string) {
  return http.get(`${api.getAllFinance}/${addr}/unpaidfinances`)
}

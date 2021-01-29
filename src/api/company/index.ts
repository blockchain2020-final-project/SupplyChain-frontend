/* eslint-disable */

import * as api from './api'
import http from '@/util/http'

export function getCompany (addr: string) {
  return http.get(`${api.getCompany}/${addr}`)
}

export function createCompany (company_address: string, company_name: string) {
  return http.post(api.createCompany, {
    company_address,
    company_name
  })
}

export function getAllCompanies () {
  return http.get(api.getAllCompanies)
}

export function getAllTransactions (addr: string) {
  return http.get(`${api.getAllTransactions}/${addr}/transactions`)
}

export function createFinance (body: any) {
  return http.post(api.createFinance, body)
}

export function getAllFinances (addr: string) {
  return http.get(`${api.getAllFinance}/${addr}/unpaidfinances`)
}

export function getAllReceipts (addr: string) {
  return http.get(`${api.getAllReceipts}/${addr}/unsettledreceipts`)
}

export function getAllReceiptsShouldPaid (addr: string) {
  return http.get(`${api.getAllReceipts}/${addr}/unpaidreceipts`)
}

export function createTransactionNew (body: any) {
  return http.post(api.createTransactionNew, body)
}

export function createTransactionOld (body: any) {
  return http.post(api.createTransactionOld, body)
}

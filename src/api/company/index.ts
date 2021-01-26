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

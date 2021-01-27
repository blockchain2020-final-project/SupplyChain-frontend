/* eslint-disable */
import * as api from './api'
import http from '@/util/http'

export function getCertifier (addr: string) {
  return http.get(`${api.getCertifier}/${addr}`)
}

export function createCertifier (cert_address: string, cert_name: string) {
  return http.post(api.createCertifier, {
    cert_address,
    cert_name
  })
}

export function getAllCertifiers () {
  return http.get(api.getAllCertifiers)
}

export function sendCredit (core_company_address: string, amount: number) {
  return http.post(api.sendCredit, {
    core_company_address,
    amount
  })
}

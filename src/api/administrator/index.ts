/* eslint-disable */

import * as api from './api'
import http from '@/util/http'

export function getInfo (address: undefined | string) {
  let url = ''
  if (address) {
    url = `${api.getAdministratorInfo}/${address}`
  } else {
    url = api.info
  }

  return http.get(url)
}

export function regist (addr: string) {
  return http.post(api.registerAdministrator, {
    addr
  })
}

export function recycleCredit (bank_address: string, amount: number) {
  return http.post(api.recycleCredit, {
    bank_address,
    amount
  })
}

export function sendCredit (bank_address: string, amount: number) {
  return http.post(api.sendCredit, {
    bank_address,
    amount
  })
}

export function deposite (bankAddr: string, amount: number) {
  return http.post(api.deposite, {
    bankAddr,
    amount
  })
}

export function withdraw (bankAddr: string, amount: number) {
  return http.post(api.withdraw, {
    bankAddr,
    amount
  })
}

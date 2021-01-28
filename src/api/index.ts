import * as administrator from './administrator'
import * as bank from './bank'
import * as certifier from './certifier'
import * as api from './api'
import * as company from './company'
import * as coreCompany from './core-company'
import http from '@/util/http'

const user = {
  login: (addr: string, type: string) => {
    return http.post(api.login, {
      addr,
    })
  }
}

export default {
  administrator,
  bank,
  certifier,
  user,
  company,
  coreCompany
}

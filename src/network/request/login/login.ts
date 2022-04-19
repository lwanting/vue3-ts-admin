import myRequest from '@/network'
import { Account, DataType, LoginResult } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  UserInfo = '/users',
  UserMenus = '/role'
}

export function accountLoginRequest(account: Account) {
  return myRequest.post<DataType<LoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return myRequest.get<DataType>({
    url: LoginAPI.UserInfo + '/' + id
  })
}

export function requestUserMenusById(id: number) {
  return myRequest.get<DataType>({
    url: LoginAPI.UserMenus + '/' + id + '/menu'
  })
}

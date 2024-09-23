import axios from 'axios'
import { HttpException } from './HTTPException'
import { JWTToken } from './JWTToken'

export class Request {
  private apiPath: string
  private jwt: JWTToken

  constructor(publicKey: string, defaultUserId: string, secretKey: string, apiPath?: string) {
    this.jwt = new JWTToken(publicKey, defaultUserId, secretKey)
    this.apiPath = apiPath
  }

  async get(path: string, params: any, optional?: { userId?: string }) {
    try {
      const userJWT = this.jwt.get(optional.userId)
      const result = await axios.get(`${this.apiPath}/${path}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${userJWT}`,
        },
        params,
      })
      return result.data
    } catch (cause) {
      throw new HttpException(cause.response.data.error, cause.response.data.statusCode)
    }
  }

  async post(path: string, body: any, optional?: { userId: string }) {
    try {
      const userJWT = this.jwt.get(optional.userId)
      const result = await axios.post(`${this.apiPath}/${path}`, body, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${userJWT}`,
        },
      })
      return result.data
    } catch (cause) {
      throw new HttpException(cause.response.data.error, cause.response.data.statusCode)
    }
  }

  async put(path: string, body: any, optional?: { userId: string }) {
    try {
      const userJWT = this.jwt.get(optional.userId)
      const result = await axios.put(`${this.apiPath}/${path}`, body, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${userJWT}`,
        },
      })
      return result.data
    } catch (cause) {
      throw new HttpException(cause.response.data.error, cause.response.data.statusCode)
    }
  }

  async delete(path: string, body: any, optional?: { userId: string }) {
    const userJWT = this.jwt.get(optional.userId)

    const result = await axios.delete(`${this.apiPath}/${path}`, {
      data: body,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userJWT}`,
      },
    })

    return result.data
  }
}

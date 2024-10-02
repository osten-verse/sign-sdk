const jwt = require('jsonwebtoken')
export class JWTToken {
  private publicKey: string
  private defaultUserId: string
  private secretKey: string
  private defaultTokens: Record<string, string> = {}

  constructor(publicKey: string, defaultUserId: string, secretKey: string) {
    this.defaultUserId = defaultUserId
    this.publicKey = publicKey
    this.secretKey = secretKey
  }

  generate(userId: string, time: string) {
    const payload = {
      publicKey: this.publicKey,
      moreInfo: { userId },
    }

    const options = time === '5m' ? { expiresIn: '5m' } : {}
    return jwt.sign(payload, this.secretKey, options)
  }

  get(userId?: string) {
    const id = userId || this.defaultUserId
    if (this.defaultTokens[id]) return this.defaultTokens[id]
    this.defaultTokens[id] = this.generate(userId || this.defaultUserId, 'notExpired')
    return this.defaultTokens[id]
  }
}

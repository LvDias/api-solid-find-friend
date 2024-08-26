export class EmailAlreadyExist extends Error {
  constructor() {
    super('❌ this email already exist!')
  }
}

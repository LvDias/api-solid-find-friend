export class PhoneAlreadyExist extends Error {
  constructor() {
    super('❌ this phone already exist!')
  }
}

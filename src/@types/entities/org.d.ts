export interface OrgRequestInterface {
  id?: string
  name: string
  phone: string
  email: string
  password: string
  address: string
  created_at?: Date
}

export interface OrgResponseInterface {
  id: string
  name: string
  phone: string
  email: string
  password: string
  address: string
  created_at: Date
}

export interface PetRequestInterface {
  id?: string
  name: string
  description: string
  org_id: string
  created_at?: Date
}

export interface PetResponseInterface {
  id: string
  name: string
  description: string
  org_id: string
  created_at: Date
}

export interface TaskData {
    id: string
    type: string
    attributes: Attributes
    relationships: Relationships
  }
  
  export interface Attributes {
    title: string
    description: string
    due_date: string
    priority: string
    remainder: string
    attachment: any
    group: string
    created_at: string
    updated_at: string
    status: string
    tags: any[]
  }
  
  export interface Relationships {
    user: User
    status: Status
  }
  
  export interface User {
    data: Data
  }
  
  export interface Data {
    id: string
    type: string
  }
  
  export interface Status {
    data: Daum[]
  }
  
  export interface Daum {
    id: string
    type: string
  }
  
export interface Task {
  id: number
  title: string
  detail: string
  done: boolean
  priority: 'alta' | 'media' | 'baja'
}

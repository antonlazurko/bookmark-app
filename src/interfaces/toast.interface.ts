export type ToastType = 'success' | 'warning' | 'error'

export interface IToast {
  id: number
  type: ToastType
  message: string
  /** Display time in ms; 0 keeps the toast until closed manually */
  duration: number
}

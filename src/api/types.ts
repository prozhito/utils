export type TProcessing = {
  id: number
  item: number
  item_title: string
  item_id: number
  method: number
  source_type: number
  status: number
  tags: number[]
  notes: string
  date: string | null
  is_main: boolean
  images: number[]
  zip: string | null
  zip_preview: string | null
}

export type TImage = {
  id: number
  uuid: string
  copy: number
  order: number
  original_filename: string
  created_at: string
  img_250: string
}

export type TCopyInfo = {
  id: number
  item: number
  item_title: string
  item_id: number
  method: number
  other_copies_of_this_item: number[]
  total_size: number
  source_type: number
  status: number
  tags: number[]
  notes: string
  date: string | null
  is_main: boolean
  images: number[]
  images_count: number
  zip: string | null
  zip_preview: string | null
}

export type TImageInfo = {
  id: number
  uuid: string
  copy: number
  order: number
  original_filename: string
  created_at: string
  img_250: string
  rotation: number
  error?: string
}

export type TCopyStatus = {
  id: number
  title: string
}

export type TCopyStatusResponse = {
  count: number
  next: string | null
  previous: string | null
  results: TCopyStatus[]
}

export type TUpdateCallback<T> = ({ data, error }: { data?: T; error?: string }) => void

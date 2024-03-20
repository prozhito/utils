import React from 'react'
import { Image as AntImage } from 'antd'

const IMG_SIZE = 280

type TTableImageProps = {
  src: string
  rotation: number
}

export const TableImage: React.FC<TTableImageProps> = ({ src, rotation }) => {
  const [imageAspectRatio, setImageAspectRatio] = React.useState(1)
  const [imageError, setImageError] = React.useState<string | null>(null)
  const { width, height } =
    imageAspectRatio > 1 ? { width: IMG_SIZE / imageAspectRatio, height: IMG_SIZE } : { width: IMG_SIZE, height: IMG_SIZE * imageAspectRatio }

  React.useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setImageAspectRatio(img.height / img.width)
    img.onerror = () => setImageError('Loading error (500)')
  }, [])

  if (imageError) return imageError

  return (
    <div className={`table__img table__img_${rotation}`}>
      <AntImage width={width} height={height} src={src} />
    </div>
  )
}

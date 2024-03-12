import * as Icons from '~/view/ui/icons/rotate'
import './rotate.css'

export function RotateButton({ direction }: { direction: 'left' | 'right' | 'turn' }) {
  const Icon = direction === 'left' ? Icons.RotateLeft : direction === 'right' ? Icons.RotateRight : Icons.ColumnHeight
  return (
    <div className="table__rotate_btn">
      <Icon size={'1.5em'} />
      <div className="consumer" data-dir={direction}></div>
    </div>
  )
}

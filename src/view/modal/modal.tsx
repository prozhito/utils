import React from 'react'
import styles from './.module.css'

const closeImg = '/icon/close.svg'

type TModal = ({ children }: { children?: React.ReactNode }) => React.JSX.Element
interface IModal extends TModal {
  Show: (children?: React.ReactNode) => void
}
type TState = { visible: boolean; children: React.ReactNode | null }

export const Modal: IModal = (() => {
  const func: { [k in string | symbol]: React.Dispatch<React.SetStateAction<TState>> } = {}

  const modal = ({ children }: { children?: React.ReactNode }) => {
    const [state, setState] = React.useState<TState>({ visible: false, children })
    func.setState = setState

    const handleClick = (event: React.MouseEvent) => {
      if (!state.visible) return
      const { target, currentTarget } = event
      if (target === currentTarget) {
        event.preventDefault()
        closeModal()
      }
    }

    const closeModal = () => setState(prev => ({ ...prev, visible: false }))

    return (
      <div className={state.visible ? styles.modal__outer : styles.modal__outer_hidden} onClick={handleClick}>
        <div className={styles.modal__wrapper}>
          <div className={styles.modal__close} onClick={closeModal}>
            <img src={closeImg} alt={'close'} />
          </div>
          <div className={styles.modal__inner}>{state.children}</div>
        </div>
      </div>
    )
  }

  modal.Show = (children?: React.ReactNode) => {
    if (children && func.setState) func.setState({ visible: true, children })
    else if (func.setState) func.setState(prev => ({ ...prev, visible: true }))
  }

  return modal
})()

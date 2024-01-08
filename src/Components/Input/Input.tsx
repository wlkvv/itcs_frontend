import React, { useCallback } from "react"
import styles from "./input.module.scss"
import classNames from "classnames"
import debounce from "lodash.debounce"

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value?: string
  onChangeValue: (value: string) => void
  searchValue: string
  className?: string
}

const Input: React.FC<InputProps> = ({
  onChangeValue,
  searchValue,
  className,
}) => {
  const onUpdateSearch = useCallback(
    debounce((str) => {
      onChangeValue(str)
    }, 0),
    []
  )

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSearch(event.target.value)
  }


  return (
    <div className={classNames(styles["input"], className)}>
      <form>
        <input
          value={searchValue}
          onChange={onChangeInput}
          className={styles.input__block}
          type="text"
          placeholder="Поиск по заказчикам..."
        ></input>
      </form>
    </div>
  )
}

export default Input

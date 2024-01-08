import React from "react"
import ServiceEdit from "../../Components/ServiceEdit/ServiceEdit"
import styles from "./serviceedit.scss"

const ServiceEditor = () => {
  return (
    <div className={styles["option-edit_page"]}>
      <ServiceEdit />
    </div>
  )
}

export default ServiceEditor

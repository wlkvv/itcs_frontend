import OrdersPage from "../../Components/OrdersPage/OrdersPage.tsx";

import styles from "./OrdersPage.module.scss";
const ApplicationsHistoryPage = () => {
  return (
    <div className={styles.historypage}>
      <OrdersPage />
    </div>
  );
};

export default ApplicationsHistoryPage;

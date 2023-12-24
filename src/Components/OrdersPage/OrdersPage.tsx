import React, { useEffect, useState } from "react";
import { useTable, Column } from "react-table";
import axios from "axios";
import { Response } from "../../utils/types.ts";
import moment from "moment";
import styles from "../../Components/OrdersPage/OrdersPage.scss";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import {useToken} from "../../hooks/users/useToken.ts";
const cookies = new Cookies();



const OrdersPage = () => {
  const [application, setApplication] = useState([]);
  const {access_token} = useToken();
  const fetchAppsData = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response: Response = await axios(
        `http://176.57.215.76:8000/api/orders/`,
        {
          method: "GET",
          withCredentials: true,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: access_token,
          },
        }
      );
      if (response.status == 200) {
        setApplication(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAppsData();
  }, []);

  const data = application;
  const columns: Array<Column<{}>> = React.useMemo(
    () => [
      {
        Header: "№",
        accessor: "id",
      },
      {
        Header: "Статус",
        accessor: "status",
        Cell: ({ value }) => {
          let statusText = "";
          switch (value) {
            case 1:
              statusText = "Черновик";
              break;
            case 2:
              statusText = "Проверяется";
              break;
            case 3:
              statusText = "Принято";
              break;
            case 4:
              statusText = "Отказано";
              break;
            case 5:
              statusText = "Удалено";
              break;
            default:
              statusText = "";
          }
          return <span>{statusText}</span>;
        },
      },
      {
        Header: "Дата создания",
        accessor: "date_created",
        Cell: ({ value }) => (
          <span>
            {value ? moment(value).format("DD.MM.YYYY HH:mm") : "Нет информации"}
          </span>
        ),
      },
      {
        Header: "Дата формирования",
        accessor: "date_of_formation",
        Cell: ({ value }) => (
          <span>
            {value ? moment(value).format("DD.MM.YYYY HH:mm") : "Нет информации"}
          </span>
        ),
      },
      {
        Header: "Дата завершения",
        accessor: "date_complete",
        Cell: ({ value }) => (
          <span>
            {value ? moment(value).format("DD.MM.YYYY HH:mm") : "Нет информации"}
          </span>
        ),
      },
      {
        Header: "Действие",
        Cell: ({ cell }) => (
          <Link
            style={{
              textDecoration: "underline",
              color: "black",
            }}
            to={`/orders/${cell.row.values.id}`}
          >
            Подробнее&gt;
          </Link>
          // <Button onClick={() => console.log("aaa")}>Открыть</Button>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className={styles.content}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;

import React, { useEffect, useState } from "react";
import { useTable, Column } from "react-table";
import axios from "axios";
import { Response } from "../../utils/types.ts";
import moment from "moment";
import styles from './OrdersPage.scss';
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import {useToken} from "../../hooks/users/useToken.ts";
import {useAuth} from "../../hooks/users/useAuth";
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import Input from "../Input/Input.tsx";
import { setDateRange } from "../../store/dataRangeSlice.tsx";
import { DateRange, DateRangePicker } from "react-date-range"
import { ru } from "date-fns/locale"
import {
  setAppDropdownValueId,
  setAppDropdownValueName,
  setAppInputValue,
} from "../../store/moderAppSlice"
import { useDispatch, useSelector } from "react-redux"
//import { applicationData } from "../../types"
import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import { RootState } from "../../store/store"
import Option from "../../Types.ts";
import { Order } from "../../Types.ts";
import { STATUSES } from "../../Consts.ts";
import { RangeKeyDict } from "react-date-range"
import { toast } from "react-toastify"

const cookies = new Cookies();



const OrdersPage = () => {
  const [application, setApplication] = useState([]);
  const {access_token} = useToken();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const dateRange = useSelector((state: RootState) => state.dateRange);
  const selectedStatus = useSelector(
    (state: RootState) => state.moderApp.dropdown_value.id
  )
  const searchValue = useSelector(
    (state: RootState) => state.moderApp.input_value
  )
  const categoryValue = useSelector(
    (state: RootState) => state.moderApp.dropdown_value
  )
  const handleSelect = (selectedOption: Option) => {
    dispatch(setAppDropdownValueName(selectedOption.name))
    dispatch(setAppDropdownValueId(selectedOption.id))
  }
  const {is_authenticated, is_moderator, user_name, auth} = useAuth()
  const fetchAppsData = async () => {
    try {
      const params = `?start_day=${startDate}&end_day=${endDate}&category=${encodeURIComponent(
        categoryValue.id
      )}`
      axios.defaults.withCredentials = true;
      if (is_moderator) {
        const response: Response = await axios(
          `http://176.57.215.76:8000/api/orders/${params}`,
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
          const sortedApplications = response.data.sort(
            (a: { created_at: Date }, b: { created_at: Date }) => {
              const dateA = new Date(a.created_at).getTime()
              const dateB = new Date(b.created_at).getTime()
              return dateB - dateA // for descending order
            }
          )
         // console.log(response.data)
          setApplication(sortedApplications)
        }
        //console.log(response.data)
      } else {
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
          const sortedApplications = response.data
          //console.log(response.data)
          setApplication(sortedApplications)
        }
        //console.log(response.data)
      }
      const response: Response = await axios(
        `http://176.57.215.76:8000/api/orders/${params}`,
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
        const sortedApplications = response.data.sort(
          (a: { created_at: Date }, b: { created_at: Date }) => {
            const dateA = new Date(a.created_at).getTime()
            const dateB = new Date(b.created_at).getTime()
            if (dateB == dateA) {
              return dateB
            } else {
              return dateB - dateA // for descending order
            }
          }
        )
        //console.log(response.data)
        setApplication(sortedApplications)
      }
      //console.log(response.data)
    } catch (e) {
      //console.log(e)
    }
  }
  const handleStatusChange = (statusId) => {
    dispatch(setAppDropdownValueId(statusId));
    const selectedStatusOption = STATUSES.find(option => option.id === statusId);
    dispatch(setAppDropdownValueName(selectedStatusOption ? selectedStatusOption.name : ''));
    // Здесь может быть вызов функции для обновления данных, если это необходимо
  };
  useEffect(() => {
    setStartDate(dateRange.startDate);
    setEndDate(dateRange.endDate);
    // fetchAppsData()
    const intervalId = setInterval(() => {
      fetchAppsData()
    }, 3000)
    moment.locale("ru")
    return () => clearInterval(intervalId)
  }, [categoryValue, startDate, endDate])

  const data = application.filter((item) =>
    item.customer_email
      .toString()
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  )
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
        Header: "Информация",
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
        ),
      },
      {
        Header: "Срок выполнения заказа",
        accessor: "deadline",
        Cell: ({ value }) => (
          <span>
            {value ? String(value) : "Нет информации"}
          </span>
        ),
      },
      ...(is_moderator
        ? [
            {
              Header: "Заказчик",
              accessor: "customer_email",
              Cell: ({ value }) => <span>{value}</span>,
            },
          ]
        : []),
        ...(is_moderator
          ? [
              {
                Header: "Действия",
                accessor: "hhh",
                Cell: ({ row }) => 
                <div>
                  <button className="actionButton" onClick={() => handleAction(row.original.id, 3)} title="Принять заказ"><FaCheck className="actionIcon" /></button>
                  <button className="actionButton" onClick={() => handleAction(row.original.id, 4)} title="Отклонить заказ"><FaTimes className="actionIcon" /></button>
                  </div>
              },
            ]
          : []),
        
    ],
    [is_moderator]
  );

  const handleAction = async (orderId, statusId) => {
    const updatedData = {
      status: statusId,
    };
    try {
      const response = await axios(
        `http://176.57.215.76:8000/api/orders/${orderId}/update_status_admin/`,
        {
          method: "PUT",
          data: updatedData,
          withCredentials: false,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: access_token,
          },
        }
      );
      if (response.status === 200) {
        //fetchAppsData(); // Обновляем данные после выполнения действия
      }
      // Обработка ответа, включая toast-уведомления и навигацию
    } catch (e) {
      //console.log(e);
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  useTable({ columns, data }); // Используйте отфильтрованные данные

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  }

  const handleSelectDateRange = (date: RangeKeyDict) => {
    if (
      !date.selection ||
      !date.selection.startDate ||
      !date.selection.endDate
    ) {
      return
    }

    // let filtered = applicationRange.filter((product) => {
    //   let productDate = new Date(product["created_at"])
    //   return (
    //     productDate >= date.selection.startDate &&
    //     productDate <= date.selection.endDate
    //   )
    // })
    setStartDate(date.selection.startDate)
    setEndDate(date.selection.endDate)
    // setApplication(filtered) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //console.log(startDate)
    //console.log(endDate)
    dispatch(setDateRange({
      startDate: date.selection.startDate,
      endDate: date.selection.endDate
    }));
  }


  return (
    <>
      {is_moderator && (
        <div className="filters">
          <div className="inputContainer">
            <Input
              className="input"
              searchValue={searchValue}
              onChangeValue={(i) => dispatch(setAppInputValue(i))}
            />
            <div className="statusButtons">
              {STATUSES.map((status) => (
                <button
                  key={status.id}
                  className={`statusButton ${selectedStatus === status.id ? 'active' : ''}`}
                  onClick={() => handleStatusChange(status.id)}
                >
                  {status.name}
                </button>
              ))}
            </div>
          </div>

          <DateRange
            locale={ru}
            showDateDisplay={false}
            className="date"
            rangeColors={["#474a51", "#474a55", "#474a59"]}
            ranges={[selectionRange]}
            onChange={handleSelectDateRange}
          />
        </div>
      )}

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
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrdersPage;
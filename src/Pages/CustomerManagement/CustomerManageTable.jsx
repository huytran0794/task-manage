import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomerAvatarInfo from "../../core/Components/TableAvatar/CustomerAvatarInfo";
import CUSTOMER_SERVICE from "../../core/services/customerServ";
import CustomerActionButtons from "./CustomerActionButtons";

const CustomerManageTable = ({ search }) => {
  const [customerList, setCustomerList] = useState([]);
  let location = useLocation();
  //   fetch api
  useEffect(() => {
    let returnedData = [];
    CUSTOMER_SERVICE.getCustomerList()
      .then((res) => {
        if (search) {
          if (/^\d+$/.test(search)) {
            returnedData = res.filter(
              (customer) => customer.sdt.indexOf(search) > -1
            );
          } else {
            returnedData = res.filter(
              (customer) => customer.fullname.toLowerCase().indexOf(search) > -1
            );
          }
        } else {
          returnedData = res.map((item, idx) => ({
            key: idx,
            ...item,
          }));
        }
        console.log("returnedData");

        console.log(returnedData);
        setCustomerList(returnedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search]);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      className: "fullname",
      render: (_, customer) => <CustomerAvatarInfo customerData={customer} />,
      width: "20%",
    },
    {
      title: "Phone",
      dataIndex: "sdt",
      className: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      className: "address",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, customer) => {
        if (location.pathname === "/manager") {
          return <CustomerActionButtons customerData={customer} />;
        } else {
          return (
            <a href={`tel:${customer.sdt}`}>
              <img
                src="https://templates.envytheme.com/joxi/default/assets/images/icon/call-2.svg"
                alt=""
              />
            </a>
          );
        }
      },
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Table
      showHeader={false}
      rowKey={(customer) => customer.id.toString()}
      columns={columns}
      dataSource={customerList}
      pagination={false}
      className="customer-manage-table"
    />
  );
};

export default CustomerManageTable;

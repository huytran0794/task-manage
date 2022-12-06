import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomerAvatarInfo from "../../core/Components/TableAvatar/CustomerAvatarInfo";
import USER_SERVICE from "../../core/services/userServ";
import UserActionButtons from "./UserActionButtons";

const UserManageTable = () => {
  const [userList, setUserList] = useState([]);
  // fetch api
  useEffect(() => {
    let returnedData = [];
    USER_SERVICE.getUserInfo()
      .then((res) => {
        returnedData = res.map((item, idx) => ({
          key: idx,
          ...item,
        }));
        setUserList(returnedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "username",
      className: "username font-semibold text-[#292d32] text-base",
      width: "20%",
    },
    {
      title: "Phone",
      dataIndex: "sdt",
      className: "sdt text-[#292d32] text-base",
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, user) => {
        console.log("user");
        console.log(user);
        return <UserActionButtons userData={user} />;
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
      rowKey={(user) => user.id.toString()}
      columns={columns}
      dataSource={userList}
      pagination={false}
      className="user-manage-table"
    />
  );
};

export default UserManageTable;

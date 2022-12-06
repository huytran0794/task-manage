import React from "react";

import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import { FileTextOutlined } from "@ant-design/icons";

const UserTaskTrackingActionButtons = ({ taskData }) => {
  const navigate = useNavigate();
  const handleViewTaskDetail = (taskData) => {
    navigate(`/user/task-tracking/detail/${taskData.id}`);
  };
  const renderButtons = () => {
    return (
      <Space size={"middle"} align={"center"} className="btn-actions">
        <FileTextOutlined
          onClick={() => handleViewTaskDetail(taskData)}
          className="cursor-pointer text-[#3F80FD]"
          size={"30px"}
        />
      </Space>
    );
  };
  return <div>{renderButtons()}</div>;
};

export default UserTaskTrackingActionButtons;

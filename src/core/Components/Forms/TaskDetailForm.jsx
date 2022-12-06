import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Label from "./Label/Label";
import TextArea from "antd/es/input/TextArea";
import CUSTOMER_SERVICE from "../../services/customerServ";
import { nanoid } from "@reduxjs/toolkit";
import USER_SERVICE from "../../services/userServ";

import Notification from "../Notification/Notification";

const TaskDetailForm = ({
  layout = "vertical",
  size = "large",
  taskInfo,
  userInfo,
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const initialValues = { ...taskInfo };

  const [customerInfo, setCustomerInfo] = useState({});

  useEffect(() => {
    CUSTOMER_SERVICE.getCustomerInfo(taskInfo.customer_id)
      .then((res) => {
        setCustomerInfo(res);
      })
      .catch((err) => {});
  }, []);

  const handleFinish = (values) => {
    let completeDateTime = new Date();
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    let newOrderHistory = {
      order_id: nanoid(6),
      order: values.order,
      note: values.note,
      complete_date: completeDateTime.toLocaleDateString("en-US", options),
    };

    let newData = {
      ...customerInfo,
      order_history: [...customerInfo.order_history, newOrderHistory],
    };
    taskInfo.completed = true;
    let taskIdx = userInfo.tasks.findIndex((task) => task.id === taskInfo.id);

    if (taskIdx > -1) {
      userInfo.tasks[taskIdx] = { ...taskInfo };
      let newUserData = { ...userInfo };
      Promise.all([
        CUSTOMER_SERVICE.updateCustomer(taskInfo.customer_id, newData),
        USER_SERVICE.updateUser(userInfo.id, newUserData),
      ])
        .then((res) => {
          Notification("success", `Complete`, `Task ${taskInfo.id} completed`);
          setTimeout(() => {
            navigate("/user/task-tracking");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const labelItem = (labelText) => (
    <Label className="text-sm font-medium text-[#67748e] capitalize">
      {labelText}
    </Label>
  );
  const renderForm = () => {
    return (
      <Form
        form={form}
        name="user-task-detail"
        layout={layout}
        size={size}
        onFinish={handleFinish}
        className="user-task-detail-form"
        initialValues={initialValues}
        disabled={true}
      >
        <Form.Item name="sdt" label={labelItem("Số điện thoại khách hàng")}>
          <Input placeholder="Số điện thoại khách hàng" />
        </Form.Item>
        <Form.Item name="fullname" label={labelItem("Tên khách hàng")}>
          <Input placeholder="Tên khách hàng" />
        </Form.Item>
        <Form.Item name="address" label={labelItem("Địa chỉ khách hàng")}>
          <Input placeholder="Địa chỉ" />
        </Form.Item>
        <Form.Item name="map" label={labelItem("Google map")}>
          <Input placeholder="Google map" />
        </Form.Item>
        <Form.Item label={labelItem("Đơn hàng")} name="order">
          <TextArea placeholder="Đơn hàng" />
        </Form.Item>
        <Form.Item label={labelItem("Ghi chú")} name="note">
          <TextArea placeholder="Ghi chú:" />
        </Form.Item>
        <Form.Item className="form-btn-groups">
          <Button
            type="primary"
            htmlType="submit"
            className="btn-update bg-[#0d6efd] hover:bg-[#0b5ed7] text-white rounded-[4px] font-semibold text-sm transition-all duration-[400ms]"
          >
            Complete
          </Button>
          <Button
            htmlType="button"
            className="btn-cancel bg-[#dc3545] hover:bg-[#bb2d3b] rounded-[4px] text-white text-sm transition-all duration-[400ms] ml-3"
            onClick={() => {
              navigate("/user/task-tracking/");
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return renderForm();
};

export default TaskDetailForm;

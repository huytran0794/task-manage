import { Avatar } from "antd";
import React from "react";

const CustomerAvatarInfo = ({ customerData }) => {
  const renderAvatarInfo = () => {
    return (
      <div className="flex gap-3 items-center">
        <Avatar
          src={customerData.avatar}
          size={60}
          className="customer-avatar"
        />
        <div className="customer-info flex justify-center gap-1 flex-col">
          <div className="customer-name font-semibold text-[#292d32] text-base">
            {customerData.fullname}
          </div>
          <div className="customer-phone text-lg">{customerData.sdt}</div>
        </div>
      </div>
    );
  };
  return renderAvatarInfo();
};

export default CustomerAvatarInfo;

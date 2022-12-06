import React, { useState } from "react";
import CustomerManageTable from "./CustomerManageTable";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import { MdOutlineManageAccounts } from "react-icons/md";

const CustomerListPage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  let handleSearchInput = (searchTxt) => {
    setSearch(searchTxt);
  };
  let renderTitle = () => {
    return (
      <div className="wrapper">
        <p>Danh sách khách hàng</p>
        <Button
          className="flex items-center justify-center bg-indigo-500/70 p-5 w-full"
          onClick={() => {
            navigate("/manager");
          }}
        >
          <MdOutlineManageAccounts color="#fff" size={20} />
        </Button>
      </div>
    );
  };
  return (
    <>
      <Header handleSearchInput={handleSearchInput} />
      <SectionWrapper
        sectionClass={"customers"}
        title={renderTitle()}
        titleClass="flex items-center justify-center"
        content={<CustomerManageTable search={search} />}
      />
    </>
  );
};

export default CustomerListPage;

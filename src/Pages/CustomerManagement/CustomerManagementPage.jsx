import React, { useRef, useState } from "react";
import CustomerManageTable from "./CustomerManageTable";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { matchRoutes, useLocation } from "react-router-dom";
const CustomerManagementPage = () => {
  const [search, setSearch] = useState("");
  let handleSearchInput = (searchTxt) => {
    setSearch(searchTxt);
  };

  return (
    <>
      <Header handleSearchInput={handleSearchInput} />
      <SectionWrapper
        sectionClass={"customers"}
        title={"Quản lý khách hàng"}
        content={<CustomerManageTable search={search} />}
      />
    </>
  );
};

export default CustomerManagementPage;

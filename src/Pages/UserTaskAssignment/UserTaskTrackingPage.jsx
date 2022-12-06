import React, { useEffect } from "react";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { useNavigate } from "react-router-dom";

import UserTaskTrackingTable from "./UserTaskTrackingTable";
import { LOCAL_SERVICE } from "../../core/services/localServ";
const UserTaskTrackingPage = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (LOCAL_SERVICE.user.getRole() === "admin") {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header />
      <SectionWrapper
        sectionClass={"user-task-tracking"}
        title={"Danh sách công việc cần làm"}
        content={<UserTaskTrackingTable />}
      />
    </>
  );
};

export default UserTaskTrackingPage;

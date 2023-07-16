import React from "react";
import { Divider } from "antd";
import NewPostEditor from "../../components/NewPostEditor";
import Contact from "../../components/Contact";

const RightHome = () => {
  return (
    <div style={{ position: "sticky", top: "94px" }}>
      <NewPostEditor />
      <Divider />
      <Contact />
      <Divider />
      <div style={{ textAlign: "center" }}>
        Uray Store © 2023 Simplicity Team
      </div>
    </div>
  );
};

export default RightHome;

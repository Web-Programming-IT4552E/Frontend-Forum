import React, { useState } from "react";
import classes from "./styles.module.scss";
import { Layout, Button, Row, Col, Space, BackTop, Modal } from "antd";
import NewsFeed from "../../containers/NewsFeed";
import SideTree from "../../containers/SideTree";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../containers/PageContainer";
import NewPostEditor from "../../components/NewPostEditor";
import RightHome from "../../containers/RightHome";
import { useSelector } from "react-redux";
const { Header, Content, Footer } = Layout;

const Home = () => {
  const user = useSelector((state) => state.user);
  const [isShowModal, setIsShowModal] = useState(false);
  const navigate = useNavigate();
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
    status: 1,
    category: "general",
  });

  const changeCategory = (value = "parent") => {
    // console.log(value);
    if (!value.includes("parent")) {
      setParams({
        ...params,
        category: value,
        page: 1,
      });
    } else {
      setParams({
        ...params,
        category: "",
        page: 1,
      });
    }
  };
  return (
    <>
      <PageContainer>
        <>
          <Content className={classes.content}>
            <Row className={classes.container}>
              <Col style={{ padding: "30px" }} align="left" lg={5}>
                <Space
                  direction="vertical"
                  size="middle"
                  className={`${classes["sticky-space"]} w-full`}
                >
                  <Button
                    type="primary"
                    block
                    icon={<HomeOutlined />}
                    className={classes.homeButton}
                  >
                    Home
                  </Button>
                  <SideTree
                    handler={changeCategory}
                    defaultValue={params.category}
                  />
                </Space>
              </Col>
              <Col xs={22} sm={16} lg={12}>
                <NewsFeed
                  params={params}
                  setParams={setParams}
                  queryKey={"public-posts"}
                  url="/post/public"
                  isFilter={false} // admin can filter this to see
                />
              </Col>
              <Col style={{ padding: "30px" }} lg={7}>
                <RightHome />
              </Col>
            </Row>
          </Content>
          {/* <BackTop /> */}
        </>
      </PageContainer>
    </>
  );
};

export default Home;

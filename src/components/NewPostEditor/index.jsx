import {
  Avatar,
  Button,
  Card,
  Col,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Spin,
} from "antd";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { storage } from "../../firebase";
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { FaImage } from "react-icons/fa";
import { FcAddImage } from "react-icons/fc";
import { toast } from "react-toastify";
import { useCacheFetch } from "../../hooks/useCacheFetch";
import { request } from "../../utils/request";
import classes from "./styles.module.scss";

const NewPostEditor = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState(EditorState.createEmpty());
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const convertToHtml = (state) => {
    const contentState = state.getCurrentContent();
    const rawState = convertToRaw(contentState);
    return draftToHtml(rawState);
  };
  const [img, setImg] = useState(null);
  useEffect(() => {
    const uploadImage = async (file) => {
      setIsLoading(true);
      const path = `/images/${file.name}`;
      const ref = storage.ref(path);
      const snapshot = await ref.put(file);
      const url = await snapshot.ref.getDownloadURL();
      setImgUrl(url);
      setIsLoading(false);
    };
    if (img) uploadImage(img);
  }, [img]);
  const [filename, setFilename] = useState("");
  const [category, setCategory] = useState("general");
  const { data: userData } = useCacheFetch(
    ["user"],
    {
      onError: () => {
        toast.error("Get detail user failed!");
      },
    },
    { isAuth: true, url: "/account", method: "GET" }
  );
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setValue(EditorState.createEmpty());
    setFilename("");
    setImg(null);
  };

  const handlePostBtn = async () => {
    try {
      let data;
      if (userData?.data?.type === "admin") {
        data = await request({
          url: "/post/announcement",
          method: "POST",
          data: {
            attachment: [imgUrl],
            category,
            content: convertToHtml(value),
          },
        });
      } else {
        data = await request({
          url: "/post/regular",
          method: "POST",
          data: {
            attachment: [imgUrl],
            category,
            content: convertToHtml(value),
          },
        });
      }
      if (data?.status === 200 || data?.status === 201) {
        setValue("");
        setIsModalVisible(false);
        setFilename("");
        setImg(null);
        toast.success("Create post successfully");
      } else {
        toast.error("Create post failed");
      }
    } catch (err) {
      toast.error("Create post failed");
    }
  };

  return (
    <Card className={classes["create-new-post"]}>
      <Row justify="space-evenly">
        <Col span={3}>
          <Avatar
            src={userData?.data?.avatar || "https://i.pravatar.cc/300"}
          />
        </Col>
        <Col className={classes.placeholder} span={18} onClick={showModal}>
          What's on your mind?
        </Col>
      </Row>

      <Modal
        title="Create Post"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered={true}
      >
        <Select
          placeholder="Category"
          style={{ width: "150px" }}
          onChange={(e) => setCategory(e)}
          bordered={false}
          defaultValue={"general"}
        >
          {userData?.data?.type == "admin" ? (
            <>
              <Select.Option value="rule">RULE</Select.Option>
              <Select.Option value="user_guide">USER GUIDE</Select.Option>
            </>
          ) : (
            <></>
          )}
          <Select.Option value="general">GENERAL</Select.Option>
          <Select.Option value="trading">TRADING</Select.Option>
          <Select.Option value="review">REVIEW</Select.Option>
          <Select.Option value="chat">CHAT</Select.Option>
        </Select>
        <Editor
          editorClassName="new-post-editor"
          wrapperClassName="new-post-wrapper"
          toolbarClassName="new-post-toolbar"
          editorState={value}
          onEditorStateChange={(e) => setValue(e)}
        />
        <div
          style={{
            margin: "24px 0",
          }}
        />
        {isLoading ? (
          <Spin />
        ) : imgUrl ? (
          <Image src={imgUrl} alt="preview post banner" />
        ) : null}
        <div>
          {filename && (
            <div className={classes.filename}>
              <FaImage style={{ marginRight: "5px" }} />
              {filename}
            </div>
          )}
        </div>
        <label style={{ marginBottom: "120px" }}>
          <Input
            type="file"
            style={{ display: "none" }}
            onChange={(event) => {
              setFilename(event.target.files[0].name);
              setImg(event.target.files[0]);
            }}
          />
          <div className={classes.upload}>
            <FcAddImage size="24px" style={{ marginRight: "5px" }} /> Upload
            image
          </div>
        </label>

        <Button
          type="primary"
          block
          disabled={!value ? true : false}
          onClick={() => handlePostBtn()}
        >
          Post
        </Button>
      </Modal>
    </Card>
  );
};

export default NewPostEditor;

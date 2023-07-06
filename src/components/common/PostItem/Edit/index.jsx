import { Button, Input, Modal, Avatar, Upload } from "antd";
import {
  convertToRaw,
  EditorState,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { toast } from "react-toastify";
import { useCacheMutate } from "../../../../hooks/useCacheFetch";
import { uploadImage } from "../../../../services/image.service";

const Edit = ({ id, content, setContent, attachment, setAttachment }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [url, setUrl] = useState(attachment);
  const { mutateAsync: editPost } = useCacheMutate(
    null,
    {},
    {
      isAuth: true,
      url: `/post/${id}`,
      method: "PUT",
      data: {
        content: content,
        attachment: attachment,
      },
    }
  );
  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (content) {
      const blocks = convertFromHTML(content);
      const state = ContentState.createFromBlockArray(
        blocks.contentBlocks,
        blocks.entityMap
      );
      setValue(EditorState.createWithContent(state));
    }
  }, [content]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [value, setValue] = useState(EditorState.createEmpty());

  const convertToHtml = (s) => {
    const rawState = convertToRaw(s);
    return draftToHtml(rawState);
  };

  const handleEditPost = async () => {
    const html = convertToHtml(value.getCurrentContent());
    const data = await editPost({
      content: html,
      attachment: [url],
    });
    if (data?.status == 200 || data?.status == 201) {
      setContent(html);
      handleCancel();
      setAttachment(url);
    } else {
      toast.error("Edit post failed!");
    }
  };
  const handleUploadAvatar = async (e) => {
    uploadImage(e.file.name, e.file, setUrl);
  };
  return (
    <>
      <a onClick={showModal} style={{ color: "blue" }} key="list-loadmore-edit">
        Edit
      </a>
      <Modal
        title="Edit Post Content"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            form="edit-post-form"
            onClick={handleEditPost}
            key="submit"
            htmlType="submit"
          >
            Submit
          </Button>,
        ]}
      >
        <Editor
          editorClassName="new-post-editor"
          wrapperClassName="new-post-wrapper"
          toolbarClassName="new-post-toolbar"
          editorState={value}
          onEditorStateChange={(e) => setValue(e)}
        />
        <Upload
          showUploadList={false}
          customRequest={handleUploadAvatar}
          // beforeUpload={beforeUpload}
        >
          <Avatar
            src={`${url}`}
            shape="square"
            size={{
              xs: 200,
              sm: 200,
              md: 200,
              lg: 200,
              xl: 200,
              xxl: 200,
            }}
          />
        </Upload>
      </Modal>
    </>
  );
};

export default Edit;

import React, { useState, useEffect } from "react";
import { Card, List, Space, Skeleton, Avatar, Divider, Button } from "antd";
import UserDetail from "../../../containers/UserDetail";
import classes from "./styles.module.scss";
import IconText from "../../../core/IconText";
import Delete from "./Delete";
import ThreeDots from "../../icons/ThreeDots";
import RenderIf from "../../../containers/RenderIf/RenderIf";
import { useLocation } from "react-router-dom";
import { LikeOutlined, MessageOutlined, LikeFilled } from "@ant-design/icons";
import RouteConfigs from "../../../constants/routes";
import Edit from "./Edit";
import CommentSection from "../CommentSection";
import { toast } from "react-toastify";
import { request } from "../../../utils/request";
import { useCacheMutate } from "../../../hooks/useCacheFetch";
import useLockCommentMutation from "../../../hooks/useLockCommentMutation";
import { useSelector } from "react-redux";
import AuthUtils from "../../../utils/authUtils";

const PostItem = ({ item, handleAccept, handleDeny, setPosts }) => {
  const [visible, setVisible] = useState(false);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
  const [isReplyBoxOpen, setIsReplyBoxOpen] = useState(false);
  const [isReacted, setIsReacted] = useState(false);
  const [likes, setLikes] = useState(0);
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const user = useSelector((state) => state.user);
  const pathname = useLocation().pathname;
  const isAdmin = AuthUtils.isAdmin();
  const { mutate: lockComment } = useLockCommentMutation(
    () => toast.success("Comment locked successfully"),
    () => toast.error("Error locking comment")
  );

  useEffect(() => {
    setIsReacted(item?.is_reacted || false);
    setLikes(item?.number_of_like);
    setContent(item?.content);
    setAttachment(item?.attachment || "");
    if (user && item && user._id === item.user_id._id) {
      setIsOwner(true);
    }
  }, [pathname, item, user]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // console.log(user)

  const removePostHandler = (e) => {
    console.log(e);
  };

  const lockCommentHandler = (e) => {
    lockComment(item?._id);
  };

  const handleCommentClick = () => {
    setIsCommentSectionOpen(!isCommentSectionOpen);
  };

  const adminAcceptHandler = () => {
    handleAccept(item?._id);
  };
  const adminDenyHandler = () => {
    handleDeny(item?._id);
  };

  const createMarkup = (content) => {
    return { __html: content };
  };

  const handleReaction = async () => {
    try {
      const data = await request(
        {
          url: `/reaction/${item?._id}`,
          method: "POST",
        },
        true
      );
      setIsReacted((prev) => !prev);
      if (isReacted) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
    } catch (err) {
      toast.error("Fetch more posts failed!");
    }
  };
  return (
    <div className={classes.item}>
      <Card
        style={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }}
        id="post"
      >
        <List.Item
          actions={
            RouteConfigs.manageWaitingPost !== pathname
              ? [
                  <IconText
                    icon={isReacted ? LikeFilled : LikeOutlined}
                    text={likes}
                    onClick={handleReaction}
                    key="list-vertical-like-o"
                    style={{ cursor: "pointer" }}
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text={item?.number_of_comment || 0}
                    key="list-vertical-message"
                    onClick={handleCommentClick}
                    style={{ cursor: "pointer" }}
                  />,
                ].concat(
                  item?.user_id?.email === user?.email
                    ? [
                        <Edit
                          id={item._id}
                          content={content}
                          setContent={setContent}
                          attachment={attachment}
                          setAttachment={setAttachment}
                        />,
                        <Delete id={item._id} setPosts={setPosts} />,
                      ]
                    : []
                )
              : [
                  <Space
                    size={[16, 16]}
                    direction="horizontal"
                    className="justify-end w-full"
                  >
                    <Button type="primary" onClick={adminAcceptHandler}>
                      Accept
                    </Button>
                    <Button type="primary" ghost onClick={adminDenyHandler}>
                      Decline
                    </Button>
                  </Space>,
                ]
          }
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <div className="flex justify-between">
              <List.Item.Meta
                className="flex-1"
                avatar={
                  <Avatar
                    src={
                      item?.user_id?.avatar
                        ? item.user_id.avatar
                        : "https://i.pravatar.cc/300"
                    }
                  />
                }
                title={
                  <div style={{ cursor: "pointer" }} onClick={showDrawer}>
                    {item?.user_id ? item?.user_id.fullname : null}
                  </div>
                }
                description={item?.user_id ? item?.user_id.type : null}
              />
              {isAdmin || isOwner ? (
                <RenderIf isTrue={true}>
                  <ThreeDots
                    itemMenu={[
                      {
                        key: "1",
                        label: (
                          <a className="whitespace-nowrap">Lock comment</a>
                        ),
                      },
                    ]}
                    handler={lockCommentHandler}
                  />
                </RenderIf>
              ) : null}
            </div>

            <div className={classes.content}>
              <div
                className={classes["text-content"]}
                dangerouslySetInnerHTML={createMarkup(content)}
              ></div>
              <div>
                {attachment != "" ? <img src={attachment} alt="post" /> : null}
              </div>
              <Divider />
            </div>
          </Skeleton>
        </List.Item>
        <UserDetail
          onClose={onClose}
          visible={visible}
          userData={item?.user_id}
        />
      </Card>
      {isCommentSectionOpen && <CommentSection postId={item?._id} />}
      {isReplyBoxOpen && <CommentSection postId={item?._id} />}
    </div>
  );
};

export default PostItem;

import React, { useState } from "react";
import { FaReply } from "react-icons/fa";
import CommentSection from "..";
import { Comment } from "antd";
import RenderIf from "../../../../containers/RenderIf/RenderIf";
import moment from "moment";
const CommentItem = ({
  setOpenReply,
  setUserToReply,
  setValue,
  item,
  focusRef,
  postId,
  commentId,
  isPost,
  depth,
}) => {
  const [isReply, setIsReply] = useState(false);
  return (
    <>
      <Comment
        actions={[
          <span
            onClick={() => {
              setIsReply(!isReply);
              setOpenReply(true);
              setUserToReply(depth < 1 ? item : { _id: commentId });
              focusRef();
              setValue(`@${item.user_id.fullname} `);
            }}
          >
            <span className="flex items-center gap-3">
              <FaReply />
              {isPost ? `Reply (${item?.number_of_reply || 0})` : "Reply"}
            </span>
          </span>,
        ]}
        author={item?.user_id?.fullname || "Anonymous"}
        avatar={item?.user_id?.avatar || "https://i.pravatar.cc/300"}
        content={item?.content}
        datetime={moment(item?.create_time || new Date()).format(
          "HH:mm DD/MM/YYYY"
        )}
      />
      <RenderIf isTrue={item?.number_of_reply > 0 && depth < 1 && isReply}>
        <div className="pl-4">
          <CommentSection
            postId={postId}
            commentId={depth < 1 ? item._id : commentId}
            depth={depth + 1}
            isPost={false}
          />
        </div>
      </RenderIf>
    </>
  );
};

export default CommentItem;

import React from "react";
import classes from "./styles.module.scss";
import { Tree } from "antd";
import {
  CaretDownFilled,
  BookFilled,
  NotificationFilled,
  EnvironmentFilled,
  ShoppingFilled,
  FlagFilled,
  MessageFilled,
} from "@ant-design/icons";

export const treeData = [
  {
    title: "Overview",
    key: "overview parent", // phai co key parent
    children: [
      {
        title: "Rules ",
        key: "rule",
        icon: <NotificationFilled />,
      },
      {
        title: "Guide Book",
        key: "user_guide",
        icon: <BookFilled />,
      },
    ],
  },
  {
    title: "Chatting rooms",
    key: "chatting room parent",
    children: [
      {
        title: "General ",
        key: "general",
        icon: <EnvironmentFilled />,
      },
      {
        title: "Trading",
        key: "trading",
        icon: <ShoppingFilled />,
      },
      {
        title: "Review",
        key: "review",
        icon: <FlagFilled />,
      },
      {
        title: "Chit Chat",
        key: "chat",
        icon: <MessageFilled />,
      },
    ],
  },
];

const SideTree = ({ handler, defaultValue }) => (
  <Tree
    showIcon
    defaultExpandAll
    defaultSelectedKeys={[defaultValue]}
    switcherIcon={<CaretDownFilled />}
    treeData={treeData}
    className={classes.tree}
    onSelect={(key, node) => {
      handler(key[0] ? key[0] : key);
    }}
  />
);

export default SideTree;

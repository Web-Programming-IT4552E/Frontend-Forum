import React from "react";
import { Select } from "antd";

const { Option } = Select;

const PostItemFilter = ({ func }) => {
	return (
		<Select
			placeholder="Filter Posts"
			style={{ width: "150px" }}
			onChange={func}
			bordered={false}
			defaultValue={1}
		>
			<Select.Option value={0}>New</Select.Option>
			<Select.Option value={1}>Active</Select.Option>
			<Select.Option value={2}>Locked</Select.Option>
			<Select.Option value={3}>Denied</Select.Option>
			<Select.Option value={4}>Deleted</Select.Option>
		</Select>
	);
};

export default PostItemFilter;

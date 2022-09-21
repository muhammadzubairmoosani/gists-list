import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

export const SearchBar = ({ callback }) => {
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [key, setKey] = useState(null);

  const _onChangeKey = ({ key }) => {
    key = key.replace(/\s/g, "");
    typingTimeout && clearTimeout(typingTimeout);
    setKey(key || null);
  };

  useEffect(() => {
    setTypingTimeout(
      setTimeout(() => {
        callback(key);
      }, 500)
    );
  }, [callback, key]);

  return (
    <Form onValuesChange={_onChangeKey}>
      <Form.Item name={"key"}>
        <Input
          placeholder="Search by username"
          prefix={<SearchOutlined />}
          name="key"
          allowClear
          autoFocus
        />
      </Form.Item>
    </Form>
  );
};

import React, { useState } from "react";
import { Popover, List } from "antd";
import { ForkOutlined } from "@ant-design/icons";
import { getForksList, getTags, getForks } from "../../utils";

export const GistList = ({ data }) => {
  const [forkApiIsLoading, setForkApiIsLoading] = useState(false);
  const [forks, setForks] = useState([]);

  return (
    <List
      dataSource={data}
      renderItem={(gist) => (
        <List.Item
          key={gist.id}
          actions={[
            getTags(gist.files),
            <Popover
              content={getForks(forks, forkApiIsLoading)}
              trigger="click"
            >
              <span
                className="link"
                onClick={() =>
                  getForksList(gist.id, setForkApiIsLoading, setForks)
                }
              >
                <ForkOutlined />
                forks
              </span>
            </Popover>,
          ]}
        >
          {gist.owner.login}
        </List.Item>
      )}
    />
  );
};

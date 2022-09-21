import React from "react";
import { useEffect, useState, useCallback } from "react";
import { SearchBar, Layout, GistList } from "../index";
import { Empty, Spin, Divider, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { octokit } from "../../utils";

export const Main = () => {
  const { Title } = Typography;
  const [isLoading, setIsLoading] = useState(false);
  const [gists, setGists] = useState([]);
  const [username, setUsername] = useState(null);
  const [dataIsNotFound, setDataIsNotFound] = useState(false);

  useEffect(() => {
    if (username === null) {
      setGists([]);
    }
  }, [username]);

  const getGistlistOfUser = useCallback(() => {
    setIsLoading(true);

    octokit.rest.gists
      .listForUser({ username })
      .then(({ data }) => {
        if (!data.length && username) {
          setGists([]);
          setIsLoading(false);
          return setDataIsNotFound(true);
        }

        if (!data.length) return setIsLoading(false);
        if (data.length) setDataIsNotFound(false);

        setGists(data);
        setIsLoading(false);
      })
      .catch(() => {
        setDataIsNotFound(true);
        setIsLoading(false);
      });
  }, [username]);

  useEffect(() => {
    if (username) {
      getGistlistOfUser();
    }
  }, [username, getGistlistOfUser]);

  const getContent = () => {
    if (!gists?.length && !isLoading && username === null) {
      return <Title level={5}>Let's Search Gists</Title>;
    }
    if (isLoading) {
      return (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 55 }} spin />} />
      );
    }
    if (dataIsNotFound) {
      return (
        <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" />
      );
    }
    return <GistList data={gists} />;
  };

  return (
    <Layout>
      <SearchBar callback={setUsername} />
      <Divider orientation="left">List of Gists</Divider>
      {getContent()}
    </Layout>
  );
};

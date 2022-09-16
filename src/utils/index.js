import { Octokit } from "@octokit/rest";
import { message } from "antd";
import { Spin, Popover, Tag, Avatar, Tooltip } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const octokit = new Octokit();

const toastMessage = (errorMessage) => {
  message.error(errorMessage);
};

export const openInNewTab = (url) => {
  window.open(url, "_blank");
};

export const getForksList = (gist_id, loadingCallBack, dataCallBack) => {
  loadingCallBack(true);
  octokit.rest.gists
    .listForks({ gist_id })
    .then(({ data }) => {
      if (data.length) {
        dataCallBack(data.slice(-3));
      }
      loadingCallBack(false);
    })
    .catch(({ message }) => {
      toastMessage(message);
      loadingCallBack(false);
    });
};

export const getTags = (files) => {
  const tagNames = Object.values(files).map((i) => (
    <Tag
      key={i.raw_url}
      color="magenta"
      className="cursorPointer"
      onClick={() => openInNewTab(i.raw_url)}
    >
      {i.language || i.type}
    </Tag>
  ));

  return [
    ...tagNames.slice(0, 3),
    tagNames.length > 3 && (
      <Popover content={tagNames.slice(3)} trigger="click">
        <Tag color="gold" className="cursorPointer">
          {`+${tagNames.length - 3}`}
        </Tag>
      </Popover>
    ),
  ];
};

export const getForks = (forks, forkApiIsLoading) => {
  return (
    <Avatar.Group maxPopoverTrigger="click" className="cursorPointer">
      {forkApiIsLoading ? (
        <Spin indicator={<LoadingOutlined spin />} />
      ) : !forks.length ? (
        "No forks found!"
      ) : (
        forks.map((fork) => (
          <Tooltip title={fork.owner.login}>
            <Avatar
              src={fork.owner.avatar_url}
              onClick={() => openInNewTab(fork.html_url)}
            />
          </Tooltip>
        ))
      )}
    </Avatar.Group>
  );
};

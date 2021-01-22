import React, { useEffect, useState } from "react";

import LazzyImage from "../../components/LazzyImage";

import api from "../../services/api";

import {
  List,
  Post,
  Header,
  Avatar,
  Name,
  Description,
  Loading,
} from "./styles";

export interface FeedProps {
  id: number;
  image: string;
  small: string;
  aspectRatio: number;
  description?: string;
  author: {
    avatar?: string;
    name: string;
  };
}

const Feed: React.FC = () => {
  const [feeds, setFeeds] = useState<FeedProps[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [load, setLoad] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleLoadgPage = (pageNumber = page, shouldRefresh = false) => {
    if (total && pageNumber > total) return;

    setLoad(true);
    api
      .get("feed", {
        params: {
          _expand: "author",
          _limit: 5,
          _page: pageNumber,
        },
      })
      .then((res) => {
        const totalItems = res.headers["x-total-count"];

        setTotal(Math.floor(totalItems / 5));
        setFeeds((prev) => (shouldRefresh ? res.data : [...prev, ...res.data]));
        setPage(pageNumber + 1);
        setLoad(false);
      })
      .catch((error) => {
        console.log("error => ", error);
      });
  };

  const handleRefreshList = () => {
    setRefreshing(true);

    handleLoadgPage(1, true);

    setRefreshing(false);
  };

  useEffect(() => {
    handleLoadgPage();
  }, []);

  return (
    <>
      <List
        data={feeds}
        keyExtractor={(feed) => String(feed.id)}
        onEndReached={() => handleLoadgPage()}
        onEndReachedThreshold={0.1}
        onRefresh={handleRefreshList}
        refreshing={refreshing}
        ListFooterComponent={load && <Loading />}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar source={{ uri: item.author.avatar }} />
              <Name>{item.author.name}</Name>
            </Header>

            <LazzyImage
              aspectRatio={item.aspectRatio}
              // smallSource={item.small}
              smallSource={{ uri: item.small }}
              // source={item.image}
              source={{ uri: item.image }}
            />

            <Description>
              <Name>{item.author.name}</Name> {item.description}
            </Description>
          </Post>
        )}
      />
    </>
  );
};

export default Feed;

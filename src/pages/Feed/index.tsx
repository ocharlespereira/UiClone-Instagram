import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import LazzyImage from "../../components/LazzyImage";

import api from "../../services/api";

import {
  ListFeeds,
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

interface Changed {
  id: number;
}

const Feed: React.FC = () => {
  const [feeds, setFeeds] = useState<FeedProps[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [load, setLoad] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState<Changed[]>([]);

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
      })
      .catch((error) => {
        console.log("error => ", error);
      })
      .finally(() => {
        setLoad(false);
      });
  };

  const handleRefreshList = () => {
    setRefreshing(true);

    handleLoadgPage(1, true);

    setRefreshing(false);
  };

  const handleViwableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }: any) => item.id));
  }, []);

  useEffect(() => {
    handleLoadgPage();
  }, []);

  return (
    <View>
      <ListFeeds
        data={feeds}
        keyExtractor={(feed: { id: any }) => String(feed.id)}
        onEndReached={() => handleLoadgPage()}
        onEndReachedThreshold={0.1}
        onRefresh={handleRefreshList}
        refreshing={refreshing}
        //pega informações das imagens que está em tela
        onViewableItemsChanged={handleViwableChanged}
        //percentual de quanto tempo durará para carregar imagem original
        viewbilityConfig={{ viewAreaCoveragePercentThreshold: 10 }}
        ListFooterComponent={load && <Loading />}
        renderItem={({ item: feed }) => (
          <Post>
            <Header>
              <Avatar source={{ uri: feed.author.avatar }} />
              <Name>{feed.author.name}</Name>
            </Header>

            <LazzyImage
              shouldLoad={viewable.includes(feed.id)}
              aspectRatio={feed.aspectRatio}
              smallSource={feed.small}
              source={feed.image}
            />

            <Description>
              <Name>{feed.author.name}</Name> {feed.description}
            </Description>
          </Post>
        )}
      />
    </View>
  );
};

export default Feed;

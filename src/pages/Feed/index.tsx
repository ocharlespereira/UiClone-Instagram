import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import api from "../../services/api";

import { Post, Header, Avatar, Name, PostImage, Description } from "./styles";

interface feedProps {
  id: number;
  image?: string;
  aspectRatio?: number;
  description?: string;
  author: {
    avatar?: string;
    name: string;
  };
}

const Feed: React.FC = () => {
  const [feed, setFeed] = useState<feedProps[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleLoadgPage = (pageNumber = page) => {
    if (total && pageNumber > total) return;

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
        setFeed((prev) => [...prev, ...res.data]);
        setPage(pageNumber + 1);
      })
      .catch((error) => {
        console.log("error => ", error);
      });
  };

  useEffect(() => {
    handleLoadgPage();
  }, []);

  return (
    <View>
      <FlatList
        data={feed}
        keyExtractor={(post) => String(post.id)}
        onEndReached={() => handleLoadgPage()}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar source={{ uri: item.author.avatar }} />
              <Name>{item.author.name}</Name>
            </Header>

            <PostImage ratio={item.aspectRatio} source={{ uri: item.image }} />

            <Description>
              <Name>{item.author.name}</Name> {item.description}
            </Description>
          </Post>
        )}
      />
    </View>
  );
};

export default Feed;

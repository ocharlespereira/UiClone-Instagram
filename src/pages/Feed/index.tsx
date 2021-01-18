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
  const [feed, setFeed] = useState<feedProps[] | null>();

  useEffect(() => {
    api
      .get("feed", {
        params: {
          _expand: "author",
          _limit: 5,
          _page: 1,
        },
      })
      .then((res) => {
        setFeed(res.data);
      })
      .catch((error) => {
        console.log("error => ", error);
      });
  }, []);

  return (
    <View>
      <FlatList
        data={feed}
        keyExtractor={(post) => String(post.id)}
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

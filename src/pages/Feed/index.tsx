import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import api from "../../services/api";

import { Container } from "./styles";

const Feed: React.FC = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    // ?_expand=author&_limit=5&_page=1
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
    <Container>
      <Text>Feed</Text>
    </Container>
  );
};

export default Feed;

import React, { useEffect, useState } from "react";
import { Animated } from "react-native";

import { Small, Original } from "./styles";

interface LazzyProps {
  smallSource: HTMLImageElement;
  source: HTMLImageElement;
  aspectRatio: number;
  shouldLoad: boolean;
}

const OriginalAnimated = Animated.createAnimatedComponent(Original);
const opacity = new Animated.Value(0);

const LazzyImage: React.FC<LazzyProps> = ({
  smallSource,
  source,
  aspectRatio,
  shouldLoad,
}) => {
  const [loaded, setLoaded] = useState(false);

  console.log("shouldLoad", shouldLoad);

  const handleAnimated = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 600, //em milissegundos
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (shouldLoad) {
      setTimeout(() => {
        setLoaded(true);
      }, 1500);
    }
  }, [shouldLoad]);

  return (
    <Small
      source={{ uri: smallSource }}
      ratio={aspectRatio}
      resizeMode="contain"
      blurRadius={1}
    >
      {loaded && (
        <OriginalAnimated
          style={{ opacity }}
          source={{ uri: source }}
          ratio={aspectRatio}
          resizeMode="contain"
          onLoadEnd={handleAnimated}
        />
      )}
    </Small>
  );
};

export default LazzyImage;

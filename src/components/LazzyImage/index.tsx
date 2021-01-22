import React, { useEffect, useState } from "react";

import { Small, Original } from "./styles";

interface LazzyProps {
  smallSource: HTMLImageElement;
  source: HTMLImageElement;
  aspectRatio: number;
}

const LazzyImage: React.FC<LazzyProps> = ({
  smallSource,
  source,
  aspectRatio,
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleAnimated = () => {};

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
  }, []);

  return (
    <Small
      source={{ uri: smallSource }}
      ratio={aspectRatio}
      resizeMode="contain"
      blurRadius={1}
    >
      {loaded && (
        <Original
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

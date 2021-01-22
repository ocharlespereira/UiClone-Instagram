import styled from "styled-components/native";

interface ContainerProps {
  ratio: number;
}

export const Small = styled.ImageBackground`
  width: 100%;
  aspect-ratio: ${(props: ContainerProps) => props.ratio};
`;

export const Original = styled.Image`
  width: 100%;
  aspect-ratio: ${(props: ContainerProps) => props.ratio};
`;

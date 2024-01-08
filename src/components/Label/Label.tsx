import styled, { css } from "styled-components";

const getColorScheme = (number: number) => {
  const modResult = number % 10;
  switch (modResult) {
    case 0:
      return { background: "#c4ffd6", text: "#007b35" };
    case 1:
      return { background: "#ffdbdb", text: "#990000" };
    case 2:
      return { background: "#ffd699", text: "#8c510a" };
    case 3:
      return { background: "#d6f5ff", text: "#084594" };
    case 4:
      return { background: "#ffc2ff", text: "#8c6bb1" };
    case 5:
      return { background: "#b3b3b3", text: "#000000" };
    case 6:
      return { background: "#ffcc99", text: "#993404" };
    case 7:
      return { background: "#c2f0c2", text: "#1a9850" };
    case 8:
      return { background: "#ffb3b3", text: "#67001f" };
    case 9:
      return { background: "#c2c2d6", text: "#252525" };
    default:
      return { background: "#c4ffd6", text: "#007b35" };
  }
};

const LabelComponent = styled.div<{ $number: number }>`
  padding: 4px 8px;
  width: fit-content;
  border-radius: 5px;
  ${({ $number }) =>
    css`
      background-color: ${getColorScheme($number).background};
      color: ${getColorScheme($number).text};
    `}
`;

const Label = ({ label, $number = 1 }: { label: string; $number?: number }) => {
  return <LabelComponent $number={$number}>{label}</LabelComponent>;
};

export default Label;

import styled from 'styled-components/native';

const StyledText = styled.Text<{
  weight?: 'THIN' | 'LIGHT' | 'REGULAR' | 'MEDIUM' | 'BOLD';
}>`
  color: ${(props) => props.theme.COLORS.TEXT_DEFAULT};
  font-family: ${(props) =>
    props.theme.FONT_WEIGHTS[props.weight || 'REGULAR']};
`;

export default StyledText;

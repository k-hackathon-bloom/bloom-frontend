import styled from 'styled-components/native';

const StyledText = styled.Text<{
  weight?: 'thin' | 'light' | 'regular' | 'medium' | 'bold';
}>`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts[props.weight || 'regular']};
`;

export default StyledText;

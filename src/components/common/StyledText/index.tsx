import { Text } from 'react-native';
import styled from 'styled-components/native';

const StyledText = styled(Text)<{
  weight?:
    | 'THIN'
    | 'EXTRA_LIGHT'
    | 'LIGHT'
    | 'REGULAR'
    | 'MEDIUM'
    | 'SEMI_BOLD'
    | 'BOLD'
    | 'EXTRA_BOLD'
    | 'BLACK';
}>`
  color: ${(props) => props.theme.COLORS.TEXT_PRIMARY};
  font-family: ${(props) =>
    props.theme.FONT_WEIGHTS[props.weight || 'REGULAR']};
`;

export default StyledText;

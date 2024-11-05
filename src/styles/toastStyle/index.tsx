import React from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';
import { BaseToastProps, BaseToast } from 'react-native-toast-message';
import { ShadowedView } from 'react-native-fast-shadow';
import theme from '@styles/theme';
import responsive from '@utils/responsive';

const { width } = Dimensions.get('window');

const ToastWrapper = styled(ShadowedView)`
  background: white;
  border-radius: 6px;
  shadow-opacity: 0.05;
  shadow-radius: ${responsive(10, 'height')}px;
  shadow-offset: 0px 0px;
`;

const commonStyle = {
  style: {
    width: width * 0.88,
    height: responsive(70, 'height'),
    borderLeftWidth: responsive(7, 'height'),
    shadowOpacity: 0,
    elevation: 0,
  },
  contentContainerStyle: { paddingHorizontal: responsive(20, 'height') },
  text1Style: {
    fontFamily: theme.FONT_WEIGHTS.REGULAR,
    fontWeight: undefined,
    fontSize: responsive(14, 'height'),
    color: theme.COLORS.TEXT_DEFAULT,
  },
  text2Style: {
    fontFamily: theme.FONT_WEIGHTS.LIGHT,
    fontWeight: undefined,
    fontSize: responsive(11, 'height'),
    color: theme.COLORS.TEXT_DEFAULT,
  },
};

const createToast = (props: BaseToastProps, borderColor: string) => (
  <ToastWrapper>
    <BaseToast
      {...props}
      style={{
        ...commonStyle.style,
        borderLeftColor: borderColor,
      }}
      contentContainerStyle={commonStyle.contentContainerStyle}
      text1Style={commonStyle.text1Style}
      text2Style={commonStyle.text2Style}
    />
  </ToastWrapper>
);

const toastStyle = {
  success: (props: BaseToastProps) =>
    createToast(props, theme.COLORS.TOAST_SUCCESS),
  error: (props: BaseToastProps) =>
    createToast(props, theme.COLORS.TOAST_ERROR),
  info: (props: BaseToastProps) => createToast(props, theme.COLORS.TOAST_INFO),
};

export default toastStyle;

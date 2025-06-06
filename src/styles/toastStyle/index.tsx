import React from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';
import { BaseToastProps, BaseToast } from 'react-native-toast-message';
import { ShadowedView } from 'react-native-fast-shadow';
import theme from '@styles/theme';

const { width } = Dimensions.get('window');

const ToastWrapper = styled(ShadowedView)`
  background: white;
  border-radius: 6px;
  shadow-opacity: 0.05;
  shadow-radius: 10px;
  shadow-offset: 0px 0px;
`;

const commonStyle = {
  style: {
    width: width * 0.88,
    height: 70,
    borderLeftWidth: 7,
    shadowOpacity: 0,
    elevation: 0,
  },
  contentContainerStyle: { paddingHorizontal: 20 },
  text1Style: {
    fontFamily: theme.FONT_WEIGHTS.REGULAR,
    fontWeight: undefined,
    fontSize: 14,
    color: theme.COLORS.TEXT_PRIMARY,
  },
  text2Style: {
    fontFamily: theme.FONT_WEIGHTS.LIGHT,
    fontWeight: undefined,
    fontSize: 11,
    color: theme.COLORS.TEXT_PRIMARY,
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

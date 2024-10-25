import React from 'react';
import { Dimensions } from 'react-native';
import { BaseToastProps, BaseToast } from 'react-native-toast-message';
import theme from '@styles/theme';
import responsive from '@utils/responsive';

const { width } = Dimensions.get('window');

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
);

const toastStyle = {
  success: (props: BaseToastProps) =>
    createToast(props, theme.COLORS.TOAST_SUCCESS),
  error: (props: BaseToastProps) =>
    createToast(props, theme.COLORS.TOAST_ERROR),
  info: (props: BaseToastProps) => createToast(props, theme.COLORS.TOAST_INFO),
};

export default toastStyle;

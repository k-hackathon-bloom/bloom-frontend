import React from 'react';
import Header, { HeaderProps } from '@components/common/Header';

const MonthlyReportHeader: React.FC<HeaderProps> = ({ title }) => {
  return <Header title={title} />;
};

export default MonthlyReportHeader;

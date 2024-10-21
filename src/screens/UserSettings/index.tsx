import React from 'react';
import ScreenLayout from '@screens/ScreenLayout';
import UserSettingsHeader from '@screens/UserSettings/components/UserSettingsHeader';

const UserSettings = () => {
  return (
    <ScreenLayout>
      <UserSettingsHeader title="설정" />
    </ScreenLayout>
  );
};

export default UserSettings;

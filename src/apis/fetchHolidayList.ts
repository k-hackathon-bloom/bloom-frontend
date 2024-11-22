import Toast from 'react-native-toast-message';
import { DOMParser } from 'xmldom';
import apiClient from '@apis/client';
import { HOLIDAY_API_KEY } from '@env';

const fetchHolidayList = async (year: string, month: string) => {
  try {
    const response = await apiClient.get(
      'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo',
      {
        headers: {
          Accept: 'application/xml',
        },
        params: {
          serviceKey: HOLIDAY_API_KEY,
          solYear: year,
          solMonth: month,
        },
        responseType: 'text',
      },
    );

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');

    return Array.from(xmlDoc.getElementsByTagName('locdate')).map((item: any) =>
      parseInt(item.textContent.slice(-2)),
    );
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: '공휴일 정보를 불러오는 데 실패했습니다.',
      text2: String(error),
    });
  }
};

export default fetchHolidayList;

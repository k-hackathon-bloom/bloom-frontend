export default function getFormatedDate(date: Date) {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${year}. ${month}. ${day}. (${dayOfWeek})`;
}

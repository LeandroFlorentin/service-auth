import moment from 'moment-timezone';

export function getDate(date?: string) {
  return date ? moment(date).format('YYYY-MM-DD HH:mm:ss.SSSZ') : moment().format('YYYY-MM-DD HH:mm:ss.SSSZ');
}

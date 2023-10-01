import moment from "moment";

type LabelType='day'|'week'|'month'|'year'
const format='YYYY-MM-DD[T]HH:mm:ss'
export const formatStartDate = (startDate: string, label: LabelType) => {
  return moment(startDate).startOf(label).format(format);
};
export const formatEndDate = (endDate: string, label: LabelType) => {
  return moment(endDate).endOf(label).format(format);
};
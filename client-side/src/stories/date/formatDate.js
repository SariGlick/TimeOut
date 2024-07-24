import { format } from 'date-fns';

export const formatDate = (event,date) => {
    console.log('at handleDateFormatChange');
    const newFormat = event;
    console.log('newFormat',newFormat);
    const formatDate=format(date, newFormat);
    console.log(formatDate);
    console.log('formatDate',formatDate);
    return formatDate;
  };

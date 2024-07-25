import { format } from 'date-fns';

export const formatDate = (event,date) => {
    const newFormat = event;
    const formatDate=format(date, newFormat);
    return formatDate;
  };

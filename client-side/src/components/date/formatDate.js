import { format } from 'date-fns';

const dateFormat = (event,date) => {
    const formatDate=format(date, event);
    return formatDate;
  };
  export default dateFormat;
  
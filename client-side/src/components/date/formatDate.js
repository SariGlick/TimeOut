import { format } from 'date-fns';

const formatDate = (event,date) => {
    const newFormat = event;
    const formatDate=format(date, newFormat);
    return formatDate;
  };
  export default formatDate;
  
  
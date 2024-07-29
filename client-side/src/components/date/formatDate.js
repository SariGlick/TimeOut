import { format } from 'date-fns';

const formatDate = (event,date) => {
    const newFormat = event;
    console.log('Format:', format);
    console.log('Date:', date);
    console.log('New value selected:', newFormat);
    const formatDate=format(date, newFormat);
    console.log('formatedDate', formatDate);
    return formatDate;
  };
  export default formatDate;
  
  
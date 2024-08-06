export const TIME = {
    DAY:{value:1,text:"day",iconSrc:'/images/time-twenty-four.svg'},
    Month:{value:2,text:"month",iconSrc:'images/calendar-date-svgrepo-com.svg'},
    YEAR:{value:3,text:"year",iconSrc:'/images/calendar-month-schedule-time-date-svgrepo-com.svg'},
    CUSTOM:{value:4,text:"custom",iconSrc:'/images/calendar-date-svgrepo-com (1).svg'}
  };

  export const TABLE = [
    { title: "id", dataKey: "id" },
    { title: "website_name", dataKey: "website_name" },
    { title: "total_time", dataKey: "total_time" },
    { title: "avg_for_day", dataKey: "avg_for_day" },
  ];
  
export const OPTION_ARRAY=[TIME.DAY,TIME.Month,TIME.YEAR,TIME.CUSTOM];
export const LABEL_OF_PDF_DOWNLOAD="download as pdf";
export const LABEL_OF_PDF_DOWNLOAD_HTML="download as pdf";

export const TEXT="developed by ExtraTeck"
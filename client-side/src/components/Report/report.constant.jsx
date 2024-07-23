export const Time = {
    DAY:{value:1,text:"day",iconSrc:'/images/time-twenty-four.svg'},
    Month:{value:2,text:"month",iconSrc:'images/calendar-date-svgrepo-com.svg'},
    YEAR:{value:3,text:"year",iconSrc:'/images/calendar-month-schedule-time-date-svgrepo-com.svg'},
    CUSTUM:{value:4,text:"custum",iconSrc:'/images/calendar-date-svgrepo-com (1).svg'}
  };

  export const table = [
    { title: "Site name", dataKey: "SiteName" },
    { title: "Browsing time", dataKey: "BrowsingTime" },
    { title: "Avg. for a day", dataKey: "AvgForADay" },
  ];
export const optionArray=[Time.DAY,Time.Month,Time.YEAR,Time.CUSTUM];

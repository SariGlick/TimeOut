
export const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formatDate = `${year}-${month}-${day}`;
    return formatDate;
}

export function getWebsites(websites, users, user, dateStart, dateEnd) {
    const website = websites?.data?.websites?.map((obj) => ({ ...obj, color: getRandomColor() }));
    const allusers = users?.data?.users?.find(u => u.email === user.email);
    const totalActivityTimeByWebsite = {};

    allusers?.visitsWebsites.forEach(visitedWebsite => {
        const websiteName = visitedWebsite.websiteId.name;
        const activityTime = visitedWebsite.visitsTime.reduce((total, visit) => {
            let date = new Date(visit.visitDate);
            date = formatDate(date);
            if (date >= dateStart && date <= dateEnd) {
                return total + Number(visit.activityTime);
            }
            return total;
        }, 0);

        if (totalActivityTimeByWebsite[websiteName]) {
            totalActivityTimeByWebsite[websiteName] += activityTime;
        } else {
            totalActivityTimeByWebsite[websiteName] = activityTime;
        }
    });

    website?.forEach(site => {
        const websiteName = site.name;
        if (totalActivityTimeByWebsite[websiteName]) {
            site.time = totalActivityTimeByWebsite[websiteName];
        }
    });

    return website;
}

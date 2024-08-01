import axios from 'axios'

export default function activeProfile(userId) {
    const hourNow = new Date().toLocaleTimeString('en-US', { hour12: false }).split(':')[0];
    const user = axios.get(`http://localhost:3000/users/:${userId}`)
    user.then((user) => {
        const fieldValue = user.data.profiles.map((item) => item.listWebsites.filter((website) => {
            return website.limitedTimes.some((item) => {
                return item.start.split('T')[1].split('.')[0].split(':')[0] <= hourNow &&
                    item.end.split('T')[1].split('.')[0].split(':')[0] >= hourNow
            })
        }
        ))
        console.log(fieldValue);
    });
    return user;
}

//קיץ 4-11
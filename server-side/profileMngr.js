import axios from 'axios'

export default function activeProfile(userId) {
    const user = axios.get(`http://localhost:3000/users/:${userId}`)
    user.then((user) => {
        const fieldValue = user.data.profiles.map((item) => item.listWebsites.map((website) => website.limitedTimes.map((item) =>
            //new Date().getHours() >= 
        new Date(item.start).getHours()// && new Date().getHours() <=new Date(item.end).getHours()?item:null

        )))//?.map((website) => website.listWebsites))
        console.log(fieldValue);
    });
    return user;
}

//קיץ 4-11
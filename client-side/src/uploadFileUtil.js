
 import axios from 'axios';

 export const uploadFileUtil=async(url,formdata,request)=>{
    const response={};
    if(request==='post')
    {  try {
        response =await axios.post(url,formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('response', response);
    } catch (error) {
        console.error(error)
    }
       
    }
    else
    {  

        try {
            response =await axios.put(url,formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });  
        } catch (error) {
            console.error(error)
        }
       
    }
  

 }
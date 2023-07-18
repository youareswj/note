import axios from "axios";

const request = {
    _get:(url:string,param?:object)=>{
       return axios.get(url,param)
    }
};

import axios from "axios";

export const getCityApi = async () => {
    return await axios.get(`https://ipinfo.io?token=${process.env.REACT_APP_LOCATION_API_KEY}`)
}
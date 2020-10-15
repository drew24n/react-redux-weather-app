import axios from "axios";

const token = '5e943169891d45'

export const getCityApi = async () => {
    return await axios.get(`https://ipinfo.io?token=${token}`)
}
import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.opencagedata.com/geocode/v1/"
})

const API_KEY = '66f9fec3046549bc836f19ccecf335e5'

export const getCurrentLocationAPI = async (lat, lng) => await instance.get(`json?q=${lat}+${lng}&key=${API_KEY}`)
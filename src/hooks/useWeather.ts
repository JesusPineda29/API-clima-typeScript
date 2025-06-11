import axios from "axios"
import type { SearchType } from "../types"


export const useWeather = () => {

    const fetchWeather = async (search: SearchType) => {

        const appId = '8a02d16219d1a5f8af9bd7123d646471'
        
        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            const {data} = await axios.get(geoUrl)
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }

    return {
        fetchWeather
    }
}

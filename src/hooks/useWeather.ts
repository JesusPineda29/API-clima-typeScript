import axios from "axios"
import { z } from "zod"
import type { SearchType } from "../types"

// para tipar la respuesta de una API se usa TYPE GUARD
// function isWeatherResponse(weather: unknown) : weather is Weather {
//     return (
//         Boolean(weather) &&
//         typeof weather === 'object' && 
//         typeof (weather as Weather).name === 'string' &&
//         typeof (weather as Weather).main.temp === 'number' &&
//         typeof (weather as Weather).main.temp_max === 'number' &&
//         typeof (weather as Weather).main.temp_min === 'number' 
//     )
// }


// ZOD
const Weather = z.object({ // esquima
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })
})

type Weather = z.infer<typeof Weather>




export const useWeather = () => {

    const fetchWeather = async (search: SearchType) => {

        const appId = import.meta.env.VITE_API_KEY

        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            const { data } = await axios.get(geoUrl)

            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            // TYPE GUARDS
            // const {data: weatherResult} = await axios(weatherUrl)
            // const result = isWeatherResponse(weatherResult)
            // if(result) {
            //     console.log(weatherResult.name)
            // }


            // ZOD
            const {data: weatherResult} = await axios(weatherUrl)
            const result = Weather.safeParse(weatherResult)
            if(result.success) {
                console.log(result.data.name)
                console.log(result.data.main.temp)
            }


        } catch (error) {
            console.log(error)
        }
    }

    return {
        fetchWeather
    }
}

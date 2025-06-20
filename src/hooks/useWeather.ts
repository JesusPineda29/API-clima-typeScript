import axios from "axios"
import { z } from "zod"
import type { SearchType } from "../types"
import { useEffect, useMemo, useState } from "react"

// para tipar la respuesta de una API se puede usar TYPE GUARD
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
const Weather = z.object({ // Schema
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })
})

export type Weather = z.infer<typeof Weather>

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_min: 0,
        temp_max: 0
    }
}


export const useWeather = () => {

    const [weather, setWeather] = useState<Weather>(initialState)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound ] = useState(false)

    useEffect(() => {
        if (notFound) {
            const timer = setTimeout(() => {
                setNotFound(false)
            }, 3000);
            return () => clearTimeout(timer)
        }
    }, [notFound]) 

    const fetchWeather = async (search: SearchType) => {

        const appId = import.meta.env.VITE_API_KEY

        setLoading(true)
        setWeather(initialState)

        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            const { data } = await axios.get(geoUrl)

            // comprobar si existe
            if(!data[0]) {
                setNotFound(true)
                return
            }
            
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
            const { data: weatherResult } = await axios(weatherUrl)
            const result = Weather.safeParse(weatherResult)
            if (result.success) {
                setWeather(result.data)
            }

        } catch (error) {
            console.log(error)
        } finally { // independintemente si se ejecuta el codigo del try o del catch, finally siempre se ejecuta
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])


    return {
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData,
    }
}

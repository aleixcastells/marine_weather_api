import { LOCATION_ARRAY, NOW } from '../main.js'

export function flagColor(location_number) {
    let next_hour = 48 + NOW
    let rain_clear = false
    let clouds_clear = false
    let warning_clear = false
    let warning_intense = false
    let uvi_low = false
    let no_waves = false
    let large_waves = false
    let wind_low = false
    let wind_high = false

    // weather, max, min, before, after, location 
    if (checkWeather('precipitation', 0, 0, -5, 4, location_number)) { rain_clear = true }
    if (checkWeather('wind_speed', 15, 0, 0, 2, location_number)) { wind_low = true }
    if (checkWeather('wind_speed', 1000, 35, 0, 4, location_number)) { wind_high = true }
    if (checkWeather('cloud_cover', 10, 0, 0, 2, location_number)) { clouds_clear = true }
    if (checkWeather('weathercode', 3, 0, -1, 2, location_number)) { warning_clear = true }
    if (checkWeather('weathercode', 100, 3, -1, 2, location_number)) { warning_intense = true }
    if (checkWeather('wave_height', .5, 0, -2, 3, location_number)) { no_waves = true }
    if (checkWeather('wave_height', 50, 1.5, -4, 3, location_number)) { large_waves = true }
    if (LOCATION_ARRAY[location_number].uvi <= 8) { uvi_low = true }

    if (!rain_clear || warning_intense || large_waves || wind_high) { return 'flag-red' }
    if (!uvi_low || !no_waves || !wind_low || !warning_clear || !clouds_clear) { return 'flag-yellow' }
    if (uvi_low && no_waves && wind_low && clouds_clear && rain_clear && warning_clear) { return 'flag-green' }
}

function checkWeather(weather, max = 1000, min = 0, before = 0, after = 2, location_number) {
    let isGood = true
    let check_array = []

    for (let c = 0; before <= after; before++) { check_array.push(before) }

    for (let k = 0; k < check_array.length; k++) {
        let weather_check = LOCATION_ARRAY[location_number][weather][48 + NOW + check_array[k]]
        if (weather_check > max || weather_check < min) { isGood = false }
        if (weather_check < max && weather_check > min) { isGood = true }
    }
    return isGood
}


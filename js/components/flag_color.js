import { LOCATION_ARRAY, NOW } from '../main.js'

export function flagColor(location_number) {

    let next_hour = 48 + NOW

    let rain_clear = false
    let clouds_clear = false
    let warning_clear = false
    let uvi_low = false
    let no_waves = false
    let large_waves = false
    let wind_low = false

    if (LOCATION_ARRAY[location_number].precipitation[next_hour] == 0
        && LOCATION_ARRAY[location_number].precipitation[next_hour + 1] == 0
        && LOCATION_ARRAY[location_number].precipitation[next_hour + 2] == 0
        && LOCATION_ARRAY[location_number].precipitation[next_hour + 3] == 0
        && LOCATION_ARRAY[location_number].precipitation[next_hour + 4] == 0
        && LOCATION_ARRAY[location_number].precipitation[next_hour - 1] == 0
        && LOCATION_ARRAY[location_number].precipitation[next_hour - 2] == 0
    ) { rain_clear = true }

    if (LOCATION_ARRAY[location_number].wind_speed[next_hour] < 15
        && LOCATION_ARRAY[location_number].wind_speed[next_hour + 1] < 15
        && LOCATION_ARRAY[location_number].wind_speed[next_hour + 2] < 15
    ) { wind_low = true }

    if (LOCATION_ARRAY[location_number].cloud_cover[next_hour] < 10
        && LOCATION_ARRAY[location_number].cloud_cover[next_hour + 1] < 10
        && LOCATION_ARRAY[location_number].cloud_cover[next_hour + 2] < 10
    ) { clouds_clear = true }

    if (LOCATION_ARRAY[location_number].weathercode[next_hour] < 2
        && LOCATION_ARRAY[location_number].weathercode[next_hour + 1] < 2
        && LOCATION_ARRAY[location_number].weathercode[next_hour + 2] < 2
        && LOCATION_ARRAY[location_number].weathercode[next_hour - 1] < 2
    ) { warning_clear = true }

    if (LOCATION_ARRAY[location_number].uvi <= 8) { uvi_low = true }

    if (LOCATION_ARRAY[location_number].wave_height[next_hour] < .5
        && LOCATION_ARRAY[location_number].wave_height[next_hour + 1] < .5
        && LOCATION_ARRAY[location_number].wave_height[next_hour + 2] < .5
        && LOCATION_ARRAY[location_number].wave_height[next_hour - 1] < .5
    ) { no_waves = true }

    if (LOCATION_ARRAY[location_number].wave_height[next_hour] > 1.5
        && LOCATION_ARRAY[location_number].wave_height[next_hour + 1] > 1.5
        && LOCATION_ARRAY[location_number].wave_height[next_hour + 2] > 1.5
        && LOCATION_ARRAY[location_number].wave_height[next_hour + 2] > 1.5
        && LOCATION_ARRAY[location_number].wave_height[next_hour + 3] > 1.5
        && LOCATION_ARRAY[location_number].wave_height[next_hour - 1] > 1.5
        && LOCATION_ARRAY[location_number].wave_height[next_hour - 2] > 1.5
        && LOCATION_ARRAY[location_number].wave_height[next_hour - 3] > 1.5
        && LOCATION_ARRAY[location_number].wave_height[next_hour - 4] > 1.5
    ) { large_waves = true }

    console.log('--------------------------------------')
    console.log(LOCATION_ARRAY[location_number].name)
    console.log(' ')
    console.log('rain_clear: ', rain_clear)
    console.log('wind_low: ', wind_low)
    console.log('clouds_clear: ', clouds_clear)
    console.log('warning_clear: ', warning_clear)
    console.log('uvi_low: ', uvi_low)
    console.log('no_waves: ', no_waves)

    if (!rain_clear || !warning_clear || large_waves) { return 'flag-red' }
    if (!uvi_low || !no_waves || !wind_low || !clouds_clear) { return 'flag-yellow' }
    if (uvi_low && no_waves && wind_low && clouds_clear && rain_clear && warning_clear) { return 'flag-green' }
}
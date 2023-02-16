import { LOCATION_ARRAY, NOW } from '../main.js'

export function uviColor(location_number) {
    let uvi_level = LOCATION_ARRAY[location_number].uvi

    for (let u = 0; u < 12; u++) {
        if (uvi_level < (u + 1) && uvi_level >= u) {
            document.getElementById('uvi_number' + (location_number + 1)).classList.add('uv_index_' + (u + 1))
        }
    }
}

export function uviText(index) {

    let rating = ''

    if (index < 3) { rating = 'Low' }
    if (index >= 3) { rating = 'Moderate' }
    if (index >= 5) { rating = 'High' }
    if (index >= 8) { rating = 'Very High' }
    if (index >= 10) { rating = 'Extreme' }

    const UVI_TEXT = [
        `<strong>${rating}</strong>: You can safely enjoy being outside!`,
        `<strong>${rating}</strong>: Seek shade during midday hours! Wear a shirt, hat and sunscreen!`,
        `<strong>${rating}</strong>: Avoid the sun! Shade, shirt, sunscreen and UV glasses!`,
    ]

    return index < 4 ? UVI_TEXT[0] : index >= 6 ? UVI_TEXT[2] : UVI_TEXT[1]
}

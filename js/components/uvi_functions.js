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

    const UVI_TEXT = [
        'You can safely enjoy being outside!',
        'Seek shade during midday hours! Slip on a shirt, sunscreen and hat!',
        'Avoid out the sun during midday! Shade, shirt, sunscreen and hat are a must!'
    ]
    return index < 4 ? UVI_TEXT[0] : index >= 8 ? UVI_TEXT[2] : UVI_TEXT[1]

}

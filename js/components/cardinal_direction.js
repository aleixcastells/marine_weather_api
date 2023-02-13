export function windCardinalDirection(degrees) {

    const CARDINAL_POINTS = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5]
    const DELTAS = []
    CARDINAL_POINTS.forEach((point) => { DELTAS.push(Math.abs(degrees - point)) })

    let smallest_delta = Math.min(...DELTAS)
    let closest_degree = CARDINAL_POINTS[DELTAS.indexOf(smallest_delta)]

    // ↖ ↗ ↘ ↙ ← → ↑ ↓
    switch (closest_degree) {
        case 0: return `↓`
        case 22.5: return `↙`
        case 45: return `↙`
        case 67.5: return `↙`
        case 90: return `←`
        case 112.5: return `↖`
        case 135: return `↖`
        case 157.5: return `↖`
        case 180: return `↑`
        case 202.5: return `↗`
        case 225: return `↗`
        case 247.5: return `↗`
        case 270: return `→`
        case 292.5: return `↘`
        case 315: return `↘`
        case 337.5: return `↘`
    }
}
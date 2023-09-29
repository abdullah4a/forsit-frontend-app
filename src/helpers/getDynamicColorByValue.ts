const colorRanges = [
    { max: -50, color: "#FF0000" },   // Red for values less than -50
    { max: -20, color: "#FF5733" },   // Orange for values between -50 and -20
    { max: 0, color: "#FFCE56" },     // Yellow for values between -20 and 0
    { max: 10, color: "#36A2EB" },    // Blue for values between 0 and 10
    { max: 30, color: "#2ECC71" },    // Green for values between 10 and 30
    { max: 50, color: "#00FF7F" },    // Spring Green for values between 30 and 50
    { max: 100, color: "#00FF00" },   // Bright Green for values greater than 50
];
export const getDynamicColorByValue = (value: number) => {
    for (const range of colorRanges) {
        if (value <= range.max) {
            return range.color;
        }
    }
    return "#00FF00";
}
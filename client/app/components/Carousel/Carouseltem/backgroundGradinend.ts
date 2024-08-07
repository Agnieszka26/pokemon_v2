
//@ts-nocheck
import tinycolor from "tinycolor2"
const backgroundGradient = (color: string ) => {
const firstColor = tinycolor(color).lighten(50).toString();
const secondColor = tinycolor(color).darken(30).toString();
`linear-gradient(180deg, ${firstColor}, ${secondColor})`
    return `linear-gradient(180deg, ${firstColor}, ${secondColor})`
 }


 export default backgroundGradient

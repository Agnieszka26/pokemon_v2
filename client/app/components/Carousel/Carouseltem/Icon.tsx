import { FaHeart } from "react-icons/fa";
import { LuSword } from "react-icons/lu";
import { GiCrossedSwords } from "react-icons/gi";
import { GiArrowsShield } from "react-icons/gi";
import { FaShieldAlt } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { colors } from "@/app/ui/colors";
const Icon = ({ icon }: { icon: string }) => {

    switch (icon) {
        case "hp":
            return <FaHeart color={ colors.pokemonYellow}/>
         case "attack":
            return <LuSword color={ colors.pokemonYellow}/>
        case "defense":
            return <FaShieldAlt color={ colors.pokemonYellow}/>
        case "special-attack":
            return <GiCrossedSwords color={ colors.pokemonYellow}/>
        case "special-defense":
            return <GiArrowsShield  color={ colors.pokemonYellow}/>
        case "speed":
            return <FaRunning  color={ colors.pokemonYellow}/>


        default:
            return <>
                x</>
    }

}
export default Icon

import { TypesPokemon } from "@/app/core/types/Types"
import { colorsTypes } from "@/app/ui/colors"

export const TypeComponent = ({ label }: { label: TypesPokemon }) => {

    return <div className='text-center block p-4'>
      <div className={`w-4 h-4 rounded-full mx-auto`} style={{ backgroundColor: colorsTypes[label] }}> </div>
      <p className=' text-sm font-light text-gray-200 uppercase'>{label}</p>
    </div>
  }

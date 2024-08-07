import Icon from "./Icon"

export const StatComponent = ({ label, value, icon }: { label: string, value: string, icon?: string }) => {
  return <div className='text-center block'>
    <p className='font-normal text-white' >{value}</p>
    <p className=' text-sm font-light text-gray-200 uppercase flex justify-center items-center gap-2'>{icon && <Icon icon={icon} />} {label}</p>
  </div>
}


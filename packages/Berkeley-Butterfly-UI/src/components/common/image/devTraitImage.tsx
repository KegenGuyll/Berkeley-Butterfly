import React from 'react'
import Image from "next/image";

enum Traits {
  'NORMAL',
  'STAR',
  'SUPERSTAR',
  'X-FACTOR',
}

interface Props {
  devTrait: number
}

const DevTraitImage = ({devTrait}: Props) => {

  if(devTrait > 3 || devTrait < 0) return null


  return (
    <Image
      className="rounded-full object-cover"
      alt={`${Traits[devTrait]}`}
      fill
      src={`/images/dev-traits/${devTrait}.png`}
    />
  )

}


export default DevTraitImage
import React from 'react'
import "../App.css"
const Tile = ({colIndex,tile}) => {
  return (
    <div className={`tile tile-${tile} w-[100px] h-[100px] text-[24px] flex justify-center items-center m-[5px] rounded-[6px] relative`} key = {colIndex}>
        {tile !==0 && tile}
    </div>
  )
}

export default Tile
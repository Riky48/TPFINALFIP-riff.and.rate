import { useState } from "react"

export const Menu = (id:number) => {
    const [showMenu,setShowMenu] = useState(false)
    useState(()=>{
        setShowMenu(false)
    })



    return (
        <ul>
            <li>Editar Publicacion</li>
            <li>Eliminar Publicacion</li>
        </ul>
    )
}
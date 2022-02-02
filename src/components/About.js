import React, { useContext } from 'react'
import Notecontext from '../contexapi/Notecontext'

export const About = () => {
    const a= useContext(Notecontext)
    return (
        <div>
            The name is {a.name} and the class is {a.class}
        </div>
    )
}

export default About
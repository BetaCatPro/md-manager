import React, { useState, useEffect } from 'react'

const useKeyPress = (targetKeyCode) => {
    const [keyPressed, setKeyPressed] = useState(false)

    const keyDownHnadler = ({ keyCode }) => {
        if(keyCode === targetKeyCode) {
            setKeyPressed(true)
        }
    }

    const keyUpHandler = ({ keyCode }) => {
        if(keyCode === targetKeyCode) {
            setKeyPressed(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', keyDownHnadler)
        document.addEventListener('keyup', keyUpHandler)

        return () => {
            document.removeEventListener('keydown', keyDownHnadler)
            document.removeEventListener('keyup', keyUpHandler)
        }
    }, [])

    return keyPressed
}

export default useKeyPress

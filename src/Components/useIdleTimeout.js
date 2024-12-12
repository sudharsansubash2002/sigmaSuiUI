import { useContext, useState } from "react"
import { useIdleTimer } from "react-idle-timer"
import AuthContext from "./AuthContext";

/**
 * @param onIdle - function to notify user when idle timeout is close
 * @param idleTime - number of seconds to wait before user is logged out,1000 ms - 5 sec
 */

const useIdleTimeout = ({ onIdle, idleTime = 1 }) => {
    
    const idleTimeout = 80000 * idleTime;
    const [isIdle, setIdle] = useState(false)
    const { logout } = useContext(AuthContext);

    const handleIdle = () => {
        setIdle(true)
        logout()
    }

    const idleTimer = useIdleTimer({
        timeout: idleTimeout,
        promptTimeout: idleTimeout / 2,
        onPrompt: onIdle,
        onIdle: handleIdle,
        debounce: 500
    })

    return {
        isIdle,
        setIdle,
        idleTimer
    }
}

export default useIdleTimeout;

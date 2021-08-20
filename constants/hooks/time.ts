export function useTimeHook() {
    const convertTimeToSeconds = () => {
        const getTime = () => {
            const today = new Date();
            const h = today.getHours();
            const m = today.getMinutes();
            const s = today.getSeconds();
            return h+":"+m+":"+s;
        }
        const [hours, minutes, seconds] = getTime().split(':');
        return (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds);
    }

    const formatSeconds = (seconds: number) => {
        function z(n: any) {return (n < 10 ? '0' : '') + n;}
        return z(seconds / 3600 | 0) + ':' + z((seconds % 3600) / 60 | 0)
    }

    const timeMessage = (time: any) => {
        new Date(time.toDate()).toUTCString()
    }

    const getTime = () => {
        const today = new Date();
        const h = today.getHours();
        const m = today.getMinutes();
        const s = today.getSeconds();
        return h+":"+m+":"+s;
    }
    return {
        getTime,
        timeMessage,
        formatSeconds,
        convertTimeToSeconds
    }
}

export default function timeParser(time:Date|undefined, withYear:boolean){
    if(time){
        let minutes:string|number = time.getMinutes()
        let day:string|number = time.getDate()
        let month:string|number = time.getMonth() + 1
        let year = time.getFullYear()

        if(minutes < 10){
            minutes = '0' + minutes
        }

        if(day < 10){
            day = '0' + day
        }

        if(month < 10){
            month = '0' + month
        }

        if(withYear){
            return `${day}/${month}/${year}`
        }else{
            return `${day}.${month} ${time.getHours()}:${minutes}`
        }
    }
    return undefined
}



export default function(){
    let date = new Date();
    const year =  date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `${year}-${month}-${day}  ${hour>=10?hour:'0'+hour}:${minute>=10?minute:'0'+minute}:${second>=10?second:'0'+second}`

}
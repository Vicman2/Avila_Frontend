exports.setInLocalStorage = (key, value, expiryTimeInMillSec)=>{
    const now = new Date();
    const expiry = now.getTime() + expiryTimeInMillSec
    let item = {
        value, 
        expiry
    };
    item = JSON.stringify(item)
    localStorage.setItem(key, item)
}

exports.getInLocalStorage = (key) => {
    let item = localStorage.getItem(key)
    if(!item) return null
    item = JSON.parse(item)
    const now = new Date()
    if(now.getTime() > item.expiry){
        localStorage.removeItem(key)
        return null
    }
    return item.value
}
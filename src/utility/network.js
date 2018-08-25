function getCall(url, successCallback, errorCallback){
    fetch(url, {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "user-key": "99602fd2da0b1d1a976d947037a4bcd6"
        },
    })
    .then(res => res.json())
    .then(
        (result) => {
            successCallback(result)
        },
        (error) => {
            errorCallback(error)
        }
    )
}

export default getCall;
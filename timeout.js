let deplay = function(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    });
}
module.exports = {
    deplay: deplay
}
updateTimes();
setInterval(() => {
    updateTimes();
}, 5000);

function updateTimes() {
    let times = document.getElementsByClassName("order-time");
    let current = new Date();
    for (let time of times) {
        let oldTime = new Date(time.dataset.time);
        let difference = current - oldTime;
        let newTime;
        if (difference > 60 * 60 * 1000 * 24) {
            newTime = "Over a day";
        } else if (difference > 60 * 60 * 1000) {
            let hour = Math.floor(difference / 1000 / 60 / 60);
            newTime = new Intl.DateTimeFormat("en-GB", {
                minute: "2-digit",
                second: "2-digit",
            }).format(difference);
            newTime = hour + ":" + newTime;
        } else {
            newTime = new Intl.DateTimeFormat("en-GB", {
                minute: "2-digit",
                second: "2-digit",
            }).format(difference);
        }

        time.innerText = newTime;
    }
}

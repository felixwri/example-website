updateTimes();
setInterval(() => {
    updateTimes();
}, 5000);

function updateTimes() {
    let times = document.getElementsByClassName("active-clock");
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

function setStaticClocks() {
    let times = document.getElementsByClassName("static-clock");
    for (let time of times) {
        let date = new Date(time.dataset.time);
        let newTime = new Intl.DateTimeFormat("en-GB", {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
        time.innerText = newTime;
    }
}
setStaticClocks();

async function changeStatus(id, status) {
    const response = await fetch(`http://localhost:5000/staff/order-status`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            status: status,
        }),
    });

    const content = await response.json();

    if (content.success) {
        if (status === "cancelled") moveElement(id, "cancelled-orders");
        else if (status !== "cancelled") moveElement(id, "active-orders");
    }
}

function moveElement(id, target) {
    let targetElement = document.getElementById(target);
    let movedElement = document.getElementById(`id-${id}`);
    targetElement.appendChild(movedElement);
}

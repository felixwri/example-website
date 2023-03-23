console.log(tables);

function tablesInUse() {
    let TIU = document.getElementById("tables-in-use");
    let amount = document.getElementById("tables-container").children.length;
    TIU.innerText = "Tables in use: " + amount;
}

function init() {
    let container = document.getElementById("tables-container");
    if (!tables || tables.length === 0) {
        container.innerHTML = `
        <div id="no-tables">There are no active tables</div>
        `;
        return;
    }

    let waiters = document.getElementsByClassName("table-waiter");
    for (let element of waiters) {
        element.innerText = users[element.dataset.waiter][2];
    }

    tablesInUse();
}

init();

async function assignNewTable() {
    const response = await fetch(`http://localhost:5000/staff/add`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: null,
    });

    const content = await response.json();
    console.log(content);
    if (content.success) {
        addTable(content);
    }
}

function addTable(content) {
    let container = document.getElementById("tables-container");
    container.innerHTML += `
    <div class="table" data-id="${content.table_number}" data-waiterID="${content.waiter_id}">
        <div class="table-number">${content.table_number}</div>
        <div class="table-waiter" data-waiter="${content.waiter_id}">${users[content.waiter_id][2]}</div>
        <svg
            onclick="clearTable(this)"
            class="table-clear"
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            width="48"
            viewBox="0 0 48 48"
        >
            <path
                d="M24 26.1 13.5 36.6q-.45.45-1.05.45-.6 0-1.05-.45-.45-.45-.45-1.05 0-.6.45-1.05L21.9 24 11.4 13.5q-.45-.45-.45-1.05 0-.6.45-1.05.45-.45 1.05-.45.6 0 1.05.45L24 21.9l10.5-10.5q.45-.45 1.05-.45.6 0 1.05.45.45.45.45 1.05 0 .6-.45 1.05L26.1 24l10.5 10.5q.45.45.45 1.05 0 .6-.45 1.05-.45.45-1.05.45-.6 0-1.05-.45Z"
            />
        </svg>
    </div>
    `;
    tablesInUse();
}

async function clearTable(e) {
    let table = e.parentNode;

    let tableNumber = table.dataset.id;

    const response = await fetch(`http://localhost:5000/staff/clear`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: tableNumber }),
    });

    const content = await response.json();
    console.log(content);
    if (content.success) {
        table.remove();
        tablesInUse();
    }
}

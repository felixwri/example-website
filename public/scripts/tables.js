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
    const response = await fetch(`http://localhost:5000/staff`, {
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
    </div>
    `;
    tablesInUse();
}

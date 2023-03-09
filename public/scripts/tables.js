console.log(tables);

if (!tables || tables.length === 0) {
    let container = document.getElementById("tables-container");
    container.innerHTML = `
    <div id="no-tables">There are no active tables</div>
    `;
}

async function assignNewTable() {
    const response = await fetch(`http://localhost:5000/staff`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: 1 }),
    });

    const content = await response.json();
    console.log(content);
}

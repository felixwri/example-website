console.log(tables);

if (!tables) {
    let container = document.getElementById("tables-container");
    container.innerHTML = `
    <div id="no-tables">There are no active tables</div>
    `;
}

function startApp() {   
  // Your entire app should not necessarily be coded inside this 
    // single function (though there's no penalty for that), 
    // so create and use/call additional functions from here
  
    // pls remove the below and make some magic in here!
const themeToggler = document.querySelector(".theme-toggler")


  // CHANGE THEME
  themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
     })

  // Search Bar
  const searchInput = document.getElementById('search');
  const rows = document.querySelectorAll('tbody tr');
  // console.log(rows);

  searchInput.addEventListener('keyup', function(event) {
    const k = event.target.value.toLowerCase();
    rows.forEach(row => {
      row.querySelector('td').textContent.toLowerCase().startsWith(k) 
        ? row.style.display = ''
        : row.style.display = 'none';
    });
  });

  // Table Sorting
  /**  
  *
  * @param {HTMLTableElement} Tablethat is to be sorted
  * @param {number} The Index of The column to sort
  * @param {boolean} asc > sorted in ascending order, desc > sorted in descending order
  */
  
  function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sorting each row
    const sortedRows = rows.sort((a, b) => {
      const aColText = a.querySelector(`td:nth-child(${column + 1 })`).textContent.trim();
      const bColText = b.querySelector(`td:nth-child(${column + 1 })`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier); 
      // console.log(aColText);
      // console.log(bColText);
    }); 
      // console.log(sortedRows);

    // Remove all existing TRs from the table
    while(tBody.firstChild) {
      tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how current column is sorted 
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1 })`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1 })`).classList.toggle("th-sort-desc", !asc);
    

    
  }

  document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
      const tableElement = headerCell.parentElement.parentElement.parentElement;
      const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
      const currentIsAscending = headerCell.classList.contains("th-sort-asc");

      sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
  });
  
}  
  // ======= DO NOT EDIT ============== //
  export default startApp;
  // ======= EEND DO NOT EDIT ========= //
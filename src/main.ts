import './style.css';


const size = 20;

type Matrix = Array<boolean[]>;
const matrix: Matrix = new Array(size).fill(new Array(size).fill(false));

let tableElement: HTMLTableElement | null | undefined;
let tableRows: HTMLTableRowElement[];
let tableCells: HTMLTableCellElement[][];

const getCellSize = () => {
  const cellWidth = (window.innerWidth - 100) / size;
  const cellHeight = (window.innerHeight - 100) / size;
  return Math.min(cellHeight, cellWidth);
};
const appElement = document.getElementById('app');

const onCellClick = (element: HTMLTableCellElement, cellPosition: [number, number]) => {
  const cell = matrix[cellPosition[0]][cellPosition[1]] = !matrix[cellPosition[0]][cellPosition[1]];
  element.style.backgroundColor = cell ? '#9BA4B5' : '#212A3E';
  console.log(cell);
};

const createTableElement = (matrix: Matrix) => {
  let tableElement = '<table class=table>';
  for (let i = 0;i < matrix.length;i++) {
    tableElement += '<tr class=table-row>';
    for (let j = 0;j < matrix[0].length;j++) {
      tableElement += `<td class=table-cell></td>`;
    };
    tableElement += '</tr>';
  };
  tableElement += '</table>';
  return document.createRange().createContextualFragment(tableElement);
};

const init = () => {

  appElement?.appendChild(createTableElement(matrix));

  tableElement = appElement?.querySelector('table');
  tableRows = Array.from(tableElement?.querySelectorAll('tr')!);
  tableCells = tableRows.map(row => Array.from(row.querySelectorAll('td')));

  tableCells.forEach((row, i) =>
    row.forEach((cellElement, j) => {
      cellElement.style.width = getCellSize() + 'px';
      cellElement.style.height = getCellSize() + 'px';
      cellElement.addEventListener('click', (event) => onCellClick(event.target as HTMLTableCellElement, [i, j]));
      cellElement.style.backgroundColor = matrix[i][j] ? '#9BA4B5' : '#212A3E';

    }));

};

window.addEventListener("load", init);

window.addEventListener('resize', () => {
  tableCells.forEach((row, i) => {
    row.forEach((cell, j) => {
      cell.style.width = getCellSize() + 'px';
      cell.style.height = getCellSize() + 'px';
      cell.style.backgroundColor = matrix[i][j] ? '#9BA4B5' : '#212A3E';
    });
  });
})







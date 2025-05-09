import { describe, test, expect } from 'vitest';

/*
Les scenarios : 

Scenario 0 : 
Pas de mine, pas de numéro : 

'......\n......\n......'
-> 
'000000\n000000\n000000'

---------------------------------------------------------------------------

Scenario 1 :

Une mine au premier emplacement
Doit générer une alerte niveau 1 a sa droite et en bas, ainsi qu'a sa diagonale

*.....
......
......

*10000
110000
000000

Analyse : 

Pour une mine en 0,0 (origine en haut a gauche)

Il faut ajouter 1 aux cases 0,1 ; 1,0 et 1,1

---------------------------------------------------------------------------


Scenario 2 : 

Une mine au milieu du plateau doit génerer une alerte de niveau 1 autour d'elle
diagonales incluses

......
...*..
......

001110
001*10
001110

Analyse : 

Pour une mine en x,y

Il faut ajouter 1 aux cases 
x,y+1 ; en haut
x+1,y ; a droite
x,y-1 ; en bas
x-1,y ; a gauche

x+1,y+1 ; diagonale basse droite
x+1,y-1 ; diagonale haute droite
x-1,y+1 ; diagonale basse gauche
x-1,y-1 ; diagonale haute gauche


---------------------------------------------------------------------------

Scenario 3 : 

Deux mines côte a côte doivent generer des alertes de niveau 2

......
..**..
......

012210
01**10
012210


---------------------------------------------------------------------------

Scenario 4 : 

Trois mines côte a côte doivent generer des alertes de niveau 3

......
.***..
......

123210
1***10
123210

Deux mines espacées d'une case doivent générer une alerte de niveau 2 entre elles.

......
.*.*..
......

112110
1*2*10
112110

Boss final

.*.**.
....*.
..*...


1*2**2
1234*2
01*211


*/

describe('minesweeper should work', () => {
	test('No mine should return array with stars everywhere', () => {
		const solution = minesweeper('......\n......\n......');
		expect(solution).toEqual('000000\n000000\n000000');
	});

	test("Une mine au premier emplacement doit générer une alerte niveau 1 a sa droite et en bas, ainsi qu'a sa diagonale", () => {
		const solution = minesweeper('*.....\n......\n......');
		expect(solution).toEqual('*10000\n110000\n000000');
	});

	test("Une mine au milieu du plateau doit génerer une alerte de niveau 1 autour d'elle diagonales incluses", () => {
		const solution = minesweeper('......\n...*..\n......');
		expect(solution).toEqual('001110\n001*10\n001110');
	});

	test('Deux mines côte a côte doivent generer des alertes de niveau 2', () => {
		const solution = minesweeper('......\n..**..\n......');
		expect(solution).toEqual('012210\n01**10\n012210');
	});

	test('Trois mines côte a côte doivent generer des alertes de niveau 3', () => {
		const solution = minesweeper('......\n.***..\n......');
		expect(solution).toEqual('123210\n1***10\n123210');
	});

	/*test('final boss', () => {
		const solution = minesweeper('.*.**.\n....*.\n..*...');
		expect(solution).toEqual('1*2**2\n1234*2\n01*211');
	});
	*/
});

// Implémentation fictive pour éviter l’erreur
const minesweeper = (board) => {
	const data = createCells(board);

	const responseCells = new Array(data.col * data.row).fill(0);

	console.log(data);

	data.cells.forEach((el, index) => {
		if (el === '*') {
			responseCells[index] = '*';

			// A droite

			handleCellUdate(responseCells, index + 1);

			// a gauche
			handleCellUdate(responseCells, index - 1);

			// en bas
			handleCellUdate(responseCells, index + data.col);

			// en haut
			handleCellUdate(responseCells, index - data.col);

			// diagonale basse droite

			handleCellUdate(responseCells, index + data.col + 1);

			if (index % data.col !== 0) {
				// diagonale basse gauche
				handleCellUdate(responseCells, index + data.col - 1);
			}

			// diagonale haute gauche
			handleCellUdate(responseCells, index - data.col - 1);

			// diagonale haute droite
			handleCellUdate(responseCells, index - data.col + 1);
		}

		return;
	});
	const response = createResponse(responseCells, data.col);

	return response;
};

const createCells = (board) => {
	const arr = board.split('\n');

	const row = arr.length;
	const col = arr[0].length;

	const cells = arr
		.map((element) => {
			return element.split('');
		})
		.reduce((prev, curr) => {
			return [...prev, ...curr];
		}, []);

	return { cells, row, col };
};

const createResponse = (cells, col) => {
	const string = cells.join('');
	let result = '';
	for (let i = 0; i < string.length; i += 1) {
		if (i % col === 0 && i !== 0) {
			result += '\n';
		}
		result += string[i];
	}
	return result;
};

const handleCellUdate = (responseCells, target) => {
	if (responseCells[target] === '*') {
		return;
	}

	responseCells[target]++;
};

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

	/*
    
        

        *.....
        ......
        ......

        *10000
        110000
        000000

        Analyse : 

        Pour une mine en 0,0 (origine en haut a gauche)

        Il faut ajouter 1 aux cases 0,1 ; 1,0 et 1,1
    */

	test("Une mine au premier emplacement doit générer une alerte niveau 1 a sa droite et en bas, ainsi qu'a sa diagonale", () => {
		const solution = minesweeper('*.....\n......\n......');
		expect(solution).toEqual('*10000\n110000\n000000');
	});

	/*test('final boss', () => {
		const solution = minesweeper('.*.**.\n....*.\n..*...');
		expect(solution).toEqual('1*2**2\n1234*2\n01*211');
	});
	*/
});

// Implémentation fictive pour éviter l’erreur
const minesweeper = (board) => {
	const cells = createCells(board);

	const responseCells = new Array(3).fill(new Array(6).fill(0));

	const response = createResponse(responseCells);

	return response;
};

const createCells = (board) => {
	const arr = board.split('\n');

	const cells = arr.map((element) => {
		return element.split('');
	});
	return cells;
};

const createResponse = (cells) => {
	const arr = cells.map((el) => el.join(''));

	return arr.join('\n');
};

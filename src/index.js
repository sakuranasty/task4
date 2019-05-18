window.onload = () => {
    // Массив символов чтобы сформировать название хода, верстать доску
    let letters = [ 'a','b','c','d','e','f','g','h' ];

    /* создаем двумерный массив доски и заполняем его позициями
    ( может для задания 4 можно присвоить id  по позиции массива (например id='d4')) или вычислять по формуле ix8+j*/
    let board = [];
    for (let i = 0;i < 8;i++) {
        board[i]=[];

        for(let j=0;j<8;j++){
            board[i].push(letters[j]+(i+1));
        }
    }
         // функция проверки валидности шага. можно было использовать switch
   function stepUp(direction,coordinates) {
       if(direction == 'u'){
        coordinates.numb++;

        if(coordinates.numb > 7) { return false };

        return true;
       }

       if(direction == 'r') {
        coordinates.char++;

           if(coordinates.char > 7) { return false };

           return true;
       }

       if(direction == 'd') {
        coordinates.numb--;

        if(coordinates.numb < 0) { return false };

        return true;
        }

        if(direction == 'l' ) {
            coordinates.char--;

            if(coordinates.char < 0) { return false };

            return true;
       }

       return false;
   }

   // формируем объект координаты чтобы передать его в функцию stepUp по ссылке 
   function Coordinate(char,numb){
    this.char=char;
    this.numb=numb;
    }

    // создаем массив для возможных ходов (массив coordinate)
   let possibilities=[];
   
   // программируем возможные ходы для фигуры
   let knightMoves = [
       ['u','u','r'],
       ['u','u','l'],
       ['r','r','u'],
       ['r','r','d'],
       ['d','d','r'],
       ['d','d','l'],
       ['l','l','u'],
       ['l','l','d'],
    ]

    // функция для проверки валидности всех вариантов движения фигуры
    function tryMove(moves,coordinates) {
        let valid = true;

        // пробуем каждый вариант движения
        for(let i = 0;i < moves.length; i++) {
            for(let j = 0;j < moves[i].length;j++) {
                valid=stepUp(moves[i][j],coordinates);
                if(valid == false) {break;}
            }
            // если ход возможен, пушим его координаты в массив
            if(!valid) {
                valid = true;
                coordinates = new Coordinate(inputChar,inputNum);
                continue; }
            possibilities.push(coordinates);
            coordinates = new Coordinate(inputChar,inputNum);
        }
    }

    // создаем экземпляр координаты от ввода пользователя

    // тестируем все движения
    // tryMove(knightMoves,coord);

    // рисуем поле
    let gameDiv = document.getElementById('board');
    let charCells = document.querySelectorAll('.letters');

    function drawBoard(gameDiv,charCells) {
        // заполняем каждый див letters
        for(let j = 0;j<[...charCells].length;j++) {

            // создаем ячейку с буквой,вписываем в нее букву и добавляем в массив
            for(let i = 0; i < letters.length; i++) {
                let charCell = document.createElement('div');
                charCell.classList.add('letter');
                charCell.innerHTML = letters[i];
                charCells[j].appendChild(charCell);
            }
        }

        /* рисуем линии доски, первый элемен - ячейка с инексом, далее 8 ячеек 
        доски, для четных рядов сначала белая,потом черная, для нечетных рядов наоборот.
        последняя ячейка( десятая) с индексом.*/
        for(let i = 8; i >= 1; i--) {
            let indCellbeg = document.createElement('div');
            indCellbeg.classList.add('index');
            indCellbeg.innerHTML=i;
            let boardLine = document.createElement('div');
            boardLine.appendChild(indCellbeg);
            for(let j = 0; j < 4;j++) {
                let blackTile = document.createElement('div')
                blackTile.classList.add('tile');
                blackTile.classList.add('black');
                let whiteTile = document.createElement('div')
                whiteTile.classList.add('tile');
                if((i % 2) == 0) {
                    boardLine.appendChild(whiteTile);
                    boardLine.appendChild(blackTile);
                } else {
                    boardLine.appendChild(blackTile);
                    boardLine.appendChild(whiteTile);
                }
            }
            let indCellend = document.createElement('div');
            indCellend.classList.add('index');
            indCellend.innerHTML=i;
            boardLine.appendChild(indCellend);
            gameDiv.appendChild(boardLine);
        }
    }
    let tiles = [];
    let paintedTiles = [];
    let inputNum;
    let inputChar;
    function paintPosssible(e) {
        possibilities = [];
        paintedTiles = [];
        tiles.forEach(element => {element.removeAttribute('style')});
        const position = tiles.indexOf(e.target);
        console.log(position);
        inputNum = parseInt(position/8);
        inputChar = position % 8;
        coord = new Coordinate(inputChar,inputNum);
        tryMove(knightMoves,coord);

        for(let i = 0; i < possibilities.length; i++){
            paintedTiles[i] = tiles[(possibilities[i].numb) * 8 + possibilities[i].char]
        }
        paintedTiles.forEach(element => {
            element.style.backgroundColor = 'blue';
        })
    }

    drawBoard(gameDiv,charCells);

    
     tiles = [...document.querySelectorAll('.tile')];
    
     tiles.forEach(element => {
         element.addEventListener('click', paintPosssible);
     })
   

    
}

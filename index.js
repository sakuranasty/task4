window.onload = () => {
    let letters = [ 'a','b','c','d','e','f','g','h' ];
    let board = [];
    for (let i = 0;i < 8;i++) {
        board[i]=[];

        for(let j=0;j<8;j++){
            board[i].push(letters[j]+(i+1));
        }
    }
         
   function stepUp(direction,coordinates) {
       if(direction == 'u'){
        coordinates.numb++;

        if(coordinates.numb > 7) { return false };

        return true;
       }

       if(direction == 'r') {
        coordinates.char++;
           if(coordinates.numb > 7) { return false };

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

   let input = prompt('введите позицию коня');

   input.replace(' ','').replace('.','').replace(',','').toLowerCase();
   char = Number(letters.indexOf(input[0]));
   numb = Number(input[1]);
   class Coordinates {
       constructor(char,numb){
           char;
           numb;
       }
   }

   let possibilities=[];
   
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
    function tryMove(moves,coordinates) {
        let flag = true;

        for(let i = 0;i < moves.length; i++) {
            for(let j = 0;j < moves[i].length;j++) {
                flag=stepUp(moves[i][j],coordinates);
            }

            if(flag) {
                possibilities.push(coordinates);
            }

            coordinates=new Coordinates(Number(letters.indexOf(input[0])),Number(input[1]-1));
        }
    }
    let coord = new Coordinates(Number(letters.indexOf(input[0])),Number(input[1]-1));
    tryMove(knightMoves,coord);
    let message='возможные ходы: ';
    possibilities.forEach((element) => {
        // TODO я не транспилировала код, поэтому не знаю сработает ли вывод
        // message+= ('${letters[element.char]}${(element.numb+1)}; ');
        // это работает
        message += (letters[element.char] + (element.numb+1) + '; ');
    });

    alert(message);

}

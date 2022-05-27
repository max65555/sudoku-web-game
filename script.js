$(document).ready(function () {
    game1 = [
        [3, 9, -1,   -1, 5, -1,   -1, -1, -1],
        [-1, -1, -1,   2, -1, -1,   -1, -1, 5],
        [-1, -1, -1,   7, 1, 9,   -1, 8, -1],

        [-1, 5, -1,   -1, 6, 8,   -1, -1, -1],
        [2, -1, 6,   -1, -1, 3,   -1, -1, -1],
        [-1, -1, -1,   -1, -1, -1,   -1, -1, 4],

        [5, -1, -1,   -1, -1, -1,   -1, -1, -1],
        [6, 7, -1,   1, -1, 5,   -1, 4, -1],
        [1, -1, 9,   -1, -1, -1,   2, -1, -1]
    ];
    game2 = [
        [5, 3, -1,   -1, 7, -1,   -1, -1, -1],
        [6, -1, -1,   1, 9, 5,   -1, -1, -1],
        [-1, 9, 8,   -1, -1, -1,   -1, 6, -1],

        [8, -1, -1,   -1, 6, -1,   -1, -1, 3],
        [4, -1, -1,   8, -1, 3,   -1, -1, 1],
        [7, -1, -1,   -1, 2, -1,   -1, -1, 6],

        [-1, 6, -1,   -1, -1, -1,   2, 8, -1],
        [-1, -1, -1,   4, 1, 9,   -1, -1, 5],
        [-1, -1, -1,   -1, 8, -1,   -1, 7, 9]
    ]
    PuzzleDecoration();
    $("#button_start").click(function (e) { 
        e.preventDefault();
        if ($("#de").prop("checked")) {
            current_game = game1;
            StartUp(game1);
         }
         else if ($("#tb").prop("checked")) {
            current_game = game2;
            StartUp(game2);
         }
         else if ($("#kho").prop("checked")) {
            current_game = "game3";
            StartUp(game3);
         }
    });   
    $("#button_solve").click(function (e) { 
        e.preventDefault();
        SolveSudoku(current_game);
        console.log("test");
    });
}); 
function PuzzleDecoration(){
    for(var i = 0 ; i < 9 ; i++){
        for(var j = 0 ; j < 9 ; j++){
            var position = "#t" + i + j;
            if(i==2 || i == 5){
                $(position).addClass("border__b--bottom");
            }
            if(j==2 || j ==5){
                $(position).addClass("border__b--right");
            }
        }
    }
}
function StartUp(puzzle){
    for(var i = 0 ; i < 9 ; i++){
        for(var j = 0 ; j < 9 ; j++){
            var position = "#t" + i + j;
                $(position).removeClass("already_have");
        }
    }
    for(var i = 0 ; i < 9 ; i++){
        for(var j = 0 ; j < 9 ; j++){
            var position = "#t" + i + j;
            if(puzzle[i][j] == -1){
                // $(position).addClass("lost_number");
                $(position).html("");
            }
            else{
                $(position).html(puzzle[i][j]);
                $(position).addClass("already_have");
            }
        }
    }
}
// this function is work well
function find_next_empty(puzzel){
    for(var i = 0 ; i < 9 ; i++){
        for(var j = 0 ; j < 9 ; j++){
            if(puzzel[i][j] == -1){
                return[i,j];
            }
        }
    }
    return null;
}
//check 
function Check(puzzle, guess, row , col){
    row_vals = puzzle[row];
    for(var i = 0 ; i < 9 ; i++){
        if(guess == row_vals[i]){
            return false;
        }
    }
    for(var i = 0 ; i < 9 ; i++){
        col_vals = puzzle[i][col]
        if(guess == col_vals){
            return false;
        }
    }
    var row_start = (Math.floor(row/3))*3;
    var col_start = (Math.floor(col/3))*3;
    var row_start_max = row_start + 3;
    var col_start_max = col_start + 3;
    
    for(row_start; row_start < row_start_max ; row_start++){
        for(col_start ; col_start < col_start_max ; col_start++){
            if(puzzle[row_start][col_start] == guess){
                return false;
            }
        }
    }
    return true;
} 
async function changeTable(row,col,guess){
    var position = "#t" + row + col;
    $(position).html(guess);
}
function SolveSudoku(puzzle){
        var row = find_next_empty(puzzle)[0];
        var col = find_next_empty(puzzle)[1];
        if(row == null){
            console.log("test row == null");
            return true;
        }   
        for(var guess = 1 ; guess < 10 ; guess++){
            if(Check(puzzle,guess,row,col)){
                puzzle[row][col] = guess;
                changeTable(row,col,guess);
                if(SolveSudoku(puzzle)){
                    return true;
                }
            }
            puzzle[row][col] = -1;
        }
    return false;
}

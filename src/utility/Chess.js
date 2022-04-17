export const fenDecoder = (fen) => {
  let emptySpaces = 0
  let boardArr = []
  const fenArray = fen.replace(/\//g, '').split(' ')
  
  //peice position
  fenArray[0].split('').forEach(character => {
    if (character === '1' || character === '2' || character === '3' || character === '4' || character === '5' || character === '6' || character === '7' || character === '8') emptySpaces = parseInt(character)
    while (emptySpaces !== 0) {
      boardArr.push(null)
      emptySpaces--
    }
    //displays unicode chess pieces
    if (character === 'r') character = '\u265c'
    if (character === 'n') character = '\u265e'
    if (character === 'b') character = '\u265d'
    if (character === 'q') character = '\u265b'
    if (character === 'k') character = '\u265a'
    if (character === 'p') character = '\u265f'
    if (character === 'P') character = '\u2659'
    if (character === 'K') character = '\u2654'
    if (character === 'Q') character = '\u2655'
    if (character === 'B') character = '\u2657'
    if (character === 'N') character = '\u2658'
    if (character === 'R') character = '\u2656'
    
    boardArr.push(character)
  })

  boardArr = boardArr.filter(character => character !== '1' && character !== '2' && character !== '3' && character !== '4' && character !== '5' && character !== '6' && character !== '7' && character !== '8')

  const fenObject = {
    piecePosition: boardArr,
    isWhiteToMove: fenArray[1] === 'w' ? true : false,
    isWhiteKingsideCastleLegal: fenArray[2].includes('K'),
    isWhiteQueensideCastleLegal: fenArray[2].includes('Q'),
    isBlackKingsideCastleLegal: fenArray[2].includes('k'),
    isBlackQueensideCastleLegal: fenArray[2].includes('q'),
    enPassantTarget: fenArray[3] === '-' ? null : fenArray[3],
    is50MoveDraw: parseInt(fenArray[4]) === 100 ? true : false,
    numOfFullmoves: parseInt(fenArray[5])
  }
  return fenObject
}

export const pieceData = (unicode) => {
  let piece = {
    color: '',
    name: '',
    abbreviation: '',
    value: 0
  }
  switch (unicode) {
    case '\u265c':
      piece.color = 'black'
      piece.name = 'rook'
      piece.value = 5
      piece.abbreviation = 'R'
      break
    case '\u265e':
      piece.color = 'black'
      piece.name = 'knight'
      piece.value = 3
      piece.abbreviation = 'N'
      break
    case '\u265d':
      piece.color = 'black'
      piece.name = 'bishop'
      piece.value = 3
      piece.abbreviation = 'B'
      break
    case '\u265b':
      piece.color = 'black'
      piece.name = 'queen'
      piece.value = 9
      piece.abbreviation = 'Q'
      break
    case '\u265a':
      piece.color = 'black'
      piece.name = 'king'
      piece.value = Infinity
      piece.abbreviation = 'K'
      break
    case '\u265f':
      piece.color = 'black'
      piece.name = 'pawn'
      piece.value = 1
      piece.abbreviation = ''
      break
    case '\u2659':
      piece.color = 'white'
      piece.name = 'pawn'
      piece.value = 1
      piece.abbreviation = ''
      break
    case '\u2654':
      piece.color = 'white'
      piece.name = 'king'
      piece.value = Infinity
      piece.abbreviation = 'K'
      break
    case '\u2655':
      piece.color = 'white'
      piece.name = 'queen'
      piece.value = 9
      piece.abbreviation = 'Q'
      break
    case '\u2657':
      piece.color = 'white'
      piece.name = 'bishop'
      piece.value = 3
      piece.abbreviation = 'B'
      break
    case '\u2658':
      piece.color = 'white'
      piece.name = 'knight'
      piece.value = 3
      piece.abbreviation = 'N'
      break
    case '\u2656':
      piece.color = 'white'
      piece.name = 'rook'
      piece.value = 5
      piece.abbreviation = 'R'
      break
    default:
      break
  }
  return piece
}

// returns true if the move is legal else it returns false
export const checkIfMoveLegal = (homeIndex, targetIndex, piece, isWhiteToMove) => {
  /*
  calculate on the position within the index
  pawn: bl+8/wh-8
  knight: %17/%15/%10/%6
  bishop: %9/%7
  rook: %8/%8/<7/>7
  queen: bishop+rook
  king: +8/-8/+1/-1/-7/+7/-9/+9
  */
  if (isWhiteToMove && piece.color === 'black') {
    return false
  }
  if (!isWhiteToMove && piece.color === 'white') {
    return false
  }
  //subtracting checks for moves up
  //adding checks for moves down
  const sub = targetIndex - homeIndex
  const add = targetIndex + homeIndex
  switch (piece.name) {
    case 'pawn':
      if (piece.color === 'white') {
        if (homeIndex - 8 === targetIndex) {
          return true
          // allowing the pawn to move 2 squares on 1st move
        } else if (homeIndex === 48 || homeIndex === 49 || homeIndex === 50 || homeIndex === 51 || homeIndex === 52 || homeIndex === 53 || homeIndex === 54 || homeIndex === 55) {
          if (homeIndex - 16 === targetIndex) {
            return true
          } 
          return false
        }
        //checking for pawn capture
        if (homeIndex - 9 === targetIndex || homeIndex - 7 === targetIndex) {
          return true
        }
        return false
      }
      if (homeIndex + 8 === targetIndex) {
        return true
      } else if (homeIndex === 8 || homeIndex === 9 || homeIndex === 10 || homeIndex === 11 || homeIndex === 12 || homeIndex === 13 || homeIndex === 14 || homeIndex === 15) {
          if (homeIndex + 16 === targetIndex) {
            return true
          } 
          return false
      }
      if (homeIndex + 9 === targetIndex || homeIndex + 7 === targetIndex) {
        return true
      }
      return false
    case 'knight':
      // edge cases:
      // sub or add may = 18 or 85 on illegal moves, making them legal
      if (!(sub%17) || !(add%17) || !(sub%15) || !(add%15) || !(sub%10) || !(add%10) || !(sub%6) || !(add%6)) {
        return true
      }
      return false
    case 'bishop':
      // edge cases:
      // sub or add may = 49 on illegal moves, making them legal
      if (!(sub%7) || !(add%7) || !(sub%9) || !(add%9)) {
        return true
      }
      return false
    case 'rook':
      if (!(sub % 8) || !(add % 8)) {
        return true
      } else { 
        if (homeIndex >= 0 && homeIndex <= 7) {
          if (targetIndex <= 7) {
            return true
          } 
          return false 
        }
        if (homeIndex >= 8 && homeIndex <= 15) {
          if (targetIndex >= 8 && targetIndex <= 15) {
            return true
          } 
          return false 
        }
        if (homeIndex >= 16 && homeIndex <= 23) {
          if (targetIndex >= 16 && targetIndex <= 23) {
            return true
          } 
          return false 
        }
        if (homeIndex >= 24 && homeIndex <= 31) {
          if (targetIndex >= 24 && targetIndex <= 31) {
            return true
          } 
          return false 
        }
        if (homeIndex >= 32 && homeIndex <= 39) {
          if (targetIndex >= 32 && targetIndex <= 39) {
            return true
          } 
          return false 
        }
        if (homeIndex >= 40 && homeIndex <= 47) {
          if (targetIndex >= 40 && targetIndex <= 47) {
            return true
          } 
          return false 
        }
        if (homeIndex >= 48 && homeIndex <= 55) {
          if (targetIndex >= 48 && targetIndex <= 55) {
            return true
          } 
          return false 
        }
        if (homeIndex >= 56 && homeIndex <= 63) {
          if (targetIndex >= 56 && targetIndex <= 63) {
            return true
          } 
          return false 
        }
      } 
      return false
    case 'queen':
      if (!(sub%7) || !(add%7) || !(sub%9) || !(add%9)) {
        return true
      }
      if (!(sub % 8) || !(add % 8)) {
        return true
      } else { 
        if (homeIndex >= 0 && homeIndex <= 7) {
          if (targetIndex <= 7) {
            return true
          } 
          return false 
        }
        if (homeIndex >= 8 && homeIndex <= 15) {
          if (targetIndex >= 8 && targetIndex <= 15) {
            return true
          } 
          return false 
        }
        if (homeIndex >= 16 && homeIndex <= 23) {
          if (targetIndex >= 16 && targetIndex <= 23) {
            return true
          } 
          return false 
        }
        if (homeIndex >= 24 && homeIndex <= 31) {
          if (targetIndex >= 24 && targetIndex <= 31) {
            return true
          } 
          return false 
        }
        if (homeIndex >= 32 && homeIndex <= 39) {
          if (targetIndex >= 32 && targetIndex <= 39) {
            return true
          } 
          return false 
        }
        if (homeIndex >= 40 && homeIndex <= 47) {
          if (targetIndex >= 40 && targetIndex <= 47) {
            return true
          } 
          return false 
        }
        if (homeIndex >= 48 && homeIndex <= 55) {
          if (targetIndex >= 48 && targetIndex <= 55) {
            return true
          } 
          return false 
        }
        if (homeIndex >= 56 && homeIndex <= 63) {
          if (targetIndex >= 56 && targetIndex <= 63) {
            return true
          } 
          return false 
        }
      } 
      return false
    case 'king':
      if (homeIndex + 8 === targetIndex || homeIndex - 8 === targetIndex || homeIndex + 1 === targetIndex || homeIndex - 1 === targetIndex || homeIndex + 7 === targetIndex || homeIndex - 7 === targetIndex || homeIndex + 9 === targetIndex || homeIndex - 9 === targetIndex) {
        return true
      }
      // allowing castling
      if (homeIndex === 60 && targetIndex === 62) {
        return true
      }
      if (homeIndex === 60 && targetIndex === 58) {
        return true
      }
      if (homeIndex === 4 && targetIndex === 2) {
        return true
      }
      if (homeIndex === 4 && targetIndex === 6) {
        return true
      }
      return false
    default:
      return null
  }
}
export class Chess {
  constructor(fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0') {
    this.fen = fen
    this.board = []
    this.capturedPieces = []
    this.material = 0
    this.isWhiteToMove = true
    this.isWhiteKingsideCastleLegal = true
    this.isWhiteQueensideCastleLegal = true
    this.isBlackKingsideCastleLegal = true
    this.isBlackQueensideCastleLegal = true
    this.enPassantTarget = null
    this.numOfHalfmoves = 0
    this.numOfFullmoves = 0
    this.is50MoveDraw = false
    this.is3FoldRepetition = false
    this.isStalemate = false
    this.isGameOver = false
  }

  start() {
    this.loadFen(this.fen)
  }

  loadFen(fen) {
    this.fen = fen
    const fenObj = fenDecoder(fen)
    this.board = fenObj.piecePosition
    this.isWhiteToMove = fenObj.isWhiteToMove
    this.isWhiteKingsideCastleLegal = fenObj.isWhiteKingsideCastleLegal
    this.isWhiteQueensideCastleLegal = fenObj.isWhiteQueensideCastleLegal
    this.isBlackKingsideCastleLegal = fenObj.isBlackKingsideCastleLegal
    this.isBlackQueensideCastleLegal = fenObj.isBlackQueensideCastleLegal
    this.enPassantTarget = fenObj.enPassantTarget
    this.numOfFullmoves = fenObj.numOfFullmoves 
    this.is50MoveDraw = fenObj.is50MoveDraw
  }

  movePiece(homeIndex, targetIndex) {
    //calculates material loss then moves the piece
    if (this.board[targetIndex]) {
      const capturedPiece = pieceData(this.board[targetIndex])
      this.capturedPieces.push(capturedPiece)
      this.calculateMaterialLoss(capturedPiece)
      this.board[targetIndex] = this.board[homeIndex]
      this.board[homeIndex] = null
    } else {
      [this.board[homeIndex], this.board[targetIndex]] = [this.board[targetIndex], this.board[homeIndex]]
    }
    //incrementing moves
    this.numOfHalfmoves++
    if (!(this.numOfHalfmoves % 2)) this.numOfFullmoves++
    //setting whos move it is
    this.isWhiteToMove = !this.isWhiteToMove
  }

  calculateMaterialLoss(capturedPiece) {
    if (capturedPiece.color === 'white') {
      this.material -= capturedPiece.value
    } else {
      this.material += capturedPiece.value
    }
    return this.material
  }

  updateFen(
    board = this.baord,
    turn = this.isWhiteToMove,
    isWhiteKingsideCastleLegal = this.isWhiteKingsideCastleLegal,
    isWhiteQueensideCastleLegal = this.isBlackQueensideCastleLegal,
    isBlackKingsideCastleLegal = this.isBlackKingsideCastleLegal,
    isBlackQueensideCastleLegal = this.isBlackQueensideCastleLegal,
    enPassantTarget = this.enPassantTarget,
    numOfHalfmoves = this.numOfHalfmoves,
    numOfFullmoves = this.numOfFullmoves
  ) {
    let fen = '';
    let numOfNull = 0;
    //creates fen position
    for (let i = 0; i < 64; i++) {
      const square = board[i];
      if (square === '\u265c') {
        if (numOfNull > 0) {
          fen += numOfNull;
          numOfNull = 0;
        }
        fen += 'r';
        
      }
      if (square === '\u265e') {
        if (numOfNull > 0) {
          fen += numOfNull;
          numOfNull = 0;
        }
        fen += 'n';
       
      }
      if (square === '\u265d') {
        if (numOfNull > 0) {
          fen += numOfNull;
          numOfNull = 0;
        }
        fen += 'b'
        
      }
      if (square === '\u265b') {
        if (numOfNull > 0) {
          fen += numOfNull;
          numOfNull = 0;
        }
        fen += 'q'
        
      }
      if (square === '\u265a') {
        if (numOfNull > 0) {
          fen += numOfNull;
          numOfNull = 0;
        }
        fen += 'k'
        
      }
      if (square === '\u265f') {
        if (numOfNull > 0) {
          fen += numOfNull;
          numOfNull = 0;
        }
        fen += 'p'
       
      }
      if (square === '\u2659') {
        if (numOfNull > 0) {
          fen += numOfNull;
          numOfNull = 0;
        }
        fen += 'P'
        
      }
      if (square === '\u2654') {
        if (numOfNull > 0) {
          fen += numOfNull;
          numOfNull = 0;
        }
        fen += 'K'
        
      }
      if (square === '\u2655') {
        if (numOfNull > 0) {
          fen += numOfNull;
          numOfNull = 0;
        }
        fen += 'Q'
        
      }
      if (square === '\u2657') {
        if (numOfNull > 0) {
          fen += numOfNull;
          numOfNull = 0;
        }
        fen += 'B'
        
      }
      if (square === '\u2658') {
        if (numOfNull > 0) {
          fen += numOfNull;
          numOfNull = 0;
        }
        fen += 'N'

      }
      if (square === '\u2656') {
        if (numOfNull > 0) {
          fen += numOfNull;
          numOfNull = 0;
        }
        fen += 'R'
      }
      if (square === null) numOfNull++;
      if (i === 7 || i === 15 || i === 23 || i === 31 || i === 39 || i === 47 || i === 55 ) {
        if (numOfNull > 0) {
          fen += numOfNull;
          numOfNull = 0;
        }
        fen += '/';
      }
    }
    //shows whos turn to move
    turn
      ? fen += ' w '
      : fen += ' b '
    //shows castling rights
    if (isWhiteKingsideCastleLegal) fen += 'K' 
    if (isWhiteQueensideCastleLegal) fen += 'Q' 
    if (isBlackKingsideCastleLegal) fen += 'k' 
    if (isBlackQueensideCastleLegal) fen += 'q '
    //shows en passant target
    fen += '-'
    if (enPassantTarget.square === 'null') fen += '-'
    if (enPassantTarget.square === 'a4' && enPassantTarget.name === 'pawn') fen = fen.replace('-', 'a3')
    if (enPassantTarget.square === 'b4' && enPassantTarget.name === 'pawn') fen = fen.replace('-', 'b3')
    if (enPassantTarget.square === 'c4' && enPassantTarget.name === 'pawn') fen = fen.replace('-', 'c3')
    if (enPassantTarget.square === 'd4' && enPassantTarget.name === 'pawn') fen = fen.replace('-', 'd3')
    if (enPassantTarget.square === 'e4' && enPassantTarget.name === 'pawn') fen = fen.replace('-', 'e3')
    if (enPassantTarget.square === 'f4' && enPassantTarget.name === 'pawn') fen = fen.replace('-', 'f3')
    if (enPassantTarget.square === 'g4' && enPassantTarget.name === 'pawn') fen = fen.replace('-', 'g3')
    if (enPassantTarget.square === 'h4' && enPassantTarget.name === 'pawn') fen = fen.replace('-', 'h3')
    if (enPassantTarget.square === 'a5' && enPassantTarget.name === 'pawn') fen = fen.replace('-', 'a6')
    if (enPassantTarget.square === 'b5' && enPassantTarget.name === 'pawn') fen = fen.replace('-', 'b6')
    if (enPassantTarget.square === 'c5' && enPassantTarget.name === 'pawn') fen = fen.replace('-', 'c6')
    if (enPassantTarget.square === 'd5' && enPassantTarget.name === 'pawn') fen = fen.replace('-', 'd6')
    if (enPassantTarget.square === 'e5' && enPassantTarget.name === 'pawn') fen = fen.replace('-', 'e6')
    if (enPassantTarget.square === 'f5' && enPassantTarget.name === 'pawn') fen = fen.replace('-', 'f6')
    if (enPassantTarget.square === 'g5' && enPassantTarget.name === 'pawn') fen = fen.replace('-', 'g6')
    if (enPassantTarget.square === 'h5' && enPassantTarget.name === 'pawn') fen = fen.replace('-', 'h6')
    //show number of half moves
    fen += ` ${numOfHalfmoves} `
    //show number of full moves
    fen += numOfFullmoves
    return fen
  }
}
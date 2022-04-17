import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Chess, pieceData } from "../utility/Chess"
import { checkIfMoveLegal } from "../utility/Chess"

const chess = new Chess()
chess.start()

export const setAnalysis = createAsyncThunk('game/setAnalysis', async (arg, thunkAPI) => {
  const fen = thunkAPI.getState().game.fen
  const response = await fetch(`https://lichess.org/api/cloud-eval?fen=${fen}&multiPv=3`)
  return await response.json()
})
export const getOpening = createAsyncThunk('game/getOpening', async (arg, thunkAPI) => {
  const play = thunkAPI.getState().game.fullMoveString.slice(0, -1)
  const response = await fetch(`https://explorer.lichess.ovh/masters?play=${play}`)
  return await response.json()
})

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    fen: chess.fen,
    board: chess.board,
    analysis: {},
    opening: '',
    status: {
      analysis: '',
      opening: ''
    },
    whiteMoves: [],
    blackMoves: [],
    fullMoveList: [],
    fullMoveString: '',
    selectedPiecesSquare: [],
    selectedPieces: [],
    capturedPieces: chess.capturedPieces,
    wasPieceCaptured: false,
    material: chess.material,
    isWhiteToMove: chess.isWhiteToMove,
    isWhiteKingsideCastleLegal: chess.isWhiteKingsideCastleLegal,
    isWhiteQueensideCastleLegal: chess.isWhiteQueensideCastleLegal,
    isBlackKingsideCastleLegal: chess.isBlackKingsideCastleLegal,
    isBlackQueensideCastleLegal: chess.isBlackQueensideCastleLegal,
    enPassantTarget: chess.enPassantTarget,
    totalMoves: 0,
    numOfHalfmoves: chess.numOfHalfmoves,
    numOfFullmoves: chess.numOfFullmoves,
    is50MoveDraw: chess.is50MoveDraw,
    is3FoldRepetition: chess.is3FoldRepetition,
    isStalemate: chess.isStalemate,
    isGameOver: chess.isGameOver
  },
  reducers: {
    movePiece: (state, { payload }) => {
      state.selectedPieces.push(payload[1] - 1)
      
      //clamps the array at 2
      if (state.selectedPieces.length === 3) {
        state.selectedPieces[0] = state.selectedPieces[2]
        state.selectedPieces.pop()
        state.selectedPieces.pop()
      }
      //allows the user to reselect a piece
      const selectedPiece = pieceData(state.board[state.selectedPieces[0]])
      const reselectedPiece = pieceData(state.board[state.selectedPieces[1]])
      if (selectedPiece.color === reselectedPiece.color) {
        state.selectedPieces[0] = state.selectedPieces[1]
        state.selectedPiecesSquare[0] = state.selectedPiecesSquare[1]
        state.selectedPiecesSquare.pop()
        state.selectedPieces.pop()
      }
      
      //moves the piece
      if (state.selectedPieces.length === 2) {
        const homeIndex = state.selectedPieces[0]
        const targetIndex = state.selectedPieces[1]
        const homePiece = pieceData(state.board[homeIndex])
        const targetPiece = pieceData(state.board[targetIndex])
        // checks if move is legal
        if (!(checkIfMoveLegal(homeIndex, targetIndex, homePiece, state.isWhiteToMove))) return
        
        //checks if white kingside castling is legal
        if (homePiece.name === 'king' && homeIndex === 60 && targetIndex === 62 && state.board[61] === null && state.board[62] === null && pieceData(state.board[63]).name === 'rook' && state.isWhiteKingsideCastleLegal) {
          state.board[62] = state.board[60]
          state.board[61] = state.board[63]
          state.board[60] = null
          state.board[63] = null

          //incrementing moves
          state.totalMoves++
          if (!(state.totalMoves % 2)) state.numOfFullmoves++
          //setting whos move it is
          state.isWhiteToMove = !state.isWhiteToMove
          state.isWhiteKingsideCastleLegal = false
          state.isWhiteQueensideCastleLegal = false
          
          return
        }
        //checks if white queenside castling is legal
        if (homePiece.name === 'king' && homeIndex === 60 && targetIndex === 58 && state.board[59] === null && state.board[58] === null && state.board[57] === null && pieceData(state.board[56]).name === 'rook' && state.isWhiteQueensideCastleLegal) {
          state.board[58] = state.board[60]
          state.board[59] = state.board[56]
          state.board[60] = null
          state.board[56] = null

          //incrementing moves
          state.totalMoves++
          if (!(state.totalMoves % 2)) state.numOfFullmoves++
          //setting whos move it is
          state.isWhiteToMove = !state.isWhiteToMove
          state.isWhiteKingsideCastleLegal = false
          state.isWhiteQueensideCastleLegal = false
          
          return
        }
        //checks if black kingside castling is legal
        if (homePiece.name === 'king' && homeIndex === 4 && targetIndex === 6 && state.board[6] === null && state.board[5] === null && pieceData(state.board[7]).name === 'rook' && state.isBlackKingsideCastleLegal) {
          state.board[6] = state.board[4]
          state.board[5] = state.board[7]
          state.board[4] = null
          state.board[7] = null

          //incrementing moves
          state.totalMoves++
          if (!(state.totalMoves % 2)) state.numOfFullmoves++
          //setting whos move it is
          state.isWhiteToMove = !state.isWhiteToMove
          state.isBlackKingsideCastleLegal = false
          state.isBlackQueensideCastleLegal = false
          return
        }
        //checks if black queenside castling is legal
        if (homePiece.name === 'king' && homeIndex === 4 && targetIndex === 2 && state.board[2] === null && state.board[3] === null && state.board[1] === null && pieceData(state.board[0]).name === 'rook' && state.isBlackQueensideCastleLegal) {
          state.board[2] = state.board[4]
          state.board[3] = state.board[0]
          state.board[4] = null
          state.board[0] = null

          //incrementing moves
          state.totalMoves++
          if (!(state.totalMoves % 2)) state.numOfFullmoves++
          //setting whos move it is
          state.isWhiteToMove = !state.isWhiteToMove
          state.isBlackKingsideCastleLegal = false
          state.isBlackQueensideCastleLegal = false
          return
        }

        //calculates material loss then moves the piece
        if (state.board[targetIndex]) {
          const capturedPiece = targetPiece
          state.capturedPieces.push(capturedPiece)
          capturedPiece.color === 'white' 
          ? state.material -= capturedPiece.value
          : state.material += capturedPiece.value 
          state.board[targetIndex] = state.board[homeIndex]
          state.board[homeIndex] = null
          state.wasPieceCaptured = true
        } else {
          [state.board[homeIndex], state.board[targetIndex]] = [state.board[targetIndex], state.board[homeIndex]]
          state.wasPieceCaptured = false
          //removing castling rights if necessary
          if (selectedPiece.name === 'king') {
            if (selectedPiece.color === 'white') {
              state.isWhiteKingsideCastleLegal = false
              state.isWhiteQueensideCastleLegal = false
            } else {
              state.isBlackKingsideCastleLegal = false
              state.isBlackQueensideCastleLegal = false
            }
          } 
          if (selectedPiece.name === 'rook' && (homeIndex === 0 || homeIndex === 7 || homeIndex === 56 || homeIndex === 63)) {
            switch (homeIndex) {
              case 0:
                state.isBlackQueensideCastleLegal = false
                break
              case 7:
                state.isBlackKingsideCastleLegal = false
                break
              case 56:
                state.isWhiteQueensideCastleLegal = false
                break
              case 63:
                state.isWhiteKingsideCastleLegal = false
                break
              default:
                break
            }
          }
        }

        //incrementing moves
        state.numOfHalfmoves++
        if (selectedPiece.name === 'pawn' || state.wasPieceCaptured === true) {
          state.numOfHalfmoves = 0
        }
        state.totalMoves++
          if (!(state.totalMoves % 2)) state.numOfFullmoves++
        //setting whos move it is
        state.isWhiteToMove = !state.isWhiteToMove
        //updating the move list
        state.fullMoveList.push({
          name: selectedPiece.name,
          color: selectedPiece.color,
          square: payload[0]
        })
        state.fullMoveString += state.selectedPiecesSquare[0] + payload[0] + ','
      }
    },
    selectPiece: (state, { payload }) => {
      state.selectedPiecesSquare.push(payload[0]) 
      if (state.selectedPiecesSquare.length === 3) {
        state.selectedPiecesSquare[0] = state.selectedPiecesSquare[2]
        state.selectedPiecesSquare.pop()
        state.selectedPiecesSquare.pop()
      }
      //updates the fen string
      if (state.selectedPiecesSquare.length === 2) {
        state.fen = chess.updateFen(
          state.board,
          state.isWhiteToMove,
          state.isWhiteKingsideCastleLegal,
          state.isWhiteQueensideCastleLegal,
          state.isBlackKingsideCastleLegal,
          state.isBlackQueensideCastleLegal,
          state.fullMoveList[state.fullMoveList.length - 1],
          state.numOfHalfmoves,
          state.numOfFullmoves
        );
      }
      
    },
    pushToMoveList: (state, { payload }) => {
      const square = payload
      //pushing to fullMoveList
      state.fullMoveList.push(state.selectedPiecesSquare.toString().replace(/,/g, ''))

      //pushing to blackMoves and whiteMoves
      const whereToPush = !state.isWhiteToMove
        ? state.whiteMoves
        : state.blackMoves

      const piece = pieceData(state.board[state.selectedPieces[1]])
      let abbreviatedPiece = piece.abbreviation;
      
      if (state.wasPieceCaptured) {
        if (piece.name === 'pawn') {
          whereToPush.push(state.selectedPiecesSquare[0].split('')[0] + 'x' + square)
        } else {
          whereToPush.push(abbreviatedPiece + 'x' + square)
        }
        state.wasPieceCaptured = false
      } else {
        whereToPush.push(abbreviatedPiece + square)
      }
    },
    
  },
  extraReducers: {
    [setAnalysis.pending]: (state, action) => {
      state.status.analysis = 'pending'
    },
    [setAnalysis.fulfilled]: (state, action) => {
      state.status.analysis = 'fulfilled'
      state.analysis = action.payload
    },
    [setAnalysis.rejected]: (state, action) => {
      state.status.analysis = 'rejected'
    },
    [getOpening.pending]: (state, action) => {
      state.status.opening = 'pending'
    },
    [getOpening.fulfilled]: (state, action) => {
      state.status.opening = 'fulfilled'
      state.opening = action.payload
    },
    [getOpening.rejected]: (state, action) => {
      state.status.opening = 'rejected'
    }
  }
})

export const {movePiece, selectPiece, pushToMoveList} = gameSlice.actions
export const gameReducer = gameSlice.reducer
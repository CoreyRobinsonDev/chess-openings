//abstracts the creation of an empty board array
export const createBoard = () => {
  let squares = []
  for (let i = 1; i <= 64; i++) {
    if (i < 9) {
      switch (i) {
        case 1:
          squares.push(['a' + 8, i])
          break
        case 2:
          squares.push(['b' + 8, i])
          break
        case 3:
          squares.push(['c' + 8, i])
          break
        case 4:
          squares.push(['d' + 8, i])
          break
        case 5:
          squares.push(['e' + 8, i])
          break
        case 6:
          squares.push(['f' + 8, i])
          break
        case 7:
          squares.push(['g' + 8, i])
          break
        case 8:
          squares.push(['h' + 8, i])
          break
        default:
          break
      }
    } else if (i < 17) {
      switch (i) {
        case 9:
          squares.push(['a' + 7, i])
          break
        case 10:
          squares.push(['b' + 7, i])
          break
        case 11:
          squares.push(['c' + 7, i])
          break
        case 12:
          squares.push(['d' + 7, i])
          break
        case 13:
          squares.push(['e' + 7, i])
          break
        case 14:
          squares.push(['f' + 7, i])
          break
        case 15:
          squares.push(['g' + 7, i])
          break
        case 16:
          squares.push(['h' + 7, i])
          break
        default:
          break
      }
    } else if (i < 25) {
      switch (i) {
        case 17:
          squares.push(['a' + 6, i])
          break
        case 18:
          squares.push(['b' + 6, i])
          break
        case 19:
          squares.push(['c' + 6, i])
          break
        case 20:
          squares.push(['d' + 6, i])
          break
        case 21:
          squares.push(['e' + 6, i])
          break
        case 22:
          squares.push(['f' + 6, i])
          break
        case 23:
          squares.push(['g' + 6, i])
          break
        case 24:
          squares.push(['h' + 6, i])
          break
        default:
          break
      }
    } else if (i < 33) {
     switch (i) {
        case 25:
          squares.push(['a' + 5, i])
          break
        case 26:
          squares.push(['b' + 5, i])
          break
        case 27:
          squares.push(['c' + 5, i])
          break
        case 28:
          squares.push(['d' + 5, i])
          break
        case 29:
          squares.push(['e' + 5, i])
          break
        case 30:
          squares.push(['f' + 5, i])
          break
        case 31:
          squares.push(['g' + 5, i])
          break
        case 32:
          squares.push(['h' + 5, i])
          break
        default:
          break
      }
    } else if (i < 41) {
      switch (i) {
        case 33:
          squares.push(['a' + 4, i])
          break
        case 34:
          squares.push(['b' + 4, i])
          break
        case 35:
          squares.push(['c' + 4, i])
          break
        case 36:
          squares.push(['d' + 4, i])
          break
        case 37:
          squares.push(['e' + 4, i])
          break
        case 38:
          squares.push(['f' + 4, i])
          break
        case 39:
          squares.push(['g' + 4, i])
          break
        case 40:
          squares.push(['h' + 4, i])
          break
        default:
          break
      }
    } else if (i < 49) {
     switch (i) {
        case 41:
          squares.push(['a' + 3, i])
          break
        case 42:
          squares.push(['b' + 3, i])
          break
        case 43:
          squares.push(['c' + 3, i])
          break
        case 44:
          squares.push(['d' + 3, i])
          break
        case 45:
          squares.push(['e' + 3, i])
          break
        case 46:
          squares.push(['f' + 3, i])
          break
        case 47:
          squares.push(['g' + 3, i])
          break
        case 48:
          squares.push(['h' + 3, i])
          break
        default:
          break
      }
    } else if (i < 57) {
      switch (i) {
        case 49:
          squares.push(['a' + 2, i])
          break
        case 50:
          squares.push(['b' + 2, i])
          break
        case 51:
          squares.push(['c' + 2, i])
          break
        case 52:
          squares.push(['d' + 2, i])
          break
        case 53:
          squares.push(['e' + 2, i])
          break
        case 54:
          squares.push(['f' + 2, i])
          break
        case 55:
          squares.push(['g' + 2, i])
          break
        case 56:
          squares.push(['h' + 2, i])
          break
        default:
          break
      }
    } else {
    switch (i) {
        case 57:
          squares.push(['a' + 1, i])
          break
        case 58:
          squares.push(['b' + 1, i])
          break
        case 59:
          squares.push(['c' + 1, i])
          break
        case 60:
          squares.push(['d' + 1, i])
          break
        case 61:
          squares.push(['e' + 1, i])
          break
        case 62:
          squares.push(['f' + 1, i])
          break
        case 63:
          squares.push(['g' + 1, i])
          break
        case 64:
          squares.push(['h' + 1, i])
          break
        default:
          break
      }
    }
  }
  return squares
}
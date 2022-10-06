import { compareType } from './Form'

const compare = (comparator: compareType, left: number, right: number) => {
  switch (comparator) {
    case '>':
      return left > right
    case '>=':
      return left >= right
    case '==':
      return left == right
    case '<=':
      return left <= right
    case '<':
      return left < right
  }
}

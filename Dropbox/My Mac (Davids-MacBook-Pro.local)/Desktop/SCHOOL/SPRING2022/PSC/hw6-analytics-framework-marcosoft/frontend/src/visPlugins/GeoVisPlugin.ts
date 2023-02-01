import { Cell } from '../App'

export interface GeoVisPlugin {
  visualize: (cells: Cell[]) => void
}

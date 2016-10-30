// constants
export const SET_MODE_FILTER = 'SET_MODE_FILTER'

export const ModeFilters = {
  SHOW_ALL: 'SHOW_ALL',
  IGNORE_DONUT: 'IGNORE_DONUT',
  CRYSTAL_BALL: 'CRYSTAL_BALL',
  IGNORE_CC: 'IGNORE_CC'
}

//action creators
export function setModeFilter(mode) {
  return { 
  	type: mode, 
  	mode 
  }
}

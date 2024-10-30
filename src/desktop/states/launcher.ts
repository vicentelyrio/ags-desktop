export enum SearchType {
  APP = 'app',
  CALC = 'calc',
  PROJECT = 'project',
}

export type SearchInputType = {
  text: string
  type: SearchType
}

export const searchInput = Variable<SearchInputType>({
  text: '',
  type: SearchType.APP,
})


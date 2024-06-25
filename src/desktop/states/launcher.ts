export enum SearchType {
  APP = 'app',
  CALC = 'calc',
}

export type SearchInputType = {
  text: string
  type: SearchType
}

export const searchInput = Variable<SearchInputType>({
  text: '',
  type: SearchType.APP,
})


export interface ChartItem {
  title: string
  creator?: string
  coverURL: string
}

export interface ChartSize {
  x: number
  y: number
}

export enum BackgroundTypes {
  Color = 'color',
  Image = 'image',
}

export enum SearchTypes {
  Music = 'music',
  Books = 'books',
  Games = 'games',
  Movies = 'movies',
  Shows = 'shows',
  Custom = 'custom',
}

export interface Chart {
  backgroundUrl: string
  backgroundColor: string
  backgroundType: BackgroundTypes
  title: string
  items: Array<ChartItem | null>
  size: ChartSize
  showNumbers: boolean
  showTitles: boolean
  gap: number
  font?: string
  textColor?: string
  shadows?: boolean
}

export interface IgdbItem {
  name: string
  cover: string
}

// Charts stored in localStorage
export interface OldStoredChart {
  timestamp: number
  uuid: string
  name: string | null
  data: Chart
  currentlyActive: boolean
}

export interface PreMigrationChart extends Chart {
  background?: {
    type?: BackgroundTypes
    value?: string
    img?: HTMLImageElement | null
  }
}

export interface StoredChart {
  timestamp: number
  data: Chart
}

export interface StoredPremigrationChart {
  timestamp: number
  data: PreMigrationChart
}

export interface StoredCharts {
  [uuid: string]: StoredChart
}

export interface LocalStorageContent {
  activeTab: SearchTypes
  charts: StoredCharts
  currentlyActive: string
}

// There's way more stuff from the APIs but this is all that's relevant here.
export interface BookResult {
  title: string
  author_name: string
  cover_edition_key?: string
}

export interface MusicResult {
  name: string
  artist: string
  image: {
    '#text': string
    'size': string
  }[]
}

export interface GameResult {
  name: string
  cover: string
}

export interface MovieResult {
  title: string
  poster_path: string
}

export interface TVResult {
  name: string
  poster_path: string
}

export interface CustomResult {
  title: string
  creator?: string
  imageURL: string
  type: 'custom'
}

export type Period = 'overall' | '7day' | '1month' | '3month' | '6month' | '12month'

export type LastfmDataType = 'artists' | 'albums'

export interface LastfmChartResponseItem {
  'artist': {
    url: string
    name: string
    mbid: string
  }
  'image': {
    'size': 'small' | 'medium' | 'large' | 'extralarge'
    '#text': string
  }[]
  'mbid': string
  'url': string
  'playcount': string
  '@attr': {
    rank: string
  }
  'name': string
}

export type Result = BookResult | MusicResult | GameResult | MovieResult | TVResult | CustomResult

export enum Tabs {
  AddItems = 'Add Items',
  Options = 'Options',
  ImportsExports = 'Import / Export',
  Info = 'Info',
}

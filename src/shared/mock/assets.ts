import { Asset, AssetBNB, AssetRune67C, AssetRuneB1A } from '@xchainjs/xchain-util'

type Assets = 'RUNE' | 'BNB' | 'FTM' | 'TOMO' | 'BOLT'

type AssetsTestnet = Record<Assets, Asset>
type AssetsMainnet = Record<Assets, Asset>

export const ASSETS_TESTNET: AssetsTestnet = {
  RUNE: AssetRuneB1A,
  BNB: AssetBNB,
  FTM: { chain: 'BNB', symbol: 'FTM-585', ticker: 'FTM' },
  TOMO: { chain: 'BNB', symbol: 'TOMOB-1E1', ticker: 'TOMOB' },
  BOLT: { chain: 'BNB', symbol: 'BOLT-E42', ticker: 'BOLT' }
}

export const ASSETS_MAINNET: AssetsMainnet = {
  RUNE: AssetRune67C,
  BNB: AssetBNB,
  FTM: { chain: 'BNB', symbol: 'FTM-A64', ticker: 'FTM' },
  TOMO: { chain: 'BNB', symbol: 'TOMOB-4BC', ticker: 'TOMOB' },
  BOLT: { chain: 'BNB', symbol: 'BOLT-4C6', ticker: 'BOLT' }
}

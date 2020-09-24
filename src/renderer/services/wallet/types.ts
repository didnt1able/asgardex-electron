import * as RD from '@devexperts/remote-data-ts'
import { BaseAmount, Asset, Chain } from '@thorchain/asgardex-util'
import { getMonoid } from 'fp-ts/Array'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import * as O from 'fp-ts/lib/Option'
import { Observable } from 'rxjs'

export type Phrase = string

export type KeystoreContent = { phrase: Phrase; address: string }
/**
 * Type for providing 3 states of keystore
 *
 * (1) `None` -> DEFAULT (keystore needs to be imported at start of application or after shutdown of app)
 * (2) `Some<None>` -> LOCKED STATUS (keystore file, but no phrase)
 * (3) `Some<Some<KeystoreContent>>` -> UNLOCKED + IMPORTED STATUS (keystore file + phrase)
 */
export type KeystoreState = O.Option<O.Option<KeystoreContent>>

export type KeystoreService = {
  keystore$: Observable<KeystoreState>
  addKeystore: (phrase: Phrase, password: string) => Promise<void>
  removeKeystore: () => Promise<void>
  unlock: (state: KeystoreState, password: string) => Promise<void>
  lock: () => void
}

export type AssetWithBalance = {
  asset: Asset
  amount: BaseAmount
  frozenAmount: O.Option<BaseAmount>
}

export type AssetsWithBalance = AssetWithBalance[]
export type NonEmptyAssetsWithBalance = NonEmptyArray<AssetWithBalance>

export type AssetsWithBalanceRD = RD.RemoteData<ApiError, AssetsWithBalance>
export type AssetWithBalanceRD = RD.RemoteData<ApiError, AssetWithBalance>

export type AssetsWBChain = {
  address: string
  chain: Chain
  assetsWB: AssetsWithBalanceRD
}

export type AssetsWBChains = AssetsWBChain[]

export const assetWithBalanceMonoid = getMonoid<AssetWithBalance>()

export type AssetsWithBalanceState = {
  assetsWB: O.Option<NonEmptyAssetsWithBalance>
  errors: O.Option<NonEmptyApiErrors>
  loading: boolean
}

export enum ErrorId {
  GET_BALANCES,
  GET_ADDRESS
}

export type ApiError = {
  errorId: ErrorId
  msg: string
}

export type NonEmptyApiErrors = NonEmptyArray<ApiError>

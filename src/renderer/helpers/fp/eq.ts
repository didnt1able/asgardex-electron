import * as RD from '@devexperts/remote-data-ts'
import { Balance, Balances } from '@xchainjs/xchain-client'
import { Asset, BaseAmount, assetToString, Chain } from '@xchainjs/xchain-util'
import BigNumber from 'bignumber.js'
import * as A from 'fp-ts/lib/Array'
import * as Eq from 'fp-ts/lib/Eq'
import * as O from 'fp-ts/lib/Option'

import { ApiError } from '../../services/wallet/types'

export const eqOString = O.getEq(Eq.eqString)

export const egBigNumber: Eq.Eq<BigNumber> = {
  equals: (x, y) => x.isEqualTo(y)
}

export const eqAsset: Eq.Eq<Asset> = {
  equals: (x, y) => assetToString(x) === assetToString(y)
}

export const eqOAsset = O.getEq(eqAsset)

export const eqChain: Eq.Eq<Chain> = {
  equals: (x, y) => Eq.eqString.equals(x, y)
}

export const eqOChain = O.getEq(eqChain)

export const eqBaseAmount: Eq.Eq<BaseAmount> = {
  equals: (x, y) => egBigNumber.equals(x.amount(), y.amount()) && x.decimal === y.decimal
}

export const eqOptionBaseAmount = O.getEq(eqBaseAmount)

export const eqBalance: Eq.Eq<Balance> = {
  equals: (x, y) => eqAsset.equals(x.asset, y.asset) && eqBaseAmount.equals(x.amount, y.amount)
}

export const eqErrorId = Eq.eqNumber

export const eqApiError = Eq.getStructEq<ApiError>({
  errorId: eqErrorId,
  msg: Eq.eqString
})

export const eqBalances = A.getEq(eqBalance)

export const eqBalanceRD = RD.getEq<ApiError, Balance>(eqApiError, eqBalance)
export const eqAssetsWithBalanceRD = RD.getEq<ApiError, Balances>(eqApiError, eqBalances)

import React, { useCallback } from 'react'

import * as RD from '@devexperts/remote-data-ts'
import { Asset, AssetRune67C, AssetRuneNative, bn } from '@xchainjs/xchain-util'
import BigNumber from 'bignumber.js'
import * as FP from 'fp-ts/function'
import { useObservableState } from 'observable-hooks'
import { map } from 'rxjs/operators'

import { Withdraw } from '../../../components/deposit/withdraw'
import { ZERO_BASE_AMOUNT, ZERO_BN } from '../../../const'
import { useChainContext } from '../../../contexts/ChainContext'
import { useMidgardContext } from '../../../contexts/MidgardContext'
import { emptyFunc } from '../../../helpers/funcHelper'
import { getAssetPoolPrice } from '../../../helpers/poolHelper'
import * as shareHelpers from '../../../helpers/poolShareHelper'
import { PoolDetailRD, StakersAssetDataRD } from '../../../services/midgard/types'
import { getPoolDetail } from '../../../services/midgard/utils'
import { PoolDetail, StakersAssetData } from '../../../types/generated/midgard/models'

type Props = {
  depositAsset: Asset
}

export const WithdrawDepositView: React.FC<Props> = (props): JSX.Element => {
  const { depositAsset } = props
  const {
    service: {
      pools: { poolDetail$, selectedPricePoolAsset$, priceRatio$, poolsState$ },
      stake: { getStakes$ }
    }
  } = useMidgardContext()

  const { withdrawFees$, reloadWithdrawFees } = useChainContext()

  const fees = useObservableState(withdrawFees$, RD.initial)

  const runePrice = useObservableState(priceRatio$, bn(1))

  const poolsStateRD = useObservableState(poolsState$, RD.initial)
  /**
   * We have to get a new stake-stream for every new asset
   * @description /src/renderer/services/midgard/stake.ts
   */

  const [depositData] = useObservableState<StakersAssetDataRD>(getStakes$, RD.initial)

  const poolDetailRD = useObservableState<PoolDetailRD>(poolDetail$, RD.initial)

  const [priceAssetRD]: [RD.RemoteData<Error, Asset>, unknown] = useObservableState(
    () =>
      FP.pipe(
        selectedPricePoolAsset$,
        map((asset) => RD.fromOption(asset, () => Error(''))),
        // In case there is no asset for any reason set basic RUNE asset as alt value
        map(RD.alt((): RD.RemoteData<Error, Asset> => RD.success(AssetRuneNative)))
      ),
    RD.initial
  )

  const poolsState = FP.pipe(
    poolsStateRD,
    RD.chain((poolsState) => RD.fromOption(getPoolDetail(poolsState.poolDetails, depositAsset), () => Error('no data')))
  )

  const assetPriceRD = FP.pipe(
    poolsState,
    // convert from RUNE price to selected pool asset price
    RD.map(getAssetPoolPrice(runePrice))
  )

  const renderEmptyForm = useCallback(
    () => (
      <Withdraw
        fees={fees}
        assetPrice={ZERO_BN}
        runePrice={runePrice}
        selectedCurrencyAsset={AssetRune67C}
        onWithdraw={emptyFunc}
        runeShare={ZERO_BASE_AMOUNT}
        assetShare={ZERO_BASE_AMOUNT}
        depositAsset={depositAsset}
        updateFees={reloadWithdrawFees}
        disabled
      />
    ),
    [fees, runePrice, depositAsset, reloadWithdrawFees]
  )

  const renderWithdrawReady = useCallback(
    ([assetPrice, deposit, poolDetail, priceAsset]: [BigNumber, StakersAssetData, PoolDetail, Asset]) => (
      <Withdraw
        assetPrice={assetPrice}
        runePrice={runePrice}
        selectedCurrencyAsset={priceAsset}
        onWithdraw={console.log}
        runeShare={shareHelpers.getRuneShare(deposit, poolDetail)}
        assetShare={shareHelpers.getAssetShare(deposit, poolDetail)}
        depositAsset={depositAsset}
        fees={fees}
        updateFees={reloadWithdrawFees}
      />
    ),
    [runePrice, depositAsset, fees, reloadWithdrawFees]
  )

  return FP.pipe(
    RD.combine(assetPriceRD, depositData, poolDetailRD, priceAssetRD),
    RD.fold(renderEmptyForm, renderEmptyForm, renderEmptyForm, renderWithdrawReady)
  )
}

import React from 'react'

import {
  BaseAmount,
  formatAssetAmountCurrency,
  baseToAsset,
  formatAssetAmount,
  baseAmount,
  Asset
} from '@xchainjs/xchain-util'

import { PricePoolAsset } from '../../../../views/pools/Pools.types'
import { Label } from '../../label'
import { AssetIcon } from '../assetIcon'
import { CoinDataWrapper, CoinDataWrapperType, CoinDataWrapperSize } from './AssetData.style'

type Props = {
  asset: Asset
  assetValue?: BaseAmount
  target?: Asset
  targetValue?: BaseAmount
  price?: BaseAmount
  // Asset which was used for calculating price
  // Usually it's an asset from PriceSelector
  priceBaseAsset?: PricePoolAsset
  priceValid?: boolean
  size?: CoinDataWrapperSize
  type?: CoinDataWrapperType
}

export const AssetData: React.FC<Props> = (props): JSX.Element => {
  const {
    asset,
    assetValue,
    target,
    targetValue,
    price = baseAmount(0),
    priceBaseAsset,
    priceValid = true,
    size = 'small',
    type = 'normal'
  } = props

  const formattedPrice = priceBaseAsset
    ? formatAssetAmountCurrency({ amount: baseToAsset(price), asset: priceBaseAsset, trimZeros: true })
    : ''
  // @TODO (@thatStrangeGuy) add valid formatters
  const priceLabel = priceValid && formattedPrice !== '$ 0.00' ? formattedPrice : ''

  return (
    <CoinDataWrapper size={size} type={type}>
      {asset && <AssetIcon className="coinData-coin-avatar" asset={asset} size={size} />}
      <div className="coinData-asset-info">
        <Label className="coinData-asset-label" weight="600">
          {`${asset.ticker} ${target ? ':' : ''}`}
        </Label>
        {assetValue && (
          <Label className="coinData-asset-value" weight="600">
            {formatAssetAmount({ amount: baseToAsset(assetValue), trimZeros: true })}
          </Label>
        )}
      </div>
      {target && (
        <div className="coinData-target-info">
          <Label className="coinData-target-label" weight="600">
            {target.ticker}
          </Label>
          {targetValue && (
            <Label className="coinData-target-value" weight="600">
              {formatAssetAmount({ amount: baseToAsset(targetValue), trimZeros: true })}
            </Label>
          )}
        </div>
      )}
      <div className="asset-price-info">
        <Label size="small" color="gray" weight="bold">
          {priceLabel}
        </Label>
      </div>
    </CoinDataWrapper>
  )
}

import * as RD from '@devexperts/remote-data-ts'
import { Asset, BNBChain, BTCChain, THORChain } from '@xchainjs/xchain-util'
import * as FP from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import * as Rx from 'rxjs'
import * as RxOp from 'rxjs/operators'

// import { emptyFunc } from '../../helpers/funcHelper'
import { LiveData, liveData } from '../../helpers/rx/liveData'
import * as BNB from '../binance'
import * as BTC from '../bitcoin'
// import * as ETH from '../ethereum'
import { selectedPoolAsset$ } from '../midgard/common'
import * as THOR from '../thorchain'
import { ErrorId, TxLD } from '../wallet/types'
import { SendStakeTxParams } from './types'

const sendStakeTx = ({ chain, asset, poolAddress, amount, memo }: SendStakeTxParams): TxLD => {
  // TODO (@Veado) Health check request for pool address
  // Issue #497: https://github.com/thorchain/asgardex-electron/issues/497

  // helper to create `RemoteData<ApiError, never>` observable
  const stakeTxFailure$ = (msg: string) =>
    Rx.of(
      RD.failure({
        errorId: ErrorId.SEND_TX,
        msg
      })
    )

  switch (chain) {
    case 'BNB':
      return BNB.sendStakeTx({ recipient: poolAddress, amount, asset, memo, feeRate: 0 })

    case 'BTC':
      return FP.pipe(
        BTC.getPoolFeeRate(),
        RD.toOption,
        O.fold(
          // TODO (@veado) i18n
          () => stakeTxFailure$('Fee rate for BTC transaction not available'),
          (feeRate) => BTC.sendStakeTx({ recipient: poolAddress, amount, feeRate, memo })
        )
      )

    case 'ETH':
      // not available yet
      return stakeTxFailure$('Stake tx has not been implemented for ETH yet')

    case 'THOR':
      // not available yet
      return stakeTxFailure$('Stake tx has not been implemented for THORChain yet')
  }
}

const getServiceByChain = ({ chain }: Asset) => {
  switch (chain) {
    case BNBChain:
      return BNB
    case BTCChain:
      return BTC
    // @todo implement after https://github.com/xchainjs/xchainjs-lib/issues/105 is completed
    // case ETHChain: return ETH
    case THORChain:
      return THOR
  }
  return
}

const chainBasedService$: LiveData<Error, typeof BNB | typeof BTC | typeof THOR> = FP.pipe(
  selectedPoolAsset$,
  RxOp.switchMap(liveData.fromOption(() => Error('No asset'))),
  liveData.map(FP.flow(getServiceByChain, O.fromNullable)),
  liveData.chain(liveData.fromOption(() => Error('No service for chain')))
)

const txRD$ = FP.pipe(
  chainBasedService$,
  liveData.mapLeft((e) => ({
    errorId: ErrorId.SEND_TX,
    msg: e.message
  })),
  liveData.chain(({ txRD$ }) => txRD$)
)

/**
 *
 * Or we can pass this callback as streams based on chainBasedService$
 * @todo discuss with @veado
 */
const getTransferActions = (asset: O.Option<Asset>) => {
  return FP.pipe(
    asset,
    O.map(getServiceByChain),
    O.filterMap(O.fromNullable),
    O.map((chainService) => ({
      pushTx: chainService.pushTx,
      resetTx: chainService.resetTx
    }))
  )
}

const transaction = ({chain}: Asset) => {
  // txs$,
  txRD$,
  getTransferActions
}

export { sendStakeTx, transaction }

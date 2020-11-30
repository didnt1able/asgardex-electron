import * as RD from '@devexperts/remote-data-ts'
import { Chain, BaseAmount } from '@xchainjs/xchain-util'
import * as FP from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import * as Rx from 'rxjs'
import * as RxOp from 'rxjs/operators'

import { BASE_CHAIN } from '../../../const'
import { liveData, LiveData } from '../../../helpers/rx/liveData'
import { triggerStream } from '../../../helpers/stateHelper'
import * as BNB from '../../binance'
import { selectedPoolChain$ } from '../../midgard/common'
import { FeeLD } from '../types'
import { reloadStakeFeesByChain } from './fees.helper'

// `TriggerStream` to reload transfer fees
const { stream$: reloadTransferFees$, trigger: reloadTransferFees } = triggerStream()

/**
 * reload fees
 *
 * Has to be used ONLY on an appropriate screen
 * @example
 * useSubscription(updateTransferFeesEffect$)
 */
const updateTransferFeesEffect$ = Rx.combineLatest([selectedPoolChain$, reloadTransferFees$]).pipe(
  RxOp.tap(([oChain, _]) =>
    FP.pipe(
      oChain,
      O.map(() => {
        // reload base-chain
        reloadStakeFeesByChain(BASE_CHAIN)
        return true
      })
    )
  )
)

const withdrawFeeByChain$ = (chain: Chain): FeeLD => {
  // Calculate fees only for base chain (THOR or BNB)
  switch (chain) {
    case 'BNB':
      return FP.pipe(
        reloadTransferFees$,
        RxOp.switchMap(() => BNB.fees$.pipe(liveData.map((fees) => fees.fast)))
      )

    case 'THOR':
      return Rx.of(RD.failure(new Error(`Transfer fee for ${chain.toUpperCase()} has not been implemented`)))

    case 'BTC':
    case 'ETH':
      return Rx.of(RD.failure(Error(`${chain.toUpperCase} is not a base chain`)))
  }
}

// const withdrawFees$: TransferFeeLD = FP.pipe(
//   selectedPoolChain$,
//   RxOp.switchMap(
//     FP.flow(
//       O.map(() => withdrawFeeByChain$(BASE_CHAIN)),
//       O.getOrElse((): LiveData<Error, BaseAmount> => Rx.of(RD.initial))
//     )
//   )
// )

export { reloadTransferFees, updateTransferFeesEffect$ }

import { Address$ } from '../clients'
import { address$, addressValidator$ as internalAddressValidator$ } from '../clients'
import { client$, clientByChain$ } from './client'
import { Asset } from '@xchainjs/xchain-util'

/**
 * Users wallet address for selected pool asset
 */
const assetAddress$: Address$ = address$(client$)

const addressValidator$ = ({ chain }: Asset) => internalAddressValidator$(clientByChain$(chain))

// const getServiceByChain = ({ chain }: Asset): Rx.Observable<O.Option<BinanceClient | BTCClient | THORClient>> => {
//   switch (chain) {
//     case BNBChain:
//       return BNB.client$
//     case BTCChain:
//       return BTC.client$
//     // @todo implement after https://github.com/xchainjs/xchainjs-lib/issues/105 is completed
//     // case ETHChain: return ETH
//     case THORChain:
//       return THOR.client$
//   }
//   return Rx.EMPTY
// }

// selectedPoolAsset$.subscribe((asset) => console.log('selected asset --- ', asset))
//
// /**
//  * Keep it as LiveData for now if we will need error handling for future
//  * streams or anything else
//  */
// const chainBasedService$ = FP.pipe(
//   selectedPoolAsset$,
//   RxOp.switchMap(liveData.fromOption(() => Error('No asset'))),
//   liveData.map(FP.flow(getServiceByChain, O.fromNullable)),
//   liveData.chain(liveData.fromOption(() => Error('No service for chain')))
// )
//
// const addressValidator$ = chainBasedService$.pipe(
//   liveData.chain((client$) => {
//     return FP.pipe(
//       client$,
//       RxOp.switchMap(liveData.fromOption(() => Error(''))),
//       liveData.map((client) => client.validateAddress)
//     )
//   }),
//   RxOp.map(RD.getOrElse(() => (_: string): boolean => true))
// )

export { assetAddress$, addressValidator$ }

import * as FP from 'fp-ts/function'
import * as O from 'fp-ts/lib/Option'
import * as RxOp from 'rxjs/operators'

import { eqOString } from '../../helpers/fp/eq'
import { Address$, XChainClient$ } from '../clients/types'

export const address$: (client$: XChainClient$) => Address$ = (client$) =>
  client$.pipe(
    RxOp.map(O.map((client) => client.getAddress())),
    RxOp.distinctUntilChanged(eqOString.equals),
    RxOp.shareReplay(1)
  )

export const addressValidator$ = (client$: XChainClient$) => {
  const res = client$.pipe(
    RxOp.map(
      FP.flow(
        O.map((client) => client.validateAddress),
        O.getOrElse(() => (_: string): boolean => true)
      )
    )
  )
  res.subscribe((v) => console.log('validatorr --- ', v))

  return res
}

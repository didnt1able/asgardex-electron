import React, { useCallback, useMemo } from 'react'

import * as RD from '@devexperts/remote-data-ts'
import { Balances } from '@xchainjs/xchain-client'
import { Asset, assetFromString, assetToString } from '@xchainjs/xchain-util'
import * as FP from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import { useObservableState } from 'observable-hooks'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router'
import * as Rx from 'rxjs'

import { ErrorView } from '../../../components/shared/error/'
import { BackLink } from '../../../components/uielements/backLink'
import { Send, SendFormBNB } from '../../../components/wallet/txs/send'
import { useBitcoinContext } from '../../../contexts/BitcoinContext'
import { useChainContext } from '../../../contexts/ChainContext'
import { useWalletContext } from '../../../contexts/WalletContext'
import { sequenceTOption } from '../../../helpers/fpHelpers'
// import { emptyFunc } from '../../../helpers/funcHelper'
import { getBalanceByAsset } from '../../../helpers/walletHelper'
import { SendParams } from '../../../routes/wallet'
import * as walletRoutes from '../../../routes/wallet'
import { INITIAL_BALANCES_STATE } from '../../../services/wallet/const'
import { TxRD } from '../../../services/wallet/types'
import { SendViewBTC, SendViewETH } from './index'
import { SendViewTHOR } from './SendViewTHOR'

type Props = {}

export const SendView: React.FC<Props> = (): JSX.Element => {
  const { asset } = useParams<SendParams>()
  const intl = useIntl()
  const oSelectedAsset = useMemo(() => O.fromNullable(assetFromString(asset)), [asset])

  const { balancesState$, getExplorerTxUrl$ } = useWalletContext()
  const { transaction, address } = useChainContext()
  const { balances } = useObservableState(balancesState$, INITIAL_BALANCES_STATE)
  const getExplorerTxUrl = useObservableState(getExplorerTxUrl$, O.none)

  const oSelectedAssetWB = useMemo(() => getBalanceByAsset(balances, oSelectedAsset), [balances, oSelectedAsset])

  const { reloadFees } = useBitcoinContext()

  const { txRD$, getTransferActions } = transaction

  const txRD = useObservableState<TxRD>(txRD$, RD.initial)

  const actions = useMemo(() => FP.pipe(getTransferActions(oSelectedAsset), O.toUndefined), [
    getTransferActions,
    oSelectedAsset
  ])

  const [addressValidator] = useObservableState(
    () =>
      FP.pipe(
        oSelectedAsset,
        O.map(address.addressValidator$),
        O.getOrElse(() => Rx.of((_: string): boolean => true))
      ),
    () => () => true
  )

  // address.addressValidator$.subscribe((validator) => console.log('validator --- ', validator))
  console.log('addressValidator --- ', addressValidator)

  const renderAssetError = useMemo(
    () => (
      <>
        <BackLink />
        <ErrorView
          title={intl.formatMessage(
            { id: 'routes.invalid.asset' },
            {
              asset
            }
          )}
        />
      </>
    ),
    [asset, intl]
  )

  const renderSendView = useCallback(
    (asset: Asset) => {
      switch (asset.chain) {
        case 'BNB':
          // return <SendViewBNB selectedAsset={asset} balances={balances} getExplorerTxUrl={getExplorerTxUrl} />
          return FP.pipe(
            sequenceTOption(oSelectedAssetWB, getExplorerTxUrl),
            O.fold(
              () => <></>,
              ([selectedAssetWB, getExplorerTxUrl]) => {
                const successActionHandler: (txHash: string) => Promise<void> = FP.flow(
                  getExplorerTxUrl,
                  window.apiUrl.openExternal
                )
                return (
                  <Send
                    txRD={txRD}
                    successActionHandler={successActionHandler}
                    inititalActionHandler={actions?.resetTx}
                    errorActionHandler={actions?.resetTx}
                    sendForm={
                      <SendFormBNB
                        balance={selectedAssetWB}
                        onSubmit={actions?.pushTx}
                        balances={FP.pipe(
                          balances,
                          O.getOrElse(() => [] as Balances)
                        )}
                        isLoading={RD.isPending(txRD)}
                        addressValidation={addressValidator}
                        fee={O.none}
                      />
                    }
                  />
                )
              }
            )
          )
        case 'BTC':
          return (
            <SendViewBTC
              btcAsset={asset}
              balances={balances}
              reloadFeesHandler={reloadFees}
              getExplorerTxUrl={getExplorerTxUrl}
            />
          )
        case 'ETH':
          return <SendViewETH />
        case 'THOR':
          return <SendViewTHOR thorAsset={asset} balances={balances} getExplorerTxUrl={getExplorerTxUrl} />
        default:
          return (
            <h1>
              {intl.formatMessage(
                { id: 'wallet.errors.invalidChain' },
                {
                  chain: asset.chain
                }
              )}
            </h1>
          )
      }
    },
    [
      balances,
      getExplorerTxUrl,
      intl,
      reloadFees,
      actions?.pushTx,
      actions?.resetTx,
      addressValidator,
      oSelectedAssetWB
    ]
  )

  return FP.pipe(
    oSelectedAsset,
    O.fold(
      () => renderAssetError,
      (asset) => (
        <>
          <BackLink path={walletRoutes.assetDetail.path({ asset: assetToString(asset) })} />
          {renderSendView(asset)}
        </>
      )
    )
  )
}

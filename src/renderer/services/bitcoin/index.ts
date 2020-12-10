import { balances$, reloadBalances } from './balances'
import { client$, clientViewState$, address$, explorerUrl$, getExplorerTxUrl$ } from './common'
import { createFeesService } from './fees'
import { createLedgerService, createLedgerTransferService } from './ledger'
import { createTransactionService } from './transaction'

const { pushTx, txRD$, resetTx, sendDepositTx, txs$ } = createTransactionService(client$)
const { fees$, reloadFees, poolFee$, getPoolFeeRate, reloadDepositFee, poolFeeRate$ } = createFeesService(client$)
const { ledgerAddress$, retrieveLedgerAddress, removeLedgerAddress } = createLedgerService()
const { pushLedgerTx, ledgerTxRD$, resetLedgerTx } = createLedgerTransferService()

export {
  client$,
  explorerUrl$,
  getExplorerTxUrl$,
  clientViewState$,
  address$,
  reloadBalances,
  balances$,
  fees$,
  poolFee$,
  getPoolFeeRate,
  pushTx,
  sendDepositTx,
  reloadFees,
  txRD$,
  resetTx,
  txs$,
  reloadDepositFee,
  poolFeeRate$,
  ledgerAddress$,
  retrieveLedgerAddress,
  removeLedgerAddress,
  pushLedgerTx,
  ledgerTxRD$,
  resetLedgerTx
}

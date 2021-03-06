import { DepositMessages } from '../types'

const deposit: DepositMessages = {
  'deposit.share.title': 'Ваша общая доля в пуле',
  'deposit.share.units': 'Единицы ликвидности',
  'deposit.share.poolshare': 'Доля в пуле',
  'deposit.share.total': 'Общее значение',
  'deposit.redemption.title': 'Текущая стоимость покупки',
  'deposit.totalEarnings': 'Ваш общий доход от пула',
  'deposit.add.asym': 'Добавить {asset}',
  'deposit.add.sym': 'Добавить {assetA} + {assetB}',
  'deposit.add.error.chainFeeNotCovered': 'Необходимая комиссия {fee} не покрывается вашим балансом: {balance}',
  'deposit.add.error.nobalances': 'Нет средств',
  'deposit.add.error.nobalance1': 'У вас нет средств на балансе {asset} в кошелке для вклада',
  'deposit.add.error.nobalance2': 'У вас нет средств на балансах {asset1} и {asset2} в кошельке для вклада',
  'deposit.withdraw': 'Убрать',
  'deposit.advancedMode': 'Расширенный режим',
  'deposit.drag': 'Потяните',
  'deposit.poolDetails.depth': 'Глубина',
  'deposit.poolDetails.24hvol': 'Количество за 24ч',
  'deposit.poolDetails.allTimeVal': 'Количество за все время',
  'deposit.poolDetails.totalSwaps': 'Всего свапов',
  'deposit.poolDetails.totalUsers': 'Всего держателей',
  'deposit.wallet.add': 'Добавить',
  'deposit.wallet.connect': 'Пожалуйсста добавьте свой кошелек',
  'deposit.pool.noDeposit': 'У вас нет доли в этом пуле',
  'deposit.withdraw.title': 'Установить вывод',
  'deposit.withdraw.choseText': 'Выберите сколько вы хотите изять от 0% до 100%',
  'deposit.withdraw.receiveText': 'Вы полчучите',
  'deposit.withdraw.fee': 'Комиссия',
  'deposit.withdraw.feeNote': 'Важно: {fee} BNB останется на вашем кошельке для покрытия комисий.',
  'deposit.withdraw.drag': 'Перетащите для изъявтия'
}

export default deposit

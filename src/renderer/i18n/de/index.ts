// German
// Antd Internationalization https://2x.ant.design/docs/react/i18n
import antdData from 'antd/lib/locale-provider/de_DE'

import { Messages } from '../types'
import common from './common'
import deposit from './deposit'
import ledger from './ledger'
import midgard from './midgard'
import pools from './pools'
import routes from './routes'
import settings from './settings'
import swap from './swap'
import wallet from './wallet'

export default {
  ...antdData,
  ...common,
  ...pools,
  ...routes,
  ...wallet,
  ...settings,
  ...swap,
  ...deposit,
  ...midgard,
  ...ledger
} as Messages

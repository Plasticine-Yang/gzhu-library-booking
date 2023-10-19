import { resolve } from 'path'

const NODE_ENV = process.env.NODE_ENV ?? 'production'

export const PACKAGE_ROOT = NODE_ENV === 'production' ? resolve(__dirname, '..') : resolve(__dirname, '../..')

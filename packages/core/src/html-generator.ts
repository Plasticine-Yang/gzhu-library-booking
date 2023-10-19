import { readFileSync } from 'fs'
import hbs, { HelperOptions } from 'handlebars'
import { resolve } from 'path'

import { SRC_ROOT } from './constants'
import { HTMLGeneratorRenderProps } from './types'

export class HTMLGenerator {
  private indexTemplate: string

  constructor() {
    this.indexTemplate = readFileSync(resolve(SRC_ROOT, 'templates/index.hbs'), 'utf-8')
    const infoPartial = readFileSync(resolve(SRC_ROOT, 'templates/info.hbs'), 'utf-8')
    const errorPartial = readFileSync(resolve(SRC_ROOT, 'templates/error.hbs'), 'utf-8')

    // helpers
    hbs.registerHelper('ifEquals', function (this: any, a: string, b: string, options: HelperOptions) {
      if (a === b) {
        return options.fn(this)
      } else {
        return options.inverse(this)
      }
    })

    // partials
    hbs.registerPartial('info', infoPartial)
    hbs.registerPartial('error', errorPartial)
  }

  public render(props: HTMLGeneratorRenderProps): string {
    return hbs.compile(this.indexTemplate)(props)
  }
}

export type CodeWriterOptions = {
  indentSize?: number
  useTabs?: boolean
  lineEnding?: '\n' | '\r\n'
  openBracket?: string
  closeBracket?: string
  omitNull?: boolean
}

export type EachContext = {
  isFirst: boolean
  isLast: boolean
  trailingComma: null | ','
}

export class CodeWriter {
  indentSize: number
  useTabs: boolean
  lineEnding: string
  openBracket: string
  closeBracket: string
  indents: number = 0
  content: string[] = []
  omitNull: boolean

  constructor(options: CodeWriterOptions = {}) {
    this.indentSize = options.indentSize ?? 2
    this.useTabs = options.useTabs ?? false
    this.lineEnding = options.lineEnding ?? '\n'
    this.openBracket = options.openBracket ?? ' {'
    this.closeBracket = options.closeBracket ?? '}'
    this.omitNull = options.omitNull ?? true
  }

  #getIndent() : string {
    if (this.useTabs) {
      return '\t'.repeat(this.indents)
    } else {
      return ' '.repeat(this.indents * this.indentSize)
    }
  }

  write(line: string = '', indent: boolean = false) : CodeWriter {
    this.content.push( (indent ? this.#getIndent() : '') + line )
    return this;
  }

  writeLine(line: string = '', indent: boolean = true) : CodeWriter {
    this.write(line + this.lineEnding, indent)
    return this
  }

  writeOpenBracket(suffix?:string) : CodeWriter {
    this.writeLine(suffix + this.openBracket, true)
    this.indent()
    return this
  }

  writeCloseBracket(prefix?:string) : CodeWriter {
    this.unindent()
    this.writeLine(`${this.closeBracket}${ prefix ? prefix : '' }`, true)

    return this
  }

  writeBlankLine() : CodeWriter {
    this.writeLine()
    return this
  }

  writeLines<T>(source: T[], fn: (item:T, index:number, context: EachContext, array:T[]) => string | null | undefined) : CodeWriter {
    let text: string | undefined | null = null
    this.each(source, (item, index, context, array) => {
      text = fn(item, index, context, array)
      if (text === null || text === undefined)
        {
          if (!this.omitNull)
            this.writeLine( '' , true)
        }
      else
        this.writeLine( text , true)
    })
    return this
  }

  each<T>(source: T[], fn: (item:T, index:number, context: EachContext, array:T[]) => void) : CodeWriter {
    let context: EachContext = {isFirst: true, isLast: false, trailingComma: ','}
    source.forEach( (item, index, array) => {

      context = {
        isFirst: index === 0,
        isLast: index === array.length - 1,
        trailingComma: index === array.length - 1 ? null : ','
      }

      fn(item, index, context, array)

    })
    return this
  }

  indent(count: number = 1) : CodeWriter {
    while(count-- > 0)
      this.indents++
    return this
  }

  unindent(count: number = 1) : CodeWriter {
    while(count-- > 0)
      this.indents--
    return this
  }

  toString() : string {
    return this.content.join('')
  }

  clear() : CodeWriter {
    this.content = []
    this.indents = 0
    return this
  }
}

export const titleCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// sentences case -> 'Some-Text_here' -> 'SomeTextHere'
export const sentenceCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    })
    .replace(' ', '')
}


export const pascalCase = (str: string) => {
  return str
    .replace(/(^\w|-\w)/g, clearAndUpper)
    .replace(/_/g, '')

  function clearAndUpper(text: string) {
    return text.replace(/-/, '').toUpperCase()
  }
}


export const singularize = (str: string) => {
  if (str.endsWith('ies')) {
    return str.slice(0, -3) + 'y';
  } else if (str.endsWith('s') && !str.endsWith('ss')) {
    return str.slice(0, -1);
  }
  return str;
}

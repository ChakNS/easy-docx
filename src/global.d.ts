declare type OptionType = {
  immediate?: boolean
  fileName?: string
} | string

declare type StringOrObject = { [key: string]: string | { [key: string] : string } }

declare interface VNodeType {
  tag: string
  text?: string
  data: {
    attrs?: StringOrObject
  },
  children: Array<VNodeType>
}

declare type TempType = string | VNodeType

declare interface ConfigType {
  tag?: string
  text?: string
  attrs?: StringOrObject
  type?: string
  children?: Array<ConfigType>
}
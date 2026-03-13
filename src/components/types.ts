export type UiIcons<TIconName extends string = string> = Partial<Record<TIconName, string>>;
export type UiIconsGroups<TIconName extends string = string> = Record<string, UiIcons<TIconName>>;

export interface AppConfig<TIconName extends string = string> {
  icons?: UiIcons<TIconName>
  allIcons?: UiIconsGroups<TIconName>
  store?: {
    env?: {
      isMockerMode?: boolean
    }
  }
}

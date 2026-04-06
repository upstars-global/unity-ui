import type { Slot } from 'vue'


export interface UiBaseAccordionProps {
  title: string,
  content: string,
  rootClasses?: string,
  toggleClasses?: string,
  titleClasses?: string,
  iconClasses?: string,
  contentClasses?: string,
  opened?: boolean,
  defaultOpened: boolean,
}

export interface UiBaseAccordionSlots {
  default?: Slot
  action?: Slot
  title?: Slot
}

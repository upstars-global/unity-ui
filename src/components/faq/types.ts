import type { Slot } from 'vue'

export interface IQuestionItem {
  question: string;
  answer: string;
}
export interface UiFAQProps {
  title?: string
  questions: IQuestionItem[]
}

export interface UiFAQSlots {
  title?: Slot
}


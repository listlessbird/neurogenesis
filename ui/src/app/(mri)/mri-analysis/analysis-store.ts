import { createStore } from "zustand/vanilla"
import { persist, createJSONStorage } from "zustand/middleware"

type Tabs = "nda" | "mra"

export type AnalysisPageState = {
  lastTab: Tabs
}

export type AnalysisStoreActions = {
  setLastTab: (tab: Tabs) => void
}

export type AnalysisStore = AnalysisPageState & AnalysisStoreActions

export const initAnalysisStore = (): AnalysisPageState => {
  return { lastTab: "nda" }
}

export const defaultInitState: AnalysisPageState = {
  lastTab: "nda",
}

export const createAnalysisStore = (
  initState: AnalysisPageState = defaultInitState
) => {
  return createStore<AnalysisStore>()(
    persist(
      (set) => ({
        ...initState,
        setLastTab: (tab) => set((state) => ({ ...state, lastTab: tab })),
      }),
      {
        name: "analysis-store",
      }
    )
  )
}

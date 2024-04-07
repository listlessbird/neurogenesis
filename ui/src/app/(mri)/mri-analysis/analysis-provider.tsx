"use client"

import { type ReactNode, createContext, useRef, useContext } from "react"
import { type StoreApi, useStore } from "zustand"

import {
  type AnalysisStore,
  createAnalysisStore,
  initAnalysisStore,
} from "./analysis-store"

export const AnalysisStoreContext =
  createContext<StoreApi<AnalysisStore> | null>(null)

export interface AnalysisStoreProviderProps {
  children: ReactNode
}

export const AnalysisStoreProvider = ({
  children,
}: AnalysisStoreProviderProps) => {
  const storeRef = useRef<StoreApi<AnalysisStore>>()
  if (!storeRef.current) {
    storeRef.current = createAnalysisStore(initAnalysisStore())
  }

  return (
    <AnalysisStoreContext.Provider value={storeRef.current}>
      {children}
    </AnalysisStoreContext.Provider>
  )
}

export const useAnalysisStore = <T,>(
  selector: (store: AnalysisStore) => T
): T => {
  const counterStoreContext = useContext(AnalysisStoreContext)

  if (!counterStoreContext) {
    throw new Error(`useAnalysisStore must be use within AnalysisStoreProvider`)
  }

  return useStore(counterStoreContext, selector)
}

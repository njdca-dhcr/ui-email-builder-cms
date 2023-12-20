import React, {
  FC,
  MutableRefObject,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useRef,
} from 'react'

export const SYNC_SIDEBAR_AND_PREVIEW_SCROLL = {
  previewContainerId: 'preview-container',
  sidebarContainerId: 'sidebar-container',
  activeEmailComponentClass: 'active-email-component',
  activeEmailSubcomponentClass: 'active-email-subcomponent',
}

class SyncSidebarAndPreviewScrollInstance {
  previewElements: { [key: string]: HTMLElement | null } = {}

  previewContainer = (): HTMLElement | null =>
    document.querySelector(`#${SYNC_SIDEBAR_AND_PREVIEW_SCROLL.previewContainerId}`)

  sidebarContainer = (): HTMLElement | null =>
    document.querySelector(`#${SYNC_SIDEBAR_AND_PREVIEW_SCROLL.sidebarContainerId}`)

  get = (id: string): HTMLElement | null => {
    return this.previewElements[id]
  }

  setPreviewElement = (id: string, element: HTMLElement | null) => {
    this.previewElements[id] = element
  }

  scrollSidebar = () => {
    const container = this.sidebarContainer()

    const sidebarSubcomponent: HTMLElement | null = document.querySelector(
      `.${SYNC_SIDEBAR_AND_PREVIEW_SCROLL.activeEmailSubcomponentClass}`,
    )
    const sidebarComponent: HTMLElement | null = document.querySelector(
      `.${SYNC_SIDEBAR_AND_PREVIEW_SCROLL.activeEmailComponentClass}`,
    )

    if (container && sidebarComponent) {
      scrollIntoView(container, sidebarComponent)
    }
    if (container && sidebarSubcomponent) {
      scrollIntoView(container, sidebarSubcomponent)
    }
  }

  scrollPreview = (id: string) => {
    const element = this.get(id)
    const container = this.previewContainer()
    if (container && element) {
      scrollIntoView(container, element)
    }
  }
}

const scrollIntoView = (scrollContainer: HTMLElement, element: HTMLElement) => {
  const containerHeight = scrollContainer.getBoundingClientRect().height
  const { y } = element.getBoundingClientRect()

  if (y < 0 || y > containerHeight) {
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }
}

const SyncSidebarAndPreviewScrollContext = createContext<
  MutableRefObject<SyncSidebarAndPreviewScrollInstance>
>({ current: new SyncSidebarAndPreviewScrollInstance() })

const useSyncSidebarAndPreviewScrollManager = () => useContext(SyncSidebarAndPreviewScrollContext)

export const SyncSidebarAndPreviewScroll: FC<{ children: ReactNode }> = ({ children }) => {
  const syncSidebarRefManager = useRef(new SyncSidebarAndPreviewScrollInstance())

  return (
    <SyncSidebarAndPreviewScrollContext.Provider value={syncSidebarRefManager}>
      {children}
    </SyncSidebarAndPreviewScrollContext.Provider>
  )
}

export const useSyncSidebarAndPreviewScroll = (id: string) => {
  const manager = useSyncSidebarAndPreviewScrollManager()
  return useMemo(
    () => ({
      previewRef: (element: HTMLElement | null) => manager.current.setPreviewElement(id, element),
      scrollPreview: () => manager.current.scrollPreview(id),
      scrollSidebar: () => manager.current.scrollSidebar(),
    }),
    [id],
  )
}

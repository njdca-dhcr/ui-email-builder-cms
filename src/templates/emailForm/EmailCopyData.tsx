import React, {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { ID } from 'src/appTypes'

type Data = { [key: string]: string | undefined }

type EmailCopyDataContextValue = { update: (data: Data) => void; data: Data }

export const EmailCopyDataContext = createContext<EmailCopyDataContextValue>({
  data: {},
  update: () => {},
})

export const useEmailCopyData = (id: ID): { onChange: (value: any) => void; value: any } => {
  const { data, update } = useContext(EmailCopyDataContext)
  const componentId = `${id}`
  const value = data[componentId] ?? ''

  const onChange = useCallback(
    (newValue: any) => {
      update({ ...data, [componentId]: newValue })
    },
    [data],
  )

  return { onChange, value }
}

export const EmailCopyData: FC<{ children: ReactNode; initialData?: Data }> = ({
  children,
  initialData,
}) => {
  const [data, setData] = useState<Data>(initialData ?? {})

  const value: EmailCopyDataContextValue = useMemo(() => {
    return { data, update: setData }
  }, [data, setData])

  return <EmailCopyDataContext.Provider value={value}>{children}</EmailCopyDataContext.Provider>
}

import { FunctionComponent } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { RemixBrowser } from '@remix-run/react'
import { ClientProvider, createClient } from '@giant-robot/graphql-client'

const AppShell: FunctionComponent = () => {
  const client = createClient()

  return (
    <ClientProvider client={client}>
      <RemixBrowser />
    </ClientProvider>
  )
}

hydrateRoot(document, <AppShell />)

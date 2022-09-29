import { config } from 'dotenv'
import { setContext } from '@apollo/client/link/context'
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject
} from '@apollo/client'
import fetch from 'cross-fetch'

if (process.env.NODE_ENV !== 'production') {
  config()
}

const initialState =
  globalThis.window !== undefined ? window.__INITIAL_STATE__ : {}

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  fetch
})

const link = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.BEARER_TOKEN ?? ''}`
    }
  }
})

export default (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    link: link.concat(httpLink),
    cache: new InMemoryCache().restore(initialState)
  })
}

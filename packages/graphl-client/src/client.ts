import { setContext } from '@apollo/client/link/context'
import { config } from 'dotenv'
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  NormalizedCacheObject
} from '@apollo/client'
import fetch from 'cross-fetch'

if (process.env.NODE_ENV !== 'production') {
  config()
}

const getHttpLink = (): ApolloLink => {
  return setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${process.env.BEARER_TOKEN ?? ''}`
      }
    }
  }).concat(
    new HttpLink({
      uri: 'https://api.github.com/graphql',
      fetch
    })
  )
}

const createClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    cache: new InMemoryCache().restore(
      globalThis.window === undefined ? {} : window.__INITIAL_STATE__
    ),
    link: getHttpLink()
  })
}

export default createClient

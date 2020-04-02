import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import {NextPageContext} from 'next';
import fetch from 'isomorphic-unfetch'

//@ts-ignore
export default function createApolloClient(initialState, ctx: NextPageContext) {

  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  })
}
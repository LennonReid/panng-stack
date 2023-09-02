import { NgModule } from '@angular/core'
import { ApolloClientOptions, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { environment } from '../environments/environment'
import { setContext } from '@apollo/client/link/context'

export function createApollo(): ApolloClientOptions<any> {
  const httpLink = createHttpLink({
    uri: environment.graphqlUri,
  })

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('WEB_AUTH_TOKEN')
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })
  return {
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  }
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}

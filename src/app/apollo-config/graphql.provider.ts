import {ApplicationConfig, inject} from '@angular/core';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {Apollo, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';

//const uri = 'http://localhost:3000'; // <-- add the URL of the GraphQL server here
const uri = 'api/graphql'; // <-- add the URL of the GraphQL server here
const uri2 = '/graphql'; // URL del segundo servidor

//const uri = '/api'; // <-- add the URL of the GraphQL server here
//const uriF = `${uri}/`;
//const uri = `${`/api`}/`;
//link: httpLink.create({ uri }),
export function apolloOptionsFactory(): ApolloClientOptions<any> {
  const httpLink = inject(HttpLink);
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}

// Función para crear las opciones del segundo Apollo Client
export function apolloOptionsFactory2(): ApolloClientOptions<any> {
  const httpLink = inject(HttpLink);
  return {
    link: httpLink.create({uri: uri2}),
    cache: new InMemoryCache(),
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
  {
    provide: 'APOLLO_OPTIONS_2', // Nombre único para el segundo cliente
    useFactory: apolloOptionsFactory2, // Registrar el segundo cliente
  }
];

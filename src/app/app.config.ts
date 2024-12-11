import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { graphqlProvider } from './apollo-config/graphql.provider';
import {HttpLink} from "apollo-angular/http";
import {ApolloClient, ApolloLink, createHttpLink, InMemoryCache} from "@apollo/client/core";
import {provideNamedApollo} from "apollo-angular";
// @ts-ignore
import { createUploadLink } from 'apollo-upload-client';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
              provideRouter(routes),
              provideClientHydration(),
              provideAnimationsAsync(),
              provideHttpClient(withFetch()),
              //graphqlProvider
              provideNamedApollo(() => {
                const httpLink = inject(HttpLink);
                const uploadLink = createUploadLink({
                  uri: '/graphql',
                });

                return {
                  //  These settings will be saved as default client
                  default: {
                    link: httpLink.create({
                      uri: 'api/graphql',
                    }),
                    cache: new InMemoryCache(),
                  },
                  // These settings will be saved by name: myAlternativeGraphQl
                  myAlternativeGraphQl: {
                    link: uploadLink,
                    cache: new InMemoryCache(),
                  },
                };
              })
             ]
};

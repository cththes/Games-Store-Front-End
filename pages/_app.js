import '../styles/globals.css'
import 'antd/dist/antd.css'
import Header from '../components/Header'
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import {createUploadLink} from "apollo-upload-client"
import {API_URL} from "../constants/common"

const link = createUploadLink({
  uri: API_URL + '/graphql'
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
   return (
      <ApolloProvider client={client}>
         <Header />
         <Component {...pageProps} />
      </ApolloProvider>
   )
}

export default MyApp

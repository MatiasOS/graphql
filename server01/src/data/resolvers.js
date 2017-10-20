import { createApolloFetch } from 'apollo-fetch'

const uri = 'http://server02:3001/graphql'
const apolloFetch = createApolloFetch({uri})

const resolvers = {
  Query: {
    hello(__, {what}) {
      return apolloFetch({query: `{hello(what: "${what}")}`})
        .then(result => {
          const {data, errors, extensions} = result
          console.dir(result)
          return `${data.hello}!`
        })
        .catch(error => {

          console.log('err')
          console.dir(error)
        })
    }
  }
}

export default resolvers

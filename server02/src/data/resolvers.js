const resolvers = {
  Query: {
    hello(__, {what}){
      console.dir(what)
      return what
    }
  }
}

export default resolvers
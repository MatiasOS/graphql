const resolvers = {
  Query: {
    hello(__, {what}){
      console.log(arguments)
      return `${what} :)`
    }
  }
}

export default resolvers
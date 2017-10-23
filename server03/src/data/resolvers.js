const pepole = [
  {name: 'Number 0'},
  {name: 'Number 1'},
  {name: 'Number 2'},
  {name: 'Number 3'},
  {name: 'Number 4'},
  {name: 'John 5'},
]

const resolvers = {
  Query: {
    person(__, {id}){
      const p = pepole[id]
      return {id, ...p}
    }
  }
}

export default resolvers
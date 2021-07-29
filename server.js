const {graphql} = require('graphql')
const schema = require('./schema')

const query = `
query {
  players {
    __typename

    ...on HumanPlayer {
      score

      metadata {
        height
      }
    }

    ...on RobotPlayer {
      turn
    }
  }
}
`

graphql(schema, query).then((result) => {
  console.log(JSON.stringify(result, null, 2));
});

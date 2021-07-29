const {graphql} = require('graphql')
const schema = require('./schema')

const query = `
query {
  players {
    __typename

    ...on HumanPlayer {
      score

      metadata {
        __typename
        displayName
      }
    }

    ...on RobotPlayer {
      turn
    }

    metadata {
      __typename
      displayName

      ...on RobotMetadata {
        model
      }

      ...on HumanMetadata {
        height
      }
    }
  }
}
`

graphql(schema, query).then((result) => {
  console.log(JSON.stringify(result, null, 2));
});

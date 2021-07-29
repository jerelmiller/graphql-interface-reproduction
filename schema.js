const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLInt
} = require('graphql');

const PlayerMetadataInterface = new GraphQLInterfaceType({
  name: 'PlayerMetadataInterface',
  fields: {
    displayName: {type: GraphQLString}
  },
  resolveType(value) {
    switch (value.type) {
      case 'HumanMetadata':
        return HumanMetadata
      case 'RobotMetadata':
        return RobotMetadata
    }
  }
})

const PlayerInterface = new GraphQLInterfaceType({
  name: 'PlayerInterface',
  fields: {
    metadata: {type: PlayerMetadataInterface},
  },
  resolveType(value) {
    switch (value.type) {
      case 'Human':
        return HumanPlayer
      case 'Robot':
        return RobotPlayer
    }
  }
})

const HumanMetadata = new GraphQLObjectType({
  name: 'HumanMetadata',
  interfaces: [PlayerMetadataInterface],
  fields: {
    displayName: {
      type: GraphQLString,
      resolve() {
        return "Human"
      }
    },
    height: {
      type: GraphQLInt,
      resolve() {
        return 72
      }
    }
  }
})

const HumanPlayer = new GraphQLObjectType({
  name: 'HumanPlayer',
  interfaces: [PlayerInterface],
  fields: {
    score: {
      type: GraphQLInt,
      resolve() {
        return 10
      }
    },
    metadata: {
      type: HumanMetadata,
      resolve() {
        return {
          metadata: {
            type: 'HumanMetadata'
          }
        }
      }
    }
  }
})

const RobotMetadata = new GraphQLObjectType({
  name: 'RobotMetadata',
  interfaces: [PlayerMetadataInterface],
  fields: {
    displayName: {
      type: GraphQLString,
      resolve() {
        return "Robot"
      }
    },
    model: {
      type: GraphQLString,
      resolve() {
        return 'R2-D2'
      }
    }
  }
})

const RobotPlayer = new GraphQLObjectType({
  name: 'RobotPlayer',
  interfaces: [PlayerInterface],
  fields: {
    turn: {
      type: GraphQLString,
      resolve() {
        return "1st turn"
      }
    },
    metadata: {
      type: RobotMetadata,
      resolve() {
        return {
          metadata: {
            type: 'RobotMetadata'
          }
        }
      }
    }
  }

})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      robot: {
        type: RobotPlayer,
        resolve() {
          return null
        }
      },
      human: {
        type: HumanPlayer,
        resolve() {
          return null
        }
      },
      players: {
        type: new GraphQLList(PlayerInterface),
        resolve() {
          return [{type: 'Robot'}, {type: 'Human'}]
        }
      },
      player: {
        type: PlayerInterface,
        resolve() {
          return {
            type: 'Robot',
          }
        },
      },
    },
  }),
});

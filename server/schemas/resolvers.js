const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		users: async () => {
			return await User.find({}).select('-password');
		},
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

				return userData;
			}

			throw new AuthenticationError('Not logged in');
		}
	},

	Mutation: {
		addUser: async (_, args) => {
			const user = await User.create(args);
			const token = signToken(user);
			
			return { token, user };
		}
	},
};

module.exports = resolvers;

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const fetch = require('node-fetch');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/'));
})

app.get('/gas', async (req, res) => {
	try {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/place/textsearch/json?query=gas_station+in+${req.query.zip}&key=${process.env.API_KEY}`
		);
		let data = await response.json();
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
})

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
	await server.start();
	server.applyMiddleware({ app });

	db.once('open', () => {
		app.listen(PORT, () => {
			console.log(`API server running on port ${PORT}!`);
			console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
		})
	})
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);

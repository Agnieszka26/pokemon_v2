import {userSchema as User} from "./models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import   * as R from "ramda"
// {  "name": "test",
// "email": "test@email.com",  "nick": "test",
// "password": "test",
// "rePassword": "test"
// }
import BasePokemonModel from "./models/BasePokemon";

const resolvers = {
  Query: {
    // returns a base details of pokemons
    getPokemon: (__, { id }, { dataSources }) => {
      return  dataSources.pokemonAPI.getPokemon(id);
    },
    // returns a paginated array of pokemons that will be used to populate the homepage carousel of our web client
    getLimitedPokemons: (__, { limit, offset }, { dataSources }) => {
      return dataSources.pokemonAPI.getLimitedPokemons(limit, offset);
    },
    //pokemons from custom mongodb
    pokemons: async (__, _, { dataSources }) => {
      return await dataSources.basePokemons.pokemons();
    },
    //pokemon by its id from custom mongodb
    pokemon: async (__, { pokemonId }, { dataSources }) => {
      return await dataSources.basePokemons.pokemon(pokemonId);
    },
  },
  NamedAPIResource: {
    url: ({ url }, _, { dataSources }) => {
      return dataSources.pokemonAPI.getPokemonByUrl(url);
    },
  },
  Mutation: {
    createPokemon: async (_,{ name, id}, {dataSources} ) =>{
      // console.log('addMainPokemon, name, id', name, id)
      // console.log(' dataSources', dataSources.basePokemons.addPokemon(id, name))
      const newPokemon = new BasePokemonModel({ name, id} );
      await newPokemon.save();
      // const pokemon = await dataSources.basePokemons.addPokemon(id, name)
      return newPokemon
    },


    registerUser: async (_, { name, email, nick, password }, {dataSources}) => {


        // Check if user already exists
        //TODO: THROW EXCEPTION
        // const existingUser = await dataSources.users.checkUserExists(email)
        // if (R.isEmpty(existingUser)) {
        //   throw new Error('User already exists');
        // }

        // Create new user

        const user = await dataSources.users.createUser({ name, email, nick, password });
        console.log('user', user)

        // Generate confirmation token
      //   const token = jwt.sign({ userId: user.id }, 'secret-key', { expiresIn: '1d' });

      //   // Send confirmation email
      //   const transporter = nodemailer.createTransport({
      //     service: 'Gmail',
      //     auth: {
      //       user: 'your-email@gmail.com',
      //       pass: 'your-email-password'
      //     }
      //   });

      //   const url = `http://localhost:4000/confirm/${token}`;
      //   await transporter.sendMail({
      //     to: user.email,
      //     subject: 'Confirm your email',
      //     html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`
      //   });

      //   return 'Please check your email to confirm your account';
      },
    },
    // confirmEmail: async (_, { token }) => {
    //   try {
    //     const { userId } = jwt.verify(token, 'secret-key');

    //     // Find the user and update confirmation status
    //     const user = await User.findById(userId);
    //     if (!user) {
    //       throw new Error('Invalid token');
    //     }

    //     user.confirmed = true;
    //     await user.save();

    //     return true;
    //   } catch (error) {
    //     console.error(error);
    //     return false;
    //   }

    // }
};

export default resolvers;

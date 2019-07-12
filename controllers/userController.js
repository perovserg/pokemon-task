import { OAuth2Client } from 'google-auth-library';

import User from '../models/User';

const clientOAuth2 = new OAuth2Client(process.env.OAUTH_GOOGLE_API_CLIENT_ID);

export const findOrCreateUser = async token => {

    const googleUser = await verifyAuthToken(token);

    const user = await checkIfUserExists(googleUser.email);

    return user ? user : createNewUser(googleUser);
};

const verifyAuthToken = async token => {

    console.log(`OAUTH_GOOGLE_API_CLIENT_ID => ${process.env.OAUTH_GOOGLE_API_CLIENT_ID}`);

    try {
        const ticket = await clientOAuth2.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_GOOGLE_API_CLIENT_ID,
        });

        return ticket.getPayload();

    } catch (error) {
        console.error('Error verifying auth token'. error);
    }
};

const checkIfUserExists = async email => await User.findOne({ email }).exec();

const createNewUser = googleUser => {
    const { name, email, picture } = googleUser;
    const user = { name, email, picture };
    return new User(user).save();
};

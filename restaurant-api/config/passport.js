const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { ObjectId } = require("mongodb");

const mongodb = require("../db/connect");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/google/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const usersCollection = mongodb
          .getDb()
          .collection("users");

        let user = await usersCollection.findOne({
          googleId: profile.id
        });

        if (!user) {
          const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value || null,
            photo: profile.photos?.[0]?.value || null,
            createdAt: new Date(),
            lastLoginAt: new Date()
          };

          const result = await usersCollection.insertOne(newUser);

          user = {
            _id: result.insertedId,
            ...newUser
          };
        } else {
          await usersCollection.updateOne(
            { _id: user._id },
            {
              $set: {
                lastLoginAt: new Date()
              }
            }
          );
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (userId, done) => {
  try {
    if (!ObjectId.isValid(userId)) {
      return done(null, false);
    }

    const user = await mongodb
      .getDb()
      .collection("users")
      .findOne({
        _id: new ObjectId(userId)
      });

    return done(null, user || false);
  } catch (error) {
    return done(error);
  }
});

module.exports = passport;
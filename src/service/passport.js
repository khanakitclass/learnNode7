const passport = require("passport");
const Users = require("../models/auth.model");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const googleProvider = () => {
  try {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_SECRET_KEY,
          callbackURL: "http://localhost:4000/api/v1/users/google/callback",
        },
        async function (accessToken, refreshToken, profile, cb) {
          console.log(profile);

          try {
            const user = await Users.findOne({
              email: profile?.emails[0]?.value,
            });

            //1

            if (!user) {
              const userD = await Users.create({
                googleId: profile?.id,
                email: profile?.emails[0]?.value,
                name: profile.name?.givenName,
                isVerified: true,
              });

              return cb(null, userD);
            }

            //2
            return cb(null, user);
          } catch (error) {
            console.log(error);
          }
        },
      ),
    );

    //3
    passport.serializeUser(function (user, done) {
      done(null, user._id);
    });

    //4
    passport.deserializeUser(async function (_id, done) {
      try {
        const user = await Users.findById(_id);

        //5
        done(null, user);
      } catch (error) {
        done(error, null);
      }
      
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = googleProvider;

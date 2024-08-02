import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/User.js";

// Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          console.log("Incorrect email.");
          return done(null, false, { message: "Incorrect email." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          console.log("Incorrect password.");
          return done(null, false, { message: "Incorrect password." });
        }
        console.log("Authentication successful.");
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Github Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/github/callback",
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || profile._json.email;
        if (!email) {
          return done(
            new Error("El perfil de GitHub no tiene una dirección de correo electrónico.")
          );
        }

        let user = await User.findOne({ email });
        if (!user) {
          user = new User({
            githubId: profile.id,
            email: email,
            username: profile.username,
            role: "user",
          });
          await user.save();
        } else {
          user.githubId = profile.id;
          user.username = profile.username;
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// Jwt Strategy
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// Serialize-Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;

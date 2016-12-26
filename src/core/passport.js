import passport from 'passport';
import { Strategy as GithubStrategy} from 'passport-github2';

import { auth as config } from '../config';

//TODO 实现自己的passport
//Sign in with github
passport.use(new GithubStrategy({
  clientID: config.github.id,
  clientSecret: config.github.secret,
  callbackURL: '/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
    const user = {
      id: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value
    };
    done(null, user);
  }
));

export default passport;
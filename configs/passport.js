const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys');


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        //passport strategy
        //Jwt options, callback
        new JwtStrategy(opts, (jwt_payload, done)=>{
            return done(null,jwt_payload)
        })
        

    )
}
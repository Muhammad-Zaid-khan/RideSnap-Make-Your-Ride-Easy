import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/userModel";
import bcrypt from 'bcrypt'

passport.use(new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password"
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return done(null, false, { message: "User not found" })
            }  
            const isMatch = await bcrypt.compare(password,user.password as string) 
            if (!isMatch) {
                return done(null, false, { message: "Invalid password " })
            }
            return done(null , user)
        } catch (error)
        {
            return done("Some Error can occurred")
        }
    }
));

passport.serializeUser(( user : any , done ) => {
    done(null , user.id)
});
passport.deserializeUser(async( id:number , done) =>{
   try{
    const user = await User.findByPk(id);
    done(null , user)
   }catch(err){
    done(null)
   }
});
export default passport;

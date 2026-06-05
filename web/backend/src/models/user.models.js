import mongoose from 'mongoose'
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true })


//.pre is used because it is the pre-hook (middleware) that executes automatically before a specific database operation takes place
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    //this.something refers to the property named something attached to the current execution content (.this)
    return await bcrypt.compare(password, this.password);
};

//Access Token generates a short-lived token that is used to authenticate user requests to protected routes or resources. It contains user information and is signed with a secret key, allowing the server to verify its authenticity. Access tokens typically have a short expiration time (e.g., 15 minutes) to enhance security.
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
        }
    )
}


//Refresh Tokem generates a long-lived token that is used to obtain new access tokens without requiring the user to re-authenticate. It is also signed with a secret key and typically has a longer expiration time (e.g., 30 days). When an access token expires, the client can use the refresh token to request a new access token from the server, allowing for seamless user experience without frequent logins.
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION
        }
    )
}

export const User = mongoose.model('User', userSchema)

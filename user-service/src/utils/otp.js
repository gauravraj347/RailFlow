const { TooManyRequestsError } = require("./error");
const { config } = require("../config");
const RedisClient = require("../config/redis");
const redis = RedisClient.getInstance();
const otpGenerator = require("otp-generator");
const crypto = require("crypto");

const RATE_MAX = Number(config.OTP_RATE_MAX_PER_HOUR) || 5;
const OTP_TTL = Number(config.OTP_TTL) || 300;
const HMAC_SECRET = config.OTP_HMAC_SECRET;

function hmacFor(email, otp) {
    return crypto.createHmac("sha256", HMAC_SECRET)
        .update(`${email}:${otp}`)
        .digest("hex");
}

async function generateAndStoreOtp(meta) {
    const rateKey = `otp:rate:${meta.email}`;
    const sentCount = Number(await redis.get(rateKey)) || 0;

    if (sentCount >= RATE_MAX) {
        throw new TooManyRequestsError(
            "Too many OTP requests. Try again later.",
            "OTP_RATE_LIMIT"
        );
    }

    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    });

    const otpSessionId = crypto.randomUUID();
    const hashedOtp = hmacFor(meta.email, otp);
    const sessionKey = `otp:session:${otpSessionId}`;

    await redis.set(
        sessionKey,
        JSON.stringify({ hashedOtp, meta }),
        "EX",
        OTP_TTL
    );

    const newCount = await redis.incr(rateKey);

    if (newCount === 1) {
        await redis.expire(rateKey, 3600);
    }

    return { otp, otpSessionId };
}

module.exports = { generateAndStoreOtp };
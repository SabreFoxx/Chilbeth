/* For local development */
export enum ApiEndpoints {
    LOGIN = "http://localhost:3000/api/login",
    REGISTER = "http://localhost:3000/api/register",
    SITE_SETTINGS = "http://localhost:3000/api/settings",

    UPLOAD = "http://localhost:3000/api/upload",
    UPLOADED_FILES = "http://localhost:3000/api/images",

    WORK = "http://localhost:3000/api/work",
    BLOG = "http://localhost:3000/api/blog"
}

/* For live deploy */
// export enum ApiEndpoints {
//     LOGIN = "https://geraldnnebe-chilbeth-backend.glitch.me/api/login",
//     REGISTER = "https://geraldnnebe-chilbeth-backend.glitch.me/api/register",
//     SITE_SETTINGS = "https://geraldnnebe-chilbeth-backend.glitch.me/api/settings",

//     UPLOAD = "https://geraldnnebe-chilbeth-backend.glitch.me/api/upload",
//     UPLOADED_FILES = "https://geraldnnebe-chilbeth-backend.glitch.me/images",

//     WORK = "https://geraldnnebe-chilbeth-backend.glitch.me/api/work",
//     BLOG = "https://geraldnnebe-chilbeth-backend.glitch.me/api/blog"
// }
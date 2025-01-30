import API from "../API.js";
import { Module } from "../Module.js";

/**
 * Description placeholder
 *
 * @interface User
 * @typedef {User}
 */
interface User {
    /**
     * Description placeholder
     *
     * @type {number}
     */
    id: number;
    /**
     * Description placeholder
     *
     * @type {string}
     */
    firstname: string;
    /**
     * Description placeholder
     *
     * @type {string}
     */
    lastname: string;
    /**
     * Description placeholder
     *
     * @type {string}
     */
    email: string;
    /**
     * Description placeholder
     *
     * @type {string}
     */
    avatar: string;
}

/**
 * Description placeholder
 *
 * @interface CreateUser
 * @typedef {CreateUser}
 */
interface CreateUser {
    /**
     * Description placeholder
     *
     * @type {string}
     */
    firstname: string;
    /**
     * Description placeholder
     *
     * @type {string}
     */
    lastname: string;
    /**
     * Description placeholder
     *
     * @type {string}
     */
    email: string;
    /**
     * Description placeholder
     *
     * @type {string}
     */
    password: string;
}

/**
 * Description placeholder
 *
 * @interface LoginUser
 * @typedef {LoginUser}
 */
interface LoginUser {
    /**
     * Description placeholder
     *
     * @type {string}
     */
    username: string;
    /**
     * Description placeholder
     *
     * @type {string}
     */
    password: string;
    /**
     * Description placeholder
     *
     * @type {?string}
     */
    token?: string;
}

/**
 * Description placeholder
 *
 * @export
 * @class AuthModule
 * @typedef {AuthModule}
 * @extends {Module}
 */
export default class AuthModule extends Module {
    /**
     * Creates an instance of AuthModule.
     *
     * @constructor
     * @param {API} api
     */
    constructor(api: API) {
        super(api);
    }

    /** Description placeholder */
    init(): void {
        console.log("Auth module initialized");
    }

    /**
     * Description placeholder
     *
     * @async
     * @param {string} jwtToken
     * @returns {Promise<User[] | null>}
     */
    async getUsers(jwtToken: string): Promise<User[] | null> {
        try {
            const user = await this.makeRequest<User[]>("/api/users", { headers: { Authorization: `${jwtToken}` } });
            return user;
        } catch (error) {
            console.error("Error fetch users", error);
            return null;
        }
    }

    async isLogged(jwtToken: string): Promise<boolean> {
        try {
            const user = await this.makeRequest<User>("/api/me", { headers: { Authorization: `${jwtToken}` } });
            if (user) {
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error fetch user data:", error);
            return false;
        }
    }

    /**
     * Description placeholder
     *
     * @async
     * @param {string} jwtToken
     * @returns {Promise<User | null>}
     */
    async me(jwtToken: string): Promise<User | null> {
        try {
            const user = await this.makeRequest<User>("/api/me", { headers: { Authorization: `${jwtToken}` } });
            return user;
        } catch (error) {
            console.error("Error fetch user data:", error);
            return null;
        }
    }

    /**
     * Description placeholder
     *
     * @async
     * @param {LoginUser} userLogin
     * @returns {Promise<string | { token: string } | null>}
     */
    async login(userLogin: LoginUser): Promise<string | { token: string } | null> {
        try {
            const jwt = await this.makeRequest<LoginUser>("/api/login_check", {
                body: JSON.stringify(userLogin),
                method: "POST",
            });

            if (!jwt.token) {
                return null;
            }

            return {
                token: `Bearer ${jwt.token}`,
            }.token;
        } catch (error) {
            console.error("Error login user:", error);
            return null;
        }
    }

    /**
     * Description placeholder
     *
     * @async
     * @param {CreateUser} userCreate
     * @returns {Promise<User | null>}
     */
    async create(userCreate: CreateUser): Promise<User | null> {
        try {
            const user = await this.makeRequest<User>("/api/user", { body: JSON.stringify(userCreate), method: "POST" });
            return user;
        } catch (error) {
            console.error("Error create user:", error);
            return null;
        }
    }
}

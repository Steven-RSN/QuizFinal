/**
 * Description placeholder
 *
 * @export
 * @abstract
 * @class Module
 * @typedef {Module}
 */
declare abstract class Module {
    /**
     * Description placeholder
     *
     * @protected
     * @type {API}
     */
    protected api: API;
    /**
     * Creates an instance of Module.
     *
     * @constructor
     * @param {API} api
     */
    constructor(api: API);
    /**
     * Description placeholder
     *
     * @abstract
     */
    abstract init(): void;
    /**
     * Description placeholder
     *
     * @protected
     * @returns {string}
     */
    protected getApiUrl(): string;
    /**
     * Description placeholder
     *
     * @protected
     * @template {keyof ModuleMap} T
     * @param {T} moduleName
     * @returns {ModuleMap[T]}
     */
    protected getModule<T extends keyof ModuleMap>(moduleName: T): ModuleMap[T];
    /**
     * Description placeholder
     *
     * @protected
     * @async
     * @template T
     * @param {string} url
     * @param {?RequestInit} [options]
     * @returns {Promise<T>}
     */
    protected makeRequest<T>(url: string, options?: RequestInit): Promise<T>;
}

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
declare class AuthModule extends Module {
    /**
     * Creates an instance of AuthModule.
     *
     * @constructor
     * @param {API} api
     */
    constructor(api: API);
    /** Description placeholder */
    init(): void;
    /**
     * Description placeholder
     *
     * @async
     * @param {string} jwtToken
     * @returns {Promise<User[] | null>}
     */
    getUsers(jwtToken: string): Promise<User[] | null>;
    isLogged(jwtToken: string): Promise<boolean>;
    /**
     * Description placeholder
     *
     * @async
     * @param {string} jwtToken
     * @returns {Promise<User | null>}
     */
    me(jwtToken: string): Promise<User | null>;
    /**
     * Description placeholder
     *
     * @async
     * @param {LoginUser} userLogin
     * @returns {Promise<string | { token: string } | null>}
     */
    login(userLogin: LoginUser): Promise<string | {
        token: string;
    } | null>;
    /**
     * Description placeholder
     *
     * @async
     * @param {CreateUser} userCreate
     * @returns {Promise<User | null>}
     */
    create(userCreate: CreateUser): Promise<User | null>;
}

/**
 * Description placeholder
 *
 * @export
 * @interface Category
 * @typedef {Category}
 */
interface Category {
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
    title: string;
}
/**
 * Description placeholder
 *
 * @interface CreateCategory
 * @typedef {CreateCategory}
 */
interface CreateCategory {
    /**
     * Description placeholder
     *
     * @type {string}
     */
    title: string;
}
/**
 * Description placeholder
 *
 * @export
 * @class CategoryModule
 * @typedef {CategoryModule}
 * @extends {Module}
 */
declare class CategoryModule extends Module {
    /**
     * Creates an instance of CategoryModule.
     *
     * @constructor
     * @param {API} api
     */
    constructor(api: API);
    /** Description placeholder */
    init(): void;
    /**
     * Description placeholder
     *
     * @async
     * @param {string} jwtToken
     * @returns {Promise<Category[] | null>}
     */
    getCategories(jwtToken: string): Promise<Category[] | null>;
    /**
     * Uniquement les ROLE_ADMIN peuvent créer une catégorie
     *
     * @async
     * @param {CreateCategory} categoryCreate
     * @param {string} jwtToken
     * @returns {Promise<Category | null>}
     */
    create(categoryCreate: CreateCategory, jwtToken: string): Promise<Category | null>;
}

/**
 * Description placeholder
 *
 * @export
 * @interface Question
 * @typedef {Question}
 */
interface Question {
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
    title: string;
    /**
     * Description placeholder
     *
     * @type {string}
     */
    description: string;
    /**
     * Description placeholder
     *
     * @type {number}
     */
    value: number;
    /**
     * Description placeholder
     *
     * @type {{
     *         text: string;
     *         valid: boolean;
     *     }[]}
     */
    answers: {
        text: string;
        valid: boolean;
    }[];
}
/**
 * Description placeholder
 *
 * @interface CreateQuestion
 * @typedef {CreateQuestion}
 */
interface CreateQuestion {
    /**
     * Description placeholder
     *
     * @type {string}
     */
    title: string;
    /**
     * Description placeholder
     *
     * @type {string}
     */
    description: string;
    /**
     * Description placeholder
     *
     * @type {number}
     */
    pointNumber: number;
    /**
     * Description placeholder
     *
     * @type {{
     *         text: string;
     *         valid: boolean;
     *     }[]}
     */
    answers: {
        text: string;
        valid: boolean;
    }[];
}
/**
 * Description placeholder
 *
 * @export
 * @class QuestionModule
 * @typedef {QuestionModule}
 * @extends {Module}
 */
declare class QuestionModule extends Module {
    /**
     * Creates an instance of QuestionModule.
     *
     * @constructor
     * @param {API} api
     */
    constructor(api: API);
    /** Description placeholder */
    init(): void;
    /**
     * Description placeholder
     *
     * @async
     * @param {string} jwtToken
     * @returns {Promise<Question[] | null>}
     */
    getQuestions(jwtToken: string): Promise<Question[] | null>;
    /**
     * Description placeholder
     *
     * @async
     * @param {CreateQuestion} questionCreate
     * @param {string} jwtToken
     * @returns {Promise<Question | null>}
     */
    create(questionCreate: CreateQuestion, jwtToken: string): Promise<Question | null>;
}

/**
 * Description placeholder
 *
 * @interface Quizz
 * @typedef {Quizz}
 */
interface Quizz {
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
    title: string;
    /**
     * Description placeholder
     *
     * @type {string}
     */
    description: string;
    /**
     * Description placeholder
     *
     * @type {Category[]}
     */
    categories: Category[];
    /**
     * Description placeholder
     *
     * @type {Question[]}
     */
    questions: Question[];
}
/**
 * Description placeholder
 *
 * @interface CreateQuizz
 * @typedef {CreateQuizz}
 */
interface CreateQuizz {
    /**
     * Description placeholder
     *
     * @type {string}
     */
    title: string;
    /**
     * Description placeholder
     *
     * @type {string}
     */
    description: string;
    /**
     * Description placeholder
     *
     * @type {{
     *         id: number;
     *     }[]}
     */
    categories: {
        id: number;
    }[];
    /**
     * Description placeholder
     *
     * @type {{
     *         id: number;
     *     }[]}
     */
    questions: {
        id: number;
    }[];
}
/**
 * Description placeholder
 *
 * @export
 * @class QuizzModule
 * @typedef {QuizzModule}
 * @extends {Module}
 */
declare class QuizzModule extends Module {
    /**
     * Creates an instance of QuizzModule.
     *
     * @constructor
     * @param {API} api
     */
    constructor(api: API);
    /** Description placeholder */
    init(): void;
    /**
     * Description placeholder
     *
     * @async
     * @param {string} jwtToken
     * @returns {Promise<Quizz[] | null>}
     */
    getQuizz(jwtToken: string): Promise<Quizz[] | null>;
    /**
     * Description placeholder
     *
     * @async
     * @param {number} id
     * @param {string} jwtToken
     * @returns {Promise<Quizz | null>}
     */
    get(id: number, jwtToken: string): Promise<Quizz | null>;
    /**
     * Uniquement les ROLE_ADMIN peuvent créer un quizz
     *
     * @async
     * @param {CreateQuizz} quizzCreate
     * @param {string} jwtToken
     * @returns {Promise<Quizz | null>}
     */
    create(quizzCreate: CreateQuizz, jwtToken: string): Promise<Quizz | null>;
}

/**
 * Description placeholder
 *
 * @type {{ categoryModule: typeof CategoryModule; authModule: typeof AuthModule; questionModule: typeof QuestionModule; quizzModule: typeof QuizzModule; }}
 */
declare const moduleClasses: {
    categoryModule: typeof CategoryModule;
    authModule: typeof AuthModule;
    questionModule: typeof QuestionModule;
    quizzModule: typeof QuizzModule;
};
/**
 * Description placeholder
 *
 * @typedef {PublicMethods}
 * @template T
 */
type PublicMethods<T> = {
    [K in keyof T as T[K] extends Function ? K : never]: T[K];
};
/**
 * Description placeholder
 *
 * @export
 * @typedef {ModuleMap}
 */
type ModuleMap = {
    [K in keyof typeof moduleClasses]: PublicMethods<InstanceType<(typeof moduleClasses)[K]>>;
};
/**
 * Description placeholder
 *
 * @class API
 * @typedef {API}
 */
declare class API {
    /**
     * Description placeholder
     *
     * @type {string}
     */
    apiUrl: string;
    /**
     * Description placeholder
     *
     * @private
     * @type {Partial<ModuleMap>}
     */
    private modules;
    /**
     * Creates an instance of API.
     *
     * @constructor
     * @param {string} apiUrl
     */
    constructor(apiUrl: string);
    /**
     * Description placeholder
     *
     * @private
     * @async
     * @returns {*}
     */
    private loadModules;
    /**
     * Description placeholder
     *
     * @template {keyof ModuleMap} T
     * @param {T} moduleName
     * @returns {ModuleMap[T]}
     */
    getModule<T extends keyof ModuleMap>(moduleName: T): ModuleMap[T];
    /**
     * Description placeholder
     *
     * @async
     * @template T
     * @param {string} url
     * @param {?RequestInit} [options]
     * @returns {Promise<T>}
     */
    makeRequest<T>(url: string, options?: RequestInit): Promise<T>;
}

export { API as default };

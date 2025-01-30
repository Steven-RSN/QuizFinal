import AuthModule from "./modules/auth.js";
import CategoryModule from "./modules/category.js";
import QuestionModule from "./modules/question.js";
import QuizzModule from "./modules/quizz.js";

/**
 * Description placeholder
 *
 * @type {{ categoryModule: typeof CategoryModule; authModule: typeof AuthModule; questionModule: typeof QuestionModule; quizzModule: typeof QuizzModule; }}
 */
const moduleClasses = {
    categoryModule: CategoryModule,
    authModule: AuthModule,
    questionModule: QuestionModule,
    quizzModule: QuizzModule,
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
export type ModuleMap = {
    [K in keyof typeof moduleClasses]: PublicMethods<InstanceType<(typeof moduleClasses)[K]>>;
};

/**
 * Description placeholder
 *
 * @class API
 * @typedef {API}
 */
class API {
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
    private modules: Partial<ModuleMap> = {};

    /**
     * Creates an instance of API.
     *
     * @constructor
     * @param {string} apiUrl
     */
    constructor(apiUrl: string) {
        if (!apiUrl) {
            throw new Error("API URL is required");
        }
        this.apiUrl = apiUrl;
        this.loadModules();
    }

    /**
     * Description placeholder
     *
     * @private
     * @async
     * @returns {*}
     */
    private async loadModules() {
        for (const [moduleName, ModuleClass] of Object.entries(moduleClasses)) {
            const module = new ModuleClass(this);
            module.init();
            this.modules[moduleName as keyof ModuleMap] = module as any;
        }
    }

    /**
     * Description placeholder
     *
     * @template {keyof ModuleMap} T
     * @param {T} moduleName
     * @returns {ModuleMap[T]}
     */
    getModule<T extends keyof ModuleMap>(moduleName: T): ModuleMap[T] {
        const module = this.modules[moduleName];
        if (module) {
            return module as ModuleMap[T];
        }
        throw new Error(`Module ${moduleName} not found`);
    }

    /**
     * Description placeholder
     *
     * @async
     * @template T
     * @param {string} url
     * @param {?RequestInit} [options]
     * @returns {Promise<T>}
     */
    async makeRequest<T>(url: string, options?: RequestInit): Promise<T> {
        try {
            const response = await fetch(this.apiUrl + url, {
                headers: { "Content-Type": "application/json" },
                ...options,
            });
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    }
}

export default API;

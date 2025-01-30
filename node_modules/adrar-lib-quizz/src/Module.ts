import API, { ModuleMap } from "./API.js";

/**
 * Description placeholder
 *
 * @export
 * @abstract
 * @class Module
 * @typedef {Module}
 */
export abstract class Module {
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
    constructor(api: API) {
        this.api = api;
        if (new.target === Module) {
            throw new TypeError("Cannot construct Module instances directly");
        }
    }

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
    protected getApiUrl(): string {
        return this.api.apiUrl;
    }

    /**
     * Description placeholder
     *
     * @protected
     * @template {keyof ModuleMap} T
     * @param {T} moduleName
     * @returns {ModuleMap[T]}
     */
    protected getModule<T extends keyof ModuleMap>(moduleName: T): ModuleMap[T] {
        return this.api.getModule(moduleName);
    }

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
    protected async makeRequest<T>(url: string, options?: RequestInit): Promise<T> {
        return this.api.makeRequest<T>(url, options);
    }
}

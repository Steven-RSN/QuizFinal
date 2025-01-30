import API from "../API.js";
import { Module } from "../Module.js";
import { Category } from "./category.js";
import { Question } from "./question.js";

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
export default class QuizzModule extends Module {
    /**
     * Creates an instance of QuizzModule.
     *
     * @constructor
     * @param {API} api
     */
    constructor(api: API) {
        super(api);
    }

    /** Description placeholder */
    init(): void {
        console.log("Quizz module initialized");
    }

    /**
     * Description placeholder
     *
     * @async
     * @param {string} jwtToken
     * @returns {Promise<Quizz[] | null>}
     */
    async getQuizz(jwtToken: string): Promise<Quizz[] | null> {
        try {
            const quizz = await this.makeRequest<Quizz[]>("/api/quizzs/all", { headers: { Authorization: `${jwtToken}` } });
            return quizz;
        } catch (error) {
            console.error("Error fetch quizzes", error);
            return null;
        }
    }

    /**
     * Description placeholder
     *
     * @async
     * @param {number} id
     * @param {string} jwtToken
     * @returns {Promise<Quizz | null>}
     */
    async get(id: number, jwtToken: string): Promise<Quizz | null> {
        try {
            const quizz = await this.makeRequest<Quizz>(`/api/quizz/${id}`, { headers: { Authorization: `${jwtToken}` } });
            return quizz;
        } catch (error) {
            console.error("Error fetch quizz", error);
            return null;
        }
    }

    /**
     * Uniquement les ROLE_ADMIN peuvent créer un quizz
     *
     * @async
     * @param {CreateQuizz} quizzCreate
     * @param {string} jwtToken
     * @returns {Promise<Quizz | null>}
     */
    async create(quizzCreate: CreateQuizz, jwtToken: string): Promise<Quizz | null> {
        try {
            const quizz = await this.makeRequest<Quizz>("/api/quizz", {
                body: JSON.stringify(quizzCreate),
                headers: { Authorization: `${jwtToken}` },
                method: "POST",
            });
            return quizz;
        } catch (error) {
            console.error("Error create quizz:", error);
            return null;
        }
    }
}

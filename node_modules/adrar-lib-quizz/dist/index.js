// src/Module.ts
var Module = class _Module {
  /**
   * Creates an instance of Module.
   *
   * @constructor
   * @param {API} api
   */
  constructor(api) {
    this.api = api;
    if (new.target === _Module) {
      throw new TypeError("Cannot construct Module instances directly");
    }
  }
  /**
   * Description placeholder
   *
   * @protected
   * @returns {string}
   */
  getApiUrl() {
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
  getModule(moduleName) {
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
  async makeRequest(url, options) {
    return this.api.makeRequest(url, options);
  }
};

// src/modules/auth.ts
var AuthModule = class extends Module {
  /**
   * Creates an instance of AuthModule.
   *
   * @constructor
   * @param {API} api
   */
  constructor(api) {
    super(api);
  }
  /** Description placeholder */
  init() {
    console.log("Auth module initialized");
  }
  /**
   * Description placeholder
   *
   * @async
   * @param {string} jwtToken
   * @returns {Promise<User[] | null>}
   */
  async getUsers(jwtToken) {
    try {
      const user = await this.makeRequest("/api/users", { headers: { Authorization: `${jwtToken}` } });
      return user;
    } catch (error) {
      console.error("Error fetch users", error);
      return null;
    }
  }
  async isLogged(jwtToken) {
    try {
      const user = await this.makeRequest("/api/me", { headers: { Authorization: `${jwtToken}` } });
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
  async me(jwtToken) {
    try {
      const user = await this.makeRequest("/api/me", { headers: { Authorization: `${jwtToken}` } });
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
  async login(userLogin) {
    try {
      const jwt = await this.makeRequest("/api/login_check", {
        body: JSON.stringify(userLogin),
        method: "POST"
      });
      if (!jwt.token) {
        return null;
      }
      return {
        token: `Bearer ${jwt.token}`
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
  async create(userCreate) {
    try {
      const user = await this.makeRequest("/api/user", { body: JSON.stringify(userCreate), method: "POST" });
      return user;
    } catch (error) {
      console.error("Error create user:", error);
      return null;
    }
  }
};

// src/modules/category.ts
var CategoryModule = class extends Module {
  /**
   * Creates an instance of CategoryModule.
   *
   * @constructor
   * @param {API} api
   */
  constructor(api) {
    super(api);
  }
  /** Description placeholder */
  init() {
    console.log("Category module initialized");
  }
  /**
   * Description placeholder
   *
   * @async
   * @param {string} jwtToken
   * @returns {Promise<Category[] | null>}
   */
  async getCategories(jwtToken) {
    try {
      const user = await this.makeRequest("/api/category/all", { headers: { Authorization: `${jwtToken}` } });
      return user;
    } catch (error) {
      console.error("Error fetch categories", error);
      return null;
    }
  }
  /**
   * Uniquement les ROLE_ADMIN peuvent créer une catégorie
   *
   * @async
   * @param {CreateCategory} categoryCreate
   * @param {string} jwtToken
   * @returns {Promise<Category | null>}
   */
  async create(categoryCreate, jwtToken) {
    try {
      const category = await this.makeRequest("/api/category", {
        body: JSON.stringify(categoryCreate),
        headers: { Authorization: `${jwtToken}` },
        method: "POST"
      });
      return category;
    } catch (error) {
      console.error("Error create category:", error);
      return null;
    }
  }
};

// src/modules/question.ts
var QuestionModule = class extends Module {
  /**
   * Creates an instance of QuestionModule.
   *
   * @constructor
   * @param {API} api
   */
  constructor(api) {
    super(api);
  }
  /** Description placeholder */
  init() {
    console.log("Question module initialized");
  }
  /**
   * Description placeholder
   *
   * @async
   * @param {string} jwtToken
   * @returns {Promise<Question[] | null>}
   */
  async getQuestions(jwtToken) {
    try {
      const questions = await this.makeRequest("/api/question/all", { headers: { Authorization: `${jwtToken}` } });
      return questions;
    } catch (error) {
      console.error("Error fetch questions", error);
      return null;
    }
  }
  /**
   * Description placeholder
   *
   * @async
   * @param {CreateQuestion} questionCreate
   * @param {string} jwtToken
   * @returns {Promise<Question | null>}
   */
  async create(questionCreate, jwtToken) {
    try {
      const question = await this.makeRequest("/api/question", {
        body: JSON.stringify(questionCreate),
        headers: { Authorization: `${jwtToken}` },
        method: "POST"
      });
      return question;
    } catch (error) {
      console.error("Error create question:", error);
      return null;
    }
  }
};

// src/modules/quizz.ts
var QuizzModule = class extends Module {
  /**
   * Creates an instance of QuizzModule.
   *
   * @constructor
   * @param {API} api
   */
  constructor(api) {
    super(api);
  }
  /** Description placeholder */
  init() {
    console.log("Quizz module initialized");
  }
  /**
   * Description placeholder
   *
   * @async
   * @param {string} jwtToken
   * @returns {Promise<Quizz[] | null>}
   */
  async getQuizz(jwtToken) {
    try {
      const quizz = await this.makeRequest("/api/quizzs/all", { headers: { Authorization: `${jwtToken}` } });
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
  async get(id, jwtToken) {
    try {
      const quizz = await this.makeRequest(`/api/quizz/${id}`, { headers: { Authorization: `${jwtToken}` } });
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
  async create(quizzCreate, jwtToken) {
    try {
      const quizz = await this.makeRequest("/api/quizz", {
        body: JSON.stringify(quizzCreate),
        headers: { Authorization: `${jwtToken}` },
        method: "POST"
      });
      return quizz;
    } catch (error) {
      console.error("Error create quizz:", error);
      return null;
    }
  }
};

// src/API.ts
var moduleClasses = {
  categoryModule: CategoryModule,
  authModule: AuthModule,
  questionModule: QuestionModule,
  quizzModule: QuizzModule
};
var API = class {
  /**
   * Creates an instance of API.
   *
   * @constructor
   * @param {string} apiUrl
   */
  constructor(apiUrl) {
    /**
     * Description placeholder
     *
     * @private
     * @type {Partial<ModuleMap>}
     */
    this.modules = {};
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
  async loadModules() {
    for (const [moduleName, ModuleClass] of Object.entries(moduleClasses)) {
      const module = new ModuleClass(this);
      module.init();
      this.modules[moduleName] = module;
    }
  }
  /**
   * Description placeholder
   *
   * @template {keyof ModuleMap} T
   * @param {T} moduleName
   * @returns {ModuleMap[T]}
   */
  getModule(moduleName) {
    const module = this.modules[moduleName];
    if (module) {
      return module;
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
  async makeRequest(url, options) {
    try {
      const response = await fetch(this.apiUrl + url, {
        headers: { "Content-Type": "application/json" },
        ...options
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
};
var API_default = API;

// src/index.ts
var index_default = API_default;
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
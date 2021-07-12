(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Source = void 0;
class Source {
    constructor(cheerio) {
        // <-----------        OPTIONAL METHODS        -----------> //
        /**
         * Manages the ratelimits and the number of requests that can be done per second
         * This is also used to fetch pages when a chapter is downloading
         */
        this.requestManager = createRequestManager({
            requestsPerSecond: 2.5,
            requestTimeout: 5000
        });
        this.cheerio = cheerio;
    }
    /**
     * (OPTIONAL METHOD) This function is called when ANY request is made by the Paperback Application out to the internet.
     * By modifying the parameter and returning it, the user can inject any additional headers, cookies, or anything else
     * a source may need to load correctly.
     * The most common use of this function is to add headers to image requests, since you cannot directly access these requests through
     * the source implementation itself.
     *
     * NOTE: This does **NOT** influence any requests defined in the source implementation. This function will only influence requests
     * which happen behind the scenes and are not defined in your source.
     */
    globalRequestHeaders() { return {}; }
    globalRequestCookies() { return []; }
    /**
     * A stateful source may require user input.
     * By supplying this value to the Source, the app will render your form to the user
     * in the application settings.
     */
    getAppStatefulForm() { return createUserForm({ formElements: [] }); }
    /**
     * When the Advanced Search is rendered to the user, this skeleton defines what
     * fields which will show up to the user, and returned back to the source
     * when the request is made.
     */
    getAdvancedSearchForm() { return createUserForm({ formElements: [] }); }
    /**
     * (OPTIONAL METHOD) Given a manga ID, return a URL which Safari can open in a browser to display.
     * @param mangaId
     */
    getMangaShareUrl(mangaId) { return null; }
    /**
     * If a source is secured by Cloudflare, this method should be filled out.
     * By returning a request to the website, this source will attempt to create a session
     * so that the source can load correctly.
     * Usually the {@link Request} url can simply be the base URL to the source.
     */
    getCloudflareBypassRequest() { return null; }
    /**
     * (OPTIONAL METHOD) A function which communicates with a given source, and returns a list of all possible tags which the source supports.
     * These tags are generic and depend on the source. They could be genres such as 'Isekai, Action, Drama', or they can be
     * listings such as 'Completed, Ongoing'
     * These tags must be tags which can be used in the {@link searchRequest} function to augment the searching capability of the application
     */
    getTags() { return Promise.resolve(null); }
    /**
     * (OPTIONAL METHOD) A function which should scan through the latest updates section of a website, and report back with a list of IDs which have been
     * updated BEFORE the supplied timeframe.
     * This function may have to scan through multiple pages in order to discover the full list of updated manga.
     * Because of this, each batch of IDs should be returned with the mangaUpdatesFoundCallback. The IDs which have been reported for
     * one page, should not be reported again on another page, unless the relevent ID has been detected again. You do not want to persist
     * this internal list between {@link Request} calls
     * @param mangaUpdatesFoundCallback A callback which is used to report a list of manga IDs back to the API
     * @param time This function should find all manga which has been updated between the current time, and this parameter's reported time.
     *             After this time has been passed, the system should stop parsing and return
     */
    filterUpdatedManga(mangaUpdatesFoundCallback, time, ids) { return Promise.resolve(); }
    /**
     * (OPTIONAL METHOD) A function which should readonly allf the available homepage sections for a given source, and return a {@link HomeSection} object.
     * The sectionCallback is to be used for each given section on the website. This may include a 'Latest Updates' section, or a 'Hot Manga' section.
     * It is recommended that before anything else in your source, you first use this sectionCallback and send it {@link HomeSection} objects
     * which are blank, and have not had any requests done on them just yet. This way, you provide the App with the sections to render on screen,
     * which then will be populated with each additional sectionCallback method called. This is optional, but recommended.
     * @param sectionCallback A callback which is run for each independant HomeSection.
     */
    getHomePageSections(sectionCallback) { return Promise.resolve(); }
    /**
     * (OPTIONAL METHOD) This function will take a given homepageSectionId and metadata value, and with this information, should return
     * all of the manga tiles supplied for the given state of parameters. Most commonly, the metadata value will contain some sort of page information,
     * and this request will target the given page. (Incrementing the page in the response so that the next call will return relevent data)
     * @param homepageSectionId The given ID to the homepage defined in {@link getHomePageSections} which this method is to readonly moreata about
     * @param metadata This is a metadata parameter which is filled our in the {@link getHomePageSections}'s return
     * function. Afterwards, if the metadata value returned in the {@link PagedResults} has been modified, the modified version
     * will be supplied to this function instead of the origional {@link getHomePageSections}'s version.
     * This is useful for keeping track of which page a user is on, pagnating to other pages as ViewMore is called multiple times.
     */
    getViewMoreItems(homepageSectionId, metadata) { return Promise.resolve(null); }
    /**
     * (OPTIONAL METHOD) This function is to return the entire library of a manga website, page by page.
     * If there is an additional page which needs to be called, the {@link PagedResults} value should have it's metadata filled out
     * with information needed to continue pulling information from this website.
     * Note that if the metadata value of {@link PagedResults} is undefined, this method will not continue to run when the user
     * attempts to readonly morenformation
     * @param metadata Identifying information as to what the source needs to call in order to readonly theext batch of data
     * of the directory. Usually this is a page counter.
     */
    getWebsiteMangaDirectory(metadata) { return Promise.resolve(null); }
    // <-----------        PROTECTED METHODS        -----------> //
    // Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
    convertTime(timeAgo) {
        var _a;
        let time;
        let trimmed = Number(((_a = /\d*/.exec(timeAgo)) !== null && _a !== void 0 ? _a : [])[0]);
        trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
        if (timeAgo.includes('minutes')) {
            time = new Date(Date.now() - trimmed * 60000);
        }
        else if (timeAgo.includes('hours')) {
            time = new Date(Date.now() - trimmed * 3600000);
        }
        else if (timeAgo.includes('days')) {
            time = new Date(Date.now() - trimmed * 86400000);
        }
        else if (timeAgo.includes('year') || timeAgo.includes('years')) {
            time = new Date(Date.now() - trimmed * 31556952000);
        }
        else {
            time = new Date(Date.now());
        }
        return time;
    }
    /**
     * When a function requires a POST body, it always should be defined as a JsonObject
     * and then passed through this function to ensure that it's encoded properly.
     * @param obj
     */
    urlEncodeObject(obj) {
        let ret = {};
        for (const entry of Object.entries(obj)) {
            ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
        }
        return ret;
    }
}
exports.Source = Source;

},{}],3:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);

},{"./Source":2}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./base"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./APIWrapper"), exports);

},{"./APIWrapper":1,"./base":3,"./models":25}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],6:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],7:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],8:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCode = void 0;
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["UNKNOWN"] = "_unknown";
    LanguageCode["BENGALI"] = "bd";
    LanguageCode["BULGARIAN"] = "bg";
    LanguageCode["BRAZILIAN"] = "br";
    LanguageCode["CHINEESE"] = "cn";
    LanguageCode["CZECH"] = "cz";
    LanguageCode["GERMAN"] = "de";
    LanguageCode["DANISH"] = "dk";
    LanguageCode["ENGLISH"] = "gb";
    LanguageCode["SPANISH"] = "es";
    LanguageCode["FINNISH"] = "fi";
    LanguageCode["FRENCH"] = "fr";
    LanguageCode["WELSH"] = "gb";
    LanguageCode["GREEK"] = "gr";
    LanguageCode["CHINEESE_HONGKONG"] = "hk";
    LanguageCode["HUNGARIAN"] = "hu";
    LanguageCode["INDONESIAN"] = "id";
    LanguageCode["ISRELI"] = "il";
    LanguageCode["INDIAN"] = "in";
    LanguageCode["IRAN"] = "ir";
    LanguageCode["ITALIAN"] = "it";
    LanguageCode["JAPANESE"] = "jp";
    LanguageCode["KOREAN"] = "kr";
    LanguageCode["LITHUANIAN"] = "lt";
    LanguageCode["MONGOLIAN"] = "mn";
    LanguageCode["MEXIAN"] = "mx";
    LanguageCode["MALAY"] = "my";
    LanguageCode["DUTCH"] = "nl";
    LanguageCode["NORWEGIAN"] = "no";
    LanguageCode["PHILIPPINE"] = "ph";
    LanguageCode["POLISH"] = "pl";
    LanguageCode["PORTUGUESE"] = "pt";
    LanguageCode["ROMANIAN"] = "ro";
    LanguageCode["RUSSIAN"] = "ru";
    LanguageCode["SANSKRIT"] = "sa";
    LanguageCode["SAMI"] = "si";
    LanguageCode["THAI"] = "th";
    LanguageCode["TURKISH"] = "tr";
    LanguageCode["UKRAINIAN"] = "ua";
    LanguageCode["VIETNAMESE"] = "vn";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["ONGOING"] = 1] = "ONGOING";
    MangaStatus[MangaStatus["COMPLETED"] = 0] = "COMPLETED";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));

},{}],11:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],12:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],13:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],14:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],15:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],16:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],17:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],18:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],19:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],20:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = void 0;
/**
 * An enumerator which {@link SourceTags} uses to define the color of the tag rendered on the website.
 * Five types are available: blue, green, grey, yellow and red, the default one is blue.
 * Common colors are red for (Broken), yellow for (+18), grey for (Country-Proof)
 */
var TagType;
(function (TagType) {
    TagType["BLUE"] = "default";
    TagType["GREEN"] = "success";
    TagType["GREY"] = "info";
    TagType["YELLOW"] = "warning";
    TagType["RED"] = "danger";
})(TagType = exports.TagType || (exports.TagType = {}));

},{}],22:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],23:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],24:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],25:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Chapter"), exports);
__exportStar(require("./ChapterDetails"), exports);
__exportStar(require("./HomeSection"), exports);
__exportStar(require("./Manga"), exports);
__exportStar(require("./MangaTile"), exports);
__exportStar(require("./RequestObject"), exports);
__exportStar(require("./SearchRequest"), exports);
__exportStar(require("./TagSection"), exports);
__exportStar(require("./SourceTag"), exports);
__exportStar(require("./Languages"), exports);
__exportStar(require("./Constants"), exports);
__exportStar(require("./MangaUpdate"), exports);
__exportStar(require("./PagedResults"), exports);
__exportStar(require("./ResponseObject"), exports);
__exportStar(require("./RequestManager"), exports);
__exportStar(require("./RequestHeaders"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./TrackObject"), exports);
__exportStar(require("./OAuth"), exports);
__exportStar(require("./UserForm"), exports);

},{"./Chapter":5,"./ChapterDetails":6,"./Constants":7,"./HomeSection":8,"./Languages":9,"./Manga":10,"./MangaTile":11,"./MangaUpdate":12,"./OAuth":13,"./PagedResults":14,"./RequestHeaders":15,"./RequestManager":16,"./RequestObject":17,"./ResponseObject":18,"./SearchRequest":19,"./SourceInfo":20,"./SourceTag":21,"./TagSection":22,"./TrackObject":23,"./UserForm":24}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chapGroup = exports.chapVol = exports.chapName = exports.chapNum = exports.chapId = exports.unixToDate = void 0;
// Common Functions
exports.unixToDate = (unix) => {
    const date = parseInt(unix);
    if (isNaN(date))
        return undefined;
    return new Date(date * 1000);
};
// Chapter functions
exports.chapId = (key, groupKey, folder, mangaId) => {
    if (!key || key === undefined)
        throw new Error(`Chapter key in id: ${mangaId} is undefined.`);
    if (!groupKey || groupKey === undefined)
        throw new Error(`Group key in id: ${mangaId} is undefined.`);
    if (!folder || folder === undefined)
        throw new Error(`Folder in id: ${mangaId} is undefined.`);
    return `${key}|${groupKey}|${folder}`;
};
exports.chapNum = (num, mangaId, chapId) => {
    if (!num || num === undefined)
        throw new Error(`Chapter number in id: ${mangaId}@ ${chapId} is undefined.`);
    const parsed = parseInt(num);
    if (isNaN(parsed))
        throw new Error(`Chapter number in id: ${mangaId}@ ${chapId} is malformed.`);
    return parsed;
};
exports.chapName = (name) => {
    if (!name)
        return undefined;
};
exports.chapVol = (vol, mangaId, chapId) => {
    if (!vol)
        return undefined;
    const parsed = parseInt(vol);
    if (isNaN(parsed))
        throw new Error(`Volume number in: ${mangaId}@ ${chapId} is malformed.`);
    return parsed;
};
exports.chapGroup = (group) => {
    if (!group)
        return undefined;
    return group;
};

},{}],27:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hachirumi = exports.HachirumiInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const Functions_1 = require("./Functions");
const HACHIRUMI_DOMAIN = "https://hachirumi.com";
const HACHIRUMI_API = `${HACHIRUMI_DOMAIN}/api`;
const HACHIRUMI_IMAGES = (slug, folder, group, ext) => `https://hachirumi.com/media/manga/${slug}/chapters/${folder}/${group}/${ext}`;
exports.HachirumiInfo = {
    version: "1.0.0",
    name: "Hachirumi",
    icon: "icon.png",
    author: "Curstantine",
    authorWebsite: "https://github.com/Curstantine",
    description: "Extension that pulls manga from Hachirumi.",
    language: paperback_extensions_common_1.LanguageCode.ENGLISH,
    hentaiSource: false,
    websiteBaseURL: HACHIRUMI_DOMAIN,
};
class Hachirumi extends paperback_extensions_common_1.Source {
    /*
    Though "mangaId" is mentioned here Hachirumi uses slugs.
    eg: the-story-about-living
    */
    getMangaDetails(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const methodName = this.getMangaDetails.name;
            const request = createRequestObject({
                url: HACHIRUMI_API + "/series/" + mangaId,
                method: "GET",
                headers: {
                    "accept-encoding": "application/json",
                },
            });
            const response = yield this.requestManager.schedule(request, 1);
            if (response.status > 400) {
                throw new Error(`Failed to fetch data on ${methodName} with status code: ` +
                    response.status);
            }
            const result = typeof response.data === "string" || typeof response.data !== "object"
                ? JSON.parse(response.data)
                : response.data;
            if (!result || result === undefined)
                throw new Error(`Failed to parse the response on ${methodName}.`);
            return createManga({
                id: result.slug,
                titles: [result.title],
                image: HACHIRUMI_DOMAIN + result.cover,
                rating: 0,
                status: paperback_extensions_common_1.MangaStatus.ONGOING,
                artist: result.artist,
                author: result.author,
                desc: "Hachirumi doesn't support descriptions!",
            });
        });
    }
    /*
    Follows the same format as `getMangaDetails`.
    Hachirumi serves both chapters and manga in single request.
    */
    getChapters(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const methodName = this.getChapters.name;
            const request = createRequestObject({
                url: HACHIRUMI_API + "/series/" + mangaId,
                method: "GET",
                headers: {
                    "accept-encoding": "application/json",
                },
            });
            const response = yield this.requestManager.schedule(request, 1);
            if (response.status > 400) {
                throw new Error(`Failed to fetch data on ${methodName} with status code: ` +
                    response.status);
            }
            const result = typeof response.data === "string" || typeof response.data !== "object"
                ? JSON.parse(response.data)
                : response.data;
            if (!result || result === undefined)
                throw new Error(`Failed to parse the response on ${methodName}.`);
            const chapterObject = result.chapters;
            const groupObject = result.groups;
            if (!chapterObject || !groupObject)
                throw new Error(`Failed to read chapter/group data on ${methodName}.`);
            let chapters = [];
            for (const key in chapterObject) {
                const metadata = chapterObject[key];
                if (!metadata || metadata === undefined)
                    throw new Error(`Failed to read metadata on ${methodName}.`);
                for (const groupKey in metadata.groups) {
                    const id = Functions_1.chapId(key, groupKey, metadata.folder, result.slug);
                    chapters.push(createChapter({
                        id: id,
                        mangaId: result.slug,
                        chapNum: Functions_1.chapNum(key, result.slug, id),
                        langCode: paperback_extensions_common_1.LanguageCode.ENGLISH,
                        name: Functions_1.chapName(metadata.title),
                        volume: Functions_1.chapVol(metadata.volume, result.slug, id),
                        group: Functions_1.chapGroup(groupObject[groupKey]),
                        time: Functions_1.unixToDate(metadata.release_date[groupKey]),
                    }));
                }
            }
            return chapters;
        });
    }
    /*
     * Follows the chapterId format used  in `getChapter` method.
     * `chapterKey|groupKey|folderId`
     */
    getChapterDetails(mangaId, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const methodName = this.getChapterDetails.name;
            const request = createRequestObject({
                url: HACHIRUMI_API + "/series/" + mangaId,
                method: "GET",
                headers: {
                    "accept-encoding": "application/json",
                },
            });
            const response = yield this.requestManager.schedule(request, 1);
            if (response.status > 400) {
                throw new Error(`Failed to fetch data on ${methodName} with status code: ` +
                    response.status);
            }
            const result = typeof response.data === "string" || typeof response.data !== "object"
                ? JSON.parse(response.data)
                : response.data;
            if (!result || result === undefined)
                throw new Error(`Failed to parse the response on ${methodName}.`);
            const [chapterKey, groupKey, folder] = chapterId.split("|"); // Splits the given generic chapter id to chapterkey and such.
            if (!chapterKey || !groupKey || !folder)
                throw new Error(`ChapterId is malformed on ${methodName}.`);
            const chapterObject = result.chapters;
            if (!chapterObject || chapterObject === undefined)
                throw new Error(`Failed to read chapter data on ${methodName}.`);
            const groupObject = chapterObject[chapterKey].groups[groupKey];
            if (!groupObject || groupObject === undefined)
                throw new Error(`Failed to read chapter metadata on ${methodName}.`);
            return createChapterDetails({
                id: chapterId,
                longStrip: false,
                mangaId: mangaId,
                pages: groupObject.map((ext) => HACHIRUMI_IMAGES(mangaId, folder, groupKey, ext)),
            });
        });
    }
    /*
    This method doesn't query anything, instead finds a specific title from `get_all_series` endpoint
     */
    searchRequest(query, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const methodName = this.searchRequest.name;
            if (metadata === null || metadata === void 0 ? void 0 : metadata.limitReached)
                return createPagedResults({
                    results: [],
                    metadata: { limitReached: true },
                }); // Prevents title duplication.
            const request = createRequestObject({
                url: HACHIRUMI_API + "/get_all_series",
                method: "GET",
                headers: {
                    "accept-encoding": "application/json",
                },
            });
            const response = yield this.requestManager.schedule(request, 1);
            if (response.status > 400) {
                throw new Error(`Failed to fetch data on ${methodName} with status code: ` +
                    response.status);
            }
            const result = typeof response.data === "string" || typeof response.data !== "object"
                ? JSON.parse(response.data)
                : response.data;
            if (!result || result === undefined)
                throw new Error(`Failed to parse the response on ${methodName}.`);
            const queryTitle = query.title ? query.title.toLowerCase() : "";
            const filterer = (titles) => Object.keys(titles).filter((title) => title.replace("-", " ").toLowerCase().includes(queryTitle));
            const filteredRequest = filterer(result).map((title) => {
                const metadata = result[title];
                if (!metadata || metadata === undefined)
                    throw new Error(`Failed to read chapter metadata on ${methodName}.`);
                return createMangaTile({
                    id: metadata.slug,
                    image: HACHIRUMI_DOMAIN + metadata.cover,
                    title: createIconText({ text: title }),
                });
            });
            return createPagedResults({
                results: filteredRequest,
                metadata: {
                    limitReached: true,
                },
            });
        });
    }
    // Makes my life easier. <(￣︶￣)>
    getAllTitles() {
        return __awaiter(this, void 0, void 0, function* () {
            const methodName = this.getAllTitles.name;
            const request = createRequestObject({
                url: HACHIRUMI_API + "/get_all_series",
                method: "GET",
                headers: {
                    "accept-encoding": "application/json",
                },
            });
            const response = yield this.requestManager.schedule(request, 1);
            if (!response || response === undefined)
                throw new Error(`Failed to fetch data from the server on ${methodName}.`);
            const result = typeof response.data === "string" || typeof response.data !== "object"
                ? JSON.parse(response.data)
                : response.data;
            if (!result || result === undefined)
                throw new Error(`Failed to parse the response on ${methodName}.`);
            return Object.keys(result).map((title) => {
                const metadata = result[title];
                if (!metadata || metadata === undefined)
                    throw new Error(`Failed to read chapter metadata on ${methodName}.`);
                return {
                    mangaId: metadata.slug,
                    title: title,
                    author: metadata.author,
                    artist: metadata.artist,
                    desc: metadata.description,
                    cover: metadata.cover,
                    group: Object.keys(metadata.groups).map((key) => metadata.groups[key]),
                    last: metadata.last_updated,
                };
            });
        });
    }
    getHomePageSections(sectionCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            let latestSection = createHomeSection({
                id: "latest",
                title: "Latest Updates",
                view_more: false,
            });
            let allSection = createHomeSection({
                id: "all",
                title: "All Titles",
                view_more: true,
            });
            sectionCallback(latestSection);
            sectionCallback(allSection);
            const allTitles = yield this.getAllTitles();
            allSection.items = allTitles.map((title) => createMangaTile({
                id: title.mangaId,
                image: HACHIRUMI_DOMAIN + title.cover,
                title: createIconText({ text: title.title }),
            }));
            sectionCallback(allSection);
            const sortedTitles = allTitles.sort((a, b) => b.last - a.last);
            while (sortedTitles.length > 9)
                sortedTitles.pop();
            while (allTitles.length > 9)
                allTitles.pop();
            latestSection.items = sortedTitles.map((title) => createMangaTile({
                id: title.mangaId,
                image: HACHIRUMI_DOMAIN + title.cover,
                title: createIconText({ text: title.title }),
            }));
            sectionCallback(latestSection);
        });
    }
    getViewMoreItems(homepageSectionId, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            if (metadata === null || metadata === void 0 ? void 0 : metadata.limitReached)
                return createPagedResults({
                    results: [],
                    metadata: { limitReached: true },
                }); // Prevents title duplication.
            const allTitles = yield this.getAllTitles();
            return createPagedResults({
                results: allTitles.map((title) => createMangaTile({
                    id: title.mangaId,
                    image: HACHIRUMI_DOMAIN + title.cover,
                    title: createIconText({ text: title.title }),
                })),
                metadata: {
                    limitReached: true,
                },
            });
        });
    }
    getMangaShareUrl(mangaId) {
        return `${HACHIRUMI_DOMAIN}/read/manga/${mangaId}/`;
    }
    getCloudflareBypassRequest() {
        return createRequestObject({
            url: HACHIRUMI_DOMAIN,
            method: "GET",
        });
    }
}
exports.Hachirumi = Hachirumi;

},{"./Functions":26,"paperback-extensions-common":4}]},{},[27])(27)
});

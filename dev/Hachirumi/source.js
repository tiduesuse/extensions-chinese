(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    async getTags() {
        // @ts-ignore
        return this.getSearchTags?.();
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    let time;
    let trimmed = Number((/\d*/.exec(timeAgo) ?? [])[0]);
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
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
}
exports.Tracker = Tracker;

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
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./Tracker"), exports);

},{"./Source":1,"./Tracker":2}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./base"), exports);
__exportStar(require("./models"), exports);

},{"./base":3,"./models":46}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],6:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],7:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],8:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],9:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],10:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],11:[function(require,module,exports){
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
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],22:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],23:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Button"), exports);
__exportStar(require("./Form"), exports);
__exportStar(require("./Header"), exports);
__exportStar(require("./InputField"), exports);
__exportStar(require("./Label"), exports);
__exportStar(require("./Link"), exports);
__exportStar(require("./MultilineLabel"), exports);
__exportStar(require("./NavigationButton"), exports);
__exportStar(require("./OAuthButton"), exports);
__exportStar(require("./Section"), exports);
__exportStar(require("./Select"), exports);
__exportStar(require("./Switch"), exports);
__exportStar(require("./WebViewButton"), exports);
__exportStar(require("./FormRow"), exports);
__exportStar(require("./Stepper"), exports);

},{"./Button":8,"./Form":9,"./FormRow":10,"./Header":11,"./InputField":12,"./Label":13,"./Link":14,"./MultilineLabel":15,"./NavigationButton":16,"./OAuthButton":17,"./Section":18,"./Select":19,"./Stepper":20,"./Switch":21,"./WebViewButton":22}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["ONGOING"] = 1] = "ONGOING";
    MangaStatus[MangaStatus["COMPLETED"] = 0] = "COMPLETED";
    MangaStatus[MangaStatus["UNKNOWN"] = 2] = "UNKNOWN";
    MangaStatus[MangaStatus["ABANDONED"] = 3] = "ABANDONED";
    MangaStatus[MangaStatus["HIATUS"] = 4] = "HIATUS";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));

},{}],27:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],28:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],29:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],30:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],31:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],32:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],33:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],34:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],35:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],36:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOperator = void 0;
var SearchOperator;
(function (SearchOperator) {
    SearchOperator["AND"] = "AND";
    SearchOperator["OR"] = "OR";
})(SearchOperator = exports.SearchOperator || (exports.SearchOperator = {}));

},{}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = void 0;
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],39:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],40:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],43:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],44:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],45:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],46:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Chapter"), exports);
__exportStar(require("./HomeSection"), exports);
__exportStar(require("./DynamicUI"), exports);
__exportStar(require("./ChapterDetails"), exports);
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
__exportStar(require("./SourceStateManager"), exports);
__exportStar(require("./RequestInterceptor"), exports);
__exportStar(require("./TrackedManga"), exports);
__exportStar(require("./SourceManga"), exports);
__exportStar(require("./TrackedMangaChapterReadAction"), exports);
__exportStar(require("./TrackerActionQueue"), exports);
__exportStar(require("./SearchField"), exports);
__exportStar(require("./RawData"), exports);

},{"./Chapter":5,"./ChapterDetails":6,"./Constants":7,"./DynamicUI":23,"./HomeSection":24,"./Languages":25,"./Manga":26,"./MangaTile":27,"./MangaUpdate":28,"./PagedResults":29,"./RawData":30,"./RequestHeaders":31,"./RequestInterceptor":32,"./RequestManager":33,"./RequestObject":34,"./ResponseObject":35,"./SearchField":36,"./SearchRequest":37,"./SourceInfo":38,"./SourceManga":39,"./SourceStateManager":40,"./SourceTag":41,"./TagSection":42,"./TrackedManga":43,"./TrackedMangaChapterReadAction":44,"./TrackerActionQueue":45}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
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

},{"./Functions":47,"paperback-extensions-common":4}]},{},[48])(48)
});

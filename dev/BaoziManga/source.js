(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
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
    getTags() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return (_a = this.getSearchTags) === null || _a === void 0 ? void 0 : _a.call(this);
        });
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
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

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
}
exports.Tracker = Tracker;

},{}],4:[function(require,module,exports){
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
__exportStar(require("./Tracker"), exports);

},{"./Source":2,"./Tracker":3}],5:[function(require,module,exports){
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

},{"./APIWrapper":1,"./base":4,"./models":47}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],7:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],8:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],9:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],10:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],11:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],12:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],13:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],14:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],15:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],16:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],17:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],18:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],19:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],20:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],21:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],22:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],23:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],24:[function(require,module,exports){
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

},{"./Button":9,"./Form":10,"./FormRow":11,"./Header":12,"./InputField":13,"./Label":14,"./Link":15,"./MultilineLabel":16,"./NavigationButton":17,"./OAuthButton":18,"./Section":19,"./Select":20,"./Stepper":21,"./Switch":22,"./WebViewButton":23}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],29:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],30:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],31:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],32:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],33:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],34:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],35:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],36:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],37:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOperator = void 0;
var SearchOperator;
(function (SearchOperator) {
    SearchOperator["AND"] = "AND";
    SearchOperator["OR"] = "OR";
})(SearchOperator = exports.SearchOperator || (exports.SearchOperator = {}));

},{}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],41:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],44:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],45:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],46:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],47:[function(require,module,exports){
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
__exportStar(require("./SourceStateManager"), exports);
__exportStar(require("./RequestInterceptor"), exports);
__exportStar(require("./DynamicUI"), exports);
__exportStar(require("./TrackedManga"), exports);
__exportStar(require("./SourceManga"), exports);
__exportStar(require("./TrackedMangaChapterReadAction"), exports);
__exportStar(require("./TrackerActionQueue"), exports);
__exportStar(require("./SearchField"), exports);
__exportStar(require("./RawData"), exports);

},{"./Chapter":6,"./ChapterDetails":7,"./Constants":8,"./DynamicUI":24,"./HomeSection":25,"./Languages":26,"./Manga":27,"./MangaTile":28,"./MangaUpdate":29,"./PagedResults":30,"./RawData":31,"./RequestHeaders":32,"./RequestInterceptor":33,"./RequestManager":34,"./RequestObject":35,"./ResponseObject":36,"./SearchField":37,"./SearchRequest":38,"./SourceInfo":39,"./SourceManga":40,"./SourceStateManager":41,"./SourceTag":42,"./TagSection":43,"./TrackedManga":44,"./TrackedMangaChapterReadAction":45,"./TrackerActionQueue":46}],48:[function(require,module,exports){
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
exports.BaoziManga = exports.BaoziMangaInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const BaoziMangaParser_1 = require("./BaoziMangaParser");
// const MG_DOMAIN = 'https://www.webmota.com'
const MG_DOMAIN = 'https://www.baozimh.com';
const MG_NAME = 'BaoziManga';
const method = 'GET';
const mid_addr = 'comic';
const headers = {
    'Host': 'www.baozimh.com'
};
const headers1 = {
    'Host': 'www.webmota.com'
};
exports.BaoziMangaInfo = {
    version: '1.0.1',
    name: MG_NAME,
    icon: 'icon.jpg',
    author: 'Tomas Way',
    authorWebsite: 'https://github.com/Tiduesuse',
    description: 'Extension that pulls manga from ' + MG_NAME + ' (Chinese)',
    contentRating: paperback_extensions_common_1.ContentRating.MATURE,
    websiteBaseURL: MG_DOMAIN,
    sourceTags: [
        {
            text: "Chinese",
            type: paperback_extensions_common_1.TagType.GREY
        },
        {
            text: "Notifications",
            type: paperback_extensions_common_1.TagType.GREEN
        }
    ]
};
class BaoziManga extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.requestManager = createRequestManager({
            requestsPerSecond: 3
        });
    }
    // manga shared url
    getMangaShareUrl(mangaId) {
        return `${MG_DOMAIN}/${mid_addr}/${mangaId}`;
    }
    // manga details
    getMangaDetails(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = createRequestObject({
                url: `${MG_DOMAIN}/${mid_addr}/${mangaId}`,
                method,
                headers
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            return BaoziMangaParser_1.parseMangaDetails($, mangaId);
        });
    }
    getChapters(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = createRequestObject({
                url: `${MG_DOMAIN}/${mid_addr}/${mangaId}`,
                method,
                headers
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            return BaoziMangaParser_1.parseChapters($, mangaId);
        });
    }
    getChapterDetails(mangaId, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = createRequestObject({
                url: `${chapterId}`,
                method,
                headers: headers1
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            return BaoziMangaParser_1.parseChapterDetails($, mangaId, chapterId);
        });
    }
    getSearchResults(query, metadata) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            // if (!metadata.manga) {
            const page = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.page) !== null && _a !== void 0 ? _a : 1;
            const ori = (_c = (_b = query.title) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : "";
            const search = (_d = ori.replace(/ /g, '+').replace(/[’'´]/g, '%27')) !== null && _d !== void 0 ? _d : "";
            let addr = '';
            if (search.length > 0) {
                addr = `${MG_DOMAIN}/search?q=${search}`;
            }
            else if (query.includedTags && ((_e = query.includedTags) === null || _e === void 0 ? void 0 : _e.length) != 0) {
                const tagStr = BaoziMangaParser_1.parseMultiTags(query.includedTags);
                addr = `${MG_DOMAIN}/classify?${tagStr}`;
            }
            else {
                addr = `${MG_DOMAIN}/classify`;
            }
            let addr1 = `${addr}&page=${page}`;
            addr1 = encodeURI(addr1);
            const request = createRequestObject({
                url: addr1,
                method,
                headers
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            // metadata = {
            //   manga: parseSearch($),
            //   offset: 0
            // }
            // }
            return createPagedResults({
                results: BaoziMangaParser_1.parseSearch($),
                metadata: { page: page + 1 }
                // metadata: {
                //   manga: metadata.manga,
                //   offset: metadata.offset + 100
                // }
            });
        });
    }
    getHomePageSections(sectionCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            const section1 = createHomeSection({ id: '熱門漫畫', title: '熱門漫畫', type: paperback_extensions_common_1.HomeSectionType.featured, view_more: true });
            const section2 = createHomeSection({ id: '推薦漫畫', title: '推薦漫畫', view_more: true });
            const section3 = createHomeSection({ id: '韓漫漫畫', title: '韓漫漫畫', view_more: true });
            const section4 = createHomeSection({ id: '大女主漫畫', title: '大女主漫畫', view_more: true });
            const section5 = createHomeSection({ id: '少年漫畫', title: '少年漫畫', view_more: true });
            const section6 = createHomeSection({ id: '戀愛漫畫', title: '戀愛漫畫', view_more: true });
            const section7 = createHomeSection({ id: '玄幻漫畫', title: '玄幻漫畫', view_more: true });
            const section8 = createHomeSection({ id: '最新上架', title: '最新上架', view_more: true });
            const section9 = createHomeSection({ id: '最近更新', title: '最近更新', view_more: true });
            const sections = [
                section1,
                section2,
                section3,
                section4,
                section5,
                section6,
                section7,
                section8,
                section9
            ];
            const request = createRequestObject({ url: `${MG_DOMAIN}`, method });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            BaoziMangaParser_1.parseHomeSections($, sections, sectionCallback);
        });
    }
    getSearchTags() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = createRequestObject({
                url: `${MG_DOMAIN}/classify`,
                method,
                headers
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            return BaoziMangaParser_1.parseTags($);
        });
    }
    getViewMoreItems(homepageSectionId, metadata) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const request0 = createRequestObject({
                url: `${MG_DOMAIN}`,
                method,
                headers
            });
            const response0 = yield this.requestManager.schedule(request0, 1);
            const $0 = this.cheerio.load(response0.data);
            const env = $0('.index-recommend-items:contains(' + homepageSectionId + ')');
            const addr = (_a = MG_DOMAIN + $0('.more', env).attr('href')) !== null && _a !== void 0 ? _a : '';
            let manga = [];
            if (addr.length > 0) {
                const request = createRequestObject({
                    url: MG_DOMAIN + $0('.more', env).attr('href'),
                    method,
                    headers
                });
                const response = yield this.requestManager.schedule(request, 1);
                const $ = this.cheerio.load(response.data);
                manga = BaoziMangaParser_1.parseSearch($);
            }
            else {
                for (const item of $0('.comics-card', env).toArray()) {
                    manga.push(BaoziMangaParser_1.parseMangaItem($0, item));
                }
            }
            return createPagedResults({
                results: manga,
                metadata
            });
        });
    }
}
exports.BaoziManga = BaoziManga;

},{"./BaoziMangaParser":49,"paperback-extensions-common":5}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMultiTags = exports.parseTags = exports.tagDict = exports.parseHomeSections = exports.parseMangaItem = exports.parseSearch = exports.parseChapterDetails = exports.parseChapters = exports.parseMangaDetails = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const MG_DOMAIN = 'https://www.baozimh.com';
const MG_DOMAIN1 = 'https://www.webmota.com';
exports.parseMangaDetails = ($, mangaId) => {
    var _a;
    const titles = [$('.comics-detail__title').text()];
    const author = $('.comics-detail__author').text();
    const image = (_a = $('amp-img', '.pure-u-1-1').attr('src')) !== null && _a !== void 0 ? _a : "";
    const genres = $('span.tag', '.tag-list').map(function () {
        return $(this).text().trim();
    }).get().filter((x) => x != '');
    let status = paperback_extensions_common_1.MangaStatus.UNKNOWN;
    if ((genres[0] == "连载中") || (genres[0] == "连载中")) {
        status = paperback_extensions_common_1.MangaStatus.ONGOING;
    }
    else if ((genres[0] == '已完结') || (genres[0] == '已完结')) {
        status = paperback_extensions_common_1.MangaStatus.COMPLETED;
    }
    const desc = $('.comics-detail__desc').text();
    const arrayTags = [];
    if (genres.length > 0) {
        for (const tag of genres) {
            const label = tag;
            const id = exports.tagDict[tag][0];
            arrayTags.push({ id: id, label: label });
        }
    }
    const tagSections = [createTagSection({
            id: '0',
            label: 'genres',
            tags: arrayTags.length > 0 ? arrayTags.map(x => createTag(x)) : []
        })];
    return createManga({
        id: mangaId,
        titles,
        image,
        rating: Number(''),
        status,
        artist: '',
        author,
        tags: tagSections,
        views: Number(''),
        desc,
        hentai: false
    });
};
exports.parseChapters = ($, mangaId) => {
    var _a;
    const allChapters = $('.comics-chapters');
    const chapters = [];
    const date = $('em', ':contains(日 更新)').text().trim();
    const re = /[年月日() 更新]/;
    const datepts = date.split(re).filter((x) => x.trim() != '').join('/');
    const time = new Date(datepts);
    for (let chapter of $(allChapters).toArray()) {
        const id = MG_DOMAIN1 + '/' + $('a', chapter).attr('href');
        const name = $(chapter).text();
        const chapNum = (_a = Number(id.split('=').pop())) !== null && _a !== void 0 ? _a : 0;
        // const time: Date = new Date(baseTime.getTime() - (7 * 24 * 3600000))
        chapters.push(createChapter({
            id,
            mangaId,
            name,
            langCode: paperback_extensions_common_1.LanguageCode.CHINEESE,
            chapNum,
            time
        }));
        // baseTime.setDate(baseTime.getDate() - 7)
    }
    return chapters;
};
exports.parseChapterDetails = ($, mangaId, chapterId) => {
    const pages = $('.comic-contain__item').map(function () {
        return $(this).attr('src');
    }).get();
    return createChapterDetails({
        id: chapterId,
        mangaId: mangaId,
        pages: pages,
        longStrip: false
    });
};
exports.parseSearch = ($) => {
    const env = $('.comics-card');
    const manga = [];
    for (const item of $(env).toArray()) {
        manga.push(exports.parseMangaItem($, item));
    }
    return manga;
};
// parse each mange item
exports.parseMangaItem = ($, item) => {
    var _a, _b, _c;
    let id = (_a = $('.comics-card__poster', item).attr('href')) !== null && _a !== void 0 ? _a : "";
    id = (_b = id.split('/').pop()) !== null && _b !== void 0 ? _b : "";
    const image = (_c = $('amp-img', item).attr('src')) !== null && _c !== void 0 ? _c : "";
    const title = $('.comics-card__title', item).text();
    // console.log(id)
    // console.log(image)
    // console.log(title)
    return createMangaTile({
        id: id,
        image: image,
        title: createIconText({ text: title })
    });
};
// parse a section of manga items
const parseSection = ($, sec) => {
    const res = [];
    for (const item of $('.comics-card', sec).toArray()) {
        const manga = exports.parseMangaItem($, item);
        res.push(manga);
    }
    return res;
};
exports.parseHomeSections = ($, sections, sectionCallback) => {
    for (const section of sections)
        sectionCallback(section);
    const env = $('.pure-g');
    for (let i = 0; i < sections.length; i++) {
        const sec = $(env)[i];
        sections[i].items = parseSection($, sec);
    }
    for (const section of sections)
        sectionCallback(section);
};
exports.tagDict = {
    國漫: ['cn', 'region'],
    日本: ['jp', 'region'],
    韓國: ['kr', 'region'],
    歐美: ['en', 'region'],
    連載中: ['serial', 'state'],
    已完結: ['pub', 'state'],
    戀愛: ['lianai', 'type'],
    純愛: ['chunai', 'type'],
    古風: ['gufeng', 'type'],
    異能: ['yineng', 'type'],
    懸疑: ['xuanyi', 'type'],
    劇情: ['juqing', 'type'],
    科幻: ['kehuan', 'type'],
    奇幻: ['qihuan', 'type'],
    玄幻: ['xuanhuan', 'type'],
    穿越: ['chuanyue', 'type'],
    冒險: ['maoxian', 'type'],
    推理: ['tuili', 'type'],
    武俠: ['wuxia', 'type'],
    格鬥: ['gedou', 'type'],
    戰爭: ['zhanzheng', 'type'],
    熱血: ['rexue', 'type'],
    搞笑: ['gaoxiao', 'type'],
    大女主: ['danuzhu', 'type'],
    都市: ['dushi', 'type'],
    總裁: ['zongcai', 'type'],
    後宮: ['hougong', 'type'],
    日常: ['richang', 'type'],
    韓漫: ['hanman', 'type'],
    少年: ['shaonian', 'type'],
    其它: ['qita', 'type'],
    ABCD: ['ABCD', 'filter'],
    EFGH: ['EFGH', 'filter'],
    IJKL: ['IJKL', 'filter'],
    MNOP: ['MNOP', 'filter'],
    QRST: ['QRST', 'filter'],
    UVW: ['UVW', 'filter'],
    XYZ: ['XYZ', 'filter'],
    '0-9': ['0-9', 'filter']
};
const typeDict = {
    type: ['0', '類型'],
    region: ['1', '地區'],
    state: ['2', '狀態'],
    filter: ['3', '字母']
};
exports.parseTags = ($) => {
    // const dict: { [key: string]: string[] } = {
    //   region: ['0', '地區'],
    //   state:  ['1', '狀態'],
    //   type:   ['2', '類型'],
    //   filter: ['3', '字母']
    // }
    // create empty diction for tags
    const tmpTags = {};
    for (let key in typeDict) {
        tmpTags[key] = [];
        // tagSections.push(createTagSection({id: dict[key][0], label: dict[key][1], tags: []}))
    }
    for (let key in exports.tagDict) {
        let cond_key = exports.tagDict[key][1];
        tmpTags[cond_key].push({ id: exports.tagDict[key][0], label: key });
    }
    // create tag sections
    const tagSections = [];
    for (let key in typeDict) {
        tagSections.push(createTagSection({
            id: typeDict[key][0],
            label: typeDict[key][1],
            tags: tmpTags[key].map(x => createTag(x))
        }));
    }
    return tagSections;
};
exports.parseMultiTags = (arrTag) => {
    // group by dict
    const lastTags = {};
    // always take the last tag
    for (let tag of arrTag) {
        let key = exports.tagDict[tag.label][1];
        lastTags[key] = tag.id;
    }
    // make the search string
    let search = '';
    for (let key in lastTags) {
        search += key + '=' + lastTags[key] + '&';
    }
    return search;
};
// export const parseViewMore = ($: CheerioStatic, homepageSectionId: string): MangaTile[] => {
//   const env = $('.index-recommend-items:contains(' + homepageSectionId + ')')
//   const manga: MangaTile[] = []
//   for (const item of $('.comics-card', env).toArray()) {
//     manga.push(parseMangaItem($, item))
//   }
//   return manga
// }

},{"paperback-extensions-common":5}]},{},[48])(48)
});

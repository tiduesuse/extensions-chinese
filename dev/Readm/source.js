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
exports.Readm = exports.ReadmInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const ReadmParser_1 = require("./ReadmParser");
const RM_DOMAIN = 'https://readm.org';
const method = 'GET';
exports.ReadmInfo = {
    version: '1.0.11',
    name: 'Readm',
    icon: 'icon.png',
    author: 'Netsky',
    authorWebsite: 'https://github.com/TheNetsky',
    description: 'Extension that pulls manga from Readm.',
    hentaiSource: false,
    websiteBaseURL: RM_DOMAIN,
    sourceTags: [
        {
            text: "Notifications",
            type: paperback_extensions_common_1.TagType.GREEN
        },
        {
            text: "Cloudflare",
            type: paperback_extensions_common_1.TagType.RED
        }
    ]
};
class Readm extends paperback_extensions_common_1.Source {
    getMangaShareUrl(mangaId) { return `${RM_DOMAIN}/manga/${mangaId}`; }
    getMangaDetails(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = createRequestObject({
                url: `${RM_DOMAIN}/manga/`,
                method,
                param: mangaId,
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            return ReadmParser_1.parseMangaDetails($, mangaId);
        });
    }
    getChapters(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = createRequestObject({
                url: `${RM_DOMAIN}/manga/`,
                method,
                param: mangaId,
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            return ReadmParser_1.parseChapters($, mangaId);
        });
    }
    getChapterDetails(mangaId, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = createRequestObject({
                url: `${RM_DOMAIN}/manga/${mangaId}/${chapterId}`,
                method,
                param: "/all-pages"
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data, { xmlMode: false });
            return ReadmParser_1.parseChapterDetails($, mangaId, chapterId);
        });
    }
    getTags() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = createRequestObject({
                url: RM_DOMAIN,
                method,
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            return ReadmParser_1.parseTags($);
        });
    }
    filterUpdatedManga(mangaUpdatesFoundCallback, time, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = 1;
            let updatedManga = {
                ids: [],
                loadMore: true
            };
            while (updatedManga.loadMore) {
                const request = createRequestObject({
                    url: `${RM_DOMAIN}/latest-releases/${page++}`,
                    method,
                });
                const response = yield this.requestManager.schedule(request, 1);
                const $ = this.cheerio.load(response.data);
                updatedManga = ReadmParser_1.parseUpdatedManga($, time, ids);
                if (updatedManga.ids.length > 0) {
                    mangaUpdatesFoundCallback(createMangaUpdates({
                        ids: updatedManga.ids
                    }));
                }
            }
        });
    }
    getHomePageSections(sectionCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            const section1 = createHomeSection({ id: 'hot_update', title: 'Hot Manga Updates' });
            const section2 = createHomeSection({ id: 'hot_manga', title: 'Popular Manga', view_more: true });
            const section3 = createHomeSection({ id: 'latest_updates', title: 'Latest Updates', view_more: true });
            const section4 = createHomeSection({ id: 'new_manga', title: 'Recently Added Manga' });
            const sections = [section1, section2, section3, section4];
            const request = createRequestObject({
                url: RM_DOMAIN,
                method,
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            ReadmParser_1.parseHomeSections($, sections, sectionCallback);
        });
    }
    getViewMoreItems(homepageSectionId, metadata) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let page = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.page) !== null && _a !== void 0 ? _a : 1;
            let param = "";
            switch (homepageSectionId) {
                case "hot_manga":
                    param = `/popular-manga/${page}`;
                    break;
                case "latest_updates":
                    param = `/latest-releases/${page}`;
                    break;
                default:
                    throw new Error(`Requested to getViewMoreItems for a section ID which doesn't exist`);
            }
            const request = createRequestObject({
                url: RM_DOMAIN,
                method,
                param,
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            const manga = ReadmParser_1.parseViewMore($, homepageSectionId);
            metadata = !ReadmParser_1.isLastPage($) ? { page: page + 1 } : undefined;
            return createPagedResults({
                results: manga,
                metadata
            });
        });
    }
    searchRequest(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const search = ReadmParser_1.generateSearch(query);
            const request = createRequestObject({
                url: `${RM_DOMAIN}/service/search`,
                method: "POST",
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-type': "application/x-www-form-urlencoded",
                },
                data: `dataType=json&phrase=${search}`
            });
            let response = yield this.requestManager.schedule(request, 1);
            response = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            const data = Object(response);
            const manga = [];
            if (!data.manga)
                throw new Error("Failed to create proper response object, missing manga property!");
            for (const m of data.manga) {
                if (!m.url || !m.title) {
                    console.log("Missing URL or Title property in manga object!");
                    continue;
                }
                const id = m.url.replace("/manga/", "");
                const image = RM_DOMAIN + m.image;
                const title = m.title;
                manga.push(createMangaTile({
                    id,
                    image: image,
                    title: createIconText({ text: title }),
                }));
            }
            return createPagedResults({
                results: manga,
            });
        });
    }
    getCloudflareBypassRequest() {
        return createRequestObject({
            url: RM_DOMAIN,
            method: method,
        });
    }
}
exports.Readm = Readm;

},{"./ReadmParser":48,"paperback-extensions-common":4}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLastPage = exports.parseViewMore = exports.generateSearch = exports.parseHomeSections = exports.parseUpdatedManga = exports.parseTags = exports.parseChapterDetails = exports.parseChapters = exports.parseMangaDetails = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const RM_DOMAIN = 'https://readm.org';
exports.parseMangaDetails = ($, mangaId) => {
    var _a, _b, _c, _d, _e, _f;
    const titles = [];
    titles.push($("h1.page-title").text().trim());
    const altTitles = $("div.sub-title.pt-sm").text().split(/, |; /);
    for (const t of altTitles) {
        titles.push(t.trim());
    }
    //Check if the image extension could be parsed, if it can, complete it with the domain, else display failback image.
    const parseImage = (_a = $("img.series-profile-thumb")) === null || _a === void 0 ? void 0 : _a.attr("src");
    const image = parseImage ? (RM_DOMAIN + parseImage) : "https://i.imgur.com/GYUxEX8.png";
    const author = (_b = $("small", "span#first_episode").text().trim()) !== null && _b !== void 0 ? _b : "";
    const artist = (_c = $("small", "span#last_episode").text().trim()) !== null && _c !== void 0 ? _c : "";
    const description = (_d = $("p", "div.series-summary-wrapper").text().trim()) !== null && _d !== void 0 ? _d : "No description available";
    let hentai = false;
    const arrayTags = [];
    for (const tag of $("a", $("div.ui.list", "div.item")).toArray()) {
        const label = $(tag).text().trim();
        const id = (_f = (_e = $(tag).attr('href')) === null || _e === void 0 ? void 0 : _e.replace("/category/", "")) !== null && _f !== void 0 ? _f : "";
        if (!id || !label)
            continue;
        if (["ADULT", "SMUT", "MATURE"].includes(label.toUpperCase()))
            hentai = true; //These tags don't exist on Readm, but they may be added in the future!
        arrayTags.push({ id: id, label: label });
    }
    const tagSections = [createTagSection({ id: '0', label: 'genres', tags: arrayTags.map(x => createTag(x)) })];
    const rawStatus = $("div.series-genres").text().trim();
    let status = paperback_extensions_common_1.MangaStatus.ONGOING;
    switch (rawStatus.toLocaleUpperCase()) {
        case 'ONGOING':
            status = paperback_extensions_common_1.MangaStatus.ONGOING;
            break;
        case 'COMPLETED':
            status = paperback_extensions_common_1.MangaStatus.COMPLETED;
            break;
        default:
            status = paperback_extensions_common_1.MangaStatus.ONGOING;
            break;
    }
    return createManga({
        id: mangaId,
        titles: titles,
        image,
        rating: 0,
        status: status,
        author: author,
        artist: artist,
        tags: tagSections,
        desc: description,
        //hentai: hentai,
        hentai: false //Due to MangaDex being down
    });
};
exports.parseChapters = ($, mangaId) => {
    var _a, _b, _c, _d;
    const chapters = [];
    for (const c of $("div.season_start").toArray()) {
        const title = (_a = $("h6.truncate", c).first().text().trim()) !== null && _a !== void 0 ? _a : "";
        const rawChapterId = (_b = $('a', c).attr('href')) !== null && _b !== void 0 ? _b : "";
        const chapterId = /\/manga\/[A-z0-9]+\/(.*?)\//.test(rawChapterId) ? rawChapterId.match(/\/manga\/[A-z0-9]+\/(.*?)\//)[1] : null;
        if (!chapterId)
            continue;
        const chapterNumber = Number(/(\d+)/.test(title) ? title.match(/(\d+)/)[0] : 0);
        const date = parseDate((_d = (_c = $("td.episode-date", c)) === null || _c === void 0 ? void 0 : _c.text()) !== null && _d !== void 0 ? _d : "");
        chapters.push(createChapter({
            id: chapterId,
            mangaId,
            name: title,
            langCode: paperback_extensions_common_1.LanguageCode.ENGLISH,
            chapNum: chapterNumber,
            time: date,
        }));
    }
    return chapters;
};
exports.parseChapterDetails = ($, mangaId, chapterId) => {
    const pages = [];
    for (const p of $("div.ch-images img").toArray()) {
        let rawPage = $(p).attr("src");
        rawPage = RM_DOMAIN + rawPage;
        pages.push(rawPage);
    }
    const chapterDetails = createChapterDetails({
        id: chapterId,
        mangaId: mangaId,
        pages: pages,
        longStrip: false
    });
    return chapterDetails;
};
exports.parseTags = ($) => {
    var _a, _b;
    const arrayTags = [];
    for (const tag of $("li", "ul.trending-thisweek.categories").toArray()) {
        const label = $("a", tag).text().trim();
        const id = (_b = (_a = $("a", tag).attr('href')) === null || _a === void 0 ? void 0 : _a.replace("/category/", "")) !== null && _b !== void 0 ? _b : "";
        if (!id || !label)
            continue;
        arrayTags.push({ id: id, label: label });
    }
    const tagSections = [createTagSection({ id: '0', label: 'genres', tags: arrayTags.map(x => createTag(x)) })];
    return tagSections;
};
exports.parseUpdatedManga = ($, time, ids) => {
    var _a, _b, _c;
    const updatedManga = [];
    let loadMore = true;
    for (const m of $("div.poster.poster-xs", $("ul.clearfix.latest-updates").first()).toArray()) {
        const id = (_b = (_a = $('a', m).attr('href')) === null || _a === void 0 ? void 0 : _a.replace("/manga/", "")) !== null && _b !== void 0 ? _b : "";
        const mangaDate = parseDate((_c = $("span.date", m).text().trim()) !== null && _c !== void 0 ? _c : "");
        if (mangaDate > time) {
            if (ids.includes(id)) {
                updatedManga.push(id);
            }
        }
        else {
            loadMore = false;
        }
    }
    return {
        ids: updatedManga,
        loadMore
    };
};
exports.parseHomeSections = ($, sections, sectionCallback) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    for (const section of sections)
        sectionCallback(section);
    //Hot Mango Update
    const hotMangaUpdate = [];
    for (const m of $("div.item", "div#manga-hot-updates").toArray()) {
        const title = $("strong", m).text().trim();
        const rawId = (_a = $('a', m).attr('href')) !== null && _a !== void 0 ? _a : "";
        const id = /\/manga\/(.*?)\//.test(rawId) ? rawId.match(/\/manga\/(.*?)\//)[1] : null;
        const parseImage = (_b = $("img", m)) === null || _b === void 0 ? void 0 : _b.attr("src");
        const image = parseImage ? (RM_DOMAIN + parseImage) : "https://i.imgur.com/GYUxEX8.png";
        let subtitle = $("a.caption > span", m).text().trim();
        subtitle = subtitle ? ("Chapter " + subtitle) : "";
        if (!id || !title)
            continue;
        hotMangaUpdate.push(createMangaTile({
            id: id,
            image: image,
            title: createIconText({ text: title }),
            subtitleText: createIconText({ text: subtitle }),
        }));
    }
    sections[0].items = hotMangaUpdate;
    sectionCallback(sections[0]);
    //Hot Mango
    const hotManga = [];
    for (const m of $("ul#latest_trailers li").toArray()) {
        const title = $("h6", m).text().trim();
        const id = (_d = (_c = $('a', m).attr('href')) === null || _c === void 0 ? void 0 : _c.replace("/manga/", "")) !== null && _d !== void 0 ? _d : "";
        const parseImage = (_e = $("img", m)) === null || _e === void 0 ? void 0 : _e.attr("data-src");
        const image = parseImage ? (RM_DOMAIN + parseImage) : "https://i.imgur.com/GYUxEX8.png";
        const subtitle = (_f = $("small", m).first().text().trim()) !== null && _f !== void 0 ? _f : "";
        if (!id || !title)
            continue;
        hotManga.push(createMangaTile({
            id: id,
            image: image,
            title: createIconText({ text: title }),
            subtitleText: createIconText({ text: subtitle }),
        }));
    }
    sections[1].items = hotManga;
    sectionCallback(sections[1]);
    //Latest Mango
    const latestManga = [];
    for (const m of $("div.poster.poster-xs", $("ul.clearfix.latest-updates").first()).toArray()) {
        const title = $("h2", m).first().text().trim();
        const id = (_h = (_g = $('a', m).attr('href')) === null || _g === void 0 ? void 0 : _g.replace("/manga/", "")) !== null && _h !== void 0 ? _h : "";
        const parseImage = (_j = $("img", m)) === null || _j === void 0 ? void 0 : _j.attr("data-src");
        const image = parseImage ? (RM_DOMAIN + parseImage) : "https://i.imgur.com/GYUxEX8.png";
        let subtitle = $("div.poster-subject > ul.chapters > li", m).first().text().trim();
        subtitle = subtitle ? ("Chapter " + subtitle) : "";
        if (!id || !title)
            continue;
        latestManga.push(createMangaTile({
            id: id,
            image: image,
            title: createIconText({ text: title }),
            subtitleText: createIconText({ text: subtitle }),
        }));
    }
    sections[2].items = latestManga;
    sectionCallback(sections[2]);
    //New Mango
    const newManga = [];
    for (const m of $("li", "ul.clearfix.mb-0").toArray()) {
        const title = $("h2", m).first().text().trim();
        const id = (_l = (_k = $('a', m).attr('href')) === null || _k === void 0 ? void 0 : _k.replace("/manga/", "")) !== null && _l !== void 0 ? _l : "";
        const parseImage = (_m = $("img", m)) === null || _m === void 0 ? void 0 : _m.attr("data-src");
        const image = parseImage ? (RM_DOMAIN + parseImage) : "https://i.imgur.com/GYUxEX8.png";
        if (!id || !title)
            continue;
        newManga.push(createMangaTile({
            id: id,
            image: image,
            title: createIconText({ text: title }),
        }));
    }
    sections[3].items = newManga;
    sectionCallback(sections[3]);
    for (const section of sections)
        sectionCallback(section);
};
exports.generateSearch = (query) => {
    var _a;
    let search = (_a = query.title) !== null && _a !== void 0 ? _a : "";
    return encodeURI(search);
};
exports.parseViewMore = ($, homepageSectionId) => {
    var _a, _b, _c, _d, _e, _f;
    const manga = [];
    if (homepageSectionId === "hot_manga") {
        for (const m of $("li.mb-lg", "ul.filter-results").toArray()) {
            const title = $("h2", m).first().text().trim();
            const id = (_b = (_a = $('a', m).attr('href')) === null || _a === void 0 ? void 0 : _a.replace("/manga/", "")) !== null && _b !== void 0 ? _b : "";
            const parseImage = (_c = $("img", m)) === null || _c === void 0 ? void 0 : _c.attr("src");
            const image = parseImage ? (RM_DOMAIN + parseImage) : "https://i.imgur.com/GYUxEX8.png";
            if (!id || !title)
                continue;
            manga.push(createMangaTile({
                id,
                image,
                title: createIconText({ text: title }),
            }));
        }
    }
    else {
        for (const m of $("div.poster.poster-xs", $("ul.clearfix.latest-updates").first()).toArray()) {
            const title = $("h2", m).first().text().trim();
            const id = (_e = (_d = $('a', m).attr('href')) === null || _d === void 0 ? void 0 : _d.replace("/manga/", "")) !== null && _e !== void 0 ? _e : "";
            const parseImage = (_f = $("img", m)) === null || _f === void 0 ? void 0 : _f.attr("data-src");
            const image = parseImage ? (RM_DOMAIN + parseImage) : "https://i.imgur.com/GYUxEX8.png";
            if (!id || !title)
                continue;
            manga.push(createMangaTile({
                id,
                image,
                title: createIconText({ text: title }),
            }));
        }
    }
    return manga;
};
const parseDate = (date) => {
    var _a;
    date = date.toUpperCase();
    let time;
    let number = Number(((_a = /\d*/.exec(date)) !== null && _a !== void 0 ? _a : [])[0]);
    if (date.includes("LESS THAN AN HOUR") || date.includes("JUST NOW")) {
        time = new Date(Date.now());
    }
    else if (date.includes("YEAR") || date.includes("YEARS")) {
        time = new Date(Date.now() - (number * 31556952000));
    }
    else if (date.includes("MONTH") || date.includes("MONTHS")) {
        time = new Date(Date.now() - (number * 2592000000));
    }
    else if (date.includes("WEEK") || date.includes("WEEKS")) {
        time = new Date(Date.now() - (number * 604800000));
    }
    else if (date.includes("YESTERDAY")) {
        time = new Date(Date.now() - 86400000);
    }
    else if (date.includes("DAY") || date.includes("DAYS")) {
        time = new Date(Date.now() - (number * 86400000));
    }
    else if (date.includes("HOUR") || date.includes("HOURS")) {
        time = new Date(Date.now() - (number * 3600000));
    }
    else if (date.includes("MINUTE") || date.includes("MINUTES")) {
        time = new Date(Date.now() - (number * 60000));
    }
    else if (date.includes("SECOND") || date.includes("SECONDS")) {
        time = new Date(Date.now() - (number * 1000));
    }
    else {
        let split = date.split("-");
        time = new Date(Number(split[2]), Number(split[0]) - 1, Number(split[1]));
    }
    return time;
};
exports.isLastPage = ($) => {
    let isLast = true;
    let hasNext = Boolean($("a:contains(»)", "div.ui.pagination.menu")[0]);
    if (hasNext)
        isLast = false;
    return isLast;
};

},{"paperback-extensions-common":4}]},{},[47])(47)
});

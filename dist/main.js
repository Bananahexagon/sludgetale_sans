/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/core */ \"./src/lib/core.ts\");\n/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.json */ \"./src/config.json\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\nwindow.onload = () => __awaiter(void 0, void 0, void 0, function* () {\n    yield (0,_lib_core__WEBPACK_IMPORTED_MODULE_0__.init)(_config_json__WEBPACK_IMPORTED_MODULE_1__);\n});\n\n\n//# sourceURL=webpack://sugot_page/./src/index.ts?");

/***/ }),

/***/ "./src/lib/canvas.ts":
/*!***************************!*\
  !*** ./src/lib/canvas.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CanvasLibGen: () => (/* binding */ CanvasLibGen)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/lib/utils.ts\");\n\nconst CanvasLibGen = (canvas, ctx, Images, Fonts, config, props) => {\n    const stamp = (name, dx, dy, dd = 0, size = 100, alpha = 1, align = \"center\", absolute = false) => {\n        if (absolute) {\n            const costume = Images[name];\n            const sw = costume.width;\n            const sh = costume.height;\n            ctx.globalAlpha = alpha;\n            switch (align) {\n                case \"center\":\n                    {\n                        ctx.save();\n                        ctx.translate(dx * config.display_quality, -dy * config.display_quality + canvas.height);\n                        ctx.rotate(dd * Math.PI / 180);\n                        ctx.drawImage(costume, (-sw * size / 200) * config.display_quality, (-sh * size / 200) * config.display_quality, (sw * size / 100) * config.display_quality, (sh * size / 100) * config.display_quality);\n                        ctx.restore();\n                    }\n                    break;\n                case \"start\": {\n                    ctx.save();\n                    ctx.translate(dx * config.display_quality, -dy * config.display_quality + canvas.height);\n                    ctx.rotate(dd * Math.PI / 180);\n                    ctx.drawImage(costume, 0, 0, (sw * size / 100) * config.display_quality, (sh * size / 100) * config.display_quality);\n                    ctx.restore();\n                }\n            }\n        }\n        else {\n            const x = ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.cos360)(props.d) * dx - (0,_utils__WEBPACK_IMPORTED_MODULE_0__.sin360)(props.d) * dy + props.x) * props.size / 100;\n            const y = ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.sin360)(props.d) * dx + (0,_utils__WEBPACK_IMPORTED_MODULE_0__.cos360)(props.d) * dy + props.y) * props.size / 100;\n            const d = dd + props.d;\n            stamp(name, x, y, d, size * props.size / 100, alpha, align, true);\n        }\n    };\n    const drawRect = (dx, dy, width, height, color, direction = 0, type = \"center\") => {\n        ctx.save();\n        switch (type) {\n            case \"center++\":\n                {\n                    ctx.translate(dx * config.display_quality, -dy * config.display_quality + canvas.height);\n                    ctx.rotate(direction * Math.PI / 180);\n                    ctx.beginPath();\n                    ctx.rect((-width / 2) * config.display_quality, (-height / 2) * config.display_quality, (width) * config.display_quality, (height) * config.display_quality);\n                }\n                break;\n            case \"center\":\n                {\n                    ctx.translate((dx - width / 2) * config.display_quality, -(dy - height / 2) * config.display_quality + canvas.height);\n                    ctx.rotate(direction * Math.PI / 180);\n                    ctx.beginPath();\n                    ctx.rect(0, 0, (width) * config.display_quality, -(height) * config.display_quality);\n                }\n                break;\n            case \"start\":\n            default:\n                {\n                    ctx.translate(dx * config.display_quality, -dy * config.display_quality + canvas.height);\n                    ctx.rotate(direction * Math.PI / 180);\n                    ctx.beginPath();\n                    ctx.rect(0, 0, (width) * config.display_quality, -(height) * config.display_quality);\n                }\n                break;\n        }\n        ctx.fillStyle = color;\n        ctx.fill();\n        ctx.restore();\n    };\n    const drawLine = (lx, ly, d, len, width, color, type = 0) => {\n        ctx.beginPath();\n        switch (type) {\n            case 0:\n                {\n                    ctx.moveTo((lx - len * Math.sin(d) / 2) * config.display_quality, -(ly + len * Math.cos(d) / 2) * config.display_quality + canvas.height);\n                    ctx.lineTo((lx + len * Math.sin(d) / 2) * config.display_quality, -(ly - len * Math.cos(d) / 2) * config.display_quality + canvas.height);\n                }\n                break;\n            case 1:\n                {\n                    ctx.moveTo(lx * config.display_quality, -ly * config.display_quality + canvas.height);\n                    ctx.lineTo((lx + len * Math.sin(d)) * config.display_quality, -(ly - len * Math.cos(d)) * config.display_quality + canvas.height);\n                }\n                break;\n        }\n        ctx.strokeStyle = color;\n        ctx.lineWidth = width * config.display_quality;\n        ctx.stroke();\n    };\n    const drawText = (tx, lx, ly, size, color, font = \"serif\", align = \"left\") => {\n        const [x, y] = [lx * config.display_quality, -ly * config.display_quality + canvas.height];\n        ctx.font = `${size * config.display_quality}px ${font}`;\n        ctx.textAlign = align;\n        ctx.fillStyle = color;\n        ctx.fillText(tx, x, y);\n    };\n    return {\n        stamp,\n        drawRect,\n        drawLine,\n        drawText,\n    };\n};\n\n\n//# sourceURL=webpack://sugot_page/./src/lib/canvas.ts?");

/***/ }),

/***/ "./src/lib/core.ts":
/*!*************************!*\
  !*** ./src/lib/core.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\n/* harmony import */ var _frame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./frame */ \"./src/lib/frame.ts\");\n/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loader */ \"./src/lib/loader.ts\");\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./canvas */ \"./src/lib/canvas.ts\");\n/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sprite */ \"./src/lib/sprite.ts\");\n/* harmony import */ var _position__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./position */ \"./src/lib/position.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\nconst init = (config) => __awaiter(void 0, void 0, void 0, function* () {\n    const canvas = document.getElementById(config.canvas_name);\n    canvas.height = config.stage_height * config.display_quality;\n    canvas.width = config.stage_width * config.display_quality;\n    const ctx = canvas.getContext(\"2d\");\n    const { Images, Audios, Fonts } = yield (0,_loader__WEBPACK_IMPORTED_MODULE_1__.loadAssets)();\n    const inputKeys = {\n        up: false, down: false, left: false, right: false, z: false, x: false, c: false, d: false,\n    };\n    const inputMouse = {\n        x: 0, y: 0, clicking: false, is_in_rect(dx, dy, w, h, type = \"center\") {\n            switch (type) {\n                case \"center\":\n                    {\n                        return (dx - w / 2 < this.x && this.x < dx + w / 2) && (dy - h / 2 < this.y && this.y < dy + h / 2);\n                    }\n                    break;\n                case \"start\":\n                default:\n                    {\n                        return (dx < this.x && this.x < dx + w) && (dy < this.y && this.y < dy + h);\n                    }\n                    break;\n            }\n        }\n    };\n    const props = {\n        canvas: {\n            size: 100,\n            x: 0,\n            y: 0,\n            d: 0,\n        },\n    };\n    const cLib = (0,_canvas__WEBPACK_IMPORTED_MODULE_2__.CanvasLibGen)(canvas, ctx, Images, Fonts, config, props.canvas);\n    const Sprite = (0,_sprite__WEBPACK_IMPORTED_MODULE_3__.SpriteLibGen)(cLib);\n    ctx.imageSmoothingEnabled = false;\n    const pLib = (0,_position__WEBPACK_IMPORTED_MODULE_4__.PositionLibGen)(canvas, config, props.canvas);\n    window.addEventListener(\"keydown\", e => {\n        switch (e.key) {\n            case \"ArrowUp\":\n                {\n                    inputKeys.up = true;\n                }\n                break;\n            case \"ArrowDown\":\n                {\n                    inputKeys.down = true;\n                }\n                break;\n            case \"ArrowLeft\":\n                {\n                    inputKeys.left = true;\n                }\n                break;\n            case \"ArrowRight\":\n                {\n                    inputKeys.right = true;\n                }\n                break;\n            case \"z\":\n            case \"Z\":\n                {\n                    inputKeys.z = true;\n                }\n                break;\n            case \"x\":\n            case \"X\":\n                {\n                    inputKeys.x = true;\n                }\n                break;\n            case \"c\":\n            case \"C\":\n                {\n                    inputKeys.c = true;\n                }\n                break;\n            case \"d\":\n            case \"D\":\n                {\n                    inputKeys.d = true;\n                }\n                break;\n        }\n    });\n    window.addEventListener(\"keyup\", e => {\n        switch (e.key) {\n            case \"ArrowUp\":\n                {\n                    inputKeys.up = false;\n                }\n                break;\n            case \"ArrowDown\":\n                {\n                    inputKeys.down = false;\n                }\n                break;\n            case \"ArrowLeft\":\n                {\n                    inputKeys.left = false;\n                }\n                break;\n            case \"ArrowRight\":\n                {\n                    inputKeys.right = false;\n                }\n                break;\n            case \"z\":\n            case \"Z\":\n                {\n                    inputKeys.z = false;\n                }\n                break;\n            case \"x\":\n            case \"X\":\n                {\n                    inputKeys.x = false;\n                }\n                break;\n            case \"c\":\n            case \"C\":\n                {\n                    inputKeys.c = false;\n                }\n                break;\n            case \"d\":\n            case \"D\":\n                {\n                    inputKeys.d = false;\n                }\n                break;\n        }\n    });\n    canvas.addEventListener(\"mousedown\", e => {\n        inputMouse.clicking = true;\n        const p = pLib.raw_to_stage(e.x, e.y);\n        inputMouse.x = p.x;\n        inputMouse.y = p.y;\n    });\n    canvas.addEventListener(\"mousemove\", e => {\n        const p = pLib.raw_to_stage(e.x, e.y);\n        inputMouse.x = p.x;\n        inputMouse.y = p.y;\n    });\n    canvas.addEventListener(\"mouseup\", e => {\n        inputMouse.clicking = false;\n        const p = pLib.raw_to_stage(e.x, e.y);\n        inputMouse.x = p.x;\n        inputMouse.y = p.y;\n    });\n    return {\n        canvas,\n        ctx,\n        Images,\n        Audios,\n        Fonts,\n        inputKeys,\n        inputMouse,\n        props,\n        cLib,\n        Sprite,\n        for: _frame__WEBPACK_IMPORTED_MODULE_0__.frameFor,\n        while: _frame__WEBPACK_IMPORTED_MODULE_0__.frameWhile,\n        loop: _frame__WEBPACK_IMPORTED_MODULE_0__.frameLoop,\n    };\n});\n\n\n//# sourceURL=webpack://sugot_page/./src/lib/core.ts?");

/***/ }),

/***/ "./src/lib/frame.ts":
/*!**************************!*\
  !*** ./src/lib/frame.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   frameFor: () => (/* binding */ frameFor),\n/* harmony export */   frameLoop: () => (/* binding */ frameLoop),\n/* harmony export */   frameWhile: () => (/* binding */ frameWhile)\n/* harmony export */ });\nconst frameWhile = (condition, proc) => {\n    if (!condition()) {\n        proc();\n        requestAnimationFrame(() => frameWhile(condition, proc));\n    }\n};\nconst frameFor = (condition, proc, i = 0) => {\n    if (i < condition) {\n        proc(i);\n        requestAnimationFrame(() => frameFor(condition, proc, i + 1));\n    }\n};\nconst frameLoop = (proc) => { proc(); requestAnimationFrame(() => frameLoop(proc)); };\n\n\n//# sourceURL=webpack://sugot_page/./src/lib/frame.ts?");

/***/ }),

/***/ "./src/lib/loader.ts":
/*!***************************!*\
  !*** ./src/lib/loader.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadAssets: () => (/* binding */ loadAssets)\n/* harmony export */ });\n/* harmony import */ var _assets_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets.json */ \"./src/assets.json\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\nconst loadAssets = () => __awaiter(void 0, void 0, void 0, function* () {\n    const Images = {};\n    const Audios = {};\n    const Fonts = {};\n    const index = _assets_json__WEBPACK_IMPORTED_MODULE_0__;\n    const promises = [];\n    console.log(index);\n    index.forEach((e) => promises.push(new Promise((resolve) => {\n        switch (e.type) {\n            case \"image\":\n                {\n                    const image = new Image();\n                    image.src = e.src;\n                    image.onload = () => {\n                        Images[e.name] = image;\n                        resolve();\n                    };\n                }\n                break;\n            case \"audio\":\n                {\n                    const audio = new Audio();\n                    audio.src = e.src;\n                    audio.onload = () => {\n                        Audios[e.name] = audio;\n                        resolve();\n                    };\n                }\n                break;\n            case \"font\": {\n                (() => __awaiter(void 0, void 0, void 0, function* () {\n                    const response = yield fetch(e.src);\n                    const cssFontFace = yield response.text();\n                    const matchUrls = yield cssFontFace.match(/url\\(.+?\\)/g);\n                    if (!matchUrls)\n                        throw new Error(\"フォントが見つかりませんでした\");\n                    const promises_sub = [];\n                    matchUrls.forEach((f) => {\n                        promises_sub.push((() => __awaiter(void 0, void 0, void 0, function* () {\n                            const font = new FontFace(e.name, f);\n                            yield font.load();\n                            Fonts[e.name] = font;\n                            yield document.fonts.add(font);\n                        }))());\n                    });\n                    Promise.all(promises_sub);\n                }))().then(resolve);\n            }\n        }\n    })));\n    yield Promise.all(promises);\n    console.log(Fonts);\n    return { Images, Audios, Fonts };\n});\n\n\n//# sourceURL=webpack://sugot_page/./src/lib/loader.ts?");

/***/ }),

/***/ "./src/lib/position.ts":
/*!*****************************!*\
  !*** ./src/lib/position.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PositionLibGen: () => (/* binding */ PositionLibGen)\n/* harmony export */ });\nconst PositionLibGen = (canvas, config, props) => {\n    const raw_to_stage = (rx, ry, rd = 0) => {\n        const rect = canvas.getBoundingClientRect();\n        const x = ((rx - rect.left) / props.size * 100 - props.x) * config.stage_width / config.display_width;\n        const y = (config.display_height - ((ry - rect.top) / props.size * 100 - props.y)) * config.stage_height / config.display_height;\n        const d = rd + props.d;\n        return {\n            x, y, d\n        };\n    };\n    return {\n        raw_to_stage\n    };\n};\nconst stamp = (name, dx, dy, dd = 0, size = 100, absolute = false) => {\n    const [props_x, props_y, props_size] = [0, 0, 0];\n    const x = (dx + props_x) * props_size / 100;\n    const y = (dy + props_y) * props_size / 100;\n    const [display_quality, height] = [0, 0];\n    const [pair_x, pair_y] = [x * display_quality, -y * display_quality + height];\n    const [raw_x, raw_y] = [pair_x / display_quality, -(pair_y - height) / display_quality];\n};\n\n\n//# sourceURL=webpack://sugot_page/./src/lib/position.ts?");

/***/ }),

/***/ "./src/lib/sprite.ts":
/*!***************************!*\
  !*** ./src/lib/sprite.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SpriteLibGen: () => (/* binding */ SpriteLibGen)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/lib/utils.ts\");\n\nconst SpriteLibGen = (cLib) => {\n    class Sprite {\n        constructor(x, y, d = 0, size = 100, costume = \"\", visible = false) {\n            this.x = x;\n            this.y = y;\n            this.d = d;\n            this.size = size;\n            this.costume = costume;\n            this.visible = visible;\n        }\n        stamp() {\n            if (this.visible) {\n                cLib.stamp(this.costume, this.x, this.y, this.d, this.size);\n            }\n        }\n        move(far) {\n            this.x += (0,_utils__WEBPACK_IMPORTED_MODULE_0__.sin360)(this.d) * far;\n            this.y += (0,_utils__WEBPACK_IMPORTED_MODULE_0__.cos360)(this.d) * far;\n        }\n    }\n    return Sprite;\n};\n\n\n//# sourceURL=webpack://sugot_page/./src/lib/sprite.ts?");

/***/ }),

/***/ "./src/lib/utils.ts":
/*!**************************!*\
  !*** ./src/lib/utils.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Opt: () => (/* binding */ Opt),\n/* harmony export */   Res: () => (/* binding */ Res),\n/* harmony export */   cos360: () => (/* binding */ cos360),\n/* harmony export */   distance: () => (/* binding */ distance),\n/* harmony export */   sin360: () => (/* binding */ sin360),\n/* harmony export */   tan360: () => (/* binding */ tan360)\n/* harmony export */ });\nclass Opt {\n    constructor(is_some, value = undefined) {\n        this.is_some = is_some;\n        this.value = value;\n    }\n    unwrap() {\n        if (this.is_some) {\n            return this.value;\n        }\n        else {\n            throw new Error();\n        }\n    }\n    unwrap_or(arg) {\n        if (this.is_some) {\n            return this.value;\n        }\n        else {\n            return arg;\n        }\n    }\n    unwrap_or_else(fn) {\n        if (this.is_some) {\n            return this.value;\n        }\n        else {\n            return fn();\n        }\n    }\n    static None() {\n        return new Opt(false);\n    }\n    static Some(arg) {\n        return new Opt(true, arg);\n    }\n    static try(fn) {\n        try {\n            const v = fn();\n            return Opt.Some(v);\n        }\n        catch (_a) {\n            return Opt.None();\n        }\n    }\n}\nclass Res {\n    constructor(is_ok, value = undefined) {\n        this.is_ok = is_ok;\n        this.value = value;\n    }\n    unwrap() {\n        if (this.is_ok) {\n            return this.value;\n        }\n        else {\n            throw new Error(this.value);\n        }\n    }\n    unwrap_or(arg) {\n        if (this.is_ok) {\n            return this.value;\n        }\n        else {\n            return arg;\n        }\n    }\n    unwrap_or_else(fn) {\n        if (this.is_ok) {\n            return this.value;\n        }\n        else {\n            return fn(this.value);\n        }\n    }\n    static Ok(arg) {\n        return new Res(true, arg);\n    }\n    static Err(err) {\n        return new Res(false);\n    }\n    static try(fn) {\n        try {\n            const v = fn();\n            return Res.Ok(v);\n        }\n        catch (err) {\n            return Res.Err(err);\n        }\n    }\n}\nconst sin360 = (d) => Math.sin(d / 360 * Math.PI * 2);\nconst cos360 = (d) => Math.cos(d / 360 * Math.PI * 2);\nconst tan360 = (d) => Math.tan(d / 360 * Math.PI * 2);\nconst distance = (lx, ly, rx, ry) => {\n    return Math.sqrt((rx - lx) ** 2 + (ry - ly) ** 2);\n};\n\n\n\n//# sourceURL=webpack://sugot_page/./src/lib/utils.ts?");

/***/ }),

/***/ "./src/assets.json":
/*!*************************!*\
  !*** ./src/assets.json ***!
  \*************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('[{\"type\":\"image\",\"name\":\"soul\",\"src\":\"./assets/example.png\"}]');\n\n//# sourceURL=webpack://sugot_page/./src/assets.json?");

/***/ }),

/***/ "./src/config.json":
/*!*************************!*\
  !*** ./src/config.json ***!
  \*************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"display_quality\":2,\"stage_width\":640,\"stage_height\":480,\"display_width\":640,\"display_height\":480,\"canvas_name\":\"main\"}');\n\n//# sourceURL=webpack://sugot_page/./src/config.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
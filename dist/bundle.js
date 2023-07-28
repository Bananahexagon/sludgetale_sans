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

/***/ "./src/bone.ts":
/*!*********************!*\
  !*** ./src/bone.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   boneFnsGen: () => (/* binding */ boneFnsGen)\n/* harmony export */ });\nconst boneFnsGen = (cLib) => {\n    let boneDict = {};\n    class normalBone {\n        constructor(name, sx, sy, sd, sl, mx, my, md, ml, life, color, size, center = 0) {\n            this.x = sx;\n            this.y = sy;\n            this.d = sd;\n            this.len = sl;\n            this.sx = sx;\n            this.sy = sy;\n            this.sd = sd;\n            this.slen = sl;\n            this.mx = mx;\n            this.my = my;\n            this.md = md;\n            this.mlen = ml;\n            this.life = life;\n            this.color = color;\n            this.size = size;\n            this.age = 0;\n            this.center = center;\n            this.name = name ? name : \"_auto|\" + normalBone.autoID++;\n            boneDict[this.name] = this;\n        }\n        move() {\n            this.age++;\n            if (typeof (this.mx) == \"number\")\n                this.x += this.mx;\n            else\n                switch (this.mx.type) {\n                    case \"sin\":\n                        this.x = this.sx + this.mx.amp * Math.sin(this.age / (Math.PI * this.mx.cycle));\n                        break;\n                    case \"cos\":\n                        this.x = this.sx - this.mx.amp * Math.cos(this.age / (Math.PI * this.mx.cycle));\n                        break;\n                    case \"custom\":\n                        this.x = this.mx.fn(this.age);\n                        break;\n                }\n            if (typeof (this.my) == \"number\")\n                this.y += this.my;\n            else\n                switch (this.my.type) {\n                    case \"sin\":\n                        this.y = this.sy + this.my.amp * Math.sin(this.age / (Math.PI * this.my.cycle));\n                        break;\n                    case \"cos\":\n                        this.y = this.sy - this.my.amp * Math.cos(this.age / (Math.PI * this.my.cycle));\n                        break;\n                    case \"custom\":\n                        this.y = this.my.fn(this.age);\n                        break;\n                }\n            if (typeof (this.md) == \"number\")\n                this.d += this.md;\n            else\n                switch (this.md.type) {\n                    case \"sin\":\n                        this.d = this.sd + this.md.amp * Math.sin(this.age / (Math.PI * this.md.cycle));\n                        break;\n                    case \"cos\":\n                        this.d = this.sd - this.md.amp * Math.cos(this.age / (Math.PI * this.md.cycle));\n                        break;\n                    case \"custom\":\n                        this.d = this.md.fn(this.age);\n                        break;\n                }\n            if (typeof (this.mlen) == \"number\")\n                this.len += this.mlen;\n            else\n                switch (this.mlen.type) {\n                    case \"sin\":\n                        this.len = this.slen + this.mlen.amp * Math.sin(this.age / (Math.PI * this.mlen.cycle));\n                        break;\n                    case \"cos\":\n                        this.len = this.slen - this.mlen.amp * Math.cos(this.age / (Math.PI * this.mlen.cycle));\n                        break;\n                    case \"custom\":\n                        this.len = this.mlen.fn(this.age);\n                        break;\n                }\n            if (this.life < this.age)\n                this.delete();\n        }\n        draw() {\n            if (this.center == 0) {\n                cLib.stamp(\"bone_head_white\", this.x, this.y, this.d - 180, this.size);\n                cLib.drawLine(this.x, this.y, this.d * Math.PI / 180, this.len, this.size / 100 * 5, \"#ffffff\", 1);\n                cLib.stamp(\"bone_head_white\", this.x + this.len * Math.sin(this.d * Math.PI / 180), this.y - this.len * Math.cos(this.d * Math.PI / 180), this.d, this.size);\n            }\n            else {\n                cLib.stamp(\"bone_head_white\", this.x - this.len * Math.sin(this.d * Math.PI / 180) / 2, this.y + this.len * Math.cos(this.d * Math.PI / 180) / 2, this.d - 180, this.size);\n                cLib.drawLine(this.x, this.y, this.d * Math.PI / 180, this.len, this.size / 100 * 5, \"#ffffff\", 0);\n                cLib.stamp(\"bone_head_white\", this.x + this.len * Math.sin(this.d * Math.PI / 180) / 2, this.y - this.len * Math.cos(this.d * Math.PI / 180) / 2, this.d, this.size);\n            }\n        }\n        delete() {\n            delete boneDict[this.name];\n        }\n    }\n    normalBone.autoID = 0;\n    ;\n    const process = () => {\n        for (const name in boneDict) {\n            boneDict[name].move();\n            boneDict[name] ? boneDict[name].draw() : 0;\n        }\n        ;\n    };\n    return {\n        dict: boneDict,\n        normal: normalBone,\n        process,\n    };\n    new normalBone(\"bone1\", 170, 240, 60, 150, 0, 0, -2, 0, Infinity, \"white\", 200);\n    new normalBone(\"bone2\", 370, 240, 60, 150, 0, 0, 5, 0, Infinity, \"white\", 200, 1);\n    new normalBone(\"bone3\", 170, 240, 60, 150, {\n        type: \"sin\",\n        amp: 250,\n        cycle: 30,\n    }, {\n        type: \"cos\",\n        amp: 250,\n        cycle: 30,\n    }, 0, 0, Infinity, \"white\", 200, 1);\n};\n\n\n//# sourceURL=webpack://ut_battle_engine_ts/./src/bone.ts?");

/***/ }),

/***/ "./src/box.ts":
/*!********************!*\
  !*** ./src/box.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   boxFnsGen: () => (/* binding */ boxFnsGen)\n/* harmony export */ });\nconst boxFnsGen = (cLib) => {\n    const line = (lx, ly, d, len, width = 8, type = \"line\") => {\n        let position;\n        return {\n            calc: (px, py) => {\n                let ptx = (px - lx) * Math.sin(d) - (py - ly) * Math.cos(d);\n                let pty = (px - lx) * Math.cos(d) + (py - ly) * Math.sin(d);\n                if (type == \"line\")\n                    position = 0 < pty;\n                if (-len / 2 < ptx && ptx < len / 2 || type == \"wall\") {\n                    if (position) {\n                        if (pty < width)\n                            pty = width;\n                    }\n                    else {\n                        if (-width < pty)\n                            pty = -width;\n                    }\n                }\n                let prx = -ptx * Math.sin(-d) + pty * Math.cos(-d);\n                let pry = -ptx * Math.cos(-d) - pty * Math.sin(-d);\n                return [prx + lx, pry + ly];\n            },\n            drawLine: () => {\n                cLib.drawLine(lx, ly, d, len, 5, \"#ffffff\");\n            },\n            drawWhite: () => {\n                cLib.drawRect(lx + (640 * Math.sin(d)), ly - (640 * Math.cos(d)), 1280, 1280, \"#ffffff\", d * 180 / Math.PI, 0);\n            },\n            drawBlack: () => {\n                cLib.drawRect(lx + (640 * Math.sin(d) + (width / 2 + 1) * Math.cos(d)), ly - (640 * Math.cos(d) - (width / 2 + 1) * Math.sin(d)), 1280, 1280, \"#000000\", d * 180 / Math.PI, 0);\n            }\n        };\n    };\n    const boxGet = (boxObj) => {\n        return [\n            line(boxObj.center.x + boxObj.width * Math.cos(boxObj.direction * Math.PI / 180), boxObj.center.y + boxObj.width * Math.sin(boxObj.direction * Math.PI / 180), boxObj.direction * Math.PI / 180, 640, 8, \"wall\"),\n            line(boxObj.center.x - boxObj.height * Math.sin(boxObj.direction * Math.PI / 180), boxObj.center.y + boxObj.height * Math.cos(boxObj.direction * Math.PI / 180), (boxObj.direction + 90) * Math.PI / 180, 640, 8, \"wall\"),\n            line(boxObj.center.x - boxObj.width * Math.cos(boxObj.direction * Math.PI / 180), boxObj.center.y - boxObj.width * Math.sin(boxObj.direction * Math.PI / 180), (boxObj.direction + 180) * Math.PI / 180, 640, 8, \"wall\"),\n            line(boxObj.center.x + boxObj.height * Math.sin(boxObj.direction * Math.PI / 180), boxObj.center.y - boxObj.height * Math.cos(boxObj.direction * Math.PI / 180), (boxObj.direction - 90) * Math.PI / 180, 640, 8, \"wall\"),\n        ];\n    };\n    return {\n        line,\n        boxGet\n    };\n};\n\n\n\n//# sourceURL=webpack://ut_battle_engine_ts/./src/box.ts?");

/***/ }),

/***/ "./src/core.ts":
/*!*********************!*\
  !*** ./src/core.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Core: () => (/* binding */ Core)\n/* harmony export */ });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nconst Core = (() => {\n    let canvas = document.getElementById(\"canvas\");\n    let ctx = canvas.getContext(\"2d\");\n    let Images = {};\n    let Audios = {};\n    let inputKeys = {\n        up: false, down: false, left: false, right: false, z: false, x: false, c: false,\n    };\n    const loadAssets = () => __awaiter(void 0, void 0, void 0, function* () {\n        const index = (yield __webpack_require__.e(/*! import() */ \"src_assets_json\").then(__webpack_require__.t.bind(__webpack_require__, /*! ./assets.json */ \"./src/assets.json\", 19))).default;\n        let promises = [];\n        console.log(index);\n        index.forEach((e) => promises.push(new Promise((resolve) => {\n            switch (e.type) {\n                case \"image\":\n                    {\n                        let image = new Image();\n                        image.src = e.src;\n                        image.onload = () => {\n                            Images[e.name] = image;\n                            resolve();\n                        };\n                    }\n                    break;\n                case \"audio\":\n                    {\n                        let audio = new Audio();\n                        audio.src = e.src;\n                        audio.onload = () => {\n                            Audios[e.name] = audio;\n                            resolve();\n                        };\n                    }\n                    break;\n            }\n        })));\n        yield Promise.all(promises);\n    });\n    const init = (config) => __awaiter(void 0, void 0, void 0, function* () {\n        canvas.height = 480 * config.display_quality;\n        canvas.width = 640 * config.display_quality;\n        window.addEventListener(\"keydown\", e => {\n            console.log(e);\n            switch (e.key) {\n                case \"ArrowUp\":\n                    inputKeys.up = true;\n                    break;\n                case \"ArrowDown\":\n                    inputKeys.down = true;\n                    break;\n                case \"ArrowLeft\":\n                    inputKeys.left = true;\n                    break;\n                case \"ArrowRight\":\n                    inputKeys.right = true;\n                    break;\n                case \"z\":\n                case \"Z\":\n                    inputKeys.z = true;\n                    break;\n                case \"x\":\n                case \"X\":\n                    inputKeys.x = true;\n                    break;\n                case \"c\":\n                case \"C\":\n                    inputKeys.c = true;\n            }\n        });\n        window.addEventListener(\"keyup\", e => {\n            switch (e.key) {\n                case \"ArrowUp\":\n                    inputKeys.up = false;\n                    break;\n                case \"ArrowDown\":\n                    inputKeys.down = false;\n                    break;\n                case \"ArrowLeft\":\n                    inputKeys.left = false;\n                    break;\n                case \"ArrowRight\":\n                    inputKeys.right = false;\n                    break;\n                case \"z\":\n                case \"Z\":\n                    inputKeys.z = false;\n                    break;\n                case \"x\":\n                case \"X\":\n                    inputKeys.x = false;\n                    break;\n                case \"c\":\n                case \"C\":\n                    inputKeys.c = false;\n            }\n        });\n        yield loadAssets();\n    });\n    return {\n        canvas,\n        ctx,\n        Images,\n        Audios,\n        loadAssets,\n        inputKeys,\n        init,\n    };\n})();\n\n\n//# sourceURL=webpack://ut_battle_engine_ts/./src/core.ts?");

/***/ }),

/***/ "./src/font.ts":
/*!*********************!*\
  !*** ./src/font.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fontFnsGen: () => (/* binding */ fontFnsGen)\n/* harmony export */ });\n/* harmony import */ var _data_font_en_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/font_en.json */ \"./src/data/font_en.json\");\n\n\nconst fontFnsGen = (cLib, inputKeys) => {\n    const fontData = {\n        en: _data_font_en_json__WEBPACK_IMPORTED_MODULE_0__,\n        status: _data_font_en_json__WEBPACK_IMPORTED_MODULE_0__\n    };\n    let displayDict = {};\n    class Font {\n        constructor(name) { this.name = name; }\n        delete() {\n            delete displayDict[this.name];\n        }\n    }\n    class Super extends Font {\n        constructor(name, x, y, d, size, font, input) {\n            super(name);\n            this._ = {\n                all_str: input.reduce((a, c) => a + c.str, \"\"),\n                now: [{ str: \"\", color: input[0].color, spacing_x: input[0].spacing_x, spacing_y: input[0].spacing_y }],\n                len_allow: 0,\n                count: 0,\n                current_char: 0,\n                current_char_true: 0,\n            };\n            this.x = x;\n            this.y = y;\n            this.direction = d;\n            this.size = size;\n            this.data = input;\n            this.font = ((f) => {\n                switch (f) {\n                    case \"status\":\n                        return fontData.status;\n                    default:\n                        return fontData.en;\n                }\n            })(font);\n            displayDict[name] = this;\n            this.process();\n        }\n        write() {\n            const size = this.size;\n            const d = this.direction * Math.PI / 180;\n            const input_str_length = this._.now.reduce((a, c) => a + c.str.length, 0);\n            let x = 0;\n            let y = 0;\n            let count = 0;\n            const charDataf = ((c) => {\n                if (c in this.font) {\n                    return this.font[c];\n                }\n                else {\n                    return this.font.space;\n                }\n            });\n            this._.now.forEach((e) => {\n                const s = e.str.split(\"\");\n                s.forEach((c) => {\n                    const charData = charDataf(c);\n                    if (c == \"\\n\") {\n                        x = 0;\n                        y += this.font.props.height_basic + e.spacing_y;\n                    }\n                    else {\n                        cLib.stamp(this.font.props.name + \"_\" + e.color, this.x + (Math.cos(d) * x - Math.sin(d) * (y + charData.gap / 2)) * size / 100, this.y + (Math.sin(d) * x + Math.cos(d) * (y + charData.gap / 2)) * size / 100, this.direction, size, 1, charData.left, charData.up, charData.width, charData.height);\n                        if (count + 1 < input_str_length)\n                            x += (charData.width + charDataf(this._.all_str[count + 1]).width) / 2 + this.font.props.width_basic + e.spacing_x;\n                    }\n                    count++;\n                });\n            });\n            return this;\n        }\n        ;\n        process() {\n            const input_str_length = this.data.reduce((a, c) => a + c.str.length, 0);\n            if (this._.len_allow == input_str_length && inputKeys.z) {\n                delete displayDict[this.name];\n                return;\n            }\n            else if (inputKeys.x) {\n                this._.len_allow = input_str_length;\n                this._.current_char = input_str_length;\n            }\n            else if (this._.len_allow < input_str_length) {\n                this._.len_allow += 1 / this.data[this._.count].speed;\n                this._.current_char += 1 / this.data[this._.count].speed;\n            }\n            while (this._.current_char_true < Math.min(this._.len_allow, input_str_length)) {\n                this._.now[this._.count].str += this.data[this._.count].str[this._.now[this._.count].str.length];\n                this._.current_char_true++;\n                while (this.data[this._.count].str.length <= this._.now[this._.count].str.length) {\n                    if (this._.count + 1 < this.data.length) {\n                        this._.count++;\n                        this._.now.push({\n                            str: \"\",\n                            color: ((this.data[this._.count].color === undefined) ? \"white\" : this.data[this._.count].color),\n                            spacing_x: this.data[this._.count].spacing_x,\n                            spacing_y: this.data[this._.count].spacing_y\n                        });\n                        this._.current_char -= this.data[this._.count].str.length;\n                    }\n                    else {\n                        break;\n                    }\n                    ;\n                }\n                ;\n            }\n            ;\n        }\n    }\n    ;\n    class Plane extends Font {\n        constructor(name, str, x, y, d, size, color, spacing_x, spacing_y, speed, font) {\n            super(name);\n            this.str_now = \"\";\n            this.len_now = 0;\n            this.str = str;\n            this.x = x;\n            this.y = y;\n            this.direction = d;\n            this.size = size;\n            this.color = color;\n            this.spacing_x = spacing_x;\n            this.spacing_y = spacing_y;\n            this.speed = speed;\n            this.font = ((f) => {\n                switch (f) {\n                    case \"status\":\n                        return fontData.status;\n                    default:\n                        return fontData.en;\n                }\n            })(font);\n            this.len_allow = 0;\n            displayDict[name] = this;\n            this.process();\n        }\n        write() {\n            const chars = this.str_now;\n            const size = this.size;\n            const d = this.direction * Math.PI / 180;\n            let x, y;\n            [x, y] = [0, 0];\n            const charDataf = ((c) => {\n                if (c in this.font) {\n                    return this.font[c];\n                }\n                else {\n                    return this.font.space;\n                }\n            });\n            for (let i = 0; i < chars.length; i++) {\n                const charData = charDataf(chars[i]);\n                if (chars[i] == \"\\n\") {\n                    x = 0;\n                    y += this.font.props.height_basic + this.spacing_y;\n                }\n                else {\n                    cLib.stamp(this.font.props.name + \"_\" + (!this.color ? \"white\" : this.color), this.x + (Math.cos(d) * x - Math.sin(d) * (y + charData.gap / 2)) * size / 100, this.y + (Math.sin(d) * x + Math.cos(d) * (y + charData.gap / 2)) * size / 100, this.direction, size, 1, charData.left, charData.up, charData.width, charData.height);\n                    if (i + 1 < chars.length)\n                        x += (charData.width + charDataf(chars[i + 1]).width) / 2 + this.font.props.width_basic + this.spacing_x;\n                }\n                ;\n            }\n            ;\n            return this;\n        }\n        ;\n        process() {\n            if (this.len_allow == this.str.length && inputKeys.z) {\n                delete displayDict[this.name];\n                return;\n            }\n            else if (inputKeys.x) {\n                this.len_allow = this.str.length;\n            }\n            else if (this.len_allow < this.str.length) {\n                this.len_allow += 1 / this.speed;\n            }\n            while (this.str_now.length < Math.min(this.len_allow, this.str.length)) {\n                this.str_now += this.str[this.str_now.length];\n            }\n            ;\n        }\n    }\n    ;\n    const process = () => {\n        for (const name in displayDict) {\n            displayDict[name].process();\n        }\n        ;\n    };\n    /*\n     *Template\n     *new FontSuper(\"name\", 64, 128, 0, 400, \"determination\", [\n     *    { str: \"text\", color: \"white\", spacing_x: 0, spacing_y: 0, speed: 2 },\n     *])\n     */\n    return {\n        Super,\n        Plane,\n        process,\n        dict: displayDict,\n    };\n};\n\n\n//# sourceURL=webpack://ut_battle_engine_ts/./src/font.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.json */ \"./src/config.json\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core */ \"./src/core.ts\");\n/* harmony import */ var _lib_canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/canvas */ \"./src/lib/canvas.ts\");\n/* harmony import */ var _box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./box */ \"./src/box.ts\");\n/* harmony import */ var _bone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bone */ \"./src/bone.ts\");\n/* harmony import */ var _font__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./font */ \"./src/font.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\n\nwindow.onload = () => __awaiter(void 0, void 0, void 0, function* () {\n    yield _core__WEBPACK_IMPORTED_MODULE_1__.Core.init(_config_json__WEBPACK_IMPORTED_MODULE_0__);\n    const cLib = (0,_lib_canvas__WEBPACK_IMPORTED_MODULE_2__.cLibGen)(_core__WEBPACK_IMPORTED_MODULE_1__.Core.ctx, _core__WEBPACK_IMPORTED_MODULE_1__.Core.Images, _config_json__WEBPACK_IMPORTED_MODULE_0__);\n    cLib.stamp(\"bananahexagon\", 60, 160);\n    const Box = (0,_box__WEBPACK_IMPORTED_MODULE_3__.boxFnsGen)(cLib);\n    const Bone = (0,_bone__WEBPACK_IMPORTED_MODULE_4__.boneFnsGen)(cLib);\n    const Font = (0,_font__WEBPACK_IMPORTED_MODULE_5__.fontFnsGen)(cLib, _core__WEBPACK_IMPORTED_MODULE_1__.Core.inputKeys);\n    let Game = {\n        player: {\n            x: 0,\n            y: 0,\n        }\n    };\n    const boxObj = {\n        center: {\n            x: 320,\n            y: 240,\n        },\n        width: 30,\n        height: 120,\n        direction: 0,\n    };\n    const box = Box.boxGet(boxObj);\n    new Bone.normal(\"bone1\", 170, 240, 60, 150, 0, 0, -2, 0, Infinity, \"white\", 200);\n    const update = () => {\n        _core__WEBPACK_IMPORTED_MODULE_1__.Core.ctx.clearRect(0, 0, _core__WEBPACK_IMPORTED_MODULE_1__.Core.canvas.width, _core__WEBPACK_IMPORTED_MODULE_1__.Core.canvas.height);\n        if (_core__WEBPACK_IMPORTED_MODULE_1__.Core.inputKeys.up)\n            Game.player.y -= 3;\n        if (_core__WEBPACK_IMPORTED_MODULE_1__.Core.inputKeys.down)\n            Game.player.y += 3;\n        if (_core__WEBPACK_IMPORTED_MODULE_1__.Core.inputKeys.left)\n            Game.player.x -= 3;\n        if (_core__WEBPACK_IMPORTED_MODULE_1__.Core.inputKeys.right)\n            Game.player.x += 3;\n        box.forEach(e => {\n            e.drawWhite();\n            [Game.player.x, Game.player.y] = e.calc(Game.player.x, Game.player.y);\n        });\n        box.forEach(e => {\n            e.drawBlack();\n        });\n        Bone.process();\n        new Font.Plane(\"test\", \"MEGALOVANIA\", 100, 200, 30, 200, \"white\", 0, 0, 0, \"determination\").write().delete();\n        cLib.stamp(\"soul\", Game.player.x, Game.player.y);\n        window.requestAnimationFrame(update);\n    };\n    window.requestAnimationFrame(update);\n});\n\n\n//# sourceURL=webpack://ut_battle_engine_ts/./src/index.ts?");

/***/ }),

/***/ "./src/lib/canvas.ts":
/*!***************************!*\
  !*** ./src/lib/canvas.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   cLibGen: () => (/* binding */ cLibGen)\n/* harmony export */ });\nconst cLibGen = (ctx, Images, config) => {\n    const stamp = (name, dx, dy, dd = 0, size = 100, wh = 1, sx = 0, sy = 0, sw = undefined, sh = undefined) => {\n        const costume = Images[name];\n        const sw2 = sw != undefined ? sw : costume.width - sx;\n        const sh2 = sh != undefined ? sh : costume.height - sy;\n        ctx.save();\n        ctx.translate((dx) * config.display_quality, (dy) * config.display_quality);\n        ctx.rotate(dd * Math.PI / 180);\n        ctx.drawImage(costume, sx, sy, sw2, sh2, (-sw2 * size * wh / 200) * config.display_quality, (-sh2 * size / 200) * config.display_quality, (sw2 * size * wh / 100) * config.display_quality, (sh2 * size / 100) * config.display_quality);\n        ctx.restore();\n    };\n    const drawRect = (dx, dy, width, height, color, direction = 0, type = 1) => {\n        ctx.save();\n        ctx.translate((dx + width * type / 2) * config.display_quality, (dy + height * type / 2) * config.display_quality);\n        ctx.rotate(direction * Math.PI / 180);\n        ctx.beginPath();\n        ctx.rect((-width * type / 2) * config.display_quality, (-height * type / 2) * config.display_quality, (width) * config.display_quality, (height) * config.display_quality);\n        ctx.fillStyle = color;\n        ctx.fill();\n        ctx.restore();\n    };\n    const drawLine = (lx, ly, d, len, width, color, type = 0) => {\n        ctx.beginPath();\n        switch (type) {\n            case 0:\n                {\n                    ctx.moveTo((lx - len * Math.sin(d) / 2) * config.display_quality, (ly + len * Math.cos(d) / 2) * config.display_quality);\n                    ctx.lineTo((lx + len * Math.sin(d) / 2) * config.display_quality, (ly - len * Math.cos(d) / 2) * config.display_quality);\n                }\n                break;\n            case 1:\n                {\n                    ctx.moveTo(lx * config.display_quality, ly * config.display_quality);\n                    ctx.lineTo((lx + len * Math.sin(d)) * config.display_quality, (ly - len * Math.cos(d)) * config.display_quality);\n                }\n                break;\n        }\n        ctx.strokeStyle = color;\n        ctx.lineWidth = width * config.display_quality;\n        ctx.stroke();\n    };\n    return {\n        stamp,\n        drawRect,\n        drawLine,\n    };\n};\n\n\n//# sourceURL=webpack://ut_battle_engine_ts/./src/lib/canvas.ts?");

/***/ }),

/***/ "./src/config.json":
/*!*************************!*\
  !*** ./src/config.json ***!
  \*************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"display_quality\":2}');\n\n//# sourceURL=webpack://ut_battle_engine_ts/./src/config.json?");

/***/ }),

/***/ "./src/data/font_en.json":
/*!*******************************!*\
  !*** ./src/data/font_en.json ***!
  \*******************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"0\":{\"left\":0,\"up\":18,\"width\":6,\"height\":9,\"gap\":0},\"1\":{\"left\":10,\"up\":18,\"width\":6,\"height\":9,\"gap\":0},\"2\":{\"left\":20,\"up\":18,\"width\":6,\"height\":9,\"gap\":0},\"3\":{\"left\":30,\"up\":18,\"width\":6,\"height\":9,\"gap\":0},\"4\":{\"left\":40,\"up\":18,\"width\":6,\"height\":9,\"gap\":0},\"5\":{\"left\":50,\"up\":18,\"width\":6,\"height\":9,\"gap\":0},\"6\":{\"left\":60,\"up\":18,\"width\":6,\"height\":9,\"gap\":0},\"7\":{\"left\":70,\"up\":18,\"width\":6,\"height\":9,\"gap\":0},\"8\":{\"left\":80,\"up\":18,\"width\":6,\"height\":9,\"gap\":0},\"9\":{\"left\":90,\"up\":18,\"width\":6,\"height\":9,\"gap\":0},\"props\":{\"height_basic\":15,\"width_basic\":2,\"name\":\"determination\"},\"A\":{\"left\":10,\"up\":34,\"width\":6,\"height\":9,\"gap\":0},\"B\":{\"left\":20,\"up\":34,\"width\":6,\"height\":9,\"gap\":0},\"C\":{\"left\":30,\"up\":34,\"width\":6,\"height\":9,\"gap\":0},\"D\":{\"left\":40,\"up\":34,\"width\":6,\"height\":9,\"gap\":0},\"E\":{\"left\":50,\"up\":34,\"width\":6,\"height\":9,\"gap\":0},\"F\":{\"left\":60,\"up\":34,\"width\":6,\"height\":9,\"gap\":0},\"G\":{\"left\":70,\"up\":34,\"width\":6,\"height\":9,\"gap\":0},\"H\":{\"left\":80,\"up\":34,\"width\":6,\"height\":9,\"gap\":0},\"I\":{\"left\":90,\"up\":34,\"width\":6,\"height\":9,\"gap\":0},\"J\":{\"left\":100,\"up\":34,\"width\":6,\"height\":9,\"gap\":0},\"K\":{\"left\":110,\"up\":34,\"width\":6,\"height\":9,\"gap\":0},\"L\":{\"left\":120,\"up\":34,\"width\":6,\"height\":9,\"gap\":0},\"M\":{\"left\":130,\"up\":34,\"width\":7,\"height\":9,\"gap\":0},\"N\":{\"left\":140,\"up\":34,\"width\":6,\"height\":9,\"gap\":0},\"O\":{\"left\":150,\"up\":34,\"width\":6,\"height\":9,\"gap\":0},\"P\":{\"left\":0,\"up\":50,\"width\":6,\"height\":9,\"gap\":0},\"Q\":{\"left\":10,\"up\":50,\"width\":6,\"height\":9,\"gap\":0},\"R\":{\"left\":20,\"up\":50,\"width\":6,\"height\":9,\"gap\":0},\"S\":{\"left\":30,\"up\":50,\"width\":6,\"height\":9,\"gap\":0},\"T\":{\"left\":40,\"up\":50,\"width\":6,\"height\":9,\"gap\":0},\"U\":{\"left\":50,\"up\":50,\"width\":6,\"height\":9,\"gap\":0},\"V\":{\"left\":60,\"up\":50,\"width\":6,\"height\":9,\"gap\":0},\"W\":{\"left\":70,\"up\":50,\"width\":7,\"height\":9,\"gap\":0},\"X\":{\"left\":80,\"up\":50,\"width\":6,\"height\":9,\"gap\":0},\"Y\":{\"left\":90,\"up\":50,\"width\":6,\"height\":9,\"gap\":0},\"Z\":{\"left\":100,\"up\":50,\"width\":6,\"height\":9,\"gap\":0},\"a\":{\"left\":10,\"up\":68,\"width\":6,\"height\":7,\"gap\":2},\"b\":{\"left\":20,\"up\":66,\"width\":6,\"height\":9,\"gap\":0},\"c\":{\"left\":30,\"up\":68,\"width\":6,\"height\":7,\"gap\":2},\"d\":{\"left\":40,\"up\":66,\"width\":6,\"height\":9,\"gap\":0},\"e\":{\"left\":50,\"up\":68,\"width\":6,\"height\":7,\"gap\":2},\"f\":{\"left\":60,\"up\":66,\"width\":6,\"height\":9,\"gap\":0},\"g\":{\"left\":70,\"up\":68,\"width\":6,\"height\":10,\"gap\":5},\"h\":{\"left\":80,\"up\":66,\"width\":6,\"height\":9,\"gap\":0},\"i\":{\"left\":90,\"up\":65,\"width\":6,\"height\":10,\"gap\":-1},\"j\":{\"left\":100,\"up\":65,\"width\":6,\"height\":13,\"gap\":2},\"k\":{\"left\":110,\"up\":66,\"width\":6,\"height\":9,\"gap\":0},\"l\":{\"left\":120,\"up\":66,\"width\":6,\"height\":9,\"gap\":0},\"m\":{\"left\":130,\"up\":68,\"width\":7,\"height\":7,\"gap\":2},\"n\":{\"left\":140,\"up\":68,\"width\":6,\"height\":7,\"gap\":2},\"o\":{\"left\":150,\"up\":68,\"width\":6,\"height\":7,\"gap\":2},\"p\":{\"left\":0,\"up\":84,\"width\":6,\"height\":10,\"gap\":5},\"q\":{\"left\":10,\"up\":84,\"width\":6,\"height\":10,\"gap\":5},\"r\":{\"left\":20,\"up\":84,\"width\":6,\"height\":7,\"gap\":2},\"s\":{\"left\":30,\"up\":84,\"width\":6,\"height\":7,\"gap\":2},\"t\":{\"left\":40,\"up\":82,\"width\":6,\"height\":9,\"gap\":0},\"u\":{\"left\":50,\"up\":84,\"width\":6,\"height\":7,\"gap\":2},\"v\":{\"left\":60,\"up\":84,\"width\":6,\"height\":7,\"gap\":2},\"w\":{\"left\":70,\"up\":84,\"width\":7,\"height\":7,\"gap\":2},\"x\":{\"left\":80,\"up\":84,\"width\":6,\"height\":7,\"gap\":2},\"y\":{\"left\":90,\"up\":84,\"width\":6,\"height\":10,\"gap\":5},\"z\":{\"left\":100,\"up\":84,\"width\":6,\"height\":7,\"gap\":2},\"space\":{\"left\":0,\"up\":0,\"width\":1,\"height\":1,\"gap\":0},\"irregular\":{\"left\":150,\"up\":82,\"width\":6,\"height\":9,\"gap\":0},\"!\":{\"left\":10,\"up\":1,\"width\":4,\"height\":10,\"gap\":-1},\"\\\\\"\":{\"left\":20,\"up\":2,\"width\":5,\"height\":4,\"gap\":-5},\"#\":{\"left\":30,\"up\":2,\"width\":7,\"height\":9,\"gap\":0},\"$\":{\"left\":40,\"up\":0,\"width\":6,\"height\":13,\"gap\":0},\"%\":{\"left\":50,\"up\":2,\"width\":7,\"height\":9,\"gap\":0},\"&\":{\"left\":60,\"up\":2,\"width\":7,\"height\":9,\"gap\":0},\"\\'\":{\"left\":70,\"up\":2,\"width\":2,\"height\":4,\"gap\":-5},\"(\":{\"left\":80,\"up\":2,\"width\":4,\"height\":9,\"gap\":0},\")\":{\"left\":90,\"up\":2,\"width\":4,\"height\":9,\"gap\":0},\"*\":{\"left\":100,\"up\":4,\"width\":8,\"height\":5,\"gap\":0},\"+\":{\"left\":110,\"up\":4,\"width\":6,\"height\":5,\"gap\":0},\",\":{\"left\":120,\"up\":9,\"width\":2,\"height\":4,\"gap\":9},\"-\":{\"left\":130,\"up\":6,\"width\":5,\"height\":1,\"gap\":0},\".\":{\"left\":140,\"up\":9,\"width\":2,\"height\":2,\"gap\":7},\"/\":{\"left\":150,\"up\":2,\"width\":6,\"height\":10,\"gap\":1},\":\":{\"left\":100,\"up\":20,\"width\":2,\"height\":7,\"gap\":2},\";\":{\"left\":110,\"up\":20,\"width\":2,\"height\":9,\"gap\":4},\"<\":{\"left\":120,\"up\":18,\"width\":5,\"height\":9,\"gap\":0},\"=\":{\"left\":130,\"up\":21,\"width\":5,\"height\":3,\"gap\":0},\">\":{\"left\":140,\"up\":18,\"width\":5,\"height\":9,\"gap\":0},\"?\":{\"left\":150,\"up\":18,\"width\":6,\"height\":9,\"gap\":0},\"@\":{\"left\":0,\"up\":34,\"width\":6,\"height\":9,\"gap\":0},\"[\":{\"left\":110,\"up\":50,\"width\":4,\"height\":9,\"gap\":0},\"\\\\\\\\\":{\"left\":120,\"up\":50,\"width\":6,\"height\":10,\"gap\":1},\"]\":{\"left\":130,\"up\":50,\"width\":4,\"height\":9,\"gap\":0},\"^\":{\"left\":140,\"up\":49,\"width\":6,\"height\":4,\"gap\":-5},\"_\":{\"left\":150,\"up\":61,\"width\":4,\"height\":1,\"gap\":14},\"`\":{\"left\":10,\"up\":68,\"width\":3,\"height\":2,\"gap\":2},\"{\":{\"left\":110,\"up\":82,\"width\":5,\"height\":9,\"gap\":0},\"|\":{\"left\":120,\"up\":82,\"width\":2,\"height\":9,\"gap\":0},\"}\":{\"left\":130,\"up\":82,\"width\":5,\"height\":9,\"gap\":0},\"~\":{\"left\":140,\"up\":85,\"width\":7,\"height\":2,\"gap\":-1}}');\n\n//# sourceURL=webpack://ut_battle_engine_ts/./src/data/font_en.json?");

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "ut_battle_engine_ts:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkut_battle_engine_ts"] = self["webpackChunkut_battle_engine_ts"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
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
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

/***/ "./src/canvas_lib.ts":
/*!***************************!*\
  !*** ./src/canvas_lib.ts ***!
  \***************************/
/***/ ((module) => {

eval("\nmodule.exports = (ctx, Images) => {\n    const stamp = (name, dx, dy, dd = 0, size = 100, wh = 1, sx = 0, sy = 0, sw = undefined, sh = undefined) => {\n        const costume = Images[name];\n        const sw2 = sw != undefined ? sw : costume.width - sx;\n        const sh2 = sh != undefined ? sh : costume.height - sy;\n        ctx.save();\n        ctx.translate(dx, dy);\n        ctx.rotate(dd * Math.PI / 180);\n        ctx.drawImage(costume, sx, sy, sw2, sh2, -sw2 * size * wh / 200, -sh2 * size / 200, sw2 * size * wh / 100, sh2 * size / 100);\n        ctx.restore();\n    };\n    const drawRect = (dx, dy, width, heigth, color, direction = 0, type = 1) => {\n        ctx.save();\n        ctx.translate(dx + width * type / 2, dy + heigth * type / 2);\n        ctx.rotate(direction * Math.PI / 180);\n        ctx.beginPath();\n        ctx.rect(-width * type / 2, -heigth * type / 2, width, heigth);\n        ctx.fillStyle = color;\n        ctx.fill();\n        ctx.restore();\n    };\n    const drawLine = (lx, ly, d, len, width, color, type = 0) => {\n        ctx.beginPath();\n        switch (type) {\n            case 0:\n                {\n                    ctx.moveTo(lx * 2 - len * Math.sin(d), ly * 2 + len * Math.cos(d));\n                    ctx.lineTo(lx * 2 + len * Math.sin(d), ly * 2 - len * Math.cos(d));\n                }\n                break;\n            case 1:\n                {\n                    ctx.moveTo(lx * 2, ly * 2);\n                    ctx.lineTo(lx * 2 + len * Math.sin(d) * 2, ly * 2 - len * Math.cos(d) * 2);\n                }\n                break;\n        }\n        ctx.strokeStyle = color;\n        ctx.lineWidth = width;\n        ctx.stroke();\n    };\n    return {\n        stamp,\n        drawRect,\n        drawLine,\n    };\n};\n\n\n//# sourceURL=webpack://ut_battle_engine_ts/./src/canvas_lib.ts?");

/***/ }),

/***/ "./src/core.ts":
/*!*********************!*\
  !*** ./src/core.ts ***!
  \*********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nconst Core = (() => {\n    let canvas = document.getElementById(\"canvas\");\n    let ctx = canvas.getContext(\"2d\");\n    let Images = {};\n    let Audios = {};\n    let inputKeys = {\n        up: false, down: false, left: false, right: false, z: false, x: false, c: false,\n    };\n    const loadAssets = () => __awaiter(void 0, void 0, void 0, function* () {\n        const index = __webpack_require__(/*! ./assets.json */ \"./src/assets.json\");\n        let promises = [];\n        index.forEach((e) => promises.push(new Promise((resolve) => {\n            switch (e.type) {\n                case \"image\":\n                    {\n                        let image = new Image();\n                        image.src = e.src;\n                        image.onload = () => {\n                            Images[e.name] = image;\n                            resolve();\n                        };\n                    }\n                    break;\n                case \"audio\":\n                    {\n                        let audio = new Audio();\n                        audio.src = e.src;\n                        audio.onload = () => {\n                            Audios[e.name] = audio;\n                            resolve();\n                        };\n                    }\n                    break;\n            }\n        })));\n        yield Promise.all(promises);\n    });\n    const init = () => __awaiter(void 0, void 0, void 0, function* () {\n        canvas.height = 480;\n        canvas.width = 640;\n        window.addEventListener(\"keydown\", e => {\n            switch (e.key) {\n                case \"ArrowUp\":\n                    inputKeys.up = true;\n                    break;\n                case \"ArrowDown\":\n                    inputKeys.down = true;\n                    break;\n                case \"ArrowLeft\":\n                    inputKeys.left = true;\n                    break;\n                case \"ArrowRight\":\n                    inputKeys.right = true;\n                    break;\n                case \"z\":\n                case \"Z\":\n                    inputKeys.z = true;\n                    break;\n                case \"x\":\n                case \"X\":\n                    inputKeys.x = true;\n                    break;\n                case \"c\":\n                case \"C\":\n                    inputKeys.c = true;\n            }\n        });\n        window.addEventListener(\"keyup\", e => {\n            switch (e.key) {\n                case \"ArrowUp\":\n                    inputKeys.up = false;\n                    break;\n                case \"ArrowDown\":\n                    inputKeys.down = false;\n                    break;\n                case \"ArrowLeft\":\n                    inputKeys.left = false;\n                    break;\n                case \"ArrowRight\":\n                    inputKeys.right = false;\n                    break;\n                case \"z\":\n                case \"Z\":\n                    inputKeys.z = false;\n                    break;\n                case \"x\":\n                case \"X\":\n                    inputKeys.x = false;\n                    break;\n                case \"c\":\n                case \"C\":\n                    inputKeys.c = false;\n            }\n        });\n        yield loadAssets();\n    });\n    return {\n        canvas,\n        ctx,\n        Images,\n        Audios,\n        loadAssets,\n        inputKeys,\n        init,\n    };\n})();\nmodule.exports = Core;\n\n\n//# sourceURL=webpack://ut_battle_engine_ts/./src/core.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nwindow.onload = () => __awaiter(void 0, void 0, void 0, function* () {\n    let Core = __webpack_require__(/*! ./core */ \"./src/core.ts\");\n    yield Core.init();\n    const cLib = __webpack_require__(/*! ./canvas_lib.ts */ \"./src/canvas_lib.ts\")(Core.ctx, Core.Images);\n    cLib.stamp(\"bananahexagon\", 60, 160);\n});\n\n\n//# sourceURL=webpack://ut_battle_engine_ts/./src/index.ts?");

/***/ }),

/***/ "./src/assets.json":
/*!*************************!*\
  !*** ./src/assets.json ***!
  \*************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('[{\"name\":\"bananahexagon\",\"type\":\"image\",\"src\":\"./assets/normal_icon.png\"}]');\n\n//# sourceURL=webpack://ut_battle_engine_ts/./src/assets.json?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
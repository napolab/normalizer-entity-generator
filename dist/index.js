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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var ts = __importStar(require("typescript"));
var path_1 = require("path");
var splitext_1 = require("./utils/path/splitext");
var replaceLastDir_1 = require("./utils/path/replaceLastDir");
var readdir_1 = require("./utils/promise/readdir");
var mkdir_1 = require("./utils/promise/mkdir");
var nodeToString_1 = require("./utils/ts/nodeToString");
var createInterfaceDeclaration_1 = require("./factory/createInterfaceDeclaration");
var createEntity_1 = require("./factory/createEntity/");
var createImportForLocalEntity_1 = require("./factory/createImportForLocalEntity");
function createInterface(sourceFile) {
    return sourceFile
        .getChildAt(0)
        .getChildren()
        .filter(ts.isInterfaceDeclaration)
        .map(createInterfaceDeclaration_1.createInterfaceDeclaration);
}
function createEntity(sourceFile) {
    return sourceFile
        .getChildAt(0)
        .getChildren()
        .filter(ts.isInterfaceDeclaration)
        .map(createEntity_1.createEntityStatementForEntity);
}
function createExportStatement(sourceFile) {
    return sourceFile
        .getChildAt(0)
        .getChildren()
        .filter(ts.isInterfaceDeclaration)
        .map(createImportForLocalEntity_1.createImportForLocalEntity)
        .reduce(function (a, b) { return __spreadArrays(a, b); });
}
function execute(inputPath) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, ext, outputPath, program, sourceFile;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = splitext_1.splitext(inputPath), name = _a[0], ext = _a[1];
                    outputPath = replaceLastDir_1.replaceLastDir(inputPath, "normalizer");
                    program = ts.createProgram([inputPath], {});
                    program.getTypeChecker();
                    sourceFile = program.getSourceFile(inputPath);
                    if (!sourceFile)
                        return [2 /*return*/];
                    return [4 /*yield*/, mkdir_1.mkdirPromise(outputPath)];
                case 1:
                    _b.sent();
                    fs.writeFileSync(path_1.join(outputPath, name.replace(".interface", "") + "." + ext), [
                        nodeToString_1.nodeToString([createEntity_1.createImportStatementForEntity()], sourceFile),
                        nodeToString_1.nodeToString(createExportStatement(sourceFile), sourceFile),
                        nodeToString_1.nodeToString(createInterface(sourceFile), sourceFile),
                        nodeToString_1.nodeToString(createEntity(sourceFile), sourceFile)
                    ].join("\n"));
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var files, targetFiles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readdir_1.readDirPromise(path_1.join(process.cwd(), "src", "entities"))];
                case 1:
                    files = _a.sent();
                    targetFiles = files.filter(function (s) { return s.includes("interface"); });
                    targetFiles.forEach(execute);
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (err) {
    console.error(err);
    process.exit(1);
});

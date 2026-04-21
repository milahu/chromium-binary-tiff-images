// This code implements the `-sMODULARIZE` settings by taking the generated
// JS program code (INNER_JS_CODE) and wrapping it in a factory function.

// Single threaded MINIMAL_RUNTIME programs do not need access to
// document.currentScript, so a simple export declaration is enough.
var create_ccitt_g4_tiff_module = (() => {
  // When MODULARIZE this JS may be executed later,
  // after document.currentScript is gone, so we save it.
  // In EXPORT_ES6 mode we can just use 'import.meta.url'.
  var _scriptName = globalThis.document?.currentScript?.src;
  return async function(moduleArg = {}) {
    var moduleRtn;

// include: shell.js
// include: minimum_runtime_check.js
(function() {
  // "30.0.0" -> 300000
  function humanReadableVersionToPacked(str) {
    str = str.split('-')[0]; // Remove any trailing part from e.g. "12.53.3-alpha"
    var vers = str.split('.').slice(0, 3);
    while(vers.length < 3) vers.push('00');
    vers = vers.map((n, i, arr) => n.padStart(2, '0'));
    return vers.join('');
  }
  // 300000 -> "30.0.0"
  var packedVersionToHumanReadable = n => [n / 10000 | 0, (n / 100 | 0) % 100, n % 100].join('.');

  var TARGET_NOT_SUPPORTED = 2147483647;

  // Note: We use a typeof check here instead of optional chaining using
  // globalThis because older browsers might not have globalThis defined.
  var currentNodeVersion = typeof process !== 'undefined' && process.versions?.node ? humanReadableVersionToPacked(process.versions.node) : TARGET_NOT_SUPPORTED;
  if (currentNodeVersion < 160000) {
    throw new Error(`This emscripten-generated code requires node v${ packedVersionToHumanReadable(160000) } (detected v${packedVersionToHumanReadable(currentNodeVersion)})`);
  }

  var userAgent = typeof navigator !== 'undefined' && navigator.userAgent;
  if (!userAgent) {
    return;
  }

  var currentSafariVersion = userAgent.includes("Safari/") && !userAgent.includes("Chrome/") && userAgent.match(/Version\/(\d+\.?\d*\.?\d*)/) ? humanReadableVersionToPacked(userAgent.match(/Version\/(\d+\.?\d*\.?\d*)/)[1]) : TARGET_NOT_SUPPORTED;
  if (currentSafariVersion < 150000) {
    throw new Error(`This emscripten-generated code requires Safari v${ packedVersionToHumanReadable(150000) } (detected v${currentSafariVersion})`);
  }

  var currentFirefoxVersion = userAgent.match(/Firefox\/(\d+(?:\.\d+)?)/) ? parseFloat(userAgent.match(/Firefox\/(\d+(?:\.\d+)?)/)[1]) : TARGET_NOT_SUPPORTED;
  if (currentFirefoxVersion < 79) {
    throw new Error(`This emscripten-generated code requires Firefox v79 (detected v${currentFirefoxVersion})`);
  }

  var currentChromeVersion = userAgent.match(/Chrome\/(\d+(?:\.\d+)?)/) ? parseFloat(userAgent.match(/Chrome\/(\d+(?:\.\d+)?)/)[1]) : TARGET_NOT_SUPPORTED;
  if (currentChromeVersion < 85) {
    throw new Error(`This emscripten-generated code requires Chrome v85 (detected v${currentChromeVersion})`);
  }
})();

// end include: minimum_runtime_check.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(moduleArg) => Promise<Module>
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = moduleArg;

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = !!globalThis.window;
var ENVIRONMENT_IS_WORKER = !!globalThis.WorkerGlobalScope;
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = globalThis.process?.versions?.node && globalThis.process?.type != 'renderer';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)


var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

if (typeof __filename != 'undefined') { // Node
  _scriptName = __filename;
} else
if (ENVIRONMENT_IS_WORKER) {
  _scriptName = self.location.href;
}

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var readAsync, readBinary;

if (ENVIRONMENT_IS_NODE) {
  const isNode = globalThis.process?.versions?.node && globalThis.process?.type != 'renderer';
  if (!isNode) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require('fs');

  scriptDirectory = __dirname + '/';

// include: node_shell_read.js
readBinary = (filename) => {
  // We need to re-wrap `file://` strings to URLs.
  filename = isFileURI(filename) ? new URL(filename) : filename;
  var ret = fs.readFileSync(filename);
  assert(Buffer.isBuffer(ret));
  return ret;
};

readAsync = async (filename, binary = true) => {
  // See the comment in the `readBinary` function.
  filename = isFileURI(filename) ? new URL(filename) : filename;
  var ret = fs.readFileSync(filename, binary ? undefined : 'utf8');
  assert(binary ? Buffer.isBuffer(ret) : typeof ret == 'string');
  return ret;
};
// end include: node_shell_read.js
  if (process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, '/');
  }

  arguments_ = process.argv.slice(2);

  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };

} else
if (ENVIRONMENT_IS_SHELL) {

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  try {
    scriptDirectory = new URL('.', _scriptName).href; // includes trailing slash
  } catch {
    // Must be a `blob:` or `data:` URL (e.g. `blob:http://site.com/etc/etc`), we cannot
    // infer anything from them.
  }

  if (!(globalThis.window || globalThis.WorkerGlobalScope)) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  {
// include: web_or_worker_shell_read.js
if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);
      return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = async (url) => {
    // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
    // See https://github.com/github/fetch/pull/92#issuecomment-140665932
    // Cordova or Electron apps are typically loaded from a file:// url.
    // So use XHR on webview if URL is a file URL.
    if (isFileURI(url)) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = () => {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            resolve(xhr.response);
            return;
          }
          reject(xhr.status);
        };
        xhr.onerror = reject;
        xhr.send(null);
      });
    }
    var response = await fetch(url, { credentials: 'same-origin' });
    if (response.ok) {
      return response.arrayBuffer();
    }
    throw new Error(response.status + ' : ' + response.url);
  };
// end include: web_or_worker_shell_read.js
  }
} else
{
  throw new Error('environment detection error');
}

var out = console.log.bind(console);
var err = console.error.bind(console);

var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var FETCHFS = 'FETCHFS is no longer included by default; build with -lfetchfs.js';
var ICASEFS = 'ICASEFS is no longer included by default; build with -licasefs.js';
var JSFILEFS = 'JSFILEFS is no longer included by default; build with -ljsfilefs.js';
var OPFS = 'OPFS is no longer included by default; build with -lopfs.js';

var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';

// perform assertions in shell.js after we set up out() and err(), as otherwise
// if an assertion fails it cannot print the message

assert(!ENVIRONMENT_IS_SHELL, 'shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.');

// end include: shell.js

// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary;

if (!globalThis.WebAssembly) {
  err('no native wasm support detected');
}

// Wasm globals

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed' + (text ? ': ' + text : ''));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */
var isFileURI = (filename) => filename.startsWith('file://');

// include: runtime_common.js
// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max)>>2)] = 0x02135467;
  HEAPU32[(((max)+(4))>>2)] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAPU32[((0)>>2)] = 1668509029;
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = HEAPU32[((max)>>2)];
  var cookie2 = HEAPU32[(((max)+(4))>>2)];
  if (cookie1 != 0x02135467 || cookie2 != 0x89BACDFE) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[((0)>>2)] != 0x63736d65 /* 'emsc' */) {
    abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
  }
}
// end include: runtime_stack_check.js
// include: runtime_exceptions.js
// Base Emscripten EH error class
class EmscriptenEH extends Error {}

class EmscriptenSjLj extends EmscriptenEH {}

class CppException extends EmscriptenEH {
  constructor(excPtr) {
    super(excPtr);
    this.excPtr = excPtr;
    const excInfo = getExceptionMessage(excPtr);
    this.name = excInfo[0];
    this.message = excInfo[1];
  }
}
// end include: runtime_exceptions.js
// include: runtime_debug.js
var runtimeDebug = true; // Switch to false at runtime to disable logging at the right times

// Used by XXXXX_DEBUG settings to output debug messages.
function dbg(...args) {
  if (!runtimeDebug && typeof runtimeDebug != 'undefined') return;
  // TODO(sbc): Make this configurable somehow.  Its not always convenient for
  // logging to show up as warnings.
  console.warn(...args);
}

// Endianness check
(() => {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) abort('Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)');
})();

function consumedModuleProp(prop) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      set() {
        abort(`Attempt to set \`Module.${prop}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`);

      }
    });
  }
}

function makeInvalidEarlyAccess(name) {
  return () => assert(false, `call to '${name}' via reference taken before Wasm module initialization`);

}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === 'FS_createPath' ||
         name === 'FS_createDataFile' ||
         name === 'FS_createPreloadedFile' ||
         name === 'FS_preloadFile' ||
         name === 'FS_unlink' ||
         name === 'addRunDependency' ||
         // The old FS has some functionality that WasmFS lacks.
         name === 'FS_createLazyFile' ||
         name === 'FS_createDevice' ||
         name === 'removeRunDependency';
}

function missingLibrarySymbol(sym) {

  // Any symbol that is not included from the JS library is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        abort(msg);
      },
    });
  }
}

// end include: runtime_debug.js
// include: binaryDecode.js
// Prevent Closure from minifying the binaryDecode() function, or otherwise
// Closure may analyze through the WASM_BINARY_DATA placeholder string into this
// function, leading into incorrect results.
/** @noinline */
function binaryDecode(bin) {
  for (var i = 0, l = bin.length, o = new Uint8Array(l), c; i < l; ++i) {
    c = bin.charCodeAt(i);
    o[i] = ~c >> 8 & c; // Recover the null byte in a manner that is compatible with https://crbug.com/453961758
  }
  return o;
}
// end include: binaryDecode.js
var readyPromiseResolve, readyPromiseReject;

// Memory management
var
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

// BigInt64Array type is not correctly defined in closure
var
/** not-@type {!BigInt64Array} */
  HEAP64,
/* BigUint64Array type is not correctly defined in closure
/** not-@type {!BigUint64Array} */
  HEAPU64;

var runtimeInitialized = false;



function updateMemoryViews() {
  var b = wasmMemory.buffer;
  HEAP8 = new Int8Array(b);
  HEAP16 = new Int16Array(b);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(b);
  HEAPU16 = new Uint16Array(b);
  HEAP32 = new Int32Array(b);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(b);
  HEAPF32 = new Float32Array(b);
  HEAPF64 = new Float64Array(b);
  HEAP64 = new BigInt64Array(b);
  HEAPU64 = new BigUint64Array(b);
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// end include: runtime_common.js
assert(globalThis.Int32Array && globalThis.Float64Array && Int32Array.prototype.subarray && Int32Array.prototype.set,
       'JS engine does not provide full typed array support');

function preRun() {
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  consumedModuleProp('preRun');
  // Begin ATPRERUNS hooks
  callRuntimeCallbacks(onPreRuns);
  // End ATPRERUNS hooks
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  checkStackCookie();

  // No ATINITS hooks

  wasmExports['__wasm_call_ctors']();

  // No ATPOSTCTORS hooks
}

function postRun() {
  checkStackCookie();
   // PThreads reuse the runtime from the main thread.

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  consumedModuleProp('postRun');

  // Begin ATPOSTRUNS hooks
  callRuntimeCallbacks(onPostRuns);
  // End ATPOSTRUNS hooks
}

/** @param {string|number=} what */
function abort(what) {
  Module['onAbort']?.(what);

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // definition for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  readyPromiseReject?.(e);
  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// show errors on likely calls to FS when it was not included
var FS = {
  error() {
    abort('Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM');
  },
  init() { FS.error() },
  createDataFile() { FS.error() },
  createPreloadedFile() { FS.error() },
  createLazyFile() { FS.error() },
  open() { FS.error() },
  mkdev() { FS.error() },
  registerDevice() { FS.error() },
  analyzePath() { FS.error() },

  ErrnoError() { FS.error() },
};


function createExportWrapper(name, nargs) {
  return (...args) => {
    assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
    var f = wasmExports[name];
    assert(f, `exported native function \`${name}\` not found`);
    // Only assert for too many arguments. Too few can be valid since the missing arguments will be zero filled.
    assert(args.length <= nargs, `native function \`${name}\` called with ${args.length} args but expects ${nargs}`);
    return f(...args);
  };
}

var wasmBinaryFile;

function findWasmBinary() {
  return binaryDecode(' asm   Ç``|` `  ` ` ` `~~``` ``~` ` ```~`~ ``~~`||`~`~`|~`~~ `~~|``~£env__cxa_throw \nenv\r__assert_fail env	_abort_js wasi_snapshot_preview1fd_close 	wasi_snapshot_preview1fd_write wasi_snapshot_preview1fd_seek envemscripten_resize_heap 	env	invoke_ii env__cxa_find_matching_catch_3 	env__cxa_begin_catch 	envinvoke_v \renv\ninvoke_iii  env	invoke_vi env__cxa_find_matching_catch_2 env__resumeException \renvinvoke_viiii env\ninvoke_vii \nenvinvoke_viii 											\r\r	 \n		 			\n 	\r\r	\n			\r 		\n\r\n\n\r\n\n	 										\r	 \r		\r		 	\n				\n\r\r	\n	\n\r\n\n\r\r	 	\n				\n\r\r	\n	\n\r\n\n   \n 		\n 	\n		\n	\n 		 				\n\n\n \n \n \n \r\r		 			\r		  						\r\r	 \n \n		\n\r	\n\n 		 			 \r			\n \n		 	\n\r\r	\n	\n			 		  			  \n\n				 		 			    		    			 	\r\r\r	    \n	 	 \r 	\r		\r\r\r\n								\r	\r\r		\r	\r				\r	\r			\r\r\r\r 	  			\r		\r		\r					\r			\r	\r	\r		  	 				 	  	\n	 	 																\r													\n			 	 	 	  					   				 		\r\r 							 		 	\r		\n	\r		\n\n\n\n  \n \n\n\n  \n  	 \r \r\r \r\r\r				\r 	      \r\n\n\n\n  \n 			  					 		 					 	   		 		\r\r\r\r\r\r\r\r\r\r 	\r\r 		 	\r		   	\r\r		\r\r\r\r   \r       \r		\r \r \r\r\r\r\r \r\r\r\r\r\r\r \r\r \r\r\r \r\r\r\r\r 	 \r\r\r\r\r  	\r\r  			\r   \r\r \r \r \r  \r \r						 \r \r	 \r \r\r \r\r \r 			  	        \r\r\r	   \r\r \r \r\r \r \r \r \r  	 \r\r  \r  \r	\r \n	\r\n			 		\n\n\n\n  \n 	\n	p¤¤AA A A memory __wasm_call_ctors __indirect_function_table tiff_to_bmp hmalloc 	tiff_free free fflush strerror emscripten_stack_get_end emscripten_stack_get_base setThrew _emscripten_tempret_set emscripten_stack_init emscripten_stack_get_free _emscripten_stack_restore _emscripten_stack_alloc emscripten_stack_get_current __cxa_free_exception µ"__cxa_increment_exception_refcount ·"__cxa_decrement_exception_refcount ¹__get_exception_message __cxa_can_catch ê__cxa_get_exception_ptr ë	Ë A£ýöíãäæ§¬ÈÍÜÁÔ×ÕÖÛéçâØèæãñòôõîïúûþÿ¿ÁÂÅÇÊËêL¥×­¯±	²øîïðñòôõöú÷Çøúû¬®°²³´µ¢¥¦¨©«¬®¯±³¶·¹º¼½¿ÀÂÅÇÈßãåæëíõöùúüý				 	¡	¢	¤	¥	¦	¨	©	ª	¬	­	®	°	±	²	´	¶	¸	¹	»	¼	¿	À	Ã	Å	Ç	È	Ì	Í	Ï	Ð	Ò	Ó	Ö	×	Ý	Þ	à	á	ã	ä	æ	ç	ê	ë	í	î	ð	ñ	ó	ô	ù	ú	û	\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n \n¡\n©\nª\n°\n±\n³\n´\nµ\n·\n¸\n¹\n»\n¼\n½\nÁ\nÂ\nÌ\nÏ\nÐ\nÑ\nÒ\nÓ\nÔ\nÜ\nÝ\nß\nà\ná\næ\nç\né\nê\nì\ní\nñ\nò\nô\nõ\nö\n÷\nø\nú\nû\n¥¦¨©«¬­®¯¶·¹º¼½¾¿ÁÂÄÅÇÈÊËÍÎÓÔÖ×ÚÛÜÝßâçèéêíîðñóôö÷ùû\nºÚ	 ô# Að k! $    6l  6h  6d  6`@@ (h Aq\r  (dE\r  (`\rA± ! A °  Aô­ A     (d 6\\  (\\ (`l6X AÊ j  A"j   (d6 &  (`6 *  (X6 6  (XA¶j6 L A Aq: !      ( L     6 (!  ) J7  A!  j  AÊ jj)  7    (Aj6 (!  ) "7  A !	  	j 	 A"jj)  7  A!\n  \nj \n A"jj)  7  A!  j  A"jj)  7  A!  j  A"jj)  7    (A(j6 A 6@@ (AHAqE\r (!\r (!  Aj6  \r:   (! (!  Aj6  :   (! (!  Aj6  :   (!  Aj6 A :    (Aj6   (h 6  (`Ak6@@ (A NAqE\r  ( ( (dlj6 A 6@@ ( (dIAqE\r ( (j-  ! (!  Aj6  :    (Aj6   (d6@@ ( (\\IAqE\r (!  Aj6 A :    (Aj6   (Aj6  AAq: !@ - !Aq\r     Að j$ ,# Ak!   6 (! (  (FAq"# Ak!   6 (AjA|qF# Ak!   6 (! AÂ;   A 6  A ;  A ;  A¶6 \n o# Ak!   6 (! A(6   A 6  A 6  A;  A;  A 6  A 6  A6  A6  A 6   A 6 $ Q# Ak! $    6 (! A 6  A 6 A 6   Aj$  # Ak! $    6  6 (!   6@@ ( (IAqE\r   ( (k @ ( (KAqE\r   (  (j   Aj$ <# Ak! $    6 (( ¡ ! Aj$  <# Ak! $    6 (( ¡ ! Aj$  L# Ak! $    6 (! Aj ¢  Aj£  Aj$  <# Ak! $    6 (! ¯  Aj$  )# Ak!   6 (! ( ( kÅ# A k! $    6  6 (!@@ ( (k (OAqE\r   (©     (j° !  ! Aj   ±  (! Aj ²   Aj³  Aj´  A j$ _# Ak! $    6  6 (!   6  (µ   (¶  Aj$ # Ak!   6 (1# Ak!   6  6 (!  (6  y# Ak! $    6 (!@ ( ( A GAqE\r  ( ã  ( Á  (  ( (  ( ¼ Ç  Aj$ # A0k! $    6,  6(  6$  6   ($AjAv6 A Aq:    ($ ( l¥  A 6@@ ( ( IAqE\r  ((  ( (lj6 A 6@@ ( ($IAqE\r  ( (Avj-  :  - Aÿq! (Aq!  A kuAq: \n - \n!A ! Aÿq AÿqG!	A Aÿ 	Aq!\n   ( ($l (j¦  \n:    (Aj6   (Aj6  AAq: @ - Aq\r     A0j$ Ê# A k! $    6  6 (!  6 A 6  A 6 A 6   Aj ¢  (! Aj § @ (A KAqE\r   (¨   (©  Ajª  Aj«  (! A j$  ,# Ak!   6  6 ((  (jI# Ak! $    6  6  (6   (ä  Aj$ # Ak! $    6  6 (!@ ( º KAqE\r »   (!   ¾   ( 6   ( 6  (  (j6 A Ä  Aj$ ³# A k! $    6  6 (! (! Aj  ·   (6  (6@@ ( (GAqE\r  (¡ ¸  (Aj!  6  6  Aj¹  A j$ !# Ak!   6 (A: V# Ak! $    6 (!  6@ - Aq\r  £  (! Aj$  # Að k! $    6l  6h  6d  6`  (dAjAv6\\  (dAjAvAt6X A6T A>6P A Aq: O (X (`lA>j! A : N    AÎ j­     6H (HAÂ :   (HAÍ :     6D (HAj (D6   A>6@ (HA\nj (@6    (HAj6< A(68 (< (86    (d64 (<Aj (46    (`60 (<Aj (06   A;. (<Aj /.;   A;, (<Aj /,;   A 6( (<Aj ((6    (X (`l6$ (<Aj ($6   A6  (<Aj ( 6   A6 (<Aj ( 6    (HA6j6 (Aÿ:   (Aÿ:  (Aÿ:  (A :  (A :  (A :  (A :  (A :   (HA>j6  (h 6 A 6@@ ( (`IAqE\r  ( ( (\\lj6  ( (`Ak (k (Xlj6 (! (! (\\!@ E\r    ü\n    (Aj6  AAq: O@ - OAq\r     Að j$ Ö# A k! $    6  6  6 (!  6 A 6  A 6 A 6   Aj ¢  (! Aj § @ (A KAqE\r   (¨   ( (®  Ajª  Aj«  (! A j$  ¿# A k! $    6  6  6 (! (! Aj  ·   (6  (6 @@ (  (GAqE\r  ( ¡  (å  ( Aj!  6   6  Aj¹  A j$ # Ak!   6 (Á# A k! $    6  6 (!  º 6@ ( (KAqE\r »    ¼ 6@@ ( (AvOAqE\r   (6  (At6  Aj Aj½ ( 6 (! A j$  Ù# A k! $    6  6  6  6 (!  6 A 6  (6@@ (\r  A 6  (! (! Aj  ¾   (6   (6 (  (j!  6  6  (  (j6 (!	 A j$  	# A k! $    6  6 (! Aj! (! Aj  ¿ @@ ( (GAqE\r ( (¡ ¸   (Aj6  AjÀ  A j$ # Ak! $    6  6 (! Á  ((! ( ( k!  A  kj6  ( ¡  (¡  (¡ Â  (! ( 6  ( 6  (AjÃ  Aj (AjÃ  Aj (AjÃ  ((! ( 6    Ä  Aj$ r# Ak! $    6 (!  6 Å @ ( A GAqE\r  ( (  Æ Ç  (! Aj$  # Ak! $    6  6 (!  (6@@ ( (GAqE\r (Aj!  6  ¡ Þ    (6 Aj$ # Ak!   6  6X# Ak!   6  6  6 (!  (6   ((6  (( (j6 =# Ak! $    6  6 (È  Aj$ 1# Ak!   6 (! (! (  6 \\# Ak! $    6  (Ê 6 Ë 6 Aj AjÌ ( ! Aj$   A Í  )# Ak!   6 (! ( ( kE# Ak! $    6  6 ( (Î ! Aj$  P# Ak! $   6  6   ( (Õ 6    (6 Aj$ X# Ak!   6  6  6 (!  (( 6   ((  (j6  (6 1# Ak!   6 (! ( ! ( 6  # Ak!   6{# Ak! $    6  6  6  6  ( ¡ ! (¡ ! ( (kA t!@ E\r    ü\n   Aj$ P# Ak!   6  6  (( 6 (( ! ( 6  (! ( 6 # Ak!   6  6># Ak! $    6 (!  (Û  Aj$ )# Ak!   6 (! ( ( kM# Ak! $    6  6  6 ( ( (Ü  Aj$ 9# Ak! $    6 (É ! Aj$  \'# Ak!   6 (! A :   7# Ak! $    6Ð A v! Aj$  	 Ñ E# Ak! $    6  6 ( (Ï ! Aj$  K# Ak! $    6A± !  (Ô  AÔ­ A   p# Ak! $    6  6 (! (!@@ Aj  Ò AqE\r  (! (! ! Aj$  p# Ak! $    6  6 (! (!@@ Aj  Ò AqE\r  (! (! ! Aj$  	 Ó 	 Aÿÿÿÿ9# Ak!   6  6  6 ((  (( IAq AV# Ak! $    6  6 (!  (®  AÀ­ Aj6  Aj$  g# Ak! $    6  6 (!@ ( Ê KAqE\r Ö   (A× ! Aj$  ,A± !   ó   A¸¬ A   # A k! $    6  6  (A t6@@ (Ø AqE\r   (6  ( (Ù 6  (Ú 6 (! A j$  "# Ak!   6 (AKAqE# Ak! $    6  6 ( (£ ! Aj$  9# Ak! $    6 ( ! Aj$  A# Ak! $    6  6 ( (Ý  Aj$ J# Ak! $    6  6  6 ( (Aà  Aj$ y# Ak! $    6  6 (!@@ ( (GAqE\r (! (Aj!  6  ¡ Þ   Aj$ <# Ak! $    6  6 (ß  Aj$ # Ak!   6# A k! $    6  6  6  (A t6@@ (Ø AqE\r   (6 ( ( (á  ( (â  A j$ M# Ak! $    6  6  6 ( ( (¨  Aj$ A# Ak! $    6  6 ( (¢  Aj$ X# Ak! $    6 (!   6  ( µ   (¶  Aj$ 8# Ak!  6   6 (!  (6  A :  I# Ak! $    6  6  6 ( (æ  Aj$ E# Ak! $    6  6 ( (ç ! Aj$  4# Ak!   6  6 (!  (-  :   »# Ak! $    6|  6x  6t  6p (|! (x! A<j  é  A0j @@ (pAFAqE\r  A<jA(j! (<! (@!	 A$j   	¬  A0j A$jê  A$j  A<jA(j!\n (<! (@! Aj \n  ¤  (<!\r (@! Aj Aj \r   A0j Ajê  Aj  Aj  A0j ! (t 6   A0j  6 (! A0j ! A0j !@ E\r    ü\n   (! A0j  A<jë  Aj$  C# Aðk! $    6ì  6è  6ä (è! (ä! AØj  ì   AØjí ;Ö@@ /ÖAÿÿqAÉFAqE\r  A: Õ@@ /ÖAÿÿqAÍFAqE\r  A : ÕA± ! A¬ °  Aô­ A     AØjí ;Ò@ /ÒAÿÿqA*GAqE\r A± ! A× °  Aô­ A     AØjî 6Ì@ (Ì (äOAqE\r A± ! A °  Aô­ A    (Ì!	 AØj 	ï   AØjí ;Ê@@ /ÊAÿÿqE\r  /ÊAÿÿqA2JAqE\rA± !\n \nA °  \nAô­ A    A Aq: É  ð  A : È A : Ç A : Æ A : Å A 6À A 6¼ A 6¸ A 6´ A 6° A 6¬@@ (¬ /ÊAÿÿqHAqE\r  AØjí ;ª  AØjí ;¨  AØjî 6¤  AØjî 6 @ (¤\r A± ! AÑ °  Aô­ A    /ªA~j! AK@@@@@@@@@@@   (è!\r (ä! - Õ! /¨! (¤! ( !   \r  Aq Aÿÿq  ñ 6  A: È (è! (ä! - Õ! /¨! (¤! ( !     Aq Aÿÿq  ñ 6 A: Ç (è! (ä! - Õ! /¨! (¤! ( !     Aq Aÿÿq  ñ 6 (è! (ä!  - Õ!! /¨!" (¤!# ( !$      !Aq "Aÿÿq # $ñ ;$ (è!% (ä!& - Õ!\' /¨!( (¤!) ( !*   % & \'Aq (Aÿÿq ) *ñ ;&  (¤6À  ( 6¼ A: Æ  (¤6¸  ( 6´ A: Å (è!+ (ä!, - Õ!- /¨!. (¤!/ ( !0  + , -Aq .Aÿÿq / 0ñ 6°  (¬Aj6¬ @@ - ÈAqE\r  - ÇAq\rA± !1 1A´ °  1Aô­ A   @@ - ÆAqE\r  - ÅAq\rA± !2 2Aô °  2Aô­ A   @  /$AÿÿqAGAqE\r A± !3 3AÊ °  3Aô­ A   @  /&AÿÿqAGAqE\r A± !4 4Aß °  4Aô­ A   @  (AGAqE\r A± !5 5A® °  5Aô­ A   @@ (ÀE\r  (¸\rA± !6 6Aô °  6Aô­ A   @ (À (¸GAqE\r A± !7 7A °  7Aô­ A   @ (À (¸GAqE\r A± !8 8A °  8Aô­ A   @ (°\r    (6°  Aèj6  Aäj6 (À!9 (¼!: Aj Aj 9 :ò   Aj Ajó  Ajô  (¸!; (´!< Aj Aj ; <ò   Aj Ajó  Ajô  A 6|@@ (|  Ajõ IAqE\r   Aj (|ö ( 6x   Aj (|ö ( 6t@@ (xE\r  (t\rA± != =A¥ °  =Aô­ A   @ (x­ (t­| (ä­VAqE\r A± !> >AØ °  >Aô­ A     (|Aj6|  Aè j÷  A 6d@@ (d  Ajõ IAqE\r  (è  Aj (dö ( j6\\   Aj (dö ( 6` Aè j AÜ jø   (dAj6d  AÐ j   (   (l!? AÐ j ?ù  A 6L  ( !@ A : ? AÀ j @ A?j­  A 68@@ (8 Aè jú IAqE\r (8!A  Aè j Aû 64   ( (Lk6,  A°j A,jü ( 60 A j  (0  ( l!B A j Bù   (4(  (4(  (  (° A jÏ 6  AÐ jý 6 Aj Ajþ   A jÿ 6  A jý 6 (!C (!D (!E  AÐ j C D E 6  (0 (Lj6L A j   (8Aj68   A(j AÐ jê  AAq: É AÀ j  AÐ j  Aè j @ - ÉAq\r   ë  Aðj$ G# Ak! $    6  6 (!  (  Aj$  W# Ak! $    6 (! A(j  Ajô  Ajô  Aj$  I# Ak!   6  6  6 (!  (6   (6 A 6 ¤# Ak! $    6 (!@ (Aj (KAqE\r A± ! AÂ °  Aô­ A     (  (j/  ;\n  (Aj6 /\nAÿÿq! Aj$  # Ak! $    6 (!@ (Aj (KAqE\r A± ! AÂ °  Aô­ A     (  (j(  6  (Aj6 (! Aj$  # Ak! $    6  6 (!@ ( (KAqE\r A± ! A· °  Aô­ A     (6 Aj$ z# Ak! $    6 (! A 6  A 6 A 6 Aj  Aj  A;$ A;& A(j  Aj$  î# A k! $    6  6  :   ;  6  6 /! (!@@ Aÿÿq  AqE\r   (6@ (Aj (KAqE\r A± !	 	A °  	Aô­ A     ( (j - Aq 6 (!\n A j$  \n# A k! $    6  6  6  6 (! A Aq:    @@ (AFAqE\r    Aj  AAq:  A6 A 6@@ ( (IAqE\r  ( (  ((  ( (Atj 6       (Aj6  AAq:  A6@ - Aq\r   ô  A j$ G# Ak! $    6  6 (!  (  Aj$  L# Ak! $    6 (! Aj   Aj  Aj$  ,# Ak!   6 (! ( ( kAu/# Ak!   6  6 ((  (AtjQ# Ak! $    6 (! A 6  A 6 A 6   Aj$  B# Ak! $    6  6 ( (  Aj$ ©# A k! $    6  6 (!@ ( ¼ KAqE\r @ ( º KAqE\r »   (!  ! Aj   ±   Aj³  Aj´  A j$ ,# Ak!   6 (! ( ( kAu/# Ak!   6  6 ((  (AtjE# Ak! $    6  6 ( ( ! Aj$  R# Ak! $    6 (!   (  6 (! Aj$  4# Ak!   6  6 (!  (( 6  R# Ak! $    6 (!   (   6 (! Aj$  ±# A0k! $   6(  6$  6    6 (!  ((6  ($6  ( 6  ($6  ( 6 ( ( !   ( ( (  6, (,! A0j$  L# Ak! $    6 (! Aj   Aj  Aj$  # Ak! $    6  6 (! «   (¬   (( 6   ((6  ((6 (A 6 (A 6 (A 6  Aj$ 5# Ak! $    6 (  Aj$ Q# Ak! $    6 (! A 6  A 6 A 6   Aj$  ¡# Ak!   ;  6 A 6 /Aj! AK@@@@@@@   A6 A6 A6 A6 A Aq:   ( (lAMAq:  - Aq¸# Ak!   6  : @@ - AqE\r   (-  Aÿq (- AÿqAtr (- AÿqAtr (- AÿqAtr6  (- Aÿq (- AÿqAtr (- AÿqAtr (-  AÿqAtr6 (B# Ak! $    6  6 ( (  Aj$ Þ# Ak! $    6  6  6@ (Aj (KAqE\r A± ! A² °  Aô­ A    ( (j-  Aÿq ( (Ajj-  AÿqAtr ( (Ajj-  AÿqAtr ( (Ajj-  AÿqAtr! Aj$  # Ak! $    6  6 (! º   (»   (( 6   ((6  ((6 (A 6 (A 6 (A 6  Aj$ 1# Ak!   6  6 (!  (6  y# Ak! $    6 (!@ ( ( A GAqE\r  ( ¼  ( ¨  (  ( (  ( ¦ ®  Aj$ <# Ak! $    6 (! À  Aj$  # Ak! $    6  6 (!  (6@@ ( (IAqE\r   (Á   (Aj6   (Â 6  (6 (Axj! Aj$  p# Ak! $    6  6 (! (!@@ Aj  ã AqE\r  (! (! ! Aj$  Y# A k! $    6  6  (6  (6 ( (ì ! A j$  ù# Aà k! $   6X  6T  6P   6L  6H (L! ( !  ÿ 6@   AØ j AÀ jä j6D@ (HA JAqE\r @@ (H ( (kLAqE\r   (6<  ( (Dk68@@ (H (8JAqE\r   (T60 (8!  (0 å 64  (46,  (P6( (H (8k!	  (, (( 	æ @ (8A JAqE\r   (D (< (D (Hjç   (T6$  (46  (D!\n ($ (  \nè   (D (< (D (Hjç   (T6 (H! (D! (  é     (Hj° !\r (D ( k! Aj \r  ±   (T6 (H! (! Aj  ê  (D!   Aj ë 6D Aj´    (D 6\\ (\\! Aà j$  # Ak!   6 (O# Ak! $    6  6 (! Aj ø  (! Aj$  1# Ak!   6  6 (!  (6  y# Ak! $    6 (!@ ( ( A GAqE\r  ( ¨  ( Ñ  (  ( (  ( Ï ×  Aj$ <# Ak! $    6 (!   Aj$  # Ak!   6 (# Ak! $    6  6 (!  (6@@ ( (IAqE\r   (   (Aj6   ( 6  (6 (A|j! Aj$  y# A k! $    6  6 (! Aj A   (  (   (Aj6 Aj  A j$ °# A k! $    6  6 (!  õ Aj ! õ ! Aj      (  (   (Aj6  Aj   (! Aj¡  A j$  [# Ak!   6  6  6 (!  (6   ((6  (( (Atj6 # Ak!   6 (I# Ak! $    6  6  6 ( (¢  Aj$ 1# Ak!   6 (! (! (  6 Á# A k! $    6  6 (!  ¤ 6@ ( (KAqE\r ¥    ¦ 6@@ ( (AvOAqE\r   (6  (At6  Aj Aj½ ( 6 (! A j$  ß# A k! $    6  6  6  6 (!  6 A 6  (6@@ (\r  A 6  (! (! Aj  §   (6   (6 (  (Atj!  6  6  (  (Atj6 (!	 A j$  	# Ak! $    6  6 (! ¨  ((! ( ( kAu!  A  kAtj6  (   (  ( ©  (! ( 6  ( 6  (Ajª  Aj (Ajª  Aj (Ajª  ((! ( 6   õ «  Aj$ r# Ak! $    6 (!  6 ¬ @ ( A GAqE\r  ( (  ­ ®  (! Aj$  E# Ak! $    6  6 ( (£ ! Aj$  4# Ak!   6  6 (!  (( 6  \\# Ak! $    6  (¯ 6 Ë 6 Aj AjÌ ( ! Aj$   A Í  ,# Ak!   6 (! ( ( kAuP# Ak! $   6  6   ( (° 6    (6 Aj$ # Ak!   6~# Ak! $    6  6  6  6  (  ! ( ! ( (kAuAt!@ E\r    ü\n   Aj$ P# Ak!   6  6  (( 6 (( ! ( 6  (! ( 6 # Ak!   6  6># Ak! $    6 (!  (²  Aj$ ,# Ak!   6 (! ( ( kAuM# Ak! $    6  6  6 ( ( (³  Aj$ 7# Ak! $    6Ð Av! Aj$  g# Ak! $    6  6 (!@ ( ¯ KAqE\r Ö   (A± ! Aj$  # A k! $    6  6  (At6@@ (Ø AqE\r   (6  ( (Ù 6  (Ú 6 (! A j$  A# Ak! $    6  6 ( (´  Aj$ J# Ak! $    6  6  6 ( (A·  Aj$ y# Ak! $    6  6 (!@@ ( (GAqE\r (! (A|j!  6   µ   Aj$ <# Ak! $    6  6 (¶  Aj$ # Ak!   6# A k! $    6  6  6  (At6@@ (Ø AqE\r   (6 ( ( (¸  ( (¹  A j$ M# Ak! $    6  6  6 ( ( (¨  Aj$ A# Ak! $    6  6 ( (¢  Aj$ |# Ak! $    6 (!@ ( A GAqE\r  ¼  ¨   (  ¦ ®  A 6 A 6 A 6  Aj$ A# Ak! $    6  6 ( (½  Aj$ X# Ak! $    6 (!  õ 6  ( ¾   (¿  Aj$ # Ak!   6  6# Ak! $    6  6 (!  (6@@ ( (GAqE\r (A|j!  6   µ    (6 Aj$ # Ak!   6  6# Ak!   6 (y# A k! $    6  6 (! Aj AÃ   (Ä  (Å   (Aj6 AjÆ  A j$ °# A k! $    6  6 (!  ú AjÇ ! ú ! Aj   È   (Ä  (Å   (Aj6  AjÉ  (! AjÊ  A j$  [# Ak!   6  6  6 (!  (6   ((6  (( (Atj6 # Ak!   6 (I# Ak! $    6  6  6 ( (Ë  Aj$ 1# Ak!   6 (! (! (  6 Á# A k! $    6  6 (!  Í 6@ ( (KAqE\r Î    Ï 6@@ ( (AvOAqE\r   (6  (At6  Aj Aj½ ( 6 (! A j$  ß# A k! $    6  6  6  6 (!  6 A 6  (6@@ (\r  A 6  (! (! Aj  Ð   (6   (6 (  (Atj!  6  6  (  (Atj6 (!	 A j$  	# Ak! $    6  6 (! Ñ  ((! ( ( kAu!  A  kAtj6  ( Ä  (Ä  (Ä Ò  (! ( 6  ( 6  (AjÓ  Aj (AjÓ  Aj (AjÓ  ((! ( 6   ú Ô  Aj$ r# Ak! $    6 (!  6 Õ @ ( A GAqE\r  ( (  Ö ×  (! Aj$  E# Ak! $    6  6 ( (Ì ! Aj$  4# Ak!   6  6 (!  () 7  \\# Ak! $    6  (Ø 6 Ë 6 Aj AjÌ ( ! Aj$   A Í  ,# Ak!   6 (! ( ( kAuP# Ak! $   6  6   ( (Ù 6    (6 Aj$ # Ak!   6~# Ak! $    6  6  6  6  ( Ä ! (Ä ! ( (kAuAt!@ E\r    ü\n   Aj$ P# Ak!   6  6  (( 6 (( ! ( 6  (! ( 6 # Ak!   6  6># Ak! $    6 (!  (Û  Aj$ ,# Ak!   6 (! ( ( kAuM# Ak! $    6  6  6 ( ( (Ü  Aj$ 7# Ak! $    6Ð Av! Aj$  g# Ak! $    6  6 (!@ ( Ø KAqE\r Ö   (AÚ ! Aj$  # A k! $    6  6  (At6@@ (Ø AqE\r   (6  ( (Ù 6  (Ú 6 (! A j$  A# Ak! $    6  6 ( (Ý  Aj$ J# Ak! $    6  6  6 ( (Aà  Aj$ y# Ak! $    6  6 (!@@ ( (GAqE\r (! (Axj!  6  Ä Þ   Aj$ <# Ak! $    6  6 (ß  Aj$ # Ak!   6# A k! $    6  6  6  (At6@@ (Ø AqE\r   (6 ( ( (á  ( (â  A j$ M# Ak! $    6  6  6 ( ( (¨  Aj$ A# Ak! $    6  6 ( (¢  Aj$ 9# Ak!   6  6  6 ((  (( IAqL# Ak! $    6  6 (í  (î k! Aj$  X# Ak! $    6  6 (! Aj ï   (6 (! Aj$  # A0k! $   6,  6(   6$  6  ($! ( ! Aj  ·   (,6  ((6 (!   ( ( ð 6 Aj¹  A0j$ # A0k! $    6,  6(  6$  6  (,!  (6  ( ( k6  (( (j6 ($ (k! Aj  ·   (6@@ ( ($IAqE\r  (¡  (ñ   (Aj6  (Aj6  (6  Aj¹  (( (( (j (ò  A0j$ {# A k! $    6  6  6  (6  (6 (! (! (! Aj   ó  (! A j$  # A k! $    6  6  6  (6  (6 (!  Aj ô 6 (! ( ( è ! A j$  ¼# A k! $   6   6  6 (! Aj! (! Aj  ¿ @@ ( (GAqE\r ( (¡  Ajõ ö   (Aj6 Aj÷   AjÀ  A j$ ö	# A k! $    6  6  6 (! Á   ((6  (¡  (¡  ((¡ Â  ( (k! (!   (j6  (6 ((! ( ( k!  A  kj6  ( ¡  (¡  (¡ Â  (!	 ( 	6  ( 6  (AjÃ  Aj (AjÃ  Aj (AjÃ  ((!\n ( \n6    Ä  (! A j$  E# Ak! $    6  6 Aj Aj§ ! Aj$  # Ak!   6 (( # Ak!   6 (( Q# Ak! $    6  6  (ù 6 ( (ú  Aj$ ©# A0k! $   6,  6(   6$  6   (,6  ((6 (! (! Aj  ü   ($ ( ( ( ý þ 6 (  (ÿ ! A0j$  I# Ak! $    6  6  6 ( (  Aj$ g# A k! $    6  6  6 (! (! (! Aj     (! A j$  g# A k! $   6  6  6  (6  (6 (!   ( (   A j$ \\# Ak! $    6  6  (( 6 (! Aj û  (! Aj$  # Ak!   6 (( I# Ak! $    6  6  6 ( (¥  Aj$ -# Ak!   6 (!  ( Aj6  1# Ak!   6  6 (!  (6  # Ak!   6 (F# Ak! $    6  6 (! ( û  Aj$ 7# Ak!   6  6 (!  ( ( j6  W# Ak! $   6  6  (6  (6    ( (   Aj$ 9# Ak! $    6 ( ! Aj$  X# Ak! $    6  6  6  6  ( ( (  ! Aj$  E# Ak! $    6  6 ( ( ! Aj$  x# A k! $   6  6  (6  ( 6  (6  ( 6   Aj Aj  A j$ g# A k! $    6  6  6 (! (! (! Aj     (! A j$  9# Ak! $    6 (¡ ! Aj$  L# Ak! $    6  6 ( ( (¡ kj! Aj$  C# Ak! $    6  (6 ( ! Aj$  H# Ak!   6  6  6 (!  (( 6   (( 6 9# Ak! $    6 Aj ! Aj$  9# Ak! $    6 ( ! Aj$  F# Ak! $    6  (( 6 ( ! Aj$  ?# Ak! $    6 Ajî ¡ ! Aj$  O# Ak! $   6  6  6   ( ( (  Aj$ Â# A0k! $   6,  6(  6$ (,! ((! Aj    (! ( ! ($ý !	 Aj Aj   	   (, ( 6  ($ (ÿ 6   Aj Aj  A0j$ C# Ak! $   6  6   ( (  Aj$ V# Ak! $   6  6  6  6    ( ( (   Aj$ E# Ak! $    6  6 ( ( ! Aj$  D# Ak! $   6  6   ( (  Aj$ a# Ak! $   6  6  (ý 6  (ý 6    Aj   Aj$ # A k! $   6  6  6  ( (k6 ( ( (   ( (j6   Aj Aj  A j$ E# Ak! $    6  6 ( (ÿ ! Aj$  u# Ak!   6  6  6  (6 @ ( A KAqE\r  (! (! ( AkA tAj!@ E\r    ü\n   (D# Ak! $   6  6   ( (  Aj$ H# Ak!   6  6  6 (!  (( 6   (( 6 E# Ak! $    6  6 ( ( ! Aj$  O# Ak! $   6  6  6   ( ( (  Aj$ 4# Ak!   6  6 (!  (-  :   Â# A0k! $   6,  6(  6$ (,! ((! Aj    (! ( ! ($ý !	 Aj Aj   	   (, ( 6  ($ (ÿ 6   Aj Aj  A0j$ V# Ak! $   6  6  6  6    ( ( (   Aj$ # Ak! $   6  6  6  ( (k6  ( !  (A  kj6 ( ( (     Aj Aj  Aj$ D# Ak! $   6  6   ( (  Aj$ H# Ak!   6  6  6 (!  (( 6   (( 6 æ# AÀ k! $   6<  68  64  (<6(  (86$ ((! ($! A,j  ü  (,! (0! (4ý !	 Aj Aj   	   (<6 (!\n  ( \n 6  (4 ( ÿ 6   Aj Aj   AÀ j$ ]# Ak! $    6  6  (6  (!  (  ¢ 6 (! Aj$  D# Ak! $   6  6   ( (¡  Aj$ H# Ak!   6  6  6 (!  (( 6   (( 6 ]# Ak! $    6  6  (6  (!  (  £ 6 (! Aj$  ]# Ak! $    6  6  (6  (!  (  ¤ 6 (! Aj$  _# Ak! $    6  6 ( Aj k!  Aj ô 6 (! Aj$  E# Ak! $    6  6 ( (¦ ! Aj$  4# Ak!   6  6 (!  (-  :   L# Ak! $    6  6 (î  (î k! Aj$  X# Ak! $    6 (!  ú 6  ( ©   (ª  Aj$ # Ak! $    6  6 (!  (6@@ ( (GAqE\r (Axj!  6  Ä Þ    (6 Aj$ # Ak!   6  6|# Ak! $    6 (!@ ( A GAqE\r  ã  Á   (  ¼ Ç  A 6 A 6 A 6  Aj$ A# Ak! $    6  6 ( (­  Aj$ # Ak!   6  6Ô# A k! $    6  6 (! Aj ¯  (! Aj ° @@@ Aj± AqE\r   Aj² 6 (Aÿßÿÿ³ AqE\r A 6  Aj² 6  AjÔ  6 (! A j$  M# Ak! $    6  6 (!  (AAq´  Aj$  E# Ak! $    6  6 ( (µ ! Aj$  k# Ak! $    6 (! ¶ !A ! Aq! !@ E\r  · ¸ ! Aq! Aj$  ~# Ak! $    6 (!@@ ± AqE\r  · ! Aj Ð º ! Aj Ð  (! Aj$  N# Ak! $    6  6 AjÔ  (¹ Aq! Aj$  # Ak! $    6  6  :  (!  6 - !A ! Aq! !@ E\r  (¸ !  Aq:    ( -  Aq¼ 6 (!	 Aj$  	Ø# A k! $    6  6 (! A 6 ¶ !A ! Aq! !@ E\r  (¿ !A !	 Aq!\n 	! \nE\r  ·  (À  AjÁ !  Aq:  (! - ! Aj  AqÂ   )7  A j$  "# Ak!   6 (-  Aq# Ak!   6 ((Z# Ak! $    6  (6 (! Aj ½  Aj§ Aq! Aj$  H# Ak! $    6  6 ( (Î Aq! Aj$    5# Ak! $    6 (  Aj$ ## Ak!   6  :  (7# Ak! $   6   (¾  Aj$ A# Ak! $   6A!   Aq AqÛ  Aj$ # Ak!   6AAq# Ak!   6 (ó# A k! $    6  6  6@@@ (Ã AqE\r  (Ã Aq\r (E\r  (E\r  A Aq:  B 7 A:   (­ (­~7@@ - AqE\r  )Ä Aq\r A Aq:  )§! ( 6  AAq:  - Aq! A j$  W# Ak! $    6  6  :  (!  ( - Aq´  Aj$  Z# Ak! $    6  (6 (! Aj Å  Aj§ Aq! Aj$  ^~# A k! $    7  )7 )! Aj Æ  Aj§ Aq! A j$  7# Ak! $   6   (Ç  Aj$ 7# Ak! $   7   )È  Aj$ A# Ak! $   6A!   Aq AqÛ  Aj$ L# Ak! $   7 )É ­X!  AAq AqÛ  Aj$  Ð Ê P# Ak! $    6 (Ë Aq (Ì AqÍ ! Aj$  ^# Ak! $    6@@ (Ì AqE\r  (!A  k! (! ! Aj$  # Ak!   6A Aq@# Ak!   6  :  (! - Aq! A  ks - Aqjß# Ak! $    6  6 (! Aj ½  (! Aj ½  AjÏ !A! Aq! !@ \r  AjÐ !	A!\n 	Aq! \n! \r  Aj AjÙ !A !\r Aq! \r!@ E\r  ( (O! ! Aq! Aj$  K# Ak!   6 (! - !A ! Aq! !@ E\r  -  As! AqG# Ak!   6 (! - !A ! Aq! !@ \r  -  ! Aq# Ak!   61# Ak! $    6AÐ Ñ Ü  g# Ak! $    6  6  ( (® 6@ (A GAq\r A Ò  (! Aj$  	 Õ  A¥# A°k! $   6¬  6¨  6¤  6   ( × 6@ (A KAsAsAsAqE\r Ø   (! Aÿ:  Aj  AjÙ  Aj AjÚ   (¬6 A 6|@@ (| (¤HAqE\r (! Aè j Û  (h!	 Aì j  	Ü   Aì j6d  Aì jAj) 7  (d!\n Aÿ6`A  \n Aà jÝ    ) 7X  (d) 7P AÈ j AjÞ  (¨!  )X7  )P7  )H7 Aj Aj Aj Aj ß   )7@  (d) 78 A0j  )@7(  )87  A0j A(j A jà   (|Aj6|  (! Ajá  A°j$  a# Ak! $    6@@ (â AqE\r   (6 ã 6 (! Aj$     Í# A k! $    6  6  6 (!  6 A 6  A 6 A 6 Aj ä  (! Aj å @ (A KAqE\r   (æ   ( (ç  Ajè  Ajé  (! A j$  # Ak! $    6  6 (! (!A  ê ! (!A  ë ! Aj Ð    (Ò  Aj$  J# Ak! $    6  6 (!  (ï 6  Aj$  # A k! $   6  6 (!  (6 (! Aj  ì   (6  ( ! Aj  í    Aj Ajî  A j$ ~# Ak! $    6  6  6 (! (!A  ð ! (!  A  ñ  (ò ! Aj$  Z# Ak! $    6  6 (!  (ú 6   (û 6 Aj$  ¼ # Ak! $   6ü  6ø A6ô A: ó   ) 7à  )à7  Ajó 6ì@@@ (ü(  (ìOAqE\r   ) 7È (ø! (ô! - ó!  )È7x Aq!	 Aø j   	 AÔj AÐjô  A 6Ä   ) 7¸ (ü!\n  )¸7@@ Aj \nõ Aq\r @ (ü(  (ìOAqE\r    ) 7¨ (ü!  )¨7p  Að j õ Aq: ·@ (ü(  (ìOAqE\r    ) 7 (ü!  )7h  Aè j õ Aq: §@@ - ·AqE\r  - §!\r AA \rAq6Ä@ - §AqE\r  A 6@@@ - óAqE\r  AjA ö  AjAà  ÷    ) 7 (ü!  )70  )7(  A0j A(j ø 6  ( (j6@@ (AÀ HAqE\r @ (ôA HAqE\r   (Aj6@ (A HAqE\r   (ô (j6Ü@ - óAq\r   ) 7ø (ø! (ô! (Ü!  )ø7  A j   ù  A 6ô@@@ - óAqE\r  AèjAà  ÷  AèjA ö    ) 7à (ü!  )è7  )à7  Aj Aj ø 6ð  (ð (ôj6ô@@ (ðAÀ HAqE\r @ (ôA HAqE\r   (Ü (ôj6Ø@ - óAqE\r   ) 7Ø (ø! (Ü! (Ø!  )Ø7 Aj   ù   (Ø6ô@ (ô (øHAqE\r @ (ü(  (ìOAqE\r    ) 7Ð (ü!  )Ð7`@ Aà j õ AqE\r @ - óAq\r   ) 7È (ø! (ô! (Ð!  )È78 A8j   ù @ (Ð (øNAqE\r   (Ð6ô@ (ü(  (ìOAqE\r    ) 7¸ (ü!  )¸7X  AØ j õ Aq: Ç@ (ü(  (ìOAqE\r    ) 7¨ (ü!  )¨7P  AÐ j õ Aq: ·@@ - ÇAqE\r  - ·! AA~ Aq6Ä@@ - ·AqE\r @ (ü(  (ìOAqE\r    ) 7  (ü!  ) 7@ AÀ j õ ! AA} Aq6Ä@ (ü(  (ìOAqE\r    ) 7 (ü!  )7H@ AÈ j õ AqE\r  (ü!     ( Aj6  (ü!! ! !( Aj6   (Ô (Äj6Ü@ - óAq\r   ) 7 (ø!" (ô!# (Ü!$  )7   " # $ù @ (Ü (øNAqE\r @ (ô (ÜNAqE\r   (Ü6ô  - óAsAq: ó  Aj$ # Ak! $ @ û  û OAsAsAsAqE\r Ø   ú  ú  ü ý  û ! Aj Ð     (í  Aj$ L# Ak! $    6 (! Aj ä  Ajþ  Aj$  F# Ak! $    6  (6 (ÿ Aq! Aj$    1# Ak!   6  6 (!  (6  I# Ak! $    6  6  (6   (  Aj$ # Ak! $    6  6 (!@ (  KAqE\r    (!      ( 6   ( 6  (  (j6 A   Aj$ ¿# A k! $    6  6  6 (! (! Aj     (6  (6 @@ (  (GAqE\r  ( ¡  (  ( Aj!  6   6  Aj  A j$ !# Ak!   6 (A: V# Ak! $    6 (!  6@ - Aq\r  þ  (! Aj$  @# Ak! $    6  6 ( ! Aj$  @# Ak! $    6  6 ( ! Aj$  # Ak! $   6  6 (!@ AjÔ  û MAsAsAsAqE\r Ø   ú !  (6    (Ò  Aj$ ¶# Ak! $   6  6 (!@ AjÔ  û MAsAsAsAqE\r Ø    û  AjÔ k6 ú  AjÔ j! (!  Ð     ( Ò  Aj$ K# Ak!   6  6  6 (!  () 7  Aj () 7  # Ak!   6 (@# Ak! $    6  6 ( ! Aj$  @# Ak! $    6  6 ( ! Aj$  p# Ak! $    6  6  6  6  (! ( (k! ( !A     ! Aj$      At º# AÐ k! $   6L  6H  : G  6@  6< (HA H!A! Aq!	 !\n@ 	\r    (HAm -  Aÿq! (HAo!A k!\r A \rtqA G!\n  \nAq: ;   ) 70 (L! (HAj! - ;As!  )07 Aq! Aj    ! (@ 6 @@ (@(  (LNAqE\r  (L! (< 6  (@ 6 @ - ;Aq - GAsAqFAqE\r    ) 7( (L! (@( Aj! - ;!  )(7 Aq! Aj    ! (@ 6   - ;AsAq: ;@ (@(  (LNAqE\r  (L! (< 6  (@ 6    ) 7  (L! (@( Aj! - ;!  ) 7 Aq! Aj    ! (< 6  AÐ j$ # Ak! $   6 (! ( !  Aj6   6   (Av -  Aÿq! (Aq!A k! A tqA GAsAsAq! Aj$  `# Ak! $    6  6 (! (! AjAÅÐ    (Ñ  Aj$  `# Ak! $    6  6 (! (! AjAÆÐ    (Ñ  Aj$  Ñ# A0k! $   6(  ) 7  )7   ó 6$ A 6 A 6@@ (!  Aj6     -  : @ - AÿqAÿFAqE\r  A6,@ (((  ($OAqE\r  A6,  (At6  ((( Av -  Aÿq! ((( Aq!A k!@ A tqE\r   (Aj6 ((!  ( Aj6   ( - AÿqAlj6@@ ( (HAqE\r@   ( -  Aÿq (FAqE\r     (Aj -  Aÿq   (Aj -  AÿqAtj6,  (Aj6   (,!	 A0j$  	# AÐ k! $   6L  6H  6D A 6@  AÈ j AÀ j  ( 6H A 6<  AÄ j A<j AÌ j¡ ( 6D@@ (H (DNAqE\r   (HAm68  (DAkAm64    (8¢ 60@ (8 (4FAqE\r   (HAo6,@@ (, (DAkAoLAqE\r (,!A k!A t! (0!  -  Aÿq k:    (,Aj6,   (HAo6(@@ ((AHAqE\r ((!	A 	k!\nA \nt! (0!  -  Aÿq k:    ((Aj6(     (4¢ 6$ A 6 @@ (  (DAkAoLAqE\r ( !\rA \rk!A t! ($!  -  Aÿq k:    ( Aj6   (4 (8AjKAqE\r  (8Aj! Aj Û  (4 (8kAk! Aj Û  (! (! Aj    £  A 6A  Aj Aj¤  AÐ j$ # Ak!   6 (( # Ak!   6 ((<# Ak! $    6 (û A t! Aj$  i# Ak!   6  6  6@@ (E\r  (! (! (!@ E\r    ü\n   ! (! y# Ak! $    6 (!@ ( ( A GAqE\r  (   (   (  ( (  (    Aj$ I# Ak! $    6 ( Aÿÿÿÿ MAq! Aj$  # Ak!   6 (8# Ak!  6   6 (!  (6  A :  \\# Ak! $    6  ( 6 Ë 6 Aj AjÌ ( ! Aj$   A Í  R# Ak! $   6  6   ( (A  6    (6 Aj$ # Ak!   6  6X# Ak!   6  6  6 (!  (6   ((6  (( (j6 M# Ak! $    6  6  6 ( ( (  Aj$ 1# Ak!   6 (! (! (  6 9# Ak! $    6 ( ! Aj$  I# Ak! $    6  6  6 (AÓ ! Aj$  7# Ak! $    6Ð A v! Aj$  5# Ak!   6  6  6 ( (-  :  X# Ak! $    6 (!   6  (    (  Aj$ # Ak!   6)# Ak!   6 (! ( ( kM# Ak! $    6  6  6 ( ( (  Aj$ )# Ak!   6 (! ( ( k# Ak! $    6  6 (!  (6@@ ( (GAqE\r (Aj!  6  ¡     (6 Aj$ # Ak!   6  6C# Ak! $    6  6  6 (»  Aj$ A# Ak! $    6  6 ( (  Aj$ # Ak!   6  6<# Ak! $    6 (( ¡ ! Aj$  X# Ak! $    6  6  6  6  ( ( (  ! Aj$  9# Ak! $    6 (ú ! Aj$  F# Ak! $    6 (! ú  û j! Aj$  n# Ak!   6  6  6@@ (A JAqE\r (( ! ( :    (Aj6  (Aj6  (# Ak!   6 ((a# Ak! $    6@@ (¥ AqE\r   (6 ã 6 (! Aj$  ^# Ak! $    6  6 (! (! Aj Ð   (© ! Aj$  Ì# AÐ k! $   6H  6D  : C@ (DA NAq\r A³ Aã AÀ Aý   @@ (D (HNAqE\r   (H6L - C! A Aÿ Aq: B  (DAo6<@ (<E\r   (DAm68   (8 -  Aÿq - BAÿqs! (<!  Aÿ uq: 7 - 7!A !	@ Aÿq 	AÿqGAqE\r  (8At!\n - 7Aÿq!  \nA¶£  ª -  Aÿqj6L  (DAj6D  (HAjAm60  (DAm6,@ (0ANAqE\r  (, (0AkHAqE\r @@ - CAqE\r  A(jA¦£ «  A(jA®£ « @ (, (0AkH!A !\r Aq! \r!@ E\r  (,! Aj Ð  AjAÐ  (! (! A j    ¬   ((6 (!  ) 7   ­ !@ AqE\r   (,Aj6,@@ (, (0HAqE\r    (, -  Aÿq - BAÿqs:  - !A !@ Aÿq AÿqGAqE\r  (,At! - Aÿq!  A¶£  ª -  Aÿqj6  Aj AÈ j® ( 6L  (,Aj6,   (H6L (L! AÐ j$  E# Ak! $    6  6 ( (Ë ! Aj$  Q# Ak! $    6  6  6 ( ( (Ì ! Aj$  ^# Ak! $    6  6 (! (! Aj Ð   (Í ! Aj$  # Ak! $   6  6  6 (!@ AjÔ AGAq\r AÀ A A	AÏ    AjÔ  û M!A ! Aq! !	@ E\r  AjÔ  û  AjÔ kM!	@ 	AsAsAsAqE\r Ø   ú  AjÔ j!\n  (6    \n ( Ò  Aj$ ~# Ak! $    6  6  6 (! (!A  ð ! (!  A  ñ  (ò ! Aj$  Z# Ak! $    6  (6 (! Aj ¦  Aj§ Aq! Aj$  7# Ak! $   6   (¨  Aj$ J# Ak!   6 (! - !A ! Aq! !@ \r  -  As! AqA# Ak! $   6A!   Aq AqÛ  Aj$ S# Ak! $   6   6 (!  (6  (¯ ! Aj$  )# Ak!   6  6 ( (j_# Ak! $    6  6 (! (! AjAÐ    (±  Aj$  # Ak! $   6  6  6 (!@ AjÔ AGAq\r AÀ A A	AÏ    AjÔ   M!A ! Aq! !	@ E\r  AjÔ    AjÔ kM!	@ 	AsAsAsAqE\r Ø   °  AjÔ j!\n  (6    \n ( Ñ  Aj$ [# A k! $   6   ) 7  (6A¶¥  Aj Aj² Aq! A j$  E# Ak! $    6  6 ( (³ ! Aj$  }# Ak! $   6   6 (!@ AjÔ   IAsAsAsAqE\r Ø   °  AjÔ j! Aj$  # Ak!   6 (( È# A k! $   6   6  6 (!  6  (6 @ AjÔ AFAsAsAsAqE\r Ø    (6@ (A Õ Aq\r  ( A GAq\r A A AñAÒ    (! A j$  ³\r# A k! $    6  6  6 (!A·¥  ´ ! (!@@ A·¥  µ GAqE\r  A Aq:  (!A  ¶ ! (!	A  	· !\n Aj  \n¸  (!A  ¹ ! (!\rA  \rº !   ¸   ( ( (  ( Aj Aj Aj» Aq:  - Aq! A j$  p# Ak! $    6  6 (! (!@@ Aj  Ê AqE\r  (! (! ! Aj$  J# Ak! $    6  6 (!A  ¼ ! Aj$  J# Ak! $    6  6 (!A  ½ ! Aj$  @# Ak! $    6  6 (¿ ! Aj$  @# Ak! $    6  6 (À ! Aj$  C# Ak! $   6  6   ( (¾  Aj$ @# Ak! $    6  6 (Á ! Aj$  @# Ak! $    6  6 (Â ! Aj$  v# A k! $    6  6  6  6  6  6  6 ( ( ( (kÃ Aq! A j$  @# Ak! $    6  6 ( ! Aj$  @# Ak! $    6  6 (Ä ! Aj$  a# Ak! $   6  6  (Å 6  (Å 6    Aj Æ  Aj$ 9# Ak! $    6 (° ! Aj$  F# Ak! $    6 (! °   j! Aj$  9# Ak! $    6 (É ! Aj$  <# Ak! $    6 (É Aj! Aj$  d# Ak! $    6  6  6  (6  ( ( ( A tÝ A FAq! Aj$  # Ak!   6A9# Ak! $    6 (Ç ! Aj$  H# Ak!   6  6  6 (!  (( 6   (( 6 9# Ak! $    6 (È ! Aj$  # Ak!   6 (# Ak!   6 (( 9# Ak!   6  6  6 ((  (( HAqp# Ak! $    6  6 (! (!@@ Aj  Ê AqE\r  (! (! ! Aj$  ­# Ak! $    6  6  6  (! (!@@ Aj  Ê AqE\r  (! ( ! (!@@ Aj  Ê AqE\r  ( !	 (!	 	! !\n Aj$  \nS# Ak! $   6   6 (!  (6  (Î ! Aj$  }# Ak! $   6   6 (!@ AjÔ  û IAsAsAsAqE\r Ø   ú  AjÔ j! Aj$  # Aà k! $    6X  6T  6P  6L  6H@@@ (XA GAqE\r  (TE\r  (PE\r  (L\r A 6\\  (PAjAv6D A 6@ (Hã  (H (D (Ll  (X! (T! A4j Ð  (4! A8j  Ñ  (H !	 (H !\n A(j \nÐ  ((! A,j 	 Ò   )87 (@! (P!\r (L! (D!  ),7  )7  )7   Aj  \r   Ö 6$  ($6\\ (\\! Aà j$  J# Ak! $    6  6 (!  (Ó 6  Aj$  ±# A k! $   6   6  6 (!  6  (6   AjÔ 6  (6@ (A Õ Aq\r  ( A GAq\r A A AÀAÒ    (! A j$  ±# A k! $   6   6  6 (!  6  (6   AjÔ 6  (6@ (A Õ Aq\r  ( A GAq\r A A AÀAÒ    (! A j$  # Ak!   6 (# Ak!   6 (( N# Ak! $    6  6 AjÔ  (Ö Aq! Aj$  J# Ak! $    6  6 (­ (¬× Aq! Aj$  ~# A k! $    7  7 )! Aj Ø  )! Aj Ø  Aj AjÙ !A ! Aq! !@ E\r  ) )Q! Aq!	 A j$  	7# Ak! $   7   )Ú  Aj$ m# Ak!   6  6 (! -  Aq (-  AqF!A ! Aq! !@ E\r  - Aq (- AqF! AqA# Ak! $   7A!   Aq AqÛ  Aj$ N# Ak!   6  :   : \n (!  - AsAq:    - \nAsAq:  	   @@@ AI\r    rAq\r@  (  ( G\r Aj!  Aj!  A|j"AK\r  E\r@@  -  " -  "G\r Aj!  Aj!  Aj"E\r   kA  A   @    ü\n    @ AI\r     ß    j!@@   sAq\r @@  Aq\r   !@ \r   !  !@  -  :   Aj! Aj"AqE\r  I\r  A|q!@ AÀ I\r   A@j"K\r @  ( 6   (6  (6  (6  (6  (6  (6  (6  ( 6   ($6$  ((6(  (,6,  (060  (464  (868  (<6< AÀ j! AÀ j" M\r   O\r@  ( 6  Aj! Aj" I\r @ AO\r   !@ AO\r   ! A|j!  !@  -  :    - :   - :   - :  Aj! Aj" M\r @  O\r @  -  :   Aj! Aj" G\r    @  \r A Þ   6 A      (<â  á # A k"$    ("6  (!  6  6   k"6  j! Aj!A!@@@@@  (< AjA Aj á E\r  !@  ("F\r@ AJ\r  ! AA   ("K"	j" (   A  	k"j6  AA 	j" (  k6   k! !  (<   	k" Aj á E\r  AG\r    (,"6   6     (0j6 !A !  A 6  B 7    ( A r6  AF\r   (k! A j$  K# Ak"$     Aÿq Aj á ! )! Aj$ B     (<  å  A  A    A ê A  A ë \\    (H"Aj r6H@  ( "AqE\r    A r6 A  B 7    (,"6   6     (0j6A é A G!@@@  AqE\r  E\r  Aÿq!@  -   F\r Aj"A G!  Aj" AqE\r \r  E\r@  -   AÿqF\r  AI\r  AÿqAl!@A  (  s"k rAxqAxG\r  Aj!  A|j"AK\r  E\r Aÿq!@@  -   G\r     Aj!  Aj"\r A   A  ï "  k   A* ñ  AÐ ]A A¸ 6° ò ! A A A k6 A A 6 A   6è A A (ì 6 ¬A!@@  E\r  Aÿ M\r@@ó (`( \r  AqA¿F\rÞ A6 @ AÿK\r    A?qAr:    AvAÀr:  A@@ A°I\r  A@qAÀG\r   A?qAr:    AvAàr:     AvA?qAr: A@ A|jAÿÿ?K\r    A?qAr:    AvAðr:     AvA?qAr:    AvA?qAr: AÞ A6 A!    :  A @  \r A    A õ ~@  ½"B4§Aÿq"AÿF\r @ \r @@  D        b\r A !  D      ðC¢ ÷ !  ( A@j!  6     Axj6  BÿÿÿÿÿÿÿBð?¿!   æ@@ ("\r A ! î \r (!@   ("kM\r      ($  @@ (PA H\r  E\r  !@@   j"Aj-  A\nF\r Aj"E\r      ($  " I\r  k! (!  !A !   à   ( j6  j! g  l!@@ (LAJ\r     ø !  ç !    ø !  E\r  è @   G\r  A     nò~@ E\r    :     j"Aj :   AI\r    :    :  A}j :   A~j :   AI\r    :  A|j :   A	I\r   A   kAq"j" AÿqAl"6    kA|q"j"A|j 6  A	I\r   6  6 Axj 6  Atj 6  AI\r   6  6  6  6 Apj 6  Alj 6  Ahj 6  Adj 6   AqAr"k"A I\r  ­B~!  j!@  7  7  7  7  A j! A`j"AK\r   # AÐk"$   6Ì@A(E\r  A jA A(ü   (Ì6È@@A   AÈj AÐ j A j  ü A N\r A!@@  (LA N\r A!  ç E!    ( "A_q6 @@@@  (0\r   AÐ 60  A 6  B 7  (,!   6,A !  (\rA!  î \r    AÈj AÐ j A j  ü ! A q!@ E\r   A A   ($    A 60   6,  A 6  (!  B 7 A !    ( " r6 A  A q! \r   è  AÐj$  ~# AÀ k"$   6< A)j! A\'j!	 A(j!\nA !A !@@@@@A !\r@ ! \r AÿÿÿÿsJ\r \r j! !\r@@@@@@ -  "E\r @@@@ Aÿq"\r  \r! A%G\r \r!@@ - A%F\r  ! \rAj!\r - ! Aj"! A%F\r  \r k"\r Aÿÿÿÿs"J\r\n@  E\r     \rý  \r\r  6< Aj!\rA!@ , APj"A	K\r  - A$G\r  Aj!\rA! !  \r6<A !@@ \r,  "A`j"AM\r  \r!A ! \r!A t"AÑqE\r @  \rAj"6<  r! \r, "A`j"A O\r !\rA t"AÑq\r @@ A*G\r @@ , APj"\rA	K\r  - A$G\r @@  \r   \rAtjA\n6 A !  \rAtj( ! Aj!A! \r Aj!@  \r   6<A !A !  ( "\rAj6  \r( !A !  6< AJ\rA  k! AÀ r! A<jþ "A H\r (<!A !\rA!@@ -  A.F\r A !@ - A*G\r @@ , APj"A	K\r  - A$G\r @@  \r   AtjA\n6 A !  Atj( ! Aj! \r Aj!@  \r A !  ( "Aj6  ( !  6< AJ!  Aj6<A! A<jþ ! (<!@ \r!A! ",  "\rAjAFI\r Aj! \r A:ljAÿ¤ j-  "\rAjAÿqAI\r   6<@@ \rAF\r  \rE\r\r@ A H\r @  \r   Atj \r6 \r   Atj) 70  E\r	 A0j \r  ÿ  AJ\rA !\r  E\r	  -  A q\r Aÿÿ{q"  AÀ q!A !AÖ ! \n!@@@@@@@@@@@@@@@@@ -  "À"\rASq \r AqAF \r "\rA¨j!	\n  \n!@ \rA¿j  \rAÓ F\rA !AÖ ! )0!A !\r@@@@@@@   (0 6  (0 6  (0 ¬7  (0 ;  (0 :   (0 6  (0 ¬7  A AK! Ar!Aø !\rA !AÖ ! )0" \n \rA q ! P\r AqE\r \rAvAÖ j!A!A !AÖ ! )0" \n ! AqE\r   k"\r  \rJ!@ )0"BU\r  B  }"70A!AÖ !@ AqE\r A!A× !AØ AÖ  Aq"!  \n !  A Hq\r Aÿÿ{q  !@ B R\r  \r  \n! \n!A !  \n k Pj"\r  \rJ!\r - 0!\r (0"\rA  \r!   Aÿÿÿÿ AÿÿÿÿIð "\rj!@ AL\r  ! \r!\r ! \r! -  \r )0"PE\rA !\r	@ E\r  (0!A !\r  A  A    A 6  >  Aj60 Aj!A!A !\r@@ ( "E\r Aj ö "A H\r   \rkK\r Aj!  \rj"\r I\r A=! \rA H\r\r  A   \r  @ \r\r A !\rA ! (0!@ ( "E\r Aj ö " j" \rK\r   Aj ý  Aj!  \rI\r   A   \r AÀ s   \r  \rJ!\r	  A Hq\r\nA=!   +0    \r   "\rA N\r \r- ! \rAj!\r   \r\n E\rA!\r@@  \rAtj( "E\r  \rAtj   ÿ A! \rAj"\rA\nG\r @ \rA\nI\r A!@  \rAtj( \rA! \rAj"\rA\nF\r A!  \r: \'A! 	! \n! ! \n!   k"  J" AÿÿÿÿsJ\rA=!   j"  J"\r K\r  A  \r       ý   A0 \r  As   A0  A      ý   A  \r  AÀ s  (<!A !A=!Þ  6 A! AÀ j$   @  -  A q\r     ø {A !@  ( ",  APj"A	M\r A @A!@ AÌ³æ K\r A  A\nl"j  AÿÿÿÿsK!   Aj"6  , ! ! ! APj"A\nI\r  ¾ @@@@@@@@@@@@@@@@@@@ Awj 	\n\r  ( "Aj6    ( 6   ( "Aj6    4 7   ( "Aj6    5 7   ( "Aj6    4 7   ( "Aj6    5 7   ( AjAxq"Aj6    ) 7   ( "Aj6    2 7   ( "Aj6    3 7   ( "Aj6    0  7   ( "Aj6    1  7   ( AjAxq"Aj6    ) 7   ( "Aj6    5 7   ( AjAxq"Aj6    ) 7   ( AjAxq"Aj6    ) 7   ( "Aj6    4 7   ( "Aj6    5 7   ( AjAxq"Aj6    + 9       =@  P\r @ Aj"  §Aq- ©  r:    BV!  B!  \r  6@  P\r @ Aj"  §AqA0r:    BV!  B!  \r  ~@@  BZ\r   !@ Aj"    B\n"B\n~}§A0r:    BÿÿÿÿV! !  \r @ P\r  §!@ Aj"  A\nn"A\nlkA0r:   A	K! ! \r  # Ak"$ @  L\r  AÀq\r     k"A AI"ú @ \r @   Aý  A~j"AÿK\r     ý  Aj$      A A û Ã~~|# A°k"$ A ! A 6,@@  "BU\r A!	Aà !\n " !@ AqE\r A!	Aã !\nAæ Aá  Aq"	!\n 	E!@@ Bøÿ Bøÿ R\r   A   	Aj" Aÿÿ{q    \n 	ý   A× A¥  A q"Aæ AÆ    bAý   A    AÀ s     J!\r Aj!@@@@  A,j÷ "  "D        a\r   (,"Aj6, A r"Aá G\r A r"Aá F\rA  A H! (,!  Acj"6,A  A H! D      °A¢! A0jA A  A Hj"!@  ü"6  Aj!  ¸¡D    eÍÍA¢"D        b\r @@ AN\r  ! ! ! ! !@ A AI!@ A|j" I\r  ­!B !@  5   |" BëÜ"BëÜ~}>  A|j" O\r  BëÜT\r  A|j" > @@ " M\r A|j"( E\r   (, k"6, ! A J\r @ AJ\r  AjA	nAj! Aæ F!@A  k"A	 A	I!\r@@  I\r A A ( !AëÜ \rv!A \rtAs!A ! !@  ( " \rv j6   q l! Aj" I\r A A ( ! E\r   6  Aj!  (, \rj"6,   j" " Atj   kAu J! A H\r A !@  O\r   kAuA	l!A\n! ( "A\nI\r @ Aj!  A\nl"O\r @ A   Aæ Fk A G Aç Fqk"  kAuA	lAwjN\r  A0jA`A¤b A Hj AÈ j"A	m"Atj!\rA\n!@  A	lk"AJ\r @ A\nl! Aj"AG\r  \rAj!@@ \r( "  n" lk"\r   F\r@@ Aq\r D      @C! AëÜG\r \r M\r \rA|j-  AqE\rD     @C!D      à?D      ð?D      ø?  FD      ø?  Av"F  I!@ \r  \n-  A-G\r  ! ! \r  k"6     a\r  \r  j"6 @ AëÜI\r @ \rA 6 @ \rA|j"\r O\r  A|j"A 6  \r \r( Aj"6  AÿëÜK\r   kAuA	l!A\n! ( "A\nI\r @ Aj!  A\nl"O\r  \rAj"   K!@@ " M"\r A|j"( E\r @@ Aç F\r  Aq! AsA A " J A{Jq"\r j!AA~ \r j! Aq"\r Aw!@ \r  A|j( "\rE\r A\n!A ! \rA\np\r @ "Aj! \r A\nl"pE\r  As!  kAuA	l!@ A_qAÆ G\r A !   jAwj"A  A J"  H!A !   j jAwj"A  A J"  H!A!\r AýÿÿÿAþÿÿÿ  r"J\r  A GjAj!@@ A_q"AÆ G\r   AÿÿÿÿsJ\r A  A J!@   Au"s k­  "kAJ\r @ Aj"A0:    kAH\r  A~j" :  A!\r AjA-A+ A H:    k" AÿÿÿÿsJ\rA!\r  j" 	AÿÿÿÿsJ\r  A    	j"     \n 	ý   A0   As @@@@ AÆ G\r  AjA	r!    K"!@ 5   !@@  F\r   AjM\r@ Aj"A0:    AjK\r   G\r  Aj"A0:       ký  Aj" M\r @ E\r   A Aý   O\r AH\r@@ 5   " AjM\r @ Aj"A0:    AjK\r     A	 A	Hý  Awj! Aj" O\r A	J! ! \r @ A H\r   Aj  K!\r AjA	r! !@@ 5   " G\r  Aj"A0:  @@  F\r   AjM\r@ Aj"A0:    AjK\r    Aý  Aj!  rE\r   A Aý      k"   Jý   k! Aj" \rO\r AJ\r   A0 AjAA       ký  !  A0 A	jA	A    A    AÀ s     J!\r \n AtAuA	qj!@ AK\r A k!D      0@!@ D      0@¢! Aj"\r @ -  A-G\r    ¡ !    ¡!@ (," Au"s k­  " G\r  Aj"A0:   (,! 	Ar! A q! A~j" Aj:   AjA-A+ A H:   AH AqEq! Aj!@ " ü"A© j-   r:    ·¡D      0@¢!@ Aj" AjkAG\r  D        a q\r  A.:  Aj! D        b\r A!\r Aýÿÿÿ   k"j"kJ\r   A    Aj  Ajk" A~j H  "j"      ý   A0   As    Aj ý   A0  kA A      ý   A    AÀ s     J!\r A°j$  \r.  ( AjAxq"Aj6    )  ) 9    ½\'# Ak"$ @@@@@  AôK\r @A (Ô "A  AjAøq  AI"Av"v" AqE\r @@  AsAq j"At" Aü j"  ( "(" G\r A  A~ wq6Ô   A (ä I\r  ( G\r   6   6 Aj!   At"Ar6  j" (Ar6 A (Ü "M\r@  E\r @@   tA t" A   krqh"At" Aü j"  ( " ("G\r A  A~ wq"6Ô  A (ä I\r (  G\r  6  6   Ar6   j" At" k"Ar6   j 6 @ E\r  AxqAü j!A (è !@@ A Avt"q\r A   r6Ô  ! ("A (ä I\r  6  6  6  6  Aj! A  6è A  6Ü A (Ø "	E\r 	hAt( "(Axq k! !@@@ (" \r  (" E\r  (Axq k"   I"!    !  !  A (ä "\nI\r (!@@ ("  F\r  (" \nI\r ( G\r  ( G\r   6   6@@@ ("E\r  Aj! ("E\r Aj!@ ! " Aj!  ("\r   Aj!  ("\r   \nI\r A 6 A ! @ E\r @@  ("At"( G\r  A j  6   \rA  	A~ wq6Ø   \nI\r@@ ( G\r    6   6  E\r   \nI\r   6@ ("E\r   \nI\r   6   6 ("E\r   \nI\r   6   6@@ AK\r    j" Ar6   j"   (Ar6  Ar6  j" Ar6  j 6 @ E\r  AxqAü j!A (è ! @@A Avt" q\r A   r6Ô  ! (" \nI\r   6   6   6   6A  6è A  6Ü  Aj! A!  A¿K\r   Aj"Axq!A (Ø "E\r A!@  AôÿÿK\r  A& Avg" kvAq  AtkA>j!A  k!@@@@ At( "\r A ! A !A !  A A Avk AFt!A !@@ (Axq k" O\r  ! ! \r A ! ! !    ("   AvAqj("F   !  At! ! \r @   r\r A !A t" A   kr q" E\r  hAt( !   E\r@  (Axq k" I!@  ("\r   (!   !    ! !  \r  E\r  A (Ü  kO\r  A (ä "I\r (!@@ ("  F\r  (" I\r ( G\r  ( G\r   6   6@@@ ("E\r  Aj! ("E\r Aj!@ ! " Aj!  ("\r   Aj!  ("\r   I\r A 6 A ! @ E\r @@  ("At"( G\r  A j  6   \rA  A~ wq"6Ø   I\r@@ ( G\r    6   6  E\r   I\r   6@ ("E\r   I\r   6   6 ("E\r   I\r   6   6@@ AK\r    j" Ar6   j"   (Ar6  Ar6  j" Ar6  j 6 @ AÿK\r  AxqAü j! @@A (Ô "A Avt"q\r A   r6Ô   !  (" I\r   6  6   6  6A! @ AÿÿÿK\r  A& Avg" kvAq  AtkA>j!    6 B 7  AtA j!@@@ A  t"q\r A   r6Ø   6   6 A A  Avk  AFt!  ( !@ "(Axq F\r  Av!  At!   Aqj"("\r  Aj"  I\r   6   6  6  6  I\r ("  I\r   6  6 A 6  6   6 Aj! @A (Ü "  I\r A (è !@@   k"AI\r   j" Ar6   j 6   Ar6   Ar6   j"   (Ar6A !A !A  6Ü A  6è  Aj! @A (à " M\r A   k"6à A A (ì "  j"6ì   Ar6   Ar6  Aj! @@A (¬ E\r A (´ !A B7¸ A B 7° A  AjApqAØªÕªs6¬ A A 6À A A 6 A !A !   A/j"j"A  k"q" M\rA ! @A ( "E\r A ( " j" M\r  K\r@@@A -  Aq\r @@@@@A (ì "E\r A ! @@   ( "I\r     (jI\r  (" \r A  "AF\r !@A (° " Aj" qE\r   k  jA   kqj!  M\r@A ( " E\r A ( " j" M\r   K\r  "  G\r  k q" "  (   (jF\r !   AF\r@  A0jI\r   !  kA (´ "jA  kq" AF\r  j!  ! AG\rA A ( Ar6   !A  !  AF\r  AF\r   O\r   k" A(jM\rA A (  j" 6 @  A ( M\r A   6 @@@@A (ì "E\r A ! @   ( "  ("jF\r  (" \r @@A (ä " E\r    O\rA  6ä A ! A  6 A  6 A A6ô A A (¬ 6ø A A 6  @  At" Aü j"6   6   Aj" A G\r A  AXj" Ax kAq"k"6à A   j"6ì   Ar6   jA(6A A (¼ 6ð   O\r   I\r   (Aq\r     j6A  Ax kAq" j"6ì A A (à  j"  k" 6à    Ar6  jA(6A A (¼ 6ð @ A (ä O\r A  6ä   j!A ! @@@  ( " F\r  (" \r   - AqE\rA ! @@@   ( "I\r     (j"I\r  (!  A  AXj" Ax kAq"k"6à A   j"6ì   Ar6   jA(6A A (¼ 6ð   A\' kAqjAQj"    AjI"A6 AjA ) 7  A ) 7A  Aj6 A  6 A  6 A A 6   Aj! @  A6  Aj!  Aj!   I\r   F\r   (A~q6   k"Ar6  6 @@ AÿK\r  AxqAü j! @@A (Ô "A Avt"q\r A   r6Ô   !  ("A (ä I\r   6  6A!A!A! @ AÿÿÿK\r  A& Avg" kvAq  AtkA>j!    6 B 7  AtA j!@@@A (Ø "A  t"q\r A   r6Ø   6   6 A A  Avk  AFt!  ( !@ "(Axq F\r  Av!  At!   Aqj"("\r  Aj" A (ä I\r   6   6A!A! ! !  A (ä "I\r ("  I\r   6  6   6A ! A!A!  j 6   j  6 A (à "  M\r A    k"6à A A (ì "  j"6ì   Ar6   Ar6  Aj! Þ A06 A ! Ü     6     ( j6    !  Aj$   \n  Ax  kAqj" Ar6 Ax kAqj"  j"k! @@@ A (ì G\r A  6ì A A (à   j"6à   Ar6@ A (è G\r A  6è A A (Ü   j"6Ü   Ar6  j 6 @ ("AqAG\r  (!@@ AÿK\r @ (" Av"AtAü j"F\r  A (ä I\r ( G\r@  G\r A A (Ô A~ wq6Ô @  F\r  A (ä I\r ( G\r  6  6 (!	@@  F\r  ("A (ä I\r ( G\r ( G\r  6  6@@@ ("E\r  Aj! ("E\r Aj!@ ! "Aj! ("\r  Aj! ("\r  A (ä I\r A 6 A ! 	E\r @@  ("At"( G\r  A j 6  \rA A (Ø A~ wq6Ø  	A (ä I\r@@ 	( G\r  	 6 	 6 E\r A (ä "I\r  	6@ ("E\r   I\r  6  6 ("E\r   I\r  6  6 Axq"  j!   j"(!  A~q6   Ar6   j  6 @  AÿK\r   AxqAü j!@@A (Ô "A  Avt" q\r A    r6Ô  !  (" A (ä I\r  6   6  6   6A!@  AÿÿÿK\r   A&  Avg"kvAq AtkA>j!  6 B 7 AtA j!@@@A (Ø "A t"q\r A   r6Ø   6   6  A A Avk AFt! ( !@ "(Axq  F\r Av! At!  Aqj"("\r  Aj"A (ä I\r  6   6  6  6 A (ä " I\r ("  I\r  6  6 A 6  6  6 AjÜ  Å\n@@  E\r   Axj"A (ä "I\r  A|j( "AqAF\r  Axq" j!@ Aq\r  AqE\r  ( "k" I\r   j! @ A (è F\r  (!@ AÿK\r @ (" Av"AtAü j"F\r   I\r ( G\r@  G\r A A (Ô A~ wq6Ô @  F\r   I\r ( G\r  6  6 (!@@  F\r  (" I\r ( G\r ( G\r  6  6@@@ ("E\r  Aj! ("E\r Aj!@ ! "Aj! ("\r  Aj! ("\r   I\r A 6 A ! E\r@@  ("At"( G\r  A j 6  \rA A (Ø A~ wq6Ø   I\r@@ ( G\r   6  6 E\r  I\r  6@ ("E\r   I\r  6  6 ("E\r  I\r  6  6 ("AqAG\r A   6Ü   A~q6   Ar6   6   O\r ("AqE\r@@ Aq\r @ A (ì G\r A  6ì A A (à   j" 6à    Ar6 A (è G\rA A 6Ü A A 6è @ A (è "	G\r A  6è A A (Ü   j" 6Ü    Ar6   j  6  (!@@ AÿK\r @ (" Av"AtAü j"F\r   I\r ( G\r@  G\r A A (Ô A~ wq6Ô @  F\r   I\r ( G\r  6  6 (!\n@@  F\r  (" I\r ( G\r ( G\r  6  6@@@ ("E\r  Aj! ("E\r Aj!@ ! "Aj! ("\r  Aj! ("\r   I\r A 6 A ! \nE\r @@  ("At"( G\r  A j 6  \rA A (Ø A~ wq6Ø  \n I\r@@ \n( G\r  \n 6 \n 6 E\r  I\r  \n6@ ("E\r   I\r  6  6 ("E\r   I\r  6  6  Axq  j" Ar6   j  6   	G\rA   6Ü   A~q6   Ar6   j  6 @  AÿK\r   AxqAü j!@@A (Ô "A  Avt" q\r A    r6Ô  !  ("  I\r  6   6  6   6A!@  AÿÿÿK\r   A&  Avg"kvAq AtkA>j!  6 B 7 AtA j!@@@@A (Ø "A t"q\r A   r6Ø   6 A! A!  A A Avk AFt! ( !@ "(Axq  F\r Av! At!  Aqj"("\r  Aj"  I\r   6 A! A! ! ! !  I\r (" I\r  6  6A !A! A!  j 6   6   j 6 A A (ô Aj"A 6ô Ü  @  \r   @ A@I\r Þ A06 A @  AxjA AjAxq AI "E\r  Aj@  "\r A    A|Ax  A|j( "Aq Axqj"   Ià     		@@  A (ä "I\r   ("Aq"AF\r  Axq"E\r    j"("AqE\r @ \r A ! AI\r@  AjI\r   !  kA (´ AtM\rA !@  I\r @  k"AI\r     AqrAr6   j" Ar6  (Ar6     A !@ A (ì G\r A (à  j" M\r    AqrAr6   j"  k"Ar6A  6à A  6ì   @ A (è G\r A !A (Ü  j" I\r@@  k"AI\r     AqrAr6   j" Ar6   j" 6   (A~q6   Aq rAr6   j" (Ar6A !A !A  6è A  6Ü   A ! Aq\r Axq j" I\r (!@@ AÿK\r @ (" Av"	AtAü j"F\r   I\r ( G\r@  G\r A A (Ô A~ 	wq6Ô @  F\r   I\r ( G\r  6  6 (!\n@@  F\r  (" I\r ( G\r ( G\r  6  6@@@ ("E\r  Aj! ("E\r Aj!@ !	 "Aj! ("\r  Aj! ("\r  	 I\r 	A 6 A ! \nE\r @@  ("At"( G\r  A j 6  \rA A (Ø A~ wq6Ø  \n I\r@@ \n( G\r  \n 6 \n 6 E\r  I\r  \n6@ ("E\r   I\r  6  6 ("E\r   I\r  6  6@  k"AK\r    Aq rAr6   j" (Ar6      AqrAr6   j" Ar6   j" (Ar6     Ü   ±A!@@  A  AK" Ajq\r  ! @ " At!   I\r @ A@  kI\r Þ A06 A @A AjAxq AI"  jAj "\r A  Axj!@@  Aj q\r  !  A|j"( "Axq   jAjA   kqAxj"A     kAKj"  k"k!@ Aq\r  ( !   6    j6      (AqrAr6   j" (Ar6   ( AqrAr6   j" (Ar6   @  ("AqE\r  Axq" AjM\r     AqrAr6   j"  k"Ar6   j" (Ar6     Aj|@@@ AG\r   !A! AI\r Aq\r Av" Ajq\r@ A@ kM\r A0 A AK  !@ \r A0   6 A ! ù	   j!@@@@  ("AqE\r A (ä ! AqE\r    ( "k" A (ä "I\r  j!@  A (è F\r   (!@ AÿK\r @  (" Av"AtAü j"F\r   I\r (  G\r@  G\r A A (Ô A~ wq6Ô @  F\r   I\r (  G\r  6  6  (!@@   F\r   (" I\r (  G\r (  G\r  6  6@@@  ("E\r   Aj!  ("E\r  Aj!@ ! "Aj! ("\r  Aj! ("\r   I\r A 6 A ! E\r@@    ("At"( G\r  A j 6  \rA A (Ø A~ wq6Ø   I\r@@ (  G\r   6  6 E\r  I\r  6@  ("E\r   I\r  6  6  ("E\r  I\r  6  6 ("AqAG\r A  6Ü   A~q6   Ar6  6   I\r@@ ("Aq\r @ A (ì G\r A   6ì A A (à  j"6à    Ar6  A (è G\rA A 6Ü A A 6è @ A (è "	G\r A   6è A A (Ü  j"6Ü    Ar6   j 6  (!@@ AÿK\r @ (" Av"AtAü j"F\r   I\r ( G\r@  G\r A A (Ô A~ wq6Ô @  F\r   I\r ( G\r  6  6 (!\n@@  F\r  (" I\r ( G\r ( G\r  6  6@@@ ("E\r  Aj! ("E\r Aj!@ ! "Aj! ("\r  Aj! ("\r   I\r A 6 A ! \nE\r @@  ("At"( G\r  A j 6  \rA A (Ø A~ wq6Ø  \n I\r@@ \n( G\r  \n 6 \n 6 E\r  I\r  \n6@ ("E\r   I\r  6  6 ("E\r   I\r  6  6   Axq j"Ar6   j 6    	G\rA  6Ü   A~q6   Ar6   j 6 @ AÿK\r  AxqAü j!@@A (Ô "A Avt"q\r A   r6Ô  ! (" I\r   6   6   6   6A!@ AÿÿÿK\r  A& Avg"kvAq AtkA>j!   6  B 7 AtA j!@@@A (Ø "A t"q\r A   r6Ø    6    6 A A Avk AFt! ( !@ "(Axq F\r Av! At!  Aqj"("\r  Aj" I\r   6    6    6    6  I\r (" I\r   6   6  A 6   6   6Ü   ? Atd~@@  ­B|BøÿÿÿA (ð " ­|"BÿÿÿÿV\r   §"O\r  \rÞ A06 AA  6ð     A $ A AjApq$  # # k #  # S~@@ AÀ qE\r   A@j­!B ! E\r  AÀ  k­  ­"!  !   7    7S~@@ AÀ qE\r   A@j­!B ! E\r  AÀ  k­  ­"!  !   7    7~# A k"$  Bÿÿÿÿÿÿ?!@@ B0Bÿÿ"§"AÿjAýK\r   B< B! Aj­!@@  Bÿÿÿÿÿÿÿÿ" BT\r  B|!  BR\r  B |!B   BÿÿÿÿÿÿÿV"!  ­ |!@   P\r  BÿÿR\r   B< BB! Bÿ!@ AþM\r Bÿ!B ! @Aø Aø  P"" k"Að L\r B ! B ! Aj    BÀ  "A k        ) "B< )B! @@ Bÿÿÿÿÿÿÿÿ  G ) )B Rq­"BT\r   B|!  BR\r   B  |!   B    BÿÿÿÿÿÿÿV"!  ­! A j$  B4 B  ¿& @A (Ä \r A  6È A   6Ä \n   $  # T# Ak"$ A !@  Aq\r    p\r  Aj    ! A  (  ! Aj$   @   " \r    >  A  AK!@@  "\rÆ " E\r      	 ©      Ã  \n    \n   ¡  @   ¤ "\r   L A AK!  A  AK! @@   ¥ "\rÆ "E\r     $      jAjA   kq"  K V A A 6Ä A    A (Ä ! A A 6Ä @  AF\r A  !       \n        ¦ # A± ð Aà¬ A     !@@  AqE\r @  -  \r     k  !@ Aj"AqE\r -  \r @ "Aj!A ( "k rAxqAxF\r @ "Aj! -  \r    k   A¬ Aj6   V ª "A\rj "A 6  6  6  ­ !@ Aj"E\r    ü\n     6      Aj{   « " Aü¬ Aj6 A A 6Ä A   Aj  A (Ä !A A 6Ä @ AF\r    !   í     A{   « " A­ Aj6 A A 6Ä A   Aj  A (Ä !A A 6Ä @ AF\r    !   í    A A 6Ä A   ² " ! A (Ä !A A 6Ä @@ AF\r   E\r@ E\r   A  ü   ³ A  !       Ã  \r   Aj´    Aj\n   AjA|q\\ A A 6Ä A   ¶  A (Ä ! A A 6Ä @  AF\r A  !          Ahj @  E\r   ¶ A¸      (  j"6  á@@  E\r @  ¶ "( \r A A 6Ä A A A AAø  A (Ä ! A A 6Ä   AF\r  A¸ \r  - \r\r @ ("E\r A A 6Ä     A (Ä !A A 6Ä  AF\r  µ A  !       ³# Ak"$   : @@  ("\r @  î E\r A!  (!@  (" F\r   (P Aÿq"F\r    Aj6  :  @   AjA  ($  AF\r A! - ! Aj$      ¼ {@@ (L"A H\r  E\r Aÿÿÿÿqó (G\r@  Aÿq" (PF\r  (" (F\r   Aj6   :     º    ½ @ AÌ j"¾ E\r  ç @@  Aÿq" (PF\r  (" (F\r   Aj6   :    º !@ ¿ AqE\r  À      ( "Aÿÿÿÿ 6    ( !  A 6  \r   Aé W# Ak"$ AÒ AAA (¸¥ "ù   6     A\n » Ü     (  Ä Å   Aô Â ä A A 6Ä    A (Ä ! A A 6Ä @@  AF\r A A 6Ä A A A  A (Ä ! A A 6Ä   AG\rA  !     A A 6Ä A Aü A  A (Ä ! A A 6Ä   AG\r A  !        AÌ Â  Añ A Á  +@A  A  AK"¥ " \r  É !   # A k"$   Ê !@A (Ð " \r Ë A (Ð ! A !A !@@@  E\r   Aà F\r   Aj"Aq\r@  /" kAqA   K j" O\r     k";   AÿÿqAtj"  ;  A ;   Aj"AqE\r A 6 A§6 Aù 6 Aï  Á    K\r  / !@@ \r A  AÿÿqÌ 6Ð   ;   A ;  A j$   A 6 A6 Aù 6Aï  AjÁ    !  / Ì !  \r   AjAvAj7A Ò " 6Ð   Aà   kAv;  Aà Ñ ;    AtAà j! @  Î E\r   Ï   §    Aà O  Aà IqÓ  A|j!A !A (Ð "!@@ "E\r Aà F\r@ Ð  G\r    A~j/  /j;@ Ð  G\r   A~j" / / j; @ \r A  6Ð   / ;   Ñ ;  / Ì ! !   Ñ ; A  6Ð \r     /Atj   Aà kAvAÿÿq Aì Y -  !@  -  "E\r   AÿqG\r @ - !  - "E\r Aj!  Aj!   AÿqF\r   Aÿqk\n         Ô A¢    Ô A¢ 9 @ \r   ( (F@   G\r A  Ú  Ú Ó E   (# AÐ k"$ A!@@   A Ù \r A ! E\r A ! A © AÐ© A Ü "E\r  ( "E\r@A8E\r  AjA A8ü  A: K A6    6  6 A6D  Aj A ( (  @ (,"AG\r   ($6  AF! AÐ j$   AÛ 6 Aç6 AÛ 6 Aï  Á  # Ak"$  Aj  Ý  (" A Ù ! (!@@ E\r       ( Þ !      ß "\r        à ! Aj$  /   ( "Axj( "6    j6    A|j( 6×# AÀ k"$ A !@@ A H\r  A  A  kF! A~F\r  Aj"B 7  A$jB 7  A,jB 7  B 7  6  6   6  6 A 6< B74  Aj  AA  ( (   A  ( AF! AÀ j$  Å# AÀ k"$ A !@ A H\r    k"  H\r  Aj"B 7  A$jB 7  A,jB 7  B 7  6  6  6 A 6< B74   6  Aj  AA  ( (    A  ( ! AÀ j$  ò# AÀ k"$   6  6   6  6A !@A\'E\r  AjA A\'ü  A 6< A: ;  Aj AA  ( (  @@@ ((  (A  ($AFA  ( AFA  (,AF!@ (AF\r  (,\r ( AG\r ($AG\r (! AÀ j$  w@ ($"\r   6  6 A6$  (86@@ ( (8G\r  ( G\r  (AG\r  6 A: 6 A6  Aj6$% @   (A Ù E\r     á F @   (A Ù E\r     á   ("      ( (    A: 5@  (G\r  A: 4@@ ("\r  A6$  6  6 AG\r (0AF\r@  G\r @ ("AG\r   6 ! (0AG\r AF\r  ($Aj6$ A: 6  @  (G\r  (AF\r   6 @   ( Ù E\r     å @@   (  Ù E\r @@  (F\r   (G\r AG\r A6   6 @ (,AF\r  A ;4  ("    A   ( (  @ - 5AG\r  A6, - 4E\r A6,  6  ((Aj6( ($AG\r (AG\r A: 6  ("       ( (  ¤ @   ( Ù E\r     å @   (  Ù E\r @@  (F\r   (G\r AG\r A6   6  6   ((Aj6(@ ($AG\r  (AG\r  A: 6 A6,L @   ( Ù E\r      ä   ("        ( (  \' @   ( Ù E\r      ä Z# Ak"$   ( 6@    Aj  ( (  " E\r   (6  Aj$   D@  ì "("E\r  A® A°ª A Ü E\r   (  ("       Ahj      í   A¢  Aí    « " Aä« Aj6      í   A¢  AÅ    ð " Aø« Aj6      í   A¢  AÉ $   Aü¬ Aj6   Aj÷   í 7@  ¯ E\r   ( ø "Ajù AJ\r  ¡      Atj    ( Aj"6     ö   A¢ \r   Ajü    ( $   A­ Aj6   Aj÷   í    ý   A¢ \r   Ajü    ö   A¢    \n   $ #   kApq"$   # û@  \r A !@A ( E\r A (  !@A (è E\r A (è   r!@ì ( " E\r @@@  (LA N\r A!  ç E!@  (  (F\r     r!@ \r   è   (8" \r í  @@  (LA N\r A!  ç E!@@@  (  (F\r   A A   ($    (\r A! E\r@  ("  ("F\r     k¬A  ((  A !  A 6  B 7  B 7 \r  è  £# A k"$     Aj " 6 A  Aj"  K6@AE\r  A Aü  A6L A§ 6$ A6P  Aj6,  Aj6T  A :      ! A j$  ¶  (T"( !@ ("  (  ("k"  I"E\r    à   (  j"6   ( k"6@    I"E\r    à   (  j"6   ( k6 A :      (,"6   6 9# Ak"$   6      ! Aj$  ÿ# AÐ#k"$ @@@@@@  E\r  E\r \rA ! E\r A}6 A ! A0j      ª j ! A A 6Ä A¨    !A (Ä !A A 6Ä  AF\r@@ \r A~! Aj   !@  Aèj \r  A½ 6 A A 6Ä  A6 A 6A Aï   A (Ä !A A 6Ä @ AF\r   ! A A 6Ä A©    A (Ä !A A 6Ä  AF\r A  !@ E\r    6   !A !@ E\r   6     AÐ#j$   !  !             # Aà k"$   AØ jAÿ  ) 7 @@@   A j \r   AÐ jAþ  ) 7   Aj E\r    "6L@ \r A !@  A  A.G\r    AÌ j AÄ j  ( "  ( k  !    (6 A     !  A<jAý  ) 7@@   Aj \r   A4jAü  ) 7   Aj E\r    "6LA ! E\r  A,jA°  ) 7     E\r  Aß  !A ! AÄ j  A   AÄ j !@ E\r  \rA !@  A  A.G\r     (6    \r  AÒ  AÌ j !A       ! Aà j$  % @@ \r A ! ( !      \r   (   (FB      ( (  @  / AÀqAÀ F\r      ( (  ,  A¡     ("Aj6   ( j :       (   ( Q   Aj¢   Aèj£   AÌj¤   A j¥   Aj¦   Aj¦       6   6   Aj§   Aj§   A j¨   AÌj©   Aèjª   B 7  A6  A :   A;  AjA 6   Aj«       6    ½ 6  ~# A k"$  Aj  ( "  ( k !  ) "7  ) 7  7 @ Aj ¼ "E\r    ¶   ( j6  A j$  Ë\n	# A k"$  AÔ j  ¾ !@@@@  A  "AÔ F\r  AÿqAÇ G\rA A 6Ä Aª    !A (Ä ! A A 6Ä   AG\r !     6PA ! A<j  À !A A 6Ä A«     !A (Ä !A A 6Ä @@@@@@@ AF\r   68 E\rA !A A 6Ä A¬     !A (Ä !A A 6Ä  AF\r  \r ! AÐ jÃ \r A 64  A,jA´  ) 7@@@   Aj E\r   Aj"Ä !@@  AÅ  \rA A 6Ä A­    !A (Ä !A A 6Ä  AF\r  6  E\r\n  A jÆ  A A 6Ä A®  A j    A (Ä !A A 6Ä  AF\r    A jÈ 64 A 6@ -  \r  - AqE\r A !A A 6Ä A¯    !A (Ä !A A 6Ä  AF\r  6 E\r A jÉ !@  Aö  \r   Aj"Ä ! - Aq!	@A A 6Ä A¯    !A (Ä !A A 6Ä  AF\r  6 E\r	@  Ä G\r  	E\r A A 6Ä A°    Aj !A (Ä !A A 6Ä  AF\r	  6  AjÆ @ AÐ jÃ \r   A  AÑ G\rA A 6Ä A®  Aj    A (Ä !A A 6Ä  AF\r	  )7  A 6@  AÑ  E\r A A 6Ä A±    !A (Ä !A A 6Ä  AF\r  6 E\r   Aj A8j  A4j Aj Aj AjÌ !\n !   !   !   !   !   !   !  A ! !   Í      Í  A j$  *A !@  (  ( " k M\r    j-  ! À    6   6      Aj  Î \r   (  ( k8A !@  ( "  (F\r  -   AÿqG\r A!   Aj6   ( !@ E\r  Aî  @  E\r  ( ",  APjA\nO\r @@  E\r ,  APjA	K\r  Aj"6       k   Ï    (E   Aj  Ð ô# A0k"$ A ! A 6,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  A  "AÿqA¿j:!!%!!! !!! $ !!!!!!!!!!	\n!!! \r!AA Aò F"     AÖ F!@       AË Fj" AÿqA¼j $%$   Aj Aÿq"Aj"A	K\r"A tAqE\r"$    ( Aj6   AÅ Ñ !\'    ( Aj6   AÞ Ò !&    ( Aj6   A Ñ !%    ( Aj6   AÍ Ñ !$    ( Aj6   AÆ Ó !#    ( Aj6   AÄ Ô !"    ( Aj6   Aè Õ !!    ( Aj6   Aß Ö !     ( Aj6   A¼ × !    ( Aj6   A³ Ø !    ( Aj6   AË Ñ !    ( Aj6   AÂ Ô !    ( Aj6   A¸ Ù !    ( Aj6   Ú !    ( Aj6   AÛ Û !    ( Aj6   AÒ Ü !    ( Aj6   AÂ Õ !    ( Aj6   A© Ý !    ( Aj6   A¤ Ó !    ( Aj6   Aä Þ !    ( Aj6   A × !    ( Aj6  A$j  ß  A$j \r@  AÉ  E\r     "6  E\r  AÅ  E\r    A$j A jà "6,    A$já "6,@@@@@@@@@@@@@@@@@@@  A "AÿqA¿j8$$$$$$$$$$ $$$$$$$$$$$$$$\r $	$$$ $$\n  $    ( Aj6   Aú Ù !#    ( Aj6   Aï Þ !"    ( Aj6   A Ù !!    ( Aj6   Aê Ñ !     ( Aj6   AjAð  ) 7@   Aj E\r   Aî â ! A ! A$j  A      A$jã 6   Aß  E\r   A jä !  A !    ( Aj6 @@@@@@ AÿqAj$$$$$$ $  A Ø !#  A å !"  AÛ Ý !!  AÒ â !   AÁ Ó !  A¸ æ !  A !    ( Aj6 @@@@@@ AÿqAj###### #  Aé Ø !"  Aà å !!  A» Ý !   A² â !  A¡ Ó !  A æ !    ( "Aj6 A !  A  AÄ G\r@  A "AÒ F\r  AÿqAÁ G\r  A !   Aj6 @@@@@@ AÿqAj###### #  Aé Ü !"  Aû ç !!  A Ó !   AÍ æ !  A¢ è !  A³ é !  A !   Aj6 @@@@@@ AÿqAj"""""" "  AÉ Ü !!  AÛ ç !   Aö Ó !  A­ æ !  A è !  A é !  AÂ F:     ( Aj6 A !@@  A  APjA	K\r  A$j  A      A$jã 6    ê "6  E\r  Aß  E\r   A j Ajë !    ( Aj6   A Û !    ( Aj6   Aþ Û !    ( Aj6   Aæ Ò !    ( Aj6   A¿ Ñ !    ( Aj6   Aþ Ö ! A$jA¾ Aý  Aë F !    ( Aj6 A !   A Á "6  E\r   A j ì !    ( Aj6   AÏ Ö !  í !  î !    ( Aj6     "6$ E\r    A$jï "6,  ð !\r  ñ !@@  A Aÿq"Aj  Aå F\r   ò "6, E\r  - AG\r  A  AÉ G\r  Aj A,jÆ    A ó "6$ E\r    A,j A$jô "6,    ( Aj6     "6$ E\r    A$jõ "6,    ( Aj6     "6$ E\r A 6     A$j A jö "6,\n    ( Aj6     "6$ E\r A6     A$j A jö "6,	    ( Aj6     "6$ E\r\n    A$j÷ "6,    ( Aj6     "6$ E\r    A$jø "6,  A Aô F\r A ! A :     A  A jù "6, E\r -  !@  A  AÉ G\r @ Aq"E\r   - AqE\r	@ \r   Aj A,jÆ    A ó "6$ E\r	    A,j A$jô "6, ! AqE\r  ú !A ! AÏ F\r  û !  ü !  6, E\r  Aj A,jÆ  ! A0j$  :    6  A 6   6   Ô 6Ô !  A6   6  V@  ( j"  ("M\r    At" Aàj"  K"6    (   "6  \r Ü  \n   ±  @  ­ \r   (     @  ® \r   (     @  ¯ \r   (     @  ° \r   (    7    Aj6    Aj"6   6 @AE\r  A Aü   H  B 7    A,j6    Aj"6   6   AjB 7   AjB 7   A$jB 7   4  B 7    Aj6    Aj"6   6   AjB 7   4  B 7    Aj6    Aj"6   6   AjB 7   \n   ¬    B 7     6   \r   (   AjF\r   (   AjF\r   (   AjF\r   (   AjF   ²   @@@  ( "E\r   ( 6    F\r      B 7     6    (E   (    (   (Atj   (\n   ¹    ( 7# Ak"$  Aj  ( º ( !  Aj$       6   \r   / AtAu~# A k"$ A !@ ¶   ¶ K\r     ¶  ¶ ký    ) "7  ) "7  7  7  Aj þ ! A j$  \n    i   6   Aj© !  A j¨ !   ( AÌj    ( A j   ( AÌj   ( A j   ´# Ak"$ A !@@@@  A  "AÇ F\r  AÿqAÔ G\r  ( !@@@@@@@@@@@  A Aÿq"A¿j	\n\n\n\n\n  A­j	   Aj6    Å "6 E\r   Aj !   Aj6     "6 E\r\n   Aj !   Aj6     "6 E\r	   Aj !\n   Aj6     "6 E\r   Aj !	   Aj6     "6 E\r   Aj !   Aj6     "6A ! E\r Aj  A  Aj \r  Aß  E\r    "6 E\r   Aj Aj !   Aj6 A !   A Á "6 E\r  A  Aj !   Aj6 A !   A Á "6 E\r   Aj ! Aã F\r   Aj6 A !  A  !   \r    "6 E\r@ Aö G\r    Aj !   Aj !@@@  A Aÿq"A®j     ( Aj6 A !   A Á "6 E\r   Aj !    ( Aj6 A !   A Á "6 E\r   Aj !  Aß  !@ \r A ! E\r   Aj ! AÉ G\r    ( Aj6 A ! A 6   Aj \r (E\r   Aj !   Aj6    \r   \r    "6 E\r    Aj !A ! Aj$  5   A :   A 6  A ;  Aèj !  A :    6  # Ak"$ @@@  A  "AÚ F\r  AÿqAÎ G\r    !    !A ! A :      Ajù "6 E\r  - !@  A  AÉ G\r @ Aq\r   Aj AjÆ A !    A Gó "6 E\r@ E\r  A:    Aj Ajô !A   Aq! Aj$  Æ  Aèj" " ("  K!  AÌj! @@@  F\r   ( (!   \r  A  ( E\r   A  (  O\r  A  (   ( !   (  6 Aj!   (    IPA!@  ( "  E\r A !  A  ARj" AÿqA1K\r B  ­Bÿ§! Aq   (  ( kAu¢# Ak"$ A !@@@@@@  A  A¶jAw     ( Aj6   ê "E\r A   AÅ  !    ( Aj6   Aj"Ä !@@  AÅ  \r   Å "6 E\r  AjÆ   Aj   Ç    Aj¢ !@  A AÚ G\r     ( Aj6    "E\r A   AÅ  !  £ !  ¤ E\r A !   A ¥ "6 E\r   Å "6@ \r A !   Aj Aj¦ !   ! Aj$  H@  ("  (G\r     Ä At§   (! ( !   Aj6  6 # Ak"$ @  Aj"Ä M\r  A 6 A6 Aé 6 Aï  Á      ©  Atj ª «   ¬  Aj$    Aj ¨    B 7      Aj ­ # Ak"$  Aj  AjA® !A A 6Ä A²    !A (Ä ! A A 6Ä @  AF\r  ¯  Aj$   !   ¯        Aj       ° F  ( AÌj  Aj"   ( A j  A j"  ¥  ¤   X~# Ak"$   Aé !  ( !  ) "7   7    ù ! Aj$     B 7   \\# Ak"$   Aé !  Aj  ! ( !  ) 7     ê ! Aj$     Aj ©    Aj Ò    Aj     Aj     Aj     Aj ¾    Aj     Aj     Aj     Aj    Aj     Aj     Aj     Aj  r# Ak"$ @@@  Ajü \r    ("O\r  Ï    (     (  j6  Aj$    Aj      Aj ÿ    Aj     Aj ¥    Aj     Aj þ    Aj     Aj     Aj     Aj  Ñ# AÀk"$   A´jAÌ  ) 7    Aj ": ¿@@@@@@@@@  Æ "E\r  A¨j Ç A !@@@@@@@@@@@@ È \r 	\n  )¨7  É !  ) 7`   Aà j Ê !  )¨7 É !  )7h   Aè j Ë !@  Aß  E\r   )¨7 É !  )7p   Að j Ë !   ê "6 E\r  É 6ô   Aj A¨j AôjÌ !   ê "6 E\r   ê "6ô E\r  É 6   Aj Aôj AjÍ !   ê "6 E\r   ê "6ô E\r  É 6   Aj A¨j Aôj AjÎ !  Aj"Ä !@@  Aß  \r   ê "6 E\r  AjÆ   Aj   Ç     "6A ! E\r  AüjAÃ  ) 7x   Aø j ! Ä !@@  AÅ  \r E\r   ê "6ô E\r  AôjÆ   Aôj   Ç   Ï : ó  É 6ì   Aj Aj Aôj A¿j Aój AìjÐ !   ê "6 E\r  Ï :   É 6ô   Aj A¿j Aj AôjÑ !\r   ê "6ôA ! E\r  Aj"Ä !@@  AÅ  \r   ê "6 E\r  AjÆ   Aj   Ç   Ï : ì  É 6   Aôj Aj Aìj AjÒ !A ! Aj  AjA ® !A A 6Ä A¯    !A (Ä !A A 6Ä  AF\r  6ô ¯  E\r  Aj"Ä !  Aß  !@  AÅ  \r   ê "6 E\r  AjÆ  \r  Aj   Ç    ê "6 E\r	   ê "6ô E\r	   ê "6 E\r	  É 6ì   Aj Aôj Aj AìjÓ !\n    "6 E\r   ê "6ô E\r  É 6   A¨j Aj Aôj AjÔ !	@@ Ï E\r    !  ê !  6 E\r  É 6ô   A¨j Aj AôjÕ !A !   AI\r@@  A  "Aæ F\r @ Aÿq"AÔ F\r  AÌ G\r  £ !\n  ò !	@@  A "Að F\r  AÿqAÌ G\r  A APjA	K\r  Ö !	  × !  AäjA  ) 7X@   AØ j E\r   Aj"Ä !@@  AÅ  \r   Ø "6¨ E\r	  A¨jÆ   A¨j   Ç    A¨jÙ !  AÜjAÔ  ) 7P@   AÐ j E\r   Ú !  AÔjAÇ  ) 7H@   AÈ j E\r    ê "6¨ E\r A6   A¨j AjÛ !@  A  Aò G\r   A A rAÿqAñ G\r   Ü !  AÌjAÎ  ) 7@@   AÀ j E\r   Ý !  AÄjAØ  ) 78@   A8j E\r    ê "6¨ E\r   A¨jï !  A¼jAù  ) 70@   A0j E\r A !@  A  AÔ G\r    ò "6¨ E\r   A¨jÞ !	   Ö "6¨ E\r   A¨jß !  A´jA  ) 7(@   A(j E\r   Aj"Ä !@@  AÅ  \r   Å "6¨ E\r	  A¨jÆ   A¨j   Ç     A¨jà 6   Ajß !  A¬jA  ) 7 @   A j E\r     "6A ! E\r  Aj"Ä !@@  AÅ  \r   Ø "6¨ E\r\n  A¨jÆ   A¨j   Ç    Aj A¨já !  A¤jAþ  ) 7@   Aj E\r   Aö Õ !  AjAó  ) 7@   Aj E\r    ê "6¨ E\r   A¨jâ !@  Aõ  E\r    æ "6 E\rA ! A 6ô Aj  ( (   AjAÝ  !  )7  ) 7 A!@ Aj þ E\r @@  Aô  E\r    !  Aú  E\r  ê !  6ô E!A!  Aj"Ä ! \r@  AÅ  \r   Å "6¨ E\r  A¨jÆ     ã ! !  ¯     Aj   Ç  E\rA ! \r  AôjÆ  A¨j   Ç  A : ì A6   Aj A¨j Aìj AjÒ !A ! Ajä AG\r  É 6   Aôj Aj Ajå !A ! AÀj$     Aj      Aj   # Ak"$ A !@  AÄ  E\r @  Aô  \r   AÔ  E\r   ê "6A ! E\r   AÅ  E\r    Aj ! Aj$  ó# A k"$   AjA  ) 7 A !@    E\r A !@@  A  AOjAÿqAK\r  Aj  A      Ajã 6  Aß  E\r@  Að  E\r    Aj !    "6 E\r   Aj Aj !@  Aß  \r    ê "6A ! E\r  Aß  E\r    "6 E\r   Aj Aj !    "6 E\r    Aj !A ! A j$     Aj  í# Ak"$ A !@  AÁ  E\r A ! A 6@@  A  APjA	K\r  Aj  A      Ajã 6  Aß  \r  Aß  \r A !  ê "E\r  Aß  E\r  6    "6@ \r A !   Aj Aj ! Aj$  |# Ak"$ A !@  AÍ  E\r     "6@ E\r     "6 E\r    Aj Aj !A ! Aj$  # A k"$   ( !A !@@  AÔ  E\r A !A !@  AÌ  E\r A !   Ajü \r (!  Aß  E\r Aj! A 6@  Aß  \r A !   Ajü \r  (Aj"6  Aß  E\r@  - AG\r    Aj  As  ( j ã !@  - AG\r  \r    Aj " A,G\r  6  Aèj Aj @@   AÌj"µ O\r    ( E\r     (  I\rA !  ( G\r  µ "K\r@  G\r  A 6  Aj   A¿ Ñ !   (   ( ! A j$   A 6 A.6 Aé 6 Aï  Á  ­# A k"$ A !@  AÉ  E\r @ E\r   AÌj"    A j"6  Aj     Aj"Ä ! A 6  A j!@@@  AÅ  \r@@ E\r    Å "6 E\r  AjÆ   6@@  "A)F\r  A"G\r   6 Aj      Aj 6  Aj    Å "6 E\r  AjÆ   AÑ  E\r    Ë "6A ! E\r  AÅ  E\r Aj   Ç    Aj Aj !A ! A j$     Aj      Aj     Aj      Aj     Aj   ¸# Ak"$   AjA  ) 7 A !A !@    E\r   AÁ × !@@  A  AÓ G\r A !   "E\r  AF\r  \r A:   !      ! Aj$  ½# AÀ k"$  A8jÏ !  A0jAì  ) 7@@   Aj E\r   A(jA¬  ) 7   A jA  ) 7@   Aj E\r   A(jAÆ  ) 7   AjA¾  ) 7     E\r   A(jAä  ) 7 A !   A Á "6(@ E\r  !  \r     A(j ! AÀ j$  «# AÐ k"$ @@@  AÕ  E\r  AÈ j  ß A ! AÈ j \r  )H7@ A8jAÄ  !  )@7  ) 7 @ Aj ¼ E\r  A0j AÈ j A	j AÈ j¶ Awj ! A(jÏ ! A j    ÿ !   6 Aj  Aj Aj Ajÿ ! Aj  ß   )7     A !  \r   û "6  E\r   A j  !A ! A 60@  A  AÉ G\r A !   A ó "60 E\r   û "6(@ E\r    A(j AÈ j A0j ! !    "6H    "60 E\r  E\r   A0j AÈ j !A ! AÐ j$  Û# Ak"$     6| A 6x  Að jAê  ) 70@@@@@@   A0j E\r    Aï Û 6x  Aè jA  ) 7(@   A(j E\r    ê "6X E\r  AÅ  E\r    AØ jü 6x  Aà jA  ) 7    A j E\r   Aj"Ä !@@  AÅ  \r    "6X E\r  AØ jÆ   AØ j   Ç     AØ jý 6x  AÐ jAÓ  ) 7   Aj A !  AÆ  E\r  AÙ      "6L E\r  A : K  Aj"Ä !@  AÅ  \r  Aö  \r   AÀ jAÊ  ) 7@   Aj E\r A!  A8jAÍ  ) 7@   Aj E\r A!    "6X E\r  AØ jÆ  A !  : K AØ j   Ç    AÌ j AØ j Aü j AË j Aø jþ ! Aj$       ( k6^~# Ak"$ A !@  ¶  ¶ G\r   ) "7   7   ÿ E! Aj$  ó# Ak"$    ¶ 6 ¶ !A A 6Ä   6A³  Aj Aj !A (Ä !A A 6Ä @ AF\r  ( !@       "\r A !  ¶  ¶ F\r AA  ¶  ¶ I! Aj$  A  !        (      Ý \n    \n   ª Õ ® !  ® !@@ E\r @ \r   (    ±  ²  ³   ( ´     (  µ Atj6@ E\r    ( 6    (6   (6 ±      ¶   Aj Aj¶   Aj Aj¶     Õ ¯ !  ¯ !@@ E\r @ \r   (    ·  ¸  ¹   ( º     (   Atj6@ E\r    ( 6    (6   (6 ·      »   Aj Aj»   Aj Aj»          ( 6     ( 6   Aj Ú    Aj Û    Aj Ü    Aj Ý    Aj Þ    Aj  à    Aj á Ò# Ak"$ @@  Aè  E\r A! Aj  A  Aj \r  Aß  As!A!  Aö  E\r A! Aj  A  Aj \r   Aß  E\r A!   A   \r   Aß  As! Aj$     Aj â    Aj ã    Aj ä ¥A!@  A  "A0H\r @ A:I\r  A¿jAÿqAK\r  ( !A !@@  A  "A0H\r@@ A:O\r AP! A¿jAÿqAO\rAI!   Aj"6  A$l j j!   6 A !    Aj å # Ak"$   Aj!@@  A×  "E\r   AÐ  :    æ "6 E\r     Aj Ajç "6   6  AjÆ   Aj$     Aj è    Aj ß    (  ( kAu# Ak"$ A !@  AÎ  E\r @@@  AÈ  \r    !@ E\r   6@@  AÏ  E\r  E\rA!  AÒ  ! E\rA! E\rA!A!  j :   A 6  Aj!A !@@@@@@  AÅ  \r @ E\r  A : A !@@@@@  A  Aÿq"A­j  AÄ F\r AÉ G\rA ! E\r\n    A Gó "6 E\r\n  A-F\r\n@ E\r  A:     Aj Ajô "6 E\r  A A rAÿqAô G\r \r  í !@@  A Aô G\r     ( Aj6   AÁ × !   "E\r  AF\r \r  6 !  ò !A ! E\r  \r   !      !  6 E\r  AjÆ   AÍ   A ! Aj$  # Aà k"$ A !@  AÚ  E\r     "6\\A ! E\r   AÅ  E\r @  Aó  E\r     (   ( 6    A Ö 6   AÜ j Aj ! Aj  ¾ !@@@@@  Aä  E\r  Aj  A A !  Aß  E\rA !A A 6Ä A«     !A (Ä !A A 6Ä  AF\r  6 E\r   AÜ j Aj !A !A A 6Ä A«     !A (Ä !A A 6Ä  AF\r  6 E\r     (   ( 6    AÜ j Aj ! Í  !   !   Í      Aà j$  o# Ak"$ @    I\r  A¤ 6 A6 Aé 6 Aï  Á    â !  Aj$    Atj\r   (   (Fo# Ak"$ @   µ I\r  A¤ 6 A6 Aé 6 Aï  Á    ² !  Aj$    Atj   (  ( kAuo# Ak"$ @    I\r  A¤ 6 A6 Aé 6 Aï  Á    ¸ !  Aj$    Atjm# Ak"$ @    M\r  AÔ 6 A6 Aé 6 Aï  Á      (  Atj6 Aj$ 3@@  ( "  (G\r A !    Aj6  -  !   À   Aj ã Î# A°k"$ A !@  AÌ  E\r A !@@@@@@@@@@@@@@@@@@@@@@@@  A  AÿqA¿j9	\n\r     ( Aj6   A¨jAÞ  ) 7    ÷ !  A jAÔ  ) 7@   Aj E\r  A 6   Ajø !  AjAÐ  ) 7A !   Aj E\r A6   Ajø !    ( Aj6   AjAÍ  ) 7   Aj÷ !    ( Aj6   AjAÆ  ) 7    A j÷ !    ( Aj6   AjAÄ  ) 7(   A(j÷ !    ( Aj6   AøjAè  ) 70   A0j÷ !    ( Aj6   AðjAß  ) 78   A8j÷ !    ( Aj6   AèjA  ) 7@   AÀ j÷ !    ( Aj6   AàjA  ) 7H   AÈ j÷ !    ( Aj6   AØjA¯  ) 7P   AÐ j÷ !    ( Aj6   AÐjA  ) 7X   AØ j÷ !\r    ( Aj6   AÈjA  ) 7`   Aà j÷ !    ( Aj6   AÀjA  ) 7h   Aè j÷ !    ( Aj6   A¸jAÛ  ) 7p   Að j÷ !\n    ( Aj6   A°jAÒ  ) 7x   Aø j÷ !	    ( Aj6   ù !    ( Aj6   ú !    ( Aj6   û !  A¨jAÿ  ) 7   Aj E\r   "E\r  AÅ  \r    "6A ! E\r  AÅ  E\r   Ajü !  A jAá  ) 7   Aj E\r  A0 A !  AÅ  E\r  Aù Ò !A !  A Aì G\rA !   A  "6 E\r  AÅ  E\r   Ajý !    "6 E\r  Aj  A A ! Aj \r  AÅ  E\r   Aj Ajþ !A ! A°j$  a# Ak"$ A !@  A  AÔ G\r  AjA±    A A ÿ AG! Aj$  ­# A k"$   6   6  Aj6  AjAÄ  ) 7 @@   A j E\r   AjA  6<   A<j !  AjAÀ  ) 7@@@@@   Aj E\r A ! A<j  AjA® !A A 6Ä A«   A  !A (Ä !A A 6Ä  AF\r  60@ E\r   AjA  6   A0j Aj ! ¯   Aø jAÞ  ) 7@   Aj E\r   AjA 6<    "60 E\r   A<j A0j !  Að jA  ) 7@   Aj E\r   AjA 6  Aj"Ä ! A<j  Õ ! A 68@@@@@@  AÅ  \rA A 6Ä A´    Ö  !A (Ä !A A 6Ä  AF\r  60 E\r  A0jÆ   AÑ  E\r A A 6Ä A±    !A (Ä !A A 6Ä  AF\r  68 E\r   AÅ  \rA ! !  ! A A 6Ä A®  A0j    A (Ä !A A 6Ä @ AF\r    Aj A0j A8j ! !  Ù   A(jA»  ) 7 A !    E\r    (¥ "6< E\r   A<j ! !  ¯     Ù A ! A j$     Aj  ä   Ä !@@@  ° E\r  At "E\r  (   ( º    6     (  At "6  E\r    Atj6    Atj6Ü  O~# Ak"$   Aé !   ) "7   7   ë ! Aj$     (    (3   Aj  kAu"î "º     ï m# Ak"$ @   Ä M\r  AÔ 6 A6 Aé 6 Aï  Á      (  Atj6 Aj$    Aé  ( ð     6    -  :   :       (   - :    ~# Ak"$   A(é !  ( ! ( !  ) "	7 -  ! ( ! ( ! ( !  	7          ó ! Aj$  !    Aj6    Aj"6   6    (    (1# Ak"$  Aj    ¼  Aj$    (  ( kAu  ( !   ( 6   6 !    A,j6    Aj"6   6    (    (1# Ak"$  Aj    Ë  Aj$   ( !   ( 6   6       ½ |# A k"$  Aj  ¾  Aj ( ( ¿    (À 6   (Á 6   Aj AjÂ  A j$      Ã       Ä     Æ     Ç      Å A# Ak"$   6  6   Aj AjÅ  Aj$ U# Ak"$   6     k"AuÈ  j6   Aj AjÉ  Aj$     ( 6    ( 6      Á     @ E\r  At"E\r     ü\n         Ê     ( 6    ( 6        Ì |# A k"$  Aj  Í  Aj ( ( Î    (Ï 6   (Ð 6   Aj AjÑ  A j$      Ò       Ó     Õ     Ö      Ô A# Ak"$   6  6   Aj AjÔ  Aj$ U# Ak"$   6     k"Au×  j6   Aj AjØ  Aj$     ( 6    ( 6      Ð     @ E\r  At"E\r     ü\n         Ù     ( 6    ( 6  `# Ak"$   Aé !  AjAà  ! ( !  ) 7     ê ! Aj$  `# Ak"$   Aé !  AjAø  ! ( !  ) 7     ê ! Aj$  `# Ak"$   Aé !  AjA  ! ( !  ) 7     ê ! Aj$  `# Ak"$   Aé !  AjAÿ  ! ( !  ) 7     ê ! Aj$  `# Ak"$   Aé !  AjAØ  ! ( !  ) 7     ê ! Aj$  `# Ak"$   Aé !  AjA¡  ! ( !  ) 7     ê ! Aj$     Aé  (  ( ù `# Ak"$   Aé !  AjA¯  ! ( !  ) 7     ê ! Aj$  `# Ak"$   Aé !  AjAÀ  ! ( !  ) 7     ê ! Aj$  `# Ak"$   Aé !  AjA¼  ! ( !  ) 7     ê ! Aj$  `# Ak"$   Aé !  AjA  ! ( !  ) 7     ê ! Aj$  `# Ak"$   Aé !  AjAÇ  ! ( !  ) 7     ê ! Aj$  Ð# A0k"$ A !@   A,jü \r  (,"Aj   O\r  A j  (   !    (  j6   ) 7 AjA  !  )7  ) 7 @ Aj ¼ E\r   A å !   á ! A0j$     Aj   ý `# Ak"$   Aé !  AjA  ! ( !  ) 7     ê ! Aj$  f@  ( "(" AjApq"j"AøI\r @ AùI\r    ë   ì   ( "(" j!  6  jAj8~  AA AAAí " A´® 6  ) !   6   7  D@ Aj "\r Ã    ( " ( ! A 6  6    6  Aj9@A  "\r Ã    ( ! A 6  6    6 A    :   AÐ¯ 6    A?q AtAÀqr Atr A\ntr  / Aàqr;    A  A  A    N~# Ak"$    )"7   7  ó !  (   Aj$ # Ak"$ @ ¶ "E\r    ¡   (!  ( !  · 6 Aj¸ !@ E\r   j  ü\n      ( j6 Aj$     A    Ï    A¢   /   AA AAAí "  6   6  A° 6   # A k"$   AjAë  ) 7  Ajó !  (    AjA©  ) 7   ó !  (   A j$    A¢ jA ! A 6 @  A  AFjAÿqAöI"\r @  A  APjAÿqA	K\r  A\nl6    ¡  ( jAPj"6   !   Aé  (  (  -   O# Ak"$   Aé !   Aj  ) 7     ! Aj$  O~# Ak"$   Aé !   ) "7   7    ! Aj$  +   AA AAAí " Aø° 6    ) 7  @~# Ak"$    )"7   7  ó  Aj$     )7    A¢ 6   AA AAAí "  :    6   6  Aà± 6   f@@  ("\r A !     (A G!  - !@@ \r  AqE\r A:A. Aq   (     A¢ # Ak"$  A 6@  Aò  E\r  AjA @  AÖ  E\r  AjA @  AË  E\r  AjA  (!  Aj$      - # Ak"$ @@  AÓ  E\r A !@  A  "AjAÿqAK\r @@@@@@@ Aÿq"Aj						  AjA!A!A!A!A!  6    ( Aj6       Aj " "6  F\r  Aj AjÆ  !@  Aß  E\r   Aj"  \r  A  ( !A ! A 6   Aj \r (!  Aß  E\r Aj"  Aj" Ä O\r    ( !A ! Aj$  \r   (   (Fi# Ak"$ @  ("  ( G\r  A´ 6 A6 Aé 6 Aï  Á     A|j6 Aj$ # A0k"$   6(  6,A !@   A(j \r A !@ E\r   AÆ  !  AÌ  @@@@  A  "A1H\r @ A9K\r   æ ! AÕ G\r     !  AjAØ  ) 7@   Aj E\r   Aj"Ä !@   æ "6 E\r  AjÆ   AÅ  E\r  Aj   Ç    Aj !A !@  A  A½jAÿqAK\r  E\r ((\r   A,j   !   ¡ !  6$@ E\r  ((E\r     A(j A$j¢ "6$ \rA !     "6$@ As Er\r    A,j A$j£ ! E\r  (,E\r    A,j A$j¤ ! A0j$  ·@   F\r @  ,  "Aß G\r   Aj" F\r@ ,  "APjA	K\r   Aj Aß G\r  Aj!@  F\r@ ,  "APjA	K\r  Aj! Aj   Aß F APjA	K\r   !@@ Aj" G\r   ,  APjA\nI\r      Aj  ¿ H@  ("  (G\r     µ At¨   (! ( !   Aj6  6    (    )7    Aj Ã H@  ("  (G\r      At   (! ( !   Aj6  6    Aj  Ä    Aé  (  ( Þ      (  r6    Aj ¦ H@  ("  (G\r      At§   (! ( !   Aj6  6    Aj æ O# Ak"$   Aé !   Aj  ) 7     ! Aj$     Aj  {# Ak"$   6@@  AÂ  E\r  Aj  ß  Aj E\rA ! Aj$      Aj Aj "6 o# Ak"$ @   Ä I\r  A¤ 6 A6 Aé 6 Aï  Á    © !  Aj$    Atjý	# A k"$ @ E\r   AÌj   AjA  ) 7@@@@@   Aj E\r A ! AÔ j  A    Aß  E\r   AÔ jÓ !  AjA®  ) 7@   Aj E\r  Aj  Aj  AÌj"µ Ô ! AÔ j  Õ !  Aj"Ä !@@@@@  ¤ E\rA A 6Ä A´    Ö  !A (Ä !A A 6Ä  AF\r  6L E\r  AÌ jÆ  A A 6Ä A®  AÌ j    A (Ä !A A 6Ä @@ AF\r  AÌ j³ E\rA A 6Ä Aµ   A (Ä !A A 6Ä  AG\r !  A 6H@  AÑ  E\r A A 6Ä A±    !A (Ä !A A 6Ä  AF\r  6H E\r  AÀ jA  ) 7 @    \r @A A 6Ä A¯    !A (Ä !A A 6Ä  AF\r  68 E\r  A8jÆ   A  "AÑ F\r AÿqAÅ G\r A A 6Ä A®  A8j    A (Ä !A A 6Ä @@ AF\r  A 64@  AÑ  E\r A !A A 6Ä A±    !A (Ä !A A 6Ä  AF\r  64 E\rA !  AÅ  E\rA ! A,j  A    Aß  E\r   AÌ j AÈ j A8j A4j A,jØ ! !  ! A ! Ù  Ú  !   A$jAí  ) 7A !   Aj E\r A ! AÔ j  A    Aß  E\r   Aå â ! A j$   !  !  Ù  Ú       Aj ¢ ä# A k"$ @ ( " A0G\r   6    Aj£ 6 @@  AÃ  E\r A !  AÉ  !  A  "AOjAÿqAK\r  APj6    ( Aj6 @ E\r  A:  @ E\r    Á \r A ! A :     Aj Aj¤ !A !  A  AÄ G\r   A "AÿqAPj"AK\r  AF\r   APj6    ( Aj6 @ E\r  A:   A:     Aj Aj¤ ! A j$  # A0k"$ @@@@  Æ "E\r @ È "AG\r A ! A(j  AjA ® ! A j  Aj A G  - rAq® !A A 6Ä A¯    !A (Ä !A A 6Ä  AF\r  6@ E\r @ E\r  A:     Ajý ! ¯  ¯ A ! A\nK\r@ AG\r  Ï E\r A(j     A(jã !  AjAÆ  ) 7@   Aj E\r    æ "6( E\r   A(jþ !A !  Aö  E\rA !  A  APjAÿqA	K\r    ( Aj6    æ "6( E\r   A(jý ! !  ¯  ¯    A ! A0j$     Aj  ¥    Aj  ¦    Aj  § O~# Ak"$   Aé !   ) "7   7    ! Aj$     Aé  ( ª    !@@@  ­ E\r  At "E\r  (   ( ¶    6     (  At "6  E\r    Atj6    Atj6Ü    µ !@@@  ® E\r  At "E\r  (   ( ´    6     (  At "6  E\r    Atj6    Atj6Ü  O# Ak"$   Aé !   Aj  ) 7     ! Aj$  4   A,AAA« " A :   A 6   6  AÌ² 6       A    í ³# Ak"$ A !@@  - \r  Aj  AjA® !  (! A A 6Ä A¶     !A (Ä ! A A 6Ä   AF\r ¯  Aj$   !   ¯     6@  / "ÀA@H\r  AÿqAÀ I     ( (   ³# Ak"$ A !@@  - \r  Aj  AjA® !  (! A A 6Ä A·     !A (Ä ! A A 6Ä   AF\r ¯  Aj$   !   ¯     1@  - Aq"AF\r  E     ( (  ³# Ak"$ A !@@  - \r  Aj  AjA® !  (! A A 6Ä A¸     !A (Ä ! A A 6Ä   AF\r ¯  Aj$   !   ¯     4@  / A\nvAq"AF\r  E     ( (  ³# Ak"$ @@  - \r  Aj  AjA® !  (" ( (!A A 6Ä      ! A (Ä !A A 6Ä  AF\r ¯  Aj$    !   ¯     ¯# Ak"$ @@  - \r  Aj  AjA® !  (" ( (!A A 6Ä      A (Ä ! A A 6Ä   AF\r ¯  Aj$  !   ¯     ¯# Ak"$ @@  - \r  Aj  AjA® !  (" ( (!A A 6Ä      A (Ä ! A A 6Ä   AF\r ¯  Aj$  !   ¯        A¢ 1# Ak"$  Aj    ·  Aj$       ¸ |# A k"$  Aj  ¹  Aj ( ( º    (» 6   (¼ 6   Aj Aj½  A j$      ¾       ¿     Á     Â      À A# Ak"$   6  6   Aj AjÀ  Aj$ U# Ak"$   6     k"AuÃ  j6   Aj AjÄ  Aj$     ( 6    ( 6      ¼     @ E\r  At"E\r     ü\n         Å     ( 6    ( 6  @   AI\r   ( !A>!A !@@  F\r  jAv!   AtAÀ³ j ç "! Aj  !  AtAÀ³ j" è \r    Aj6  A î~# AÐ k"$    ( ! @@ - A\nK\r    ) 7H AÀ jA  !  )H70  ) 7( A0j A(j¼ E\r  Aé    ) "7  78 Ajê E\r   Aé  AÐ j$  A¸ 6 AÁ6 Aé 6Aï  AjÁ     - \n   , Aux# Ak"$   6   ê "6@@ E\r    ê "6 E\r    Aj  Aj Ajë ! A !  Aj$   ^# Ak"$   6   ê "6@@ \r A !     Aj Ajì !  Aj$      Aj   í    Aj   î    Aj    ï \n   - Aq   Aj      ð    Aj    ñ    Aj    ò    Aj    ô    Aj    õ    Aj   ö à# AÀ k"$   A8jA  ) 7@@   Aj E\r   AÇ Ñ !  A0jA¸  ) 7@   Aj E\r    A ! A(j  A    Aß  E\r   A(jÿ !  A jA¬  ) 7A !   Aj E\r A ! A(j  A   A(j \r   Að  E\r    A ! A(j  A    Aß  E\r    A(jÿ ! AÀ j$  ù# A k"$ A !@  Aæ  E\r A ! A : A !A !@  A  "Aò F\r @@ Aÿq"AÒ F\r  Aì F\r AÌ G\rA! A: A!A!A !A! A: A !    ( Aj6   Æ "E\r @@ È A~j  Aj   Aj -  A*G\r   ê "6A ! E\r  A 6@ E\r    ê "6 E\r E\r  Aj Aj  Aj Ç    Aj Aj Aj Aj ! A j$  # Ak"$ @@@  A  Aä G\r @  A "AØ F\r @ Aÿq"Aø F\r  Aé G\r    ( Aj6    æ "6 E\r   Ø "6 E\r A :    Aj Aj Aj !     ( Aj6    ê "6 E\r   Ø "6 E\r A:    Aj Aj Aj !     ( Aj6    ê "6 E\r   ê "6 E\r   Ø "6 E\r   Aj Aj Aj !   ê ! A !  Aj$      Aj  # A k"$  A6    "6@@ E\r    ê "6 E\r  Aj  A A !  AÅ  E\r   Aj Aj Aj Aj !A ! A j$     Aj   §# AÀ k"$  A8jÉ !  A0jA  ) 7@@@@   Aj E\r   Aj"Ä !@@  Aß  \r    "6 E\r  AjÆ      Ç   A(jAÕ  ) 7 A !    E\r  Aj"Ä !@@@  AØ  E\r    ê "6$ E\r   AÎ  : # A 6@  AÒ  E\r    A Á "6 E\r    A$j A#j Aj 6@  AÔ  E\r     "6$ E\r    A$j 6  AÑ  E\r   ê "6$ E\r    A$j 6  AjÆ   AÅ  E\r  Aj   Ç     Aj !A ! AÀ j$  # A k"$     "6@@ E\r    ê "6 E\r  Aj  A   Aj"Ä !@@  Aß  E\r Aj  A      Ajã 6  AjÆ     Að  : A !  AÅ  E\r Aj   Ç    Aj Aj Aj Aj Aj !A ! A j$     Aj     Aj     Aj     Aj      Aj  ú# A0k"$ A ! A 6,  A$jA  ) 7@@@   Aj E\r     "6, E\r@  A  AÉ G\r    A ó "6  E\r    A,j A jô 6,@@  AÅ  \r    "6  E\r    A,j A j 6,     "6  E\r   A,j A j !  AjA  ) 7@   Aj \r     "6, E\r E\r   A,j !A !@@  A  APjA	K\r A!@    "6  E\r@@ Aq\r    A,j A j ! E\r    A j !  6,A !  AÅ  E\r     "6, E\r  A  AÉ G\r    A ó "6  E\r    A,j A jô 6,    "6  E\r    A,j A j !A ! A0j$     (   Aj   ó b# Ak"$   Aé !  AjA  ! ( !  ) 7     A Æ ! Aj$  3@  ,  " ,  "N\r A@  F\r A   ,  , H     As     (  j6     ( k6S# Ak"$ A !@   \r    · 6 Aj¸ -  A F! Aj$     Aj        Aj   £ a~# Ak"$   Aé !  ( !  ) "7 ( !  7      § ! Aj$  !   Aé  (  (  ( ª j~# Ak"$   Aé !  ( !  ) "7 ( ! ( !  7       ­ ! Aj$  ~# A k"$   A é !   ) "7 ( !  ) "	7 ( ! -  ! -  !  7  	7    Aj     ° ! A j$  &   Aé  (  -   -   ( µ j~# Ak"$   Aé !  ( !  ) "7 ( ! -  !  7       ¸ ! Aj$  a~# Ak"$   Aé !  ( !  ) "7 ( !  7      » ! Aj$  &   Aé  (  (  (  ( ¾ j~# Ak"$   Aé !   ) "7 ( ! ( ! ( !  7       Á ! Aj$  a~# Ak"$   Aé !   ) "7 ( ! ( !  7      Æ ! Aj$  d# Ak"$  Aj  A A !@ Aj \r   AÅ  E\r     AjÉ ! Aj$     Aj Ê ç# Ak"$ A !@   A	I\r   Aj  ( A "· 6  Ë 6 @@ Aj Ì \r@@ Aj¸ -  "APjAÿqA\nI\r  AjAÿqAK\r AjÍ A !    ( Aj6 A !  AÅ  E\r    Î ! Aj$  ç# Ak"$ A !@   AI\r   Aj  ( A "· 6  Ë 6 @@ Aj Ì \r@@ Aj¸ -  "APjAÿqA\nI\r  AjAÿqAK\r AjÍ A !    ( Aj6 A !  AÅ  E\r    Ï ! Aj$  ç# Ak"$ A !@   A!I\r   Aj  ( A  "· 6  Ë 6 @@ Aj Ì \r@@ Aj¸ -  "APjAÿqA\nI\r  AjAÿqAK\r AjÍ A !    ( A j6 A !  AÅ  E\r    Ð ! Aj$     Aj Ñ    Aj Û    Aj  Ü    Aj ½     (    (   (jAj  ( !   ( 6   6    Aj    Á    Aj   É    Aj   Ê Q~# Ak"$   Aé !   ) "7   7  A  Ñ ! Aj$     Aj    Ô i# Ak"$   Aé !  AjA  ! ( ! ( !  ) 7      Æ ! Aj$     Aj   Ø    Aj Ù    Aj Ú    Aj  Û    Aj     è    Aé  ( Æ    Aé  ( ì b# Ak"$   Aé !  AjAâ  ! ( !  ) 7     A Æ ! Aj$  O~# Ak"$   Aé !   ) "7   7   ï ! Aj$  X~# Ak"$   Aé !  ( !  ) "7   7    Ñ ! Aj$  O# Ak"$   Aé !   Aj  ) 7     ! Aj$     Aé  ( ò ¡# Ak"$ @@@  A  "AÄ F\r  AÿqAÔ G\r   ò "6 E\r  Aj AjÆ    í "6 E\r  Aj AjÆ    ! Aj$  # Ak"$    æ "6@@ \r A !A !  A  AÉ G\r    A ó "6@ E\r    Aj Ajô ! ! Aj$     Aj  õ # A0k"$ @@  A  APjA	K\r    !  A(jAÌ  ) 7@   Aj E\r   ö !  A jAÉ  ) 7   Aj A !   A ¡ "6 E\r A ! !  A  AÉ G\r    A ó "6@ E\r    Aj Ajô ! ! A0j$     Aj ÷ \'A !@  -   -  G\r   -  - F! j~# Ak"$   Aé !  ( !  ) "7 ( ! ( !  7        ! Aj$  ?~  A6 AAAí " 6 AÀ· 6  ) !  6  7 Ù~# Ak"$ A !@  E\r    )7 AjAè  !  )7@  ) 78@ AÀ j A8jþ \r    )7x Að jAÐ  !  )x70  ) 7( A0j A(jþ E\r A( A!  ( A  » " AF" AG     )7h Aà jAÁ  !  )h7   ) 7@ A j Ajþ \r   AØ jA  ) 7  Ajó    )"7  7P  Ajó !  AÈ jA  ) 7   ó !  (   »    @ E\r  A)¡  Aj$    (E     (Aj6    > @  »   jI\r  A(      A)¡          (Aj6       A¢ a~# Ak"$   Aé !   ) "7 ( ! ( !  7      ¤ ! Aj$  9~  AÂ  AAAí "A¬¸ 6  ) !  6  7 X~# Ak"$    )"7   7  ó !  (   » A    Aj$    A¢ 2   A8 AAAí " 6 A¹ 6   ) 7 W~# Ak"$   (   » A     )"7   7  ó  Aj$    A¢ /   A7 AAAí " 6  6 Aº 6  @   (   » A    AÛ    ( AA    AÝ ¡    A¢ ?~  A: AAAí " 6 Aøº 6  ) !  6  7 o~# Ak"$   (   » A     )"7   7  ó !  (   » A    Aj$    A¢ U~  AÀ  AAAí "Aä» 6  ) !  6  7 ) !  :   :   7 Ä# AÀ k"$ @  - AG\r   A8jAÏ  ) 7  Ajó   A0jA  ) 7  Ajó !@  - AG\r   A(jAå  ) 7  Ajó @  Aj"³ \r  A(   ²  A)¡   A jA  ) 7   ó !  (  @  Aj" ³ \r  A(    ²  A)¡  AÀ j$ Ã# Ak"$ A !A!@@   (F\r  !@ Aq\r   AjAó  ) 7   ó   !A !  (  Atj(  AA   @   G\r   ´  ! Aj! !  Aj$    A ¢ 	    67   AÁ  AAAí " : \r  :   6 AÌ¼ 6  Æ# A0k"$ @  - AG\r   A(jAÏ  ) 7  Ajó   A jA  ) 7  Ajó !@  - \rAG\r   AjAå  ) 7   ó  A  !  (   A0j$    A¢ ?~  A? AAAí " 6 A¸½ 6  ) !  :   7 ^ @  - AG\r  A(   (  @  - AG\r  A)¡  A(   Aj ²  A)¡    A¢ 3   AÄ  AAAí " 6 A ¾ 6   ) 7 D  A(   (   A)¡  A(   Aj ²  A)¡    A¢ 6   A9 AAAí " 6  6  6 A¿ 6  ¦# A k"$   (   » A     AjAÅ  ) 7  Ajó !  ( AA     AjAÞ  ) 7   ó !  ( AA   A j$    A¢ ?~  A= AAAí "AÀ 6  ) !  6  6  7 À~# AÀ k"$    )"7  78 A0j  Ajó "AjA Ã !  A(jA·  ) 7  Ajó !  ("( (!A A 6Ä     A (Ä !A A 6Ä @ AF\r   A jAè  ) 7  Ajó ! Ä  A(   ( AA    A)¡  AÀ j$  !  Ä        6    ( 6  6      (   (6      A¢ D~  A< AAAí "AèÀ 6  ) !  6  7 AjÏ  ~# A k"$    )"7  7  Ajó "A(   (   A)¡    )"7   7  ó  A j$    A¢    Aj  Ý    Aé  ( A Gä \n   ç    è  è F     ( Aj6      Aj é    Aj ó    Aj ÷    Aé  ( û O# Ak"$   Aé !   Aj  ) 7     ! Aj$     Aj þ     6    ( 6  6   f# Ak"$    6    AÌjµ 6  Aj¨ !  ( !  6 AÌj Aj  Aj$      Aji# Ak"$ @  ("  ( G\r  A´ 6 A6 Aé 6 Aï  Á     A|j6 Aj$    Aj      ý# Ak"$ @@  ( AÌj"µ   ("O\r  Aé 6 A A 6Ä  AÇ6 A 6A Aï   A (Ä ! A A 6Ä   AF\r A A 6Ä A¹    A (Ä !A A 6Ä  AF\r   Aj¥  Aj$   A  !          (   (6      Aé  ( · X~# Ak"$   Aé !  ( !  ) "7   7    º ! Aj$  g~# A k"$   Aé !   ) "7  ) "7  7  7    Aj Þ ! A j$  6   AÍ A AAAí " AØÁ 6    ) 7   ) 7  ~# AÀ k"$ @  Aj"¶ AI\r  A(   ) "7  78  Ajó A)¡ @@  Aj" A à -  Aî G\r  á !  A0j   Aj  ¶ Aj ) 7  Ajâ    ) "7  7(  Ajó @ ¶ AK\r   ) "7   7   ó  AÀ j$ \n   (  j   A- C~# Ak"$   ) "7   7   ó ! Aj$     A¢ )   AÉ A AAAí "  :   AÈÂ 6   P# Ak"$   AjAö A   -  ) 7   ó  Aj$    A¢ =# Ak"$  Aj  (   (jº ( !  Aj$      ( O~# Ak"$   Aé !   ) "7   7   ê ! Aj$  ,   AÎ A AAAí " A°Ã 6    ) 7  # AÀ k"$ @  Aj" ¶ AI\r  A<j!   !A ! @@  AF\r APA©   j", "APjA\nI jA A	 ,  "APjA\nI jAtj:   Aj!  Aj!   A<j ì  A0jB 7  B 7( B 7   *<»9  Aj A j A jAAï  Aj  ) 7  Ajó  AÀ j$     î    A¢     ï o# Ak"$    6@   F\r @  Aj"6   O\r Aj Ajð   (Aj" 6 (!  Aj$    (  ( ñ     ò   -  !   -  :    :  O~# Ak"$   Aé !   ) "7   7   ô ! Aj$  ,   AÏ A AAAí " A¤Ä 6    ) 7  # AÐ k"$ @  Aj" ¶ AI\r  AÈ j!   !A ! @@  AF\r APA©   j", "APjA\nI jA A	 ,  "APjA\nI jAtj:   Aj!  Aj!   AÈ j ì  A8jB 7  A0jB 7  B 7( B 7   +H9  Aj A j A jA A  Aj  ) 7  Ajó  AÐ j$    A¢ O~# Ak"$   Aé !   ) "7   7   ø ! Aj$  ,   AÐ A AAAí " AÅ 6    ) 7  # Að k"$ @  Aj" ¶ A I\r  Aà j!   !A ! @@  A F\r APA©   j", "APjA\nI jA A	 ,  "APjA\nI jAtj:   Aj!  Aj!   Aà j ì @A*E\r  A0jA A*ü   )`7  )h7  A(j A0j A0jA*A¯  Aj  ) 7  Ajó  Að j$    A¢ )   AÊ A AAAí "  6  AÆ 6   y# A k"$   AjA¶  ) 7  Ajó !  (    AjA  ) 7   ó  A j$    A¢ O~# Ak"$   Aé !   ) "7   7    ! Aj$        ¶    # Ak"$   6  ( " Atj" ("Aj6  6   Aj Aj "6@  (( " E\r    Aj  Aj$     Aj     Aj      Aj      Aj       Aj  ~# A0k"$   A(é !   ) "7( ( !  ) "7  ( !  ) "	7  7  7  	7    Aj  Aj  ³ ! A0j$  m# Ak"$ @   µ M\r  AÔ 6 A6 Aé 6 Aï  Á      (  Atj6 Aj$ O# Ak"$   Aé !   Aj  ) 7     ! Aj$  +   A3A AAAí " AüÆ 6    ) 7  ~# A0k"$   A(jA©  ) 7  Ajó !   )"7  7   Ajó !   AjAó  ) 7    ó  A0j$    A¢ X# Ak"$   : A!@  M\r    j  k Aj "  kA ! Aj$   @ \r A    ,         ï    Aj      Aé  (     Aé  (  ( £    Aé  (  ( § a~# Ak"$   Aé !  ( !  ) "7 ( !  7      « ! Aj$     Aé  ( ¯    Aé  (  (     !@@@  ¯ E\r  At "E\r  (   ( º    6     (  At "6  E\r    Atj6    Atj6Ü  /   A!A AAAí "  6   6  AìÇ 6   §# A k"$ @@@@@  (  AjA  ! AjA©  ! AjA  !  ) 7   ó @  (" E\r    Aj  A j$ \r    ­    A¢      ª~# A0k"$  Aj  Aj j!@ Aj"  B\n"B\n~}§A0r:   B	V! ! \r   Aj  Aj  Aj j k ) 7   Ajó ! A0j$      A&   A#A AA« "  6  AèÈ 6   D# Ak"$   AjA  ) 7   ó  Aj$    (     A¢ -   A$A AA« "  6   6  AàÉ 6   Q# Ak"$   (    AjA  ) 7   ó  Aj$    (     A¢ -   A%A AA« "  6   6  AäÊ 6   r# Ak"$   ("  ( (  @  ( ­ \r   AjA  ) 7   ó  Aj$ +   (    ("    ( (     A¢ =~  A&A AA« "  6  AàË 6  ) !   6   7  ì# A0k"$  A(j AjA Ã !  A jA  ) 7  Ajó !A A 6Ä Aº   Aj  A (Ä ! A A 6Ä @  AF\r   AjA  ) 7  Ajó  Ä  A0j$  !  Ä    j# Ak"$   (  @  (E\r   AjA²  ) 7   ó !  (   Aj$    A¢ &   A\'A AA« "  6  AÜÌ 6   `# Ak"$   ("    ( (    AjA  ) 7   ó  Aj$    ("    ( (     A¢ W~  A4A AAAí " AÔÍ 6  ) !   6   7 ) !   6   7   ) 7   ~# A0k"$   A(jA  ) 7  Ajó !   ) "7  7   Ajó !  AjAó  ) 7     ó µ  A0j$ É# Aà k"$ @@  Aj"³ \r  AØ j AjA Ã !  AÐ jA·  ) 7(  A(jó !A A 6Ä Aº    A (Ä !A A 6Ä  AF\r  AÈ jAè  ) 7   A jó  Ä @  (E\r   AÀ jA²  ) 7  Ajó !  (    A8jA  ) 7  Ajó  A(   Aj ²  A)¡ @  (E\r   A0jA²  ) 7  Ajó !  (   Aà j$  !  Ä       A(¢ )   AË A AAAí "  6  AÄÎ 6   # A k"$   AjAå  ) 7  Ajó !@  ("  A4G\r    µ   AjA  ) 7   ó  A j$    A¢ 3   AÌ A AAAí "  6  A°Ï 6    ) 7  Â~# A k"$  A(   (   A)¡ @@  Aj" A à -  Aî G\r  á !  Aj   Aj  ¶ Aj ) 7   â    ) "7  7  Ajâ  A j$    A¢ O~# Ak"$   Aé !   ) "7   7   ¾ ! Aj$  ,   AÃ A AAAí " AÐ 6    ) 7  h~# A k"$   AjA¸  ) 7  Ajó !   )"7   7  ó  A j$    A¢ j~# Ak"$   Aé !  -  !  ) "7 ( ! ( !  7       Â ! Aj$  G~  AÇ A AAAí "  6   6  AÑ 6  ) !   :    7  Ü~# Ak"$    6|  6x A(   (!@@  - "AG\r  E\r@@ E\r   AA   Aø jÄ   Að jA  ) 78  A8jâ !   )"70  7h  A0jâ !  Aà jA  ) 7(  A(jâ   AØ jA  ) 7   A jâ !@@  - \r   (E\r  AÐ jA  ) 7  Ajâ !   )"7  7H  Ajâ !  AÀ jA  ) 7  Ajâ !@  - AG\r  Aø jÄ   ( AA   A)¡  Aj$ \\# Ak"$   (!  ( A(  Aj (Æ   (    ( A)¡  Aj$    A¢ (   A*A AAAí "  6  AôÑ 6   º# A0k"$  A(j AjAÃ ! A j Aj"AÃ !  !  (!A A 6Ä A©    A (Ä !A A 6Ä A!@@ AF\r @@@@ ( "	Aj   ´ @  	F\r  AjAó  ) 7   ó !  6  (!A A 6Ä A©    A (Ä !A A 6Ä @ AF\r  Aj! !   AjA  ) 7  Ajó  Ä  Ä  A0j$  !  Ä  Ä       A¢ !   Aé  (  (  -  Ë !   Aé  (  (  ( Î 7   AÑ A AAAí "  :    6   6  AìÒ 6   Ã# Ak"$ @@  - AG\r  AÛ  !  (   AÝ   A. !  (  @  (" A¯jAÿqAI\r   AjAÎ  ) 7   ó   (!    Aj$    A¢ 7   AÒ A AAAí "  6   6   6  AØÓ 6   Î# A k"$  AÛ  !  (    AjAí  ) 7  Ajó !  (   AÝ  !@  (" A¯jAÿqAI\r   AjAÎ  ) 7   ó   (!    A j$    A¢ 3   AÆ A AAAí "  6  AÈÔ 6    ) 7  c@@  ("E\r     Aj ( (  \r  (    Aj Aû  " ²   Aý     A¢ j~# Ak"$   Aé !  ( ! ( !  ) "7 ( !  7       Õ ! Aj$  :   AÅ  AAAí " 6  6 A¸Õ 6   ) 7 D  A(   (   A)¡  A(   (   A)¡    A¢ !   Aé  (  -   ( Ü    Aé  ( ß    Aé  ( â g~# A k"$   Aé !   ) "7  ) "7  7  7    Aj å ! A j$  7   AÔ A AAAí "  6   :    6  A¸Ö 6   # A0k"$   A(jA  ) 7  Ajó !@@  - \r   (E\r Aû    (  @@  - \r   (E\r Aý ¡ @  - AG\r   A jAî  ) 7  Ajó   (E\r   AjAÉ  ) 7   ó !  (   A;  A0j$    A¢ )   AÕ A AAAí "  6  A¨× 6   ]# Ak"$   AjA  ) 7   ó !  (   A;  Aj$    A¢ )   AÖ A AAAí "  6  AØ 6   ]# Ak"$   AjA²  ) 7   ó !  (   A;  Aj$    A¢ 6   AÓ A AAAí " AÙ 6    ) 7   ) 7  ä# Ak"$   AjAÏ  ) 7   ó !@  Aj"³ \r  A  "A(   ²  A)¡  A  "Aû    Aj"´ !  µ !@@   G\r  A  Aý ¡  Aj$   (     Aj!     A¢ ~# A k"$   A$é !  ( ! ( !  ) "7  ) "7 -  !  7  7      Aj  é ! A j$  P~  A;A AAAí "  6   6  AüÙ 6    ) 7 ) !   :     7  ë# Aà k"$   (    AØ jA³  ) 7   A jó !  (    AÐ jA   ) 7  Ajó !@@  Aj"  E\r  AÈ jAÀ  ! @  A à -  Aî G\r   AÀ jA·  ) 7  Ajó  A8j   Aj  ¶ Aj !    ) 70 A0j!    ) 7  Ajó !   A(jAè  ) 7    ó  Aà j$    A$¢ (   A>A AAAí "  6  AìÚ 6   o# A k"$   AjA  ) 7   ó "A(  Aj  (Æ  Ç  A)¡  A j$    A¢ +   A A AAAí " AàÛ 6    ) 7     Aj ²    A¢ )   AÈ A AAAí "  6  AÐÜ 6   R# Ak"$   AjA  ) 7   ó !  (   Aj$    A¢    Aé  (  ( ø v# Ak"$ @@  A  APjA	K\r    !   !  6@@ \r A !    Ajü !  Aj$      Aé  (  /   AA AAAí "  6   6  A¼Ý 6   _# Ak"$   (    AjAÏ  ) 7   ó !  (   Aj$     (" ( (     A¢    Aj ÿ    Aj     Aj     Aé  (  (   A2A AAAí "  6  A¬Þ 6   a# Ak"$   AjA  ) 7   ó !  ("    ( (   Aj$    A¢    Aé  (     Aé  (  (   AA AAAí "  6  Aß 6   R# Ak"$   AjA½  ) 7   ó !  (   Aj$    A¢ (   AA AAAí "  6  Aà 6   R# Ak"$   AjAö  ) 7   ó !  (   Aj$    A¢ (   A.A AAAí "  6  Aüà 6   R# Ak"$   AjAÏ  ) 7   ó !  (   Aj$     (" ( (     A¢    Aé  (     Aj       A0 "Aðá 6  (    A AAAí " 6 A°ã 6  j# A k"$   AjAÌ  ) 7  Ajâ ! Aj     )7   â  A j$ ·# A0k"$     @@  E\r    ) 7( A jA  !  )(7  ) 7 Aj Aj¼ E\r  Aé  A0j$  A 6 A¾\r6 Aé 6 Aï  Á      (AtA j(  \n   (AK   A¢ # AÐ k"$   AÈ jAÌ  ) 7   A jâ ! AÀ j    ( (    )@7  Ajâ !@   E\r   A8jA  ) 7  Ajâ !@  (AG\r   A0jA±  ) 7  Ajâ   A(jAè  ) 7   â  AÐ j$    A¢ X~# Ak"$   Aé !  ( !  ) "7   7     ! Aj$  B   A	      « "  6  Aàã 6    ) 7  \n   - Av\n   - Aq\r   / A\nvAq¬~# A0k"$   ("  ( (    A(jA¹  ) 7  Ajó !   )"7  7   Ajó !   AjAæ  ) 7    ó  A0j$     (" ( (     A¢ O~# Ak"$   Aé !   ) "7   7   ¨ ! Aj$     Aj «    Aj   ¬    Aé  (  ( ²    Aé  (  ( ¶    Aé  (  ( º +   A5A AAAí " AÌä 6    ) 7  %  AÛ    Aj ²  AÝ ¡    A¢    Aé  ( ­ !   Aé  (  -   ( ¯     (®     A/ 6   A1A AAAí "  6   :    6  AÄå 6   # A k"$ @  - AG\r   AjA  ) 7  Ajó  Aj  ("   ( (    )7   ó  A j$    A¢ /   AA AAAí "  6   6  A´æ 6   )   (   AÀ  !  (      (" ( (     A¢ /   AA AAAí "  6   6  A¤ç 6   _# Ak"$   (    AjA©  ) 7   ó !  (   Aj$     (" ( (     A¢ /   AA AAAí "  6   6  Aè 6   _# Ak"$   (    AjAÏ  ) 7   ó !  (   Aj$     (" ( (     A¢ O# Ak"$   Aé !   Aj  ) 7     ! Aj$     Aé  (  ( À /   AA AAAí "  6   6  Aé 6   _# Ak"$   (    AjAÏ  ) 7   ó !  (   Aj$    A¢ O~# Ak"$   Aé !   ) "7   7   Å ! Aj$  X~# Ak"$   Aé !   ) "7 ( !  7     Û ! Aj$  Ê  A(A AAAí " Aôé 6    ) 7    / A¿`q"Ar"; @  Aj"´  µ Æ E\r    Ar"; @ ´  µ Ç E\r    AÿgqAr"; @ ´  µ È E\r    A¿þqAÀ r;       É     Ê     Ë *@@   F"\r  Õ !  Aj!  \r  *@@   F"\r  × !  Aj!  \r  *@@   F"\r  Ù !  Aj!  \r  B   Í A !@ ("  Aj" ä O\r    Î  ­ ! . @ (Ô G\r   Ajä !  A 6   6   (  Atj( B   Í A !@ ("  Aj" ä O\r    Î  ¯ ! B   Í A !@ ("  Aj" ä O\r    Î  ± ! M   Í @ ("  Aj"ä O\r   Î "    ( (  !   I   Í @ ("  Aj" ä O\r    Î "    ( (  I   Í @ ("  Aj" ä O\r    Î "    ( (     A¢ \r   ( Ö \r    AF\r   ( Ø \r    AF\r   ( Ú \r    AF8~  A+A AAAí " Aäê 6  ) !   6   7  ì# A0k"$  A(j AjA Ã !  A jA·  ) 7  Ajó !A A 6Ä Aº   Aj  A (Ä ! A A 6Ä @  AF\r   AjAè  ) 7  Ajó  Ä  A0j$  !  Ä       A¢ /   A-A AAAí "  6   6  AÔë 6      (    (      (" ( (     A¢    ( O~# Ak"$   Aé !   ) "7   7   å ! Aj$     Aé  (  ( è +   A)A AAAí " AÌì 6    ) 7     Aj ²    A¢ /   A"A AAAí "  6   6  AÄí 6      (     A¢ +   A\nA AAAí " AÀî 6    ) 7  \\# Ak"$   AjA¿  ) 7   Aj  ó " ²   AÝ   Aj$    A¢     Até     6   6   {# Ak"$   A× A AAAí "  6  A°ï 6 @ \r  AÖ 6 A¡6 Aé 6 Aï  Á   Aj$   R# Ak"$   AjA¬  ) 7   ó !  (   Aj$    A¢ Y~  AA AA « "  6   6  A¨ð 6  ) !   : $   6    6   6   7   A A# Ak"$ @  ("E\r    ( (    ( ­ \r   AjA  ) 7   ó   (   Aj$ Ä# Aà k"$  A(   Aj ²  A)¡ @  ("E\r    ( (  @  ( "AqE\r   AØ jA£  ) 7(  A(jó   ( !@ AqE\r   AÐ jA  ) 7   A jó   ( !@ AqE\r   AÈ jA³  ) 7  Ajó @@@@  - $Aj  AÀ jA  ! A8jA  !  ) 7  Ajó @  ("E\r    @  (E\r   A0jA²  ) 7  Ajó !  (   Aà j$    A(¢ 2   AA AAAí "  6  Añ 6    ) 7  ~# A0k"$   (    A(jAµ  ) 7  Ajó !   )"7  7   Ajó !   AjA³  ) 7    ó  A0j$    A¢    Aj ¡    Aj ¢    Aj     £     6    ( 6  6   :# Ak"$  Aj  ç ° ( !  Aj$   ?# Ak"$    ( 6 Aj± ¸ !  Aj$      (   (6      Aj  ²    Aj   ³    Aj  ´ O# Ak"$   Aé !   Aj  ) 7     ! Aj$  O# Ak"$   Aé !   Aj  ) 7     ! Aj$  O# Ak"$   Aé !   Aj  ) 7     ! Aj$  O# Ak"$   Aé !   Aj  ) 7     ! Aj$  S# Ak"$   Aé !   AjA¯  ) 7     !  Aj$   O# Ak"$   Aé !   Aj  ) 7     ! Aj$  O# Ak"$   Aé !   Aj  ) 7     ! Aj$  O# Ak"$   Aé !   Aj  ) 7     ! Aj$  O# Ak"$   Aé !   Aj  ) 7     ! Aj$  X~# Ak"$   Aé !   ) "7 ( !  7     Ã ! Aj$     Aé  ( Æ O# Ak"$   Aé !   Aj  ) 7     ! Aj$  O# Ak"$   Aé !   Aj  ) 7     ! Aj$  O# Ak"$   Aé !   Aj  ) 7     ! Aj$  O# Ak"$   Aé !   Aj  ) 7     ! Aj$     Aé  (  -  É X~# Ak"$   Aé !  ( !  ) "7   7    Ì ! Aj$     Aj Ï    Aj  Ð    Aj Ñ    Aj  Ø    Aj  å    Aj  ë    Aé  ( ï    Aé  (  ( õ \\# Ak"$   Aé !  ( !  AjAÊ  ) 7     Ì ! Aj$  \\# Ak"$   Aé !  ( !  AjA¹  ) 7     Ì ! Aj$     Aé  ( ¤ O~# Ak"$   Aé !   ) "7   7   § ! Aj$  s~# Ak"$   A é !  ( !  ) "7 ( ! -  ! ( !  7        ª ! Aj$  (   AA AAAí "  6  Aò 6   h# Ak"$   AjAï  ) 7   ó "A(   ( AA    A)¡  Aj$    A¢ +   AA AAAí " Aøò 6    ) 7  d# Ak"$   AjAö  ) 7   ó "A(   Aj ²  A)¡  Aj$    A¢ K~  AA AA « "  6  Aðó 6  ) !   6   :    6   7   A A`# Ak"$   ("    ( (    AjA  ) 7   ó  Aj$ # AÐ k"$  A(   Aj ²  A)¡   ("  ( (  @  ("AqE\r   AÈ jA£  ) 7   A jó   (!@ AqE\r   AÀ jA  ) 7  Ajó   (!@ AqE\r   A8jA³  ) 7  Ajó @@@@  - Aj  A0jA  ! A(jA  !  ) 7  Ajó @  (E\r  A  !  (   AÐ j$    A ¢     6        ( Aj6   X~# Ak"$   Aé !  ( !  ) "7   7    µ ! Aj$  a~# Ak"$   Aé !  ( !  ) "7 ( !  7      ¸ ! Aj$     Aé  (  ( » 2   AA AAAí "  6  Aàô 6    ) 7  ~# A0k"$   (    A(jA·  ) 7  Ajó !   )"7  7   Ajó !   AjAè  ) 7    ó  A0j$    A¢ ?~  AA AAAí "  6  AÐõ 6  ) !   6   7  ~# A k"$   (    AjA  ) 7  Ajó !   )"7   7  ó !@  (" E\r      A j$    A¢ ?   A      « "  6   6  AÄö 6      ( ­    ( ¯    ( ± *  ("  ( (     À Æ# A0k"$ @  ("AqE\r   A(jA£  ) 7  Ajó   (!@ AqE\r   A jA  ) 7  Ajó   (!@ AqE\r   AjA³  ) 7   ó  A0j$    ("    ( (     A¢ 8~  AA AAAí " A¬÷ 6  ) !   6   7  a~# Ak"$    )"7   7  ó A( !  (   A)  Aj$    A¢ (   AA AAAí "  6  Aø 6   R# Ak"$   AjAÈ  ) 7   ó !  (   Aj$    A¢ /   A A AAAí "  :    6  Aù 6   # A k"$ @  - \r   AjA»  ) 7  Ajó   AjAã  ) 7   ó "A(   ( AA    A)¡  A j$    A¢ 2   AA AAAí "  6  Aøù 6    ) 7  \\~# Ak"$   ("  ( (     )"7   7  ó  Aj$    A¢    Aé  ( Ò    Aé  (  ( Õ    Aé  ( A Õ (   AA AAAí "  6  Aðú 6   y# A k"$   AjAë  ) 7  Ajó !  (    AjAæ  ) 7   ó  A j$    A¢ /   AA AAAí "  6   6  Aàû 6   # A k"$   (    AjAð  ) 7  Ajó !@  (" E\r       AjAæ  ) 7   ó  A j$    A¢    Aé  (  ( Ù -   AA A A« "  6   6  AÌü 6    A A   ("    ( (  Ø# A0k"$ @ Þ AÝ F\r   A(jA  ) 7  Ajó   A jA÷  ) 7  Ajó !@  ("E\r      AjAæ  ) 7   ó !  ("    ( (   A0j$ k# Ak"$ @  ("\r  A 6 A®6 AÞ 6 Aï  Á    (  jAj,  !  Aj$   # A k"$ A !@  ("  AG\r  Aj  à  AjAÍ  !   )7   ) 7  Aj þ E\r   á ! A j$      )7 ¢# AÀk"$    6¼  6¸A ! A" !  ´ !  µ !@@@@@  F"\r @ ( " AÍ F\r  A¸jã  A°j ä   A°j· 6¬  A°jË 6¨A !@@ A¬j A¨jÌ \r@ A¬j¸ -  " APjAÿqA	K\r  AJ\r  A\nl  jAPj! A¬jÍ  A¸jã @ AH\r  A¸jã @@@@@@@@@@ AqE\r @ APjA\nI\r @ Ayj	\n @ A¤j  A¿jAI\r  A"G\r\n\r  A jA¡  ) 7P  AÐ jó @ Ayj  A"F\r AÜ G\r  AØ jAè  ) 7H  AÈ jó   AjA  ) 7  Ajó \n  AjAê  ) 7  Ajó 	  AjAó  ) 7  Ajó   AjAÛ  ) 7   A jó   Aø jAÒ  ) 7(  A(jó   Að jA  ) 70  A0jó   Aè jA  ) 78  A8jó @@ A H\r  Aÿ G\r AÜ  ! @ AH\r   Aø  ! AI\r   Av, °ý     Aq, °ý  A!  À  A"  AÀj$    Aà jA  ) 7@  AÀ jó A ! Aj!    A¢    (   (´     )7    Aé  (  ( æ 3   A  AA« "  6   6  AÌý 6      ( ­ Ù# A0k"$   ("  ( (  @@@  ( ¯ \r   ( ± E\r A(jA¶  ! A jA  !  ) 7  Ajó !  (    AjAî  ) 7  Ajó  A0j$ # Ak"$ @@  ( ¯ \r   ( ± E\r  AjA³  ) 7   ó   ("    ( (   Aj$    A¢ X~# Ak"$   Aé !   ) "7 ( !  7     ì ! Aj$  8~  AA AAAí " AÀþ 6  ) !   6   7  V~# Ak"$    )"7   7  ó A  !  (   Aj$    A¢ ,   A  AA« "  6  A¸ÿ 6      ( ­ þ~# Aà k"$ @@@  (" AG\r  ò !  (! \r   ( (  @  ( ¯ E\r   AØ jA  ) 7(  A(jó @@  ( ¯ \r   ( ± E\r  AÐ jA¶  ) 7   A jó  AÈ jAû  !   AÀ jA¤  ) 7  Ajó !   )"7  78   Ajó  A0jAè  !    ) 7  Ajó  Aà j$ ~# A k"$ A !@  ("  AG\r  Aj  à  AjA½  !  )7  ) 7  Aj þ ! A j$  «# Ak"$ @@  (" AG\r  ò \r  (!@@  ¯ \r   ( ± E\r  AjA³  ) 7   ó   ("    ( (   Aj$    A¢ :   A\r  AA« " A :    6   6  A¤ 6      ( ­ ¹# AÀ k"$ @@  - \r  A8j  AjA® !A A 6Ä A»  A0j    A (Ä ! A A 6Ä   AF\r@ (4" E\r   ( (!A A 6Ä      A (Ä !A A 6Ä  AF\rA A 6Ä A·     !A (Ä !A A 6Ä  AF\r@ E\r   A(jA  ) 7  Ajó A A 6Ä A·     !A (Ä !A A 6Ä  AF\r@@ \r A A 6Ä A¸     !A (Ä ! A A 6Ä   AF\r E\r  A jA¶  ) 7  Ajó   AjA A  (0 ) 7   ó  ¯  AÀ j$  !  ¯    ð# A0k"$    Aj Ajü   Aj! Ajý !  (!@@@@@ ( (!A A 6Ä     !A (Ä !A A 6Ä  AF\r  A\rG\r   ("6     Ajþ ( 6   ÿ   "AI\r A A 6Ä A¼   AjAv !A (Ä !A A 6Ä  AF\r  ( G\r  A 6    A0j$  !  !      # A k"$ @@  - \r  Aj  AjA® !A A 6Ä A»  Aj    A (Ä ! A A 6Ä   AF\r@ (" E\r A A 6Ä A·     !A (Ä !A A 6Ä  AF\r@@ \r A A 6Ä A¸     !A (Ä !A A 6Ä  AF\r E\r  AjA³  ) 7   ó   ( (!A A 6Ä      A (Ä ! A A 6Ä   AF\r ¯  A j$  !  ¯          A¢       H  B 7    A,j6    Aj"6   6   AjB 7   AjB 7   A$jB 7        H@  ("  (G\r      At   (! ( !   Aj6  6    (  ( kAuo# Ak"$ @    I\r  A¤ 6 A6 Aé 6 Aï  Á     !  Aj$    Atj @   \r   (        ( 6    ( 6             !@@@   E\r  At "E\r  (   (     6     (  At "6  E\r    Atj6    Atj6Ü     ( \r   (   AjF\r   (  ( H1# Ak"$  Aj      Aj$        |# A k"$  Aj    Aj ( (     ( 6   ( 6   Aj Aj  A j$                              A# Ak"$   6  6   Aj Aj  Aj$ U# Ak"$   6     k"Au  j6   Aj Aj  Aj$     ( 6    ( 6           @ E\r  At"E\r     ü\n              ( 6    ( 6  æ@@@   sAqE\r  -  !@ AqE\r @   -  ":   E\r  Aj!  Aj"Aq\r A ( "k rAxqAxG\r @   6   Aj!  (! Aj"! A krAxqAxF\r  !   :   AÿqE\r @   - ":   Aj!  Aj! \r             Ahj# Ak"$    6   ("Ú !  A 6  A A  Aj !@@ (\r  E\r   6      ª Aj "6      A 6 @A ¬   AjA ( ¬ (  E\r   ("   ( (  " ª Aj "6      Aj$ EA !@  AK\r @@  \r A !   At/° " E\r  Aä j!        AÐoperator~ {...} operator|| operator| Invalid strip entry  imaginary Ty nx  complex Dx -+   0X0x -0X+0X 0X-0x+0x 0x tw throw operator new Dw \\v Dv Tu Invalid input  const const_cast reinterpret_cast static_cast dynamic_cast unsigned short  noexcept __cxa_decrement_exception_refcount Invalid IFD entry count unsigned int size_type{count} != dynamic_extent _BitInt operator co_await FindBit Invalid TIFF offset Invalid IFD offset struct  restrict objc_object _Sat short _Fract _Sat unsigned short _Fract _Sat _Fract _Sat long _Fract _Sat unsigned long _Fract _Sat unsigned _Fract float _Float std::nullptr_t wchar_t char8_t std::bfloat16_t char16_t char32_t \\t Ut Tt St Mismatched strip arrays Missing dimensions this gs requires Strip out of bounds Ts %s:%d: %s nullptr sr vector operator allocator Unknown error Invalid TIFF byte order unsigned char \\r rq sp /emsdk/emscripten/system/lib/libcxxabi/src/private_typeinfo.cpp /emsdk/emscripten/system/lib/libcxxabi/src/cxa_exception_emscripten.cpp /home/user/src/milahu/tiff_ccitt_g4/src/third_party/pdfium/core/fxcodec/fax/faxmodule.cpp /emsdk/emscripten/system/lib/libcxxabi/src/cxa_demangle.cpp /emsdk/emscripten/system/lib/libcxxabi/src/fallback_malloc.cpp fp Tp  auto objcproto so Invalid strip count zero Do std::exception terminate_handler unexpectedly threw an exception Unsupported compression union dn subspan nan \\n Tn Dn enum _Sat short _Accum _Sat unsigned short _Accum _Sat _Accum _Sat long _Accum _Sat unsigned long _Accum _Sat unsigned _Accum basic_iostream basic_ostream basic_istream ul tl bool ull il string literal Ul yptnk OOB seek Tk pi li bad_array_new_length /emsdk/emscripten/system/lib/libcxxabi/src/demangle/Utility.h /home/user/src/milahu/tiff_ccitt_g4/src/third_party/pdfium/core/fxcrt/span.h /emsdk/emscripten/system/lib/libcxxabi/src/demangle/ItaniumDemangle.h unsigned long long unsigned long basic_string __uuidof inf half %af \\f true operator delete false decltype  volatile long double _block_invoke Te std void Only 1-bit supported Only 1 sample per pixel supported terminate_handler unexpectedly returned \'unnamed Out of bounds read std::bad_alloc mc Invalid TIFF magic \\b Ub 16b Missing strip data \'lambda \\a %a basic_ count == 0 || !!data_ operator^ operator new[] operator[] operator delete[] \\\\ pixel vector[ sZ ____Z fpT $TT $T rQ sP DO srN _GLOBAL__N NAN $N fL %LaL Ua9enable_ifI EOF INF RE OE b1E b0E DC catching a class without an object? operator? operator> <char, std::char_traits<char> , std::allocator<char> operator>> operator<=> operator-> operator|= operator= operator^= operator>= operator>>= operator== operator<= operator<<= operator/= operator-= operator+= operator*= operator&= operator%= operator!= operator< template< id< operator<< .< "< [abi:  [enable_if: std:: unsigned __int128 __float128 decimal128 decimal64 decimal32 exception_header->referenceCount > 0 start_pos >= 0 operator/ operator. Creating an ExplicitObjectParameter without a valid Base Node. sizeof... operator- -in- operator-- operator, operator+ operator++ operator* operator->* ::* operator.*  decltype(auto) (null) (anonymous namespace) operator()  ( operator name does not start with \'operator\' \'block-literal\' operator& operator&&  &&  & operator% \\" >" "" Invalid access! Popping empty vector! operator! shrinkToSize() can\'t expand! Pure virtual function called! throw  noexcept   at offset  this   requires  operator  reference temporary for  template parameter object for  typeinfo for  thread-local wrapper routine for  thread-local initialization routine for  typeinfo name for  construction vtable for  guard variable for  VTT for  covariant return thunk to  non-virtual thunk to  invocation function for block in  alignof  sizeof  > typename  initializer for module  ::friend  typeid  unsigned   ?   ->   =  libc++abi:   :  sizeof...   ...  ,  operator""                         \n    	 @ 	\r   À * + 4 5        $ \' ( + 7 *  - . \n/ 0 ! " # $ % &    $5 %6 (\' )( *) +* ,+ -, 2= 3> 4? 5  6@7J; K< R1 S2 T3 U4 X7 Y8 Z9 [: dÀe gh@À @ÀÌÀÍ Ò@ÓÔÀÕ Ö@×ØÀÙ Ú@Û  @\r\nÀ @À 	@		À	 \nÿ                   	  \n   \r    @   7  \n @\r  ( 7 g h l 6À @À 	@		À	 \n$4 \'7 (8 +; ,< 3@45À75 86 R2 S3 T, U- V. W/ X9 Y: Z= [ d0 e1 f> g? h i j  k! l( m) È ÉÀ Ê Ë Ì Í Ò" Ó# Ô$ Õ% Ö& ×\' Ú* Û+ JKÀL M@R S@TUÀZ [@deÀl m@rsÀt u@vwÀÿ        ÿÿÿÿÿÿÿÿ                                                                                                                                  XI                 	             \n\n\n  	  	                               \r \r   	   	                                               	                                                  	                                                   	                                              	                                                      	                                                   	         0123456789ABCDEF ¬  N10__cxxabiv116__shim_type_infoE     Ü   N10__cxxabiv117__class_type_infoE       N10__cxxabiv117__pbase_type_infoE    <   N10__cxxabiv119__pointer_type_infoE     Ð                             °                          ¼ Ð N10__cxxabiv120__si_class_type_infoE        `              8                       !   h ( St9exception     D ` St20bad_array_new_length     l   St9bad_alloc        ¤    "   #       ô    $   %    °   St11logic_error     Ô    &   #    à ¤ St12length_error         St13runtime_error   h  St9type_info        \\ =   >   ?   @   A   B   C   D   E   F    h  N12_GLOBAL__N_116itanium_demangle11SpecialNameE h   N12_GLOBAL__N_116itanium_demangle4NodeE      =   >   ?   @   G   B   C   D   E   H       ( =   >   ?   @   I   B   C   D   E   J    4  N12_GLOBAL__N_116itanium_demangle21CtorVtableSpecialNameE         =   >   ?   @   K   B   C   L   E   M    ¬  N12_GLOBAL__N_116itanium_demangle8NameTypeE      =   >   ?   @   N   B   C   D   E   O      N12_GLOBAL__N_116itanium_demangle10ModuleNameE      t P   Q   R   S   T   U   C   D   E   V      N12_GLOBAL__N_116itanium_demangle24ForwardTemplateReferenceE    aN"o\n aS"õ	 aa ad u anu att aw\n k azt ccª  cl* cm$¹ co    cp* cv dV"C\n daÖ dcÒ  de Ø dl{ dsò dtL dv"B eO"ÿ	 eo² eq!\n ge\n\n gt	 ixË lS"7\n le,\n ls¨\n lt\n mI"N\n mL"d\n mi ml\nØ mm® na¼ ne\n ng  nt Ê nw|  oR"ê	 oo  or  pL"Y\n plÃ pmâ ppÍ ps Ã ptß	 qu	 	 rM"z\n rS"\n rcµ  rm\n rsÈ	 scÆ  ssÓ	 st} sz} te³ ti³     è =   >   ?   @   W   B   C   D   E   X    ô  N12_GLOBAL__N_116itanium_demangle10BinaryExprE      T =   >   ?   @   Y   B   C   D   E   Z    `  N12_GLOBAL__N_116itanium_demangle10PrefixExprE      À =   >   ?   @   [   B   C   D   E   \\    Ì  N12_GLOBAL__N_116itanium_demangle11PostfixExprE     , =   >   ?   @   ]   B   C   D   E   ^    8  N12_GLOBAL__N_116itanium_demangle18ArraySubscriptExprE        =   >   ?   @   _   B   C   D   E   `    ¬  N12_GLOBAL__N_116itanium_demangle10MemberExprE       =   >   ?   @   a   B   C   D   E   b      N12_GLOBAL__N_116itanium_demangle7NewExprE      t =   >   ?   @   c   B   C   D   E   d      N12_GLOBAL__N_116itanium_demangle10DeleteExprE      à =   >   ?   @   e   B   C   D   E   f    ì  N12_GLOBAL__N_116itanium_demangle8CallExprE     H =   >   ?   @   g   B   C   D   E   h    T  N12_GLOBAL__N_116itanium_demangle14ConversionExprE      ¸ =   >   ?   @   i   B   C   D   E   j    Ä  N12_GLOBAL__N_116itanium_demangle15ConditionalExprE     (  =   >   ?   @   k   B   C   D   E   l    4   N12_GLOBAL__N_116itanium_demangle8CastExprE       =   >   ?   @   m   B   C   D   E   n       N12_GLOBAL__N_116itanium_demangle13EnclosingExprE        ! =   >   ?   @   o   B   C   D   E   p    !  N12_GLOBAL__N_116itanium_demangle14IntegerLiteralE      p! =   >   ?   @   q   B   C   D   E   r    |!  N12_GLOBAL__N_116itanium_demangle8BoolExprE     Ø! =   >   ?   @   s   B   C   D   E   t    ä!  N12_GLOBAL__N_116itanium_demangle16FloatLiteralImplIfEE     L" =   >   ?   @   u   B   C   D   E   v    X"  N12_GLOBAL__N_116itanium_demangle16FloatLiteralImplIdEE     À" =   >   ?   @   w   B   C   D   E   x    Ì"  N12_GLOBAL__N_116itanium_demangle16FloatLiteralImplIeEE     4# =   >   ?   @   y   B   C   D   E   z    @#  N12_GLOBAL__N_116itanium_demangle13StringLiteralE       ¤# =   >   ?   @   {   B   C   D   E   |    °#  N12_GLOBAL__N_116itanium_demangle15UnnamedTypeNameE     $ =   >   ?   @   }   B   C   D   E   ~     $  N12_GLOBAL__N_116itanium_demangle26SyntheticTemplateParamNameE      $ =   >   ?   @         C   D   E       $  N12_GLOBAL__N_116itanium_demangle21TypeTemplateParamDeclE       % =   >   ?   @         C   D   E       %  N12_GLOBAL__N_116itanium_demangle32ConstrainedTypeTemplateParamDeclE        % =   >   ?   @         C   D   E       %  N12_GLOBAL__N_116itanium_demangle24NonTypeTemplateParamDeclE        & =   >   ?   @         C   D   E       &  N12_GLOBAL__N_116itanium_demangle25TemplateTemplateParamDeclE       & =   >   ?   @         C   D   E       &  N12_GLOBAL__N_116itanium_demangle21TemplateParamPackDeclE       ü& =   >   ?   @      B   C   D   E       \'  N12_GLOBAL__N_116itanium_demangle15ClosureTypeNameE     l\' =   >   ?   @      B   C   D   E       x\'  N12_GLOBAL__N_116itanium_demangle10LambdaExprE      Ø\' =   >   ?   @      B   C   D   E       ä\'  N12_GLOBAL__N_116itanium_demangle11EnumLiteralE     D( =   >   ?   @      B   C   D   E       P(  N12_GLOBAL__N_116itanium_demangle13FunctionParamE       ´( =   >   ?   @      B   C   D   E       À(  N12_GLOBAL__N_116itanium_demangle8FoldExprE     ) =   >   ?   @      B   C   D   E       ()  N12_GLOBAL__N_116itanium_demangle22ParameterPackExpansionE      ) =   >   ?   @      B   C   D   E        )  N12_GLOBAL__N_116itanium_demangle10BracedExprE       * =   >   ?   @      B   C   D   E       *  N12_GLOBAL__N_116itanium_demangle15BracedRangeExprE     p* =   >   ?   @      B   C   D   E       |*  N12_GLOBAL__N_116itanium_demangle12InitListExprE        à* =   >   ?   @       B   C   D   E   ¡    ì*  N12_GLOBAL__N_116itanium_demangle29PointerToMemberConversionExprE       `+ =   >   ?   @   ¢   B   C   D   E   £    l+  N12_GLOBAL__N_116itanium_demangle15ExprRequirementE     Ð+ =   >   ?   @   ¤   B   C   D   E   ¥    Ü+  N12_GLOBAL__N_116itanium_demangle15TypeRequirementE     @, =   >   ?   @   ¦   B   C   D   E   §    L,  N12_GLOBAL__N_116itanium_demangle17NestedRequirementE       ´, =   >   ?   @   ¨   B   C   D   E   ©    À,  N12_GLOBAL__N_116itanium_demangle12RequiresExprE        $- =   >   ?   @   ª   B   C   D   E   «    0-  N12_GLOBAL__N_116itanium_demangle13SubobjectExprE       - =   >   ?   @   ¬   B   C   D   E   ­     -  N12_GLOBAL__N_116itanium_demangle19SizeofParamPackExprE     . =   >   ?   @   ®   B   C   D   E   ¯    .  N12_GLOBAL__N_116itanium_demangle13NodeArrayNodeE       x. =   >   ?   @   °   B   C   D   E   ±    .  N12_GLOBAL__N_116itanium_demangle9ThrowExprE        ä. =   >   ?   @   ²   B   C   ³   E   ´    ð.  N12_GLOBAL__N_116itanium_demangle13QualifiedNameE       T/ =   >   ?   @   µ   B   C   D   E   ¶    `/  N12_GLOBAL__N_116itanium_demangle8DtorNameE     ¼/ =   >   ?   @   ·   B   C   D   E   ¸    È/  N12_GLOBAL__N_116itanium_demangle22ConversionOperatorTypeE      40 =   >   ?   @   ¹   B   C   D   E   º    @0  N12_GLOBAL__N_116itanium_demangle15LiteralOperatorE     ¤0 =   >   ?   @   »   B   C   ¼   E   ½    °0  N12_GLOBAL__N_116itanium_demangle19GlobalQualifiedNameE     1 =   >   ?   @   ¾   B   C   ¿   E   À    $1 \\1 N12_GLOBAL__N_116itanium_demangle19SpecialSubstitutionE  h1  N12_GLOBAL__N_116itanium_demangle27ExpandedSpecialSubstitutionE     \\1 =   >   ?   @   Á   B   C   Â   E   Ã       2 =   >   ?   @   Ä   B   C   Å   E   Æ    2  N12_GLOBAL__N_116itanium_demangle10AbiTagAttrE      t2 =   >   ?   @   Ç   B   C   D   E   È    2  N12_GLOBAL__N_116itanium_demangle21StructuredBindingNameE       ì2 =   >   ?   @   É   B   C   D   E   Ê    ø2  N12_GLOBAL__N_116itanium_demangle12CtorDtorNameE        \\3 =   >   ?   @   Ë   B   C   Ì   E   Í    h3  N12_GLOBAL__N_116itanium_demangle12ModuleEntityE        Ì3 =   >   ?   @   Î   B   C   Ï   E   Ð    Ø3  N12_GLOBAL__N_116itanium_demangle20MemberLikeFriendNameE        D4 =   >   ?   @   Ñ   B   C   Ò   E   Ó    P4  N12_GLOBAL__N_116itanium_demangle10NestedNameE      °4 =   >   ?   @   Ô   B   C   D   E   Õ    ¼4  N12_GLOBAL__N_116itanium_demangle9LocalNameE        5 Ö   ×   Ø   Ù   Ú   Û   C   D   E   Ü    (5  N12_GLOBAL__N_116itanium_demangle13ParameterPackE       5 =   >   ?   @   Ý   B   C   D   E   Þ    5  N12_GLOBAL__N_116itanium_demangle12TemplateArgsE        ü5 =   >   ?   @   ß   B   C   à   E   á    6  N12_GLOBAL__N_116itanium_demangle20NameWithTemplateArgsE        t6 =   >   ?   @   â   B   C   D   E   ã    6  N12_GLOBAL__N_116itanium_demangle20TemplateArgumentPackE        ì6 =   >   ?   @   ä   B   C   D   E   å    ø6  N12_GLOBAL__N_116itanium_demangle25TemplateParamQualifiedArgE       h7 =   >   ?   @   æ   B   C   D   E   ç    t7  N12_GLOBAL__N_116itanium_demangle12EnableIfAttrE        Ø7 =   >   ?   @   è   B   C   D   E   é    ä7  N12_GLOBAL__N_116itanium_demangle23ExplicitObjectParameterE     P8 ê   >   ë   @   ì   í   C   D   E   î    \\8  N12_GLOBAL__N_116itanium_demangle16FunctionEncodingE        Ä8 =   >   ?   @   ï   B   C   D   E   ð    Ð8  N12_GLOBAL__N_116itanium_demangle9DotSuffixE        09 =   >   ?   @   ñ   B   C   D   E   ò    <9  N12_GLOBAL__N_116itanium_demangle12NoexceptSpecE         9 =   >   ?   @   ó   B   C   D   E   ô    ¬9  N12_GLOBAL__N_116itanium_demangle20DynamicExceptionSpecE        : õ   >   ö   @   ÷   ø   C   D   E   ù    $:  N12_GLOBAL__N_116itanium_demangle12FunctionTypeE        : =   >   ?   @   ú   B   C   D   E   û    :  N12_GLOBAL__N_116itanium_demangle13ObjCProtoNameE       ø: =   >   ?   @   ü   B   C   D   E   ý    ;  N12_GLOBAL__N_116itanium_demangle17VendorExtQualTypeE       l; þ   ÿ      @       C   D   E      x;  N12_GLOBAL__N_116itanium_demangle8QualTypeE     Ô; =   >   ?   @     B   C   D   E      à;  N12_GLOBAL__N_116itanium_demangle15TransformedTypeE     D< =   >   ?   @     B   C   D   E      P<  N12_GLOBAL__N_116itanium_demangle12BinaryFPTypeE        ´< =   >   ?   @     B   C   D   E   	   À<  N12_GLOBAL__N_116itanium_demangle10BitIntTypeE       = =   >   ?   @   \n  B   C   D   E      ,=  N12_GLOBAL__N_116itanium_demangle20PostfixQualifiedTypeE        = =   >   ?   @     B   C   D   E   \r   ¤=  N12_GLOBAL__N_116itanium_demangle15PixelVectorTypeE     > =   >   ?   @     B   C   D   E      >  N12_GLOBAL__N_116itanium_demangle10VectorTypeE      t>     ?   @         D   E      >  N12_GLOBAL__N_116itanium_demangle9ArrayTypeE    0123456789ABCDEF        ô>   >   ?   @       C   D   E       ?  N12_GLOBAL__N_116itanium_demangle19PointerToMemberTypeE     h? =   >   ?   @     B   C   D   E      t?  N12_GLOBAL__N_116itanium_demangle22ElaboratedTypeSpefTypeE      à?   >   ?   @       C   D   E      ì?  N12_GLOBAL__N_116itanium_demangle11PointerTypeE     L@    >   ?   @   !  "  C   D   E   #   X@  N12_GLOBAL__N_116itanium_demangle13ReferenceTypeE    P P ÿ ñ â                N ë§~ uú ¹,ý·z¼ Ì¢ =I×  *_·úXÙýÊ½áÍÜ@x }gaì å\nÔ Ì>Ov¯  D ® ®` úw!ë+ `A ©£nN                                                        *                    \'9H                                  8R`S  Ê        »Ûë+;PSuccess Illegal byte sequence Domain error Result not representable Not a tty Permission denied Operation not permitted No such file or directory No such process File exists Value too large for defined data type No space left on device Out of memory Resource busy Interrupted system call Resource temporarily unavailable Invalid seek Cross-device link Read-only file system Directory not empty Connection reset by peer Operation timed out Connection refused Host is down Host is unreachable Address in use Broken pipe I/O error No such device or address Block device required No such device Not a directory Is a directory Text file busy Exec format error Invalid argument Argument list too long Symbolic link loop Filename too long Too many open files in system No file descriptors available Bad file descriptor No child process Bad address File too large Too many links No locks available Resource deadlock would occur State not recoverable Owner died Operation canceled Function not implemented No message of desired type Identifier removed Device not a stream No data available Device timeout Out of streams resources Link has been severed Protocol error Bad message File descriptor in bad state Not a socket Destination address required Message too large Protocol wrong type for socket Protocol not available Protocol not supported Socket type not supported Not supported Protocol family not supported Address family not supported by protocol Address not available Network is down Network unreachable Connection reset by network Connection aborted No buffer space available Socket is connected Socket not connected Cannot send after socket shutdown Operation already in progress Operation in progress Stale file handle Remote I/O error Quota exceeded No medium found Wrong medium type Multihop attempted Required key not available Key has expired Key has been revoked Key was rejected by service  AÐ¨½                                               J                            ÿÿÿÿÿÿÿÿ                                                            XI     àN     target_features+bulk-memory+bulk-memory-opt+call-indirect-overlong+\nmultivalue+mutable-globals+nontrapping-fptoint+reference-types+sign-ext');
}

function getBinarySync(file) {
  return file;
}

async function getWasmBinary(binaryFile) {

  // Otherwise, getBinarySync should be able to get it synchronously
  return getBinarySync(binaryFile);
}

async function instantiateArrayBuffer(binaryFile, imports) {
  try {
    var binary = await getWasmBinary(binaryFile);
    var instance = await WebAssembly.instantiate(binary, imports);
    return instance;
  } catch (reason) {
    err(`failed to asynchronously prepare wasm: ${reason}`);

    // Warn on some common problems.
    if (isFileURI(binaryFile)) {
      err(`warning: Loading from a file URI (${binaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    }
    abort(reason);
  }
}

async function instantiateAsync(binary, binaryFile, imports) {
  return instantiateArrayBuffer(binaryFile, imports);
}

function getWasmImports() {
  // prepare imports
  var imports = {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  };
  return imports;
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
async function createWasm() {
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    wasmExports = instance.exports;

    assignWasmExports(wasmExports);

    updateMemoryViews();

    return wasmExports;
  }

  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    return receiveInstance(result['instance']);
  }

  var info = getWasmImports();

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {
    return new Promise((resolve, reject) => {
      try {
        Module['instantiateWasm'](info, (inst, mod) => {
          resolve(receiveInstance(inst, mod));
        });
      } catch(e) {
        err(`Module.instantiateWasm callback failed with error: ${e}`);
        reject(e);
      }
    });
  }

  wasmBinaryFile ??= findWasmBinary();
  var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
  var exports = receiveInstantiationResult(result);
  return exports;
}

// end include: preamble.js

// Begin JS library code


  class ExitStatus {
      name = 'ExitStatus';
      constructor(status) {
        this.message = `Program terminated with exit(${status})`;
        this.status = status;
      }
    }

  var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        // Pass the module as the first argument.
        callbacks.shift()(Module);
      }
    };
  var onPostRuns = [];
  var addOnPostRun = (cb) => onPostRuns.push(cb);

  var onPreRuns = [];
  var addOnPreRun = (cb) => onPreRuns.push(cb);

  /** @noinline */
  var base64Decode = (b64) => {
      if (ENVIRONMENT_IS_NODE) {
        var buf = Buffer.from(b64, 'base64');
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
      }
  
      assert(b64.length % 4 == 0);
      var b1, b2, i = 0, j = 0, bLength = b64.length;
      var output = new Uint8Array((bLength*3>>2) - (b64[bLength-2] == '=') - (b64[bLength-1] == '='));
      for (; i < bLength; i += 4, j += 3) {
        b1 = base64ReverseLookup[b64.charCodeAt(i+1)];
        b2 = base64ReverseLookup[b64.charCodeAt(i+2)];
        output[j] = base64ReverseLookup[b64.charCodeAt(i)] << 2 | b1 >> 4;
        output[j+1] = b1 << 4 | b2 >> 2;
        output[j+2] = b2 << 6 | base64ReverseLookup[b64.charCodeAt(i+3)];
      }
      return output;
    };


  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[ptr];
      case 'i8': return HEAP8[ptr];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP64[((ptr)>>3)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort(`invalid type for getValue: ${type}`);
    }
  }

  var noExitRuntime = true;

  var ptrToString = (ptr) => {
      assert(typeof ptr === 'number', `ptrToString expects a number, got ${typeof ptr}`);
      // Convert to 32-bit unsigned value
      ptr >>>= 0;
      return '0x' + ptr.toString(16).padStart(8, '0');
    };

  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[ptr] = value; break;
      case 'i8': HEAP8[ptr] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': HEAP64[((ptr)>>3)] = BigInt(value); break;
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort(`invalid type for setValue: ${type}`);
    }
  }

  var stackRestore = (val) => __emscripten_stack_restore(val);

  var stackSave = () => _emscripten_stack_get_current();

  var warnOnce = (text) => {
      warnOnce.shown ||= {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = 'warning: ' + text;
        err(text);
      }
    };

  

  var UTF8Decoder = globalThis.TextDecoder && new TextDecoder();
  
  var findStringEnd = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
      var maxIdx = idx + maxBytesToRead;
      if (ignoreNul) return maxIdx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.
      // As a tiny code save trick, compare idx against maxIdx using a negation,
      // so that maxBytesToRead=undefined/NaN means Infinity.
      while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
      return idx;
    };
  
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number=} idx
     * @param {number=} maxBytesToRead
     * @param {boolean=} ignoreNul - If true, the function will not stop on a NUL character.
     * @return {string}
     */
  var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
  
      var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
  
      // When using conditional TextDecoder, skip it for short strings as the overhead of the native call is not worth it.
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte ' + ptrToString(u0) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    };
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index.
     * @param {boolean=} ignoreNul - If true, the function will not stop on a NUL character.
     * @return {string}
     */
  var UTF8ToString = (ptr, maxBytesToRead, ignoreNul) => {
      assert(typeof ptr == 'number', `UTF8ToString expects a number (got ${typeof ptr})`);
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead, ignoreNul) : '';
    };
  var ___assert_fail = (condition, filename, line, func) =>
      abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);

  var exceptionCaught =  [];
  
  
  var uncaughtExceptionCount = 0;
  var ___cxa_begin_catch = (ptr) => {
      var info = new ExceptionInfo(ptr);
      if (!info.get_caught()) {
        info.set_caught(true);
        uncaughtExceptionCount--;
      }
      info.set_rethrown(false);
      exceptionCaught.push(info);
      return ___cxa_get_exception_ptr(ptr);
    };

  var exceptionLast = 0;
  
  class ExceptionInfo {
      // excPtr - Thrown object pointer to wrap. Metadata pointer is calculated from it.
      constructor(excPtr) {
        this.excPtr = excPtr;
        this.ptr = excPtr - 24;
      }
  
      set_type(type) {
        HEAPU32[(((this.ptr)+(4))>>2)] = type;
      }
  
      get_type() {
        return HEAPU32[(((this.ptr)+(4))>>2)];
      }
  
      set_destructor(destructor) {
        HEAPU32[(((this.ptr)+(8))>>2)] = destructor;
      }
  
      get_destructor() {
        return HEAPU32[(((this.ptr)+(8))>>2)];
      }
  
      set_caught(caught) {
        caught = caught ? 1 : 0;
        HEAP8[(this.ptr)+(12)] = caught;
      }
  
      get_caught() {
        return HEAP8[(this.ptr)+(12)] != 0;
      }
  
      set_rethrown(rethrown) {
        rethrown = rethrown ? 1 : 0;
        HEAP8[(this.ptr)+(13)] = rethrown;
      }
  
      get_rethrown() {
        return HEAP8[(this.ptr)+(13)] != 0;
      }
  
      // Initialize native structure fields. Should be called once after allocated.
      init(type, destructor) {
        this.set_adjusted_ptr(0);
        this.set_type(type);
        this.set_destructor(destructor);
      }
  
      set_adjusted_ptr(adjustedPtr) {
        HEAPU32[(((this.ptr)+(16))>>2)] = adjustedPtr;
      }
  
      get_adjusted_ptr() {
        return HEAPU32[(((this.ptr)+(16))>>2)];
      }
    }
  
  
  var setTempRet0 = (val) => __emscripten_tempret_set(val);
  var findMatchingCatch = (args) => {
      var thrown =
        exceptionLast?.excPtr;
      if (!thrown) {
        // just pass through the null ptr
        setTempRet0(0);
        return 0;
      }
      var info = new ExceptionInfo(thrown);
      info.set_adjusted_ptr(thrown);
      var thrownType = info.get_type();
      if (!thrownType) {
        // just pass through the thrown ptr
        setTempRet0(0);
        return thrown;
      }
  
      // can_catch receives a **, add indirection
      // The different catch blocks are denoted by different types.
      // Due to inheritance, those types may not precisely match the
      // type of the thrown object. Find one which matches, and
      // return the type of the catch block which should be called.
      for (var caughtType of args) {
        if (caughtType === 0 || caughtType === thrownType) {
          // Catch all clause matched or exactly the same type is caught
          break;
        }
        var adjusted_ptr_addr = info.ptr + 16;
        if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
          setTempRet0(caughtType);
          return thrown;
        }
      }
      setTempRet0(thrownType);
      return thrown;
    };
  var ___cxa_find_matching_catch_2 = () => findMatchingCatch([]);

  var ___cxa_find_matching_catch_3 = (arg0) => findMatchingCatch([arg0]);

  
  
  
  var ___cxa_throw = (ptr, type, destructor) => {
      var info = new ExceptionInfo(ptr);
      // Initialize ExceptionInfo content after it was allocated in __cxa_allocate_exception.
      info.init(type, destructor);
      ___cxa_increment_exception_refcount(ptr);
      exceptionLast = new CppException(ptr);
      uncaughtExceptionCount++;
      throw exceptionLast;
    };

  var ___resumeException = (ptr) => {
      if (!exceptionLast) {
        exceptionLast = new CppException(ptr);
      }
      throw exceptionLast;
    };

  var __abort_js = () =>
      abort('native code called abort()');

  var getHeapMax = () =>
      // Stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate
      // full 4GB Wasm memories, the size will wrap back to 0 bytes in Wasm side
      // for any code that deals with heap sizes, which would require special
      // casing all heap size related code to treat 0 specially.
      2147483648;
  
  var alignMemory = (size, alignment) => {
      assert(alignment, "alignment argument is required");
      return Math.ceil(size / alignment) * alignment;
    };
  
  var growMemory = (size) => {
      var oldHeapSize = wasmMemory.buffer.byteLength;
      var pages = ((size - oldHeapSize + 65535) / 65536) | 0;
      try {
        // round size grow request up to wasm page size (fixed 64KB per spec)
        wasmMemory.grow(pages); // .grow() takes a delta compared to the previous size
        updateMemoryViews();
        return 1 /*success*/;
      } catch(e) {
        err(`growMemory: Attempted to grow heap from ${oldHeapSize} bytes to ${size} bytes, but got error: ${e}`);
      }
      // implicit 0 return to save code size (caller will cast "undefined" into 0
      // anyhow)
    };
  var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      requestedSize >>>= 0;
      // With multithreaded builds, races can happen (another thread might increase the size
      // in between), so return a failure, and let the caller retry.
      assert(requestedSize > oldSize);
  
      // Memory resize rules:
      // 1.  Always increase heap size to at least the requested size, rounded up
      //     to next page multiple.
      // 2a. If MEMORY_GROWTH_LINEAR_STEP == -1, excessively resize the heap
      //     geometrically: increase the heap size according to
      //     MEMORY_GROWTH_GEOMETRIC_STEP factor (default +20%), At most
      //     overreserve by MEMORY_GROWTH_GEOMETRIC_CAP bytes (default 96MB).
      // 2b. If MEMORY_GROWTH_LINEAR_STEP != -1, excessively resize the heap
      //     linearly: increase the heap size by at least
      //     MEMORY_GROWTH_LINEAR_STEP bytes.
      // 3.  Max size for the heap is capped at 2048MB-WASM_PAGE_SIZE, or by
      //     MAXIMUM_MEMORY, or by ASAN limit, depending on which is smallest
      // 4.  If we were unable to allocate as much memory, it may be due to
      //     over-eager decision to excessively reserve due to (3) above.
      //     Hence if an allocation fails, cut down on the amount of excess
      //     growth, in an attempt to succeed to perform a smaller allocation.
  
      // A limit is set for how much we can grow. We should not exceed that
      // (the wasm binary specifies it, so if we tried, we'd fail anyhow).
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        err(`Cannot enlarge memory, requested ${requestedSize} bytes, but the limit is ${maxHeapSize} bytes!`);
        return false;
      }
  
      // Loop through potential heap size increases. If we attempt a too eager
      // reservation that fails, cut down on the attempted size and reserve a
      // smaller bump instead. (max 3 times, chosen somewhat arbitrarily)
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown); // ensure geometric growth
        // but limit overreserving (default to capping at +96MB overgrowth at most)
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296 );
  
        var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
  
        var replacement = growMemory(newSize);
        if (replacement) {
  
          return true;
        }
      }
      err(`Failed to grow the heap from ${oldSize} bytes to ${newSize} bytes, not enough memory!`);
      return false;
    };

  var SYSCALLS = {
  varargs:undefined,
  getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
  };
  var _fd_close = (fd) => {
      abort('fd_close called without SYSCALLS_REQUIRE_FILESYSTEM');
    };

  var INT53_MAX = 9007199254740992;
  
  var INT53_MIN = -9007199254740992;
  var bigintToI53Checked = (num) => (num < INT53_MIN || num > INT53_MAX) ? NaN : Number(num);
  function _fd_seek(fd, offset, whence, newOffset) {
    offset = bigintToI53Checked(offset);
  
  
      return 70;
    ;
  }

  var printCharBuffers = [null,[],[]];
  
  var printChar = (stream, curr) => {
      var buffer = printCharBuffers[stream];
      assert(buffer);
      if (curr === 0 || curr === 10) {
        (stream === 1 ? out : err)(UTF8ArrayToString(buffer));
        buffer.length = 0;
      } else {
        buffer.push(curr);
      }
    };
  
  var flush_NO_FILESYSTEM = () => {
      // flush anything remaining in the buffers during shutdown
      _fflush(0);
      if (printCharBuffers[1].length) printChar(1, 10);
      if (printCharBuffers[2].length) printChar(2, 10);
    };
  
  
  var _fd_write = (fd, iov, iovcnt, pnum) => {
      // hack to support printf in SYSCALLS_REQUIRE_FILESYSTEM=0
      var num = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        for (var j = 0; j < len; j++) {
          printChar(fd, HEAPU8[ptr+j]);
        }
        num += len;
      }
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    };

  var wasmTableMirror = [];
  
  
  var getWasmTableEntry = (funcPtr) => {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        /** @suppress {checkTypes} */
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      /** @suppress {checkTypes} */
      assert(wasmTable.get(funcPtr) == func, 'JavaScript-side Wasm function table mirror is out of date!');
      return func;
    };

  var getCFunc = (ident) => {
      var func = Module['_' + ident]; // closure exported function
      assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported');
      return func;
    };
  
  var writeArrayToMemory = (array, buffer) => {
      assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)')
      HEAP8.set(array, buffer);
    };
  
  var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
  
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      assert(typeof str === 'string', `stringToUTF8Array expects a string (got ${typeof str})`);
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.codePointAt(i);
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u > 0x10FFFF) warnOnce('Invalid Unicode code point ' + ptrToString(u) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).');
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
          // Gotcha: if codePoint is over 0xFFFF, it is represented as a surrogate pair in UTF-16.
          // We need to manually skip over the second code unit for correct iteration.
          i++;
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    };
  
  var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
  var stringToUTF8OnStack = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
    };
  
  
  
  
  
    /**
     * @param {string|null=} returnType
     * @param {Array=} argTypes
     * @param {Array=} args
     * @param {Object=} opts
     */
  var ccall = (ident, returnType, argTypes, args, opts) => {
      // For fast lookup of conversion functions
      var toC = {
        'string': (str) => {
          var ret = 0;
          if (str !== null && str !== undefined && str !== 0) { // null string
            ret = stringToUTF8OnStack(str);
          }
          return ret;
        },
        'array': (arr) => {
          var ret = stackAlloc(arr.length);
          writeArrayToMemory(arr, ret);
          return ret;
        }
      };
  
      function convertReturnValue(ret) {
        if (returnType === 'string') {
          return UTF8ToString(ret);
        }
        if (returnType === 'boolean') return Boolean(ret);
        return ret;
      }
  
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      assert(returnType !== 'array', 'Return type should not be "array".');
      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]];
          if (converter) {
            if (stack === 0) stack = stackSave();
            cArgs[i] = converter(args[i]);
          } else {
            cArgs[i] = args[i];
          }
        }
      }
      var ret = func(...cArgs);
      function onDone(ret) {
        if (stack !== 0) stackRestore(stack);
        return convertReturnValue(ret);
      }
  
      ret = onDone(ret);
      return ret;
    };
  
    /**
     * @param {string=} returnType
     * @param {Array=} argTypes
     * @param {Object=} opts
     */
  var cwrap = (ident, returnType, argTypes, opts) => {
      return (...args) => ccall(ident, returnType, argTypes, args, opts);
    };

  var incrementExceptionRefcount = (ptr) => ___cxa_increment_exception_refcount(ptr);

  var decrementExceptionRefcount = (ptr) => ___cxa_decrement_exception_refcount(ptr);

  
  
  
  
  
  var getExceptionMessageCommon = (ptr) => {
      var sp = stackSave();
      var type_addr_addr = stackAlloc(4);
      var message_addr_addr = stackAlloc(4);
      ___get_exception_message(ptr, type_addr_addr, message_addr_addr);
      var type_addr = HEAPU32[((type_addr_addr)>>2)];
      var message_addr = HEAPU32[((message_addr_addr)>>2)];
      var type = UTF8ToString(type_addr);
      _free(type_addr);
      var message;
      if (message_addr) {
        message = UTF8ToString(message_addr);
        _free(message_addr);
      }
      stackRestore(sp);
      return [type, message];
    };
  var getExceptionMessage = (ptr) => getExceptionMessageCommon(ptr);

    // Precreate a reverse lookup table from chars
    // "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" back to
    // bytes to make decoding fast.
    for (var base64ReverseLookup = new Uint8Array(123/*'z'+1*/), i = 25; i >= 0; --i) {
      base64ReverseLookup[48+i] = 52+i; // '0-9'
      base64ReverseLookup[65+i] = i; // 'A-Z'
      base64ReverseLookup[97+i] = 26+i; // 'a-z'
    }
    base64ReverseLookup[43] = 62; // '+'
    base64ReverseLookup[47] = 63; // '/'
  ;
// End JS library code

// include: postlibrary.js
// This file is included after the automatically-generated JS library code
// but before the wasm module is created.

{

  // Begin ATMODULES hooks
  if (Module['noExitRuntime']) noExitRuntime = Module['noExitRuntime'];
if (Module['print']) out = Module['print'];
if (Module['printErr']) err = Module['printErr'];
if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];

Module['FS_createDataFile'] = FS.createDataFile;
Module['FS_createPreloadedFile'] = FS.createPreloadedFile;

  // End ATMODULES hooks

  checkIncomingModuleAPI();

  if (Module['arguments']) arguments_ = Module['arguments'];
  if (Module['thisProgram']) thisProgram = Module['thisProgram'];

  // Assertions on removed incoming Module JS APIs.
  assert(typeof Module['memoryInitializerPrefixURL'] == 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
  assert(typeof Module['pthreadMainPrefixURL'] == 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
  assert(typeof Module['cdInitializerPrefixURL'] == 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
  assert(typeof Module['filePackagePrefixURL'] == 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
  assert(typeof Module['read'] == 'undefined', 'Module.read option was removed');
  assert(typeof Module['readAsync'] == 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
  assert(typeof Module['readBinary'] == 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
  assert(typeof Module['setWindowTitle'] == 'undefined', 'Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)');
  assert(typeof Module['TOTAL_MEMORY'] == 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
  assert(typeof Module['ENVIRONMENT'] == 'undefined', 'Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)');
  assert(typeof Module['STACK_SIZE'] == 'undefined', 'STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time')
  // If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
  assert(typeof Module['wasmMemory'] == 'undefined', 'Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally');
  assert(typeof Module['INITIAL_MEMORY'] == 'undefined', 'Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically');

  if (Module['preInit']) {
    if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
    while (Module['preInit'].length > 0) {
      Module['preInit'].shift()();
    }
  }
  consumedModuleProp('preInit');
}

// Begin runtime exports
  Module['cwrap'] = cwrap;
  var missingLibrarySymbols = [
  'writeI53ToI64',
  'writeI53ToI64Clamped',
  'writeI53ToI64Signaling',
  'writeI53ToU64Clamped',
  'writeI53ToU64Signaling',
  'readI53FromI64',
  'readI53FromU64',
  'convertI32PairToI53',
  'convertI32PairToI53Checked',
  'convertU32PairToI53',
  'getTempRet0',
  'createNamedFunction',
  'zeroMemory',
  'exitJS',
  'withStackSave',
  'strError',
  'inetPton4',
  'inetNtop4',
  'inetPton6',
  'inetNtop6',
  'readSockaddr',
  'writeSockaddr',
  'readEmAsmArgs',
  'jstoi_q',
  'getExecutableName',
  'autoResumeAudioContext',
  'getDynCaller',
  'dynCall',
  'handleException',
  'keepRuntimeAlive',
  'runtimeKeepalivePush',
  'runtimeKeepalivePop',
  'callUserCallback',
  'maybeExit',
  'asyncLoad',
  'asmjsMangle',
  'mmapAlloc',
  'HandleAllocator',
  'getUniqueRunDependency',
  'addRunDependency',
  'removeRunDependency',
  'addOnInit',
  'addOnPostCtor',
  'addOnPreMain',
  'addOnExit',
  'STACK_SIZE',
  'STACK_ALIGN',
  'POINTER_SIZE',
  'ASSERTIONS',
  'convertJsFunctionToWasm',
  'getEmptyTableSlot',
  'updateTableMap',
  'getFunctionAddress',
  'addFunction',
  'removeFunction',
  'intArrayFromString',
  'intArrayToString',
  'AsciiToString',
  'stringToAscii',
  'UTF16ToString',
  'stringToUTF16',
  'lengthBytesUTF16',
  'UTF32ToString',
  'stringToUTF32',
  'lengthBytesUTF32',
  'stringToNewUTF8',
  'registerKeyEventCallback',
  'maybeCStringToJsString',
  'findEventTarget',
  'getBoundingClientRect',
  'fillMouseEventData',
  'registerMouseEventCallback',
  'registerWheelEventCallback',
  'registerUiEventCallback',
  'registerFocusEventCallback',
  'fillDeviceOrientationEventData',
  'registerDeviceOrientationEventCallback',
  'fillDeviceMotionEventData',
  'registerDeviceMotionEventCallback',
  'screenOrientation',
  'fillOrientationChangeEventData',
  'registerOrientationChangeEventCallback',
  'fillFullscreenChangeEventData',
  'registerFullscreenChangeEventCallback',
  'JSEvents_requestFullscreen',
  'JSEvents_resizeCanvasForFullscreen',
  'registerRestoreOldStyle',
  'hideEverythingExceptGivenElement',
  'restoreHiddenElements',
  'setLetterbox',
  'softFullscreenResizeWebGLRenderTarget',
  'doRequestFullscreen',
  'fillPointerlockChangeEventData',
  'registerPointerlockChangeEventCallback',
  'registerPointerlockErrorEventCallback',
  'requestPointerLock',
  'fillVisibilityChangeEventData',
  'registerVisibilityChangeEventCallback',
  'registerTouchEventCallback',
  'fillGamepadEventData',
  'registerGamepadEventCallback',
  'registerBeforeUnloadEventCallback',
  'fillBatteryEventData',
  'registerBatteryEventCallback',
  'setCanvasElementSize',
  'getCanvasElementSize',
  'jsStackTrace',
  'getCallstack',
  'convertPCtoSourceLocation',
  'getEnvStrings',
  'checkWasiClock',
  'wasiRightsToMuslOFlags',
  'wasiOFlagsToMuslOFlags',
  'initRandomFill',
  'randomFill',
  'safeSetTimeout',
  'setImmediateWrapped',
  'safeRequestAnimationFrame',
  'clearImmediateWrapped',
  'registerPostMainLoop',
  'registerPreMainLoop',
  'getPromise',
  'makePromise',
  'idsToPromises',
  'makePromiseCallback',
  'Browser_asyncPrepareDataCounter',
  'isLeapYear',
  'ydayFromDate',
  'arraySum',
  'addDays',
  'getSocketFromFD',
  'getSocketAddress',
  'FS_createPreloadedFile',
  'FS_preloadFile',
  'FS_modeStringToFlags',
  'FS_getMode',
  'FS_stdin_getChar',
  'FS_mkdirTree',
  '_setNetworkCallback',
  'heapObjectForWebGLType',
  'toTypedArrayIndex',
  'webgl_enable_ANGLE_instanced_arrays',
  'webgl_enable_OES_vertex_array_object',
  'webgl_enable_WEBGL_draw_buffers',
  'webgl_enable_WEBGL_multi_draw',
  'webgl_enable_EXT_polygon_offset_clamp',
  'webgl_enable_EXT_clip_control',
  'webgl_enable_WEBGL_polygon_mode',
  'emscriptenWebGLGet',
  'computeUnpackAlignedImageSize',
  'colorChannelsInGlTextureFormat',
  'emscriptenWebGLGetTexPixelData',
  'emscriptenWebGLGetUniform',
  'webglGetUniformLocation',
  'webglPrepareUniformLocationsBeforeFirstUse',
  'webglGetLeftBracePos',
  'emscriptenWebGLGetVertexAttrib',
  '__glGetActiveAttribOrUniform',
  'writeGLArray',
  'registerWebGlEventCallback',
  'runAndAbortIfError',
  'ALLOC_NORMAL',
  'ALLOC_STACK',
  'allocate',
  'writeStringToMemory',
  'writeAsciiToMemory',
  'allocateUTF8',
  'allocateUTF8OnStack',
  'demangle',
  'stackTrace',
  'getNativeTypeSize',
];
missingLibrarySymbols.forEach(missingLibrarySymbol)

  var unexportedSymbols = [
  'run',
  'out',
  'err',
  'callMain',
  'abort',
  'wasmExports',
  'HEAPF32',
  'HEAPF64',
  'HEAP8',
  'HEAP16',
  'HEAPU16',
  'HEAP32',
  'HEAP64',
  'HEAPU64',
  'writeStackCookie',
  'checkStackCookie',
  'INT53_MAX',
  'INT53_MIN',
  'bigintToI53Checked',
  'stackSave',
  'stackRestore',
  'stackAlloc',
  'setTempRet0',
  'ptrToString',
  'getHeapMax',
  'growMemory',
  'ENV',
  'ERRNO_CODES',
  'DNS',
  'Protocols',
  'Sockets',
  'timers',
  'warnOnce',
  'readEmAsmArgsArray',
  'alignMemory',
  'wasmTable',
  'wasmMemory',
  'noExitRuntime',
  'addOnPreRun',
  'addOnPostRun',
  'ccall',
  'freeTableIndexes',
  'functionsInTableMap',
  'setValue',
  'getValue',
  'PATH',
  'PATH_FS',
  'UTF8Decoder',
  'UTF8ArrayToString',
  'UTF8ToString',
  'stringToUTF8Array',
  'stringToUTF8',
  'lengthBytesUTF8',
  'UTF16Decoder',
  'stringToUTF8OnStack',
  'writeArrayToMemory',
  'JSEvents',
  'specialHTMLTargets',
  'findCanvasEventTarget',
  'currentFullscreenStrategy',
  'restoreOldWindowedStyle',
  'UNWIND_CACHE',
  'ExitStatus',
  'flush_NO_FILESYSTEM',
  'emSetImmediate',
  'emClearImmediate_deps',
  'emClearImmediate',
  'promiseMap',
  'uncaughtExceptionCount',
  'exceptionLast',
  'exceptionCaught',
  'ExceptionInfo',
  'findMatchingCatch',
  'getExceptionMessageCommon',
  'Browser',
  'requestFullscreen',
  'requestFullScreen',
  'setCanvasSize',
  'getUserMedia',
  'createContext',
  'getPreloadedImageData__data',
  'wget',
  'MONTH_DAYS_REGULAR',
  'MONTH_DAYS_LEAP',
  'MONTH_DAYS_REGULAR_CUMULATIVE',
  'MONTH_DAYS_LEAP_CUMULATIVE',
  'base64Decode',
  'SYSCALLS',
  'preloadPlugins',
  'FS_stdin_getChar_buffer',
  'FS_unlink',
  'FS_createPath',
  'FS_createDevice',
  'FS_readFile',
  'FS',
  'FS_root',
  'FS_mounts',
  'FS_devices',
  'FS_streams',
  'FS_nextInode',
  'FS_nameTable',
  'FS_currentPath',
  'FS_initialized',
  'FS_ignorePermissions',
  'FS_filesystems',
  'FS_syncFSRequests',
  'FS_readFiles',
  'FS_lookupPath',
  'FS_getPath',
  'FS_hashName',
  'FS_hashAddNode',
  'FS_hashRemoveNode',
  'FS_lookupNode',
  'FS_createNode',
  'FS_destroyNode',
  'FS_isRoot',
  'FS_isMountpoint',
  'FS_isFile',
  'FS_isDir',
  'FS_isLink',
  'FS_isChrdev',
  'FS_isBlkdev',
  'FS_isFIFO',
  'FS_isSocket',
  'FS_flagsToPermissionString',
  'FS_nodePermissions',
  'FS_mayLookup',
  'FS_mayCreate',
  'FS_mayDelete',
  'FS_mayOpen',
  'FS_checkOpExists',
  'FS_nextfd',
  'FS_getStreamChecked',
  'FS_getStream',
  'FS_createStream',
  'FS_closeStream',
  'FS_dupStream',
  'FS_doSetAttr',
  'FS_chrdev_stream_ops',
  'FS_major',
  'FS_minor',
  'FS_makedev',
  'FS_registerDevice',
  'FS_getDevice',
  'FS_getMounts',
  'FS_syncfs',
  'FS_mount',
  'FS_unmount',
  'FS_lookup',
  'FS_mknod',
  'FS_statfs',
  'FS_statfsStream',
  'FS_statfsNode',
  'FS_create',
  'FS_mkdir',
  'FS_mkdev',
  'FS_symlink',
  'FS_rename',
  'FS_rmdir',
  'FS_readdir',
  'FS_readlink',
  'FS_stat',
  'FS_fstat',
  'FS_lstat',
  'FS_doChmod',
  'FS_chmod',
  'FS_lchmod',
  'FS_fchmod',
  'FS_doChown',
  'FS_chown',
  'FS_lchown',
  'FS_fchown',
  'FS_doTruncate',
  'FS_truncate',
  'FS_ftruncate',
  'FS_utime',
  'FS_open',
  'FS_close',
  'FS_isClosed',
  'FS_llseek',
  'FS_read',
  'FS_write',
  'FS_mmap',
  'FS_msync',
  'FS_ioctl',
  'FS_writeFile',
  'FS_cwd',
  'FS_chdir',
  'FS_createDefaultDirectories',
  'FS_createDefaultDevices',
  'FS_createSpecialDirectories',
  'FS_createStandardStreams',
  'FS_staticInit',
  'FS_init',
  'FS_quit',
  'FS_findObject',
  'FS_analyzePath',
  'FS_createFile',
  'FS_createDataFile',
  'FS_forceLoadFile',
  'FS_createLazyFile',
  'FS_absolutePath',
  'FS_createFolder',
  'FS_createLink',
  'FS_joinPath',
  'FS_mmapAlloc',
  'FS_standardizePath',
  'MEMFS',
  'TTY',
  'PIPEFS',
  'SOCKFS',
  'tempFixedLengthArray',
  'miniTempWebGLFloatBuffers',
  'miniTempWebGLIntBuffers',
  'GL',
  'AL',
  'GLUT',
  'EGL',
  'GLEW',
  'IDBStore',
  'SDL',
  'SDL_gfx',
  'print',
  'printErr',
  'jstoi_s',
];
unexportedSymbols.forEach(unexportedRuntimeSymbol);

  // End runtime exports
  // Begin JS library exports
  Module['incrementExceptionRefcount'] = incrementExceptionRefcount;
  Module['decrementExceptionRefcount'] = decrementExceptionRefcount;
  Module['getExceptionMessage'] = getExceptionMessage;
  // End JS library exports

// end include: postlibrary.js

function checkIncomingModuleAPI() {
  ignoredModuleProp('fetchSettings');
}

// Imports from the Wasm binary.
var _tiff_to_bmp = Module['_tiff_to_bmp'] = makeInvalidEarlyAccess('_tiff_to_bmp');
var _malloc = Module['_malloc'] = makeInvalidEarlyAccess('_malloc');
var _tiff_free = Module['_tiff_free'] = makeInvalidEarlyAccess('_tiff_free');
var _free = Module['_free'] = makeInvalidEarlyAccess('_free');
var _fflush = makeInvalidEarlyAccess('_fflush');
var _strerror = makeInvalidEarlyAccess('_strerror');
var _emscripten_stack_get_end = makeInvalidEarlyAccess('_emscripten_stack_get_end');
var _emscripten_stack_get_base = makeInvalidEarlyAccess('_emscripten_stack_get_base');
var _setThrew = makeInvalidEarlyAccess('_setThrew');
var __emscripten_tempret_set = makeInvalidEarlyAccess('__emscripten_tempret_set');
var _emscripten_stack_init = makeInvalidEarlyAccess('_emscripten_stack_init');
var _emscripten_stack_get_free = makeInvalidEarlyAccess('_emscripten_stack_get_free');
var __emscripten_stack_restore = makeInvalidEarlyAccess('__emscripten_stack_restore');
var __emscripten_stack_alloc = makeInvalidEarlyAccess('__emscripten_stack_alloc');
var _emscripten_stack_get_current = makeInvalidEarlyAccess('_emscripten_stack_get_current');
var ___cxa_free_exception = makeInvalidEarlyAccess('___cxa_free_exception');
var ___cxa_increment_exception_refcount = makeInvalidEarlyAccess('___cxa_increment_exception_refcount');
var ___cxa_decrement_exception_refcount = makeInvalidEarlyAccess('___cxa_decrement_exception_refcount');
var ___get_exception_message = makeInvalidEarlyAccess('___get_exception_message');
var ___cxa_can_catch = makeInvalidEarlyAccess('___cxa_can_catch');
var ___cxa_get_exception_ptr = makeInvalidEarlyAccess('___cxa_get_exception_ptr');
var memory = makeInvalidEarlyAccess('memory');
var __indirect_function_table = makeInvalidEarlyAccess('__indirect_function_table');
var wasmMemory = makeInvalidEarlyAccess('wasmMemory');
var wasmTable = makeInvalidEarlyAccess('wasmTable');

function assignWasmExports(wasmExports) {
  assert(typeof wasmExports['tiff_to_bmp'] != 'undefined', 'missing Wasm export: tiff_to_bmp');
  assert(typeof wasmExports['malloc'] != 'undefined', 'missing Wasm export: malloc');
  assert(typeof wasmExports['tiff_free'] != 'undefined', 'missing Wasm export: tiff_free');
  assert(typeof wasmExports['free'] != 'undefined', 'missing Wasm export: free');
  assert(typeof wasmExports['fflush'] != 'undefined', 'missing Wasm export: fflush');
  assert(typeof wasmExports['strerror'] != 'undefined', 'missing Wasm export: strerror');
  assert(typeof wasmExports['emscripten_stack_get_end'] != 'undefined', 'missing Wasm export: emscripten_stack_get_end');
  assert(typeof wasmExports['emscripten_stack_get_base'] != 'undefined', 'missing Wasm export: emscripten_stack_get_base');
  assert(typeof wasmExports['setThrew'] != 'undefined', 'missing Wasm export: setThrew');
  assert(typeof wasmExports['_emscripten_tempret_set'] != 'undefined', 'missing Wasm export: _emscripten_tempret_set');
  assert(typeof wasmExports['emscripten_stack_init'] != 'undefined', 'missing Wasm export: emscripten_stack_init');
  assert(typeof wasmExports['emscripten_stack_get_free'] != 'undefined', 'missing Wasm export: emscripten_stack_get_free');
  assert(typeof wasmExports['_emscripten_stack_restore'] != 'undefined', 'missing Wasm export: _emscripten_stack_restore');
  assert(typeof wasmExports['_emscripten_stack_alloc'] != 'undefined', 'missing Wasm export: _emscripten_stack_alloc');
  assert(typeof wasmExports['emscripten_stack_get_current'] != 'undefined', 'missing Wasm export: emscripten_stack_get_current');
  assert(typeof wasmExports['__cxa_free_exception'] != 'undefined', 'missing Wasm export: __cxa_free_exception');
  assert(typeof wasmExports['__cxa_increment_exception_refcount'] != 'undefined', 'missing Wasm export: __cxa_increment_exception_refcount');
  assert(typeof wasmExports['__cxa_decrement_exception_refcount'] != 'undefined', 'missing Wasm export: __cxa_decrement_exception_refcount');
  assert(typeof wasmExports['__get_exception_message'] != 'undefined', 'missing Wasm export: __get_exception_message');
  assert(typeof wasmExports['__cxa_can_catch'] != 'undefined', 'missing Wasm export: __cxa_can_catch');
  assert(typeof wasmExports['__cxa_get_exception_ptr'] != 'undefined', 'missing Wasm export: __cxa_get_exception_ptr');
  assert(typeof wasmExports['memory'] != 'undefined', 'missing Wasm export: memory');
  assert(typeof wasmExports['__indirect_function_table'] != 'undefined', 'missing Wasm export: __indirect_function_table');
  _tiff_to_bmp = Module['_tiff_to_bmp'] = createExportWrapper('tiff_to_bmp', 4);
  _malloc = Module['_malloc'] = createExportWrapper('malloc', 1);
  _tiff_free = Module['_tiff_free'] = createExportWrapper('tiff_free', 1);
  _free = Module['_free'] = createExportWrapper('free', 1);
  _fflush = createExportWrapper('fflush', 1);
  _strerror = createExportWrapper('strerror', 1);
  _emscripten_stack_get_end = wasmExports['emscripten_stack_get_end'];
  _emscripten_stack_get_base = wasmExports['emscripten_stack_get_base'];
  _setThrew = createExportWrapper('setThrew', 2);
  __emscripten_tempret_set = createExportWrapper('_emscripten_tempret_set', 1);
  _emscripten_stack_init = wasmExports['emscripten_stack_init'];
  _emscripten_stack_get_free = wasmExports['emscripten_stack_get_free'];
  __emscripten_stack_restore = wasmExports['_emscripten_stack_restore'];
  __emscripten_stack_alloc = wasmExports['_emscripten_stack_alloc'];
  _emscripten_stack_get_current = wasmExports['emscripten_stack_get_current'];
  ___cxa_free_exception = createExportWrapper('__cxa_free_exception', 1);
  ___cxa_increment_exception_refcount = createExportWrapper('__cxa_increment_exception_refcount', 1);
  ___cxa_decrement_exception_refcount = createExportWrapper('__cxa_decrement_exception_refcount', 1);
  ___get_exception_message = createExportWrapper('__get_exception_message', 3);
  ___cxa_can_catch = createExportWrapper('__cxa_can_catch', 3);
  ___cxa_get_exception_ptr = createExportWrapper('__cxa_get_exception_ptr', 1);
  memory = wasmMemory = wasmExports['memory'];
  __indirect_function_table = wasmTable = wasmExports['__indirect_function_table'];
}

var wasmImports = {
  /** @export */
  __assert_fail: ___assert_fail,
  /** @export */
  __cxa_begin_catch: ___cxa_begin_catch,
  /** @export */
  __cxa_find_matching_catch_2: ___cxa_find_matching_catch_2,
  /** @export */
  __cxa_find_matching_catch_3: ___cxa_find_matching_catch_3,
  /** @export */
  __cxa_throw: ___cxa_throw,
  /** @export */
  __resumeException: ___resumeException,
  /** @export */
  _abort_js: __abort_js,
  /** @export */
  emscripten_resize_heap: _emscripten_resize_heap,
  /** @export */
  fd_close: _fd_close,
  /** @export */
  fd_seek: _fd_seek,
  /** @export */
  fd_write: _fd_write,
  /** @export */
  invoke_ii,
  /** @export */
  invoke_iii,
  /** @export */
  invoke_v,
  /** @export */
  invoke_vi,
  /** @export */
  invoke_vii,
  /** @export */
  invoke_viii,
  /** @export */
  invoke_viiii
};

function invoke_ii(index,a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_v(index) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)();
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iii(index,a1,a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vi(index,a1) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiii(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vii(index,a1,a2) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}


// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

var calledRun;

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run() {

  stackCheckInit();

  preRun();

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    assert(!calledRun);
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    readyPromiseResolve?.(Module);
    Module['onRuntimeInitialized']?.();
    consumedModuleProp('onRuntimeInitialized');

    assert(!Module['_main'], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(() => {
      setTimeout(() => Module['setStatus'](''), 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = (x) => {
    has = true;
  }
  try { // it doesn't matter if it fails
    flush_NO_FILESYSTEM();
  } catch(e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.');
    warnOnce('(this may also be due to not including full filesystem support - try building with -sFORCE_FILESYSTEM)');
  }
}

var wasmExports;

// In modularize mode the generated code is within a factory function so we
// can use await here (since it's not top-level-await).
wasmExports = await (createWasm());

run();

// end include: postamble.js

// include: postamble_modularize.js
// In MODULARIZE mode we wrap the generated code in a factory function
// and return either the Module itself, or a promise of the module.
//
// We assign to the `moduleRtn` global here and configure closure to see
// this as an extern so it won't get minified.

if (runtimeInitialized)  {
  moduleRtn = Module;
} else {
  // Set up the promise that indicates the Module is initialized
  moduleRtn = new Promise((resolve, reject) => {
    readyPromiseResolve = resolve;
    readyPromiseReject = reject;
  });
}

// Assertion for attempting to access module properties on the incoming
// moduleArg.  In the past we used this object as the prototype of the module
// and assigned properties to it, but now we return a distinct object.  This
// keeps the instance private until it is ready (i.e the promise has been
// resolved).
for (const prop of Object.keys(Module)) {
  if (!(prop in moduleArg)) {
    Object.defineProperty(moduleArg, prop, {
      configurable: true,
      get() {
        abort(`Access to module property ('${prop}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`)
      }
    });
  }
}
// end include: postamble_modularize.js



    return moduleRtn;
  };
})();

// Export using a UMD style export, or ES6 exports if selected
if (typeof exports === 'object' && typeof module === 'object') {
  module.exports = create_ccitt_g4_tiff_module;
  // This default export looks redundant, but it allows TS to import this
  // commonjs style module.
  module.exports.default = create_ccitt_g4_tiff_module;
} else if (typeof define === 'function' && define['amd'])
  define([], () => create_ccitt_g4_tiff_module);


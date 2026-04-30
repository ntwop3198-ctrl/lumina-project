/**
 * @deprecated 호환용 — 내부적으로 `free-port.js 3001`과 동일.
 */
const { killListenersOnPort } = require("./free-port")
killListenersOnPort("3001")

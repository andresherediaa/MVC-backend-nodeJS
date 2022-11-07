"use strict";

var _http = _interopRequireDefault(require("http"));
var _app = _interopRequireDefault(require("../src/app"));
var _planetsModel = require("../src/models/planets.model.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//server config
const PORT = process.env.PORT || 8000;
const server = _http.default.createServer(_app.default);
async function startServer() {
  try {
    await (0, _planetsModel.loadPlanetsData)();
    server.listen(PORT, () => {
      console.log(`Server running in PORT ${PORT}`);
    });
  } catch (error) {
    console.log("error loadind models data", error);
  }
}
startServer();
//# sourceMappingURL=server.js.map
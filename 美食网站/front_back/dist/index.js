"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const MainController_1 = require("./controllers/MainController");
const app = routing_controllers_1.createKoaServer({
    controllers: [MainController_1.default]
});
app.listen(8888);
//# sourceMappingURL=index.js.map
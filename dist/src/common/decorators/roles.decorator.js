"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.ROLES_KEY = exports.RoleName = void 0;
const common_1 = require("@nestjs/common");
var RoleName;
(function (RoleName) {
    RoleName["ADMIN"] = "ADMIN";
    RoleName["CLIENTE"] = "CLIENTE";
    RoleName["ALUMNO"] = "ALUMNO";
})(RoleName || (exports.RoleName = RoleName = {}));
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
//# sourceMappingURL=roles.decorator.js.map
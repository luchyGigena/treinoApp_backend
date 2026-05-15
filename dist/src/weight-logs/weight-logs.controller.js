"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightLogsController = void 0;
const common_1 = require("@nestjs/common");
const weight_logs_service_1 = require("./weight-logs.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const create_weight_log_dto_1 = require("./dto/create-weight-log.dto");
let WeightLogsController = class WeightLogsController {
    constructor(weightLogsService) {
        this.weightLogsService = weightLogsService;
    }
    getMyWeightLogs(user) {
        return this.weightLogsService.getMyWeightLogs(user.id);
    }
    getWeightLogs(user, alumnoId) {
        return this.weightLogsService.getWeightLogs(alumnoId, user.id);
    }
    create(user, dto) {
        return this.weightLogsService.createWeightLog(user.id, dto);
    }
    delete(user, id) {
        return this.weightLogsService.deleteWeightLog(id, user.id);
    }
};
exports.WeightLogsController = WeightLogsController;
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.ALUMNO),
    (0, common_1.Get)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WeightLogsController.prototype, "getMyWeightLogs", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.CLIENTE),
    (0, common_1.Get)(':alumnoId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('alumnoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], WeightLogsController.prototype, "getWeightLogs", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.CLIENTE),
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_weight_log_dto_1.CreateWeightLogDto]),
    __metadata("design:returntype", void 0)
], WeightLogsController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.CLIENTE),
    (0, common_1.Delete)(':id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], WeightLogsController.prototype, "delete", null);
exports.WeightLogsController = WeightLogsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('weight-logs'),
    __metadata("design:paramtypes", [weight_logs_service_1.WeightLogsService])
], WeightLogsController);
//# sourceMappingURL=weight-logs.controller.js.map
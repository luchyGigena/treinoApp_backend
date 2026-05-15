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
exports.RoutinesController = void 0;
const common_1 = require("@nestjs/common");
const routines_service_1 = require("./routines.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const create_routine_dto_1 = require("./dto/create-routine.dto");
const copy_routine_dto_1 = require("./dto/copy-routine.dto");
let RoutinesController = class RoutinesController {
    constructor(routinesService) {
        this.routinesService = routinesService;
    }
    getMyRoutines(user) {
        return this.routinesService.getMyRoutines(user.id);
    }
    getAll(user) {
        return this.routinesService.getRoutinesByCliente(user.id);
    }
    getByAlumno(user, alumnoId) {
        return this.routinesService.getRoutinesByAlumno(alumnoId, user.id);
    }
    create(user, dto) {
        return this.routinesService.createRoutine(user.id, dto);
    }
    delete(user, id) {
        return this.routinesService.deleteRoutine(id, user.id);
    }
    copy(user, id, dto) {
        return this.routinesService.copyRoutine(id, user.id, dto);
    }
};
exports.RoutinesController = RoutinesController;
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.ALUMNO),
    (0, common_1.Get)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoutinesController.prototype, "getMyRoutines", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.CLIENTE),
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoutinesController.prototype, "getAll", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.CLIENTE),
    (0, common_1.Get)('alumno/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], RoutinesController.prototype, "getByAlumno", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.CLIENTE),
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_routine_dto_1.CreateRoutineDto]),
    __metadata("design:returntype", void 0)
], RoutinesController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.CLIENTE),
    (0, common_1.Delete)(':id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], RoutinesController.prototype, "delete", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.CLIENTE),
    (0, common_1.Post)(':id/copy'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, copy_routine_dto_1.CopyRoutineDto]),
    __metadata("design:returntype", void 0)
], RoutinesController.prototype, "copy", null);
exports.RoutinesController = RoutinesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('routines'),
    __metadata("design:paramtypes", [routines_service_1.RoutinesService])
], RoutinesController);
//# sourceMappingURL=routines.controller.js.map
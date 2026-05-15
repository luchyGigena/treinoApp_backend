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
exports.WorkoutLogsController = void 0;
const common_1 = require("@nestjs/common");
const workout_logs_service_1 = require("./workout-logs.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const upsert_workout_log_dto_1 = require("./dto/upsert-workout-log.dto");
const upsert_my_workout_log_dto_1 = require("./dto/upsert-my-workout-log.dto");
let WorkoutLogsController = class WorkoutLogsController {
    constructor(workoutLogsService) {
        this.workoutLogsService = workoutLogsService;
    }
    getMyWorkoutLogs(user) {
        return this.workoutLogsService.getMyWorkoutLogs(user.id);
    }
    getMyWorkoutLog(user, date, routineId) {
        return this.workoutLogsService.getMyWorkoutLog(user.id, date, routineId);
    }
    upsertMyWorkoutLog(user, dto) {
        return this.workoutLogsService.upsertMyWorkoutLog(user.id, dto);
    }
    getAll(user, alumnoId) {
        return this.workoutLogsService.getWorkoutLogs(alumnoId, user.id);
    }
    getOne(user, alumnoId, date, routineId) {
        return this.workoutLogsService.getWorkoutLog(alumnoId, date, routineId, user.id);
    }
    upsert(user, dto) {
        return this.workoutLogsService.upsertWorkoutLog(user.id, dto);
    }
};
exports.WorkoutLogsController = WorkoutLogsController;
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.ALUMNO),
    (0, common_1.Get)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkoutLogsController.prototype, "getMyWorkoutLogs", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.ALUMNO),
    (0, common_1.Get)('me/:date/:routineId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('date')),
    __param(2, (0, common_1.Param)('routineId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", void 0)
], WorkoutLogsController.prototype, "getMyWorkoutLog", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.ALUMNO),
    (0, common_1.Put)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upsert_my_workout_log_dto_1.UpsertMyWorkoutLogDto]),
    __metadata("design:returntype", void 0)
], WorkoutLogsController.prototype, "upsertMyWorkoutLog", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.CLIENTE),
    (0, common_1.Get)(':alumnoId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('alumnoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], WorkoutLogsController.prototype, "getAll", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.CLIENTE),
    (0, common_1.Get)(':alumnoId/:date/:routineId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('alumnoId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('date')),
    __param(3, (0, common_1.Param)('routineId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String, Number]),
    __metadata("design:returntype", void 0)
], WorkoutLogsController.prototype, "getOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.CLIENTE),
    (0, common_1.Put)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upsert_workout_log_dto_1.UpsertWorkoutLogDto]),
    __metadata("design:returntype", void 0)
], WorkoutLogsController.prototype, "upsert", null);
exports.WorkoutLogsController = WorkoutLogsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('workout-logs'),
    __metadata("design:paramtypes", [workout_logs_service_1.WorkoutLogsService])
], WorkoutLogsController);
//# sourceMappingURL=workout-logs.controller.js.map
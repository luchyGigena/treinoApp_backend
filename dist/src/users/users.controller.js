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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const create_cliente_dto_1 = require("./dto/create-cliente.dto");
const create_alumno_dto_1 = require("./dto/create-alumno.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getAllClientes() {
        return this.usersService.getAllClientes();
    }
    createCliente(dto) {
        return this.usersService.createCliente(dto);
    }
    getClienteById(id) {
        return this.usersService.getClienteById(id);
    }
    toggleClienteActive(id) {
        return this.usersService.toggleClienteActive(id);
    }
    getClienteAlumnos(id) {
        return this.usersService.getClienteAlumnos(id);
    }
    getMyAlumnos(user) {
        return this.usersService.getMyAlumnos(user.id);
    }
    createAlumno(user, dto) {
        return this.usersService.createAlumno(user.id, dto);
    }
    getAlumnoById(user, id) {
        return this.usersService.getAlumnoById(id, user.id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.ADMIN),
    (0, common_1.Get)('clientes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAllClientes", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.ADMIN),
    (0, common_1.Post)('clientes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cliente_dto_1.CreateClienteDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createCliente", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.ADMIN),
    (0, common_1.Get)('clientes/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getClienteById", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.ADMIN),
    (0, common_1.Patch)('clientes/:id/toggle-active'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "toggleClienteActive", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.ADMIN),
    (0, common_1.Get)('clientes/:id/alumnos'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getClienteAlumnos", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.CLIENTE),
    (0, common_1.Get)('alumnos'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMyAlumnos", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.CLIENTE),
    (0, common_1.Post)('alumnos'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_alumno_dto_1.CreateAlumnoDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createAlumno", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.RoleName.CLIENTE),
    (0, common_1.Get)('alumnos/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAlumnoById", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map
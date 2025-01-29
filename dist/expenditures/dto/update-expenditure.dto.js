"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExpenditureDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_expenditure_dto_1 = require("./create-expenditure.dto");
class UpdateExpenditureDto extends (0, mapped_types_1.PartialType)(create_expenditure_dto_1.CreateExpenditureDto) {
}
exports.UpdateExpenditureDto = UpdateExpenditureDto;
//# sourceMappingURL=update-expenditure.dto.js.map
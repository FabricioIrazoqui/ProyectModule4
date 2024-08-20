import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({
    name: 'MatchPassword',
    async: false
})

export class MatchPassword implements ValidatorConstraintInterface {
    validate(password: string, args?: ValidationArguments): boolean {
        if (password !== (args.object as any)[args.constraints[0]]) return false
        else return true
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'El password y la confirmación no coinciden'
    }
}
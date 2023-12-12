import { FormGroup } from "@angular/forms";

export const formPassword = (group: FormGroup) => {
    const password = group.controls['password'].value;
    const confirmPassword = group.controls['confirmPassword'].value;
    return password === confirmPassword ? null : group.controls['confirmPassword'].setErrors({passwordMissmatch: true});
}
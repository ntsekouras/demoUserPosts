import { HelperService } from "../../core";

export abstract class BaseComponent {
    //properties
    public entityId: number;
    public entityLabel: string;
    public title: string;

    constructor(protected _helperService: HelperService) { }

    //abstract methods
    //abstract saveEntity(): void;

    // helper methods *************************************************************************************
    public isAddMode() {
        return isNaN(this.entityId) || this.entityId === 0;
    }
    
    //check if form is valid
    isValidForm(): boolean {
        let isValid = this._helperService.isFormValid();
        isValid ? this._helperService.hideErrors() : this._helperService.showWhereErrors();

        return isValid;
    }
}
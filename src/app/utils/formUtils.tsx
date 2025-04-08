
type FormField = {
    name? : string;
    label? : string;
    type? : string;
    placeholder? : string;
    spanClass? : string;
    required? : boolean;
    options? : string[]; // for select form
};

export function injectOptionForm(
    formData : FormField[],
    key : string,
    options : string[]
): FormField[]{
    return formData.map((item) => {
        if(item.name === key && item.type === "select"){
            return {
                ...item,
                options : options,
            };
        }
        return item;
    });
}


// information
// 1. Key : the name of the field you want to inject options into
// 2.formData : the static form template you already created (an array of FormFields)
// 3. options : the options you want to inject into the form template
// 4. ): FormField[]{ make sure my return match the type of FormField[]
// 5. overall this functio for inject data option in formTemplates
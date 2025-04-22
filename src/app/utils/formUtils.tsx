export type SelectOption = {
    label : string;
    value : string | number;
}

type FormField = {
    name? : string;
    label? : string;
    type? : string;
    placeholder? : string;
    spanClass? : string;
    required? : boolean;
    options? : SelectOption[]; // for select form
};

export function injectOptionForm(
    formData : FormField[],
    key : string,
    options : {label : string; value : string | number}[]
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

export function injectMultipleOptionsForm(
  formData: FormField[],
  injections: { name: string; options: SelectOption[] }[]
): FormField[] {
  return formData.map((field) => {
    const injection = injections.find((inj) => inj.name === field.name && field.type === "select");
    if (injection) {
      return {
        ...field,
        options: injection.options,
      };
    }
    return field;
  });
}



// information
// 1. Key : the name of the field you want to inject options into
// 2.formData : the static form template you already created (an array of FormFields)
// 3. options : the options you want to inject into the form template
// 4. ): FormField[]{ make sure my return match the type of FormField[]
// 5. overall this functio for inject data option in formTemplates

// InjectMultipleOptionForm
// 1.: receive formData as an array and injection as an array of object 
// 2. inside injections there are name and option, which option containe another object with label and value
// 3. : FormField[]: make sure my return match the type of FormField[]
// 4. flow will be like this :
// -  system will be map formData
// -  system will find which part of form that need to be inject usin injections.find so it will only inject that spesific field name and field type
// - at return injection.options means it return spesific form that need to be injection and options would be inject there

// important!
// The map ensures that all fields are processed.
// The find ensures that only the correct fields get injected with options.
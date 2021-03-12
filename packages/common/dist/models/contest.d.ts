import * as Yup from "yup";
export declare const contestSchema: import("yup/lib/object").OptionalObjectSchema<{
    name: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    website: Yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
    email: Yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
    description: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    instruction: Yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
}, Record<string, any>, import("yup/lib/object").TypeOfShape<{
    name: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    website: Yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
    email: Yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
    description: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    instruction: Yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
}>>;

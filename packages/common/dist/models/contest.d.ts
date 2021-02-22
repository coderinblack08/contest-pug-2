import * as Yup from "yup";
export declare const contestSchema: import("yup/lib/object").OptionalObjectSchema<{
    name: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    website: Yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
    email: Yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
    description: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    instruction: Yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
    form: Yup.ArraySchema<Yup.ObjectSchema<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        question: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        type: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        required: import("yup/lib/boolean").RequiredBooleanSchema<boolean | undefined, Record<string, any>>;
    }>, Record<string, any>, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        question: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        type: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        required: import("yup/lib/boolean").RequiredBooleanSchema<boolean | undefined, Record<string, any>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        question: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        type: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        required: import("yup/lib/boolean").RequiredBooleanSchema<boolean | undefined, Record<string, any>>;
    }>>>, Record<string, any>, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        question: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        type: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        required: import("yup/lib/boolean").RequiredBooleanSchema<boolean | undefined, Record<string, any>>;
    }>>[] | undefined, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        question: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        type: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        required: import("yup/lib/boolean").RequiredBooleanSchema<boolean | undefined, Record<string, any>>;
    }>>[] | undefined>;
}, Record<string, any>, import("yup/lib/object").TypeOfShape<{
    name: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    website: Yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
    email: Yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
    description: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    instruction: Yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
    form: Yup.ArraySchema<Yup.ObjectSchema<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        question: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        type: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        required: import("yup/lib/boolean").RequiredBooleanSchema<boolean | undefined, Record<string, any>>;
    }>, Record<string, any>, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        question: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        type: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        required: import("yup/lib/boolean").RequiredBooleanSchema<boolean | undefined, Record<string, any>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        question: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        type: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        required: import("yup/lib/boolean").RequiredBooleanSchema<boolean | undefined, Record<string, any>>;
    }>>>, Record<string, any>, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        question: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        type: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        required: import("yup/lib/boolean").RequiredBooleanSchema<boolean | undefined, Record<string, any>>;
    }>>[] | undefined, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        question: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        type: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        required: import("yup/lib/boolean").RequiredBooleanSchema<boolean | undefined, Record<string, any>>;
    }>>[] | undefined>;
}>>;

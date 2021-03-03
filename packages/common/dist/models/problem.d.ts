import * as Yup from "yup";
export declare const problemSchema: import("yup/lib/object").OptionalObjectSchema<{
    contestId: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    rank: Yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
    type: Yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
    choices: Yup.ArraySchema<Yup.ObjectSchema<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        name: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        correct: Yup.BooleanSchema<boolean | undefined, Record<string, any>, boolean | undefined>;
    }>, Record<string, any>, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        name: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        correct: Yup.BooleanSchema<boolean | undefined, Record<string, any>, boolean | undefined>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        name: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        correct: Yup.BooleanSchema<boolean | undefined, Record<string, any>, boolean | undefined>;
    }>>>, Record<string, any>, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        name: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        correct: Yup.BooleanSchema<boolean | undefined, Record<string, any>, boolean | undefined>;
    }>>[] | undefined, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        name: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        correct: Yup.BooleanSchema<boolean | undefined, Record<string, any>, boolean | undefined>;
    }>>[] | undefined>;
    points: Yup.NumberSchema<number | undefined, Record<string, any>, number | undefined>;
    question: Yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
}, Record<string, any>, import("yup/lib/object").TypeOfShape<{
    contestId: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    rank: Yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
    type: Yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
    choices: Yup.ArraySchema<Yup.ObjectSchema<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        name: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        correct: Yup.BooleanSchema<boolean | undefined, Record<string, any>, boolean | undefined>;
    }>, Record<string, any>, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        name: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        correct: Yup.BooleanSchema<boolean | undefined, Record<string, any>, boolean | undefined>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        name: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        correct: Yup.BooleanSchema<boolean | undefined, Record<string, any>, boolean | undefined>;
    }>>>, Record<string, any>, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        name: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        correct: Yup.BooleanSchema<boolean | undefined, Record<string, any>, boolean | undefined>;
    }>>[] | undefined, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<Record<string, Yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
        name: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
        correct: Yup.BooleanSchema<boolean | undefined, Record<string, any>, boolean | undefined>;
    }>>[] | undefined>;
    points: Yup.NumberSchema<number | undefined, Record<string, any>, number | undefined>;
    question: Yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
}>>;

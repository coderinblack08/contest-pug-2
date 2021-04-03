import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  findContests: PaginatedContest;
  getContest: Contest;
  findProblems: Array<Problem>;
  hello: Scalars['String'];
  me?: Maybe<User>;
};


export type QueryFindContestsArgs = {
  args: PaginationArgs;
};


export type QueryGetContestArgs = {
  id: Scalars['String'];
};


export type QueryFindProblemsArgs = {
  contestId: Scalars['String'];
};

export type PaginatedContest = {
  __typename?: 'PaginatedContest';
  contests: Array<Contest>;
  hasMore: Scalars['Boolean'];
};

export type Contest = {
  __typename?: 'Contest';
  id: Scalars['String'];
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  competitors: Scalars['Int'];
  start?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
  creatorId: Scalars['String'];
  creator: User;
  problems: Array<Problem>;
  isCreator?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  profilePicture: Scalars['String'];
  username: Scalars['String'];
  displayName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
};


export type Problem = {
  __typename?: 'Problem';
  id: Scalars['Float'];
  contestId: Scalars['String'];
  rank: Scalars['String'];
  type: Scalars['String'];
  question: Scalars['String'];
  points: Scalars['Float'];
  penalty: Scalars['Float'];
};

export type PaginationArgs = {
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createContest: Contest;
  createProblem: Problem;
  updateProblem: Problem;
};


export type MutationCreateContestArgs = {
  args: ContestArgs;
};


export type MutationCreateProblemArgs = {
  args: ProblemArgs;
};


export type MutationUpdateProblemArgs = {
  args: ProblemUpdateArgs;
  id: Scalars['Int'];
};

export type ContestArgs = {
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  start?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
};

export type ProblemArgs = {
  contestId: Scalars['String'];
  rank?: Maybe<Scalars['String']>;
  question: Scalars['String'];
  type: Scalars['String'];
  points?: Maybe<Scalars['Int']>;
  penalty?: Maybe<Scalars['Int']>;
};

export type ProblemUpdateArgs = {
  rank?: Maybe<Scalars['String']>;
  question?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  points?: Maybe<Scalars['Int']>;
  penalty?: Maybe<Scalars['Int']>;
};

export type ContestFragmentFragment = (
  { __typename?: 'Contest' }
  & Pick<Contest, 'id' | 'name' | 'email' | 'website' | 'description' | 'competitors' | 'createdAt' | 'start' | 'end'>
);

export type ProblemFragmentFragment = (
  { __typename?: 'Problem' }
  & Pick<Problem, 'id' | 'contestId' | 'rank' | 'type' | 'question' | 'points' | 'penalty'>
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'profilePicture' | 'displayName'>
);

export type CreateContestMutationVariables = Exact<{
  args: ContestArgs;
}>;


export type CreateContestMutation = (
  { __typename?: 'Mutation' }
  & { createContest: (
    { __typename?: 'Contest' }
    & ContestFragmentFragment
  ) }
);

export type CreateProblemMutationVariables = Exact<{
  args: ProblemArgs;
}>;


export type CreateProblemMutation = (
  { __typename?: 'Mutation' }
  & { createProblem: (
    { __typename?: 'Problem' }
    & ProblemFragmentFragment
  ) }
);

export type UpdateProblemMutationVariables = Exact<{
  args: ProblemUpdateArgs;
  id: Scalars['Int'];
}>;


export type UpdateProblemMutation = (
  { __typename?: 'Mutation' }
  & { updateProblem: (
    { __typename?: 'Problem' }
    & ProblemFragmentFragment
  ) }
);

export type GetContestQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetContestQuery = (
  { __typename?: 'Query' }
  & { getContest: (
    { __typename?: 'Contest' }
    & Pick<Contest, 'isCreator'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'profilePicture' | 'displayName'>
    ) }
    & ContestFragmentFragment
  ) }
);

export type FindContestsQueryVariables = Exact<{
  args: PaginationArgs;
}>;


export type FindContestsQuery = (
  { __typename?: 'Query' }
  & { findContests: (
    { __typename?: 'PaginatedContest' }
    & Pick<PaginatedContest, 'hasMore'>
    & { contests: Array<(
      { __typename?: 'Contest' }
      & ContestFragmentFragment
    )> }
  ) }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export type FindProblemsQueryVariables = Exact<{
  contestId: Scalars['String'];
}>;


export type FindProblemsQuery = (
  { __typename?: 'Query' }
  & { findProblems: Array<(
    { __typename?: 'Problem' }
    & ProblemFragmentFragment
  )> }
);

export const ContestFragmentFragmentDoc = gql`
    fragment ContestFragment on Contest {
  id
  name
  email
  website
  description
  competitors
  createdAt
  start
  end
}
    `;
export const ProblemFragmentFragmentDoc = gql`
    fragment ProblemFragment on Problem {
  id
  contestId
  rank
  type
  question
  points
  penalty
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  username
  profilePicture
  displayName
}
    `;
export const CreateContestDocument = gql`
    mutation CreateContest($args: ContestArgs!) {
  createContest(args: $args) {
    ...ContestFragment
  }
}
    ${ContestFragmentFragmentDoc}`;
export type CreateContestMutationFn = Apollo.MutationFunction<CreateContestMutation, CreateContestMutationVariables>;

/**
 * __useCreateContestMutation__
 *
 * To run a mutation, you first call `useCreateContestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContestMutation, { data, loading, error }] = useCreateContestMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useCreateContestMutation(baseOptions?: Apollo.MutationHookOptions<CreateContestMutation, CreateContestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContestMutation, CreateContestMutationVariables>(CreateContestDocument, options);
      }
export type CreateContestMutationHookResult = ReturnType<typeof useCreateContestMutation>;
export type CreateContestMutationResult = Apollo.MutationResult<CreateContestMutation>;
export type CreateContestMutationOptions = Apollo.BaseMutationOptions<CreateContestMutation, CreateContestMutationVariables>;
export const CreateProblemDocument = gql`
    mutation CreateProblem($args: ProblemArgs!) {
  createProblem(args: $args) {
    ...ProblemFragment
  }
}
    ${ProblemFragmentFragmentDoc}`;
export type CreateProblemMutationFn = Apollo.MutationFunction<CreateProblemMutation, CreateProblemMutationVariables>;

/**
 * __useCreateProblemMutation__
 *
 * To run a mutation, you first call `useCreateProblemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProblemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProblemMutation, { data, loading, error }] = useCreateProblemMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useCreateProblemMutation(baseOptions?: Apollo.MutationHookOptions<CreateProblemMutation, CreateProblemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProblemMutation, CreateProblemMutationVariables>(CreateProblemDocument, options);
      }
export type CreateProblemMutationHookResult = ReturnType<typeof useCreateProblemMutation>;
export type CreateProblemMutationResult = Apollo.MutationResult<CreateProblemMutation>;
export type CreateProblemMutationOptions = Apollo.BaseMutationOptions<CreateProblemMutation, CreateProblemMutationVariables>;
export const UpdateProblemDocument = gql`
    mutation UpdateProblem($args: ProblemUpdateArgs!, $id: Int!) {
  updateProblem(args: $args, id: $id) {
    ...ProblemFragment
  }
}
    ${ProblemFragmentFragmentDoc}`;
export type UpdateProblemMutationFn = Apollo.MutationFunction<UpdateProblemMutation, UpdateProblemMutationVariables>;

/**
 * __useUpdateProblemMutation__
 *
 * To run a mutation, you first call `useUpdateProblemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProblemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProblemMutation, { data, loading, error }] = useUpdateProblemMutation({
 *   variables: {
 *      args: // value for 'args'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateProblemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProblemMutation, UpdateProblemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProblemMutation, UpdateProblemMutationVariables>(UpdateProblemDocument, options);
      }
export type UpdateProblemMutationHookResult = ReturnType<typeof useUpdateProblemMutation>;
export type UpdateProblemMutationResult = Apollo.MutationResult<UpdateProblemMutation>;
export type UpdateProblemMutationOptions = Apollo.BaseMutationOptions<UpdateProblemMutation, UpdateProblemMutationVariables>;
export const GetContestDocument = gql`
    query GetContest($id: String!) {
  getContest(id: $id) {
    ...ContestFragment
    isCreator
    creator {
      id
      username
      profilePicture
      displayName
    }
  }
}
    ${ContestFragmentFragmentDoc}`;

/**
 * __useGetContestQuery__
 *
 * To run a query within a React component, call `useGetContestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContestQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetContestQuery(baseOptions: Apollo.QueryHookOptions<GetContestQuery, GetContestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContestQuery, GetContestQueryVariables>(GetContestDocument, options);
      }
export function useGetContestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContestQuery, GetContestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContestQuery, GetContestQueryVariables>(GetContestDocument, options);
        }
export type GetContestQueryHookResult = ReturnType<typeof useGetContestQuery>;
export type GetContestLazyQueryHookResult = ReturnType<typeof useGetContestLazyQuery>;
export type GetContestQueryResult = Apollo.QueryResult<GetContestQuery, GetContestQueryVariables>;
export const FindContestsDocument = gql`
    query FindContests($args: PaginationArgs!) {
  findContests(args: $args) {
    contests {
      ...ContestFragment
    }
    hasMore
  }
}
    ${ContestFragmentFragmentDoc}`;

/**
 * __useFindContestsQuery__
 *
 * To run a query within a React component, call `useFindContestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindContestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindContestsQuery({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useFindContestsQuery(baseOptions: Apollo.QueryHookOptions<FindContestsQuery, FindContestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindContestsQuery, FindContestsQueryVariables>(FindContestsDocument, options);
      }
export function useFindContestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindContestsQuery, FindContestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindContestsQuery, FindContestsQueryVariables>(FindContestsDocument, options);
        }
export type FindContestsQueryHookResult = ReturnType<typeof useFindContestsQuery>;
export type FindContestsLazyQueryHookResult = ReturnType<typeof useFindContestsLazyQuery>;
export type FindContestsQueryResult = Apollo.QueryResult<FindContestsQuery, FindContestsQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const FindProblemsDocument = gql`
    query FindProblems($contestId: String!) {
  findProblems(contestId: $contestId) {
    ...ProblemFragment
  }
}
    ${ProblemFragmentFragmentDoc}`;

/**
 * __useFindProblemsQuery__
 *
 * To run a query within a React component, call `useFindProblemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProblemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProblemsQuery({
 *   variables: {
 *      contestId: // value for 'contestId'
 *   },
 * });
 */
export function useFindProblemsQuery(baseOptions: Apollo.QueryHookOptions<FindProblemsQuery, FindProblemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProblemsQuery, FindProblemsQueryVariables>(FindProblemsDocument, options);
      }
export function useFindProblemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProblemsQuery, FindProblemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProblemsQuery, FindProblemsQueryVariables>(FindProblemsDocument, options);
        }
export type FindProblemsQueryHookResult = ReturnType<typeof useFindProblemsQuery>;
export type FindProblemsLazyQueryHookResult = ReturnType<typeof useFindProblemsLazyQuery>;
export type FindProblemsQueryResult = Apollo.QueryResult<FindProblemsQuery, FindProblemsQueryVariables>;
export type QueryKeySpecifier = ('findContests' | 'getContest' | 'findProblems' | 'hello' | 'me' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	findContests?: FieldPolicy<any> | FieldReadFunction<any>,
	getContest?: FieldPolicy<any> | FieldReadFunction<any>,
	findProblems?: FieldPolicy<any> | FieldReadFunction<any>,
	hello?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedContestKeySpecifier = ('contests' | 'hasMore' | PaginatedContestKeySpecifier)[];
export type PaginatedContestFieldPolicy = {
	contests?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ContestKeySpecifier = ('id' | 'name' | 'email' | 'website' | 'description' | 'competitors' | 'start' | 'end' | 'creatorId' | 'creator' | 'problems' | 'isCreator' | 'updatedAt' | 'createdAt' | ContestKeySpecifier)[];
export type ContestFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	website?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	competitors?: FieldPolicy<any> | FieldReadFunction<any>,
	start?: FieldPolicy<any> | FieldReadFunction<any>,
	end?: FieldPolicy<any> | FieldReadFunction<any>,
	creatorId?: FieldPolicy<any> | FieldReadFunction<any>,
	creator?: FieldPolicy<any> | FieldReadFunction<any>,
	problems?: FieldPolicy<any> | FieldReadFunction<any>,
	isCreator?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('id' | 'profilePicture' | 'username' | 'displayName' | 'updatedAt' | 'createdAt' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	profilePicture?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	displayName?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProblemKeySpecifier = ('id' | 'contestId' | 'rank' | 'type' | 'question' | 'points' | 'penalty' | ProblemKeySpecifier)[];
export type ProblemFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	contestId?: FieldPolicy<any> | FieldReadFunction<any>,
	rank?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	question?: FieldPolicy<any> | FieldReadFunction<any>,
	points?: FieldPolicy<any> | FieldReadFunction<any>,
	penalty?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createContest' | 'createProblem' | 'updateProblem' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createContest?: FieldPolicy<any> | FieldReadFunction<any>,
	createProblem?: FieldPolicy<any> | FieldReadFunction<any>,
	updateProblem?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	PaginatedContest?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedContestKeySpecifier | (() => undefined | PaginatedContestKeySpecifier),
		fields?: PaginatedContestFieldPolicy,
	},
	Contest?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ContestKeySpecifier | (() => undefined | ContestKeySpecifier),
		fields?: ContestFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	Problem?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProblemKeySpecifier | (() => undefined | ProblemKeySpecifier),
		fields?: ProblemFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	}
};
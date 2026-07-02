
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Stream
 * 
 */
export type Stream = $Result.DefaultSelection<Prisma.$StreamPayload>
/**
 * Model GiftTransaction
 * 
 */
export type GiftTransaction = $Result.DefaultSelection<Prisma.$GiftTransactionPayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model StreamGoal
 * 
 */
export type StreamGoal = $Result.DefaultSelection<Prisma.$StreamGoalPayload>
/**
 * Model PKBattle
 * 
 */
export type PKBattle = $Result.DefaultSelection<Prisma.$PKBattlePayload>
/**
 * Model TreasureChest
 * 
 */
export type TreasureChest = $Result.DefaultSelection<Prisma.$TreasureChestPayload>
/**
 * Model TreasureClaim
 * 
 */
export type TreasureClaim = $Result.DefaultSelection<Prisma.$TreasureClaimPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  VIEWER: 'VIEWER',
  STREAMER: 'STREAMER',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stream`: Exposes CRUD operations for the **Stream** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Streams
    * const streams = await prisma.stream.findMany()
    * ```
    */
  get stream(): Prisma.StreamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.giftTransaction`: Exposes CRUD operations for the **GiftTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GiftTransactions
    * const giftTransactions = await prisma.giftTransaction.findMany()
    * ```
    */
  get giftTransaction(): Prisma.GiftTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.streamGoal`: Exposes CRUD operations for the **StreamGoal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StreamGoals
    * const streamGoals = await prisma.streamGoal.findMany()
    * ```
    */
  get streamGoal(): Prisma.StreamGoalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pKBattle`: Exposes CRUD operations for the **PKBattle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PKBattles
    * const pKBattles = await prisma.pKBattle.findMany()
    * ```
    */
  get pKBattle(): Prisma.PKBattleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.treasureChest`: Exposes CRUD operations for the **TreasureChest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TreasureChests
    * const treasureChests = await prisma.treasureChest.findMany()
    * ```
    */
  get treasureChest(): Prisma.TreasureChestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.treasureClaim`: Exposes CRUD operations for the **TreasureClaim** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TreasureClaims
    * const treasureClaims = await prisma.treasureClaim.findMany()
    * ```
    */
  get treasureClaim(): Prisma.TreasureClaimDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Stream: 'Stream',
    GiftTransaction: 'GiftTransaction',
    Comment: 'Comment',
    Session: 'Session',
    StreamGoal: 'StreamGoal',
    PKBattle: 'PKBattle',
    TreasureChest: 'TreasureChest',
    TreasureClaim: 'TreasureClaim'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "stream" | "giftTransaction" | "comment" | "session" | "streamGoal" | "pKBattle" | "treasureChest" | "treasureClaim"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Stream: {
        payload: Prisma.$StreamPayload<ExtArgs>
        fields: Prisma.StreamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StreamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StreamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          findFirst: {
            args: Prisma.StreamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StreamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          findMany: {
            args: Prisma.StreamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>[]
          }
          create: {
            args: Prisma.StreamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          createMany: {
            args: Prisma.StreamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StreamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>[]
          }
          delete: {
            args: Prisma.StreamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          update: {
            args: Prisma.StreamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          deleteMany: {
            args: Prisma.StreamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StreamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StreamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>[]
          }
          upsert: {
            args: Prisma.StreamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          aggregate: {
            args: Prisma.StreamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStream>
          }
          groupBy: {
            args: Prisma.StreamGroupByArgs<ExtArgs>
            result: $Utils.Optional<StreamGroupByOutputType>[]
          }
          count: {
            args: Prisma.StreamCountArgs<ExtArgs>
            result: $Utils.Optional<StreamCountAggregateOutputType> | number
          }
        }
      }
      GiftTransaction: {
        payload: Prisma.$GiftTransactionPayload<ExtArgs>
        fields: Prisma.GiftTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GiftTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GiftTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftTransactionPayload>
          }
          findFirst: {
            args: Prisma.GiftTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GiftTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftTransactionPayload>
          }
          findMany: {
            args: Prisma.GiftTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftTransactionPayload>[]
          }
          create: {
            args: Prisma.GiftTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftTransactionPayload>
          }
          createMany: {
            args: Prisma.GiftTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GiftTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftTransactionPayload>[]
          }
          delete: {
            args: Prisma.GiftTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftTransactionPayload>
          }
          update: {
            args: Prisma.GiftTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftTransactionPayload>
          }
          deleteMany: {
            args: Prisma.GiftTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GiftTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GiftTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftTransactionPayload>[]
          }
          upsert: {
            args: Prisma.GiftTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftTransactionPayload>
          }
          aggregate: {
            args: Prisma.GiftTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGiftTransaction>
          }
          groupBy: {
            args: Prisma.GiftTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<GiftTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.GiftTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<GiftTransactionCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      StreamGoal: {
        payload: Prisma.$StreamGoalPayload<ExtArgs>
        fields: Prisma.StreamGoalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StreamGoalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamGoalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StreamGoalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamGoalPayload>
          }
          findFirst: {
            args: Prisma.StreamGoalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamGoalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StreamGoalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamGoalPayload>
          }
          findMany: {
            args: Prisma.StreamGoalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamGoalPayload>[]
          }
          create: {
            args: Prisma.StreamGoalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamGoalPayload>
          }
          createMany: {
            args: Prisma.StreamGoalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StreamGoalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamGoalPayload>[]
          }
          delete: {
            args: Prisma.StreamGoalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamGoalPayload>
          }
          update: {
            args: Prisma.StreamGoalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamGoalPayload>
          }
          deleteMany: {
            args: Prisma.StreamGoalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StreamGoalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StreamGoalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamGoalPayload>[]
          }
          upsert: {
            args: Prisma.StreamGoalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamGoalPayload>
          }
          aggregate: {
            args: Prisma.StreamGoalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStreamGoal>
          }
          groupBy: {
            args: Prisma.StreamGoalGroupByArgs<ExtArgs>
            result: $Utils.Optional<StreamGoalGroupByOutputType>[]
          }
          count: {
            args: Prisma.StreamGoalCountArgs<ExtArgs>
            result: $Utils.Optional<StreamGoalCountAggregateOutputType> | number
          }
        }
      }
      PKBattle: {
        payload: Prisma.$PKBattlePayload<ExtArgs>
        fields: Prisma.PKBattleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PKBattleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PKBattlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PKBattleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PKBattlePayload>
          }
          findFirst: {
            args: Prisma.PKBattleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PKBattlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PKBattleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PKBattlePayload>
          }
          findMany: {
            args: Prisma.PKBattleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PKBattlePayload>[]
          }
          create: {
            args: Prisma.PKBattleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PKBattlePayload>
          }
          createMany: {
            args: Prisma.PKBattleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PKBattleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PKBattlePayload>[]
          }
          delete: {
            args: Prisma.PKBattleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PKBattlePayload>
          }
          update: {
            args: Prisma.PKBattleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PKBattlePayload>
          }
          deleteMany: {
            args: Prisma.PKBattleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PKBattleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PKBattleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PKBattlePayload>[]
          }
          upsert: {
            args: Prisma.PKBattleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PKBattlePayload>
          }
          aggregate: {
            args: Prisma.PKBattleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePKBattle>
          }
          groupBy: {
            args: Prisma.PKBattleGroupByArgs<ExtArgs>
            result: $Utils.Optional<PKBattleGroupByOutputType>[]
          }
          count: {
            args: Prisma.PKBattleCountArgs<ExtArgs>
            result: $Utils.Optional<PKBattleCountAggregateOutputType> | number
          }
        }
      }
      TreasureChest: {
        payload: Prisma.$TreasureChestPayload<ExtArgs>
        fields: Prisma.TreasureChestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TreasureChestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureChestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TreasureChestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureChestPayload>
          }
          findFirst: {
            args: Prisma.TreasureChestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureChestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TreasureChestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureChestPayload>
          }
          findMany: {
            args: Prisma.TreasureChestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureChestPayload>[]
          }
          create: {
            args: Prisma.TreasureChestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureChestPayload>
          }
          createMany: {
            args: Prisma.TreasureChestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TreasureChestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureChestPayload>[]
          }
          delete: {
            args: Prisma.TreasureChestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureChestPayload>
          }
          update: {
            args: Prisma.TreasureChestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureChestPayload>
          }
          deleteMany: {
            args: Prisma.TreasureChestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TreasureChestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TreasureChestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureChestPayload>[]
          }
          upsert: {
            args: Prisma.TreasureChestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureChestPayload>
          }
          aggregate: {
            args: Prisma.TreasureChestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTreasureChest>
          }
          groupBy: {
            args: Prisma.TreasureChestGroupByArgs<ExtArgs>
            result: $Utils.Optional<TreasureChestGroupByOutputType>[]
          }
          count: {
            args: Prisma.TreasureChestCountArgs<ExtArgs>
            result: $Utils.Optional<TreasureChestCountAggregateOutputType> | number
          }
        }
      }
      TreasureClaim: {
        payload: Prisma.$TreasureClaimPayload<ExtArgs>
        fields: Prisma.TreasureClaimFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TreasureClaimFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureClaimPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TreasureClaimFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureClaimPayload>
          }
          findFirst: {
            args: Prisma.TreasureClaimFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureClaimPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TreasureClaimFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureClaimPayload>
          }
          findMany: {
            args: Prisma.TreasureClaimFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureClaimPayload>[]
          }
          create: {
            args: Prisma.TreasureClaimCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureClaimPayload>
          }
          createMany: {
            args: Prisma.TreasureClaimCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TreasureClaimCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureClaimPayload>[]
          }
          delete: {
            args: Prisma.TreasureClaimDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureClaimPayload>
          }
          update: {
            args: Prisma.TreasureClaimUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureClaimPayload>
          }
          deleteMany: {
            args: Prisma.TreasureClaimDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TreasureClaimUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TreasureClaimUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureClaimPayload>[]
          }
          upsert: {
            args: Prisma.TreasureClaimUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasureClaimPayload>
          }
          aggregate: {
            args: Prisma.TreasureClaimAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTreasureClaim>
          }
          groupBy: {
            args: Prisma.TreasureClaimGroupByArgs<ExtArgs>
            result: $Utils.Optional<TreasureClaimGroupByOutputType>[]
          }
          count: {
            args: Prisma.TreasureClaimCountArgs<ExtArgs>
            result: $Utils.Optional<TreasureClaimCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    stream?: StreamOmit
    giftTransaction?: GiftTransactionOmit
    comment?: CommentOmit
    session?: SessionOmit
    streamGoal?: StreamGoalOmit
    pKBattle?: PKBattleOmit
    treasureChest?: TreasureChestOmit
    treasureClaim?: TreasureClaimOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    streams: number
    sentGifts: number
    receivedGifts: number
    comments: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    streams?: boolean | UserCountOutputTypeCountStreamsArgs
    sentGifts?: boolean | UserCountOutputTypeCountSentGiftsArgs
    receivedGifts?: boolean | UserCountOutputTypeCountReceivedGiftsArgs
    comments?: boolean | UserCountOutputTypeCountCommentsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStreamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StreamWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentGiftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GiftTransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedGiftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GiftTransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type StreamCountOutputType
   */

  export type StreamCountOutputType = {
    goals: number
    pkBattles1: number
    pkBattles2: number
    chests: number
    comments: number
    gifts: number
  }

  export type StreamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goals?: boolean | StreamCountOutputTypeCountGoalsArgs
    pkBattles1?: boolean | StreamCountOutputTypeCountPkBattles1Args
    pkBattles2?: boolean | StreamCountOutputTypeCountPkBattles2Args
    chests?: boolean | StreamCountOutputTypeCountChestsArgs
    comments?: boolean | StreamCountOutputTypeCountCommentsArgs
    gifts?: boolean | StreamCountOutputTypeCountGiftsArgs
  }

  // Custom InputTypes
  /**
   * StreamCountOutputType without action
   */
  export type StreamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamCountOutputType
     */
    select?: StreamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StreamCountOutputType without action
   */
  export type StreamCountOutputTypeCountGoalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StreamGoalWhereInput
  }

  /**
   * StreamCountOutputType without action
   */
  export type StreamCountOutputTypeCountPkBattles1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PKBattleWhereInput
  }

  /**
   * StreamCountOutputType without action
   */
  export type StreamCountOutputTypeCountPkBattles2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PKBattleWhereInput
  }

  /**
   * StreamCountOutputType without action
   */
  export type StreamCountOutputTypeCountChestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreasureChestWhereInput
  }

  /**
   * StreamCountOutputType without action
   */
  export type StreamCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * StreamCountOutputType without action
   */
  export type StreamCountOutputTypeCountGiftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GiftTransactionWhereInput
  }


  /**
   * Count Type TreasureChestCountOutputType
   */

  export type TreasureChestCountOutputType = {
    claims: number
  }

  export type TreasureChestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claims?: boolean | TreasureChestCountOutputTypeCountClaimsArgs
  }

  // Custom InputTypes
  /**
   * TreasureChestCountOutputType without action
   */
  export type TreasureChestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureChestCountOutputType
     */
    select?: TreasureChestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TreasureChestCountOutputType without action
   */
  export type TreasureChestCountOutputTypeCountClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreasureClaimWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    starBalance: number | null
    starsGifted: number | null
    starsEarned: number | null
  }

  export type UserSumAggregateOutputType = {
    starBalance: number | null
    starsGifted: number | null
    starsEarned: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    displayName: string | null
    avatarUrl: string | null
    email: string | null
    googleId: string | null
    role: $Enums.UserRole | null
    starBalance: number | null
    starsGifted: number | null
    starsEarned: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    displayName: string | null
    avatarUrl: string | null
    email: string | null
    googleId: string | null
    role: $Enums.UserRole | null
    starBalance: number | null
    starsGifted: number | null
    starsEarned: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    displayName: number
    avatarUrl: number
    email: number
    googleId: number
    role: number
    starBalance: number
    starsGifted: number
    starsEarned: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    starBalance?: true
    starsGifted?: true
    starsEarned?: true
  }

  export type UserSumAggregateInputType = {
    starBalance?: true
    starsGifted?: true
    starsEarned?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    displayName?: true
    avatarUrl?: true
    email?: true
    googleId?: true
    role?: true
    starBalance?: true
    starsGifted?: true
    starsEarned?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    displayName?: true
    avatarUrl?: true
    email?: true
    googleId?: true
    role?: true
    starBalance?: true
    starsGifted?: true
    starsEarned?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    displayName?: true
    avatarUrl?: true
    email?: true
    googleId?: true
    role?: true
    starBalance?: true
    starsGifted?: true
    starsEarned?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    displayName: string
    avatarUrl: string
    email: string | null
    googleId: string | null
    role: $Enums.UserRole
    starBalance: number
    starsGifted: number
    starsEarned: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    email?: boolean
    googleId?: boolean
    role?: boolean
    starBalance?: boolean
    starsGifted?: boolean
    starsEarned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    streams?: boolean | User$streamsArgs<ExtArgs>
    sentGifts?: boolean | User$sentGiftsArgs<ExtArgs>
    receivedGifts?: boolean | User$receivedGiftsArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    email?: boolean
    googleId?: boolean
    role?: boolean
    starBalance?: boolean
    starsGifted?: boolean
    starsEarned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    email?: boolean
    googleId?: boolean
    role?: boolean
    starBalance?: boolean
    starsGifted?: boolean
    starsEarned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    email?: boolean
    googleId?: boolean
    role?: boolean
    starBalance?: boolean
    starsGifted?: boolean
    starsEarned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "displayName" | "avatarUrl" | "email" | "googleId" | "role" | "starBalance" | "starsGifted" | "starsEarned" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    streams?: boolean | User$streamsArgs<ExtArgs>
    sentGifts?: boolean | User$sentGiftsArgs<ExtArgs>
    receivedGifts?: boolean | User$receivedGiftsArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      streams: Prisma.$StreamPayload<ExtArgs>[]
      sentGifts: Prisma.$GiftTransactionPayload<ExtArgs>[]
      receivedGifts: Prisma.$GiftTransactionPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      displayName: string
      avatarUrl: string
      email: string | null
      googleId: string | null
      role: $Enums.UserRole
      starBalance: number
      starsGifted: number
      starsEarned: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    streams<T extends User$streamsArgs<ExtArgs> = {}>(args?: Subset<T, User$streamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentGifts<T extends User$sentGiftsArgs<ExtArgs> = {}>(args?: Subset<T, User$sentGiftsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receivedGifts<T extends User$receivedGiftsArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedGiftsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends User$commentsArgs<ExtArgs> = {}>(args?: Subset<T, User$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly displayName: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly googleId: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly starBalance: FieldRef<"User", 'Int'>
    readonly starsGifted: FieldRef<"User", 'Int'>
    readonly starsEarned: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.streams
   */
  export type User$streamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    where?: StreamWhereInput
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    cursor?: StreamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * User.sentGifts
   */
  export type User$sentGiftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftTransaction
     */
    select?: GiftTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftTransaction
     */
    omit?: GiftTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftTransactionInclude<ExtArgs> | null
    where?: GiftTransactionWhereInput
    orderBy?: GiftTransactionOrderByWithRelationInput | GiftTransactionOrderByWithRelationInput[]
    cursor?: GiftTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GiftTransactionScalarFieldEnum | GiftTransactionScalarFieldEnum[]
  }

  /**
   * User.receivedGifts
   */
  export type User$receivedGiftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftTransaction
     */
    select?: GiftTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftTransaction
     */
    omit?: GiftTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftTransactionInclude<ExtArgs> | null
    where?: GiftTransactionWhereInput
    orderBy?: GiftTransactionOrderByWithRelationInput | GiftTransactionOrderByWithRelationInput[]
    cursor?: GiftTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GiftTransactionScalarFieldEnum | GiftTransactionScalarFieldEnum[]
  }

  /**
   * User.comments
   */
  export type User$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Stream
   */

  export type AggregateStream = {
    _count: StreamCountAggregateOutputType | null
    _avg: StreamAvgAggregateOutputType | null
    _sum: StreamSumAggregateOutputType | null
    _min: StreamMinAggregateOutputType | null
    _max: StreamMaxAggregateOutputType | null
  }

  export type StreamAvgAggregateOutputType = {
    viewerCount: number | null
    totalStars: number | null
  }

  export type StreamSumAggregateOutputType = {
    viewerCount: number | null
    totalStars: number | null
  }

  export type StreamMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    category: string | null
    status: string | null
    viewerCount: number | null
    totalStars: number | null
    streamerId: string | null
    createdAt: Date | null
    endedAt: Date | null
  }

  export type StreamMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    category: string | null
    status: string | null
    viewerCount: number | null
    totalStars: number | null
    streamerId: string | null
    createdAt: Date | null
    endedAt: Date | null
  }

  export type StreamCountAggregateOutputType = {
    id: number
    title: number
    description: number
    category: number
    status: number
    viewerCount: number
    totalStars: number
    streamerId: number
    createdAt: number
    endedAt: number
    _all: number
  }


  export type StreamAvgAggregateInputType = {
    viewerCount?: true
    totalStars?: true
  }

  export type StreamSumAggregateInputType = {
    viewerCount?: true
    totalStars?: true
  }

  export type StreamMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    status?: true
    viewerCount?: true
    totalStars?: true
    streamerId?: true
    createdAt?: true
    endedAt?: true
  }

  export type StreamMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    status?: true
    viewerCount?: true
    totalStars?: true
    streamerId?: true
    createdAt?: true
    endedAt?: true
  }

  export type StreamCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    status?: true
    viewerCount?: true
    totalStars?: true
    streamerId?: true
    createdAt?: true
    endedAt?: true
    _all?: true
  }

  export type StreamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stream to aggregate.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Streams
    **/
    _count?: true | StreamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StreamAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StreamSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StreamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StreamMaxAggregateInputType
  }

  export type GetStreamAggregateType<T extends StreamAggregateArgs> = {
        [P in keyof T & keyof AggregateStream]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStream[P]>
      : GetScalarType<T[P], AggregateStream[P]>
  }




  export type StreamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StreamWhereInput
    orderBy?: StreamOrderByWithAggregationInput | StreamOrderByWithAggregationInput[]
    by: StreamScalarFieldEnum[] | StreamScalarFieldEnum
    having?: StreamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StreamCountAggregateInputType | true
    _avg?: StreamAvgAggregateInputType
    _sum?: StreamSumAggregateInputType
    _min?: StreamMinAggregateInputType
    _max?: StreamMaxAggregateInputType
  }

  export type StreamGroupByOutputType = {
    id: string
    title: string
    description: string | null
    category: string
    status: string
    viewerCount: number
    totalStars: number
    streamerId: string
    createdAt: Date
    endedAt: Date | null
    _count: StreamCountAggregateOutputType | null
    _avg: StreamAvgAggregateOutputType | null
    _sum: StreamSumAggregateOutputType | null
    _min: StreamMinAggregateOutputType | null
    _max: StreamMaxAggregateOutputType | null
  }

  type GetStreamGroupByPayload<T extends StreamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StreamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StreamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StreamGroupByOutputType[P]>
            : GetScalarType<T[P], StreamGroupByOutputType[P]>
        }
      >
    >


  export type StreamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    status?: boolean
    viewerCount?: boolean
    totalStars?: boolean
    streamerId?: boolean
    createdAt?: boolean
    endedAt?: boolean
    streamer?: boolean | UserDefaultArgs<ExtArgs>
    goals?: boolean | Stream$goalsArgs<ExtArgs>
    pkBattles1?: boolean | Stream$pkBattles1Args<ExtArgs>
    pkBattles2?: boolean | Stream$pkBattles2Args<ExtArgs>
    chests?: boolean | Stream$chestsArgs<ExtArgs>
    comments?: boolean | Stream$commentsArgs<ExtArgs>
    gifts?: boolean | Stream$giftsArgs<ExtArgs>
    _count?: boolean | StreamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stream"]>

  export type StreamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    status?: boolean
    viewerCount?: boolean
    totalStars?: boolean
    streamerId?: boolean
    createdAt?: boolean
    endedAt?: boolean
    streamer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stream"]>

  export type StreamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    status?: boolean
    viewerCount?: boolean
    totalStars?: boolean
    streamerId?: boolean
    createdAt?: boolean
    endedAt?: boolean
    streamer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stream"]>

  export type StreamSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    status?: boolean
    viewerCount?: boolean
    totalStars?: boolean
    streamerId?: boolean
    createdAt?: boolean
    endedAt?: boolean
  }

  export type StreamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "category" | "status" | "viewerCount" | "totalStars" | "streamerId" | "createdAt" | "endedAt", ExtArgs["result"]["stream"]>
  export type StreamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    streamer?: boolean | UserDefaultArgs<ExtArgs>
    goals?: boolean | Stream$goalsArgs<ExtArgs>
    pkBattles1?: boolean | Stream$pkBattles1Args<ExtArgs>
    pkBattles2?: boolean | Stream$pkBattles2Args<ExtArgs>
    chests?: boolean | Stream$chestsArgs<ExtArgs>
    comments?: boolean | Stream$commentsArgs<ExtArgs>
    gifts?: boolean | Stream$giftsArgs<ExtArgs>
    _count?: boolean | StreamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StreamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    streamer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StreamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    streamer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StreamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stream"
    objects: {
      streamer: Prisma.$UserPayload<ExtArgs>
      goals: Prisma.$StreamGoalPayload<ExtArgs>[]
      pkBattles1: Prisma.$PKBattlePayload<ExtArgs>[]
      pkBattles2: Prisma.$PKBattlePayload<ExtArgs>[]
      chests: Prisma.$TreasureChestPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      gifts: Prisma.$GiftTransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      category: string
      status: string
      viewerCount: number
      totalStars: number
      streamerId: string
      createdAt: Date
      endedAt: Date | null
    }, ExtArgs["result"]["stream"]>
    composites: {}
  }

  type StreamGetPayload<S extends boolean | null | undefined | StreamDefaultArgs> = $Result.GetResult<Prisma.$StreamPayload, S>

  type StreamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StreamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StreamCountAggregateInputType | true
    }

  export interface StreamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stream'], meta: { name: 'Stream' } }
    /**
     * Find zero or one Stream that matches the filter.
     * @param {StreamFindUniqueArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StreamFindUniqueArgs>(args: SelectSubset<T, StreamFindUniqueArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Stream that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StreamFindUniqueOrThrowArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StreamFindUniqueOrThrowArgs>(args: SelectSubset<T, StreamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stream that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindFirstArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StreamFindFirstArgs>(args?: SelectSubset<T, StreamFindFirstArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stream that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindFirstOrThrowArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StreamFindFirstOrThrowArgs>(args?: SelectSubset<T, StreamFindFirstOrThrowArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Streams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Streams
     * const streams = await prisma.stream.findMany()
     * 
     * // Get first 10 Streams
     * const streams = await prisma.stream.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const streamWithIdOnly = await prisma.stream.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StreamFindManyArgs>(args?: SelectSubset<T, StreamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Stream.
     * @param {StreamCreateArgs} args - Arguments to create a Stream.
     * @example
     * // Create one Stream
     * const Stream = await prisma.stream.create({
     *   data: {
     *     // ... data to create a Stream
     *   }
     * })
     * 
     */
    create<T extends StreamCreateArgs>(args: SelectSubset<T, StreamCreateArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Streams.
     * @param {StreamCreateManyArgs} args - Arguments to create many Streams.
     * @example
     * // Create many Streams
     * const stream = await prisma.stream.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StreamCreateManyArgs>(args?: SelectSubset<T, StreamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Streams and returns the data saved in the database.
     * @param {StreamCreateManyAndReturnArgs} args - Arguments to create many Streams.
     * @example
     * // Create many Streams
     * const stream = await prisma.stream.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Streams and only return the `id`
     * const streamWithIdOnly = await prisma.stream.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StreamCreateManyAndReturnArgs>(args?: SelectSubset<T, StreamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Stream.
     * @param {StreamDeleteArgs} args - Arguments to delete one Stream.
     * @example
     * // Delete one Stream
     * const Stream = await prisma.stream.delete({
     *   where: {
     *     // ... filter to delete one Stream
     *   }
     * })
     * 
     */
    delete<T extends StreamDeleteArgs>(args: SelectSubset<T, StreamDeleteArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Stream.
     * @param {StreamUpdateArgs} args - Arguments to update one Stream.
     * @example
     * // Update one Stream
     * const stream = await prisma.stream.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StreamUpdateArgs>(args: SelectSubset<T, StreamUpdateArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Streams.
     * @param {StreamDeleteManyArgs} args - Arguments to filter Streams to delete.
     * @example
     * // Delete a few Streams
     * const { count } = await prisma.stream.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StreamDeleteManyArgs>(args?: SelectSubset<T, StreamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Streams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Streams
     * const stream = await prisma.stream.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StreamUpdateManyArgs>(args: SelectSubset<T, StreamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Streams and returns the data updated in the database.
     * @param {StreamUpdateManyAndReturnArgs} args - Arguments to update many Streams.
     * @example
     * // Update many Streams
     * const stream = await prisma.stream.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Streams and only return the `id`
     * const streamWithIdOnly = await prisma.stream.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StreamUpdateManyAndReturnArgs>(args: SelectSubset<T, StreamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Stream.
     * @param {StreamUpsertArgs} args - Arguments to update or create a Stream.
     * @example
     * // Update or create a Stream
     * const stream = await prisma.stream.upsert({
     *   create: {
     *     // ... data to create a Stream
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stream we want to update
     *   }
     * })
     */
    upsert<T extends StreamUpsertArgs>(args: SelectSubset<T, StreamUpsertArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Streams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamCountArgs} args - Arguments to filter Streams to count.
     * @example
     * // Count the number of Streams
     * const count = await prisma.stream.count({
     *   where: {
     *     // ... the filter for the Streams we want to count
     *   }
     * })
    **/
    count<T extends StreamCountArgs>(
      args?: Subset<T, StreamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StreamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stream.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StreamAggregateArgs>(args: Subset<T, StreamAggregateArgs>): Prisma.PrismaPromise<GetStreamAggregateType<T>>

    /**
     * Group by Stream.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StreamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StreamGroupByArgs['orderBy'] }
        : { orderBy?: StreamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StreamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStreamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stream model
   */
  readonly fields: StreamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stream.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StreamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    streamer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    goals<T extends Stream$goalsArgs<ExtArgs> = {}>(args?: Subset<T, Stream$goalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamGoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pkBattles1<T extends Stream$pkBattles1Args<ExtArgs> = {}>(args?: Subset<T, Stream$pkBattles1Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PKBattlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pkBattles2<T extends Stream$pkBattles2Args<ExtArgs> = {}>(args?: Subset<T, Stream$pkBattles2Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PKBattlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    chests<T extends Stream$chestsArgs<ExtArgs> = {}>(args?: Subset<T, Stream$chestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreasureChestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends Stream$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Stream$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    gifts<T extends Stream$giftsArgs<ExtArgs> = {}>(args?: Subset<T, Stream$giftsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Stream model
   */
  interface StreamFieldRefs {
    readonly id: FieldRef<"Stream", 'String'>
    readonly title: FieldRef<"Stream", 'String'>
    readonly description: FieldRef<"Stream", 'String'>
    readonly category: FieldRef<"Stream", 'String'>
    readonly status: FieldRef<"Stream", 'String'>
    readonly viewerCount: FieldRef<"Stream", 'Int'>
    readonly totalStars: FieldRef<"Stream", 'Int'>
    readonly streamerId: FieldRef<"Stream", 'String'>
    readonly createdAt: FieldRef<"Stream", 'DateTime'>
    readonly endedAt: FieldRef<"Stream", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Stream findUnique
   */
  export type StreamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream findUniqueOrThrow
   */
  export type StreamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream findFirst
   */
  export type StreamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Streams.
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Streams.
     */
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Stream findFirstOrThrow
   */
  export type StreamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Streams.
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Streams.
     */
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Stream findMany
   */
  export type StreamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Streams to fetch.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Streams.
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Streams.
     */
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Stream create
   */
  export type StreamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * The data needed to create a Stream.
     */
    data: XOR<StreamCreateInput, StreamUncheckedCreateInput>
  }

  /**
   * Stream createMany
   */
  export type StreamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Streams.
     */
    data: StreamCreateManyInput | StreamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stream createManyAndReturn
   */
  export type StreamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * The data used to create many Streams.
     */
    data: StreamCreateManyInput | StreamCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stream update
   */
  export type StreamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * The data needed to update a Stream.
     */
    data: XOR<StreamUpdateInput, StreamUncheckedUpdateInput>
    /**
     * Choose, which Stream to update.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream updateMany
   */
  export type StreamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Streams.
     */
    data: XOR<StreamUpdateManyMutationInput, StreamUncheckedUpdateManyInput>
    /**
     * Filter which Streams to update
     */
    where?: StreamWhereInput
    /**
     * Limit how many Streams to update.
     */
    limit?: number
  }

  /**
   * Stream updateManyAndReturn
   */
  export type StreamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * The data used to update Streams.
     */
    data: XOR<StreamUpdateManyMutationInput, StreamUncheckedUpdateManyInput>
    /**
     * Filter which Streams to update
     */
    where?: StreamWhereInput
    /**
     * Limit how many Streams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stream upsert
   */
  export type StreamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * The filter to search for the Stream to update in case it exists.
     */
    where: StreamWhereUniqueInput
    /**
     * In case the Stream found by the `where` argument doesn't exist, create a new Stream with this data.
     */
    create: XOR<StreamCreateInput, StreamUncheckedCreateInput>
    /**
     * In case the Stream was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StreamUpdateInput, StreamUncheckedUpdateInput>
  }

  /**
   * Stream delete
   */
  export type StreamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter which Stream to delete.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream deleteMany
   */
  export type StreamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Streams to delete
     */
    where?: StreamWhereInput
    /**
     * Limit how many Streams to delete.
     */
    limit?: number
  }

  /**
   * Stream.goals
   */
  export type Stream$goalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamGoal
     */
    select?: StreamGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamGoal
     */
    omit?: StreamGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamGoalInclude<ExtArgs> | null
    where?: StreamGoalWhereInput
    orderBy?: StreamGoalOrderByWithRelationInput | StreamGoalOrderByWithRelationInput[]
    cursor?: StreamGoalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StreamGoalScalarFieldEnum | StreamGoalScalarFieldEnum[]
  }

  /**
   * Stream.pkBattles1
   */
  export type Stream$pkBattles1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PKBattle
     */
    select?: PKBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PKBattle
     */
    omit?: PKBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PKBattleInclude<ExtArgs> | null
    where?: PKBattleWhereInput
    orderBy?: PKBattleOrderByWithRelationInput | PKBattleOrderByWithRelationInput[]
    cursor?: PKBattleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PKBattleScalarFieldEnum | PKBattleScalarFieldEnum[]
  }

  /**
   * Stream.pkBattles2
   */
  export type Stream$pkBattles2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PKBattle
     */
    select?: PKBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PKBattle
     */
    omit?: PKBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PKBattleInclude<ExtArgs> | null
    where?: PKBattleWhereInput
    orderBy?: PKBattleOrderByWithRelationInput | PKBattleOrderByWithRelationInput[]
    cursor?: PKBattleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PKBattleScalarFieldEnum | PKBattleScalarFieldEnum[]
  }

  /**
   * Stream.chests
   */
  export type Stream$chestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureChest
     */
    select?: TreasureChestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureChest
     */
    omit?: TreasureChestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureChestInclude<ExtArgs> | null
    where?: TreasureChestWhereInput
    orderBy?: TreasureChestOrderByWithRelationInput | TreasureChestOrderByWithRelationInput[]
    cursor?: TreasureChestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TreasureChestScalarFieldEnum | TreasureChestScalarFieldEnum[]
  }

  /**
   * Stream.comments
   */
  export type Stream$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Stream.gifts
   */
  export type Stream$giftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftTransaction
     */
    select?: GiftTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftTransaction
     */
    omit?: GiftTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftTransactionInclude<ExtArgs> | null
    where?: GiftTransactionWhereInput
    orderBy?: GiftTransactionOrderByWithRelationInput | GiftTransactionOrderByWithRelationInput[]
    cursor?: GiftTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GiftTransactionScalarFieldEnum | GiftTransactionScalarFieldEnum[]
  }

  /**
   * Stream without action
   */
  export type StreamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
  }


  /**
   * Model GiftTransaction
   */

  export type AggregateGiftTransaction = {
    _count: GiftTransactionCountAggregateOutputType | null
    _avg: GiftTransactionAvgAggregateOutputType | null
    _sum: GiftTransactionSumAggregateOutputType | null
    _min: GiftTransactionMinAggregateOutputType | null
    _max: GiftTransactionMaxAggregateOutputType | null
  }

  export type GiftTransactionAvgAggregateOutputType = {
    starAmount: number | null
  }

  export type GiftTransactionSumAggregateOutputType = {
    starAmount: number | null
  }

  export type GiftTransactionMinAggregateOutputType = {
    id: string | null
    streamId: string | null
    senderId: string | null
    receiverId: string | null
    starAmount: number | null
    message: string | null
    createdAt: Date | null
  }

  export type GiftTransactionMaxAggregateOutputType = {
    id: string | null
    streamId: string | null
    senderId: string | null
    receiverId: string | null
    starAmount: number | null
    message: string | null
    createdAt: Date | null
  }

  export type GiftTransactionCountAggregateOutputType = {
    id: number
    streamId: number
    senderId: number
    receiverId: number
    starAmount: number
    message: number
    createdAt: number
    _all: number
  }


  export type GiftTransactionAvgAggregateInputType = {
    starAmount?: true
  }

  export type GiftTransactionSumAggregateInputType = {
    starAmount?: true
  }

  export type GiftTransactionMinAggregateInputType = {
    id?: true
    streamId?: true
    senderId?: true
    receiverId?: true
    starAmount?: true
    message?: true
    createdAt?: true
  }

  export type GiftTransactionMaxAggregateInputType = {
    id?: true
    streamId?: true
    senderId?: true
    receiverId?: true
    starAmount?: true
    message?: true
    createdAt?: true
  }

  export type GiftTransactionCountAggregateInputType = {
    id?: true
    streamId?: true
    senderId?: true
    receiverId?: true
    starAmount?: true
    message?: true
    createdAt?: true
    _all?: true
  }

  export type GiftTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GiftTransaction to aggregate.
     */
    where?: GiftTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GiftTransactions to fetch.
     */
    orderBy?: GiftTransactionOrderByWithRelationInput | GiftTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GiftTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GiftTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GiftTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GiftTransactions
    **/
    _count?: true | GiftTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GiftTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GiftTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GiftTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GiftTransactionMaxAggregateInputType
  }

  export type GetGiftTransactionAggregateType<T extends GiftTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateGiftTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGiftTransaction[P]>
      : GetScalarType<T[P], AggregateGiftTransaction[P]>
  }




  export type GiftTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GiftTransactionWhereInput
    orderBy?: GiftTransactionOrderByWithAggregationInput | GiftTransactionOrderByWithAggregationInput[]
    by: GiftTransactionScalarFieldEnum[] | GiftTransactionScalarFieldEnum
    having?: GiftTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GiftTransactionCountAggregateInputType | true
    _avg?: GiftTransactionAvgAggregateInputType
    _sum?: GiftTransactionSumAggregateInputType
    _min?: GiftTransactionMinAggregateInputType
    _max?: GiftTransactionMaxAggregateInputType
  }

  export type GiftTransactionGroupByOutputType = {
    id: string
    streamId: string
    senderId: string
    receiverId: string
    starAmount: number
    message: string | null
    createdAt: Date
    _count: GiftTransactionCountAggregateOutputType | null
    _avg: GiftTransactionAvgAggregateOutputType | null
    _sum: GiftTransactionSumAggregateOutputType | null
    _min: GiftTransactionMinAggregateOutputType | null
    _max: GiftTransactionMaxAggregateOutputType | null
  }

  type GetGiftTransactionGroupByPayload<T extends GiftTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GiftTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GiftTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GiftTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], GiftTransactionGroupByOutputType[P]>
        }
      >
    >


  export type GiftTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streamId?: boolean
    senderId?: boolean
    receiverId?: boolean
    starAmount?: boolean
    message?: boolean
    createdAt?: boolean
    stream?: boolean | StreamDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["giftTransaction"]>

  export type GiftTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streamId?: boolean
    senderId?: boolean
    receiverId?: boolean
    starAmount?: boolean
    message?: boolean
    createdAt?: boolean
    stream?: boolean | StreamDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["giftTransaction"]>

  export type GiftTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streamId?: boolean
    senderId?: boolean
    receiverId?: boolean
    starAmount?: boolean
    message?: boolean
    createdAt?: boolean
    stream?: boolean | StreamDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["giftTransaction"]>

  export type GiftTransactionSelectScalar = {
    id?: boolean
    streamId?: boolean
    senderId?: boolean
    receiverId?: boolean
    starAmount?: boolean
    message?: boolean
    createdAt?: boolean
  }

  export type GiftTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "streamId" | "senderId" | "receiverId" | "starAmount" | "message" | "createdAt", ExtArgs["result"]["giftTransaction"]>
  export type GiftTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream?: boolean | StreamDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GiftTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream?: boolean | StreamDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GiftTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream?: boolean | StreamDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GiftTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GiftTransaction"
    objects: {
      stream: Prisma.$StreamPayload<ExtArgs>
      sender: Prisma.$UserPayload<ExtArgs>
      receiver: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      streamId: string
      senderId: string
      receiverId: string
      starAmount: number
      message: string | null
      createdAt: Date
    }, ExtArgs["result"]["giftTransaction"]>
    composites: {}
  }

  type GiftTransactionGetPayload<S extends boolean | null | undefined | GiftTransactionDefaultArgs> = $Result.GetResult<Prisma.$GiftTransactionPayload, S>

  type GiftTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GiftTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GiftTransactionCountAggregateInputType | true
    }

  export interface GiftTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GiftTransaction'], meta: { name: 'GiftTransaction' } }
    /**
     * Find zero or one GiftTransaction that matches the filter.
     * @param {GiftTransactionFindUniqueArgs} args - Arguments to find a GiftTransaction
     * @example
     * // Get one GiftTransaction
     * const giftTransaction = await prisma.giftTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GiftTransactionFindUniqueArgs>(args: SelectSubset<T, GiftTransactionFindUniqueArgs<ExtArgs>>): Prisma__GiftTransactionClient<$Result.GetResult<Prisma.$GiftTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GiftTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GiftTransactionFindUniqueOrThrowArgs} args - Arguments to find a GiftTransaction
     * @example
     * // Get one GiftTransaction
     * const giftTransaction = await prisma.giftTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GiftTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, GiftTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GiftTransactionClient<$Result.GetResult<Prisma.$GiftTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GiftTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftTransactionFindFirstArgs} args - Arguments to find a GiftTransaction
     * @example
     * // Get one GiftTransaction
     * const giftTransaction = await prisma.giftTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GiftTransactionFindFirstArgs>(args?: SelectSubset<T, GiftTransactionFindFirstArgs<ExtArgs>>): Prisma__GiftTransactionClient<$Result.GetResult<Prisma.$GiftTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GiftTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftTransactionFindFirstOrThrowArgs} args - Arguments to find a GiftTransaction
     * @example
     * // Get one GiftTransaction
     * const giftTransaction = await prisma.giftTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GiftTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, GiftTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__GiftTransactionClient<$Result.GetResult<Prisma.$GiftTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GiftTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GiftTransactions
     * const giftTransactions = await prisma.giftTransaction.findMany()
     * 
     * // Get first 10 GiftTransactions
     * const giftTransactions = await prisma.giftTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const giftTransactionWithIdOnly = await prisma.giftTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GiftTransactionFindManyArgs>(args?: SelectSubset<T, GiftTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GiftTransaction.
     * @param {GiftTransactionCreateArgs} args - Arguments to create a GiftTransaction.
     * @example
     * // Create one GiftTransaction
     * const GiftTransaction = await prisma.giftTransaction.create({
     *   data: {
     *     // ... data to create a GiftTransaction
     *   }
     * })
     * 
     */
    create<T extends GiftTransactionCreateArgs>(args: SelectSubset<T, GiftTransactionCreateArgs<ExtArgs>>): Prisma__GiftTransactionClient<$Result.GetResult<Prisma.$GiftTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GiftTransactions.
     * @param {GiftTransactionCreateManyArgs} args - Arguments to create many GiftTransactions.
     * @example
     * // Create many GiftTransactions
     * const giftTransaction = await prisma.giftTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GiftTransactionCreateManyArgs>(args?: SelectSubset<T, GiftTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GiftTransactions and returns the data saved in the database.
     * @param {GiftTransactionCreateManyAndReturnArgs} args - Arguments to create many GiftTransactions.
     * @example
     * // Create many GiftTransactions
     * const giftTransaction = await prisma.giftTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GiftTransactions and only return the `id`
     * const giftTransactionWithIdOnly = await prisma.giftTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GiftTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, GiftTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GiftTransaction.
     * @param {GiftTransactionDeleteArgs} args - Arguments to delete one GiftTransaction.
     * @example
     * // Delete one GiftTransaction
     * const GiftTransaction = await prisma.giftTransaction.delete({
     *   where: {
     *     // ... filter to delete one GiftTransaction
     *   }
     * })
     * 
     */
    delete<T extends GiftTransactionDeleteArgs>(args: SelectSubset<T, GiftTransactionDeleteArgs<ExtArgs>>): Prisma__GiftTransactionClient<$Result.GetResult<Prisma.$GiftTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GiftTransaction.
     * @param {GiftTransactionUpdateArgs} args - Arguments to update one GiftTransaction.
     * @example
     * // Update one GiftTransaction
     * const giftTransaction = await prisma.giftTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GiftTransactionUpdateArgs>(args: SelectSubset<T, GiftTransactionUpdateArgs<ExtArgs>>): Prisma__GiftTransactionClient<$Result.GetResult<Prisma.$GiftTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GiftTransactions.
     * @param {GiftTransactionDeleteManyArgs} args - Arguments to filter GiftTransactions to delete.
     * @example
     * // Delete a few GiftTransactions
     * const { count } = await prisma.giftTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GiftTransactionDeleteManyArgs>(args?: SelectSubset<T, GiftTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GiftTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GiftTransactions
     * const giftTransaction = await prisma.giftTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GiftTransactionUpdateManyArgs>(args: SelectSubset<T, GiftTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GiftTransactions and returns the data updated in the database.
     * @param {GiftTransactionUpdateManyAndReturnArgs} args - Arguments to update many GiftTransactions.
     * @example
     * // Update many GiftTransactions
     * const giftTransaction = await prisma.giftTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GiftTransactions and only return the `id`
     * const giftTransactionWithIdOnly = await prisma.giftTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GiftTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, GiftTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GiftTransaction.
     * @param {GiftTransactionUpsertArgs} args - Arguments to update or create a GiftTransaction.
     * @example
     * // Update or create a GiftTransaction
     * const giftTransaction = await prisma.giftTransaction.upsert({
     *   create: {
     *     // ... data to create a GiftTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GiftTransaction we want to update
     *   }
     * })
     */
    upsert<T extends GiftTransactionUpsertArgs>(args: SelectSubset<T, GiftTransactionUpsertArgs<ExtArgs>>): Prisma__GiftTransactionClient<$Result.GetResult<Prisma.$GiftTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GiftTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftTransactionCountArgs} args - Arguments to filter GiftTransactions to count.
     * @example
     * // Count the number of GiftTransactions
     * const count = await prisma.giftTransaction.count({
     *   where: {
     *     // ... the filter for the GiftTransactions we want to count
     *   }
     * })
    **/
    count<T extends GiftTransactionCountArgs>(
      args?: Subset<T, GiftTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GiftTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GiftTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GiftTransactionAggregateArgs>(args: Subset<T, GiftTransactionAggregateArgs>): Prisma.PrismaPromise<GetGiftTransactionAggregateType<T>>

    /**
     * Group by GiftTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GiftTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GiftTransactionGroupByArgs['orderBy'] }
        : { orderBy?: GiftTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GiftTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGiftTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GiftTransaction model
   */
  readonly fields: GiftTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GiftTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GiftTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stream<T extends StreamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StreamDefaultArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    receiver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GiftTransaction model
   */
  interface GiftTransactionFieldRefs {
    readonly id: FieldRef<"GiftTransaction", 'String'>
    readonly streamId: FieldRef<"GiftTransaction", 'String'>
    readonly senderId: FieldRef<"GiftTransaction", 'String'>
    readonly receiverId: FieldRef<"GiftTransaction", 'String'>
    readonly starAmount: FieldRef<"GiftTransaction", 'Int'>
    readonly message: FieldRef<"GiftTransaction", 'String'>
    readonly createdAt: FieldRef<"GiftTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GiftTransaction findUnique
   */
  export type GiftTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftTransaction
     */
    select?: GiftTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftTransaction
     */
    omit?: GiftTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftTransactionInclude<ExtArgs> | null
    /**
     * Filter, which GiftTransaction to fetch.
     */
    where: GiftTransactionWhereUniqueInput
  }

  /**
   * GiftTransaction findUniqueOrThrow
   */
  export type GiftTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftTransaction
     */
    select?: GiftTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftTransaction
     */
    omit?: GiftTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftTransactionInclude<ExtArgs> | null
    /**
     * Filter, which GiftTransaction to fetch.
     */
    where: GiftTransactionWhereUniqueInput
  }

  /**
   * GiftTransaction findFirst
   */
  export type GiftTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftTransaction
     */
    select?: GiftTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftTransaction
     */
    omit?: GiftTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftTransactionInclude<ExtArgs> | null
    /**
     * Filter, which GiftTransaction to fetch.
     */
    where?: GiftTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GiftTransactions to fetch.
     */
    orderBy?: GiftTransactionOrderByWithRelationInput | GiftTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GiftTransactions.
     */
    cursor?: GiftTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GiftTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GiftTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GiftTransactions.
     */
    distinct?: GiftTransactionScalarFieldEnum | GiftTransactionScalarFieldEnum[]
  }

  /**
   * GiftTransaction findFirstOrThrow
   */
  export type GiftTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftTransaction
     */
    select?: GiftTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftTransaction
     */
    omit?: GiftTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftTransactionInclude<ExtArgs> | null
    /**
     * Filter, which GiftTransaction to fetch.
     */
    where?: GiftTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GiftTransactions to fetch.
     */
    orderBy?: GiftTransactionOrderByWithRelationInput | GiftTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GiftTransactions.
     */
    cursor?: GiftTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GiftTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GiftTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GiftTransactions.
     */
    distinct?: GiftTransactionScalarFieldEnum | GiftTransactionScalarFieldEnum[]
  }

  /**
   * GiftTransaction findMany
   */
  export type GiftTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftTransaction
     */
    select?: GiftTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftTransaction
     */
    omit?: GiftTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftTransactionInclude<ExtArgs> | null
    /**
     * Filter, which GiftTransactions to fetch.
     */
    where?: GiftTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GiftTransactions to fetch.
     */
    orderBy?: GiftTransactionOrderByWithRelationInput | GiftTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GiftTransactions.
     */
    cursor?: GiftTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GiftTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GiftTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GiftTransactions.
     */
    distinct?: GiftTransactionScalarFieldEnum | GiftTransactionScalarFieldEnum[]
  }

  /**
   * GiftTransaction create
   */
  export type GiftTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftTransaction
     */
    select?: GiftTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftTransaction
     */
    omit?: GiftTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a GiftTransaction.
     */
    data: XOR<GiftTransactionCreateInput, GiftTransactionUncheckedCreateInput>
  }

  /**
   * GiftTransaction createMany
   */
  export type GiftTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GiftTransactions.
     */
    data: GiftTransactionCreateManyInput | GiftTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GiftTransaction createManyAndReturn
   */
  export type GiftTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftTransaction
     */
    select?: GiftTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GiftTransaction
     */
    omit?: GiftTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many GiftTransactions.
     */
    data: GiftTransactionCreateManyInput | GiftTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GiftTransaction update
   */
  export type GiftTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftTransaction
     */
    select?: GiftTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftTransaction
     */
    omit?: GiftTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a GiftTransaction.
     */
    data: XOR<GiftTransactionUpdateInput, GiftTransactionUncheckedUpdateInput>
    /**
     * Choose, which GiftTransaction to update.
     */
    where: GiftTransactionWhereUniqueInput
  }

  /**
   * GiftTransaction updateMany
   */
  export type GiftTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GiftTransactions.
     */
    data: XOR<GiftTransactionUpdateManyMutationInput, GiftTransactionUncheckedUpdateManyInput>
    /**
     * Filter which GiftTransactions to update
     */
    where?: GiftTransactionWhereInput
    /**
     * Limit how many GiftTransactions to update.
     */
    limit?: number
  }

  /**
   * GiftTransaction updateManyAndReturn
   */
  export type GiftTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftTransaction
     */
    select?: GiftTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GiftTransaction
     */
    omit?: GiftTransactionOmit<ExtArgs> | null
    /**
     * The data used to update GiftTransactions.
     */
    data: XOR<GiftTransactionUpdateManyMutationInput, GiftTransactionUncheckedUpdateManyInput>
    /**
     * Filter which GiftTransactions to update
     */
    where?: GiftTransactionWhereInput
    /**
     * Limit how many GiftTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GiftTransaction upsert
   */
  export type GiftTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftTransaction
     */
    select?: GiftTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftTransaction
     */
    omit?: GiftTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the GiftTransaction to update in case it exists.
     */
    where: GiftTransactionWhereUniqueInput
    /**
     * In case the GiftTransaction found by the `where` argument doesn't exist, create a new GiftTransaction with this data.
     */
    create: XOR<GiftTransactionCreateInput, GiftTransactionUncheckedCreateInput>
    /**
     * In case the GiftTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GiftTransactionUpdateInput, GiftTransactionUncheckedUpdateInput>
  }

  /**
   * GiftTransaction delete
   */
  export type GiftTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftTransaction
     */
    select?: GiftTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftTransaction
     */
    omit?: GiftTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftTransactionInclude<ExtArgs> | null
    /**
     * Filter which GiftTransaction to delete.
     */
    where: GiftTransactionWhereUniqueInput
  }

  /**
   * GiftTransaction deleteMany
   */
  export type GiftTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GiftTransactions to delete
     */
    where?: GiftTransactionWhereInput
    /**
     * Limit how many GiftTransactions to delete.
     */
    limit?: number
  }

  /**
   * GiftTransaction without action
   */
  export type GiftTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftTransaction
     */
    select?: GiftTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftTransaction
     */
    omit?: GiftTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftTransactionInclude<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentAvgAggregateOutputType = {
    giftStars: number | null
  }

  export type CommentSumAggregateOutputType = {
    giftStars: number | null
  }

  export type CommentMinAggregateOutputType = {
    id: string | null
    streamId: string | null
    senderId: string | null
    text: string | null
    isGift: boolean | null
    giftStars: number | null
    createdAt: Date | null
  }

  export type CommentMaxAggregateOutputType = {
    id: string | null
    streamId: string | null
    senderId: string | null
    text: string | null
    isGift: boolean | null
    giftStars: number | null
    createdAt: Date | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    streamId: number
    senderId: number
    text: number
    isGift: number
    giftStars: number
    createdAt: number
    _all: number
  }


  export type CommentAvgAggregateInputType = {
    giftStars?: true
  }

  export type CommentSumAggregateInputType = {
    giftStars?: true
  }

  export type CommentMinAggregateInputType = {
    id?: true
    streamId?: true
    senderId?: true
    text?: true
    isGift?: true
    giftStars?: true
    createdAt?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    streamId?: true
    senderId?: true
    text?: true
    isGift?: true
    giftStars?: true
    createdAt?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    streamId?: true
    senderId?: true
    text?: true
    isGift?: true
    giftStars?: true
    createdAt?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _avg?: CommentAvgAggregateInputType
    _sum?: CommentSumAggregateInputType
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: string
    streamId: string
    senderId: string
    text: string
    isGift: boolean
    giftStars: number | null
    createdAt: Date
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streamId?: boolean
    senderId?: boolean
    text?: boolean
    isGift?: boolean
    giftStars?: boolean
    createdAt?: boolean
    stream?: boolean | StreamDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streamId?: boolean
    senderId?: boolean
    text?: boolean
    isGift?: boolean
    giftStars?: boolean
    createdAt?: boolean
    stream?: boolean | StreamDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streamId?: boolean
    senderId?: boolean
    text?: boolean
    isGift?: boolean
    giftStars?: boolean
    createdAt?: boolean
    stream?: boolean | StreamDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectScalar = {
    id?: boolean
    streamId?: boolean
    senderId?: boolean
    text?: boolean
    isGift?: boolean
    giftStars?: boolean
    createdAt?: boolean
  }

  export type CommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "streamId" | "senderId" | "text" | "isGift" | "giftStars" | "createdAt", ExtArgs["result"]["comment"]>
  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream?: boolean | StreamDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream?: boolean | StreamDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream?: boolean | StreamDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      stream: Prisma.$StreamPayload<ExtArgs>
      sender: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      streamId: string
      senderId: string
      text: string
      isGift: boolean
      giftStars: number | null
      createdAt: Date
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comments and returns the data saved in the database.
     * @param {CommentCreateManyAndReturnArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments and returns the data updated in the database.
     * @param {CommentUpdateManyAndReturnArgs} args - Arguments to update many Comments.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stream<T extends StreamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StreamDefaultArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comment model
   */
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'String'>
    readonly streamId: FieldRef<"Comment", 'String'>
    readonly senderId: FieldRef<"Comment", 'String'>
    readonly text: FieldRef<"Comment", 'String'>
    readonly isGift: FieldRef<"Comment", 'Boolean'>
    readonly giftStars: FieldRef<"Comment", 'Int'>
    readonly createdAt: FieldRef<"Comment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comment createManyAndReturn
   */
  export type CommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
  }

  /**
   * Comment updateManyAndReturn
   */
  export type CommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to delete.
     */
    limit?: number
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    expiresAt: Date
    createdAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "expiresAt" | "createdAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model StreamGoal
   */

  export type AggregateStreamGoal = {
    _count: StreamGoalCountAggregateOutputType | null
    _avg: StreamGoalAvgAggregateOutputType | null
    _sum: StreamGoalSumAggregateOutputType | null
    _min: StreamGoalMinAggregateOutputType | null
    _max: StreamGoalMaxAggregateOutputType | null
  }

  export type StreamGoalAvgAggregateOutputType = {
    targetStars: number | null
    currentStars: number | null
  }

  export type StreamGoalSumAggregateOutputType = {
    targetStars: number | null
    currentStars: number | null
  }

  export type StreamGoalMinAggregateOutputType = {
    id: string | null
    streamId: string | null
    title: string | null
    targetStars: number | null
    currentStars: number | null
    status: string | null
    createdAt: Date | null
  }

  export type StreamGoalMaxAggregateOutputType = {
    id: string | null
    streamId: string | null
    title: string | null
    targetStars: number | null
    currentStars: number | null
    status: string | null
    createdAt: Date | null
  }

  export type StreamGoalCountAggregateOutputType = {
    id: number
    streamId: number
    title: number
    targetStars: number
    currentStars: number
    status: number
    createdAt: number
    _all: number
  }


  export type StreamGoalAvgAggregateInputType = {
    targetStars?: true
    currentStars?: true
  }

  export type StreamGoalSumAggregateInputType = {
    targetStars?: true
    currentStars?: true
  }

  export type StreamGoalMinAggregateInputType = {
    id?: true
    streamId?: true
    title?: true
    targetStars?: true
    currentStars?: true
    status?: true
    createdAt?: true
  }

  export type StreamGoalMaxAggregateInputType = {
    id?: true
    streamId?: true
    title?: true
    targetStars?: true
    currentStars?: true
    status?: true
    createdAt?: true
  }

  export type StreamGoalCountAggregateInputType = {
    id?: true
    streamId?: true
    title?: true
    targetStars?: true
    currentStars?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type StreamGoalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StreamGoal to aggregate.
     */
    where?: StreamGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StreamGoals to fetch.
     */
    orderBy?: StreamGoalOrderByWithRelationInput | StreamGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StreamGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StreamGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StreamGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StreamGoals
    **/
    _count?: true | StreamGoalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StreamGoalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StreamGoalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StreamGoalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StreamGoalMaxAggregateInputType
  }

  export type GetStreamGoalAggregateType<T extends StreamGoalAggregateArgs> = {
        [P in keyof T & keyof AggregateStreamGoal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStreamGoal[P]>
      : GetScalarType<T[P], AggregateStreamGoal[P]>
  }




  export type StreamGoalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StreamGoalWhereInput
    orderBy?: StreamGoalOrderByWithAggregationInput | StreamGoalOrderByWithAggregationInput[]
    by: StreamGoalScalarFieldEnum[] | StreamGoalScalarFieldEnum
    having?: StreamGoalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StreamGoalCountAggregateInputType | true
    _avg?: StreamGoalAvgAggregateInputType
    _sum?: StreamGoalSumAggregateInputType
    _min?: StreamGoalMinAggregateInputType
    _max?: StreamGoalMaxAggregateInputType
  }

  export type StreamGoalGroupByOutputType = {
    id: string
    streamId: string
    title: string
    targetStars: number
    currentStars: number
    status: string
    createdAt: Date
    _count: StreamGoalCountAggregateOutputType | null
    _avg: StreamGoalAvgAggregateOutputType | null
    _sum: StreamGoalSumAggregateOutputType | null
    _min: StreamGoalMinAggregateOutputType | null
    _max: StreamGoalMaxAggregateOutputType | null
  }

  type GetStreamGoalGroupByPayload<T extends StreamGoalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StreamGoalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StreamGoalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StreamGoalGroupByOutputType[P]>
            : GetScalarType<T[P], StreamGoalGroupByOutputType[P]>
        }
      >
    >


  export type StreamGoalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streamId?: boolean
    title?: boolean
    targetStars?: boolean
    currentStars?: boolean
    status?: boolean
    createdAt?: boolean
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["streamGoal"]>

  export type StreamGoalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streamId?: boolean
    title?: boolean
    targetStars?: boolean
    currentStars?: boolean
    status?: boolean
    createdAt?: boolean
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["streamGoal"]>

  export type StreamGoalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streamId?: boolean
    title?: boolean
    targetStars?: boolean
    currentStars?: boolean
    status?: boolean
    createdAt?: boolean
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["streamGoal"]>

  export type StreamGoalSelectScalar = {
    id?: boolean
    streamId?: boolean
    title?: boolean
    targetStars?: boolean
    currentStars?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type StreamGoalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "streamId" | "title" | "targetStars" | "currentStars" | "status" | "createdAt", ExtArgs["result"]["streamGoal"]>
  export type StreamGoalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }
  export type StreamGoalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }
  export type StreamGoalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }

  export type $StreamGoalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StreamGoal"
    objects: {
      stream: Prisma.$StreamPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      streamId: string
      title: string
      targetStars: number
      currentStars: number
      status: string
      createdAt: Date
    }, ExtArgs["result"]["streamGoal"]>
    composites: {}
  }

  type StreamGoalGetPayload<S extends boolean | null | undefined | StreamGoalDefaultArgs> = $Result.GetResult<Prisma.$StreamGoalPayload, S>

  type StreamGoalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StreamGoalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StreamGoalCountAggregateInputType | true
    }

  export interface StreamGoalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StreamGoal'], meta: { name: 'StreamGoal' } }
    /**
     * Find zero or one StreamGoal that matches the filter.
     * @param {StreamGoalFindUniqueArgs} args - Arguments to find a StreamGoal
     * @example
     * // Get one StreamGoal
     * const streamGoal = await prisma.streamGoal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StreamGoalFindUniqueArgs>(args: SelectSubset<T, StreamGoalFindUniqueArgs<ExtArgs>>): Prisma__StreamGoalClient<$Result.GetResult<Prisma.$StreamGoalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StreamGoal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StreamGoalFindUniqueOrThrowArgs} args - Arguments to find a StreamGoal
     * @example
     * // Get one StreamGoal
     * const streamGoal = await prisma.streamGoal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StreamGoalFindUniqueOrThrowArgs>(args: SelectSubset<T, StreamGoalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StreamGoalClient<$Result.GetResult<Prisma.$StreamGoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StreamGoal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamGoalFindFirstArgs} args - Arguments to find a StreamGoal
     * @example
     * // Get one StreamGoal
     * const streamGoal = await prisma.streamGoal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StreamGoalFindFirstArgs>(args?: SelectSubset<T, StreamGoalFindFirstArgs<ExtArgs>>): Prisma__StreamGoalClient<$Result.GetResult<Prisma.$StreamGoalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StreamGoal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamGoalFindFirstOrThrowArgs} args - Arguments to find a StreamGoal
     * @example
     * // Get one StreamGoal
     * const streamGoal = await prisma.streamGoal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StreamGoalFindFirstOrThrowArgs>(args?: SelectSubset<T, StreamGoalFindFirstOrThrowArgs<ExtArgs>>): Prisma__StreamGoalClient<$Result.GetResult<Prisma.$StreamGoalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StreamGoals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamGoalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StreamGoals
     * const streamGoals = await prisma.streamGoal.findMany()
     * 
     * // Get first 10 StreamGoals
     * const streamGoals = await prisma.streamGoal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const streamGoalWithIdOnly = await prisma.streamGoal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StreamGoalFindManyArgs>(args?: SelectSubset<T, StreamGoalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamGoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StreamGoal.
     * @param {StreamGoalCreateArgs} args - Arguments to create a StreamGoal.
     * @example
     * // Create one StreamGoal
     * const StreamGoal = await prisma.streamGoal.create({
     *   data: {
     *     // ... data to create a StreamGoal
     *   }
     * })
     * 
     */
    create<T extends StreamGoalCreateArgs>(args: SelectSubset<T, StreamGoalCreateArgs<ExtArgs>>): Prisma__StreamGoalClient<$Result.GetResult<Prisma.$StreamGoalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StreamGoals.
     * @param {StreamGoalCreateManyArgs} args - Arguments to create many StreamGoals.
     * @example
     * // Create many StreamGoals
     * const streamGoal = await prisma.streamGoal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StreamGoalCreateManyArgs>(args?: SelectSubset<T, StreamGoalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StreamGoals and returns the data saved in the database.
     * @param {StreamGoalCreateManyAndReturnArgs} args - Arguments to create many StreamGoals.
     * @example
     * // Create many StreamGoals
     * const streamGoal = await prisma.streamGoal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StreamGoals and only return the `id`
     * const streamGoalWithIdOnly = await prisma.streamGoal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StreamGoalCreateManyAndReturnArgs>(args?: SelectSubset<T, StreamGoalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamGoalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StreamGoal.
     * @param {StreamGoalDeleteArgs} args - Arguments to delete one StreamGoal.
     * @example
     * // Delete one StreamGoal
     * const StreamGoal = await prisma.streamGoal.delete({
     *   where: {
     *     // ... filter to delete one StreamGoal
     *   }
     * })
     * 
     */
    delete<T extends StreamGoalDeleteArgs>(args: SelectSubset<T, StreamGoalDeleteArgs<ExtArgs>>): Prisma__StreamGoalClient<$Result.GetResult<Prisma.$StreamGoalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StreamGoal.
     * @param {StreamGoalUpdateArgs} args - Arguments to update one StreamGoal.
     * @example
     * // Update one StreamGoal
     * const streamGoal = await prisma.streamGoal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StreamGoalUpdateArgs>(args: SelectSubset<T, StreamGoalUpdateArgs<ExtArgs>>): Prisma__StreamGoalClient<$Result.GetResult<Prisma.$StreamGoalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StreamGoals.
     * @param {StreamGoalDeleteManyArgs} args - Arguments to filter StreamGoals to delete.
     * @example
     * // Delete a few StreamGoals
     * const { count } = await prisma.streamGoal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StreamGoalDeleteManyArgs>(args?: SelectSubset<T, StreamGoalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StreamGoals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamGoalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StreamGoals
     * const streamGoal = await prisma.streamGoal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StreamGoalUpdateManyArgs>(args: SelectSubset<T, StreamGoalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StreamGoals and returns the data updated in the database.
     * @param {StreamGoalUpdateManyAndReturnArgs} args - Arguments to update many StreamGoals.
     * @example
     * // Update many StreamGoals
     * const streamGoal = await prisma.streamGoal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StreamGoals and only return the `id`
     * const streamGoalWithIdOnly = await prisma.streamGoal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StreamGoalUpdateManyAndReturnArgs>(args: SelectSubset<T, StreamGoalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamGoalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StreamGoal.
     * @param {StreamGoalUpsertArgs} args - Arguments to update or create a StreamGoal.
     * @example
     * // Update or create a StreamGoal
     * const streamGoal = await prisma.streamGoal.upsert({
     *   create: {
     *     // ... data to create a StreamGoal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StreamGoal we want to update
     *   }
     * })
     */
    upsert<T extends StreamGoalUpsertArgs>(args: SelectSubset<T, StreamGoalUpsertArgs<ExtArgs>>): Prisma__StreamGoalClient<$Result.GetResult<Prisma.$StreamGoalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StreamGoals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamGoalCountArgs} args - Arguments to filter StreamGoals to count.
     * @example
     * // Count the number of StreamGoals
     * const count = await prisma.streamGoal.count({
     *   where: {
     *     // ... the filter for the StreamGoals we want to count
     *   }
     * })
    **/
    count<T extends StreamGoalCountArgs>(
      args?: Subset<T, StreamGoalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StreamGoalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StreamGoal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamGoalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StreamGoalAggregateArgs>(args: Subset<T, StreamGoalAggregateArgs>): Prisma.PrismaPromise<GetStreamGoalAggregateType<T>>

    /**
     * Group by StreamGoal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamGoalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StreamGoalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StreamGoalGroupByArgs['orderBy'] }
        : { orderBy?: StreamGoalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StreamGoalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStreamGoalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StreamGoal model
   */
  readonly fields: StreamGoalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StreamGoal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StreamGoalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stream<T extends StreamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StreamDefaultArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StreamGoal model
   */
  interface StreamGoalFieldRefs {
    readonly id: FieldRef<"StreamGoal", 'String'>
    readonly streamId: FieldRef<"StreamGoal", 'String'>
    readonly title: FieldRef<"StreamGoal", 'String'>
    readonly targetStars: FieldRef<"StreamGoal", 'Int'>
    readonly currentStars: FieldRef<"StreamGoal", 'Int'>
    readonly status: FieldRef<"StreamGoal", 'String'>
    readonly createdAt: FieldRef<"StreamGoal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StreamGoal findUnique
   */
  export type StreamGoalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamGoal
     */
    select?: StreamGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamGoal
     */
    omit?: StreamGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamGoalInclude<ExtArgs> | null
    /**
     * Filter, which StreamGoal to fetch.
     */
    where: StreamGoalWhereUniqueInput
  }

  /**
   * StreamGoal findUniqueOrThrow
   */
  export type StreamGoalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamGoal
     */
    select?: StreamGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamGoal
     */
    omit?: StreamGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamGoalInclude<ExtArgs> | null
    /**
     * Filter, which StreamGoal to fetch.
     */
    where: StreamGoalWhereUniqueInput
  }

  /**
   * StreamGoal findFirst
   */
  export type StreamGoalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamGoal
     */
    select?: StreamGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamGoal
     */
    omit?: StreamGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamGoalInclude<ExtArgs> | null
    /**
     * Filter, which StreamGoal to fetch.
     */
    where?: StreamGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StreamGoals to fetch.
     */
    orderBy?: StreamGoalOrderByWithRelationInput | StreamGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StreamGoals.
     */
    cursor?: StreamGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StreamGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StreamGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StreamGoals.
     */
    distinct?: StreamGoalScalarFieldEnum | StreamGoalScalarFieldEnum[]
  }

  /**
   * StreamGoal findFirstOrThrow
   */
  export type StreamGoalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamGoal
     */
    select?: StreamGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamGoal
     */
    omit?: StreamGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamGoalInclude<ExtArgs> | null
    /**
     * Filter, which StreamGoal to fetch.
     */
    where?: StreamGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StreamGoals to fetch.
     */
    orderBy?: StreamGoalOrderByWithRelationInput | StreamGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StreamGoals.
     */
    cursor?: StreamGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StreamGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StreamGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StreamGoals.
     */
    distinct?: StreamGoalScalarFieldEnum | StreamGoalScalarFieldEnum[]
  }

  /**
   * StreamGoal findMany
   */
  export type StreamGoalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamGoal
     */
    select?: StreamGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamGoal
     */
    omit?: StreamGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamGoalInclude<ExtArgs> | null
    /**
     * Filter, which StreamGoals to fetch.
     */
    where?: StreamGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StreamGoals to fetch.
     */
    orderBy?: StreamGoalOrderByWithRelationInput | StreamGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StreamGoals.
     */
    cursor?: StreamGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StreamGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StreamGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StreamGoals.
     */
    distinct?: StreamGoalScalarFieldEnum | StreamGoalScalarFieldEnum[]
  }

  /**
   * StreamGoal create
   */
  export type StreamGoalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamGoal
     */
    select?: StreamGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamGoal
     */
    omit?: StreamGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamGoalInclude<ExtArgs> | null
    /**
     * The data needed to create a StreamGoal.
     */
    data: XOR<StreamGoalCreateInput, StreamGoalUncheckedCreateInput>
  }

  /**
   * StreamGoal createMany
   */
  export type StreamGoalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StreamGoals.
     */
    data: StreamGoalCreateManyInput | StreamGoalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StreamGoal createManyAndReturn
   */
  export type StreamGoalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamGoal
     */
    select?: StreamGoalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StreamGoal
     */
    omit?: StreamGoalOmit<ExtArgs> | null
    /**
     * The data used to create many StreamGoals.
     */
    data: StreamGoalCreateManyInput | StreamGoalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamGoalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StreamGoal update
   */
  export type StreamGoalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamGoal
     */
    select?: StreamGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamGoal
     */
    omit?: StreamGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamGoalInclude<ExtArgs> | null
    /**
     * The data needed to update a StreamGoal.
     */
    data: XOR<StreamGoalUpdateInput, StreamGoalUncheckedUpdateInput>
    /**
     * Choose, which StreamGoal to update.
     */
    where: StreamGoalWhereUniqueInput
  }

  /**
   * StreamGoal updateMany
   */
  export type StreamGoalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StreamGoals.
     */
    data: XOR<StreamGoalUpdateManyMutationInput, StreamGoalUncheckedUpdateManyInput>
    /**
     * Filter which StreamGoals to update
     */
    where?: StreamGoalWhereInput
    /**
     * Limit how many StreamGoals to update.
     */
    limit?: number
  }

  /**
   * StreamGoal updateManyAndReturn
   */
  export type StreamGoalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamGoal
     */
    select?: StreamGoalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StreamGoal
     */
    omit?: StreamGoalOmit<ExtArgs> | null
    /**
     * The data used to update StreamGoals.
     */
    data: XOR<StreamGoalUpdateManyMutationInput, StreamGoalUncheckedUpdateManyInput>
    /**
     * Filter which StreamGoals to update
     */
    where?: StreamGoalWhereInput
    /**
     * Limit how many StreamGoals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamGoalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StreamGoal upsert
   */
  export type StreamGoalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamGoal
     */
    select?: StreamGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamGoal
     */
    omit?: StreamGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamGoalInclude<ExtArgs> | null
    /**
     * The filter to search for the StreamGoal to update in case it exists.
     */
    where: StreamGoalWhereUniqueInput
    /**
     * In case the StreamGoal found by the `where` argument doesn't exist, create a new StreamGoal with this data.
     */
    create: XOR<StreamGoalCreateInput, StreamGoalUncheckedCreateInput>
    /**
     * In case the StreamGoal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StreamGoalUpdateInput, StreamGoalUncheckedUpdateInput>
  }

  /**
   * StreamGoal delete
   */
  export type StreamGoalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamGoal
     */
    select?: StreamGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamGoal
     */
    omit?: StreamGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamGoalInclude<ExtArgs> | null
    /**
     * Filter which StreamGoal to delete.
     */
    where: StreamGoalWhereUniqueInput
  }

  /**
   * StreamGoal deleteMany
   */
  export type StreamGoalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StreamGoals to delete
     */
    where?: StreamGoalWhereInput
    /**
     * Limit how many StreamGoals to delete.
     */
    limit?: number
  }

  /**
   * StreamGoal without action
   */
  export type StreamGoalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamGoal
     */
    select?: StreamGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StreamGoal
     */
    omit?: StreamGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamGoalInclude<ExtArgs> | null
  }


  /**
   * Model PKBattle
   */

  export type AggregatePKBattle = {
    _count: PKBattleCountAggregateOutputType | null
    _avg: PKBattleAvgAggregateOutputType | null
    _sum: PKBattleSumAggregateOutputType | null
    _min: PKBattleMinAggregateOutputType | null
    _max: PKBattleMaxAggregateOutputType | null
  }

  export type PKBattleAvgAggregateOutputType = {
    score1: number | null
    score2: number | null
  }

  export type PKBattleSumAggregateOutputType = {
    score1: number | null
    score2: number | null
  }

  export type PKBattleMinAggregateOutputType = {
    id: string | null
    status: string | null
    streamId1: string | null
    streamId2: string | null
    score1: number | null
    score2: number | null
    startTime: Date | null
    endTime: Date | null
    winnerId: string | null
    createdAt: Date | null
  }

  export type PKBattleMaxAggregateOutputType = {
    id: string | null
    status: string | null
    streamId1: string | null
    streamId2: string | null
    score1: number | null
    score2: number | null
    startTime: Date | null
    endTime: Date | null
    winnerId: string | null
    createdAt: Date | null
  }

  export type PKBattleCountAggregateOutputType = {
    id: number
    status: number
    streamId1: number
    streamId2: number
    score1: number
    score2: number
    startTime: number
    endTime: number
    winnerId: number
    createdAt: number
    _all: number
  }


  export type PKBattleAvgAggregateInputType = {
    score1?: true
    score2?: true
  }

  export type PKBattleSumAggregateInputType = {
    score1?: true
    score2?: true
  }

  export type PKBattleMinAggregateInputType = {
    id?: true
    status?: true
    streamId1?: true
    streamId2?: true
    score1?: true
    score2?: true
    startTime?: true
    endTime?: true
    winnerId?: true
    createdAt?: true
  }

  export type PKBattleMaxAggregateInputType = {
    id?: true
    status?: true
    streamId1?: true
    streamId2?: true
    score1?: true
    score2?: true
    startTime?: true
    endTime?: true
    winnerId?: true
    createdAt?: true
  }

  export type PKBattleCountAggregateInputType = {
    id?: true
    status?: true
    streamId1?: true
    streamId2?: true
    score1?: true
    score2?: true
    startTime?: true
    endTime?: true
    winnerId?: true
    createdAt?: true
    _all?: true
  }

  export type PKBattleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PKBattle to aggregate.
     */
    where?: PKBattleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PKBattles to fetch.
     */
    orderBy?: PKBattleOrderByWithRelationInput | PKBattleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PKBattleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PKBattles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PKBattles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PKBattles
    **/
    _count?: true | PKBattleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PKBattleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PKBattleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PKBattleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PKBattleMaxAggregateInputType
  }

  export type GetPKBattleAggregateType<T extends PKBattleAggregateArgs> = {
        [P in keyof T & keyof AggregatePKBattle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePKBattle[P]>
      : GetScalarType<T[P], AggregatePKBattle[P]>
  }




  export type PKBattleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PKBattleWhereInput
    orderBy?: PKBattleOrderByWithAggregationInput | PKBattleOrderByWithAggregationInput[]
    by: PKBattleScalarFieldEnum[] | PKBattleScalarFieldEnum
    having?: PKBattleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PKBattleCountAggregateInputType | true
    _avg?: PKBattleAvgAggregateInputType
    _sum?: PKBattleSumAggregateInputType
    _min?: PKBattleMinAggregateInputType
    _max?: PKBattleMaxAggregateInputType
  }

  export type PKBattleGroupByOutputType = {
    id: string
    status: string
    streamId1: string
    streamId2: string
    score1: number
    score2: number
    startTime: Date | null
    endTime: Date | null
    winnerId: string | null
    createdAt: Date
    _count: PKBattleCountAggregateOutputType | null
    _avg: PKBattleAvgAggregateOutputType | null
    _sum: PKBattleSumAggregateOutputType | null
    _min: PKBattleMinAggregateOutputType | null
    _max: PKBattleMaxAggregateOutputType | null
  }

  type GetPKBattleGroupByPayload<T extends PKBattleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PKBattleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PKBattleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PKBattleGroupByOutputType[P]>
            : GetScalarType<T[P], PKBattleGroupByOutputType[P]>
        }
      >
    >


  export type PKBattleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    streamId1?: boolean
    streamId2?: boolean
    score1?: boolean
    score2?: boolean
    startTime?: boolean
    endTime?: boolean
    winnerId?: boolean
    createdAt?: boolean
    stream1?: boolean | StreamDefaultArgs<ExtArgs>
    stream2?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pKBattle"]>

  export type PKBattleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    streamId1?: boolean
    streamId2?: boolean
    score1?: boolean
    score2?: boolean
    startTime?: boolean
    endTime?: boolean
    winnerId?: boolean
    createdAt?: boolean
    stream1?: boolean | StreamDefaultArgs<ExtArgs>
    stream2?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pKBattle"]>

  export type PKBattleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    streamId1?: boolean
    streamId2?: boolean
    score1?: boolean
    score2?: boolean
    startTime?: boolean
    endTime?: boolean
    winnerId?: boolean
    createdAt?: boolean
    stream1?: boolean | StreamDefaultArgs<ExtArgs>
    stream2?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pKBattle"]>

  export type PKBattleSelectScalar = {
    id?: boolean
    status?: boolean
    streamId1?: boolean
    streamId2?: boolean
    score1?: boolean
    score2?: boolean
    startTime?: boolean
    endTime?: boolean
    winnerId?: boolean
    createdAt?: boolean
  }

  export type PKBattleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "status" | "streamId1" | "streamId2" | "score1" | "score2" | "startTime" | "endTime" | "winnerId" | "createdAt", ExtArgs["result"]["pKBattle"]>
  export type PKBattleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream1?: boolean | StreamDefaultArgs<ExtArgs>
    stream2?: boolean | StreamDefaultArgs<ExtArgs>
  }
  export type PKBattleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream1?: boolean | StreamDefaultArgs<ExtArgs>
    stream2?: boolean | StreamDefaultArgs<ExtArgs>
  }
  export type PKBattleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream1?: boolean | StreamDefaultArgs<ExtArgs>
    stream2?: boolean | StreamDefaultArgs<ExtArgs>
  }

  export type $PKBattlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PKBattle"
    objects: {
      stream1: Prisma.$StreamPayload<ExtArgs>
      stream2: Prisma.$StreamPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: string
      streamId1: string
      streamId2: string
      score1: number
      score2: number
      startTime: Date | null
      endTime: Date | null
      winnerId: string | null
      createdAt: Date
    }, ExtArgs["result"]["pKBattle"]>
    composites: {}
  }

  type PKBattleGetPayload<S extends boolean | null | undefined | PKBattleDefaultArgs> = $Result.GetResult<Prisma.$PKBattlePayload, S>

  type PKBattleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PKBattleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PKBattleCountAggregateInputType | true
    }

  export interface PKBattleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PKBattle'], meta: { name: 'PKBattle' } }
    /**
     * Find zero or one PKBattle that matches the filter.
     * @param {PKBattleFindUniqueArgs} args - Arguments to find a PKBattle
     * @example
     * // Get one PKBattle
     * const pKBattle = await prisma.pKBattle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PKBattleFindUniqueArgs>(args: SelectSubset<T, PKBattleFindUniqueArgs<ExtArgs>>): Prisma__PKBattleClient<$Result.GetResult<Prisma.$PKBattlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PKBattle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PKBattleFindUniqueOrThrowArgs} args - Arguments to find a PKBattle
     * @example
     * // Get one PKBattle
     * const pKBattle = await prisma.pKBattle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PKBattleFindUniqueOrThrowArgs>(args: SelectSubset<T, PKBattleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PKBattleClient<$Result.GetResult<Prisma.$PKBattlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PKBattle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PKBattleFindFirstArgs} args - Arguments to find a PKBattle
     * @example
     * // Get one PKBattle
     * const pKBattle = await prisma.pKBattle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PKBattleFindFirstArgs>(args?: SelectSubset<T, PKBattleFindFirstArgs<ExtArgs>>): Prisma__PKBattleClient<$Result.GetResult<Prisma.$PKBattlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PKBattle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PKBattleFindFirstOrThrowArgs} args - Arguments to find a PKBattle
     * @example
     * // Get one PKBattle
     * const pKBattle = await prisma.pKBattle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PKBattleFindFirstOrThrowArgs>(args?: SelectSubset<T, PKBattleFindFirstOrThrowArgs<ExtArgs>>): Prisma__PKBattleClient<$Result.GetResult<Prisma.$PKBattlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PKBattles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PKBattleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PKBattles
     * const pKBattles = await prisma.pKBattle.findMany()
     * 
     * // Get first 10 PKBattles
     * const pKBattles = await prisma.pKBattle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pKBattleWithIdOnly = await prisma.pKBattle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PKBattleFindManyArgs>(args?: SelectSubset<T, PKBattleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PKBattlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PKBattle.
     * @param {PKBattleCreateArgs} args - Arguments to create a PKBattle.
     * @example
     * // Create one PKBattle
     * const PKBattle = await prisma.pKBattle.create({
     *   data: {
     *     // ... data to create a PKBattle
     *   }
     * })
     * 
     */
    create<T extends PKBattleCreateArgs>(args: SelectSubset<T, PKBattleCreateArgs<ExtArgs>>): Prisma__PKBattleClient<$Result.GetResult<Prisma.$PKBattlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PKBattles.
     * @param {PKBattleCreateManyArgs} args - Arguments to create many PKBattles.
     * @example
     * // Create many PKBattles
     * const pKBattle = await prisma.pKBattle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PKBattleCreateManyArgs>(args?: SelectSubset<T, PKBattleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PKBattles and returns the data saved in the database.
     * @param {PKBattleCreateManyAndReturnArgs} args - Arguments to create many PKBattles.
     * @example
     * // Create many PKBattles
     * const pKBattle = await prisma.pKBattle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PKBattles and only return the `id`
     * const pKBattleWithIdOnly = await prisma.pKBattle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PKBattleCreateManyAndReturnArgs>(args?: SelectSubset<T, PKBattleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PKBattlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PKBattle.
     * @param {PKBattleDeleteArgs} args - Arguments to delete one PKBattle.
     * @example
     * // Delete one PKBattle
     * const PKBattle = await prisma.pKBattle.delete({
     *   where: {
     *     // ... filter to delete one PKBattle
     *   }
     * })
     * 
     */
    delete<T extends PKBattleDeleteArgs>(args: SelectSubset<T, PKBattleDeleteArgs<ExtArgs>>): Prisma__PKBattleClient<$Result.GetResult<Prisma.$PKBattlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PKBattle.
     * @param {PKBattleUpdateArgs} args - Arguments to update one PKBattle.
     * @example
     * // Update one PKBattle
     * const pKBattle = await prisma.pKBattle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PKBattleUpdateArgs>(args: SelectSubset<T, PKBattleUpdateArgs<ExtArgs>>): Prisma__PKBattleClient<$Result.GetResult<Prisma.$PKBattlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PKBattles.
     * @param {PKBattleDeleteManyArgs} args - Arguments to filter PKBattles to delete.
     * @example
     * // Delete a few PKBattles
     * const { count } = await prisma.pKBattle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PKBattleDeleteManyArgs>(args?: SelectSubset<T, PKBattleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PKBattles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PKBattleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PKBattles
     * const pKBattle = await prisma.pKBattle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PKBattleUpdateManyArgs>(args: SelectSubset<T, PKBattleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PKBattles and returns the data updated in the database.
     * @param {PKBattleUpdateManyAndReturnArgs} args - Arguments to update many PKBattles.
     * @example
     * // Update many PKBattles
     * const pKBattle = await prisma.pKBattle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PKBattles and only return the `id`
     * const pKBattleWithIdOnly = await prisma.pKBattle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PKBattleUpdateManyAndReturnArgs>(args: SelectSubset<T, PKBattleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PKBattlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PKBattle.
     * @param {PKBattleUpsertArgs} args - Arguments to update or create a PKBattle.
     * @example
     * // Update or create a PKBattle
     * const pKBattle = await prisma.pKBattle.upsert({
     *   create: {
     *     // ... data to create a PKBattle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PKBattle we want to update
     *   }
     * })
     */
    upsert<T extends PKBattleUpsertArgs>(args: SelectSubset<T, PKBattleUpsertArgs<ExtArgs>>): Prisma__PKBattleClient<$Result.GetResult<Prisma.$PKBattlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PKBattles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PKBattleCountArgs} args - Arguments to filter PKBattles to count.
     * @example
     * // Count the number of PKBattles
     * const count = await prisma.pKBattle.count({
     *   where: {
     *     // ... the filter for the PKBattles we want to count
     *   }
     * })
    **/
    count<T extends PKBattleCountArgs>(
      args?: Subset<T, PKBattleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PKBattleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PKBattle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PKBattleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PKBattleAggregateArgs>(args: Subset<T, PKBattleAggregateArgs>): Prisma.PrismaPromise<GetPKBattleAggregateType<T>>

    /**
     * Group by PKBattle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PKBattleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PKBattleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PKBattleGroupByArgs['orderBy'] }
        : { orderBy?: PKBattleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PKBattleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPKBattleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PKBattle model
   */
  readonly fields: PKBattleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PKBattle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PKBattleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stream1<T extends StreamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StreamDefaultArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stream2<T extends StreamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StreamDefaultArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PKBattle model
   */
  interface PKBattleFieldRefs {
    readonly id: FieldRef<"PKBattle", 'String'>
    readonly status: FieldRef<"PKBattle", 'String'>
    readonly streamId1: FieldRef<"PKBattle", 'String'>
    readonly streamId2: FieldRef<"PKBattle", 'String'>
    readonly score1: FieldRef<"PKBattle", 'Int'>
    readonly score2: FieldRef<"PKBattle", 'Int'>
    readonly startTime: FieldRef<"PKBattle", 'DateTime'>
    readonly endTime: FieldRef<"PKBattle", 'DateTime'>
    readonly winnerId: FieldRef<"PKBattle", 'String'>
    readonly createdAt: FieldRef<"PKBattle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PKBattle findUnique
   */
  export type PKBattleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PKBattle
     */
    select?: PKBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PKBattle
     */
    omit?: PKBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PKBattleInclude<ExtArgs> | null
    /**
     * Filter, which PKBattle to fetch.
     */
    where: PKBattleWhereUniqueInput
  }

  /**
   * PKBattle findUniqueOrThrow
   */
  export type PKBattleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PKBattle
     */
    select?: PKBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PKBattle
     */
    omit?: PKBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PKBattleInclude<ExtArgs> | null
    /**
     * Filter, which PKBattle to fetch.
     */
    where: PKBattleWhereUniqueInput
  }

  /**
   * PKBattle findFirst
   */
  export type PKBattleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PKBattle
     */
    select?: PKBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PKBattle
     */
    omit?: PKBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PKBattleInclude<ExtArgs> | null
    /**
     * Filter, which PKBattle to fetch.
     */
    where?: PKBattleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PKBattles to fetch.
     */
    orderBy?: PKBattleOrderByWithRelationInput | PKBattleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PKBattles.
     */
    cursor?: PKBattleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PKBattles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PKBattles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PKBattles.
     */
    distinct?: PKBattleScalarFieldEnum | PKBattleScalarFieldEnum[]
  }

  /**
   * PKBattle findFirstOrThrow
   */
  export type PKBattleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PKBattle
     */
    select?: PKBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PKBattle
     */
    omit?: PKBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PKBattleInclude<ExtArgs> | null
    /**
     * Filter, which PKBattle to fetch.
     */
    where?: PKBattleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PKBattles to fetch.
     */
    orderBy?: PKBattleOrderByWithRelationInput | PKBattleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PKBattles.
     */
    cursor?: PKBattleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PKBattles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PKBattles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PKBattles.
     */
    distinct?: PKBattleScalarFieldEnum | PKBattleScalarFieldEnum[]
  }

  /**
   * PKBattle findMany
   */
  export type PKBattleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PKBattle
     */
    select?: PKBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PKBattle
     */
    omit?: PKBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PKBattleInclude<ExtArgs> | null
    /**
     * Filter, which PKBattles to fetch.
     */
    where?: PKBattleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PKBattles to fetch.
     */
    orderBy?: PKBattleOrderByWithRelationInput | PKBattleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PKBattles.
     */
    cursor?: PKBattleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PKBattles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PKBattles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PKBattles.
     */
    distinct?: PKBattleScalarFieldEnum | PKBattleScalarFieldEnum[]
  }

  /**
   * PKBattle create
   */
  export type PKBattleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PKBattle
     */
    select?: PKBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PKBattle
     */
    omit?: PKBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PKBattleInclude<ExtArgs> | null
    /**
     * The data needed to create a PKBattle.
     */
    data: XOR<PKBattleCreateInput, PKBattleUncheckedCreateInput>
  }

  /**
   * PKBattle createMany
   */
  export type PKBattleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PKBattles.
     */
    data: PKBattleCreateManyInput | PKBattleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PKBattle createManyAndReturn
   */
  export type PKBattleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PKBattle
     */
    select?: PKBattleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PKBattle
     */
    omit?: PKBattleOmit<ExtArgs> | null
    /**
     * The data used to create many PKBattles.
     */
    data: PKBattleCreateManyInput | PKBattleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PKBattleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PKBattle update
   */
  export type PKBattleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PKBattle
     */
    select?: PKBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PKBattle
     */
    omit?: PKBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PKBattleInclude<ExtArgs> | null
    /**
     * The data needed to update a PKBattle.
     */
    data: XOR<PKBattleUpdateInput, PKBattleUncheckedUpdateInput>
    /**
     * Choose, which PKBattle to update.
     */
    where: PKBattleWhereUniqueInput
  }

  /**
   * PKBattle updateMany
   */
  export type PKBattleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PKBattles.
     */
    data: XOR<PKBattleUpdateManyMutationInput, PKBattleUncheckedUpdateManyInput>
    /**
     * Filter which PKBattles to update
     */
    where?: PKBattleWhereInput
    /**
     * Limit how many PKBattles to update.
     */
    limit?: number
  }

  /**
   * PKBattle updateManyAndReturn
   */
  export type PKBattleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PKBattle
     */
    select?: PKBattleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PKBattle
     */
    omit?: PKBattleOmit<ExtArgs> | null
    /**
     * The data used to update PKBattles.
     */
    data: XOR<PKBattleUpdateManyMutationInput, PKBattleUncheckedUpdateManyInput>
    /**
     * Filter which PKBattles to update
     */
    where?: PKBattleWhereInput
    /**
     * Limit how many PKBattles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PKBattleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PKBattle upsert
   */
  export type PKBattleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PKBattle
     */
    select?: PKBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PKBattle
     */
    omit?: PKBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PKBattleInclude<ExtArgs> | null
    /**
     * The filter to search for the PKBattle to update in case it exists.
     */
    where: PKBattleWhereUniqueInput
    /**
     * In case the PKBattle found by the `where` argument doesn't exist, create a new PKBattle with this data.
     */
    create: XOR<PKBattleCreateInput, PKBattleUncheckedCreateInput>
    /**
     * In case the PKBattle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PKBattleUpdateInput, PKBattleUncheckedUpdateInput>
  }

  /**
   * PKBattle delete
   */
  export type PKBattleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PKBattle
     */
    select?: PKBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PKBattle
     */
    omit?: PKBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PKBattleInclude<ExtArgs> | null
    /**
     * Filter which PKBattle to delete.
     */
    where: PKBattleWhereUniqueInput
  }

  /**
   * PKBattle deleteMany
   */
  export type PKBattleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PKBattles to delete
     */
    where?: PKBattleWhereInput
    /**
     * Limit how many PKBattles to delete.
     */
    limit?: number
  }

  /**
   * PKBattle without action
   */
  export type PKBattleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PKBattle
     */
    select?: PKBattleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PKBattle
     */
    omit?: PKBattleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PKBattleInclude<ExtArgs> | null
  }


  /**
   * Model TreasureChest
   */

  export type AggregateTreasureChest = {
    _count: TreasureChestCountAggregateOutputType | null
    _avg: TreasureChestAvgAggregateOutputType | null
    _sum: TreasureChestSumAggregateOutputType | null
    _min: TreasureChestMinAggregateOutputType | null
    _max: TreasureChestMaxAggregateOutputType | null
  }

  export type TreasureChestAvgAggregateOutputType = {
    totalStars: number | null
    remainingStars: number | null
    totalSlots: number | null
    remainingSlots: number | null
  }

  export type TreasureChestSumAggregateOutputType = {
    totalStars: number | null
    remainingStars: number | null
    totalSlots: number | null
    remainingSlots: number | null
  }

  export type TreasureChestMinAggregateOutputType = {
    id: string | null
    streamId: string | null
    creatorId: string | null
    totalStars: number | null
    remainingStars: number | null
    totalSlots: number | null
    remainingSlots: number | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type TreasureChestMaxAggregateOutputType = {
    id: string | null
    streamId: string | null
    creatorId: string | null
    totalStars: number | null
    remainingStars: number | null
    totalSlots: number | null
    remainingSlots: number | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type TreasureChestCountAggregateOutputType = {
    id: number
    streamId: number
    creatorId: number
    totalStars: number
    remainingStars: number
    totalSlots: number
    remainingSlots: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type TreasureChestAvgAggregateInputType = {
    totalStars?: true
    remainingStars?: true
    totalSlots?: true
    remainingSlots?: true
  }

  export type TreasureChestSumAggregateInputType = {
    totalStars?: true
    remainingStars?: true
    totalSlots?: true
    remainingSlots?: true
  }

  export type TreasureChestMinAggregateInputType = {
    id?: true
    streamId?: true
    creatorId?: true
    totalStars?: true
    remainingStars?: true
    totalSlots?: true
    remainingSlots?: true
    expiresAt?: true
    createdAt?: true
  }

  export type TreasureChestMaxAggregateInputType = {
    id?: true
    streamId?: true
    creatorId?: true
    totalStars?: true
    remainingStars?: true
    totalSlots?: true
    remainingSlots?: true
    expiresAt?: true
    createdAt?: true
  }

  export type TreasureChestCountAggregateInputType = {
    id?: true
    streamId?: true
    creatorId?: true
    totalStars?: true
    remainingStars?: true
    totalSlots?: true
    remainingSlots?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type TreasureChestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TreasureChest to aggregate.
     */
    where?: TreasureChestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasureChests to fetch.
     */
    orderBy?: TreasureChestOrderByWithRelationInput | TreasureChestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TreasureChestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasureChests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasureChests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TreasureChests
    **/
    _count?: true | TreasureChestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TreasureChestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TreasureChestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TreasureChestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TreasureChestMaxAggregateInputType
  }

  export type GetTreasureChestAggregateType<T extends TreasureChestAggregateArgs> = {
        [P in keyof T & keyof AggregateTreasureChest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTreasureChest[P]>
      : GetScalarType<T[P], AggregateTreasureChest[P]>
  }




  export type TreasureChestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreasureChestWhereInput
    orderBy?: TreasureChestOrderByWithAggregationInput | TreasureChestOrderByWithAggregationInput[]
    by: TreasureChestScalarFieldEnum[] | TreasureChestScalarFieldEnum
    having?: TreasureChestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TreasureChestCountAggregateInputType | true
    _avg?: TreasureChestAvgAggregateInputType
    _sum?: TreasureChestSumAggregateInputType
    _min?: TreasureChestMinAggregateInputType
    _max?: TreasureChestMaxAggregateInputType
  }

  export type TreasureChestGroupByOutputType = {
    id: string
    streamId: string
    creatorId: string
    totalStars: number
    remainingStars: number
    totalSlots: number
    remainingSlots: number
    expiresAt: Date
    createdAt: Date
    _count: TreasureChestCountAggregateOutputType | null
    _avg: TreasureChestAvgAggregateOutputType | null
    _sum: TreasureChestSumAggregateOutputType | null
    _min: TreasureChestMinAggregateOutputType | null
    _max: TreasureChestMaxAggregateOutputType | null
  }

  type GetTreasureChestGroupByPayload<T extends TreasureChestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TreasureChestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TreasureChestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TreasureChestGroupByOutputType[P]>
            : GetScalarType<T[P], TreasureChestGroupByOutputType[P]>
        }
      >
    >


  export type TreasureChestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streamId?: boolean
    creatorId?: boolean
    totalStars?: boolean
    remainingStars?: boolean
    totalSlots?: boolean
    remainingSlots?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    stream?: boolean | StreamDefaultArgs<ExtArgs>
    claims?: boolean | TreasureChest$claimsArgs<ExtArgs>
    _count?: boolean | TreasureChestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["treasureChest"]>

  export type TreasureChestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streamId?: boolean
    creatorId?: boolean
    totalStars?: boolean
    remainingStars?: boolean
    totalSlots?: boolean
    remainingSlots?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["treasureChest"]>

  export type TreasureChestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streamId?: boolean
    creatorId?: boolean
    totalStars?: boolean
    remainingStars?: boolean
    totalSlots?: boolean
    remainingSlots?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["treasureChest"]>

  export type TreasureChestSelectScalar = {
    id?: boolean
    streamId?: boolean
    creatorId?: boolean
    totalStars?: boolean
    remainingStars?: boolean
    totalSlots?: boolean
    remainingSlots?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type TreasureChestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "streamId" | "creatorId" | "totalStars" | "remainingStars" | "totalSlots" | "remainingSlots" | "expiresAt" | "createdAt", ExtArgs["result"]["treasureChest"]>
  export type TreasureChestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream?: boolean | StreamDefaultArgs<ExtArgs>
    claims?: boolean | TreasureChest$claimsArgs<ExtArgs>
    _count?: boolean | TreasureChestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TreasureChestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }
  export type TreasureChestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }

  export type $TreasureChestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TreasureChest"
    objects: {
      stream: Prisma.$StreamPayload<ExtArgs>
      claims: Prisma.$TreasureClaimPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      streamId: string
      creatorId: string
      totalStars: number
      remainingStars: number
      totalSlots: number
      remainingSlots: number
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["treasureChest"]>
    composites: {}
  }

  type TreasureChestGetPayload<S extends boolean | null | undefined | TreasureChestDefaultArgs> = $Result.GetResult<Prisma.$TreasureChestPayload, S>

  type TreasureChestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TreasureChestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TreasureChestCountAggregateInputType | true
    }

  export interface TreasureChestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TreasureChest'], meta: { name: 'TreasureChest' } }
    /**
     * Find zero or one TreasureChest that matches the filter.
     * @param {TreasureChestFindUniqueArgs} args - Arguments to find a TreasureChest
     * @example
     * // Get one TreasureChest
     * const treasureChest = await prisma.treasureChest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TreasureChestFindUniqueArgs>(args: SelectSubset<T, TreasureChestFindUniqueArgs<ExtArgs>>): Prisma__TreasureChestClient<$Result.GetResult<Prisma.$TreasureChestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TreasureChest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TreasureChestFindUniqueOrThrowArgs} args - Arguments to find a TreasureChest
     * @example
     * // Get one TreasureChest
     * const treasureChest = await prisma.treasureChest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TreasureChestFindUniqueOrThrowArgs>(args: SelectSubset<T, TreasureChestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TreasureChestClient<$Result.GetResult<Prisma.$TreasureChestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TreasureChest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasureChestFindFirstArgs} args - Arguments to find a TreasureChest
     * @example
     * // Get one TreasureChest
     * const treasureChest = await prisma.treasureChest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TreasureChestFindFirstArgs>(args?: SelectSubset<T, TreasureChestFindFirstArgs<ExtArgs>>): Prisma__TreasureChestClient<$Result.GetResult<Prisma.$TreasureChestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TreasureChest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasureChestFindFirstOrThrowArgs} args - Arguments to find a TreasureChest
     * @example
     * // Get one TreasureChest
     * const treasureChest = await prisma.treasureChest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TreasureChestFindFirstOrThrowArgs>(args?: SelectSubset<T, TreasureChestFindFirstOrThrowArgs<ExtArgs>>): Prisma__TreasureChestClient<$Result.GetResult<Prisma.$TreasureChestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TreasureChests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasureChestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TreasureChests
     * const treasureChests = await prisma.treasureChest.findMany()
     * 
     * // Get first 10 TreasureChests
     * const treasureChests = await prisma.treasureChest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const treasureChestWithIdOnly = await prisma.treasureChest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TreasureChestFindManyArgs>(args?: SelectSubset<T, TreasureChestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreasureChestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TreasureChest.
     * @param {TreasureChestCreateArgs} args - Arguments to create a TreasureChest.
     * @example
     * // Create one TreasureChest
     * const TreasureChest = await prisma.treasureChest.create({
     *   data: {
     *     // ... data to create a TreasureChest
     *   }
     * })
     * 
     */
    create<T extends TreasureChestCreateArgs>(args: SelectSubset<T, TreasureChestCreateArgs<ExtArgs>>): Prisma__TreasureChestClient<$Result.GetResult<Prisma.$TreasureChestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TreasureChests.
     * @param {TreasureChestCreateManyArgs} args - Arguments to create many TreasureChests.
     * @example
     * // Create many TreasureChests
     * const treasureChest = await prisma.treasureChest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TreasureChestCreateManyArgs>(args?: SelectSubset<T, TreasureChestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TreasureChests and returns the data saved in the database.
     * @param {TreasureChestCreateManyAndReturnArgs} args - Arguments to create many TreasureChests.
     * @example
     * // Create many TreasureChests
     * const treasureChest = await prisma.treasureChest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TreasureChests and only return the `id`
     * const treasureChestWithIdOnly = await prisma.treasureChest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TreasureChestCreateManyAndReturnArgs>(args?: SelectSubset<T, TreasureChestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreasureChestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TreasureChest.
     * @param {TreasureChestDeleteArgs} args - Arguments to delete one TreasureChest.
     * @example
     * // Delete one TreasureChest
     * const TreasureChest = await prisma.treasureChest.delete({
     *   where: {
     *     // ... filter to delete one TreasureChest
     *   }
     * })
     * 
     */
    delete<T extends TreasureChestDeleteArgs>(args: SelectSubset<T, TreasureChestDeleteArgs<ExtArgs>>): Prisma__TreasureChestClient<$Result.GetResult<Prisma.$TreasureChestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TreasureChest.
     * @param {TreasureChestUpdateArgs} args - Arguments to update one TreasureChest.
     * @example
     * // Update one TreasureChest
     * const treasureChest = await prisma.treasureChest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TreasureChestUpdateArgs>(args: SelectSubset<T, TreasureChestUpdateArgs<ExtArgs>>): Prisma__TreasureChestClient<$Result.GetResult<Prisma.$TreasureChestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TreasureChests.
     * @param {TreasureChestDeleteManyArgs} args - Arguments to filter TreasureChests to delete.
     * @example
     * // Delete a few TreasureChests
     * const { count } = await prisma.treasureChest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TreasureChestDeleteManyArgs>(args?: SelectSubset<T, TreasureChestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TreasureChests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasureChestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TreasureChests
     * const treasureChest = await prisma.treasureChest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TreasureChestUpdateManyArgs>(args: SelectSubset<T, TreasureChestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TreasureChests and returns the data updated in the database.
     * @param {TreasureChestUpdateManyAndReturnArgs} args - Arguments to update many TreasureChests.
     * @example
     * // Update many TreasureChests
     * const treasureChest = await prisma.treasureChest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TreasureChests and only return the `id`
     * const treasureChestWithIdOnly = await prisma.treasureChest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TreasureChestUpdateManyAndReturnArgs>(args: SelectSubset<T, TreasureChestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreasureChestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TreasureChest.
     * @param {TreasureChestUpsertArgs} args - Arguments to update or create a TreasureChest.
     * @example
     * // Update or create a TreasureChest
     * const treasureChest = await prisma.treasureChest.upsert({
     *   create: {
     *     // ... data to create a TreasureChest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TreasureChest we want to update
     *   }
     * })
     */
    upsert<T extends TreasureChestUpsertArgs>(args: SelectSubset<T, TreasureChestUpsertArgs<ExtArgs>>): Prisma__TreasureChestClient<$Result.GetResult<Prisma.$TreasureChestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TreasureChests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasureChestCountArgs} args - Arguments to filter TreasureChests to count.
     * @example
     * // Count the number of TreasureChests
     * const count = await prisma.treasureChest.count({
     *   where: {
     *     // ... the filter for the TreasureChests we want to count
     *   }
     * })
    **/
    count<T extends TreasureChestCountArgs>(
      args?: Subset<T, TreasureChestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TreasureChestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TreasureChest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasureChestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TreasureChestAggregateArgs>(args: Subset<T, TreasureChestAggregateArgs>): Prisma.PrismaPromise<GetTreasureChestAggregateType<T>>

    /**
     * Group by TreasureChest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasureChestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TreasureChestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TreasureChestGroupByArgs['orderBy'] }
        : { orderBy?: TreasureChestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TreasureChestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTreasureChestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TreasureChest model
   */
  readonly fields: TreasureChestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TreasureChest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TreasureChestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stream<T extends StreamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StreamDefaultArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    claims<T extends TreasureChest$claimsArgs<ExtArgs> = {}>(args?: Subset<T, TreasureChest$claimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreasureClaimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TreasureChest model
   */
  interface TreasureChestFieldRefs {
    readonly id: FieldRef<"TreasureChest", 'String'>
    readonly streamId: FieldRef<"TreasureChest", 'String'>
    readonly creatorId: FieldRef<"TreasureChest", 'String'>
    readonly totalStars: FieldRef<"TreasureChest", 'Int'>
    readonly remainingStars: FieldRef<"TreasureChest", 'Int'>
    readonly totalSlots: FieldRef<"TreasureChest", 'Int'>
    readonly remainingSlots: FieldRef<"TreasureChest", 'Int'>
    readonly expiresAt: FieldRef<"TreasureChest", 'DateTime'>
    readonly createdAt: FieldRef<"TreasureChest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TreasureChest findUnique
   */
  export type TreasureChestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureChest
     */
    select?: TreasureChestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureChest
     */
    omit?: TreasureChestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureChestInclude<ExtArgs> | null
    /**
     * Filter, which TreasureChest to fetch.
     */
    where: TreasureChestWhereUniqueInput
  }

  /**
   * TreasureChest findUniqueOrThrow
   */
  export type TreasureChestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureChest
     */
    select?: TreasureChestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureChest
     */
    omit?: TreasureChestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureChestInclude<ExtArgs> | null
    /**
     * Filter, which TreasureChest to fetch.
     */
    where: TreasureChestWhereUniqueInput
  }

  /**
   * TreasureChest findFirst
   */
  export type TreasureChestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureChest
     */
    select?: TreasureChestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureChest
     */
    omit?: TreasureChestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureChestInclude<ExtArgs> | null
    /**
     * Filter, which TreasureChest to fetch.
     */
    where?: TreasureChestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasureChests to fetch.
     */
    orderBy?: TreasureChestOrderByWithRelationInput | TreasureChestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TreasureChests.
     */
    cursor?: TreasureChestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasureChests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasureChests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TreasureChests.
     */
    distinct?: TreasureChestScalarFieldEnum | TreasureChestScalarFieldEnum[]
  }

  /**
   * TreasureChest findFirstOrThrow
   */
  export type TreasureChestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureChest
     */
    select?: TreasureChestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureChest
     */
    omit?: TreasureChestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureChestInclude<ExtArgs> | null
    /**
     * Filter, which TreasureChest to fetch.
     */
    where?: TreasureChestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasureChests to fetch.
     */
    orderBy?: TreasureChestOrderByWithRelationInput | TreasureChestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TreasureChests.
     */
    cursor?: TreasureChestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasureChests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasureChests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TreasureChests.
     */
    distinct?: TreasureChestScalarFieldEnum | TreasureChestScalarFieldEnum[]
  }

  /**
   * TreasureChest findMany
   */
  export type TreasureChestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureChest
     */
    select?: TreasureChestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureChest
     */
    omit?: TreasureChestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureChestInclude<ExtArgs> | null
    /**
     * Filter, which TreasureChests to fetch.
     */
    where?: TreasureChestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasureChests to fetch.
     */
    orderBy?: TreasureChestOrderByWithRelationInput | TreasureChestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TreasureChests.
     */
    cursor?: TreasureChestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasureChests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasureChests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TreasureChests.
     */
    distinct?: TreasureChestScalarFieldEnum | TreasureChestScalarFieldEnum[]
  }

  /**
   * TreasureChest create
   */
  export type TreasureChestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureChest
     */
    select?: TreasureChestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureChest
     */
    omit?: TreasureChestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureChestInclude<ExtArgs> | null
    /**
     * The data needed to create a TreasureChest.
     */
    data: XOR<TreasureChestCreateInput, TreasureChestUncheckedCreateInput>
  }

  /**
   * TreasureChest createMany
   */
  export type TreasureChestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TreasureChests.
     */
    data: TreasureChestCreateManyInput | TreasureChestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TreasureChest createManyAndReturn
   */
  export type TreasureChestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureChest
     */
    select?: TreasureChestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureChest
     */
    omit?: TreasureChestOmit<ExtArgs> | null
    /**
     * The data used to create many TreasureChests.
     */
    data: TreasureChestCreateManyInput | TreasureChestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureChestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TreasureChest update
   */
  export type TreasureChestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureChest
     */
    select?: TreasureChestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureChest
     */
    omit?: TreasureChestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureChestInclude<ExtArgs> | null
    /**
     * The data needed to update a TreasureChest.
     */
    data: XOR<TreasureChestUpdateInput, TreasureChestUncheckedUpdateInput>
    /**
     * Choose, which TreasureChest to update.
     */
    where: TreasureChestWhereUniqueInput
  }

  /**
   * TreasureChest updateMany
   */
  export type TreasureChestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TreasureChests.
     */
    data: XOR<TreasureChestUpdateManyMutationInput, TreasureChestUncheckedUpdateManyInput>
    /**
     * Filter which TreasureChests to update
     */
    where?: TreasureChestWhereInput
    /**
     * Limit how many TreasureChests to update.
     */
    limit?: number
  }

  /**
   * TreasureChest updateManyAndReturn
   */
  export type TreasureChestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureChest
     */
    select?: TreasureChestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureChest
     */
    omit?: TreasureChestOmit<ExtArgs> | null
    /**
     * The data used to update TreasureChests.
     */
    data: XOR<TreasureChestUpdateManyMutationInput, TreasureChestUncheckedUpdateManyInput>
    /**
     * Filter which TreasureChests to update
     */
    where?: TreasureChestWhereInput
    /**
     * Limit how many TreasureChests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureChestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TreasureChest upsert
   */
  export type TreasureChestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureChest
     */
    select?: TreasureChestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureChest
     */
    omit?: TreasureChestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureChestInclude<ExtArgs> | null
    /**
     * The filter to search for the TreasureChest to update in case it exists.
     */
    where: TreasureChestWhereUniqueInput
    /**
     * In case the TreasureChest found by the `where` argument doesn't exist, create a new TreasureChest with this data.
     */
    create: XOR<TreasureChestCreateInput, TreasureChestUncheckedCreateInput>
    /**
     * In case the TreasureChest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TreasureChestUpdateInput, TreasureChestUncheckedUpdateInput>
  }

  /**
   * TreasureChest delete
   */
  export type TreasureChestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureChest
     */
    select?: TreasureChestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureChest
     */
    omit?: TreasureChestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureChestInclude<ExtArgs> | null
    /**
     * Filter which TreasureChest to delete.
     */
    where: TreasureChestWhereUniqueInput
  }

  /**
   * TreasureChest deleteMany
   */
  export type TreasureChestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TreasureChests to delete
     */
    where?: TreasureChestWhereInput
    /**
     * Limit how many TreasureChests to delete.
     */
    limit?: number
  }

  /**
   * TreasureChest.claims
   */
  export type TreasureChest$claimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureClaim
     */
    select?: TreasureClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureClaim
     */
    omit?: TreasureClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureClaimInclude<ExtArgs> | null
    where?: TreasureClaimWhereInput
    orderBy?: TreasureClaimOrderByWithRelationInput | TreasureClaimOrderByWithRelationInput[]
    cursor?: TreasureClaimWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TreasureClaimScalarFieldEnum | TreasureClaimScalarFieldEnum[]
  }

  /**
   * TreasureChest without action
   */
  export type TreasureChestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureChest
     */
    select?: TreasureChestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureChest
     */
    omit?: TreasureChestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureChestInclude<ExtArgs> | null
  }


  /**
   * Model TreasureClaim
   */

  export type AggregateTreasureClaim = {
    _count: TreasureClaimCountAggregateOutputType | null
    _avg: TreasureClaimAvgAggregateOutputType | null
    _sum: TreasureClaimSumAggregateOutputType | null
    _min: TreasureClaimMinAggregateOutputType | null
    _max: TreasureClaimMaxAggregateOutputType | null
  }

  export type TreasureClaimAvgAggregateOutputType = {
    amount: number | null
  }

  export type TreasureClaimSumAggregateOutputType = {
    amount: number | null
  }

  export type TreasureClaimMinAggregateOutputType = {
    id: string | null
    chestId: string | null
    userId: string | null
    amount: number | null
    createdAt: Date | null
  }

  export type TreasureClaimMaxAggregateOutputType = {
    id: string | null
    chestId: string | null
    userId: string | null
    amount: number | null
    createdAt: Date | null
  }

  export type TreasureClaimCountAggregateOutputType = {
    id: number
    chestId: number
    userId: number
    amount: number
    createdAt: number
    _all: number
  }


  export type TreasureClaimAvgAggregateInputType = {
    amount?: true
  }

  export type TreasureClaimSumAggregateInputType = {
    amount?: true
  }

  export type TreasureClaimMinAggregateInputType = {
    id?: true
    chestId?: true
    userId?: true
    amount?: true
    createdAt?: true
  }

  export type TreasureClaimMaxAggregateInputType = {
    id?: true
    chestId?: true
    userId?: true
    amount?: true
    createdAt?: true
  }

  export type TreasureClaimCountAggregateInputType = {
    id?: true
    chestId?: true
    userId?: true
    amount?: true
    createdAt?: true
    _all?: true
  }

  export type TreasureClaimAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TreasureClaim to aggregate.
     */
    where?: TreasureClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasureClaims to fetch.
     */
    orderBy?: TreasureClaimOrderByWithRelationInput | TreasureClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TreasureClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasureClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasureClaims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TreasureClaims
    **/
    _count?: true | TreasureClaimCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TreasureClaimAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TreasureClaimSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TreasureClaimMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TreasureClaimMaxAggregateInputType
  }

  export type GetTreasureClaimAggregateType<T extends TreasureClaimAggregateArgs> = {
        [P in keyof T & keyof AggregateTreasureClaim]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTreasureClaim[P]>
      : GetScalarType<T[P], AggregateTreasureClaim[P]>
  }




  export type TreasureClaimGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreasureClaimWhereInput
    orderBy?: TreasureClaimOrderByWithAggregationInput | TreasureClaimOrderByWithAggregationInput[]
    by: TreasureClaimScalarFieldEnum[] | TreasureClaimScalarFieldEnum
    having?: TreasureClaimScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TreasureClaimCountAggregateInputType | true
    _avg?: TreasureClaimAvgAggregateInputType
    _sum?: TreasureClaimSumAggregateInputType
    _min?: TreasureClaimMinAggregateInputType
    _max?: TreasureClaimMaxAggregateInputType
  }

  export type TreasureClaimGroupByOutputType = {
    id: string
    chestId: string
    userId: string
    amount: number
    createdAt: Date
    _count: TreasureClaimCountAggregateOutputType | null
    _avg: TreasureClaimAvgAggregateOutputType | null
    _sum: TreasureClaimSumAggregateOutputType | null
    _min: TreasureClaimMinAggregateOutputType | null
    _max: TreasureClaimMaxAggregateOutputType | null
  }

  type GetTreasureClaimGroupByPayload<T extends TreasureClaimGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TreasureClaimGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TreasureClaimGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TreasureClaimGroupByOutputType[P]>
            : GetScalarType<T[P], TreasureClaimGroupByOutputType[P]>
        }
      >
    >


  export type TreasureClaimSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chestId?: boolean
    userId?: boolean
    amount?: boolean
    createdAt?: boolean
    chest?: boolean | TreasureChestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["treasureClaim"]>

  export type TreasureClaimSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chestId?: boolean
    userId?: boolean
    amount?: boolean
    createdAt?: boolean
    chest?: boolean | TreasureChestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["treasureClaim"]>

  export type TreasureClaimSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chestId?: boolean
    userId?: boolean
    amount?: boolean
    createdAt?: boolean
    chest?: boolean | TreasureChestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["treasureClaim"]>

  export type TreasureClaimSelectScalar = {
    id?: boolean
    chestId?: boolean
    userId?: boolean
    amount?: boolean
    createdAt?: boolean
  }

  export type TreasureClaimOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chestId" | "userId" | "amount" | "createdAt", ExtArgs["result"]["treasureClaim"]>
  export type TreasureClaimInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chest?: boolean | TreasureChestDefaultArgs<ExtArgs>
  }
  export type TreasureClaimIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chest?: boolean | TreasureChestDefaultArgs<ExtArgs>
  }
  export type TreasureClaimIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chest?: boolean | TreasureChestDefaultArgs<ExtArgs>
  }

  export type $TreasureClaimPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TreasureClaim"
    objects: {
      chest: Prisma.$TreasureChestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chestId: string
      userId: string
      amount: number
      createdAt: Date
    }, ExtArgs["result"]["treasureClaim"]>
    composites: {}
  }

  type TreasureClaimGetPayload<S extends boolean | null | undefined | TreasureClaimDefaultArgs> = $Result.GetResult<Prisma.$TreasureClaimPayload, S>

  type TreasureClaimCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TreasureClaimFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TreasureClaimCountAggregateInputType | true
    }

  export interface TreasureClaimDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TreasureClaim'], meta: { name: 'TreasureClaim' } }
    /**
     * Find zero or one TreasureClaim that matches the filter.
     * @param {TreasureClaimFindUniqueArgs} args - Arguments to find a TreasureClaim
     * @example
     * // Get one TreasureClaim
     * const treasureClaim = await prisma.treasureClaim.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TreasureClaimFindUniqueArgs>(args: SelectSubset<T, TreasureClaimFindUniqueArgs<ExtArgs>>): Prisma__TreasureClaimClient<$Result.GetResult<Prisma.$TreasureClaimPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TreasureClaim that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TreasureClaimFindUniqueOrThrowArgs} args - Arguments to find a TreasureClaim
     * @example
     * // Get one TreasureClaim
     * const treasureClaim = await prisma.treasureClaim.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TreasureClaimFindUniqueOrThrowArgs>(args: SelectSubset<T, TreasureClaimFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TreasureClaimClient<$Result.GetResult<Prisma.$TreasureClaimPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TreasureClaim that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasureClaimFindFirstArgs} args - Arguments to find a TreasureClaim
     * @example
     * // Get one TreasureClaim
     * const treasureClaim = await prisma.treasureClaim.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TreasureClaimFindFirstArgs>(args?: SelectSubset<T, TreasureClaimFindFirstArgs<ExtArgs>>): Prisma__TreasureClaimClient<$Result.GetResult<Prisma.$TreasureClaimPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TreasureClaim that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasureClaimFindFirstOrThrowArgs} args - Arguments to find a TreasureClaim
     * @example
     * // Get one TreasureClaim
     * const treasureClaim = await prisma.treasureClaim.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TreasureClaimFindFirstOrThrowArgs>(args?: SelectSubset<T, TreasureClaimFindFirstOrThrowArgs<ExtArgs>>): Prisma__TreasureClaimClient<$Result.GetResult<Prisma.$TreasureClaimPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TreasureClaims that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasureClaimFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TreasureClaims
     * const treasureClaims = await prisma.treasureClaim.findMany()
     * 
     * // Get first 10 TreasureClaims
     * const treasureClaims = await prisma.treasureClaim.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const treasureClaimWithIdOnly = await prisma.treasureClaim.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TreasureClaimFindManyArgs>(args?: SelectSubset<T, TreasureClaimFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreasureClaimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TreasureClaim.
     * @param {TreasureClaimCreateArgs} args - Arguments to create a TreasureClaim.
     * @example
     * // Create one TreasureClaim
     * const TreasureClaim = await prisma.treasureClaim.create({
     *   data: {
     *     // ... data to create a TreasureClaim
     *   }
     * })
     * 
     */
    create<T extends TreasureClaimCreateArgs>(args: SelectSubset<T, TreasureClaimCreateArgs<ExtArgs>>): Prisma__TreasureClaimClient<$Result.GetResult<Prisma.$TreasureClaimPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TreasureClaims.
     * @param {TreasureClaimCreateManyArgs} args - Arguments to create many TreasureClaims.
     * @example
     * // Create many TreasureClaims
     * const treasureClaim = await prisma.treasureClaim.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TreasureClaimCreateManyArgs>(args?: SelectSubset<T, TreasureClaimCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TreasureClaims and returns the data saved in the database.
     * @param {TreasureClaimCreateManyAndReturnArgs} args - Arguments to create many TreasureClaims.
     * @example
     * // Create many TreasureClaims
     * const treasureClaim = await prisma.treasureClaim.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TreasureClaims and only return the `id`
     * const treasureClaimWithIdOnly = await prisma.treasureClaim.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TreasureClaimCreateManyAndReturnArgs>(args?: SelectSubset<T, TreasureClaimCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreasureClaimPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TreasureClaim.
     * @param {TreasureClaimDeleteArgs} args - Arguments to delete one TreasureClaim.
     * @example
     * // Delete one TreasureClaim
     * const TreasureClaim = await prisma.treasureClaim.delete({
     *   where: {
     *     // ... filter to delete one TreasureClaim
     *   }
     * })
     * 
     */
    delete<T extends TreasureClaimDeleteArgs>(args: SelectSubset<T, TreasureClaimDeleteArgs<ExtArgs>>): Prisma__TreasureClaimClient<$Result.GetResult<Prisma.$TreasureClaimPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TreasureClaim.
     * @param {TreasureClaimUpdateArgs} args - Arguments to update one TreasureClaim.
     * @example
     * // Update one TreasureClaim
     * const treasureClaim = await prisma.treasureClaim.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TreasureClaimUpdateArgs>(args: SelectSubset<T, TreasureClaimUpdateArgs<ExtArgs>>): Prisma__TreasureClaimClient<$Result.GetResult<Prisma.$TreasureClaimPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TreasureClaims.
     * @param {TreasureClaimDeleteManyArgs} args - Arguments to filter TreasureClaims to delete.
     * @example
     * // Delete a few TreasureClaims
     * const { count } = await prisma.treasureClaim.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TreasureClaimDeleteManyArgs>(args?: SelectSubset<T, TreasureClaimDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TreasureClaims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasureClaimUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TreasureClaims
     * const treasureClaim = await prisma.treasureClaim.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TreasureClaimUpdateManyArgs>(args: SelectSubset<T, TreasureClaimUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TreasureClaims and returns the data updated in the database.
     * @param {TreasureClaimUpdateManyAndReturnArgs} args - Arguments to update many TreasureClaims.
     * @example
     * // Update many TreasureClaims
     * const treasureClaim = await prisma.treasureClaim.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TreasureClaims and only return the `id`
     * const treasureClaimWithIdOnly = await prisma.treasureClaim.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TreasureClaimUpdateManyAndReturnArgs>(args: SelectSubset<T, TreasureClaimUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreasureClaimPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TreasureClaim.
     * @param {TreasureClaimUpsertArgs} args - Arguments to update or create a TreasureClaim.
     * @example
     * // Update or create a TreasureClaim
     * const treasureClaim = await prisma.treasureClaim.upsert({
     *   create: {
     *     // ... data to create a TreasureClaim
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TreasureClaim we want to update
     *   }
     * })
     */
    upsert<T extends TreasureClaimUpsertArgs>(args: SelectSubset<T, TreasureClaimUpsertArgs<ExtArgs>>): Prisma__TreasureClaimClient<$Result.GetResult<Prisma.$TreasureClaimPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TreasureClaims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasureClaimCountArgs} args - Arguments to filter TreasureClaims to count.
     * @example
     * // Count the number of TreasureClaims
     * const count = await prisma.treasureClaim.count({
     *   where: {
     *     // ... the filter for the TreasureClaims we want to count
     *   }
     * })
    **/
    count<T extends TreasureClaimCountArgs>(
      args?: Subset<T, TreasureClaimCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TreasureClaimCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TreasureClaim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasureClaimAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TreasureClaimAggregateArgs>(args: Subset<T, TreasureClaimAggregateArgs>): Prisma.PrismaPromise<GetTreasureClaimAggregateType<T>>

    /**
     * Group by TreasureClaim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasureClaimGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TreasureClaimGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TreasureClaimGroupByArgs['orderBy'] }
        : { orderBy?: TreasureClaimGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TreasureClaimGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTreasureClaimGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TreasureClaim model
   */
  readonly fields: TreasureClaimFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TreasureClaim.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TreasureClaimClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chest<T extends TreasureChestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TreasureChestDefaultArgs<ExtArgs>>): Prisma__TreasureChestClient<$Result.GetResult<Prisma.$TreasureChestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TreasureClaim model
   */
  interface TreasureClaimFieldRefs {
    readonly id: FieldRef<"TreasureClaim", 'String'>
    readonly chestId: FieldRef<"TreasureClaim", 'String'>
    readonly userId: FieldRef<"TreasureClaim", 'String'>
    readonly amount: FieldRef<"TreasureClaim", 'Int'>
    readonly createdAt: FieldRef<"TreasureClaim", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TreasureClaim findUnique
   */
  export type TreasureClaimFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureClaim
     */
    select?: TreasureClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureClaim
     */
    omit?: TreasureClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureClaimInclude<ExtArgs> | null
    /**
     * Filter, which TreasureClaim to fetch.
     */
    where: TreasureClaimWhereUniqueInput
  }

  /**
   * TreasureClaim findUniqueOrThrow
   */
  export type TreasureClaimFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureClaim
     */
    select?: TreasureClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureClaim
     */
    omit?: TreasureClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureClaimInclude<ExtArgs> | null
    /**
     * Filter, which TreasureClaim to fetch.
     */
    where: TreasureClaimWhereUniqueInput
  }

  /**
   * TreasureClaim findFirst
   */
  export type TreasureClaimFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureClaim
     */
    select?: TreasureClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureClaim
     */
    omit?: TreasureClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureClaimInclude<ExtArgs> | null
    /**
     * Filter, which TreasureClaim to fetch.
     */
    where?: TreasureClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasureClaims to fetch.
     */
    orderBy?: TreasureClaimOrderByWithRelationInput | TreasureClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TreasureClaims.
     */
    cursor?: TreasureClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasureClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasureClaims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TreasureClaims.
     */
    distinct?: TreasureClaimScalarFieldEnum | TreasureClaimScalarFieldEnum[]
  }

  /**
   * TreasureClaim findFirstOrThrow
   */
  export type TreasureClaimFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureClaim
     */
    select?: TreasureClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureClaim
     */
    omit?: TreasureClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureClaimInclude<ExtArgs> | null
    /**
     * Filter, which TreasureClaim to fetch.
     */
    where?: TreasureClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasureClaims to fetch.
     */
    orderBy?: TreasureClaimOrderByWithRelationInput | TreasureClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TreasureClaims.
     */
    cursor?: TreasureClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasureClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasureClaims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TreasureClaims.
     */
    distinct?: TreasureClaimScalarFieldEnum | TreasureClaimScalarFieldEnum[]
  }

  /**
   * TreasureClaim findMany
   */
  export type TreasureClaimFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureClaim
     */
    select?: TreasureClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureClaim
     */
    omit?: TreasureClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureClaimInclude<ExtArgs> | null
    /**
     * Filter, which TreasureClaims to fetch.
     */
    where?: TreasureClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasureClaims to fetch.
     */
    orderBy?: TreasureClaimOrderByWithRelationInput | TreasureClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TreasureClaims.
     */
    cursor?: TreasureClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasureClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasureClaims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TreasureClaims.
     */
    distinct?: TreasureClaimScalarFieldEnum | TreasureClaimScalarFieldEnum[]
  }

  /**
   * TreasureClaim create
   */
  export type TreasureClaimCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureClaim
     */
    select?: TreasureClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureClaim
     */
    omit?: TreasureClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureClaimInclude<ExtArgs> | null
    /**
     * The data needed to create a TreasureClaim.
     */
    data: XOR<TreasureClaimCreateInput, TreasureClaimUncheckedCreateInput>
  }

  /**
   * TreasureClaim createMany
   */
  export type TreasureClaimCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TreasureClaims.
     */
    data: TreasureClaimCreateManyInput | TreasureClaimCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TreasureClaim createManyAndReturn
   */
  export type TreasureClaimCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureClaim
     */
    select?: TreasureClaimSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureClaim
     */
    omit?: TreasureClaimOmit<ExtArgs> | null
    /**
     * The data used to create many TreasureClaims.
     */
    data: TreasureClaimCreateManyInput | TreasureClaimCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureClaimIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TreasureClaim update
   */
  export type TreasureClaimUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureClaim
     */
    select?: TreasureClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureClaim
     */
    omit?: TreasureClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureClaimInclude<ExtArgs> | null
    /**
     * The data needed to update a TreasureClaim.
     */
    data: XOR<TreasureClaimUpdateInput, TreasureClaimUncheckedUpdateInput>
    /**
     * Choose, which TreasureClaim to update.
     */
    where: TreasureClaimWhereUniqueInput
  }

  /**
   * TreasureClaim updateMany
   */
  export type TreasureClaimUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TreasureClaims.
     */
    data: XOR<TreasureClaimUpdateManyMutationInput, TreasureClaimUncheckedUpdateManyInput>
    /**
     * Filter which TreasureClaims to update
     */
    where?: TreasureClaimWhereInput
    /**
     * Limit how many TreasureClaims to update.
     */
    limit?: number
  }

  /**
   * TreasureClaim updateManyAndReturn
   */
  export type TreasureClaimUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureClaim
     */
    select?: TreasureClaimSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureClaim
     */
    omit?: TreasureClaimOmit<ExtArgs> | null
    /**
     * The data used to update TreasureClaims.
     */
    data: XOR<TreasureClaimUpdateManyMutationInput, TreasureClaimUncheckedUpdateManyInput>
    /**
     * Filter which TreasureClaims to update
     */
    where?: TreasureClaimWhereInput
    /**
     * Limit how many TreasureClaims to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureClaimIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TreasureClaim upsert
   */
  export type TreasureClaimUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureClaim
     */
    select?: TreasureClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureClaim
     */
    omit?: TreasureClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureClaimInclude<ExtArgs> | null
    /**
     * The filter to search for the TreasureClaim to update in case it exists.
     */
    where: TreasureClaimWhereUniqueInput
    /**
     * In case the TreasureClaim found by the `where` argument doesn't exist, create a new TreasureClaim with this data.
     */
    create: XOR<TreasureClaimCreateInput, TreasureClaimUncheckedCreateInput>
    /**
     * In case the TreasureClaim was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TreasureClaimUpdateInput, TreasureClaimUncheckedUpdateInput>
  }

  /**
   * TreasureClaim delete
   */
  export type TreasureClaimDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureClaim
     */
    select?: TreasureClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureClaim
     */
    omit?: TreasureClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureClaimInclude<ExtArgs> | null
    /**
     * Filter which TreasureClaim to delete.
     */
    where: TreasureClaimWhereUniqueInput
  }

  /**
   * TreasureClaim deleteMany
   */
  export type TreasureClaimDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TreasureClaims to delete
     */
    where?: TreasureClaimWhereInput
    /**
     * Limit how many TreasureClaims to delete.
     */
    limit?: number
  }

  /**
   * TreasureClaim without action
   */
  export type TreasureClaimDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasureClaim
     */
    select?: TreasureClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasureClaim
     */
    omit?: TreasureClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasureClaimInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    displayName: 'displayName',
    avatarUrl: 'avatarUrl',
    email: 'email',
    googleId: 'googleId',
    role: 'role',
    starBalance: 'starBalance',
    starsGifted: 'starsGifted',
    starsEarned: 'starsEarned',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StreamScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    category: 'category',
    status: 'status',
    viewerCount: 'viewerCount',
    totalStars: 'totalStars',
    streamerId: 'streamerId',
    createdAt: 'createdAt',
    endedAt: 'endedAt'
  };

  export type StreamScalarFieldEnum = (typeof StreamScalarFieldEnum)[keyof typeof StreamScalarFieldEnum]


  export const GiftTransactionScalarFieldEnum: {
    id: 'id',
    streamId: 'streamId',
    senderId: 'senderId',
    receiverId: 'receiverId',
    starAmount: 'starAmount',
    message: 'message',
    createdAt: 'createdAt'
  };

  export type GiftTransactionScalarFieldEnum = (typeof GiftTransactionScalarFieldEnum)[keyof typeof GiftTransactionScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    streamId: 'streamId',
    senderId: 'senderId',
    text: 'text',
    isGift: 'isGift',
    giftStars: 'giftStars',
    createdAt: 'createdAt'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const StreamGoalScalarFieldEnum: {
    id: 'id',
    streamId: 'streamId',
    title: 'title',
    targetStars: 'targetStars',
    currentStars: 'currentStars',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type StreamGoalScalarFieldEnum = (typeof StreamGoalScalarFieldEnum)[keyof typeof StreamGoalScalarFieldEnum]


  export const PKBattleScalarFieldEnum: {
    id: 'id',
    status: 'status',
    streamId1: 'streamId1',
    streamId2: 'streamId2',
    score1: 'score1',
    score2: 'score2',
    startTime: 'startTime',
    endTime: 'endTime',
    winnerId: 'winnerId',
    createdAt: 'createdAt'
  };

  export type PKBattleScalarFieldEnum = (typeof PKBattleScalarFieldEnum)[keyof typeof PKBattleScalarFieldEnum]


  export const TreasureChestScalarFieldEnum: {
    id: 'id',
    streamId: 'streamId',
    creatorId: 'creatorId',
    totalStars: 'totalStars',
    remainingStars: 'remainingStars',
    totalSlots: 'totalSlots',
    remainingSlots: 'remainingSlots',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type TreasureChestScalarFieldEnum = (typeof TreasureChestScalarFieldEnum)[keyof typeof TreasureChestScalarFieldEnum]


  export const TreasureClaimScalarFieldEnum: {
    id: 'id',
    chestId: 'chestId',
    userId: 'userId',
    amount: 'amount',
    createdAt: 'createdAt'
  };

  export type TreasureClaimScalarFieldEnum = (typeof TreasureClaimScalarFieldEnum)[keyof typeof TreasureClaimScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    displayName?: StringFilter<"User"> | string
    avatarUrl?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    googleId?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    starBalance?: IntFilter<"User"> | number
    starsGifted?: IntFilter<"User"> | number
    starsEarned?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    streams?: StreamListRelationFilter
    sentGifts?: GiftTransactionListRelationFilter
    receivedGifts?: GiftTransactionListRelationFilter
    comments?: CommentListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    email?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    role?: SortOrder
    starBalance?: SortOrder
    starsGifted?: SortOrder
    starsEarned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    streams?: StreamOrderByRelationAggregateInput
    sentGifts?: GiftTransactionOrderByRelationAggregateInput
    receivedGifts?: GiftTransactionOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    googleId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    displayName?: StringFilter<"User"> | string
    avatarUrl?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    starBalance?: IntFilter<"User"> | number
    starsGifted?: IntFilter<"User"> | number
    starsEarned?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    streams?: StreamListRelationFilter
    sentGifts?: GiftTransactionListRelationFilter
    receivedGifts?: GiftTransactionListRelationFilter
    comments?: CommentListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id" | "username" | "email" | "googleId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    email?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    role?: SortOrder
    starBalance?: SortOrder
    starsGifted?: SortOrder
    starsEarned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    displayName?: StringWithAggregatesFilter<"User"> | string
    avatarUrl?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    googleId?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    starBalance?: IntWithAggregatesFilter<"User"> | number
    starsGifted?: IntWithAggregatesFilter<"User"> | number
    starsEarned?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type StreamWhereInput = {
    AND?: StreamWhereInput | StreamWhereInput[]
    OR?: StreamWhereInput[]
    NOT?: StreamWhereInput | StreamWhereInput[]
    id?: StringFilter<"Stream"> | string
    title?: StringFilter<"Stream"> | string
    description?: StringNullableFilter<"Stream"> | string | null
    category?: StringFilter<"Stream"> | string
    status?: StringFilter<"Stream"> | string
    viewerCount?: IntFilter<"Stream"> | number
    totalStars?: IntFilter<"Stream"> | number
    streamerId?: StringFilter<"Stream"> | string
    createdAt?: DateTimeFilter<"Stream"> | Date | string
    endedAt?: DateTimeNullableFilter<"Stream"> | Date | string | null
    streamer?: XOR<UserScalarRelationFilter, UserWhereInput>
    goals?: StreamGoalListRelationFilter
    pkBattles1?: PKBattleListRelationFilter
    pkBattles2?: PKBattleListRelationFilter
    chests?: TreasureChestListRelationFilter
    comments?: CommentListRelationFilter
    gifts?: GiftTransactionListRelationFilter
  }

  export type StreamOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    status?: SortOrder
    viewerCount?: SortOrder
    totalStars?: SortOrder
    streamerId?: SortOrder
    createdAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    streamer?: UserOrderByWithRelationInput
    goals?: StreamGoalOrderByRelationAggregateInput
    pkBattles1?: PKBattleOrderByRelationAggregateInput
    pkBattles2?: PKBattleOrderByRelationAggregateInput
    chests?: TreasureChestOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    gifts?: GiftTransactionOrderByRelationAggregateInput
  }

  export type StreamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StreamWhereInput | StreamWhereInput[]
    OR?: StreamWhereInput[]
    NOT?: StreamWhereInput | StreamWhereInput[]
    title?: StringFilter<"Stream"> | string
    description?: StringNullableFilter<"Stream"> | string | null
    category?: StringFilter<"Stream"> | string
    status?: StringFilter<"Stream"> | string
    viewerCount?: IntFilter<"Stream"> | number
    totalStars?: IntFilter<"Stream"> | number
    streamerId?: StringFilter<"Stream"> | string
    createdAt?: DateTimeFilter<"Stream"> | Date | string
    endedAt?: DateTimeNullableFilter<"Stream"> | Date | string | null
    streamer?: XOR<UserScalarRelationFilter, UserWhereInput>
    goals?: StreamGoalListRelationFilter
    pkBattles1?: PKBattleListRelationFilter
    pkBattles2?: PKBattleListRelationFilter
    chests?: TreasureChestListRelationFilter
    comments?: CommentListRelationFilter
    gifts?: GiftTransactionListRelationFilter
  }, "id">

  export type StreamOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    status?: SortOrder
    viewerCount?: SortOrder
    totalStars?: SortOrder
    streamerId?: SortOrder
    createdAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    _count?: StreamCountOrderByAggregateInput
    _avg?: StreamAvgOrderByAggregateInput
    _max?: StreamMaxOrderByAggregateInput
    _min?: StreamMinOrderByAggregateInput
    _sum?: StreamSumOrderByAggregateInput
  }

  export type StreamScalarWhereWithAggregatesInput = {
    AND?: StreamScalarWhereWithAggregatesInput | StreamScalarWhereWithAggregatesInput[]
    OR?: StreamScalarWhereWithAggregatesInput[]
    NOT?: StreamScalarWhereWithAggregatesInput | StreamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Stream"> | string
    title?: StringWithAggregatesFilter<"Stream"> | string
    description?: StringNullableWithAggregatesFilter<"Stream"> | string | null
    category?: StringWithAggregatesFilter<"Stream"> | string
    status?: StringWithAggregatesFilter<"Stream"> | string
    viewerCount?: IntWithAggregatesFilter<"Stream"> | number
    totalStars?: IntWithAggregatesFilter<"Stream"> | number
    streamerId?: StringWithAggregatesFilter<"Stream"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Stream"> | Date | string
    endedAt?: DateTimeNullableWithAggregatesFilter<"Stream"> | Date | string | null
  }

  export type GiftTransactionWhereInput = {
    AND?: GiftTransactionWhereInput | GiftTransactionWhereInput[]
    OR?: GiftTransactionWhereInput[]
    NOT?: GiftTransactionWhereInput | GiftTransactionWhereInput[]
    id?: StringFilter<"GiftTransaction"> | string
    streamId?: StringFilter<"GiftTransaction"> | string
    senderId?: StringFilter<"GiftTransaction"> | string
    receiverId?: StringFilter<"GiftTransaction"> | string
    starAmount?: IntFilter<"GiftTransaction"> | number
    message?: StringNullableFilter<"GiftTransaction"> | string | null
    createdAt?: DateTimeFilter<"GiftTransaction"> | Date | string
    stream?: XOR<StreamScalarRelationFilter, StreamWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type GiftTransactionOrderByWithRelationInput = {
    id?: SortOrder
    streamId?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    starAmount?: SortOrder
    message?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    stream?: StreamOrderByWithRelationInput
    sender?: UserOrderByWithRelationInput
    receiver?: UserOrderByWithRelationInput
  }

  export type GiftTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GiftTransactionWhereInput | GiftTransactionWhereInput[]
    OR?: GiftTransactionWhereInput[]
    NOT?: GiftTransactionWhereInput | GiftTransactionWhereInput[]
    streamId?: StringFilter<"GiftTransaction"> | string
    senderId?: StringFilter<"GiftTransaction"> | string
    receiverId?: StringFilter<"GiftTransaction"> | string
    starAmount?: IntFilter<"GiftTransaction"> | number
    message?: StringNullableFilter<"GiftTransaction"> | string | null
    createdAt?: DateTimeFilter<"GiftTransaction"> | Date | string
    stream?: XOR<StreamScalarRelationFilter, StreamWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type GiftTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    streamId?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    starAmount?: SortOrder
    message?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: GiftTransactionCountOrderByAggregateInput
    _avg?: GiftTransactionAvgOrderByAggregateInput
    _max?: GiftTransactionMaxOrderByAggregateInput
    _min?: GiftTransactionMinOrderByAggregateInput
    _sum?: GiftTransactionSumOrderByAggregateInput
  }

  export type GiftTransactionScalarWhereWithAggregatesInput = {
    AND?: GiftTransactionScalarWhereWithAggregatesInput | GiftTransactionScalarWhereWithAggregatesInput[]
    OR?: GiftTransactionScalarWhereWithAggregatesInput[]
    NOT?: GiftTransactionScalarWhereWithAggregatesInput | GiftTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GiftTransaction"> | string
    streamId?: StringWithAggregatesFilter<"GiftTransaction"> | string
    senderId?: StringWithAggregatesFilter<"GiftTransaction"> | string
    receiverId?: StringWithAggregatesFilter<"GiftTransaction"> | string
    starAmount?: IntWithAggregatesFilter<"GiftTransaction"> | number
    message?: StringNullableWithAggregatesFilter<"GiftTransaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GiftTransaction"> | Date | string
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: StringFilter<"Comment"> | string
    streamId?: StringFilter<"Comment"> | string
    senderId?: StringFilter<"Comment"> | string
    text?: StringFilter<"Comment"> | string
    isGift?: BoolFilter<"Comment"> | boolean
    giftStars?: IntNullableFilter<"Comment"> | number | null
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    stream?: XOR<StreamScalarRelationFilter, StreamWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    streamId?: SortOrder
    senderId?: SortOrder
    text?: SortOrder
    isGift?: SortOrder
    giftStars?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    stream?: StreamOrderByWithRelationInput
    sender?: UserOrderByWithRelationInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    streamId?: StringFilter<"Comment"> | string
    senderId?: StringFilter<"Comment"> | string
    text?: StringFilter<"Comment"> | string
    isGift?: BoolFilter<"Comment"> | boolean
    giftStars?: IntNullableFilter<"Comment"> | number | null
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    stream?: XOR<StreamScalarRelationFilter, StreamWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    streamId?: SortOrder
    senderId?: SortOrder
    text?: SortOrder
    isGift?: SortOrder
    giftStars?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _avg?: CommentAvgOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
    _sum?: CommentSumOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Comment"> | string
    streamId?: StringWithAggregatesFilter<"Comment"> | string
    senderId?: StringWithAggregatesFilter<"Comment"> | string
    text?: StringWithAggregatesFilter<"Comment"> | string
    isGift?: BoolWithAggregatesFilter<"Comment"> | boolean
    giftStars?: IntNullableWithAggregatesFilter<"Comment"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type StreamGoalWhereInput = {
    AND?: StreamGoalWhereInput | StreamGoalWhereInput[]
    OR?: StreamGoalWhereInput[]
    NOT?: StreamGoalWhereInput | StreamGoalWhereInput[]
    id?: StringFilter<"StreamGoal"> | string
    streamId?: StringFilter<"StreamGoal"> | string
    title?: StringFilter<"StreamGoal"> | string
    targetStars?: IntFilter<"StreamGoal"> | number
    currentStars?: IntFilter<"StreamGoal"> | number
    status?: StringFilter<"StreamGoal"> | string
    createdAt?: DateTimeFilter<"StreamGoal"> | Date | string
    stream?: XOR<StreamScalarRelationFilter, StreamWhereInput>
  }

  export type StreamGoalOrderByWithRelationInput = {
    id?: SortOrder
    streamId?: SortOrder
    title?: SortOrder
    targetStars?: SortOrder
    currentStars?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    stream?: StreamOrderByWithRelationInput
  }

  export type StreamGoalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StreamGoalWhereInput | StreamGoalWhereInput[]
    OR?: StreamGoalWhereInput[]
    NOT?: StreamGoalWhereInput | StreamGoalWhereInput[]
    streamId?: StringFilter<"StreamGoal"> | string
    title?: StringFilter<"StreamGoal"> | string
    targetStars?: IntFilter<"StreamGoal"> | number
    currentStars?: IntFilter<"StreamGoal"> | number
    status?: StringFilter<"StreamGoal"> | string
    createdAt?: DateTimeFilter<"StreamGoal"> | Date | string
    stream?: XOR<StreamScalarRelationFilter, StreamWhereInput>
  }, "id">

  export type StreamGoalOrderByWithAggregationInput = {
    id?: SortOrder
    streamId?: SortOrder
    title?: SortOrder
    targetStars?: SortOrder
    currentStars?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: StreamGoalCountOrderByAggregateInput
    _avg?: StreamGoalAvgOrderByAggregateInput
    _max?: StreamGoalMaxOrderByAggregateInput
    _min?: StreamGoalMinOrderByAggregateInput
    _sum?: StreamGoalSumOrderByAggregateInput
  }

  export type StreamGoalScalarWhereWithAggregatesInput = {
    AND?: StreamGoalScalarWhereWithAggregatesInput | StreamGoalScalarWhereWithAggregatesInput[]
    OR?: StreamGoalScalarWhereWithAggregatesInput[]
    NOT?: StreamGoalScalarWhereWithAggregatesInput | StreamGoalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StreamGoal"> | string
    streamId?: StringWithAggregatesFilter<"StreamGoal"> | string
    title?: StringWithAggregatesFilter<"StreamGoal"> | string
    targetStars?: IntWithAggregatesFilter<"StreamGoal"> | number
    currentStars?: IntWithAggregatesFilter<"StreamGoal"> | number
    status?: StringWithAggregatesFilter<"StreamGoal"> | string
    createdAt?: DateTimeWithAggregatesFilter<"StreamGoal"> | Date | string
  }

  export type PKBattleWhereInput = {
    AND?: PKBattleWhereInput | PKBattleWhereInput[]
    OR?: PKBattleWhereInput[]
    NOT?: PKBattleWhereInput | PKBattleWhereInput[]
    id?: StringFilter<"PKBattle"> | string
    status?: StringFilter<"PKBattle"> | string
    streamId1?: StringFilter<"PKBattle"> | string
    streamId2?: StringFilter<"PKBattle"> | string
    score1?: IntFilter<"PKBattle"> | number
    score2?: IntFilter<"PKBattle"> | number
    startTime?: DateTimeNullableFilter<"PKBattle"> | Date | string | null
    endTime?: DateTimeNullableFilter<"PKBattle"> | Date | string | null
    winnerId?: StringNullableFilter<"PKBattle"> | string | null
    createdAt?: DateTimeFilter<"PKBattle"> | Date | string
    stream1?: XOR<StreamScalarRelationFilter, StreamWhereInput>
    stream2?: XOR<StreamScalarRelationFilter, StreamWhereInput>
  }

  export type PKBattleOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    streamId1?: SortOrder
    streamId2?: SortOrder
    score1?: SortOrder
    score2?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    winnerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    stream1?: StreamOrderByWithRelationInput
    stream2?: StreamOrderByWithRelationInput
  }

  export type PKBattleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PKBattleWhereInput | PKBattleWhereInput[]
    OR?: PKBattleWhereInput[]
    NOT?: PKBattleWhereInput | PKBattleWhereInput[]
    status?: StringFilter<"PKBattle"> | string
    streamId1?: StringFilter<"PKBattle"> | string
    streamId2?: StringFilter<"PKBattle"> | string
    score1?: IntFilter<"PKBattle"> | number
    score2?: IntFilter<"PKBattle"> | number
    startTime?: DateTimeNullableFilter<"PKBattle"> | Date | string | null
    endTime?: DateTimeNullableFilter<"PKBattle"> | Date | string | null
    winnerId?: StringNullableFilter<"PKBattle"> | string | null
    createdAt?: DateTimeFilter<"PKBattle"> | Date | string
    stream1?: XOR<StreamScalarRelationFilter, StreamWhereInput>
    stream2?: XOR<StreamScalarRelationFilter, StreamWhereInput>
  }, "id">

  export type PKBattleOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    streamId1?: SortOrder
    streamId2?: SortOrder
    score1?: SortOrder
    score2?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    winnerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PKBattleCountOrderByAggregateInput
    _avg?: PKBattleAvgOrderByAggregateInput
    _max?: PKBattleMaxOrderByAggregateInput
    _min?: PKBattleMinOrderByAggregateInput
    _sum?: PKBattleSumOrderByAggregateInput
  }

  export type PKBattleScalarWhereWithAggregatesInput = {
    AND?: PKBattleScalarWhereWithAggregatesInput | PKBattleScalarWhereWithAggregatesInput[]
    OR?: PKBattleScalarWhereWithAggregatesInput[]
    NOT?: PKBattleScalarWhereWithAggregatesInput | PKBattleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PKBattle"> | string
    status?: StringWithAggregatesFilter<"PKBattle"> | string
    streamId1?: StringWithAggregatesFilter<"PKBattle"> | string
    streamId2?: StringWithAggregatesFilter<"PKBattle"> | string
    score1?: IntWithAggregatesFilter<"PKBattle"> | number
    score2?: IntWithAggregatesFilter<"PKBattle"> | number
    startTime?: DateTimeNullableWithAggregatesFilter<"PKBattle"> | Date | string | null
    endTime?: DateTimeNullableWithAggregatesFilter<"PKBattle"> | Date | string | null
    winnerId?: StringNullableWithAggregatesFilter<"PKBattle"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PKBattle"> | Date | string
  }

  export type TreasureChestWhereInput = {
    AND?: TreasureChestWhereInput | TreasureChestWhereInput[]
    OR?: TreasureChestWhereInput[]
    NOT?: TreasureChestWhereInput | TreasureChestWhereInput[]
    id?: StringFilter<"TreasureChest"> | string
    streamId?: StringFilter<"TreasureChest"> | string
    creatorId?: StringFilter<"TreasureChest"> | string
    totalStars?: IntFilter<"TreasureChest"> | number
    remainingStars?: IntFilter<"TreasureChest"> | number
    totalSlots?: IntFilter<"TreasureChest"> | number
    remainingSlots?: IntFilter<"TreasureChest"> | number
    expiresAt?: DateTimeFilter<"TreasureChest"> | Date | string
    createdAt?: DateTimeFilter<"TreasureChest"> | Date | string
    stream?: XOR<StreamScalarRelationFilter, StreamWhereInput>
    claims?: TreasureClaimListRelationFilter
  }

  export type TreasureChestOrderByWithRelationInput = {
    id?: SortOrder
    streamId?: SortOrder
    creatorId?: SortOrder
    totalStars?: SortOrder
    remainingStars?: SortOrder
    totalSlots?: SortOrder
    remainingSlots?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    stream?: StreamOrderByWithRelationInput
    claims?: TreasureClaimOrderByRelationAggregateInput
  }

  export type TreasureChestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TreasureChestWhereInput | TreasureChestWhereInput[]
    OR?: TreasureChestWhereInput[]
    NOT?: TreasureChestWhereInput | TreasureChestWhereInput[]
    streamId?: StringFilter<"TreasureChest"> | string
    creatorId?: StringFilter<"TreasureChest"> | string
    totalStars?: IntFilter<"TreasureChest"> | number
    remainingStars?: IntFilter<"TreasureChest"> | number
    totalSlots?: IntFilter<"TreasureChest"> | number
    remainingSlots?: IntFilter<"TreasureChest"> | number
    expiresAt?: DateTimeFilter<"TreasureChest"> | Date | string
    createdAt?: DateTimeFilter<"TreasureChest"> | Date | string
    stream?: XOR<StreamScalarRelationFilter, StreamWhereInput>
    claims?: TreasureClaimListRelationFilter
  }, "id">

  export type TreasureChestOrderByWithAggregationInput = {
    id?: SortOrder
    streamId?: SortOrder
    creatorId?: SortOrder
    totalStars?: SortOrder
    remainingStars?: SortOrder
    totalSlots?: SortOrder
    remainingSlots?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: TreasureChestCountOrderByAggregateInput
    _avg?: TreasureChestAvgOrderByAggregateInput
    _max?: TreasureChestMaxOrderByAggregateInput
    _min?: TreasureChestMinOrderByAggregateInput
    _sum?: TreasureChestSumOrderByAggregateInput
  }

  export type TreasureChestScalarWhereWithAggregatesInput = {
    AND?: TreasureChestScalarWhereWithAggregatesInput | TreasureChestScalarWhereWithAggregatesInput[]
    OR?: TreasureChestScalarWhereWithAggregatesInput[]
    NOT?: TreasureChestScalarWhereWithAggregatesInput | TreasureChestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TreasureChest"> | string
    streamId?: StringWithAggregatesFilter<"TreasureChest"> | string
    creatorId?: StringWithAggregatesFilter<"TreasureChest"> | string
    totalStars?: IntWithAggregatesFilter<"TreasureChest"> | number
    remainingStars?: IntWithAggregatesFilter<"TreasureChest"> | number
    totalSlots?: IntWithAggregatesFilter<"TreasureChest"> | number
    remainingSlots?: IntWithAggregatesFilter<"TreasureChest"> | number
    expiresAt?: DateTimeWithAggregatesFilter<"TreasureChest"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"TreasureChest"> | Date | string
  }

  export type TreasureClaimWhereInput = {
    AND?: TreasureClaimWhereInput | TreasureClaimWhereInput[]
    OR?: TreasureClaimWhereInput[]
    NOT?: TreasureClaimWhereInput | TreasureClaimWhereInput[]
    id?: StringFilter<"TreasureClaim"> | string
    chestId?: StringFilter<"TreasureClaim"> | string
    userId?: StringFilter<"TreasureClaim"> | string
    amount?: IntFilter<"TreasureClaim"> | number
    createdAt?: DateTimeFilter<"TreasureClaim"> | Date | string
    chest?: XOR<TreasureChestScalarRelationFilter, TreasureChestWhereInput>
  }

  export type TreasureClaimOrderByWithRelationInput = {
    id?: SortOrder
    chestId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    chest?: TreasureChestOrderByWithRelationInput
  }

  export type TreasureClaimWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TreasureClaimWhereInput | TreasureClaimWhereInput[]
    OR?: TreasureClaimWhereInput[]
    NOT?: TreasureClaimWhereInput | TreasureClaimWhereInput[]
    chestId?: StringFilter<"TreasureClaim"> | string
    userId?: StringFilter<"TreasureClaim"> | string
    amount?: IntFilter<"TreasureClaim"> | number
    createdAt?: DateTimeFilter<"TreasureClaim"> | Date | string
    chest?: XOR<TreasureChestScalarRelationFilter, TreasureChestWhereInput>
  }, "id">

  export type TreasureClaimOrderByWithAggregationInput = {
    id?: SortOrder
    chestId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    _count?: TreasureClaimCountOrderByAggregateInput
    _avg?: TreasureClaimAvgOrderByAggregateInput
    _max?: TreasureClaimMaxOrderByAggregateInput
    _min?: TreasureClaimMinOrderByAggregateInput
    _sum?: TreasureClaimSumOrderByAggregateInput
  }

  export type TreasureClaimScalarWhereWithAggregatesInput = {
    AND?: TreasureClaimScalarWhereWithAggregatesInput | TreasureClaimScalarWhereWithAggregatesInput[]
    OR?: TreasureClaimScalarWhereWithAggregatesInput[]
    NOT?: TreasureClaimScalarWhereWithAggregatesInput | TreasureClaimScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TreasureClaim"> | string
    chestId?: StringWithAggregatesFilter<"TreasureClaim"> | string
    userId?: StringWithAggregatesFilter<"TreasureClaim"> | string
    amount?: IntWithAggregatesFilter<"TreasureClaim"> | number
    createdAt?: DateTimeWithAggregatesFilter<"TreasureClaim"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    displayName: string
    avatarUrl: string
    email?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    starBalance?: number
    starsGifted?: number
    starsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    streams?: StreamCreateNestedManyWithoutStreamerInput
    sentGifts?: GiftTransactionCreateNestedManyWithoutSenderInput
    receivedGifts?: GiftTransactionCreateNestedManyWithoutReceiverInput
    comments?: CommentCreateNestedManyWithoutSenderInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    displayName: string
    avatarUrl: string
    email?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    starBalance?: number
    starsGifted?: number
    starsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    streams?: StreamUncheckedCreateNestedManyWithoutStreamerInput
    sentGifts?: GiftTransactionUncheckedCreateNestedManyWithoutSenderInput
    receivedGifts?: GiftTransactionUncheckedCreateNestedManyWithoutReceiverInput
    comments?: CommentUncheckedCreateNestedManyWithoutSenderInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    starBalance?: IntFieldUpdateOperationsInput | number
    starsGifted?: IntFieldUpdateOperationsInput | number
    starsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    streams?: StreamUpdateManyWithoutStreamerNestedInput
    sentGifts?: GiftTransactionUpdateManyWithoutSenderNestedInput
    receivedGifts?: GiftTransactionUpdateManyWithoutReceiverNestedInput
    comments?: CommentUpdateManyWithoutSenderNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    starBalance?: IntFieldUpdateOperationsInput | number
    starsGifted?: IntFieldUpdateOperationsInput | number
    starsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    streams?: StreamUncheckedUpdateManyWithoutStreamerNestedInput
    sentGifts?: GiftTransactionUncheckedUpdateManyWithoutSenderNestedInput
    receivedGifts?: GiftTransactionUncheckedUpdateManyWithoutReceiverNestedInput
    comments?: CommentUncheckedUpdateManyWithoutSenderNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    displayName: string
    avatarUrl: string
    email?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    starBalance?: number
    starsGifted?: number
    starsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    starBalance?: IntFieldUpdateOperationsInput | number
    starsGifted?: IntFieldUpdateOperationsInput | number
    starsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    starBalance?: IntFieldUpdateOperationsInput | number
    starsGifted?: IntFieldUpdateOperationsInput | number
    starsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamCreateInput = {
    id?: string
    title: string
    description?: string | null
    category?: string
    status?: string
    viewerCount?: number
    totalStars?: number
    createdAt?: Date | string
    endedAt?: Date | string | null
    streamer: UserCreateNestedOneWithoutStreamsInput
    goals?: StreamGoalCreateNestedManyWithoutStreamInput
    pkBattles1?: PKBattleCreateNestedManyWithoutStream1Input
    pkBattles2?: PKBattleCreateNestedManyWithoutStream2Input
    chests?: TreasureChestCreateNestedManyWithoutStreamInput
    comments?: CommentCreateNestedManyWithoutStreamInput
    gifts?: GiftTransactionCreateNestedManyWithoutStreamInput
  }

  export type StreamUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    category?: string
    status?: string
    viewerCount?: number
    totalStars?: number
    streamerId: string
    createdAt?: Date | string
    endedAt?: Date | string | null
    goals?: StreamGoalUncheckedCreateNestedManyWithoutStreamInput
    pkBattles1?: PKBattleUncheckedCreateNestedManyWithoutStream1Input
    pkBattles2?: PKBattleUncheckedCreateNestedManyWithoutStream2Input
    chests?: TreasureChestUncheckedCreateNestedManyWithoutStreamInput
    comments?: CommentUncheckedCreateNestedManyWithoutStreamInput
    gifts?: GiftTransactionUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streamer?: UserUpdateOneRequiredWithoutStreamsNestedInput
    goals?: StreamGoalUpdateManyWithoutStreamNestedInput
    pkBattles1?: PKBattleUpdateManyWithoutStream1NestedInput
    pkBattles2?: PKBattleUpdateManyWithoutStream2NestedInput
    chests?: TreasureChestUpdateManyWithoutStreamNestedInput
    comments?: CommentUpdateManyWithoutStreamNestedInput
    gifts?: GiftTransactionUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    streamerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    goals?: StreamGoalUncheckedUpdateManyWithoutStreamNestedInput
    pkBattles1?: PKBattleUncheckedUpdateManyWithoutStream1NestedInput
    pkBattles2?: PKBattleUncheckedUpdateManyWithoutStream2NestedInput
    chests?: TreasureChestUncheckedUpdateManyWithoutStreamNestedInput
    comments?: CommentUncheckedUpdateManyWithoutStreamNestedInput
    gifts?: GiftTransactionUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type StreamCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    category?: string
    status?: string
    viewerCount?: number
    totalStars?: number
    streamerId: string
    createdAt?: Date | string
    endedAt?: Date | string | null
  }

  export type StreamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StreamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    streamerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GiftTransactionCreateInput = {
    id?: string
    starAmount: number
    message?: string | null
    createdAt?: Date | string
    stream: StreamCreateNestedOneWithoutGiftsInput
    sender: UserCreateNestedOneWithoutSentGiftsInput
    receiver: UserCreateNestedOneWithoutReceivedGiftsInput
  }

  export type GiftTransactionUncheckedCreateInput = {
    id?: string
    streamId: string
    senderId: string
    receiverId: string
    starAmount: number
    message?: string | null
    createdAt?: Date | string
  }

  export type GiftTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    starAmount?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneRequiredWithoutGiftsNestedInput
    sender?: UserUpdateOneRequiredWithoutSentGiftsNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedGiftsNestedInput
  }

  export type GiftTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    starAmount?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GiftTransactionCreateManyInput = {
    id?: string
    streamId: string
    senderId: string
    receiverId: string
    starAmount: number
    message?: string | null
    createdAt?: Date | string
  }

  export type GiftTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    starAmount?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GiftTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    starAmount?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateInput = {
    id?: string
    text: string
    isGift?: boolean
    giftStars?: number | null
    createdAt?: Date | string
    stream: StreamCreateNestedOneWithoutCommentsInput
    sender: UserCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    id?: string
    streamId: string
    senderId: string
    text: string
    isGift?: boolean
    giftStars?: number | null
    createdAt?: Date | string
  }

  export type CommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftStars?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneRequiredWithoutCommentsNestedInput
    sender?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftStars?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateManyInput = {
    id?: string
    streamId: string
    senderId: string
    text: string
    isGift?: boolean
    giftStars?: number | null
    createdAt?: Date | string
  }

  export type CommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftStars?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftStars?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    expiresAt: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    userId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamGoalCreateInput = {
    id?: string
    title: string
    targetStars: number
    currentStars?: number
    status?: string
    createdAt?: Date | string
    stream: StreamCreateNestedOneWithoutGoalsInput
  }

  export type StreamGoalUncheckedCreateInput = {
    id?: string
    streamId: string
    title: string
    targetStars: number
    currentStars?: number
    status?: string
    createdAt?: Date | string
  }

  export type StreamGoalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    targetStars?: IntFieldUpdateOperationsInput | number
    currentStars?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneRequiredWithoutGoalsNestedInput
  }

  export type StreamGoalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    targetStars?: IntFieldUpdateOperationsInput | number
    currentStars?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamGoalCreateManyInput = {
    id?: string
    streamId: string
    title: string
    targetStars: number
    currentStars?: number
    status?: string
    createdAt?: Date | string
  }

  export type StreamGoalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    targetStars?: IntFieldUpdateOperationsInput | number
    currentStars?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamGoalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    targetStars?: IntFieldUpdateOperationsInput | number
    currentStars?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PKBattleCreateInput = {
    id?: string
    status?: string
    score1?: number
    score2?: number
    startTime?: Date | string | null
    endTime?: Date | string | null
    winnerId?: string | null
    createdAt?: Date | string
    stream1: StreamCreateNestedOneWithoutPkBattles1Input
    stream2: StreamCreateNestedOneWithoutPkBattles2Input
  }

  export type PKBattleUncheckedCreateInput = {
    id?: string
    status?: string
    streamId1: string
    streamId2: string
    score1?: number
    score2?: number
    startTime?: Date | string | null
    endTime?: Date | string | null
    winnerId?: string | null
    createdAt?: Date | string
  }

  export type PKBattleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    score1?: IntFieldUpdateOperationsInput | number
    score2?: IntFieldUpdateOperationsInput | number
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream1?: StreamUpdateOneRequiredWithoutPkBattles1NestedInput
    stream2?: StreamUpdateOneRequiredWithoutPkBattles2NestedInput
  }

  export type PKBattleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    streamId1?: StringFieldUpdateOperationsInput | string
    streamId2?: StringFieldUpdateOperationsInput | string
    score1?: IntFieldUpdateOperationsInput | number
    score2?: IntFieldUpdateOperationsInput | number
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PKBattleCreateManyInput = {
    id?: string
    status?: string
    streamId1: string
    streamId2: string
    score1?: number
    score2?: number
    startTime?: Date | string | null
    endTime?: Date | string | null
    winnerId?: string | null
    createdAt?: Date | string
  }

  export type PKBattleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    score1?: IntFieldUpdateOperationsInput | number
    score2?: IntFieldUpdateOperationsInput | number
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PKBattleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    streamId1?: StringFieldUpdateOperationsInput | string
    streamId2?: StringFieldUpdateOperationsInput | string
    score1?: IntFieldUpdateOperationsInput | number
    score2?: IntFieldUpdateOperationsInput | number
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasureChestCreateInput = {
    id?: string
    creatorId: string
    totalStars: number
    remainingStars: number
    totalSlots: number
    remainingSlots: number
    expiresAt: Date | string
    createdAt?: Date | string
    stream: StreamCreateNestedOneWithoutChestsInput
    claims?: TreasureClaimCreateNestedManyWithoutChestInput
  }

  export type TreasureChestUncheckedCreateInput = {
    id?: string
    streamId: string
    creatorId: string
    totalStars: number
    remainingStars: number
    totalSlots: number
    remainingSlots: number
    expiresAt: Date | string
    createdAt?: Date | string
    claims?: TreasureClaimUncheckedCreateNestedManyWithoutChestInput
  }

  export type TreasureChestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    totalStars?: IntFieldUpdateOperationsInput | number
    remainingStars?: IntFieldUpdateOperationsInput | number
    totalSlots?: IntFieldUpdateOperationsInput | number
    remainingSlots?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneRequiredWithoutChestsNestedInput
    claims?: TreasureClaimUpdateManyWithoutChestNestedInput
  }

  export type TreasureChestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    totalStars?: IntFieldUpdateOperationsInput | number
    remainingStars?: IntFieldUpdateOperationsInput | number
    totalSlots?: IntFieldUpdateOperationsInput | number
    remainingSlots?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: TreasureClaimUncheckedUpdateManyWithoutChestNestedInput
  }

  export type TreasureChestCreateManyInput = {
    id?: string
    streamId: string
    creatorId: string
    totalStars: number
    remainingStars: number
    totalSlots: number
    remainingSlots: number
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type TreasureChestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    totalStars?: IntFieldUpdateOperationsInput | number
    remainingStars?: IntFieldUpdateOperationsInput | number
    totalSlots?: IntFieldUpdateOperationsInput | number
    remainingSlots?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasureChestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    totalStars?: IntFieldUpdateOperationsInput | number
    remainingStars?: IntFieldUpdateOperationsInput | number
    totalSlots?: IntFieldUpdateOperationsInput | number
    remainingSlots?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasureClaimCreateInput = {
    id?: string
    userId: string
    amount: number
    createdAt?: Date | string
    chest: TreasureChestCreateNestedOneWithoutClaimsInput
  }

  export type TreasureClaimUncheckedCreateInput = {
    id?: string
    chestId: string
    userId: string
    amount: number
    createdAt?: Date | string
  }

  export type TreasureClaimUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chest?: TreasureChestUpdateOneRequiredWithoutClaimsNestedInput
  }

  export type TreasureClaimUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chestId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasureClaimCreateManyInput = {
    id?: string
    chestId: string
    userId: string
    amount: number
    createdAt?: Date | string
  }

  export type TreasureClaimUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasureClaimUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chestId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StreamListRelationFilter = {
    every?: StreamWhereInput
    some?: StreamWhereInput
    none?: StreamWhereInput
  }

  export type GiftTransactionListRelationFilter = {
    every?: GiftTransactionWhereInput
    some?: GiftTransactionWhereInput
    none?: GiftTransactionWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StreamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GiftTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    email?: SortOrder
    googleId?: SortOrder
    role?: SortOrder
    starBalance?: SortOrder
    starsGifted?: SortOrder
    starsEarned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    starBalance?: SortOrder
    starsGifted?: SortOrder
    starsEarned?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    email?: SortOrder
    googleId?: SortOrder
    role?: SortOrder
    starBalance?: SortOrder
    starsGifted?: SortOrder
    starsEarned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    email?: SortOrder
    googleId?: SortOrder
    role?: SortOrder
    starBalance?: SortOrder
    starsGifted?: SortOrder
    starsEarned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    starBalance?: SortOrder
    starsGifted?: SortOrder
    starsEarned?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type StreamGoalListRelationFilter = {
    every?: StreamGoalWhereInput
    some?: StreamGoalWhereInput
    none?: StreamGoalWhereInput
  }

  export type PKBattleListRelationFilter = {
    every?: PKBattleWhereInput
    some?: PKBattleWhereInput
    none?: PKBattleWhereInput
  }

  export type TreasureChestListRelationFilter = {
    every?: TreasureChestWhereInput
    some?: TreasureChestWhereInput
    none?: TreasureChestWhereInput
  }

  export type StreamGoalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PKBattleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TreasureChestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StreamCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    status?: SortOrder
    viewerCount?: SortOrder
    totalStars?: SortOrder
    streamerId?: SortOrder
    createdAt?: SortOrder
    endedAt?: SortOrder
  }

  export type StreamAvgOrderByAggregateInput = {
    viewerCount?: SortOrder
    totalStars?: SortOrder
  }

  export type StreamMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    status?: SortOrder
    viewerCount?: SortOrder
    totalStars?: SortOrder
    streamerId?: SortOrder
    createdAt?: SortOrder
    endedAt?: SortOrder
  }

  export type StreamMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    status?: SortOrder
    viewerCount?: SortOrder
    totalStars?: SortOrder
    streamerId?: SortOrder
    createdAt?: SortOrder
    endedAt?: SortOrder
  }

  export type StreamSumOrderByAggregateInput = {
    viewerCount?: SortOrder
    totalStars?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StreamScalarRelationFilter = {
    is?: StreamWhereInput
    isNot?: StreamWhereInput
  }

  export type GiftTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    streamId?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    starAmount?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type GiftTransactionAvgOrderByAggregateInput = {
    starAmount?: SortOrder
  }

  export type GiftTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    streamId?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    starAmount?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type GiftTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    streamId?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    starAmount?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type GiftTransactionSumOrderByAggregateInput = {
    starAmount?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    streamId?: SortOrder
    senderId?: SortOrder
    text?: SortOrder
    isGift?: SortOrder
    giftStars?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentAvgOrderByAggregateInput = {
    giftStars?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    streamId?: SortOrder
    senderId?: SortOrder
    text?: SortOrder
    isGift?: SortOrder
    giftStars?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    streamId?: SortOrder
    senderId?: SortOrder
    text?: SortOrder
    isGift?: SortOrder
    giftStars?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentSumOrderByAggregateInput = {
    giftStars?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type StreamGoalCountOrderByAggregateInput = {
    id?: SortOrder
    streamId?: SortOrder
    title?: SortOrder
    targetStars?: SortOrder
    currentStars?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type StreamGoalAvgOrderByAggregateInput = {
    targetStars?: SortOrder
    currentStars?: SortOrder
  }

  export type StreamGoalMaxOrderByAggregateInput = {
    id?: SortOrder
    streamId?: SortOrder
    title?: SortOrder
    targetStars?: SortOrder
    currentStars?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type StreamGoalMinOrderByAggregateInput = {
    id?: SortOrder
    streamId?: SortOrder
    title?: SortOrder
    targetStars?: SortOrder
    currentStars?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type StreamGoalSumOrderByAggregateInput = {
    targetStars?: SortOrder
    currentStars?: SortOrder
  }

  export type PKBattleCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    streamId1?: SortOrder
    streamId2?: SortOrder
    score1?: SortOrder
    score2?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    winnerId?: SortOrder
    createdAt?: SortOrder
  }

  export type PKBattleAvgOrderByAggregateInput = {
    score1?: SortOrder
    score2?: SortOrder
  }

  export type PKBattleMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    streamId1?: SortOrder
    streamId2?: SortOrder
    score1?: SortOrder
    score2?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    winnerId?: SortOrder
    createdAt?: SortOrder
  }

  export type PKBattleMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    streamId1?: SortOrder
    streamId2?: SortOrder
    score1?: SortOrder
    score2?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    winnerId?: SortOrder
    createdAt?: SortOrder
  }

  export type PKBattleSumOrderByAggregateInput = {
    score1?: SortOrder
    score2?: SortOrder
  }

  export type TreasureClaimListRelationFilter = {
    every?: TreasureClaimWhereInput
    some?: TreasureClaimWhereInput
    none?: TreasureClaimWhereInput
  }

  export type TreasureClaimOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TreasureChestCountOrderByAggregateInput = {
    id?: SortOrder
    streamId?: SortOrder
    creatorId?: SortOrder
    totalStars?: SortOrder
    remainingStars?: SortOrder
    totalSlots?: SortOrder
    remainingSlots?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TreasureChestAvgOrderByAggregateInput = {
    totalStars?: SortOrder
    remainingStars?: SortOrder
    totalSlots?: SortOrder
    remainingSlots?: SortOrder
  }

  export type TreasureChestMaxOrderByAggregateInput = {
    id?: SortOrder
    streamId?: SortOrder
    creatorId?: SortOrder
    totalStars?: SortOrder
    remainingStars?: SortOrder
    totalSlots?: SortOrder
    remainingSlots?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TreasureChestMinOrderByAggregateInput = {
    id?: SortOrder
    streamId?: SortOrder
    creatorId?: SortOrder
    totalStars?: SortOrder
    remainingStars?: SortOrder
    totalSlots?: SortOrder
    remainingSlots?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TreasureChestSumOrderByAggregateInput = {
    totalStars?: SortOrder
    remainingStars?: SortOrder
    totalSlots?: SortOrder
    remainingSlots?: SortOrder
  }

  export type TreasureChestScalarRelationFilter = {
    is?: TreasureChestWhereInput
    isNot?: TreasureChestWhereInput
  }

  export type TreasureClaimCountOrderByAggregateInput = {
    id?: SortOrder
    chestId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
  }

  export type TreasureClaimAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TreasureClaimMaxOrderByAggregateInput = {
    id?: SortOrder
    chestId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
  }

  export type TreasureClaimMinOrderByAggregateInput = {
    id?: SortOrder
    chestId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
  }

  export type TreasureClaimSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type StreamCreateNestedManyWithoutStreamerInput = {
    create?: XOR<StreamCreateWithoutStreamerInput, StreamUncheckedCreateWithoutStreamerInput> | StreamCreateWithoutStreamerInput[] | StreamUncheckedCreateWithoutStreamerInput[]
    connectOrCreate?: StreamCreateOrConnectWithoutStreamerInput | StreamCreateOrConnectWithoutStreamerInput[]
    createMany?: StreamCreateManyStreamerInputEnvelope
    connect?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
  }

  export type GiftTransactionCreateNestedManyWithoutSenderInput = {
    create?: XOR<GiftTransactionCreateWithoutSenderInput, GiftTransactionUncheckedCreateWithoutSenderInput> | GiftTransactionCreateWithoutSenderInput[] | GiftTransactionUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: GiftTransactionCreateOrConnectWithoutSenderInput | GiftTransactionCreateOrConnectWithoutSenderInput[]
    createMany?: GiftTransactionCreateManySenderInputEnvelope
    connect?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
  }

  export type GiftTransactionCreateNestedManyWithoutReceiverInput = {
    create?: XOR<GiftTransactionCreateWithoutReceiverInput, GiftTransactionUncheckedCreateWithoutReceiverInput> | GiftTransactionCreateWithoutReceiverInput[] | GiftTransactionUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: GiftTransactionCreateOrConnectWithoutReceiverInput | GiftTransactionCreateOrConnectWithoutReceiverInput[]
    createMany?: GiftTransactionCreateManyReceiverInputEnvelope
    connect?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutSenderInput = {
    create?: XOR<CommentCreateWithoutSenderInput, CommentUncheckedCreateWithoutSenderInput> | CommentCreateWithoutSenderInput[] | CommentUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutSenderInput | CommentCreateOrConnectWithoutSenderInput[]
    createMany?: CommentCreateManySenderInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type StreamUncheckedCreateNestedManyWithoutStreamerInput = {
    create?: XOR<StreamCreateWithoutStreamerInput, StreamUncheckedCreateWithoutStreamerInput> | StreamCreateWithoutStreamerInput[] | StreamUncheckedCreateWithoutStreamerInput[]
    connectOrCreate?: StreamCreateOrConnectWithoutStreamerInput | StreamCreateOrConnectWithoutStreamerInput[]
    createMany?: StreamCreateManyStreamerInputEnvelope
    connect?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
  }

  export type GiftTransactionUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<GiftTransactionCreateWithoutSenderInput, GiftTransactionUncheckedCreateWithoutSenderInput> | GiftTransactionCreateWithoutSenderInput[] | GiftTransactionUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: GiftTransactionCreateOrConnectWithoutSenderInput | GiftTransactionCreateOrConnectWithoutSenderInput[]
    createMany?: GiftTransactionCreateManySenderInputEnvelope
    connect?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
  }

  export type GiftTransactionUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: XOR<GiftTransactionCreateWithoutReceiverInput, GiftTransactionUncheckedCreateWithoutReceiverInput> | GiftTransactionCreateWithoutReceiverInput[] | GiftTransactionUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: GiftTransactionCreateOrConnectWithoutReceiverInput | GiftTransactionCreateOrConnectWithoutReceiverInput[]
    createMany?: GiftTransactionCreateManyReceiverInputEnvelope
    connect?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<CommentCreateWithoutSenderInput, CommentUncheckedCreateWithoutSenderInput> | CommentCreateWithoutSenderInput[] | CommentUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutSenderInput | CommentCreateOrConnectWithoutSenderInput[]
    createMany?: CommentCreateManySenderInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StreamUpdateManyWithoutStreamerNestedInput = {
    create?: XOR<StreamCreateWithoutStreamerInput, StreamUncheckedCreateWithoutStreamerInput> | StreamCreateWithoutStreamerInput[] | StreamUncheckedCreateWithoutStreamerInput[]
    connectOrCreate?: StreamCreateOrConnectWithoutStreamerInput | StreamCreateOrConnectWithoutStreamerInput[]
    upsert?: StreamUpsertWithWhereUniqueWithoutStreamerInput | StreamUpsertWithWhereUniqueWithoutStreamerInput[]
    createMany?: StreamCreateManyStreamerInputEnvelope
    set?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    disconnect?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    delete?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    connect?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    update?: StreamUpdateWithWhereUniqueWithoutStreamerInput | StreamUpdateWithWhereUniqueWithoutStreamerInput[]
    updateMany?: StreamUpdateManyWithWhereWithoutStreamerInput | StreamUpdateManyWithWhereWithoutStreamerInput[]
    deleteMany?: StreamScalarWhereInput | StreamScalarWhereInput[]
  }

  export type GiftTransactionUpdateManyWithoutSenderNestedInput = {
    create?: XOR<GiftTransactionCreateWithoutSenderInput, GiftTransactionUncheckedCreateWithoutSenderInput> | GiftTransactionCreateWithoutSenderInput[] | GiftTransactionUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: GiftTransactionCreateOrConnectWithoutSenderInput | GiftTransactionCreateOrConnectWithoutSenderInput[]
    upsert?: GiftTransactionUpsertWithWhereUniqueWithoutSenderInput | GiftTransactionUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: GiftTransactionCreateManySenderInputEnvelope
    set?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    disconnect?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    delete?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    connect?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    update?: GiftTransactionUpdateWithWhereUniqueWithoutSenderInput | GiftTransactionUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: GiftTransactionUpdateManyWithWhereWithoutSenderInput | GiftTransactionUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: GiftTransactionScalarWhereInput | GiftTransactionScalarWhereInput[]
  }

  export type GiftTransactionUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<GiftTransactionCreateWithoutReceiverInput, GiftTransactionUncheckedCreateWithoutReceiverInput> | GiftTransactionCreateWithoutReceiverInput[] | GiftTransactionUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: GiftTransactionCreateOrConnectWithoutReceiverInput | GiftTransactionCreateOrConnectWithoutReceiverInput[]
    upsert?: GiftTransactionUpsertWithWhereUniqueWithoutReceiverInput | GiftTransactionUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: GiftTransactionCreateManyReceiverInputEnvelope
    set?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    disconnect?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    delete?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    connect?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    update?: GiftTransactionUpdateWithWhereUniqueWithoutReceiverInput | GiftTransactionUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: GiftTransactionUpdateManyWithWhereWithoutReceiverInput | GiftTransactionUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: GiftTransactionScalarWhereInput | GiftTransactionScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutSenderNestedInput = {
    create?: XOR<CommentCreateWithoutSenderInput, CommentUncheckedCreateWithoutSenderInput> | CommentCreateWithoutSenderInput[] | CommentUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutSenderInput | CommentCreateOrConnectWithoutSenderInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutSenderInput | CommentUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: CommentCreateManySenderInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutSenderInput | CommentUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutSenderInput | CommentUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type StreamUncheckedUpdateManyWithoutStreamerNestedInput = {
    create?: XOR<StreamCreateWithoutStreamerInput, StreamUncheckedCreateWithoutStreamerInput> | StreamCreateWithoutStreamerInput[] | StreamUncheckedCreateWithoutStreamerInput[]
    connectOrCreate?: StreamCreateOrConnectWithoutStreamerInput | StreamCreateOrConnectWithoutStreamerInput[]
    upsert?: StreamUpsertWithWhereUniqueWithoutStreamerInput | StreamUpsertWithWhereUniqueWithoutStreamerInput[]
    createMany?: StreamCreateManyStreamerInputEnvelope
    set?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    disconnect?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    delete?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    connect?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    update?: StreamUpdateWithWhereUniqueWithoutStreamerInput | StreamUpdateWithWhereUniqueWithoutStreamerInput[]
    updateMany?: StreamUpdateManyWithWhereWithoutStreamerInput | StreamUpdateManyWithWhereWithoutStreamerInput[]
    deleteMany?: StreamScalarWhereInput | StreamScalarWhereInput[]
  }

  export type GiftTransactionUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<GiftTransactionCreateWithoutSenderInput, GiftTransactionUncheckedCreateWithoutSenderInput> | GiftTransactionCreateWithoutSenderInput[] | GiftTransactionUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: GiftTransactionCreateOrConnectWithoutSenderInput | GiftTransactionCreateOrConnectWithoutSenderInput[]
    upsert?: GiftTransactionUpsertWithWhereUniqueWithoutSenderInput | GiftTransactionUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: GiftTransactionCreateManySenderInputEnvelope
    set?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    disconnect?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    delete?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    connect?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    update?: GiftTransactionUpdateWithWhereUniqueWithoutSenderInput | GiftTransactionUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: GiftTransactionUpdateManyWithWhereWithoutSenderInput | GiftTransactionUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: GiftTransactionScalarWhereInput | GiftTransactionScalarWhereInput[]
  }

  export type GiftTransactionUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<GiftTransactionCreateWithoutReceiverInput, GiftTransactionUncheckedCreateWithoutReceiverInput> | GiftTransactionCreateWithoutReceiverInput[] | GiftTransactionUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: GiftTransactionCreateOrConnectWithoutReceiverInput | GiftTransactionCreateOrConnectWithoutReceiverInput[]
    upsert?: GiftTransactionUpsertWithWhereUniqueWithoutReceiverInput | GiftTransactionUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: GiftTransactionCreateManyReceiverInputEnvelope
    set?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    disconnect?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    delete?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    connect?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    update?: GiftTransactionUpdateWithWhereUniqueWithoutReceiverInput | GiftTransactionUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: GiftTransactionUpdateManyWithWhereWithoutReceiverInput | GiftTransactionUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: GiftTransactionScalarWhereInput | GiftTransactionScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<CommentCreateWithoutSenderInput, CommentUncheckedCreateWithoutSenderInput> | CommentCreateWithoutSenderInput[] | CommentUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutSenderInput | CommentCreateOrConnectWithoutSenderInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutSenderInput | CommentUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: CommentCreateManySenderInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutSenderInput | CommentUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutSenderInput | CommentUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutStreamsInput = {
    create?: XOR<UserCreateWithoutStreamsInput, UserUncheckedCreateWithoutStreamsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStreamsInput
    connect?: UserWhereUniqueInput
  }

  export type StreamGoalCreateNestedManyWithoutStreamInput = {
    create?: XOR<StreamGoalCreateWithoutStreamInput, StreamGoalUncheckedCreateWithoutStreamInput> | StreamGoalCreateWithoutStreamInput[] | StreamGoalUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: StreamGoalCreateOrConnectWithoutStreamInput | StreamGoalCreateOrConnectWithoutStreamInput[]
    createMany?: StreamGoalCreateManyStreamInputEnvelope
    connect?: StreamGoalWhereUniqueInput | StreamGoalWhereUniqueInput[]
  }

  export type PKBattleCreateNestedManyWithoutStream1Input = {
    create?: XOR<PKBattleCreateWithoutStream1Input, PKBattleUncheckedCreateWithoutStream1Input> | PKBattleCreateWithoutStream1Input[] | PKBattleUncheckedCreateWithoutStream1Input[]
    connectOrCreate?: PKBattleCreateOrConnectWithoutStream1Input | PKBattleCreateOrConnectWithoutStream1Input[]
    createMany?: PKBattleCreateManyStream1InputEnvelope
    connect?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
  }

  export type PKBattleCreateNestedManyWithoutStream2Input = {
    create?: XOR<PKBattleCreateWithoutStream2Input, PKBattleUncheckedCreateWithoutStream2Input> | PKBattleCreateWithoutStream2Input[] | PKBattleUncheckedCreateWithoutStream2Input[]
    connectOrCreate?: PKBattleCreateOrConnectWithoutStream2Input | PKBattleCreateOrConnectWithoutStream2Input[]
    createMany?: PKBattleCreateManyStream2InputEnvelope
    connect?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
  }

  export type TreasureChestCreateNestedManyWithoutStreamInput = {
    create?: XOR<TreasureChestCreateWithoutStreamInput, TreasureChestUncheckedCreateWithoutStreamInput> | TreasureChestCreateWithoutStreamInput[] | TreasureChestUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: TreasureChestCreateOrConnectWithoutStreamInput | TreasureChestCreateOrConnectWithoutStreamInput[]
    createMany?: TreasureChestCreateManyStreamInputEnvelope
    connect?: TreasureChestWhereUniqueInput | TreasureChestWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutStreamInput = {
    create?: XOR<CommentCreateWithoutStreamInput, CommentUncheckedCreateWithoutStreamInput> | CommentCreateWithoutStreamInput[] | CommentUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutStreamInput | CommentCreateOrConnectWithoutStreamInput[]
    createMany?: CommentCreateManyStreamInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type GiftTransactionCreateNestedManyWithoutStreamInput = {
    create?: XOR<GiftTransactionCreateWithoutStreamInput, GiftTransactionUncheckedCreateWithoutStreamInput> | GiftTransactionCreateWithoutStreamInput[] | GiftTransactionUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: GiftTransactionCreateOrConnectWithoutStreamInput | GiftTransactionCreateOrConnectWithoutStreamInput[]
    createMany?: GiftTransactionCreateManyStreamInputEnvelope
    connect?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
  }

  export type StreamGoalUncheckedCreateNestedManyWithoutStreamInput = {
    create?: XOR<StreamGoalCreateWithoutStreamInput, StreamGoalUncheckedCreateWithoutStreamInput> | StreamGoalCreateWithoutStreamInput[] | StreamGoalUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: StreamGoalCreateOrConnectWithoutStreamInput | StreamGoalCreateOrConnectWithoutStreamInput[]
    createMany?: StreamGoalCreateManyStreamInputEnvelope
    connect?: StreamGoalWhereUniqueInput | StreamGoalWhereUniqueInput[]
  }

  export type PKBattleUncheckedCreateNestedManyWithoutStream1Input = {
    create?: XOR<PKBattleCreateWithoutStream1Input, PKBattleUncheckedCreateWithoutStream1Input> | PKBattleCreateWithoutStream1Input[] | PKBattleUncheckedCreateWithoutStream1Input[]
    connectOrCreate?: PKBattleCreateOrConnectWithoutStream1Input | PKBattleCreateOrConnectWithoutStream1Input[]
    createMany?: PKBattleCreateManyStream1InputEnvelope
    connect?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
  }

  export type PKBattleUncheckedCreateNestedManyWithoutStream2Input = {
    create?: XOR<PKBattleCreateWithoutStream2Input, PKBattleUncheckedCreateWithoutStream2Input> | PKBattleCreateWithoutStream2Input[] | PKBattleUncheckedCreateWithoutStream2Input[]
    connectOrCreate?: PKBattleCreateOrConnectWithoutStream2Input | PKBattleCreateOrConnectWithoutStream2Input[]
    createMany?: PKBattleCreateManyStream2InputEnvelope
    connect?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
  }

  export type TreasureChestUncheckedCreateNestedManyWithoutStreamInput = {
    create?: XOR<TreasureChestCreateWithoutStreamInput, TreasureChestUncheckedCreateWithoutStreamInput> | TreasureChestCreateWithoutStreamInput[] | TreasureChestUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: TreasureChestCreateOrConnectWithoutStreamInput | TreasureChestCreateOrConnectWithoutStreamInput[]
    createMany?: TreasureChestCreateManyStreamInputEnvelope
    connect?: TreasureChestWhereUniqueInput | TreasureChestWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutStreamInput = {
    create?: XOR<CommentCreateWithoutStreamInput, CommentUncheckedCreateWithoutStreamInput> | CommentCreateWithoutStreamInput[] | CommentUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutStreamInput | CommentCreateOrConnectWithoutStreamInput[]
    createMany?: CommentCreateManyStreamInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type GiftTransactionUncheckedCreateNestedManyWithoutStreamInput = {
    create?: XOR<GiftTransactionCreateWithoutStreamInput, GiftTransactionUncheckedCreateWithoutStreamInput> | GiftTransactionCreateWithoutStreamInput[] | GiftTransactionUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: GiftTransactionCreateOrConnectWithoutStreamInput | GiftTransactionCreateOrConnectWithoutStreamInput[]
    createMany?: GiftTransactionCreateManyStreamInputEnvelope
    connect?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutStreamsNestedInput = {
    create?: XOR<UserCreateWithoutStreamsInput, UserUncheckedCreateWithoutStreamsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStreamsInput
    upsert?: UserUpsertWithoutStreamsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStreamsInput, UserUpdateWithoutStreamsInput>, UserUncheckedUpdateWithoutStreamsInput>
  }

  export type StreamGoalUpdateManyWithoutStreamNestedInput = {
    create?: XOR<StreamGoalCreateWithoutStreamInput, StreamGoalUncheckedCreateWithoutStreamInput> | StreamGoalCreateWithoutStreamInput[] | StreamGoalUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: StreamGoalCreateOrConnectWithoutStreamInput | StreamGoalCreateOrConnectWithoutStreamInput[]
    upsert?: StreamGoalUpsertWithWhereUniqueWithoutStreamInput | StreamGoalUpsertWithWhereUniqueWithoutStreamInput[]
    createMany?: StreamGoalCreateManyStreamInputEnvelope
    set?: StreamGoalWhereUniqueInput | StreamGoalWhereUniqueInput[]
    disconnect?: StreamGoalWhereUniqueInput | StreamGoalWhereUniqueInput[]
    delete?: StreamGoalWhereUniqueInput | StreamGoalWhereUniqueInput[]
    connect?: StreamGoalWhereUniqueInput | StreamGoalWhereUniqueInput[]
    update?: StreamGoalUpdateWithWhereUniqueWithoutStreamInput | StreamGoalUpdateWithWhereUniqueWithoutStreamInput[]
    updateMany?: StreamGoalUpdateManyWithWhereWithoutStreamInput | StreamGoalUpdateManyWithWhereWithoutStreamInput[]
    deleteMany?: StreamGoalScalarWhereInput | StreamGoalScalarWhereInput[]
  }

  export type PKBattleUpdateManyWithoutStream1NestedInput = {
    create?: XOR<PKBattleCreateWithoutStream1Input, PKBattleUncheckedCreateWithoutStream1Input> | PKBattleCreateWithoutStream1Input[] | PKBattleUncheckedCreateWithoutStream1Input[]
    connectOrCreate?: PKBattleCreateOrConnectWithoutStream1Input | PKBattleCreateOrConnectWithoutStream1Input[]
    upsert?: PKBattleUpsertWithWhereUniqueWithoutStream1Input | PKBattleUpsertWithWhereUniqueWithoutStream1Input[]
    createMany?: PKBattleCreateManyStream1InputEnvelope
    set?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
    disconnect?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
    delete?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
    connect?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
    update?: PKBattleUpdateWithWhereUniqueWithoutStream1Input | PKBattleUpdateWithWhereUniqueWithoutStream1Input[]
    updateMany?: PKBattleUpdateManyWithWhereWithoutStream1Input | PKBattleUpdateManyWithWhereWithoutStream1Input[]
    deleteMany?: PKBattleScalarWhereInput | PKBattleScalarWhereInput[]
  }

  export type PKBattleUpdateManyWithoutStream2NestedInput = {
    create?: XOR<PKBattleCreateWithoutStream2Input, PKBattleUncheckedCreateWithoutStream2Input> | PKBattleCreateWithoutStream2Input[] | PKBattleUncheckedCreateWithoutStream2Input[]
    connectOrCreate?: PKBattleCreateOrConnectWithoutStream2Input | PKBattleCreateOrConnectWithoutStream2Input[]
    upsert?: PKBattleUpsertWithWhereUniqueWithoutStream2Input | PKBattleUpsertWithWhereUniqueWithoutStream2Input[]
    createMany?: PKBattleCreateManyStream2InputEnvelope
    set?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
    disconnect?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
    delete?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
    connect?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
    update?: PKBattleUpdateWithWhereUniqueWithoutStream2Input | PKBattleUpdateWithWhereUniqueWithoutStream2Input[]
    updateMany?: PKBattleUpdateManyWithWhereWithoutStream2Input | PKBattleUpdateManyWithWhereWithoutStream2Input[]
    deleteMany?: PKBattleScalarWhereInput | PKBattleScalarWhereInput[]
  }

  export type TreasureChestUpdateManyWithoutStreamNestedInput = {
    create?: XOR<TreasureChestCreateWithoutStreamInput, TreasureChestUncheckedCreateWithoutStreamInput> | TreasureChestCreateWithoutStreamInput[] | TreasureChestUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: TreasureChestCreateOrConnectWithoutStreamInput | TreasureChestCreateOrConnectWithoutStreamInput[]
    upsert?: TreasureChestUpsertWithWhereUniqueWithoutStreamInput | TreasureChestUpsertWithWhereUniqueWithoutStreamInput[]
    createMany?: TreasureChestCreateManyStreamInputEnvelope
    set?: TreasureChestWhereUniqueInput | TreasureChestWhereUniqueInput[]
    disconnect?: TreasureChestWhereUniqueInput | TreasureChestWhereUniqueInput[]
    delete?: TreasureChestWhereUniqueInput | TreasureChestWhereUniqueInput[]
    connect?: TreasureChestWhereUniqueInput | TreasureChestWhereUniqueInput[]
    update?: TreasureChestUpdateWithWhereUniqueWithoutStreamInput | TreasureChestUpdateWithWhereUniqueWithoutStreamInput[]
    updateMany?: TreasureChestUpdateManyWithWhereWithoutStreamInput | TreasureChestUpdateManyWithWhereWithoutStreamInput[]
    deleteMany?: TreasureChestScalarWhereInput | TreasureChestScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutStreamNestedInput = {
    create?: XOR<CommentCreateWithoutStreamInput, CommentUncheckedCreateWithoutStreamInput> | CommentCreateWithoutStreamInput[] | CommentUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutStreamInput | CommentCreateOrConnectWithoutStreamInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutStreamInput | CommentUpsertWithWhereUniqueWithoutStreamInput[]
    createMany?: CommentCreateManyStreamInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutStreamInput | CommentUpdateWithWhereUniqueWithoutStreamInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutStreamInput | CommentUpdateManyWithWhereWithoutStreamInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type GiftTransactionUpdateManyWithoutStreamNestedInput = {
    create?: XOR<GiftTransactionCreateWithoutStreamInput, GiftTransactionUncheckedCreateWithoutStreamInput> | GiftTransactionCreateWithoutStreamInput[] | GiftTransactionUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: GiftTransactionCreateOrConnectWithoutStreamInput | GiftTransactionCreateOrConnectWithoutStreamInput[]
    upsert?: GiftTransactionUpsertWithWhereUniqueWithoutStreamInput | GiftTransactionUpsertWithWhereUniqueWithoutStreamInput[]
    createMany?: GiftTransactionCreateManyStreamInputEnvelope
    set?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    disconnect?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    delete?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    connect?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    update?: GiftTransactionUpdateWithWhereUniqueWithoutStreamInput | GiftTransactionUpdateWithWhereUniqueWithoutStreamInput[]
    updateMany?: GiftTransactionUpdateManyWithWhereWithoutStreamInput | GiftTransactionUpdateManyWithWhereWithoutStreamInput[]
    deleteMany?: GiftTransactionScalarWhereInput | GiftTransactionScalarWhereInput[]
  }

  export type StreamGoalUncheckedUpdateManyWithoutStreamNestedInput = {
    create?: XOR<StreamGoalCreateWithoutStreamInput, StreamGoalUncheckedCreateWithoutStreamInput> | StreamGoalCreateWithoutStreamInput[] | StreamGoalUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: StreamGoalCreateOrConnectWithoutStreamInput | StreamGoalCreateOrConnectWithoutStreamInput[]
    upsert?: StreamGoalUpsertWithWhereUniqueWithoutStreamInput | StreamGoalUpsertWithWhereUniqueWithoutStreamInput[]
    createMany?: StreamGoalCreateManyStreamInputEnvelope
    set?: StreamGoalWhereUniqueInput | StreamGoalWhereUniqueInput[]
    disconnect?: StreamGoalWhereUniqueInput | StreamGoalWhereUniqueInput[]
    delete?: StreamGoalWhereUniqueInput | StreamGoalWhereUniqueInput[]
    connect?: StreamGoalWhereUniqueInput | StreamGoalWhereUniqueInput[]
    update?: StreamGoalUpdateWithWhereUniqueWithoutStreamInput | StreamGoalUpdateWithWhereUniqueWithoutStreamInput[]
    updateMany?: StreamGoalUpdateManyWithWhereWithoutStreamInput | StreamGoalUpdateManyWithWhereWithoutStreamInput[]
    deleteMany?: StreamGoalScalarWhereInput | StreamGoalScalarWhereInput[]
  }

  export type PKBattleUncheckedUpdateManyWithoutStream1NestedInput = {
    create?: XOR<PKBattleCreateWithoutStream1Input, PKBattleUncheckedCreateWithoutStream1Input> | PKBattleCreateWithoutStream1Input[] | PKBattleUncheckedCreateWithoutStream1Input[]
    connectOrCreate?: PKBattleCreateOrConnectWithoutStream1Input | PKBattleCreateOrConnectWithoutStream1Input[]
    upsert?: PKBattleUpsertWithWhereUniqueWithoutStream1Input | PKBattleUpsertWithWhereUniqueWithoutStream1Input[]
    createMany?: PKBattleCreateManyStream1InputEnvelope
    set?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
    disconnect?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
    delete?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
    connect?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
    update?: PKBattleUpdateWithWhereUniqueWithoutStream1Input | PKBattleUpdateWithWhereUniqueWithoutStream1Input[]
    updateMany?: PKBattleUpdateManyWithWhereWithoutStream1Input | PKBattleUpdateManyWithWhereWithoutStream1Input[]
    deleteMany?: PKBattleScalarWhereInput | PKBattleScalarWhereInput[]
  }

  export type PKBattleUncheckedUpdateManyWithoutStream2NestedInput = {
    create?: XOR<PKBattleCreateWithoutStream2Input, PKBattleUncheckedCreateWithoutStream2Input> | PKBattleCreateWithoutStream2Input[] | PKBattleUncheckedCreateWithoutStream2Input[]
    connectOrCreate?: PKBattleCreateOrConnectWithoutStream2Input | PKBattleCreateOrConnectWithoutStream2Input[]
    upsert?: PKBattleUpsertWithWhereUniqueWithoutStream2Input | PKBattleUpsertWithWhereUniqueWithoutStream2Input[]
    createMany?: PKBattleCreateManyStream2InputEnvelope
    set?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
    disconnect?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
    delete?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
    connect?: PKBattleWhereUniqueInput | PKBattleWhereUniqueInput[]
    update?: PKBattleUpdateWithWhereUniqueWithoutStream2Input | PKBattleUpdateWithWhereUniqueWithoutStream2Input[]
    updateMany?: PKBattleUpdateManyWithWhereWithoutStream2Input | PKBattleUpdateManyWithWhereWithoutStream2Input[]
    deleteMany?: PKBattleScalarWhereInput | PKBattleScalarWhereInput[]
  }

  export type TreasureChestUncheckedUpdateManyWithoutStreamNestedInput = {
    create?: XOR<TreasureChestCreateWithoutStreamInput, TreasureChestUncheckedCreateWithoutStreamInput> | TreasureChestCreateWithoutStreamInput[] | TreasureChestUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: TreasureChestCreateOrConnectWithoutStreamInput | TreasureChestCreateOrConnectWithoutStreamInput[]
    upsert?: TreasureChestUpsertWithWhereUniqueWithoutStreamInput | TreasureChestUpsertWithWhereUniqueWithoutStreamInput[]
    createMany?: TreasureChestCreateManyStreamInputEnvelope
    set?: TreasureChestWhereUniqueInput | TreasureChestWhereUniqueInput[]
    disconnect?: TreasureChestWhereUniqueInput | TreasureChestWhereUniqueInput[]
    delete?: TreasureChestWhereUniqueInput | TreasureChestWhereUniqueInput[]
    connect?: TreasureChestWhereUniqueInput | TreasureChestWhereUniqueInput[]
    update?: TreasureChestUpdateWithWhereUniqueWithoutStreamInput | TreasureChestUpdateWithWhereUniqueWithoutStreamInput[]
    updateMany?: TreasureChestUpdateManyWithWhereWithoutStreamInput | TreasureChestUpdateManyWithWhereWithoutStreamInput[]
    deleteMany?: TreasureChestScalarWhereInput | TreasureChestScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutStreamNestedInput = {
    create?: XOR<CommentCreateWithoutStreamInput, CommentUncheckedCreateWithoutStreamInput> | CommentCreateWithoutStreamInput[] | CommentUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutStreamInput | CommentCreateOrConnectWithoutStreamInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutStreamInput | CommentUpsertWithWhereUniqueWithoutStreamInput[]
    createMany?: CommentCreateManyStreamInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutStreamInput | CommentUpdateWithWhereUniqueWithoutStreamInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutStreamInput | CommentUpdateManyWithWhereWithoutStreamInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type GiftTransactionUncheckedUpdateManyWithoutStreamNestedInput = {
    create?: XOR<GiftTransactionCreateWithoutStreamInput, GiftTransactionUncheckedCreateWithoutStreamInput> | GiftTransactionCreateWithoutStreamInput[] | GiftTransactionUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: GiftTransactionCreateOrConnectWithoutStreamInput | GiftTransactionCreateOrConnectWithoutStreamInput[]
    upsert?: GiftTransactionUpsertWithWhereUniqueWithoutStreamInput | GiftTransactionUpsertWithWhereUniqueWithoutStreamInput[]
    createMany?: GiftTransactionCreateManyStreamInputEnvelope
    set?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    disconnect?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    delete?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    connect?: GiftTransactionWhereUniqueInput | GiftTransactionWhereUniqueInput[]
    update?: GiftTransactionUpdateWithWhereUniqueWithoutStreamInput | GiftTransactionUpdateWithWhereUniqueWithoutStreamInput[]
    updateMany?: GiftTransactionUpdateManyWithWhereWithoutStreamInput | GiftTransactionUpdateManyWithWhereWithoutStreamInput[]
    deleteMany?: GiftTransactionScalarWhereInput | GiftTransactionScalarWhereInput[]
  }

  export type StreamCreateNestedOneWithoutGiftsInput = {
    create?: XOR<StreamCreateWithoutGiftsInput, StreamUncheckedCreateWithoutGiftsInput>
    connectOrCreate?: StreamCreateOrConnectWithoutGiftsInput
    connect?: StreamWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSentGiftsInput = {
    create?: XOR<UserCreateWithoutSentGiftsInput, UserUncheckedCreateWithoutSentGiftsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentGiftsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedGiftsInput = {
    create?: XOR<UserCreateWithoutReceivedGiftsInput, UserUncheckedCreateWithoutReceivedGiftsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedGiftsInput
    connect?: UserWhereUniqueInput
  }

  export type StreamUpdateOneRequiredWithoutGiftsNestedInput = {
    create?: XOR<StreamCreateWithoutGiftsInput, StreamUncheckedCreateWithoutGiftsInput>
    connectOrCreate?: StreamCreateOrConnectWithoutGiftsInput
    upsert?: StreamUpsertWithoutGiftsInput
    connect?: StreamWhereUniqueInput
    update?: XOR<XOR<StreamUpdateToOneWithWhereWithoutGiftsInput, StreamUpdateWithoutGiftsInput>, StreamUncheckedUpdateWithoutGiftsInput>
  }

  export type UserUpdateOneRequiredWithoutSentGiftsNestedInput = {
    create?: XOR<UserCreateWithoutSentGiftsInput, UserUncheckedCreateWithoutSentGiftsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentGiftsInput
    upsert?: UserUpsertWithoutSentGiftsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentGiftsInput, UserUpdateWithoutSentGiftsInput>, UserUncheckedUpdateWithoutSentGiftsInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedGiftsNestedInput = {
    create?: XOR<UserCreateWithoutReceivedGiftsInput, UserUncheckedCreateWithoutReceivedGiftsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedGiftsInput
    upsert?: UserUpsertWithoutReceivedGiftsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedGiftsInput, UserUpdateWithoutReceivedGiftsInput>, UserUncheckedUpdateWithoutReceivedGiftsInput>
  }

  export type StreamCreateNestedOneWithoutCommentsInput = {
    create?: XOR<StreamCreateWithoutCommentsInput, StreamUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: StreamCreateOrConnectWithoutCommentsInput
    connect?: StreamWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StreamUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<StreamCreateWithoutCommentsInput, StreamUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: StreamCreateOrConnectWithoutCommentsInput
    upsert?: StreamUpsertWithoutCommentsInput
    connect?: StreamWhereUniqueInput
    update?: XOR<XOR<StreamUpdateToOneWithWhereWithoutCommentsInput, StreamUpdateWithoutCommentsInput>, StreamUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    upsert?: UserUpsertWithoutCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentsInput, UserUpdateWithoutCommentsInput>, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type StreamCreateNestedOneWithoutGoalsInput = {
    create?: XOR<StreamCreateWithoutGoalsInput, StreamUncheckedCreateWithoutGoalsInput>
    connectOrCreate?: StreamCreateOrConnectWithoutGoalsInput
    connect?: StreamWhereUniqueInput
  }

  export type StreamUpdateOneRequiredWithoutGoalsNestedInput = {
    create?: XOR<StreamCreateWithoutGoalsInput, StreamUncheckedCreateWithoutGoalsInput>
    connectOrCreate?: StreamCreateOrConnectWithoutGoalsInput
    upsert?: StreamUpsertWithoutGoalsInput
    connect?: StreamWhereUniqueInput
    update?: XOR<XOR<StreamUpdateToOneWithWhereWithoutGoalsInput, StreamUpdateWithoutGoalsInput>, StreamUncheckedUpdateWithoutGoalsInput>
  }

  export type StreamCreateNestedOneWithoutPkBattles1Input = {
    create?: XOR<StreamCreateWithoutPkBattles1Input, StreamUncheckedCreateWithoutPkBattles1Input>
    connectOrCreate?: StreamCreateOrConnectWithoutPkBattles1Input
    connect?: StreamWhereUniqueInput
  }

  export type StreamCreateNestedOneWithoutPkBattles2Input = {
    create?: XOR<StreamCreateWithoutPkBattles2Input, StreamUncheckedCreateWithoutPkBattles2Input>
    connectOrCreate?: StreamCreateOrConnectWithoutPkBattles2Input
    connect?: StreamWhereUniqueInput
  }

  export type StreamUpdateOneRequiredWithoutPkBattles1NestedInput = {
    create?: XOR<StreamCreateWithoutPkBattles1Input, StreamUncheckedCreateWithoutPkBattles1Input>
    connectOrCreate?: StreamCreateOrConnectWithoutPkBattles1Input
    upsert?: StreamUpsertWithoutPkBattles1Input
    connect?: StreamWhereUniqueInput
    update?: XOR<XOR<StreamUpdateToOneWithWhereWithoutPkBattles1Input, StreamUpdateWithoutPkBattles1Input>, StreamUncheckedUpdateWithoutPkBattles1Input>
  }

  export type StreamUpdateOneRequiredWithoutPkBattles2NestedInput = {
    create?: XOR<StreamCreateWithoutPkBattles2Input, StreamUncheckedCreateWithoutPkBattles2Input>
    connectOrCreate?: StreamCreateOrConnectWithoutPkBattles2Input
    upsert?: StreamUpsertWithoutPkBattles2Input
    connect?: StreamWhereUniqueInput
    update?: XOR<XOR<StreamUpdateToOneWithWhereWithoutPkBattles2Input, StreamUpdateWithoutPkBattles2Input>, StreamUncheckedUpdateWithoutPkBattles2Input>
  }

  export type StreamCreateNestedOneWithoutChestsInput = {
    create?: XOR<StreamCreateWithoutChestsInput, StreamUncheckedCreateWithoutChestsInput>
    connectOrCreate?: StreamCreateOrConnectWithoutChestsInput
    connect?: StreamWhereUniqueInput
  }

  export type TreasureClaimCreateNestedManyWithoutChestInput = {
    create?: XOR<TreasureClaimCreateWithoutChestInput, TreasureClaimUncheckedCreateWithoutChestInput> | TreasureClaimCreateWithoutChestInput[] | TreasureClaimUncheckedCreateWithoutChestInput[]
    connectOrCreate?: TreasureClaimCreateOrConnectWithoutChestInput | TreasureClaimCreateOrConnectWithoutChestInput[]
    createMany?: TreasureClaimCreateManyChestInputEnvelope
    connect?: TreasureClaimWhereUniqueInput | TreasureClaimWhereUniqueInput[]
  }

  export type TreasureClaimUncheckedCreateNestedManyWithoutChestInput = {
    create?: XOR<TreasureClaimCreateWithoutChestInput, TreasureClaimUncheckedCreateWithoutChestInput> | TreasureClaimCreateWithoutChestInput[] | TreasureClaimUncheckedCreateWithoutChestInput[]
    connectOrCreate?: TreasureClaimCreateOrConnectWithoutChestInput | TreasureClaimCreateOrConnectWithoutChestInput[]
    createMany?: TreasureClaimCreateManyChestInputEnvelope
    connect?: TreasureClaimWhereUniqueInput | TreasureClaimWhereUniqueInput[]
  }

  export type StreamUpdateOneRequiredWithoutChestsNestedInput = {
    create?: XOR<StreamCreateWithoutChestsInput, StreamUncheckedCreateWithoutChestsInput>
    connectOrCreate?: StreamCreateOrConnectWithoutChestsInput
    upsert?: StreamUpsertWithoutChestsInput
    connect?: StreamWhereUniqueInput
    update?: XOR<XOR<StreamUpdateToOneWithWhereWithoutChestsInput, StreamUpdateWithoutChestsInput>, StreamUncheckedUpdateWithoutChestsInput>
  }

  export type TreasureClaimUpdateManyWithoutChestNestedInput = {
    create?: XOR<TreasureClaimCreateWithoutChestInput, TreasureClaimUncheckedCreateWithoutChestInput> | TreasureClaimCreateWithoutChestInput[] | TreasureClaimUncheckedCreateWithoutChestInput[]
    connectOrCreate?: TreasureClaimCreateOrConnectWithoutChestInput | TreasureClaimCreateOrConnectWithoutChestInput[]
    upsert?: TreasureClaimUpsertWithWhereUniqueWithoutChestInput | TreasureClaimUpsertWithWhereUniqueWithoutChestInput[]
    createMany?: TreasureClaimCreateManyChestInputEnvelope
    set?: TreasureClaimWhereUniqueInput | TreasureClaimWhereUniqueInput[]
    disconnect?: TreasureClaimWhereUniqueInput | TreasureClaimWhereUniqueInput[]
    delete?: TreasureClaimWhereUniqueInput | TreasureClaimWhereUniqueInput[]
    connect?: TreasureClaimWhereUniqueInput | TreasureClaimWhereUniqueInput[]
    update?: TreasureClaimUpdateWithWhereUniqueWithoutChestInput | TreasureClaimUpdateWithWhereUniqueWithoutChestInput[]
    updateMany?: TreasureClaimUpdateManyWithWhereWithoutChestInput | TreasureClaimUpdateManyWithWhereWithoutChestInput[]
    deleteMany?: TreasureClaimScalarWhereInput | TreasureClaimScalarWhereInput[]
  }

  export type TreasureClaimUncheckedUpdateManyWithoutChestNestedInput = {
    create?: XOR<TreasureClaimCreateWithoutChestInput, TreasureClaimUncheckedCreateWithoutChestInput> | TreasureClaimCreateWithoutChestInput[] | TreasureClaimUncheckedCreateWithoutChestInput[]
    connectOrCreate?: TreasureClaimCreateOrConnectWithoutChestInput | TreasureClaimCreateOrConnectWithoutChestInput[]
    upsert?: TreasureClaimUpsertWithWhereUniqueWithoutChestInput | TreasureClaimUpsertWithWhereUniqueWithoutChestInput[]
    createMany?: TreasureClaimCreateManyChestInputEnvelope
    set?: TreasureClaimWhereUniqueInput | TreasureClaimWhereUniqueInput[]
    disconnect?: TreasureClaimWhereUniqueInput | TreasureClaimWhereUniqueInput[]
    delete?: TreasureClaimWhereUniqueInput | TreasureClaimWhereUniqueInput[]
    connect?: TreasureClaimWhereUniqueInput | TreasureClaimWhereUniqueInput[]
    update?: TreasureClaimUpdateWithWhereUniqueWithoutChestInput | TreasureClaimUpdateWithWhereUniqueWithoutChestInput[]
    updateMany?: TreasureClaimUpdateManyWithWhereWithoutChestInput | TreasureClaimUpdateManyWithWhereWithoutChestInput[]
    deleteMany?: TreasureClaimScalarWhereInput | TreasureClaimScalarWhereInput[]
  }

  export type TreasureChestCreateNestedOneWithoutClaimsInput = {
    create?: XOR<TreasureChestCreateWithoutClaimsInput, TreasureChestUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: TreasureChestCreateOrConnectWithoutClaimsInput
    connect?: TreasureChestWhereUniqueInput
  }

  export type TreasureChestUpdateOneRequiredWithoutClaimsNestedInput = {
    create?: XOR<TreasureChestCreateWithoutClaimsInput, TreasureChestUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: TreasureChestCreateOrConnectWithoutClaimsInput
    upsert?: TreasureChestUpsertWithoutClaimsInput
    connect?: TreasureChestWhereUniqueInput
    update?: XOR<XOR<TreasureChestUpdateToOneWithWhereWithoutClaimsInput, TreasureChestUpdateWithoutClaimsInput>, TreasureChestUncheckedUpdateWithoutClaimsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StreamCreateWithoutStreamerInput = {
    id?: string
    title: string
    description?: string | null
    category?: string
    status?: string
    viewerCount?: number
    totalStars?: number
    createdAt?: Date | string
    endedAt?: Date | string | null
    goals?: StreamGoalCreateNestedManyWithoutStreamInput
    pkBattles1?: PKBattleCreateNestedManyWithoutStream1Input
    pkBattles2?: PKBattleCreateNestedManyWithoutStream2Input
    chests?: TreasureChestCreateNestedManyWithoutStreamInput
    comments?: CommentCreateNestedManyWithoutStreamInput
    gifts?: GiftTransactionCreateNestedManyWithoutStreamInput
  }

  export type StreamUncheckedCreateWithoutStreamerInput = {
    id?: string
    title: string
    description?: string | null
    category?: string
    status?: string
    viewerCount?: number
    totalStars?: number
    createdAt?: Date | string
    endedAt?: Date | string | null
    goals?: StreamGoalUncheckedCreateNestedManyWithoutStreamInput
    pkBattles1?: PKBattleUncheckedCreateNestedManyWithoutStream1Input
    pkBattles2?: PKBattleUncheckedCreateNestedManyWithoutStream2Input
    chests?: TreasureChestUncheckedCreateNestedManyWithoutStreamInput
    comments?: CommentUncheckedCreateNestedManyWithoutStreamInput
    gifts?: GiftTransactionUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamCreateOrConnectWithoutStreamerInput = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutStreamerInput, StreamUncheckedCreateWithoutStreamerInput>
  }

  export type StreamCreateManyStreamerInputEnvelope = {
    data: StreamCreateManyStreamerInput | StreamCreateManyStreamerInput[]
    skipDuplicates?: boolean
  }

  export type GiftTransactionCreateWithoutSenderInput = {
    id?: string
    starAmount: number
    message?: string | null
    createdAt?: Date | string
    stream: StreamCreateNestedOneWithoutGiftsInput
    receiver: UserCreateNestedOneWithoutReceivedGiftsInput
  }

  export type GiftTransactionUncheckedCreateWithoutSenderInput = {
    id?: string
    streamId: string
    receiverId: string
    starAmount: number
    message?: string | null
    createdAt?: Date | string
  }

  export type GiftTransactionCreateOrConnectWithoutSenderInput = {
    where: GiftTransactionWhereUniqueInput
    create: XOR<GiftTransactionCreateWithoutSenderInput, GiftTransactionUncheckedCreateWithoutSenderInput>
  }

  export type GiftTransactionCreateManySenderInputEnvelope = {
    data: GiftTransactionCreateManySenderInput | GiftTransactionCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type GiftTransactionCreateWithoutReceiverInput = {
    id?: string
    starAmount: number
    message?: string | null
    createdAt?: Date | string
    stream: StreamCreateNestedOneWithoutGiftsInput
    sender: UserCreateNestedOneWithoutSentGiftsInput
  }

  export type GiftTransactionUncheckedCreateWithoutReceiverInput = {
    id?: string
    streamId: string
    senderId: string
    starAmount: number
    message?: string | null
    createdAt?: Date | string
  }

  export type GiftTransactionCreateOrConnectWithoutReceiverInput = {
    where: GiftTransactionWhereUniqueInput
    create: XOR<GiftTransactionCreateWithoutReceiverInput, GiftTransactionUncheckedCreateWithoutReceiverInput>
  }

  export type GiftTransactionCreateManyReceiverInputEnvelope = {
    data: GiftTransactionCreateManyReceiverInput | GiftTransactionCreateManyReceiverInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutSenderInput = {
    id?: string
    text: string
    isGift?: boolean
    giftStars?: number | null
    createdAt?: Date | string
    stream: StreamCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutSenderInput = {
    id?: string
    streamId: string
    text: string
    isGift?: boolean
    giftStars?: number | null
    createdAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutSenderInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutSenderInput, CommentUncheckedCreateWithoutSenderInput>
  }

  export type CommentCreateManySenderInputEnvelope = {
    data: CommentCreateManySenderInput | CommentCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type StreamUpsertWithWhereUniqueWithoutStreamerInput = {
    where: StreamWhereUniqueInput
    update: XOR<StreamUpdateWithoutStreamerInput, StreamUncheckedUpdateWithoutStreamerInput>
    create: XOR<StreamCreateWithoutStreamerInput, StreamUncheckedCreateWithoutStreamerInput>
  }

  export type StreamUpdateWithWhereUniqueWithoutStreamerInput = {
    where: StreamWhereUniqueInput
    data: XOR<StreamUpdateWithoutStreamerInput, StreamUncheckedUpdateWithoutStreamerInput>
  }

  export type StreamUpdateManyWithWhereWithoutStreamerInput = {
    where: StreamScalarWhereInput
    data: XOR<StreamUpdateManyMutationInput, StreamUncheckedUpdateManyWithoutStreamerInput>
  }

  export type StreamScalarWhereInput = {
    AND?: StreamScalarWhereInput | StreamScalarWhereInput[]
    OR?: StreamScalarWhereInput[]
    NOT?: StreamScalarWhereInput | StreamScalarWhereInput[]
    id?: StringFilter<"Stream"> | string
    title?: StringFilter<"Stream"> | string
    description?: StringNullableFilter<"Stream"> | string | null
    category?: StringFilter<"Stream"> | string
    status?: StringFilter<"Stream"> | string
    viewerCount?: IntFilter<"Stream"> | number
    totalStars?: IntFilter<"Stream"> | number
    streamerId?: StringFilter<"Stream"> | string
    createdAt?: DateTimeFilter<"Stream"> | Date | string
    endedAt?: DateTimeNullableFilter<"Stream"> | Date | string | null
  }

  export type GiftTransactionUpsertWithWhereUniqueWithoutSenderInput = {
    where: GiftTransactionWhereUniqueInput
    update: XOR<GiftTransactionUpdateWithoutSenderInput, GiftTransactionUncheckedUpdateWithoutSenderInput>
    create: XOR<GiftTransactionCreateWithoutSenderInput, GiftTransactionUncheckedCreateWithoutSenderInput>
  }

  export type GiftTransactionUpdateWithWhereUniqueWithoutSenderInput = {
    where: GiftTransactionWhereUniqueInput
    data: XOR<GiftTransactionUpdateWithoutSenderInput, GiftTransactionUncheckedUpdateWithoutSenderInput>
  }

  export type GiftTransactionUpdateManyWithWhereWithoutSenderInput = {
    where: GiftTransactionScalarWhereInput
    data: XOR<GiftTransactionUpdateManyMutationInput, GiftTransactionUncheckedUpdateManyWithoutSenderInput>
  }

  export type GiftTransactionScalarWhereInput = {
    AND?: GiftTransactionScalarWhereInput | GiftTransactionScalarWhereInput[]
    OR?: GiftTransactionScalarWhereInput[]
    NOT?: GiftTransactionScalarWhereInput | GiftTransactionScalarWhereInput[]
    id?: StringFilter<"GiftTransaction"> | string
    streamId?: StringFilter<"GiftTransaction"> | string
    senderId?: StringFilter<"GiftTransaction"> | string
    receiverId?: StringFilter<"GiftTransaction"> | string
    starAmount?: IntFilter<"GiftTransaction"> | number
    message?: StringNullableFilter<"GiftTransaction"> | string | null
    createdAt?: DateTimeFilter<"GiftTransaction"> | Date | string
  }

  export type GiftTransactionUpsertWithWhereUniqueWithoutReceiverInput = {
    where: GiftTransactionWhereUniqueInput
    update: XOR<GiftTransactionUpdateWithoutReceiverInput, GiftTransactionUncheckedUpdateWithoutReceiverInput>
    create: XOR<GiftTransactionCreateWithoutReceiverInput, GiftTransactionUncheckedCreateWithoutReceiverInput>
  }

  export type GiftTransactionUpdateWithWhereUniqueWithoutReceiverInput = {
    where: GiftTransactionWhereUniqueInput
    data: XOR<GiftTransactionUpdateWithoutReceiverInput, GiftTransactionUncheckedUpdateWithoutReceiverInput>
  }

  export type GiftTransactionUpdateManyWithWhereWithoutReceiverInput = {
    where: GiftTransactionScalarWhereInput
    data: XOR<GiftTransactionUpdateManyMutationInput, GiftTransactionUncheckedUpdateManyWithoutReceiverInput>
  }

  export type CommentUpsertWithWhereUniqueWithoutSenderInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutSenderInput, CommentUncheckedUpdateWithoutSenderInput>
    create: XOR<CommentCreateWithoutSenderInput, CommentUncheckedCreateWithoutSenderInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutSenderInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutSenderInput, CommentUncheckedUpdateWithoutSenderInput>
  }

  export type CommentUpdateManyWithWhereWithoutSenderInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutSenderInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: StringFilter<"Comment"> | string
    streamId?: StringFilter<"Comment"> | string
    senderId?: StringFilter<"Comment"> | string
    text?: StringFilter<"Comment"> | string
    isGift?: BoolFilter<"Comment"> | boolean
    giftStars?: IntNullableFilter<"Comment"> | number | null
    createdAt?: DateTimeFilter<"Comment"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type UserCreateWithoutStreamsInput = {
    id?: string
    username: string
    displayName: string
    avatarUrl: string
    email?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    starBalance?: number
    starsGifted?: number
    starsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    sentGifts?: GiftTransactionCreateNestedManyWithoutSenderInput
    receivedGifts?: GiftTransactionCreateNestedManyWithoutReceiverInput
    comments?: CommentCreateNestedManyWithoutSenderInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStreamsInput = {
    id?: string
    username: string
    displayName: string
    avatarUrl: string
    email?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    starBalance?: number
    starsGifted?: number
    starsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    sentGifts?: GiftTransactionUncheckedCreateNestedManyWithoutSenderInput
    receivedGifts?: GiftTransactionUncheckedCreateNestedManyWithoutReceiverInput
    comments?: CommentUncheckedCreateNestedManyWithoutSenderInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStreamsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStreamsInput, UserUncheckedCreateWithoutStreamsInput>
  }

  export type StreamGoalCreateWithoutStreamInput = {
    id?: string
    title: string
    targetStars: number
    currentStars?: number
    status?: string
    createdAt?: Date | string
  }

  export type StreamGoalUncheckedCreateWithoutStreamInput = {
    id?: string
    title: string
    targetStars: number
    currentStars?: number
    status?: string
    createdAt?: Date | string
  }

  export type StreamGoalCreateOrConnectWithoutStreamInput = {
    where: StreamGoalWhereUniqueInput
    create: XOR<StreamGoalCreateWithoutStreamInput, StreamGoalUncheckedCreateWithoutStreamInput>
  }

  export type StreamGoalCreateManyStreamInputEnvelope = {
    data: StreamGoalCreateManyStreamInput | StreamGoalCreateManyStreamInput[]
    skipDuplicates?: boolean
  }

  export type PKBattleCreateWithoutStream1Input = {
    id?: string
    status?: string
    score1?: number
    score2?: number
    startTime?: Date | string | null
    endTime?: Date | string | null
    winnerId?: string | null
    createdAt?: Date | string
    stream2: StreamCreateNestedOneWithoutPkBattles2Input
  }

  export type PKBattleUncheckedCreateWithoutStream1Input = {
    id?: string
    status?: string
    streamId2: string
    score1?: number
    score2?: number
    startTime?: Date | string | null
    endTime?: Date | string | null
    winnerId?: string | null
    createdAt?: Date | string
  }

  export type PKBattleCreateOrConnectWithoutStream1Input = {
    where: PKBattleWhereUniqueInput
    create: XOR<PKBattleCreateWithoutStream1Input, PKBattleUncheckedCreateWithoutStream1Input>
  }

  export type PKBattleCreateManyStream1InputEnvelope = {
    data: PKBattleCreateManyStream1Input | PKBattleCreateManyStream1Input[]
    skipDuplicates?: boolean
  }

  export type PKBattleCreateWithoutStream2Input = {
    id?: string
    status?: string
    score1?: number
    score2?: number
    startTime?: Date | string | null
    endTime?: Date | string | null
    winnerId?: string | null
    createdAt?: Date | string
    stream1: StreamCreateNestedOneWithoutPkBattles1Input
  }

  export type PKBattleUncheckedCreateWithoutStream2Input = {
    id?: string
    status?: string
    streamId1: string
    score1?: number
    score2?: number
    startTime?: Date | string | null
    endTime?: Date | string | null
    winnerId?: string | null
    createdAt?: Date | string
  }

  export type PKBattleCreateOrConnectWithoutStream2Input = {
    where: PKBattleWhereUniqueInput
    create: XOR<PKBattleCreateWithoutStream2Input, PKBattleUncheckedCreateWithoutStream2Input>
  }

  export type PKBattleCreateManyStream2InputEnvelope = {
    data: PKBattleCreateManyStream2Input | PKBattleCreateManyStream2Input[]
    skipDuplicates?: boolean
  }

  export type TreasureChestCreateWithoutStreamInput = {
    id?: string
    creatorId: string
    totalStars: number
    remainingStars: number
    totalSlots: number
    remainingSlots: number
    expiresAt: Date | string
    createdAt?: Date | string
    claims?: TreasureClaimCreateNestedManyWithoutChestInput
  }

  export type TreasureChestUncheckedCreateWithoutStreamInput = {
    id?: string
    creatorId: string
    totalStars: number
    remainingStars: number
    totalSlots: number
    remainingSlots: number
    expiresAt: Date | string
    createdAt?: Date | string
    claims?: TreasureClaimUncheckedCreateNestedManyWithoutChestInput
  }

  export type TreasureChestCreateOrConnectWithoutStreamInput = {
    where: TreasureChestWhereUniqueInput
    create: XOR<TreasureChestCreateWithoutStreamInput, TreasureChestUncheckedCreateWithoutStreamInput>
  }

  export type TreasureChestCreateManyStreamInputEnvelope = {
    data: TreasureChestCreateManyStreamInput | TreasureChestCreateManyStreamInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutStreamInput = {
    id?: string
    text: string
    isGift?: boolean
    giftStars?: number | null
    createdAt?: Date | string
    sender: UserCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutStreamInput = {
    id?: string
    senderId: string
    text: string
    isGift?: boolean
    giftStars?: number | null
    createdAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutStreamInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutStreamInput, CommentUncheckedCreateWithoutStreamInput>
  }

  export type CommentCreateManyStreamInputEnvelope = {
    data: CommentCreateManyStreamInput | CommentCreateManyStreamInput[]
    skipDuplicates?: boolean
  }

  export type GiftTransactionCreateWithoutStreamInput = {
    id?: string
    starAmount: number
    message?: string | null
    createdAt?: Date | string
    sender: UserCreateNestedOneWithoutSentGiftsInput
    receiver: UserCreateNestedOneWithoutReceivedGiftsInput
  }

  export type GiftTransactionUncheckedCreateWithoutStreamInput = {
    id?: string
    senderId: string
    receiverId: string
    starAmount: number
    message?: string | null
    createdAt?: Date | string
  }

  export type GiftTransactionCreateOrConnectWithoutStreamInput = {
    where: GiftTransactionWhereUniqueInput
    create: XOR<GiftTransactionCreateWithoutStreamInput, GiftTransactionUncheckedCreateWithoutStreamInput>
  }

  export type GiftTransactionCreateManyStreamInputEnvelope = {
    data: GiftTransactionCreateManyStreamInput | GiftTransactionCreateManyStreamInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutStreamsInput = {
    update: XOR<UserUpdateWithoutStreamsInput, UserUncheckedUpdateWithoutStreamsInput>
    create: XOR<UserCreateWithoutStreamsInput, UserUncheckedCreateWithoutStreamsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStreamsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStreamsInput, UserUncheckedUpdateWithoutStreamsInput>
  }

  export type UserUpdateWithoutStreamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    starBalance?: IntFieldUpdateOperationsInput | number
    starsGifted?: IntFieldUpdateOperationsInput | number
    starsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentGifts?: GiftTransactionUpdateManyWithoutSenderNestedInput
    receivedGifts?: GiftTransactionUpdateManyWithoutReceiverNestedInput
    comments?: CommentUpdateManyWithoutSenderNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStreamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    starBalance?: IntFieldUpdateOperationsInput | number
    starsGifted?: IntFieldUpdateOperationsInput | number
    starsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentGifts?: GiftTransactionUncheckedUpdateManyWithoutSenderNestedInput
    receivedGifts?: GiftTransactionUncheckedUpdateManyWithoutReceiverNestedInput
    comments?: CommentUncheckedUpdateManyWithoutSenderNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type StreamGoalUpsertWithWhereUniqueWithoutStreamInput = {
    where: StreamGoalWhereUniqueInput
    update: XOR<StreamGoalUpdateWithoutStreamInput, StreamGoalUncheckedUpdateWithoutStreamInput>
    create: XOR<StreamGoalCreateWithoutStreamInput, StreamGoalUncheckedCreateWithoutStreamInput>
  }

  export type StreamGoalUpdateWithWhereUniqueWithoutStreamInput = {
    where: StreamGoalWhereUniqueInput
    data: XOR<StreamGoalUpdateWithoutStreamInput, StreamGoalUncheckedUpdateWithoutStreamInput>
  }

  export type StreamGoalUpdateManyWithWhereWithoutStreamInput = {
    where: StreamGoalScalarWhereInput
    data: XOR<StreamGoalUpdateManyMutationInput, StreamGoalUncheckedUpdateManyWithoutStreamInput>
  }

  export type StreamGoalScalarWhereInput = {
    AND?: StreamGoalScalarWhereInput | StreamGoalScalarWhereInput[]
    OR?: StreamGoalScalarWhereInput[]
    NOT?: StreamGoalScalarWhereInput | StreamGoalScalarWhereInput[]
    id?: StringFilter<"StreamGoal"> | string
    streamId?: StringFilter<"StreamGoal"> | string
    title?: StringFilter<"StreamGoal"> | string
    targetStars?: IntFilter<"StreamGoal"> | number
    currentStars?: IntFilter<"StreamGoal"> | number
    status?: StringFilter<"StreamGoal"> | string
    createdAt?: DateTimeFilter<"StreamGoal"> | Date | string
  }

  export type PKBattleUpsertWithWhereUniqueWithoutStream1Input = {
    where: PKBattleWhereUniqueInput
    update: XOR<PKBattleUpdateWithoutStream1Input, PKBattleUncheckedUpdateWithoutStream1Input>
    create: XOR<PKBattleCreateWithoutStream1Input, PKBattleUncheckedCreateWithoutStream1Input>
  }

  export type PKBattleUpdateWithWhereUniqueWithoutStream1Input = {
    where: PKBattleWhereUniqueInput
    data: XOR<PKBattleUpdateWithoutStream1Input, PKBattleUncheckedUpdateWithoutStream1Input>
  }

  export type PKBattleUpdateManyWithWhereWithoutStream1Input = {
    where: PKBattleScalarWhereInput
    data: XOR<PKBattleUpdateManyMutationInput, PKBattleUncheckedUpdateManyWithoutStream1Input>
  }

  export type PKBattleScalarWhereInput = {
    AND?: PKBattleScalarWhereInput | PKBattleScalarWhereInput[]
    OR?: PKBattleScalarWhereInput[]
    NOT?: PKBattleScalarWhereInput | PKBattleScalarWhereInput[]
    id?: StringFilter<"PKBattle"> | string
    status?: StringFilter<"PKBattle"> | string
    streamId1?: StringFilter<"PKBattle"> | string
    streamId2?: StringFilter<"PKBattle"> | string
    score1?: IntFilter<"PKBattle"> | number
    score2?: IntFilter<"PKBattle"> | number
    startTime?: DateTimeNullableFilter<"PKBattle"> | Date | string | null
    endTime?: DateTimeNullableFilter<"PKBattle"> | Date | string | null
    winnerId?: StringNullableFilter<"PKBattle"> | string | null
    createdAt?: DateTimeFilter<"PKBattle"> | Date | string
  }

  export type PKBattleUpsertWithWhereUniqueWithoutStream2Input = {
    where: PKBattleWhereUniqueInput
    update: XOR<PKBattleUpdateWithoutStream2Input, PKBattleUncheckedUpdateWithoutStream2Input>
    create: XOR<PKBattleCreateWithoutStream2Input, PKBattleUncheckedCreateWithoutStream2Input>
  }

  export type PKBattleUpdateWithWhereUniqueWithoutStream2Input = {
    where: PKBattleWhereUniqueInput
    data: XOR<PKBattleUpdateWithoutStream2Input, PKBattleUncheckedUpdateWithoutStream2Input>
  }

  export type PKBattleUpdateManyWithWhereWithoutStream2Input = {
    where: PKBattleScalarWhereInput
    data: XOR<PKBattleUpdateManyMutationInput, PKBattleUncheckedUpdateManyWithoutStream2Input>
  }

  export type TreasureChestUpsertWithWhereUniqueWithoutStreamInput = {
    where: TreasureChestWhereUniqueInput
    update: XOR<TreasureChestUpdateWithoutStreamInput, TreasureChestUncheckedUpdateWithoutStreamInput>
    create: XOR<TreasureChestCreateWithoutStreamInput, TreasureChestUncheckedCreateWithoutStreamInput>
  }

  export type TreasureChestUpdateWithWhereUniqueWithoutStreamInput = {
    where: TreasureChestWhereUniqueInput
    data: XOR<TreasureChestUpdateWithoutStreamInput, TreasureChestUncheckedUpdateWithoutStreamInput>
  }

  export type TreasureChestUpdateManyWithWhereWithoutStreamInput = {
    where: TreasureChestScalarWhereInput
    data: XOR<TreasureChestUpdateManyMutationInput, TreasureChestUncheckedUpdateManyWithoutStreamInput>
  }

  export type TreasureChestScalarWhereInput = {
    AND?: TreasureChestScalarWhereInput | TreasureChestScalarWhereInput[]
    OR?: TreasureChestScalarWhereInput[]
    NOT?: TreasureChestScalarWhereInput | TreasureChestScalarWhereInput[]
    id?: StringFilter<"TreasureChest"> | string
    streamId?: StringFilter<"TreasureChest"> | string
    creatorId?: StringFilter<"TreasureChest"> | string
    totalStars?: IntFilter<"TreasureChest"> | number
    remainingStars?: IntFilter<"TreasureChest"> | number
    totalSlots?: IntFilter<"TreasureChest"> | number
    remainingSlots?: IntFilter<"TreasureChest"> | number
    expiresAt?: DateTimeFilter<"TreasureChest"> | Date | string
    createdAt?: DateTimeFilter<"TreasureChest"> | Date | string
  }

  export type CommentUpsertWithWhereUniqueWithoutStreamInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutStreamInput, CommentUncheckedUpdateWithoutStreamInput>
    create: XOR<CommentCreateWithoutStreamInput, CommentUncheckedCreateWithoutStreamInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutStreamInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutStreamInput, CommentUncheckedUpdateWithoutStreamInput>
  }

  export type CommentUpdateManyWithWhereWithoutStreamInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutStreamInput>
  }

  export type GiftTransactionUpsertWithWhereUniqueWithoutStreamInput = {
    where: GiftTransactionWhereUniqueInput
    update: XOR<GiftTransactionUpdateWithoutStreamInput, GiftTransactionUncheckedUpdateWithoutStreamInput>
    create: XOR<GiftTransactionCreateWithoutStreamInput, GiftTransactionUncheckedCreateWithoutStreamInput>
  }

  export type GiftTransactionUpdateWithWhereUniqueWithoutStreamInput = {
    where: GiftTransactionWhereUniqueInput
    data: XOR<GiftTransactionUpdateWithoutStreamInput, GiftTransactionUncheckedUpdateWithoutStreamInput>
  }

  export type GiftTransactionUpdateManyWithWhereWithoutStreamInput = {
    where: GiftTransactionScalarWhereInput
    data: XOR<GiftTransactionUpdateManyMutationInput, GiftTransactionUncheckedUpdateManyWithoutStreamInput>
  }

  export type StreamCreateWithoutGiftsInput = {
    id?: string
    title: string
    description?: string | null
    category?: string
    status?: string
    viewerCount?: number
    totalStars?: number
    createdAt?: Date | string
    endedAt?: Date | string | null
    streamer: UserCreateNestedOneWithoutStreamsInput
    goals?: StreamGoalCreateNestedManyWithoutStreamInput
    pkBattles1?: PKBattleCreateNestedManyWithoutStream1Input
    pkBattles2?: PKBattleCreateNestedManyWithoutStream2Input
    chests?: TreasureChestCreateNestedManyWithoutStreamInput
    comments?: CommentCreateNestedManyWithoutStreamInput
  }

  export type StreamUncheckedCreateWithoutGiftsInput = {
    id?: string
    title: string
    description?: string | null
    category?: string
    status?: string
    viewerCount?: number
    totalStars?: number
    streamerId: string
    createdAt?: Date | string
    endedAt?: Date | string | null
    goals?: StreamGoalUncheckedCreateNestedManyWithoutStreamInput
    pkBattles1?: PKBattleUncheckedCreateNestedManyWithoutStream1Input
    pkBattles2?: PKBattleUncheckedCreateNestedManyWithoutStream2Input
    chests?: TreasureChestUncheckedCreateNestedManyWithoutStreamInput
    comments?: CommentUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamCreateOrConnectWithoutGiftsInput = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutGiftsInput, StreamUncheckedCreateWithoutGiftsInput>
  }

  export type UserCreateWithoutSentGiftsInput = {
    id?: string
    username: string
    displayName: string
    avatarUrl: string
    email?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    starBalance?: number
    starsGifted?: number
    starsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    streams?: StreamCreateNestedManyWithoutStreamerInput
    receivedGifts?: GiftTransactionCreateNestedManyWithoutReceiverInput
    comments?: CommentCreateNestedManyWithoutSenderInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSentGiftsInput = {
    id?: string
    username: string
    displayName: string
    avatarUrl: string
    email?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    starBalance?: number
    starsGifted?: number
    starsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    streams?: StreamUncheckedCreateNestedManyWithoutStreamerInput
    receivedGifts?: GiftTransactionUncheckedCreateNestedManyWithoutReceiverInput
    comments?: CommentUncheckedCreateNestedManyWithoutSenderInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSentGiftsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentGiftsInput, UserUncheckedCreateWithoutSentGiftsInput>
  }

  export type UserCreateWithoutReceivedGiftsInput = {
    id?: string
    username: string
    displayName: string
    avatarUrl: string
    email?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    starBalance?: number
    starsGifted?: number
    starsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    streams?: StreamCreateNestedManyWithoutStreamerInput
    sentGifts?: GiftTransactionCreateNestedManyWithoutSenderInput
    comments?: CommentCreateNestedManyWithoutSenderInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReceivedGiftsInput = {
    id?: string
    username: string
    displayName: string
    avatarUrl: string
    email?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    starBalance?: number
    starsGifted?: number
    starsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    streams?: StreamUncheckedCreateNestedManyWithoutStreamerInput
    sentGifts?: GiftTransactionUncheckedCreateNestedManyWithoutSenderInput
    comments?: CommentUncheckedCreateNestedManyWithoutSenderInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReceivedGiftsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedGiftsInput, UserUncheckedCreateWithoutReceivedGiftsInput>
  }

  export type StreamUpsertWithoutGiftsInput = {
    update: XOR<StreamUpdateWithoutGiftsInput, StreamUncheckedUpdateWithoutGiftsInput>
    create: XOR<StreamCreateWithoutGiftsInput, StreamUncheckedCreateWithoutGiftsInput>
    where?: StreamWhereInput
  }

  export type StreamUpdateToOneWithWhereWithoutGiftsInput = {
    where?: StreamWhereInput
    data: XOR<StreamUpdateWithoutGiftsInput, StreamUncheckedUpdateWithoutGiftsInput>
  }

  export type StreamUpdateWithoutGiftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streamer?: UserUpdateOneRequiredWithoutStreamsNestedInput
    goals?: StreamGoalUpdateManyWithoutStreamNestedInput
    pkBattles1?: PKBattleUpdateManyWithoutStream1NestedInput
    pkBattles2?: PKBattleUpdateManyWithoutStream2NestedInput
    chests?: TreasureChestUpdateManyWithoutStreamNestedInput
    comments?: CommentUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateWithoutGiftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    streamerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    goals?: StreamGoalUncheckedUpdateManyWithoutStreamNestedInput
    pkBattles1?: PKBattleUncheckedUpdateManyWithoutStream1NestedInput
    pkBattles2?: PKBattleUncheckedUpdateManyWithoutStream2NestedInput
    chests?: TreasureChestUncheckedUpdateManyWithoutStreamNestedInput
    comments?: CommentUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type UserUpsertWithoutSentGiftsInput = {
    update: XOR<UserUpdateWithoutSentGiftsInput, UserUncheckedUpdateWithoutSentGiftsInput>
    create: XOR<UserCreateWithoutSentGiftsInput, UserUncheckedCreateWithoutSentGiftsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentGiftsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentGiftsInput, UserUncheckedUpdateWithoutSentGiftsInput>
  }

  export type UserUpdateWithoutSentGiftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    starBalance?: IntFieldUpdateOperationsInput | number
    starsGifted?: IntFieldUpdateOperationsInput | number
    starsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    streams?: StreamUpdateManyWithoutStreamerNestedInput
    receivedGifts?: GiftTransactionUpdateManyWithoutReceiverNestedInput
    comments?: CommentUpdateManyWithoutSenderNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSentGiftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    starBalance?: IntFieldUpdateOperationsInput | number
    starsGifted?: IntFieldUpdateOperationsInput | number
    starsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    streams?: StreamUncheckedUpdateManyWithoutStreamerNestedInput
    receivedGifts?: GiftTransactionUncheckedUpdateManyWithoutReceiverNestedInput
    comments?: CommentUncheckedUpdateManyWithoutSenderNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutReceivedGiftsInput = {
    update: XOR<UserUpdateWithoutReceivedGiftsInput, UserUncheckedUpdateWithoutReceivedGiftsInput>
    create: XOR<UserCreateWithoutReceivedGiftsInput, UserUncheckedCreateWithoutReceivedGiftsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedGiftsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedGiftsInput, UserUncheckedUpdateWithoutReceivedGiftsInput>
  }

  export type UserUpdateWithoutReceivedGiftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    starBalance?: IntFieldUpdateOperationsInput | number
    starsGifted?: IntFieldUpdateOperationsInput | number
    starsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    streams?: StreamUpdateManyWithoutStreamerNestedInput
    sentGifts?: GiftTransactionUpdateManyWithoutSenderNestedInput
    comments?: CommentUpdateManyWithoutSenderNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedGiftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    starBalance?: IntFieldUpdateOperationsInput | number
    starsGifted?: IntFieldUpdateOperationsInput | number
    starsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    streams?: StreamUncheckedUpdateManyWithoutStreamerNestedInput
    sentGifts?: GiftTransactionUncheckedUpdateManyWithoutSenderNestedInput
    comments?: CommentUncheckedUpdateManyWithoutSenderNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type StreamCreateWithoutCommentsInput = {
    id?: string
    title: string
    description?: string | null
    category?: string
    status?: string
    viewerCount?: number
    totalStars?: number
    createdAt?: Date | string
    endedAt?: Date | string | null
    streamer: UserCreateNestedOneWithoutStreamsInput
    goals?: StreamGoalCreateNestedManyWithoutStreamInput
    pkBattles1?: PKBattleCreateNestedManyWithoutStream1Input
    pkBattles2?: PKBattleCreateNestedManyWithoutStream2Input
    chests?: TreasureChestCreateNestedManyWithoutStreamInput
    gifts?: GiftTransactionCreateNestedManyWithoutStreamInput
  }

  export type StreamUncheckedCreateWithoutCommentsInput = {
    id?: string
    title: string
    description?: string | null
    category?: string
    status?: string
    viewerCount?: number
    totalStars?: number
    streamerId: string
    createdAt?: Date | string
    endedAt?: Date | string | null
    goals?: StreamGoalUncheckedCreateNestedManyWithoutStreamInput
    pkBattles1?: PKBattleUncheckedCreateNestedManyWithoutStream1Input
    pkBattles2?: PKBattleUncheckedCreateNestedManyWithoutStream2Input
    chests?: TreasureChestUncheckedCreateNestedManyWithoutStreamInput
    gifts?: GiftTransactionUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamCreateOrConnectWithoutCommentsInput = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutCommentsInput, StreamUncheckedCreateWithoutCommentsInput>
  }

  export type UserCreateWithoutCommentsInput = {
    id?: string
    username: string
    displayName: string
    avatarUrl: string
    email?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    starBalance?: number
    starsGifted?: number
    starsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    streams?: StreamCreateNestedManyWithoutStreamerInput
    sentGifts?: GiftTransactionCreateNestedManyWithoutSenderInput
    receivedGifts?: GiftTransactionCreateNestedManyWithoutReceiverInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: string
    username: string
    displayName: string
    avatarUrl: string
    email?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    starBalance?: number
    starsGifted?: number
    starsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    streams?: StreamUncheckedCreateNestedManyWithoutStreamerInput
    sentGifts?: GiftTransactionUncheckedCreateNestedManyWithoutSenderInput
    receivedGifts?: GiftTransactionUncheckedCreateNestedManyWithoutReceiverInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type StreamUpsertWithoutCommentsInput = {
    update: XOR<StreamUpdateWithoutCommentsInput, StreamUncheckedUpdateWithoutCommentsInput>
    create: XOR<StreamCreateWithoutCommentsInput, StreamUncheckedCreateWithoutCommentsInput>
    where?: StreamWhereInput
  }

  export type StreamUpdateToOneWithWhereWithoutCommentsInput = {
    where?: StreamWhereInput
    data: XOR<StreamUpdateWithoutCommentsInput, StreamUncheckedUpdateWithoutCommentsInput>
  }

  export type StreamUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streamer?: UserUpdateOneRequiredWithoutStreamsNestedInput
    goals?: StreamGoalUpdateManyWithoutStreamNestedInput
    pkBattles1?: PKBattleUpdateManyWithoutStream1NestedInput
    pkBattles2?: PKBattleUpdateManyWithoutStream2NestedInput
    chests?: TreasureChestUpdateManyWithoutStreamNestedInput
    gifts?: GiftTransactionUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    streamerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    goals?: StreamGoalUncheckedUpdateManyWithoutStreamNestedInput
    pkBattles1?: PKBattleUncheckedUpdateManyWithoutStream1NestedInput
    pkBattles2?: PKBattleUncheckedUpdateManyWithoutStream2NestedInput
    chests?: TreasureChestUncheckedUpdateManyWithoutStreamNestedInput
    gifts?: GiftTransactionUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    starBalance?: IntFieldUpdateOperationsInput | number
    starsGifted?: IntFieldUpdateOperationsInput | number
    starsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    streams?: StreamUpdateManyWithoutStreamerNestedInput
    sentGifts?: GiftTransactionUpdateManyWithoutSenderNestedInput
    receivedGifts?: GiftTransactionUpdateManyWithoutReceiverNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    starBalance?: IntFieldUpdateOperationsInput | number
    starsGifted?: IntFieldUpdateOperationsInput | number
    starsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    streams?: StreamUncheckedUpdateManyWithoutStreamerNestedInput
    sentGifts?: GiftTransactionUncheckedUpdateManyWithoutSenderNestedInput
    receivedGifts?: GiftTransactionUncheckedUpdateManyWithoutReceiverNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    username: string
    displayName: string
    avatarUrl: string
    email?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    starBalance?: number
    starsGifted?: number
    starsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    streams?: StreamCreateNestedManyWithoutStreamerInput
    sentGifts?: GiftTransactionCreateNestedManyWithoutSenderInput
    receivedGifts?: GiftTransactionCreateNestedManyWithoutReceiverInput
    comments?: CommentCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    username: string
    displayName: string
    avatarUrl: string
    email?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    starBalance?: number
    starsGifted?: number
    starsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    streams?: StreamUncheckedCreateNestedManyWithoutStreamerInput
    sentGifts?: GiftTransactionUncheckedCreateNestedManyWithoutSenderInput
    receivedGifts?: GiftTransactionUncheckedCreateNestedManyWithoutReceiverInput
    comments?: CommentUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    starBalance?: IntFieldUpdateOperationsInput | number
    starsGifted?: IntFieldUpdateOperationsInput | number
    starsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    streams?: StreamUpdateManyWithoutStreamerNestedInput
    sentGifts?: GiftTransactionUpdateManyWithoutSenderNestedInput
    receivedGifts?: GiftTransactionUpdateManyWithoutReceiverNestedInput
    comments?: CommentUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    starBalance?: IntFieldUpdateOperationsInput | number
    starsGifted?: IntFieldUpdateOperationsInput | number
    starsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    streams?: StreamUncheckedUpdateManyWithoutStreamerNestedInput
    sentGifts?: GiftTransactionUncheckedUpdateManyWithoutSenderNestedInput
    receivedGifts?: GiftTransactionUncheckedUpdateManyWithoutReceiverNestedInput
    comments?: CommentUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type StreamCreateWithoutGoalsInput = {
    id?: string
    title: string
    description?: string | null
    category?: string
    status?: string
    viewerCount?: number
    totalStars?: number
    createdAt?: Date | string
    endedAt?: Date | string | null
    streamer: UserCreateNestedOneWithoutStreamsInput
    pkBattles1?: PKBattleCreateNestedManyWithoutStream1Input
    pkBattles2?: PKBattleCreateNestedManyWithoutStream2Input
    chests?: TreasureChestCreateNestedManyWithoutStreamInput
    comments?: CommentCreateNestedManyWithoutStreamInput
    gifts?: GiftTransactionCreateNestedManyWithoutStreamInput
  }

  export type StreamUncheckedCreateWithoutGoalsInput = {
    id?: string
    title: string
    description?: string | null
    category?: string
    status?: string
    viewerCount?: number
    totalStars?: number
    streamerId: string
    createdAt?: Date | string
    endedAt?: Date | string | null
    pkBattles1?: PKBattleUncheckedCreateNestedManyWithoutStream1Input
    pkBattles2?: PKBattleUncheckedCreateNestedManyWithoutStream2Input
    chests?: TreasureChestUncheckedCreateNestedManyWithoutStreamInput
    comments?: CommentUncheckedCreateNestedManyWithoutStreamInput
    gifts?: GiftTransactionUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamCreateOrConnectWithoutGoalsInput = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutGoalsInput, StreamUncheckedCreateWithoutGoalsInput>
  }

  export type StreamUpsertWithoutGoalsInput = {
    update: XOR<StreamUpdateWithoutGoalsInput, StreamUncheckedUpdateWithoutGoalsInput>
    create: XOR<StreamCreateWithoutGoalsInput, StreamUncheckedCreateWithoutGoalsInput>
    where?: StreamWhereInput
  }

  export type StreamUpdateToOneWithWhereWithoutGoalsInput = {
    where?: StreamWhereInput
    data: XOR<StreamUpdateWithoutGoalsInput, StreamUncheckedUpdateWithoutGoalsInput>
  }

  export type StreamUpdateWithoutGoalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streamer?: UserUpdateOneRequiredWithoutStreamsNestedInput
    pkBattles1?: PKBattleUpdateManyWithoutStream1NestedInput
    pkBattles2?: PKBattleUpdateManyWithoutStream2NestedInput
    chests?: TreasureChestUpdateManyWithoutStreamNestedInput
    comments?: CommentUpdateManyWithoutStreamNestedInput
    gifts?: GiftTransactionUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateWithoutGoalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    streamerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pkBattles1?: PKBattleUncheckedUpdateManyWithoutStream1NestedInput
    pkBattles2?: PKBattleUncheckedUpdateManyWithoutStream2NestedInput
    chests?: TreasureChestUncheckedUpdateManyWithoutStreamNestedInput
    comments?: CommentUncheckedUpdateManyWithoutStreamNestedInput
    gifts?: GiftTransactionUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type StreamCreateWithoutPkBattles1Input = {
    id?: string
    title: string
    description?: string | null
    category?: string
    status?: string
    viewerCount?: number
    totalStars?: number
    createdAt?: Date | string
    endedAt?: Date | string | null
    streamer: UserCreateNestedOneWithoutStreamsInput
    goals?: StreamGoalCreateNestedManyWithoutStreamInput
    pkBattles2?: PKBattleCreateNestedManyWithoutStream2Input
    chests?: TreasureChestCreateNestedManyWithoutStreamInput
    comments?: CommentCreateNestedManyWithoutStreamInput
    gifts?: GiftTransactionCreateNestedManyWithoutStreamInput
  }

  export type StreamUncheckedCreateWithoutPkBattles1Input = {
    id?: string
    title: string
    description?: string | null
    category?: string
    status?: string
    viewerCount?: number
    totalStars?: number
    streamerId: string
    createdAt?: Date | string
    endedAt?: Date | string | null
    goals?: StreamGoalUncheckedCreateNestedManyWithoutStreamInput
    pkBattles2?: PKBattleUncheckedCreateNestedManyWithoutStream2Input
    chests?: TreasureChestUncheckedCreateNestedManyWithoutStreamInput
    comments?: CommentUncheckedCreateNestedManyWithoutStreamInput
    gifts?: GiftTransactionUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamCreateOrConnectWithoutPkBattles1Input = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutPkBattles1Input, StreamUncheckedCreateWithoutPkBattles1Input>
  }

  export type StreamCreateWithoutPkBattles2Input = {
    id?: string
    title: string
    description?: string | null
    category?: string
    status?: string
    viewerCount?: number
    totalStars?: number
    createdAt?: Date | string
    endedAt?: Date | string | null
    streamer: UserCreateNestedOneWithoutStreamsInput
    goals?: StreamGoalCreateNestedManyWithoutStreamInput
    pkBattles1?: PKBattleCreateNestedManyWithoutStream1Input
    chests?: TreasureChestCreateNestedManyWithoutStreamInput
    comments?: CommentCreateNestedManyWithoutStreamInput
    gifts?: GiftTransactionCreateNestedManyWithoutStreamInput
  }

  export type StreamUncheckedCreateWithoutPkBattles2Input = {
    id?: string
    title: string
    description?: string | null
    category?: string
    status?: string
    viewerCount?: number
    totalStars?: number
    streamerId: string
    createdAt?: Date | string
    endedAt?: Date | string | null
    goals?: StreamGoalUncheckedCreateNestedManyWithoutStreamInput
    pkBattles1?: PKBattleUncheckedCreateNestedManyWithoutStream1Input
    chests?: TreasureChestUncheckedCreateNestedManyWithoutStreamInput
    comments?: CommentUncheckedCreateNestedManyWithoutStreamInput
    gifts?: GiftTransactionUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamCreateOrConnectWithoutPkBattles2Input = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutPkBattles2Input, StreamUncheckedCreateWithoutPkBattles2Input>
  }

  export type StreamUpsertWithoutPkBattles1Input = {
    update: XOR<StreamUpdateWithoutPkBattles1Input, StreamUncheckedUpdateWithoutPkBattles1Input>
    create: XOR<StreamCreateWithoutPkBattles1Input, StreamUncheckedCreateWithoutPkBattles1Input>
    where?: StreamWhereInput
  }

  export type StreamUpdateToOneWithWhereWithoutPkBattles1Input = {
    where?: StreamWhereInput
    data: XOR<StreamUpdateWithoutPkBattles1Input, StreamUncheckedUpdateWithoutPkBattles1Input>
  }

  export type StreamUpdateWithoutPkBattles1Input = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streamer?: UserUpdateOneRequiredWithoutStreamsNestedInput
    goals?: StreamGoalUpdateManyWithoutStreamNestedInput
    pkBattles2?: PKBattleUpdateManyWithoutStream2NestedInput
    chests?: TreasureChestUpdateManyWithoutStreamNestedInput
    comments?: CommentUpdateManyWithoutStreamNestedInput
    gifts?: GiftTransactionUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateWithoutPkBattles1Input = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    streamerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    goals?: StreamGoalUncheckedUpdateManyWithoutStreamNestedInput
    pkBattles2?: PKBattleUncheckedUpdateManyWithoutStream2NestedInput
    chests?: TreasureChestUncheckedUpdateManyWithoutStreamNestedInput
    comments?: CommentUncheckedUpdateManyWithoutStreamNestedInput
    gifts?: GiftTransactionUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type StreamUpsertWithoutPkBattles2Input = {
    update: XOR<StreamUpdateWithoutPkBattles2Input, StreamUncheckedUpdateWithoutPkBattles2Input>
    create: XOR<StreamCreateWithoutPkBattles2Input, StreamUncheckedCreateWithoutPkBattles2Input>
    where?: StreamWhereInput
  }

  export type StreamUpdateToOneWithWhereWithoutPkBattles2Input = {
    where?: StreamWhereInput
    data: XOR<StreamUpdateWithoutPkBattles2Input, StreamUncheckedUpdateWithoutPkBattles2Input>
  }

  export type StreamUpdateWithoutPkBattles2Input = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streamer?: UserUpdateOneRequiredWithoutStreamsNestedInput
    goals?: StreamGoalUpdateManyWithoutStreamNestedInput
    pkBattles1?: PKBattleUpdateManyWithoutStream1NestedInput
    chests?: TreasureChestUpdateManyWithoutStreamNestedInput
    comments?: CommentUpdateManyWithoutStreamNestedInput
    gifts?: GiftTransactionUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateWithoutPkBattles2Input = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    streamerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    goals?: StreamGoalUncheckedUpdateManyWithoutStreamNestedInput
    pkBattles1?: PKBattleUncheckedUpdateManyWithoutStream1NestedInput
    chests?: TreasureChestUncheckedUpdateManyWithoutStreamNestedInput
    comments?: CommentUncheckedUpdateManyWithoutStreamNestedInput
    gifts?: GiftTransactionUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type StreamCreateWithoutChestsInput = {
    id?: string
    title: string
    description?: string | null
    category?: string
    status?: string
    viewerCount?: number
    totalStars?: number
    createdAt?: Date | string
    endedAt?: Date | string | null
    streamer: UserCreateNestedOneWithoutStreamsInput
    goals?: StreamGoalCreateNestedManyWithoutStreamInput
    pkBattles1?: PKBattleCreateNestedManyWithoutStream1Input
    pkBattles2?: PKBattleCreateNestedManyWithoutStream2Input
    comments?: CommentCreateNestedManyWithoutStreamInput
    gifts?: GiftTransactionCreateNestedManyWithoutStreamInput
  }

  export type StreamUncheckedCreateWithoutChestsInput = {
    id?: string
    title: string
    description?: string | null
    category?: string
    status?: string
    viewerCount?: number
    totalStars?: number
    streamerId: string
    createdAt?: Date | string
    endedAt?: Date | string | null
    goals?: StreamGoalUncheckedCreateNestedManyWithoutStreamInput
    pkBattles1?: PKBattleUncheckedCreateNestedManyWithoutStream1Input
    pkBattles2?: PKBattleUncheckedCreateNestedManyWithoutStream2Input
    comments?: CommentUncheckedCreateNestedManyWithoutStreamInput
    gifts?: GiftTransactionUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamCreateOrConnectWithoutChestsInput = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutChestsInput, StreamUncheckedCreateWithoutChestsInput>
  }

  export type TreasureClaimCreateWithoutChestInput = {
    id?: string
    userId: string
    amount: number
    createdAt?: Date | string
  }

  export type TreasureClaimUncheckedCreateWithoutChestInput = {
    id?: string
    userId: string
    amount: number
    createdAt?: Date | string
  }

  export type TreasureClaimCreateOrConnectWithoutChestInput = {
    where: TreasureClaimWhereUniqueInput
    create: XOR<TreasureClaimCreateWithoutChestInput, TreasureClaimUncheckedCreateWithoutChestInput>
  }

  export type TreasureClaimCreateManyChestInputEnvelope = {
    data: TreasureClaimCreateManyChestInput | TreasureClaimCreateManyChestInput[]
    skipDuplicates?: boolean
  }

  export type StreamUpsertWithoutChestsInput = {
    update: XOR<StreamUpdateWithoutChestsInput, StreamUncheckedUpdateWithoutChestsInput>
    create: XOR<StreamCreateWithoutChestsInput, StreamUncheckedCreateWithoutChestsInput>
    where?: StreamWhereInput
  }

  export type StreamUpdateToOneWithWhereWithoutChestsInput = {
    where?: StreamWhereInput
    data: XOR<StreamUpdateWithoutChestsInput, StreamUncheckedUpdateWithoutChestsInput>
  }

  export type StreamUpdateWithoutChestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streamer?: UserUpdateOneRequiredWithoutStreamsNestedInput
    goals?: StreamGoalUpdateManyWithoutStreamNestedInput
    pkBattles1?: PKBattleUpdateManyWithoutStream1NestedInput
    pkBattles2?: PKBattleUpdateManyWithoutStream2NestedInput
    comments?: CommentUpdateManyWithoutStreamNestedInput
    gifts?: GiftTransactionUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateWithoutChestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    streamerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    goals?: StreamGoalUncheckedUpdateManyWithoutStreamNestedInput
    pkBattles1?: PKBattleUncheckedUpdateManyWithoutStream1NestedInput
    pkBattles2?: PKBattleUncheckedUpdateManyWithoutStream2NestedInput
    comments?: CommentUncheckedUpdateManyWithoutStreamNestedInput
    gifts?: GiftTransactionUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type TreasureClaimUpsertWithWhereUniqueWithoutChestInput = {
    where: TreasureClaimWhereUniqueInput
    update: XOR<TreasureClaimUpdateWithoutChestInput, TreasureClaimUncheckedUpdateWithoutChestInput>
    create: XOR<TreasureClaimCreateWithoutChestInput, TreasureClaimUncheckedCreateWithoutChestInput>
  }

  export type TreasureClaimUpdateWithWhereUniqueWithoutChestInput = {
    where: TreasureClaimWhereUniqueInput
    data: XOR<TreasureClaimUpdateWithoutChestInput, TreasureClaimUncheckedUpdateWithoutChestInput>
  }

  export type TreasureClaimUpdateManyWithWhereWithoutChestInput = {
    where: TreasureClaimScalarWhereInput
    data: XOR<TreasureClaimUpdateManyMutationInput, TreasureClaimUncheckedUpdateManyWithoutChestInput>
  }

  export type TreasureClaimScalarWhereInput = {
    AND?: TreasureClaimScalarWhereInput | TreasureClaimScalarWhereInput[]
    OR?: TreasureClaimScalarWhereInput[]
    NOT?: TreasureClaimScalarWhereInput | TreasureClaimScalarWhereInput[]
    id?: StringFilter<"TreasureClaim"> | string
    chestId?: StringFilter<"TreasureClaim"> | string
    userId?: StringFilter<"TreasureClaim"> | string
    amount?: IntFilter<"TreasureClaim"> | number
    createdAt?: DateTimeFilter<"TreasureClaim"> | Date | string
  }

  export type TreasureChestCreateWithoutClaimsInput = {
    id?: string
    creatorId: string
    totalStars: number
    remainingStars: number
    totalSlots: number
    remainingSlots: number
    expiresAt: Date | string
    createdAt?: Date | string
    stream: StreamCreateNestedOneWithoutChestsInput
  }

  export type TreasureChestUncheckedCreateWithoutClaimsInput = {
    id?: string
    streamId: string
    creatorId: string
    totalStars: number
    remainingStars: number
    totalSlots: number
    remainingSlots: number
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type TreasureChestCreateOrConnectWithoutClaimsInput = {
    where: TreasureChestWhereUniqueInput
    create: XOR<TreasureChestCreateWithoutClaimsInput, TreasureChestUncheckedCreateWithoutClaimsInput>
  }

  export type TreasureChestUpsertWithoutClaimsInput = {
    update: XOR<TreasureChestUpdateWithoutClaimsInput, TreasureChestUncheckedUpdateWithoutClaimsInput>
    create: XOR<TreasureChestCreateWithoutClaimsInput, TreasureChestUncheckedCreateWithoutClaimsInput>
    where?: TreasureChestWhereInput
  }

  export type TreasureChestUpdateToOneWithWhereWithoutClaimsInput = {
    where?: TreasureChestWhereInput
    data: XOR<TreasureChestUpdateWithoutClaimsInput, TreasureChestUncheckedUpdateWithoutClaimsInput>
  }

  export type TreasureChestUpdateWithoutClaimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    totalStars?: IntFieldUpdateOperationsInput | number
    remainingStars?: IntFieldUpdateOperationsInput | number
    totalSlots?: IntFieldUpdateOperationsInput | number
    remainingSlots?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneRequiredWithoutChestsNestedInput
  }

  export type TreasureChestUncheckedUpdateWithoutClaimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    totalStars?: IntFieldUpdateOperationsInput | number
    remainingStars?: IntFieldUpdateOperationsInput | number
    totalSlots?: IntFieldUpdateOperationsInput | number
    remainingSlots?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamCreateManyStreamerInput = {
    id?: string
    title: string
    description?: string | null
    category?: string
    status?: string
    viewerCount?: number
    totalStars?: number
    createdAt?: Date | string
    endedAt?: Date | string | null
  }

  export type GiftTransactionCreateManySenderInput = {
    id?: string
    streamId: string
    receiverId: string
    starAmount: number
    message?: string | null
    createdAt?: Date | string
  }

  export type GiftTransactionCreateManyReceiverInput = {
    id?: string
    streamId: string
    senderId: string
    starAmount: number
    message?: string | null
    createdAt?: Date | string
  }

  export type CommentCreateManySenderInput = {
    id?: string
    streamId: string
    text: string
    isGift?: boolean
    giftStars?: number | null
    createdAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    id?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type StreamUpdateWithoutStreamerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    goals?: StreamGoalUpdateManyWithoutStreamNestedInput
    pkBattles1?: PKBattleUpdateManyWithoutStream1NestedInput
    pkBattles2?: PKBattleUpdateManyWithoutStream2NestedInput
    chests?: TreasureChestUpdateManyWithoutStreamNestedInput
    comments?: CommentUpdateManyWithoutStreamNestedInput
    gifts?: GiftTransactionUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateWithoutStreamerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    goals?: StreamGoalUncheckedUpdateManyWithoutStreamNestedInput
    pkBattles1?: PKBattleUncheckedUpdateManyWithoutStream1NestedInput
    pkBattles2?: PKBattleUncheckedUpdateManyWithoutStream2NestedInput
    chests?: TreasureChestUncheckedUpdateManyWithoutStreamNestedInput
    comments?: CommentUncheckedUpdateManyWithoutStreamNestedInput
    gifts?: GiftTransactionUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateManyWithoutStreamerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    viewerCount?: IntFieldUpdateOperationsInput | number
    totalStars?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GiftTransactionUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    starAmount?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneRequiredWithoutGiftsNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedGiftsNestedInput
  }

  export type GiftTransactionUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    starAmount?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GiftTransactionUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    starAmount?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GiftTransactionUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    starAmount?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneRequiredWithoutGiftsNestedInput
    sender?: UserUpdateOneRequiredWithoutSentGiftsNestedInput
  }

  export type GiftTransactionUncheckedUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    starAmount?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GiftTransactionUncheckedUpdateManyWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    starAmount?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftStars?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftStars?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftStars?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamGoalCreateManyStreamInput = {
    id?: string
    title: string
    targetStars: number
    currentStars?: number
    status?: string
    createdAt?: Date | string
  }

  export type PKBattleCreateManyStream1Input = {
    id?: string
    status?: string
    streamId2: string
    score1?: number
    score2?: number
    startTime?: Date | string | null
    endTime?: Date | string | null
    winnerId?: string | null
    createdAt?: Date | string
  }

  export type PKBattleCreateManyStream2Input = {
    id?: string
    status?: string
    streamId1: string
    score1?: number
    score2?: number
    startTime?: Date | string | null
    endTime?: Date | string | null
    winnerId?: string | null
    createdAt?: Date | string
  }

  export type TreasureChestCreateManyStreamInput = {
    id?: string
    creatorId: string
    totalStars: number
    remainingStars: number
    totalSlots: number
    remainingSlots: number
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type CommentCreateManyStreamInput = {
    id?: string
    senderId: string
    text: string
    isGift?: boolean
    giftStars?: number | null
    createdAt?: Date | string
  }

  export type GiftTransactionCreateManyStreamInput = {
    id?: string
    senderId: string
    receiverId: string
    starAmount: number
    message?: string | null
    createdAt?: Date | string
  }

  export type StreamGoalUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    targetStars?: IntFieldUpdateOperationsInput | number
    currentStars?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamGoalUncheckedUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    targetStars?: IntFieldUpdateOperationsInput | number
    currentStars?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamGoalUncheckedUpdateManyWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    targetStars?: IntFieldUpdateOperationsInput | number
    currentStars?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PKBattleUpdateWithoutStream1Input = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    score1?: IntFieldUpdateOperationsInput | number
    score2?: IntFieldUpdateOperationsInput | number
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream2?: StreamUpdateOneRequiredWithoutPkBattles2NestedInput
  }

  export type PKBattleUncheckedUpdateWithoutStream1Input = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    streamId2?: StringFieldUpdateOperationsInput | string
    score1?: IntFieldUpdateOperationsInput | number
    score2?: IntFieldUpdateOperationsInput | number
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PKBattleUncheckedUpdateManyWithoutStream1Input = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    streamId2?: StringFieldUpdateOperationsInput | string
    score1?: IntFieldUpdateOperationsInput | number
    score2?: IntFieldUpdateOperationsInput | number
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PKBattleUpdateWithoutStream2Input = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    score1?: IntFieldUpdateOperationsInput | number
    score2?: IntFieldUpdateOperationsInput | number
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream1?: StreamUpdateOneRequiredWithoutPkBattles1NestedInput
  }

  export type PKBattleUncheckedUpdateWithoutStream2Input = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    streamId1?: StringFieldUpdateOperationsInput | string
    score1?: IntFieldUpdateOperationsInput | number
    score2?: IntFieldUpdateOperationsInput | number
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PKBattleUncheckedUpdateManyWithoutStream2Input = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    streamId1?: StringFieldUpdateOperationsInput | string
    score1?: IntFieldUpdateOperationsInput | number
    score2?: IntFieldUpdateOperationsInput | number
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasureChestUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    totalStars?: IntFieldUpdateOperationsInput | number
    remainingStars?: IntFieldUpdateOperationsInput | number
    totalSlots?: IntFieldUpdateOperationsInput | number
    remainingSlots?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: TreasureClaimUpdateManyWithoutChestNestedInput
  }

  export type TreasureChestUncheckedUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    totalStars?: IntFieldUpdateOperationsInput | number
    remainingStars?: IntFieldUpdateOperationsInput | number
    totalSlots?: IntFieldUpdateOperationsInput | number
    remainingSlots?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: TreasureClaimUncheckedUpdateManyWithoutChestNestedInput
  }

  export type TreasureChestUncheckedUpdateManyWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    totalStars?: IntFieldUpdateOperationsInput | number
    remainingStars?: IntFieldUpdateOperationsInput | number
    totalSlots?: IntFieldUpdateOperationsInput | number
    remainingSlots?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftStars?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftStars?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isGift?: BoolFieldUpdateOperationsInput | boolean
    giftStars?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GiftTransactionUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    starAmount?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentGiftsNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedGiftsNestedInput
  }

  export type GiftTransactionUncheckedUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    starAmount?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GiftTransactionUncheckedUpdateManyWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    starAmount?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasureClaimCreateManyChestInput = {
    id?: string
    userId: string
    amount: number
    createdAt?: Date | string
  }

  export type TreasureClaimUpdateWithoutChestInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasureClaimUncheckedUpdateWithoutChestInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasureClaimUncheckedUpdateManyWithoutChestInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
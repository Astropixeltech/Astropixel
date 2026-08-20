// PostgreSQL / Prisma Mock Adapter replacing Supabase Client

class MockQueryBuilder {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  select(...args: any[]) { return this; }
  insert(...args: any[]) { return Promise.resolve({ data: [], error: null }); }
  update(...args: any[]) { return Promise.resolve({ data: [], error: null }); }
  upsert(...args: any[]) { return Promise.resolve({ data: [], error: null }); }
  delete(...args: any[]) { return Promise.resolve({ data: [], error: null }); }
  eq(...args: any[]) { return this; }
  neq(...args: any[]) { return this; }
  in(...args: any[]) { return this; }
  order(...args: any[]) { return this; }
  limit(...args: any[]) { return this; }
  single() { return Promise.resolve({ data: null, error: null }); }
  maybeSingle() { return Promise.resolve({ data: null, error: null }); }
  then(resolve: any) { resolve({ data: [], error: null }); }
}

export const supabase: any = {
  from: (table: string) => new MockQueryBuilder(table),
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: () => Promise.resolve({ data: null, error: null }),
    signOut: () => Promise.resolve({ error: null }),
  },
  storage: {
    from: () => ({
      getPublicUrl: (path: string) => ({ data: { publicUrl: path } }),
      upload: () => Promise.resolve({ data: null, error: null }),
    }),
  },
  channel: () => ({
    on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
    subscribe: () => ({ unsubscribe: () => {} }),
  }),
  removeChannel: () => {},
};
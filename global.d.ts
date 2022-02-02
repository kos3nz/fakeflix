declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly TMDB_API_KEY: string;
    readonly NEXT_PUBLIC_TMDB_API_KEY: string;
    readonly NEXT_PUBLIC_SUPABASE_URL: string;
    readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    readonly NEXT_PUBLIC_GUEST_EMAIL: string;
    readonly NEXT_PUBLIC_GUEST_PASSWORD: string;
    readonly NEXT_PUBLIC_CLOUD_NAME: string;
  }
}

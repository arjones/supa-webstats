# Supa-Webstats
A **VERY** simple clickthrough counter, implemented with Supabase.

## Why?
1. To learn more about [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
1. Play with Javascript, Typescript and Postgres
1. Have a very simple CTR counter

## Development

```sh
supabase login

# Link project
supabase link --project-ref mjvnleodkirkszvexzql

# Start local stack
supabase start

# Serve locally
supabase functions serve clicked --no-verify-jwt
```

## Sync environments

### Creating Migrations

```sh
supabase db diff <migration_name> -f <migration_name>
```

### Resetting DEV environment
This command will delete all user tables structure, recreate it using `supabase/migrations` scripts and insert `supabase/seed.sql` content.

```sh
supabase db reset
```

### Deploy in Production
```sh
supabase db push
supabase functions deploy clicked --no-verify-jwt
```

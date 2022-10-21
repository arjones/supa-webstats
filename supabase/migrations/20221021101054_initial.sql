CREATE TABLE IF NOT EXISTS public.raw_events
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    metadata jsonb DEFAULT '{}'::jsonb,
    CONSTRAINT raw_events_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.raw_events
    OWNER to postgres;

GRANT ALL ON TABLE public.raw_events TO anon;

GRANT ALL ON TABLE public.raw_events TO authenticated;

GRANT ALL ON TABLE public.raw_events TO postgres;

GRANT ALL ON TABLE public.raw_events TO service_role;
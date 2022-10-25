-- ALTER DATABASE webstats;

DROP TABLE IF EXISTS raw_events;

CREATE TABLE raw_events (
    created_at timestamp with time zone NOT NULL DEFAULT NOW(),
    metadata jsonb NOT NULL DEFAULT '{}'::JSONB
);


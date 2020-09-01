--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: master; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA master;


ALTER SCHEMA master OWNER TO postgres;

--
-- Name: miscellaneous; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA miscellaneous;


ALTER SCHEMA miscellaneous OWNER TO postgres;

--
-- Name: stations; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA stations;


ALTER SCHEMA stations OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: participants; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.participants (
    "userID" bigint NOT NULL,
    station text NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE master.participants OWNER TO postgres;

--
-- Name: stations; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.stations (
    name text NOT NULL,
    "groupID" bigint NOT NULL,
    "timeEach" double precision NOT NULL,
    "currentNumber" integer DEFAULT 0 NOT NULL,
    "frontMessage" text NOT NULL,
    "maxQueueLength" integer DEFAULT 999 NOT NULL
);


ALTER TABLE master.stations OWNER TO postgres;

--
-- Name: COLUMN stations."timeEach"; Type: COMMENT; Schema: master; Owner: postgres
--

COMMENT ON COLUMN master.stations."timeEach" IS 'estimated time per person in minutes';


--
-- Name: COLUMN stations."frontMessage"; Type: COMMENT; Schema: master; Owner: postgres
--

COMMENT ON COLUMN master.stations."frontMessage" IS 'message to be sent to front participant';


--
-- Name: cache; Type: TABLE; Schema: miscellaneous; Owner: postgres
--

CREATE TABLE miscellaneous.cache (
    data text,
    key bigint NOT NULL,
    "time" timestamp with time zone
);


ALTER TABLE miscellaneous.cache OWNER TO postgres;

--
-- Name: station1; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations.station1 (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL,
    "hasLeft" boolean DEFAULT false NOT NULL
);


ALTER TABLE stations.station1 OWNER TO postgres;

--
-- Name: station1_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations.station1 ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."station1_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: participants; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.participants ("userID", station, "queueNumber") FROM stdin;
1	station1	19
653601805	station1	20
\.


--
-- Data for Name: stations; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.stations (name, "groupID", "timeEach", "currentNumber", "frontMessage", "maxQueueLength") FROM stdin;
station2	0	5	0	you're next	999
station3	0	5	0	you're next	999
station1	-440049325	5	0	you're next	999
\.


--
-- Data for Name: cache; Type: TABLE DATA; Schema: miscellaneous; Owner: postgres
--

COPY miscellaneous.cache (data, key, "time") FROM stdin;
\.


--
-- Data for Name: station1; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations.station1 ("userID", "queueNumber", "hasLeft") FROM stdin;
1	19	f
653601805	20	f
\.


--
-- Name: station1_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."station1_queueNumber_seq"', 20, true);


--
-- Name: stations master_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.stations
    ADD CONSTRAINT master_pkey PRIMARY KEY (name);


--
-- Name: participants participants_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.participants
    ADD CONSTRAINT participants_pkey PRIMARY KEY ("userID");


--
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: miscellaneous; Owner: postgres
--

ALTER TABLE ONLY miscellaneous.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- Name: station1 station1_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations.station1
    ADD CONSTRAINT station1_pkey PRIMARY KEY ("queueNumber");


--
-- PostgreSQL database dump complete
--


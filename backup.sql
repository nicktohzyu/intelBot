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
    "timeEach" double precision DEFAULT 10 NOT NULL,
    "frontMessage" text,
    "maxQueueLength" integer DEFAULT 10 NOT NULL,
    description text DEFAULT 'none provided'::text NOT NULL
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
-- Name: Thor's Body; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Thor's Body" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Thor's Body" OWNER TO postgres;

--
-- Name: Thor''s Body_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Thor's Body" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Thor''s Body_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Thor's Linguistic; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Thor's Linguistic" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Thor's Linguistic" OWNER TO postgres;

--
-- Name: Thor''s Linguistic_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Thor's Linguistic" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Thor''s Linguistic_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Thor's Musical; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Thor's Musical" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Thor's Musical" OWNER TO postgres;

--
-- Name: Thor''s Musical_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Thor's Musical" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Thor''s Musical_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Thor's Existential; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Thor's Existential" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Thor's Existential" OWNER TO postgres;

--
-- Name: Thor's Existential_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Thor's Existential" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Thor's Existential_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Tue Station 1; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Tue Station 1" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Tue Station 1" OWNER TO postgres;

--
-- Name: Tue Station 1_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Tue Station 1" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Tue Station 1_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Tue Station 2; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Tue Station 2" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Tue Station 2" OWNER TO postgres;

--
-- Name: Tue Station 2_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Tue Station 2" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Tue Station 2_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Tue Station 3; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Tue Station 3" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Tue Station 3" OWNER TO postgres;

--
-- Name: Tue Station 3_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Tue Station 3" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Tue Station 3_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Wed Linguistic; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Wed Linguistic" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Wed Linguistic" OWNER TO postgres;

--
-- Name: Wed Linguistic_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Wed Linguistic" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Wed Linguistic_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Wed Music; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Wed Music" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Wed Music" OWNER TO postgres;

--
-- Name: Wed Music Station Admin_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Wed Music" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Wed Music Station Admin_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Wed Personal; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Wed Personal" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Wed Personal" OWNER TO postgres;

--
-- Name: Wed Personal 2; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Wed Personal 2" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Wed Personal 2" OWNER TO postgres;

--
-- Name: Wed Personal 2_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Wed Personal 2" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Wed Personal 2_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Wed Personal_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Wed Personal" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Wed Personal_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: station1; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations.station1 (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
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
-- Name: station2; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations.station2 (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations.station2 OWNER TO postgres;

--
-- Name: station2_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations.station2 ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."station2_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Data for Name: participants; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.participants ("userID", station, "queueNumber") FROM stdin;
\.


--
-- Data for Name: stations; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.stations (name, "groupID", "timeEach", "frontMessage", "maxQueueLength", description) FROM stdin;
station1	-440049325	5	you're next	5	none provided
station2	-495549072	5	you're next2	999	none provided
﻿Wed Personal	-472564065	10	\N	10	none provided
Wed Personal 2	-468020530	10	\N	10	none provided
Wed Linguistic	-469688493	10	\N	10	none provided
Thor's Linguistic	-473066704	10	\N	10	none provided
Thor's Musical	-420749114	10	\N	10	none provided
Thor's Body	-350918507	10	\N	10	none provided
Thor's Existential	-492711691	10	\N	10	none provided
Tue Station 1	-338776699	10	\N	10	none provided
Tue Station 2	-470598822	10	\N	10	none provided
Tue Station 3	-339213979	10	\N	10	none provided
Wed Music	-435377964	10	\N	10	none provided
\.


--
-- Data for Name: cache; Type: TABLE DATA; Schema: miscellaneous; Owner: postgres
--

COPY miscellaneous.cache (data, key, "time") FROM stdin;
\.


--
-- Data for Name: Thor's Body; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Thor's Body" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: Thor's Existential; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Thor's Existential" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: Thor's Linguistic; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Thor's Linguistic" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: Thor's Musical; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Thor's Musical" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: Tue Station 1; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Tue Station 1" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: Tue Station 2; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Tue Station 2" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: Tue Station 3; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Tue Station 3" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: Wed Linguistic; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Wed Linguistic" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: Wed Music; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Wed Music" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: Wed Personal; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Wed Personal" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: Wed Personal 2; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Wed Personal 2" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: station1; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations.station1 ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: station2; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations.station2 ("userID", "queueNumber") FROM stdin;
\.


--
-- Name: Thor''s Body_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Thor''''s Body_queueNumber_seq"', 1, false);


--
-- Name: Thor''s Linguistic_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Thor''''s Linguistic_queueNumber_seq"', 1, true);


--
-- Name: Thor''s Musical_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Thor''''s Musical_queueNumber_seq"', 1, false);


--
-- Name: Thor's Existential_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Thor''s Existential_queueNumber_seq"', 1, false);


--
-- Name: Tue Station 1_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Tue Station 1_queueNumber_seq"', 1, true);


--
-- Name: Tue Station 2_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Tue Station 2_queueNumber_seq"', 1, false);


--
-- Name: Tue Station 3_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Tue Station 3_queueNumber_seq"', 1, false);


--
-- Name: Wed Linguistic_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Wed Linguistic_queueNumber_seq"', 1, false);


--
-- Name: Wed Music Station Admin_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Wed Music Station Admin_queueNumber_seq"', 1, true);


--
-- Name: Wed Personal 2_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Wed Personal 2_queueNumber_seq"', 1, false);


--
-- Name: Wed Personal_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Wed Personal_queueNumber_seq"', 1, true);


--
-- Name: station1_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."station1_queueNumber_seq"', 39, true);


--
-- Name: station2_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."station2_queueNumber_seq"', 2, true);


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
-- Name: Thor's Body Thor''s Body_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Thor's Body"
    ADD CONSTRAINT "Thor''s Body_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: Thor's Linguistic Thor''s Linguistic_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Thor's Linguistic"
    ADD CONSTRAINT "Thor''s Linguistic_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: Thor's Musical Thor''s Musical_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Thor's Musical"
    ADD CONSTRAINT "Thor''s Musical_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: Thor's Existential Thor's Existential_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Thor's Existential"
    ADD CONSTRAINT "Thor's Existential_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: Tue Station 1 Tue Station 1_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Tue Station 1"
    ADD CONSTRAINT "Tue Station 1_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: Tue Station 2 Tue Station 2_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Tue Station 2"
    ADD CONSTRAINT "Tue Station 2_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: Tue Station 3 Tue Station 3_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Tue Station 3"
    ADD CONSTRAINT "Tue Station 3_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: Wed Linguistic Wed Linguistic_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Wed Linguistic"
    ADD CONSTRAINT "Wed Linguistic_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: Wed Music Wed Music Station Admin_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Wed Music"
    ADD CONSTRAINT "Wed Music Station Admin_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: Wed Personal 2 Wed Personal 2_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Wed Personal 2"
    ADD CONSTRAINT "Wed Personal 2_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: Wed Personal Wed Personal_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Wed Personal"
    ADD CONSTRAINT "Wed Personal_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: station1 station1_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations.station1
    ADD CONSTRAINT station1_pkey PRIMARY KEY ("queueNumber");


--
-- Name: station2 station2_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations.station2
    ADD CONSTRAINT station2_pkey PRIMARY KEY ("queueNumber");


--
-- PostgreSQL database dump complete
--

